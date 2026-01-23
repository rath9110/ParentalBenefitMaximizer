import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { parseMinaSidorText } from '../utils/parser';

const LandingPage = ({ onDataParsed }) => {
    const [text, setText] = useState('');
    const [isShredding, setIsShredding] = useState(false);

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        setText(pastedText);

        // Auto-process on paste
        setIsShredding(true);

        // Simulate "Shredding" / Processing delay for effect
        setTimeout(() => {
            const data = parseMinaSidorText(pastedText);
            onDataParsed(data); // Callback to App to switch view
            setIsShredding(false);
        }, 1500); // 1.5s animation time
    };

    const handleManualProcess = () => {
        if (!text) return;
        setIsShredding(true);
        setTimeout(() => {
            const data = parseMinaSidorText(text);
            onDataParsed(data);
            setIsShredding(false);
        }, 1200);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Maximize Your Parental Benefit
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                Paste your Försäkringskassan summary below to unlock hidden savings.
            </p>

            <Card className={isShredding ? 'shredding-animation' : ''}>
                <textarea
                    placeholder="Paste text from 'Mina Sidor' here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPaste={handlePaste}
                    style={{
                        width: '100%',
                        height: '150px',
                        border: '2px dashed var(--color-primary)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        resize: 'none',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: 'var(--color-bg)',
                        outline: 'none',
                        opacity: isShredding ? 0.5 : 1,
                        transition: 'all 0.3s ease'
                    }}
                />
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleManualProcess} variant="action" disabled={!text || isShredding}>
                        {isShredding ? 'Analyzing...' : 'Analyze Now'}
                    </Button>
                </div>
            </Card>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                🔒 Privacy First: Your data is processed locally and never sent to a server.
            </p>

            {/* Basic inline style for animation demo */}
            <style>{`
        .shredding-animation {
          animation: shake 0.5s infinite;
          border-color: var(--color-action) !important;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
