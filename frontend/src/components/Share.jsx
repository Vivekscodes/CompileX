import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";

const Share = ({ roomId, setRoomId, username, setUsername, init }) => {
    const createNewRoom = (e) => {
        e.preventDefault();
        const newRoomId = uuidV4();
        setRoomId(newRoomId);
        toast.success(`Created new room`);
    };

    const copyRoomId = () => {
        if (roomId) {
            navigator.clipboard
                .writeText(roomId)
                .then(() => {
                    toast.success("Room ID copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy Room ID", err);
                    toast.error("Failed to copy Room ID. Please try again.");
                });
        } else {
            toast.error("Room ID is empty!");
        }
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={init}>Join Room</button>
                <small>
                    Don’t have a room? Create{" "}
                    <span
                        onClick={createNewRoom}
                        style={{ cursor: "pointer", color: "blue" }}
                    >
                        a new room
                    </span>
                </small>
                {roomId && (
                    <button onClick={copyRoomId} style={{ marginLeft: "10px" }}>
                        Copy Room ID
                    </button>
                )}
            </div>
        </>
    );
};

export default Share;
