import React, { useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

const VoiceBot = ({ isChatOpen }) => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const initializeRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser doesn’t support speech recognition.");
            return null;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        return recognition;
    };

    const handleSpeech = () => {
        if (listening) {
            recognitionRef.current?.stop();
            setListening(false);
            return;
        }

        const recognition = initializeRecognition();
        if (!recognition) return;

        recognitionRef.current = recognition;
        setListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("You said:", transcript);
            // 🔹 Future integration with chatbot
        };

        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);

        recognition.start();
    };

    return (
        <button
            onClick={handleSpeech}
            className={`fixed right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${listening ? "bg-red-500 hover:bg-red-600" : "bg-indigo-500 hover:bg-indigo-600"
                } text-white`}
            style={{ bottom: isChatOpen ? "7rem" : "4rem" }} // stacked above ChatBot
            title={listening ? "Stop Listening" : "Start Voice Assistant"}
        >
            {listening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
    );
};

export default VoiceBot;
