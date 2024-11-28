const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const codeRouter = require("./routes/code.js");
const authRouter = require("./routes/auth.js");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const ACTIONS = require("./Actions.js");

const app = express();
const httpServer = createServer(app);

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/CodeSnippets");
        console.log("mongodb connected");
    } catch (error) {
        throw error;
    }
};

connectMongo();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  // Use a Set to store unique usernames
  const uniqueClients = new Set();
  
  return Array.from(io.sockets.adapter.rooms.get(roomId) || [])
      .map((socketId) => {
          const username = userSocketMap[socketId];
          
          // Only add if username is unique
          if (username && !uniqueClients.has(username)) {
              uniqueClients.add(username);
              return {
                  socketId,
                  username
              };
          }
          return null;
      })
      .filter(client => client !== null);
};

io.on("connection", (socket) => {
    console.log("user connected with id : ", socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
      // Remove any previous socket associations for this username
      const existingSocketId = Object.keys(userSocketMap).find(
          socketId => userSocketMap[socketId] === username
      );

      if (existingSocketId) {
          // Remove the old socket mapping
          delete userSocketMap[existingSocketId];
      }

      // Create new socket mapping
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      
      const clients = getAllConnectedClients(roomId);
      
      // Notify all clients in the room about the new join
      clients.forEach(({ socketId }) => {
          io.to(socketId).emit(ACTIONS.JOINED, {
              clients,
              username,
              socketId: socket.id
          });
      });
  });

    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id]
        })
      })
      delete userSocketMap[socket.id];
      socket.leave();
    })

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code, language }) => {
      // Broadcast the code change to all other clients in the same room
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code, language });
  });
  
  
});

app.use("/api/save-code", codeRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("hello");
});

httpServer.listen(3000);
