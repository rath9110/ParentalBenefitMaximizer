import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import SEO from '../components/SEO';

const LandingPage = ({ onDataParsed, onNavigate }) => {
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
            <SEO
                title="Föräldraledighet.se - Verktyg för att maxa dagarna & ekonomin"
                description="Gratis verktyg för att planera föräldraledighet. Räkna ut din ersättning, fördela dagarna smart och optimera hushållets inkomst 2026."
                canonical="https://foraldraledighet.se/"
            />
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
                                onChange={(e) => {
                                    let val = parseInt(e.target.value) || '';
                                    if (val > 60) val = 60;
                                    handleChange('doubleDays', val);
                                }}
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

            {/* New Articles Section */}
            <div style={{ marginTop: '4rem', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1rem' }}>Spara & Planera</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('FAQ_2026'); }}
                            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>📄</span> Föräldrapenning 2026: Allt om Prisbasbelopp
                        </a>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', paddingLeft: '1.8rem' }}>
                            Vad är prisbasbeloppet för 2026? Hur påverkar det mitt SGI-tak? Vi svarar på vanliga frågor med schema-stöd för AI.
                        </p>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('HIGH_INCOME_2026'); }}
                            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>💰</span> Höginkomsttagarens guide: Optimera din föräldralön och skatt 2026
                        </a>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', paddingLeft: '1.8rem' }}>
                            Tjänar du över brytpunkten? Lär dig hur du skyddar din inkomst och planerar skattesmart med "net match".
                        </p>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('SGI_PROTECTION_2026'); }}
                            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>👶</span> SGI-skydd efter 1 år: Så undviker du att din ersättning nollas
                        </a>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', paddingLeft: '1.8rem' }}>
                            Den kritiska 1-årsdagen och 5-dagarsregeln. Vi förklarar hur du använder "SGI-gardet" för att behålla din ersättning.
                        </p>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('HOLIDAY_2026'); }}
                            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>☀️</span> Semester & Föräldrapenning: Maximera din ledighet sommaren 2026
                        </a>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', paddingLeft: '1.8rem' }}>
                            Lär dig "sandwich-metoden" och hur du bäst kombinerar semester med föräldradagar för en längre sommar.
                        </p>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('TRANSFER_DAYS_2026'); }}
                            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>👵</span> Överlåtelse av dagar: Så involverar du mor- och farföräldrar
                        </a>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', paddingLeft: '1.8rem' }}>
                            Möjligheten att överlåta dagar till anhöriga. Regler för SGI, pensionärer och hur ni maximerar familjepusslet.
                        </p>
                    </li>
                </ul>
            </div>

            <p
                style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}
                dangerouslySetInnerHTML={{ __html: t('landing.tip') }}
            />
        </div>
    );
};

export default LandingPage;
