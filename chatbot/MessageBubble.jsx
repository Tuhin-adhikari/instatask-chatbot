import React from "react";

export default function MessageBubble({ sender, text, isTyping }) {
    const isUser = sender === "user";

    // Render links
    const renderText = () => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        if (urlRegex.test(text)) {
            return text.split(" ").map((part, idx) =>
                urlRegex.test(part) ? (
                    <a
                        key={idx}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500 hover:text-blue-700"
                    >
                        {part}
                    </a>
                ) : (
                    part + " "
                )
            );
        }
        return text;
    };

    return (
        <div className={`mb-3 flex items-end ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
            {!isUser && (
                <div className="w-8 h-8 mr-2 flex items-center justify-center bg-orange-200 rounded-full text-sm shadow">
                    🤖
                </div>
            )}

            <div className={`px-4 py-3 rounded-2xl max-w-[70%] shadow-md text-sm sm:text-base ${isUser
                    ? "bg-orange-500 text-white rounded-br-none"
                    : "bg-orange-100 text-gray-900 rounded-bl-none"
                }`}>
                {isTyping ? (
                    <div className="flex space-x-1">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                ) : (
                    renderText()
                )}
            </div>

            {isUser && (
                <div className="w-8 h-8 ml-2 flex items-center justify-center bg-orange-500 text-white rounded-full text-sm shadow">
                    🙂
                </div>
            )}
        </div>
    );
}
