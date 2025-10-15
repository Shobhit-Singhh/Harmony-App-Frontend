import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, helperText, required = false, className = '', ...props }, ref) => {
    const inputClasses = `
    w-full px-3 py-2.5 text-sm border rounded-lg
    bg-white placeholder-gray-400
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
  `;

    return (
        <div className="space-y-1">
            {label && <label className="block text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
            <input ref={ref} className={`${inputClasses} ${className}`} {...props} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});
Input.displayName = 'Input';
export default Input;
