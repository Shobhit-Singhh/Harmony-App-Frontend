// src/components/settings/TabNavigation.jsx
import React from "react";

const TabNavigation = ({ tabs = [], activeTab, onTabChange }) => {
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TabNavigation;
