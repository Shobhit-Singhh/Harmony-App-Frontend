import React from 'react';

export const FormGroup = ({ children, className = '', ...props }) => {
    return (
        <div className={`space-y-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const FormRow = ({ children, className = '', ...props }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`} {...props}>
            {children}
        </div>
    );
};
