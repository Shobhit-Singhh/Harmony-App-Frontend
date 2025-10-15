// src/pages/DailyLogs.jsx
import React, { useState } from "react";
import { Calendar } from "lucide-react";

// Import all content components
import OverviewContent from "../components/dailylogs/OverviewContent";
import CheckinsContent from "../components/dailylogs/CheckinsContent";
import JournalContent from "../components/dailylogs/JournalContent";
import ChatbotContent from "../components/dailylogs/ChatbotContent";
import ActivitiesContent from "../components/dailylogs/ActivitiesContent";
import AnalyticsContent from "../components/dailylogs/AnalyticsContent";

const DailyLogs = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const tabs = ["Overview", "Check-ins", "Journal", "Chatbot", "Activities", "Analytics"];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <DailyLogsHeader
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />

                <div
                    key={activeTab}
                    className="transition-opacity duration-200"
                >
                    {activeTab === "Overview" && <OverviewContent selectedDate={selectedDate} />}
                    {activeTab === "Check-ins" && <CheckinsContent selectedDate={selectedDate} />}
                    {activeTab === "Journal" && <JournalContent selectedDate={selectedDate} />}
                    {activeTab === "Chatbot" && <ChatbotContent selectedDate={selectedDate} />}
                    {activeTab === "Activities" && <ActivitiesContent selectedDate={selectedDate} />}
                    {activeTab === "Analytics" && <AnalyticsContent />}
                </div>
            </div>
        </DashboardLayout>
    );
};

// ---------------- Layout ----------------
const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/30 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-200/25 rounded-full blur-md" />
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/15 rounded-full blur-lg" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {children}
        </div>
    </div>
);

// ---------------- Daily Logs Header ----------------
const DailyLogsHeader = ({ tabs, activeTab, onTabChange, selectedDate, onDateChange }) => (
    <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Icon */}
            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center ring-1 ring-gray-100">
                <Calendar size={48} className="text-blue-600" />
            </div>

            {/* Header Info */}
            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                    Daily Logs
                </h1>
                <p className="text-sm text-gray-600">
                    Track your daily activities, moods, and progress
                </p>
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        {/* Tab Bar */}
        <div className="mt-6 flex justify-center overflow-x-auto">
            <div className="inline-flex bg-transparent rounded-lg overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none whitespace-nowrap ${
                            activeTab === tab
                                ? "border-blue-500 text-gray-900"
                                : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default DailyLogs;