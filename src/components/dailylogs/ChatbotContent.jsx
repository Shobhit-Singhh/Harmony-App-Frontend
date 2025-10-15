// src/components/dailylogs/ChatbotContent.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
    MessageSquare, 
    Send, 
    Loader2,
    AlertCircle,
    Circle 
} from "lucide-react";
import { useDailyLogs } from "../../hooks/useDailyLogs";

const ChatbotContent = ({ selectedDate }) => {
    const { getLogByDate, addChatbotMessage, loading } = useDailyLogs();
    const [logData, setLogData] = useState(null);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadChat();
    }, [selectedDate]);

    useEffect(() => {
        scrollToBottom();
    }, [logData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const loadChat = async () => {
        try {
            const data = await getLogByDate(selectedDate);
            setLogData(data);
        } catch (err) {
            console.error("Failed to load chat:", err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || sending) return;

        const userMessage = message.trim();
        setMessage("");
        setSending(true);

        try {
            // Add user message
            await addChatbotMessage(selectedDate, {
                role: "user",
                content: userMessage
            });

            // TODO: Call your AI API here to get assistant response
            // For now, we'll add a placeholder response
            setTimeout(async () => {
                await addChatbotMessage(selectedDate, {
                    role: "assistant",
                    content: "I'm here to help you reflect on your day. This is a placeholder response. Connect to your AI backend to get real responses."
                });
                await loadChat();
                setSending(false);
            }, 1000);

        } catch (err) {
            console.error("Failed to send message:", err);
            setSending(false);
        }
    };

    if (loading && !logData) return <LoadingSpinner />;

    const conversation = logData?.chatbot?.conversation || [];

    return (
        <div className="space-y-6">
            <SectionCard
                title="Chatbot Conversation"
                description={`Chat with your AI companion about ${new Date(selectedDate).toLocaleDateString()}`}
            >
                <div className="flex flex-col h-[600px]">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
                        {conversation.length === 0 ? (
                            <EmptyState message="Start a conversation! Share how your day is going." />
                        ) : (
                            <>
                                {conversation.map((msg, idx) => (
                                    <ChatMessage key={idx} message={msg} />
                                ))}
                                {sending && (
                                    <div className="flex justify-start">
                                        <div className="max-w-md px-4 py-3 rounded-lg bg-gray-200 text-gray-800 flex items-center gap-2">
                                            <Loader2 size={16} className="animate-spin" />
                                            <span className="text-sm">Thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            disabled={sending}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim() || sending}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {sending ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Send size={18} />
                            )}
                            <span>Send</span>
                        </button>
                    </form>

                    {/* Helper Text */}
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        💡 Tip: Share your thoughts, feelings, or ask for advice about your day
                    </p>
                </div>
            </SectionCard>
        </div>
    );
};

const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";
    
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-md px-4 py-3 rounded-lg shadow-sm ${
                isUser 
                    ? "bg-purple-600 text-white" 
                    : "bg-white text-gray-800 border border-gray-200"
            }`}>
                <p className="text-sm mb-1 whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs ${isUser ? "text-purple-100" : "text-gray-500"}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

const SectionCard = ({ title, description, children }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {title && (
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
        )}
        <div>{children}</div>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
);

const EmptyState = ({ message }) => (
    <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-600">{message}</p>
    </div>
);

export default ChatbotContent;