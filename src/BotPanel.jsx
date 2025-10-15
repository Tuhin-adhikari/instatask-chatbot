import React, { useState } from "react";
import Chatbot from "../chatbot/ChatBot";
import VoiceBot from "../voicebot/VoiceBot";

export default function BotPanel() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            {/* VoiceBot Button */}
            <VoiceBot
                isChatOpen={isChatOpen} // position dynamically above ChatBot
            />

            {/* ChatBot Button */}
            <Chatbot
                onToggle={setIsChatOpen} // controls ChatBot window open/close
            />
        </>
    );
}
