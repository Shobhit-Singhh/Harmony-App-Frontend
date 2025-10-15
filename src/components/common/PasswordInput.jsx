import React, { forwardRef, useState } from 'react';

export const PasswordInput = forwardRef(({ label, error, helperText, required = false, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClasses = `
    w-full px-3 py-2.5 pr-10 text-sm border rounded-lg
    bg-white placeholder-gray-400
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
  `;

    return (
        <div className="space-y-1">
            {label && <label className="block text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
            <div className="relative">
                <input ref={ref} type={showPassword ? 'text' : 'password'} className={`${inputClasses} ${className}`} {...props} />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});
PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;