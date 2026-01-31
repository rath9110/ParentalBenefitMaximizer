import React, { useState, useEffect, useRef } from 'react';
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
    const [muniSearch, setMuniSearch] = useState('');
    const [isMuniOpen, setIsMuniOpen] = useState(false);
    const muniRef = useRef(null);

    // Initial search sync
    useEffect(() => {
        if (formData.municipality) {
            setMuniSearch(formData.municipality);
        }
    }, [formData.municipality]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (muniRef.current && !muniRef.current.contains(event.target)) {
                setIsMuniOpen(false);
                // Reset search to selected if we close without selecting
                setMuniSearch(formData.municipality);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [formData.municipality]);

    const [loadingMunis, setLoadingMunis] = useState(true);

    const filteredMunicipalities = municipalities.filter(m => {
        // If the search exactly matches the current selected municipality, show all
        // This is important for the initial UX when clicking the dropdown
        if (muniSearch.toLowerCase() === formData.municipality.toLowerCase()) return true;
        return m.name.toLowerCase().includes(muniSearch.toLowerCase());
    });

    useEffect(() => {
        const loadMunis = async () => {
            console.log('[OnboardingWizard] Starting to load municipalities...');
            setLoadingMunis(true);
            try {
                const list = await fetchMunicipalities();
                console.log(`[OnboardingWizard] Successfully loaded ${list.length} municipalities.`);
                setMunicipalities(list);

                // Set default from list if matching
                const stockholm = list.find(m => m.name === 'Stockholm');
                if (stockholm) {
                    console.log('[OnboardingWizard] Setting default to Stockholm');
                    setFormData(prev => ({ ...prev, municipality: stockholm.name, taxRate: stockholm.taxRate }));
                    setMuniSearch(stockholm.name);
                }
            } catch (err) {
                console.error("[OnboardingWizard] Failed to load municipalities:", err);
            } finally {
                setLoadingMunis(false);
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

    const finish = (finalData = null) => {
        onComplete(finalData || formData);
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
                            <div ref={muniRef} style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('onboarding.municipalityLabel') || "Municipality (Tax)"}</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        value={muniSearch}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            console.log(`[OnboardingWizard] Search input: "${val}"`);
                                            setMuniSearch(val);
                                            setIsMuniOpen(true);
                                        }}
                                        onFocus={() => {
                                            console.log('[OnboardingWizard] Search focused');
                                            setIsMuniOpen(true);
                                        }}
                                        placeholder={t('onboarding.searchMunicipality') || "Search municipality..."}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                                    />
                                    {isMuniOpen && (
                                        <div style={{
                                            position: 'absolute', top: '100%', left: 0, right: 0,
                                            backgroundColor: 'white', border: '1px solid #ddd',
                                            borderRadius: '0 0 8px 8px', zIndex: 100,
                                            maxHeight: '200px', overflowY: 'auto',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                        }}>
                                            {loadingMunis ? (
                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                                                    <span className="spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #ccc', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' }}></span>
                                                    {t('onboarding.loading') || "Loading..."}
                                                </div>
                                            ) : filteredMunicipalities.length === 0 ? (
                                                <div style={{ padding: '1rem', color: '#888', fontSize: '0.9rem', textAlign: 'center' }}>
                                                    {t('onboarding.noMatches') || "No matches found"}
                                                </div>
                                            ) : (
                                                filteredMunicipalities.map(m => (
                                                    <div
                                                        key={m.name}
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, municipality: m.name, taxRate: m.taxRate }));
                                                            setMuniSearch(m.name);
                                                            setIsMuniOpen(false);
                                                        }}
                                                        style={{
                                                            padding: '0.6rem 1rem', cursor: 'pointer',
                                                            borderBottom: '1px solid #f9f9f9',
                                                            display: 'flex', justifyContent: 'space-between',
                                                            backgroundColor: formData.municipality === m.name ? '#f0f7ff' : 'transparent',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (formData.municipality !== m.name) e.currentTarget.style.backgroundColor = '#f5f5f5';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = formData.municipality === m.name ? '#f0f7ff' : 'transparent';
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: formData.municipality === m.name ? 'bold' : 'normal' }}>{m.name}</span>
                                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>{m.taxRate}%</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
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
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={formData.parentA.income}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateParent('parentA', 'income', val === '' ? '' : parseInt(val));
                                    }}
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
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={formData.parentB.income}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateParent('parentB', 'income', val === '' ? '' : parseInt(val));
                                    }}
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
                            <Button onClick={() => nextStep()}>{t('onboarding.next')}</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>{t('onboarding.selectStrategy')}</h3>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    finish({ ...formData, strategy: STRATEGIES.NONE });
                                }}
                                style={{ background: 'transparent', color: '#666', border: 'none', fontSize: '0.85rem', textDecoration: 'underline', padding: 0 }}
                            >
                                {t('onboarding.skipStrategy')}
                            </Button>
                        </div>

                        <div className="grid-responsive" style={{ marginBottom: '2rem' }}>
                            {Object.values(STRATEGIES).filter(id => id !== STRATEGIES.NONE).map(stratId => {
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button variant="secondary" onClick={prevStep} style={{ background: 'transparent', color: 'var(--color-text-main)' }}>{t('onboarding.back')}</Button>
                            <Button variant="action" onClick={() => finish()}>{t('onboarding.generatePlan')}</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OnboardingWizard;
