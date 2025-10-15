// src/components/dailylogs/AnalyticsContent.jsx
import React from "react";
import { BarChart3 } from "lucide-react";

const AnalyticsContent = () => {
    return (
        <div className="space-y-6">
            <SectionCard title="Analytics" description="Coming soon">
                <div className="text-center py-12 text-gray-600">
                    <BarChart3 size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Analytics and insights will be available soon</p>
                    <p className="text-sm mt-2 text-gray-500">
                        Track trends, view streaks, and analyze your progress over time
                    </p>
                </div>
            </SectionCard>
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

export default AnalyticsContent;