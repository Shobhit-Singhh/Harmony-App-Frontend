import React from 'react';

export const Container = ({ children, maxWidth = 'default', className = '', padding = true, ...props }) => {
    const maxWidths = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        default: 'max-w-7xl',
        full: 'max-w-full',
    };

    const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';

    return (
        <div className={`mx-auto ${maxWidths[maxWidth]} ${paddingClass} ${className}`} {...props}>
            {children}
        </div>
    );
};
Container.displayName = 'Container';
export default Container;   