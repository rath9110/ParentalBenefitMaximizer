import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { parseMinaSidorText } from '../utils/parser';

const LandingPage = ({ onDataParsed }) => {
    const [text, setText] = useState('');
    const [parsedResult, setParsedResult] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const processText = (raw) => {
        setIsProcessing(true);
        setTimeout(() => {
            const data = parseMinaSidorText(raw);
            setParsedResult(data);
            setIsProcessing(false);
        }, 800);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        setText(pastedText);
        processText(pastedText);
    };

    const handleManualProcess = () => {
        if (!text) return;
        processText(text);
    };

    const handleContinue = () => {
        if (parsedResult) {
            onDataParsed(parsedResult);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Maximize Your Parental Benefit
            </h1>

            {!parsedResult ? (
                <>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                        Paste your Försäkringskassan summary below.
                    </p>
                    <Card>
                        <textarea
                            placeholder="Paste text from 'Mina Sidor' anywhere here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onPaste={handlePaste}
                            style={{
                                width: '100%',
                                height: '150px',
                                border: '2px dashed var(--color-primary)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontFamily: 'var(--font-mono)',
                                backgroundColor: 'var(--color-bg)',
                                outline: 'none',
                                opacity: isProcessing ? 0.5 : 1
                            }}
                        />
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleManualProcess} variant="action" disabled={!text || isProcessing}>
                                {isProcessing ? 'Analyzing...' : 'Analyze'}
                            </Button>
                        </div>
                    </Card>
                </>
            ) : (
                <Card className="result-card">
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>We found your days!</h3>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>S-Level</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{parsedResult.sDays}</div>
                        </div>
                        <div style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>L-Level</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{parsedResult.lDays}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="secondary" onClick={() => { setParsedResult(null); setText(''); }}>Try Again</Button>
                        <Button onClick={handleContinue}>Continue Setup</Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default LandingPage;
