// src/components/common/ErrorFallback.jsx
import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
            <p className="mt-2 text-sm text-gray-600">{error?.message || "Unknown error"}</p>
            <div className="mt-4 flex gap-2">
                <button
                    onClick={resetErrorBoundary}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Try again
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                    Reload
                </button>
            </div>
        </div>
    </div>
);

ErrorFallback.displayName = "ErrorFallback";
export default ErrorFallback;
