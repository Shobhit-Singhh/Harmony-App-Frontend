// src/components/common/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ progress = 0, label }) => {
    // Ensure progress is between 0 and 100
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full">
            {label && <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>}
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${safeProgress}%` }}
                />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{safeProgress}%</div>
        </div>
    );
};

export default ProgressBar;
