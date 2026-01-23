import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const OnboardingWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        incomeParentA: 35000,
        incomeParentB: 35000,
        employer: '',
        goal: 'cash' // 'cash' or 'time'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const finish = () => {
        onComplete(formData);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Let's customize your plan</h2>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: i === step ? 'var(--color-primary)' : '#ddd'
                        }} />
                    ))}
                </div>
            </div>

            <Card>
                {step === 1 && (
                    <div>
                        <h3>What is your monthly income?</h3>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>We use this to calculate your SGI and top-ups.</p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Parent A (You)</label>
                            <input
                                type="number"
                                value={formData.incomeParentA}
                                onChange={(e) => handleChange('incomeParentA', parseInt(e.target.value))}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                            />
                            <span className="text-mono text-muted">{formData.incomeParentA.toLocaleString()} SEK/mo</span>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Parent B (Partner)</label>
                            <input
                                type="number"
                                value={formData.incomeParentB}
                                onChange={(e) => handleChange('incomeParentB', parseInt(e.target.value))}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                            />
                            <span className="text-mono text-muted">{formData.incomeParentB.toLocaleString()} SEK/mo</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3>Who is your employer?</h3>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Some employers pay more. We'll check your specific agreement.</p>

                        <select
                            value={formData.employer}
                            onChange={(e) => handleChange('employer', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc', marginBottom: '2rem' }}
                        >
                            <option value="">Select Agreement...</option>
                            <option value="ITP1">Private Sector (ITP1)</option>
                            <option value="KAP-KL">Municipal (KAP-KL)</option>
                            <option value="PA-16">State (PA-16)</option>
                            <option value="Other">Other / No Collective Agreement</option>
                        </select>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="secondary" onClick={prevStep} style={{ background: 'transparent', color: 'var(--color-text-main)' }}>Back</Button>
                            <Button onClick={nextStep} disabled={!formData.employer}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3>What is your main goal?</h3>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>We'll optimize the algorithms for this.</p>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <div
                                onClick={() => handleChange('goal', 'time')}
                                style={{
                                    flex: 1, padding: '1rem', border: `2px solid ${formData.goal === 'time' ? 'var(--color-primary)' : '#eee'}`,
                                    borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center'
                                }}
                            >
                                <h4>Max Time</h4>
                                <p style={{ fontSize: '0.8rem' }}>Stretch days for 1.5+ years home.</p>
                            </div>
                            <div
                                onClick={() => handleChange('goal', 'cash')}
                                style={{
                                    flex: 1, padding: '1rem', border: `2px solid ${formData.goal === 'cash' ? 'var(--color-primary)' : '#eee'}`,
                                    borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center'
                                }}
                            >
                                <h4>Max Cash</h4>
                                <p style={{ fontSize: '0.8rem' }}>Get highest monthly payout.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="secondary" onClick={prevStep} style={{ background: 'transparent', color: 'var(--color-text-main)' }}>Back</Button>
                            <Button variant="action" onClick={finish}>Generate Plan</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OnboardingWizard;
