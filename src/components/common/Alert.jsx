import React from 'react';

export const Alert = ({
    children,
    variant = 'info',
    dismissible = false,
    onDismiss,
    className = '',
    ...props
}) => {
    const variants = {
        info: 'bg-blue-50 border-blue-200 text-blue-700',
        success: 'bg-green-50 border-green-200 text-green-700',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        error: 'bg-red-50 border-red-200 text-red-700',
    };

    return (
        <div className={`flex items-start p-4 border rounded-lg ${variants[variant]} ${className}`} {...props}>
            <div className="flex-1">{children}</div>
            {dismissible && (
                <button
                    type="button"
                    className="ml-auto text-gray-400 hover:text-gray-600"
                    onClick={onDismiss}
                >
                    ×
                </button>
            )}
        </div>
    );
};
Alert.displayName = 'Alert';
export default Alert;