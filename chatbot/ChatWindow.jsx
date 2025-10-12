import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { sendMessageToBot } from "../utils/bot.js";

export default function ChatWindow({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi! 👋 How can I help you today?", showOptions: true },
    ]);
    const [input, setInput] = useState("");
    const [flow, setFlow] = useState(null);
    const [taskData, setTaskData] = useState({ title: "", description: "", price: "" });
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    const restartChat = () => {
        setMessages([{ sender: "bot", text: "Hi again! 👋 How can I help you today?", showOptions: true }]);
        setFlow(null);
        setTaskData({ title: "", description: "", price: "" });
    };

    const botRespond = (text, opts = {}) => {
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, { sender: "bot", text, ...opts }]);
        }, 800);
    };

    const handleSend = async (userText) => {
        if (!userText.trim()) return;
        const newMessages = [...messages, { sender: "user", text: userText }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        // Handle Guided Flow
        if (flow) {
            if (flow === "post_title") {
                setTaskData({ ...taskData, title: userText });
                setFlow("post_description");
                botRespond("Great! Now add a short description for your task.");
                return;
            }
            if (flow === "post_description") {
                setTaskData({ ...taskData, description: userText });
                setFlow("post_price");
                botRespond("Nice! Lastly, what’s your budget for this task?");
                return;
            }
            if (flow === "post_price") {
                const newTask = { ...taskData, price: userText };
                setTaskData(newTask);
                setFlow("confirm_task");
                botRespond(
                    `✅ Task Summary:\n\n📌 Title: ${newTask.title}\n📝 Description: ${newTask.description}\n💰 Price: ${newTask.price}\n\nDo you want to confirm posting this task? (yes/no)`
                );
                return;
            }
            if (flow === "confirm_task") {
                if (userText.toLowerCase().includes("yes")) {
                    setFlow(null);
                    botRespond("🎉 Your task has been posted successfully!", { showOptions: true });
                } else {
                    setFlow(null);
                    botRespond("❌ Task posting canceled.", { showOptions: true });
                }
                return;
            }
        }

        // Normal response
        const botReply = await sendMessageToBot(userText);
        setIsTyping(true);

        if (botReply.action === "start_post_task") {
            setFlow("post_title");
            botRespond(botReply.text);
        } else {
            botRespond(botReply.text || botReply, { showOptions: true });
        }
    };

    const handleQuickReply = (option) => {
        if (option === "Post a Task") {
            setFlow("post_title");
            setMessages([
                ...messages,
                {
                    sender: "bot",
                    text: "Sure! Let’s post a new task. First, give me a title for your task.",
                },
            ]);
        } else {
            handleSend(option);
        }
    };

    const options = [
        "What is InstaTask?",
        "Tasker info",
        "Doer info",
        "Contact us",
        "Post a Task",
    ];

    return (
        <div className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 w-11/12 max-w-xl sm:max-w-md md:max-w-xl bg-gradient-to-b from-orange-50 to-white shadow-2xl rounded-2xl border flex flex-col z-50">
            {/* Header */}
            <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-3 rounded-t-2xl">
                <h2 className="font-semibold text-lg">InstaTask Assistant</h2>
                <div className="flex gap-3 items-center">
                    <button
                        onClick={restartChat}
                        className="text-white text-sm hover:text-gray-200 transition"
                        title="Restart Chat"
                    >
                        🔄
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white text-lg hover:text-gray-200 transition"
                        title="Close"
                    >
                        ✖
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[70vh] space-y-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className="animate-fade-in">
                        <MessageBubble sender={msg.sender} text={msg.text} />
                        {msg.showOptions && !flow && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickReply(opt)}
                                        className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full shadow-md hover:bg-orange-600 hover:scale-105 transition-all"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && <MessageBubble sender="bot" text="Typing..." isTyping />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex border-t border-gray-300">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 outline-none text-sm sm:text-base bg-transparent"
                />
                <button
                    onClick={() => handleSend(input)}
                    className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition-colors"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
