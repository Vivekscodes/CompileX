import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import LanguageSelector from "../LanguageSelector";
import Share from "../Share";
import { executeCode } from "../../utils/execute";
import { LANGUAGE_BOILERPLATES } from "../../utils/language";
import { initSocket } from "../../config/socket";
import { ACTIONS } from "../../Actions";
// import "./CodeEditor.css";

const CodeEditor = () => {
    const [share, setShare] = useState(true);
    const [value, setValue] = useState(
        localStorage.getItem("savedCode") || LANGUAGE_BOILERPLATES["javascript"]
    );
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState(
        localStorage.getItem("selectedLanguage") || "javascript"
    );
    const [userInput, setUserInput] = useState(
        localStorage.getItem("userInput") || ""
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const editorRef = useRef(null);
    const socketRef = useRef(null);

    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [clients, setClients] = useState([]);

    const navigate = useNavigate();

    // Save code to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("savedCode", value);
    }, [value]);

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("selectedLanguage", language);
    }, [language]);

    // Save user input to localStorage
    useEffect(() => {
        localStorage.setItem("userInput", userInput);
    }, [userInput]);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const run = async () => {
        setIsLoading(true);
        try {
            const res = await executeCode(
                language,
                editorRef.current.getValue(),
                userInput
            );
            setOutput(res.run.output);
        } catch (err) {
            console.error(err);
            setOutput("An error occurred while running the code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeChange = (newValue) => {
        setValue(newValue);

        // Emit code change to other clients in the room
        if (socketRef.current && roomId) {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                roomId,
                code: newValue,
                username
            });
        }
    };

    const onSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);

        // Set default boilerplate for the selected language
        setValue(
            LANGUAGE_BOILERPLATES[selectedLanguage] || "// Write your code here"
        );

        // Emit language change to other clients in the room
        if (socketRef.current && roomId) {
            socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
                roomId,
                language: selectedLanguage,
                username
            });
        }
    };

    const initSocketConnection = async () => {
        socketRef.current = await initSocket();

        // Error handling
        socketRef.current.on("connect_error", (err) => handleSocketError(err));
        socketRef.current.on("connect_failed", (err) => handleSocketError(err));

        // Join room
        if (roomId && username) {
            socketRef.current.emit(ACTIONS.JOIN, { roomId, username });
        }

        // Listen for code changes from other clients
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, username: sender }) => {
            if (sender !== username) {
                setValue(code);
            }
        });

        // Listen for language changes from other clients
        socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ language: newLanguage, username: sender }) => {
            if (sender !== username) {
                setLanguage(newLanguage);
                setValue(
                    LANGUAGE_BOILERPLATES[newLanguage] || "// Write your code here"
                );
            }
        });

        // Listen for joined clients
        socketRef.current.on(ACTIONS.JOINED, ({ clients, username: joinedUser }) => {
            if (joinedUser !== username) {
                toast.success(`${joinedUser} joined the room`);
            }

            // Use Set to ensure unique clients
            const uniqueClients = Array.from(
                new Set(clients.map(client => client.username))
            ).map(username =>
                clients.find(client => client.username === username)
            );

            setClients(uniqueClients);
        });

        // Listen for disconnected clients
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ username: disconnectedUser }) => {
            toast.success(`${disconnectedUser} left the room`);
            setClients((prev) =>
                prev.filter((client) => client.username !== disconnectedUser)
            );
        });
    };

    const handleSocketError = (err) => {
        console.error("Socket connection error:", err);
        toast.error("Socket connection failed. Try again later.");
        navigate("/");
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div>
                <h2 style={{ textAlign: 'center', color: '#F0F0F0', fontSize: '3rem', fontWeight: 'bold' }}>Collaborative Code Editor</h2>
                <div>

                    <button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '4px 25px',
                            fontSize: '16px',
                            margin: '10px',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setShare(!share);
                        }}
                    >
                        {isOpen ? "Close Share" : "Share"}
                    </button>

                    <LanguageSelector
                        onSelect={onSelect}
                        selectedLanguage={language}
                    />

                    <button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '4px 25px',
                            fontSize: '16px',
                            margin: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                        onClick={run}
                        disabled={isLoading}
                    >
                        {isLoading ? "Running..." : "Run"}
                    </button>
                </div>

                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '60%', marginRight: '10px', marginLeft: '10px', padding: '10px 20px 10px 10px' }}>
                        <Editor
                            height="75vh"
                            theme="vs-dark"
                            language={language}
                            value={value}
                            onChange={handleCodeChange}
                            onMount={onMount}
                            options={{
                                minimap: { enabled: false },
                            }}
                        />
                    </div>
                    <div style={{ width: '40%' }}>
                        <textarea
                            placeholder="User Input"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            style={{ width: '100%', height: '30vh', marginBottom: '8px', borderRadius: '5px', border: '2px solid yellow' }}
                        />
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Output"
                            style={{ width: '100%', height: '43vh', borderRadius: '5px', border: '2px solid yellow', overflow: 'auto' }}
                        />
                    </div>
                </div>

                {isOpen && (
                    <Share
                        roomId={roomId}
                        setRoomId={setRoomId}
                        username={username}
                        setUsername={setUsername}
                        init={initSocketConnection}

                    />
                )}

                <div>
                    <h3>Connected Clients:</h3>
                    {clients.map((client) => (
                        <div key={client.socketId}>
                            {client.username}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default CodeEditor;