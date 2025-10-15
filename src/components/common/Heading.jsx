import React from 'react';

export const Heading = ({
    level = 2,
    children,
    className = '',
    centered = false,
    color = 'default',
    ...props
}) => {
    const Tag = `h${level}`;
    const baseClasses = 'font-bold leading-tight';
    const centerClass = centered ? 'text-center' : '';

    const colors = {
        default: 'text-gray-900',
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        white: 'text-white',
    };

    const sizes = {
        1: 'text-4xl lg:text-5xl',
        2: 'text-3xl lg:text-4xl',
        3: 'text-2xl lg:text-3xl',
        4: 'text-xl lg:text-2xl',
        5: 'text-lg lg:text-xl',
        6: 'text-base lg:text-lg',
    };

    return (
        <Tag
            className={`${baseClasses} ${sizes[level]} ${colors[color]} ${centerClass} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};
Heading.displayName = 'Heading';
export default Heading;