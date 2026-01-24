import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const LandingPage = ({ onDataParsed }) => {
    const { t } = useLanguage();
    const [inputs, setInputs] = useState({
        sDays: '',
        lDays: '',
        reservedDays: '',
        doubleDays: ''
    });

    const handleChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const handleManualProcess = () => {
        const s = parseInt(inputs.sDays) || 0;
        const l = parseInt(inputs.lDays) || 0;
        const r = parseInt(inputs.reservedDays) || 0;
        const d = parseInt(inputs.doubleDays) || 0;

        if (s <= 0 && l <= 0) return; // Basic validation

        // Pass structured data
        onDataParsed({
            sDays: s,
            lDays: l,
            reservedDays: r,
            doubleDays: d
        });
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <LanguageToggle />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                {t('landing.title')}
            </h1>
            <p
                style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}
                dangerouslySetInnerHTML={{ __html: t('landing.subtitle') }}
            />

            <Card>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* S-Level */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {t('landing.sLevel')}
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder={t('landing.placeholderS')}
                                value={inputs.sDays}
                                onChange={(e) => handleChange('sDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">{t('landing.daysLeft')}</span>
                        </div>
                    </div>

                    {/* L-Level */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {t('landing.lLevel')}
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder={t('landing.placeholderL')}
                                value={inputs.lDays}
                                onChange={(e) => handleChange('lDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">{t('landing.daysLeft')}</span>
                        </div>
                    </div>

                    {/* Reserved */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-alert)' }}>
                            {t('landing.reserved')}
                        </label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                            {t('landing.reservedDesc')}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder={t('landing.placeholderReserved')}
                                value={inputs.reservedDays}
                                onChange={(e) => handleChange('reservedDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-alert)',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">{t('landing.daysLocked')}</span>
                        </div>
                    </div>

                    {/* Double Days (New) */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#8E44AD' }}>
                            {t('landing.doubleDays')}
                        </label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                            {t('landing.doubleDaysDesc')}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder={t('landing.placeholderDouble')}
                                value={inputs.doubleDays}
                                onChange={(e) => handleChange('doubleDays', e.target.value)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #8E44AD',
                                    fontSize: '1rem'
                                }}
                            />
                            <span className="text-muted">
                                {t('landing.daysCount').replace('{total}', (parseInt(inputs.doubleDays) || 0) * 2)}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleManualProcess} variant="action" disabled={!inputs.sDays && !inputs.lDays}>
                            {t('landing.continue')}
                        </Button>
                    </div>
                </div>
            </Card>

            <p
                style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}
                dangerouslySetInnerHTML={{ __html: t('landing.tip') }}
            />
        </div>
    );
};

export default LandingPage;
