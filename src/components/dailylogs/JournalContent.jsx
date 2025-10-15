// src/components/dailylogs/JournalContent.jsx
import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Plus,
    Trash2,
    AlertCircle,
    Circle
} from "lucide-react";
import { useDailyLogs } from "../../hooks/useDailyLogs";

const JournalContent = ({ selectedDate }) => {
    const { getLogByDate, addJournalEntry, deleteJournalEntry, loading } = useDailyLogs();
    const [logData, setLogData] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        content: "",
        entryType: "daily_thoughts",
        sentiment: "",
        topics: ""
    });

    const sentimentOptions = [
        { value: "very_happy", emoji: "😄", label: "Very Happy" },
        { value: "happy", emoji: "😊", label: "Happy" },
        { value: "neutral", emoji: "😐", label: "Neutral" },
        { value: "sad", emoji: "😢", label: "Sad" },
        { value: "angry", emoji: "😠", label: "Angry" },
    ];

    const entryTypeOptions = [
        { value: "daily_thoughts", label: "Daily Thoughts", emoji: "📝" },
        { value: "gratitude", label: "Gratitude", emoji: "🙏" },
        { value: "self_letter", label: "Self Letter", emoji: "💌" },
        { value: "motivational", label: "Motivational", emoji: "💪" },
        { value: "reflection", label: "Reflection", emoji: "🤔" },
    ];

    useEffect(() => {
        loadJournal();
    }, [selectedDate]);

    const loadJournal = async () => {
        try {
            const data = await getLogByDate(selectedDate);
            setLogData(data);
        } catch (err) {
            console.error("Failed to load journal:", err);
        }
    };

    const handleAddEntry = async () => {
        if (!newEntry.content.trim()) {
            alert("Please enter some content");
            return;
        }
        if (!newEntry.sentiment) {
            alert("Please select a sentiment");
            return;
        }

        try {
            const topicsArray = newEntry.topics
                .split(",")
                .map(t => t.trim())
                .filter(t => t.length > 0);

            await addJournalEntry(selectedDate, {
                content: newEntry.content,
                entry_type: newEntry.entryType,
                sentiment: newEntry.sentiment,
                topics: topicsArray.length > 0 ? topicsArray : ["general"]
            });

            setNewEntry({ content: "", entryType: "daily_thoughts", sentiment: "", topics: "" });
            setShowAddForm(false);
            await loadJournal();
        } catch (err) {
            console.error("Failed to add entry:", err);
        }
    };

    const handleDelete = async (timestamp) => {
        if (!confirm("Delete this journal entry?")) return;
        try {
            await deleteJournalEntry(selectedDate, timestamp);
            await loadJournal();
        } catch (err) {
            console.error("Failed to delete entry:", err);
        }
    };

    if (loading) return <LoadingSpinner />;

    const entries = logData?.journal?.entries || {};
    const entriesArray = Object.entries(entries).sort((a, b) =>
        new Date(b[0]) - new Date(a[0])
    );

    return (
        <div className="space-y-6">
            <SectionCard
                title="Journal Entries"
                description={`${entriesArray.length} entries on ${new Date(selectedDate).toLocaleDateString()}`}
                footer={
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus size={16} />
                        <span>New Entry</span>
                    </button>
                }
            >
                {showAddForm && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg space-y-4">
                        {/* Entry Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Entry Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {entryTypeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setNewEntry({ ...newEntry, entryType: option.value })}
                                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all text-sm ${newEntry.entryType === option.value
                                                ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                                                : "border-gray-200 hover:border-green-300"
                                            }`}
                                    >
                                        <span className="text-lg">{option.emoji}</span>
                                        <span className="text-xs">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What's on your mind?
                            </label>
                            <textarea
                                value={newEntry.content}
                                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                                placeholder="Write your thoughts..."
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-32"
                            />
                        </div>

                        {/* Sentiment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                How are you feeling?
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {sentimentOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setNewEntry({ ...newEntry, sentiment: option.value })}
                                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${newEntry.sentiment === option.value
                                                ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                                                : "border-gray-200 hover:border-green-300"
                                            }`}
                                    >
                                        <span className="text-2xl">{option.emoji}</span>
                                        <span className="text-sm">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Topics */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Topics (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={newEntry.topics}
                                onChange={(e) => setNewEntry({ ...newEntry, topics: e.target.value })}
                                placeholder="e.g., work, family, health"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Separate multiple topics with commas
                            </p>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleAddEntry}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Save Entry
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setNewEntry({ content: "", entryType: "daily_thoughts", sentiment: "", topics: "" });
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {entriesArray.length === 0 ? (
                        <EmptyState message="No journal entries yet. Start writing to track your thoughts!" />
                    ) : (
                        entriesArray.map(([timestamp, entry]) => (
                            <JournalEntryCard
                                key={timestamp}
                                timestamp={timestamp}
                                entry={entry}
                                onDelete={() => handleDelete(timestamp)}
                                sentimentOptions={sentimentOptions}
                            />
                        ))
                    )}
                </div>
            </SectionCard>
        </div>
    );
};

const JournalEntryCard = ({ timestamp, entry, onDelete, sentimentOptions }) => {
    const [content, entryType, sentiment, topics] = entry;
    const sentimentEmoji = sentimentOptions.find(s => s.value === sentiment)?.emoji || "😐";

    // Entry type labels with emojis
    const entryTypeLabels = {
        "daily_thoughts": { label: "Daily Thoughts", emoji: "📝" },
        "gratitude": { label: "Gratitude", emoji: "🙏" },
        "self_letter": { label: "Self Letter", emoji: "💌" },
        "motivational": { label: "Motivational", emoji: "💪" },
        "reflection": { label: "Reflection", emoji: "🤔" },
        "text": { label: "Text", emoji: "📄" }
    };
    const typeInfo = entryTypeLabels[entryType] || { label: entryType || "text", emoji: entryTypeLabels.emoji };

    return (
        <div className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
            {/* Header with timestamp and delete button */}
            <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-gray-500">{new Date(timestamp).toLocaleString()}</p>
                <button
                    onClick={onDelete}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Content Preview - Now at top */}
            <p className="text-base text-gray-800 whitespace-pre-wrap line-clamp-3 mb-3 leading-relaxed"> {typeInfo.label}</p>

            {/* Metadata badges - Now at bottom */}
            <div className="flex items-center gap-2 flex-wrap">
                {/* Entry Type Badge */}
                <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded capitalize flex items-center gap-1">
                    {content}
                </span>

                {/* Sentiment Badge */}
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded capitalize flex items-center gap-1">
                    {sentiment || "neutral"}
                </span>

                {/* Topic Tags */}
                {topics && topics.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {topics.map((topic, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const SectionCard = ({ title, description, children, footer }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {title && (
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
                {footer}
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
            <Circle size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-600">{message}</p>
    </div>
);

export default JournalContent;