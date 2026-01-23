import React from 'react';

const Card = ({ children, className = '', title }) => {
    return (
        <div
            className={`card ${className}`}
            style={{
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--spacing-md)'
            }}
        >
            {title && <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
