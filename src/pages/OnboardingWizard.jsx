import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { STRATEGIES, STRATEGY_DETAILS } from '../logic/strategies';

const OnboardingWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        parentA: { name: 'You', income: 35000, agreement: 'None', hasTopUp: false },
        parentB: { name: 'Partner', income: 35000, agreement: 'None', hasTopUp: false },
        strategy: STRATEGIES.BALANCED // Default
    });

    const updateParent = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const finish = () => {
        onComplete(formData);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Let's customize your plan</h2>

            {/* Progress Dots */}
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
                    <div className="step-content">
                        <h3>Who are the parents?</h3>
                        {/* Same as before... reusing previous code structure but omitting for brevity if unchanged? 
                 Actually, best to keep full file content to avoid "search replace" errors with context. */}

                        {/* Parent A */}
                        <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Parent A Name</label>
                                <input
                                    type="text"
                                    value={formData.parentA.name}
                                    onChange={(e) => updateParent('parentA', 'name', e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Monthly Income</label>
                                <input
                                    type="number"
                                    value={formData.parentA.income}
                                    onChange={(e) => updateParent('parentA', 'income', parseInt(e.target.value) || 0)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                        </div>

                        {/* Parent B */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Parent B Name</label>
                                <input
                                    type="text"
                                    value={formData.parentB.name}
                                    onChange={(e) => updateParent('parentB', 'name', e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Monthly Income</label>
                                <input
                                    type="number"
                                    value={formData.parentB.income}
                                    onChange={(e) => updateParent('parentB', 'income', parseInt(e.target.value) || 0)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3>Employer Agreements</h3>
                        {/* Parent A Agreement */}
                        <div style={{ marginBottom: '2rem' }}>
                            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>{formData.parentA.name}</strong>
                            <select
                                value={formData.parentA.agreement}
                                onChange={(e) => updateParent('parentA', 'agreement', e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc', marginBottom: '0.5rem' }}
                            >
                                <option value="None">No Agreement / Unsure</option>
                                <option value="ITP1">Private Sector (ITP1)</option>
                                <option value="Other">Other</option>
                            </select>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.parentA.hasTopUp}
                                    onChange={(e) => updateParent('parentA', 'hasTopUp', e.target.checked)}
                                />
                                Apply "10% Top-up" Calculation
                            </label>
                        </div>

                        {/* Parent B Agreement */}
                        <div style={{ marginBottom: '2rem' }}>
                            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>{formData.parentB.name}</strong>
                            <select
                                value={formData.parentB.agreement}
                                onChange={(e) => updateParent('parentB', 'agreement', e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc', marginBottom: '0.5rem' }}
                            >
                                <option value="None">No Agreement / Unsure</option>
                                <option value="ITP1">Private Sector (ITP1)</option>
                                <option value="Other">Other</option>
                            </select>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.parentB.hasTopUp}
                                    onChange={(e) => updateParent('parentB', 'hasTopUp', e.target.checked)}
                                />
                                Apply "10% Top-up" Calculation
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="secondary" onClick={prevStep} style={{ background: 'transparent', color: 'var(--color-text-main)' }}>Back</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3>Select a Strategy</h3>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                            Based on your profile, here are optimized templates.
                        </p>

                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            {Object.values(STRATEGIES).map(stratId => {
                                const details = STRATEGY_DETAILS[stratId];
                                const isSelected = formData.strategy === stratId;

                                return (
                                    <div
                                        key={stratId}
                                        onClick={() => setFormData(prev => ({ ...prev, strategy: stratId }))}
                                        style={{
                                            border: `2px solid ${isSelected ? 'var(--color-primary)' : '#eee'}`,
                                            background: isSelected ? '#fdfdfd' : 'white',
                                            borderRadius: '8px', padding: '1rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '1rem'
                                        }}
                                    >
                                        <div style={{ fontSize: '2rem' }}>{details.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{details.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{details.description}</div>
                                        </div>
                                    </div>
                                )
                            })}
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
