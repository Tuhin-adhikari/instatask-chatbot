import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

export default function ChatBotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
            >
                💬
            </button>

            {/* Chat Window */}
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
        </div>
    );
}
