// src/utils/bot.js
const knowledgeBase = [
    {
        intent: "instatask",
        keywords: ["instatask", "what is instatask", "about instatask"],
        response: "InstaTask is a platform where Taskers can post tasks and Doers can complete them to earn money. It's simple, fast, and secure!"
    },
    {
        intent: "tasker_info",
        keywords: ["tasker", "taskers", "giver", "who can post"],
        response: "👤 Tasker Info:\n\nTaskers are people who post tasks they need done — from household chores to tech help. They set the task details, price, and deadline, and Doers can then apply to complete them."
    },
    {
        intent: "post_task",
        keywords: ["post task", "create task", "add task", "new task"],
        action: "start_post_task", // 🔥 triggers guided flow
        response: "Let's create a new task! First, give me a title for your task."
    },
    {
        intent: "doer_info",
        keywords: ["doer", "doers", "apply", "complete task", "who can work"],
        response: "👷 Doer Info:\n\nDoers are people who browse available tasks, apply for ones they like, and complete them to earn money securely through InstaTask."
    },
    {
        intent: "payment",
        keywords: ["payment", "money", "earn", "payout"],
        response: "💰 Payments are processed securely after the task is completed. InstaTask ensures both Taskers and Doers are protected."
    },
    {
        intent: "support",
        keywords: ["help", "support", "contact", "assist"],
        response: "📞 You can reach InstaTask support from the Help section in the menu or directly via chat/email."
    }
];

export async function sendMessageToBot(userMessage) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerMsg = userMessage.toLowerCase();

            // Find best match
            const found = knowledgeBase.find(item =>
                item.keywords.some(k => lowerMsg.includes(k))
            );

            if (found) {
                resolve({ text: found.response, action: found.action || null });
            } else {
                resolve({
                    text: "🤔 I'm here to guide you! Try asking about 'InstaTask', 'Tasker Info', 'Doer Info', 'Payment', or 'Support'.",
                    action: null
                });
            }
        }, 600);
    });
}
