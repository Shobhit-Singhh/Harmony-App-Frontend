// src/components/dailylogs/OverviewContent.jsx
import React, { useState, useEffect } from "react";
import {
    Heart,
    BookOpen,
    MessageSquare,
    Activity,
    Target,
    Zap,
    Moon,
    Coffee,
    TrendingUp,
    Smile,
    Frown,
    Meh,
    Circle,
    AlertCircle
} from "lucide-react";
import { useDailyLogs } from "../../hooks/useDailyLogs";

const OverviewContent = ({ selectedDate }) => {
    const { getTodayLog, getLogByDate, loading, error } = useDailyLogs();
    const [logData, setLogData] = useState(null);

    useEffect(() => {
        loadLog();
    }, [selectedDate]);

    const loadLog = async () => {
        try {
            const isToday = selectedDate === new Date().toISOString().split('T')[0];
            const data = isToday ? await getTodayLog() : await getLogByDate(selectedDate);
            setLogData(data);
        } catch (err) {
            console.error("Failed to load log:", err);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;
    if (!logData) return <EmptyState message="No data available for this date" />;

    // Get latest check-in values
    const getLatestValue = (field) => {
        if (!logData.checkin || !logData.checkin[field]) return null;
        const entries = Object.entries(logData.checkin[field]);
        if (entries.length === 0) return null;
        const sorted = entries.sort((a, b) => new Date(b[0]) - new Date(a[0]));
        return sorted[0][1];
    };

    const mood = getLatestValue('mood');
    const stress = getLatestValue('stress_level');
    const energy = getLatestValue('energy_level');
    const sleep = getLatestValue('sleep');

    // Count activities and journal entries
    const totalActivities = Object.values(logData.activities || {}).flat().length;
    const journalEntries = Object.keys(logData.journal?.entries || {}).length;
    const chatMessages = logData.chatbot?.conversation?.length || 0;

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickStatCard
                    icon={<Heart size={20} />}
                    label="Mood"
                    value={mood || "Not set"}
                    color="pink"
                />
                <QuickStatCard
                    icon={<Zap size={20} />}
                    label="Energy"
                    value={energy || "Not set"}
                    color="yellow"
                />
                <QuickStatCard
                    icon={<Activity size={20} />}
                    label="Stress"
                    value={stress || "Not set"}
                    color="purple"
                />
                <QuickStatCard
                    icon={<Moon size={20} />}
                    label="Sleep Quality"
                    value={sleep?.quality || "Not set"}
                    color="blue"
                />
            </div>

            {/* Today's Summary */}
            <SectionCard title="Today's Summary" description={`Overview for ${new Date(selectedDate).toLocaleDateString()}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryItem
                        icon={<Target size={24} />}
                        label="Activities Tracked"
                        value={totalActivities}
                        color="blue"
                    />
                    <SummaryItem
                        icon={<BookOpen size={24} />}
                        label="Journal Entries"
                        value={journalEntries}
                        color="green"
                    />
                    <SummaryItem
                        icon={<MessageSquare size={24} />}
                        label="Chat Messages"
                        value={chatMessages}
                        color="purple"
                    />
                </div>
            </SectionCard>

            {/* Latest Check-in Details */}
            {(mood || stress || energy || sleep) && (
                <SectionCard title="Latest Check-in" description="Most recent wellness check">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mood && (
                            <CheckinDetailCard
                                icon={getMoodIcon(mood)}
                                label="Mood"
                                value={mood}
                                color="pink"
                            />
                        )}
                        {stress && (
                            <CheckinDetailCard
                                icon={<Activity size={18} />}
                                label="Stress Level"
                                value={stress}
                                color="purple"
                            />
                        )}
                        {energy && (
                            <CheckinDetailCard
                                icon={<Zap size={18} />}
                                label="Energy Level"
                                value={energy}
                                color="yellow"
                            />
                        )}
                        {sleep && (
                            <CheckinDetailCard
                                icon={<Moon size={18} />}
                                label="Sleep"
                                value={`${sleep.duration} min - ${sleep.quality}`}
                                color="blue"
                            />
                        )}
                    </div>
                </SectionCard>
            )}

            {/* Recent Journal Entries */}
            {journalEntries > 0 && (
                <SectionCard title="Recent Journal Entries" description={`${journalEntries} entries today`}>
                    <div className="space-y-3">
                        {Object.entries(logData.journal.entries).slice(0, 3).map(([timestamp, entry]) => (
                            <JournalPreviewCard key={timestamp} timestamp={timestamp} entry={entry} />
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* Activity Categories Overview */}
            {totalActivities > 0 && (
                <SectionCard title="Activities Overview" description="Quick view of all categories">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActivityCategoryCard
                            category="Health"
                            count={logData.activities.health_activity?.length || 0}
                            icon={<Heart size={20} />}
                            color="red"
                        />
                        <ActivityCategoryCard
                            category="Work"
                            count={logData.activities.work_activity?.length || 0}
                            icon={<Coffee size={20} />}
                            color="blue"
                        />
                        <ActivityCategoryCard
                            category="Growth"
                            count={logData.activities.growth_activity?.length || 0}
                            icon={<TrendingUp size={20} />}
                            color="green"
                        />
                        <ActivityCategoryCard
                            category="Relationship"
                            count={logData.activities.relationship_activity?.length || 0}
                            icon={<Heart size={20} />}
                            color="purple"
                        />
                    </div>
                </SectionCard>
            )}
        </div>
    );
};

// Subcomponents
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

const QuickStatCard = ({ icon, label, value, color }) => {
    const colorClasses = {
        pink: "bg-pink-50 text-pink-600",
        yellow: "bg-yellow-50 text-yellow-600",
        purple: "bg-purple-50 text-purple-600",
        blue: "bg-blue-50 text-blue-600",
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className={`w-10 h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-lg font-semibold text-gray-800 capitalize">{value}</p>
        </div>
    );
};

const SummaryItem = ({ icon, label, value, color }) => {
    const colorClasses = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        purple: "text-purple-600 bg-purple-50",
    };

    return (
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

const CheckinDetailCard = ({ icon, label, value, color }) => {
    const colorClasses = {
        pink: "border-pink-200 bg-pink-50",
        purple: "border-purple-200 bg-purple-50",
        yellow: "border-yellow-200 bg-yellow-50",
        blue: "border-blue-200 bg-blue-50",
    };

    return (
        <div className={`p-4 border ${colorClasses[color]} rounded-lg`}>
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <p className="text-lg font-semibold text-gray-800 capitalize">{value}</p>
        </div>
    );
};

const JournalPreviewCard = ({ timestamp, entry }) => (
    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-gray-500">{new Date(timestamp).toLocaleTimeString()}</p>
            <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                {entry[1] || "neutral"}
            </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{entry[0]}</p>
    </div>
);

const ActivityCategoryCard = ({ category, count, icon, color }) => {
    const colorClasses = {
        red: "bg-red-50 text-red-600",
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div className="p-4 border border-gray-100 rounded-lg">
            <div className={`w-10 h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-sm text-gray-600 mb-1">{category}</p>
            <p className="text-2xl font-semibold text-gray-800">{count}</p>
            <p className="text-xs text-gray-500 mt-1">activities</p>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
);

const ErrorAlert = ({ message }) => (
    <SectionCard>
        <div className="flex items-center gap-3 text-red-700 p-4 bg-red-50 border border-red-100 rounded-lg">
            <AlertCircle size={20} />
            <span>{message}</span>
        </div>
    </SectionCard>
);

const EmptyState = ({ message }) => (
    <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Circle size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-600">{message}</p>
    </div>
);

const getMoodIcon = (mood) => {
    switch (mood?.toLowerCase()) {
        case "happy":
        case "high":
            return <Smile size={18} className="text-green-600" />;
        case "sad":
        case "low":
            return <Frown size={18} className="text-red-600" />;
        case "medium":
        case "neutral":
        default:
            return <Meh size={18} className="text-yellow-600" />;
    }
};

export default OverviewContent;