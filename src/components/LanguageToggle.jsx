import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FlagSE = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="24" height="15" style={{ display: 'block' }}>
        <rect width="16" height="10" fill="#006aa7" />
        <rect x="5" width="2" height="10" fill="#fecc00" />
        <rect y="4" width="16" height="2" fill="#fecc00" />
    </svg>
);

const FlagUK = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12" style={{ display: 'block' }}>
        <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
    </svg>
);

const LanguageToggle = ({ style, className }) => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className={className}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.1s',
                ...style
            }}
            title={language === 'en' ? 'Byt till Svenska' : 'Switch to English'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            {/* Show the flag of the language we can switch TO, or the CURRENT language? 
                User said: "toggle... with a swedish flag, that when presses changes all the copy to swedish, and displays a UK flag."
                So:
                If Current is English -> Show Swedish Flag (to switch to Swedish)
                If Current is Swedish -> Show UK Flag (to switch to English)
            */}
            {language === 'en' ? <FlagSE /> : <FlagUK />}
        </button>
    );
};

export default LanguageToggle;
