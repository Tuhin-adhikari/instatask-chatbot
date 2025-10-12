// Later we’ll replace this with OpenAI or Dialogflow
export async function sendMessageToBot(userMessage) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const msg = userMessage.toLowerCase();

            if (msg.includes("instatask") || msg.includes("what is")) {
                resolve(
                    "InstaTask is a platform that connects Taskers (who post tasks) with Doers (who complete tasks)."
                );
            } else if (msg.includes("tasker")) {
                resolve(
                    "A Tasker is someone who posts a task — like moving items, shop sitting, or errands. The Tasker pays once the Doer completes the task."
                );
            } else if (msg.includes("doer")) {
                resolve(
                    "A Doer is someone who applies for tasks, completes them, submits proof, and gets paid after verification."
                );
            } else if (msg.includes("contact")) {
                resolve(
                    "You can reach us at:\n📧 support@instatask.com\n📱 WhatsApp: +91 98765 43210\n📞 Call: +91 12345 67890"
                );
            } else {
                // Fallback
                resolve(
                    "🤔 I didn’t quite get that. Try one of these:\n- What is InstaTask?\n- Tasker info\n- Doer info\n- Contact us"
                );
            }
        }, 800);
    });
}
