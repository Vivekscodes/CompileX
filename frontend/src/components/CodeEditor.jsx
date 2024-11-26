import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { executeCode } from "../utils/execute";
import { LANGUAGE_BOILERPLATES } from "../utils/language";

const CodeEditor = () => {
    const [value, setValue] = useState(LANGUAGE_BOILERPLATES['javascript']);
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [userInput, setUserInput] = useState(""); // State to capture input
    const [isLoading, setIsLoading] = useState(false);
    const editorRef = useRef();

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
            ); // Pass input
            setOutput(res.run.output);
        } catch (err) {
            console.error(err);
            setOutput("An error occurred while running the code.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(LANGUAGE_BOILERPLATES[language] || "// Write your code here");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault(); // Prevent default newline behavior in textarea
                run(); // Trigger code execution
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [userInput, value, language]);

    return (
        <div>
            <div>
                <h2>Code Editor</h2>
                <p>
                    This is a simple code editor using the Monaco Editor
                    library.
                </p>
                <LanguageSelector onSelect={onSelect} />
                <button onClick={run}>Run</button>
                <div style={{ width: "50%", border: "2px solid black" }}>
                    <Editor
                        height="75vh"
                        theme="vs-dark"
                        language={language}
                        value={value}
                        onChange={(value) => setValue(value)}
                        onMount={onMount}
                        options={{
                            quickSuggestions: false,
                            readOnly: false,
                            minimap: { enabled: false },
                            suggestOnTriggerCharacters: false,
                            hover: false,
                            wordBasedSuggestions: false,
                        }}
                    />
                </div>
            </div>
            <div>
                <textarea
                    placeholder="Enter your input here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)} // Capture input
                    style={{
                        height: "20vh",
                        width: "50%",
                        margin: "10px 0",
                        padding: "10px",
                        border: "2px solid black",
                    }}
                ></textarea>
                <textarea
                    name="output"
                    id="output"
                    value={isLoading ? "Executing..." : output}
                    readOnly
                    style={{
                        height: "55vh",
                        width: "50%",
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default CodeEditor;
