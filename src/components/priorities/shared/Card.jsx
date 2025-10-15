import React from "react";

export const Card = ({ children }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {children}
    </div>
);

export const CardHeader = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
            {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
    </div>
);

export const ToggleOption = ({ label, description, checked, onChange }) => (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex-1">
            <p className="font-medium text-gray-800">{label}</p>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                checked ? "bg-purple-600" : "bg-gray-300"
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    checked ? "translate-x-6" : "translate-x-1"
                }`}
            />
        </button>
    </div>
);