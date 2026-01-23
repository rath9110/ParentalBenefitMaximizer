import React from 'react';
import '../index.css'; // Ensure styles are loaded

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseClass = 'btn';
    const variantClass = variant === 'action' ? 'btn-action' : 'btn-primary';

    return (
        <button
            className={`${baseClass} ${variantClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
