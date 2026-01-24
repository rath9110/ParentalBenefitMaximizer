import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import SEO from '../components/SEO';
import { STRATEGIES, STRATEGY_DETAILS } from '../logic/strategies';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import { fetchMunicipalities, getFallbackTaxRate } from '../logic/taxService';

const OnboardingWizard = ({ onComplete }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [municipalities, setMunicipalities] = useState([]);
    const [formData, setFormData] = useState({
        childDob: new Date().toISOString().split('T')[0], // Default today
        municipality: 'Stockholm', // Default
        taxRate: 29.82, // Default Stockholm
        parentA: { name: 'You', income: 35000, agreement: 'None', hasTopUp: false },
        parentB: { name: 'Partner', income: 35000, agreement: 'None', hasTopUp: false },
        strategy: STRATEGIES.EQUALITY // Default
    });

    useEffect(() => {
        const loadMunis = async () => {
            const list = await fetchMunicipalities();
            setMunicipalities(list);

            // Set default from list if matching
            const stockholm = list.find(m => m.name === 'Stockholm');
            if (stockholm) {
                setFormData(prev => ({ ...prev, municipality: stockholm.name, taxRate: stockholm.taxRate }));
            }
        };
        loadMunis();
    }, []);

    const updateParent = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const handleMuniChange = (e) => {
        const name = e.target.value;
        const muni = municipalities.find(m => m.name === name);
        if (muni) {
            setFormData(prev => ({ ...prev, municipality: muni.name, taxRate: muni.taxRate }));
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const finish = () => {
        onComplete(formData);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', position: 'relative' }}>
            <SEO title="Kom igång - Skapa din plan" />
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <LanguageToggle />
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('onboarding.title')}</h2>

            {/* Progress Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2].map(i => (
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

                        {/* Child DOB & Municipality */}
                        <div className="grid-responsive" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('onboarding.childDob')}</label>
                                <input
                                    type="date"
                                    value={formData.childDob}
                                    onChange={(e) => setFormData(prev => ({ ...prev, childDob: e.target.value }))}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Municipality (Tax)</label>
                                <select
                                    value={formData.municipality}
                                    onChange={handleMuniChange}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                >
                                    {municipalities.length === 0 && <option>Loading...</option>}
                                    {municipalities.map(m => (
                                        <option key={m.name} value={m.name}>{m.name} ({m.taxRate}%)</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Parent A */}
                        <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>{t('onboarding.parentAName')}</label>
                                <input
                                    type="text"
                                    value={formData.parentA.name}
                                    onChange={(e) => updateParent('parentA', 'name', e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>{t('onboarding.monthlyIncome')}</label>
                                <input
                                    type="number"
                                    value={formData.parentA.income}
                                    onChange={(e) => updateParent('parentA', 'income', parseInt(e.target.value) || 0)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.parentA.hasTopUp}
                                    onChange={(e) => updateParent('parentA', 'hasTopUp', e.target.checked)}
                                />
                                {t('onboarding.topUp')}
                            </label>
                        </div>

                        {/* Parent B */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>{t('onboarding.parentBName')}</label>
                                <input
                                    type="text"
                                    value={formData.parentB.name}
                                    onChange={(e) => updateParent('parentB', 'name', e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>{t('onboarding.monthlyIncome')}</label>
                                <input
                                    type="number"
                                    value={formData.parentB.income}
                                    onChange={(e) => updateParent('parentB', 'income', parseInt(e.target.value) || 0)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                />
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.parentB.hasTopUp}
                                    onChange={(e) => updateParent('parentB', 'hasTopUp', e.target.checked)}
                                />
                                {t('onboarding.topUp')}
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={nextStep}>{t('onboarding.next')}</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3>{t('onboarding.selectStrategy')}</h3>

                        <div className="grid-responsive" style={{ marginBottom: '2rem' }}>
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
                                            display: 'flex', flexDirection: 'column', gap: '0.5rem',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <div style={{ fontSize: '2rem' }}>{details.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{t(`onboarding.strategies.${stratId}.title`)}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{t(`onboarding.strategies.${stratId}.description`)}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="secondary" onClick={prevStep} style={{ background: 'transparent', color: 'var(--color-text-main)' }}>{t('onboarding.back')}</Button>
                            <Button variant="action" onClick={finish}>{t('onboarding.generatePlan')}</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OnboardingWizard;
