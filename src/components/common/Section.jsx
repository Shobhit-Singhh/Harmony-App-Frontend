import React from 'react';

export const Section = ({ children, className = '', padding = 'default', background = 'white', ...props }) => {
    const paddings = {
        none: '',
        sm: 'py-8',
        default: 'py-16',
        lg: 'py-24',
    };

    const backgrounds = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        blue: 'bg-blue-50',
        primary: 'bg-blue-600',
        dark: 'bg-gray-900',
    };

    return (
        <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`} {...props}>
            {children}
        </section>
    );
};
Section.displayName = 'Section';
export default Section;