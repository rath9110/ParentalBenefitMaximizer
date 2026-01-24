import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const LanguageToggle = ({ style, className }) => {
    const { language, toggleLanguage } = useLanguage();
    const isEn = language === 'en';

    return (
        <button
            onClick={toggleLanguage}
            className={className}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                fontWeight: '500',
                transition: 'color 0.2s',
                ...style
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
            <GlobeIcon />
            <span>{isEn ? 'Svenska' : 'English'}</span>
        </button>
    );
};

export default LanguageToggle;
