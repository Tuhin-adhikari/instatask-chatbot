import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

export default function Chatbot({ onToggle }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <div className="fixed right-6 z-50 flex flex-col items-end">
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center text-2xl"
                >
                    💬
                </button>
            )}

            {isOpen && <ChatWindow onClose={toggleChat} />}
        </div>
    );
}
