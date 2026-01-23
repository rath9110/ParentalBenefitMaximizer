import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = ({ onDataParsed }) => {
    const [inputs, setInputs] = useState({
        sDays: '',
        lDays: '',
        reservedDays: ''
    });

    const handleChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const handleManualProcess = () => {
        const s = parseInt(inputs.sDays) || 0;
        const l = parseInt(inputs.lDays) || 0;
        const r = parseInt(inputs.reservedDays) || 0;

        if (s <= 0 && l <= 0) return; // Basic validation

        // Pass structured data
        onDataParsed({
            sDays: s,
            lDays: l,
            reservedDays: r
        });
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Maximize Your Parental Benefit
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                Enter your available days from Försäkringskassan.
            </p>

            <Card>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* S-Level */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Sjukpenningnivå (S-Level)
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder="e.g. 195"
                                value={inputs.sDays}
                                onChange={(e) => handleChange('sDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">days left</span>
                        </div>
                    </div>

                    {/* L-Level */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Lägstanivå (L-Level)
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder="e.g. 45"
                                value={inputs.lDays}
                                onChange={(e) => handleChange('lDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">days left</span>
                        </div>
                    </div>

                    {/* Reserved */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-alert)' }}>
                            Start Date Locked/Reserved Days
                        </label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                            "Number of days that can't be transferred to my partner"
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder="e.g. 90"
                                value={inputs.reservedDays}
                                onChange={(e) => handleChange('reservedDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-alert)',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">days locked</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleManualProcess} variant="action" disabled={!inputs.sDays && !inputs.lDays}>
                            Continue Setup
                        </Button>
                    </div>
                </div>
            </Card>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                ℹ️ <strong>Tip:</strong> These values set your total budget. You'll plan exactly how to use them next.
            </p>
        </div>
    );
};

export default LandingPage;
