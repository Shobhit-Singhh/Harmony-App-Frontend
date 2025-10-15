import React, { forwardRef } from 'react';

export const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm',
        secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-blue-500',
    };
    const sizes = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base' };
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            ref={ref}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});
Button.displayName = 'Button';
export default Button;