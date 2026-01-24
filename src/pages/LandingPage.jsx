import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import Tooltip from '../components/Tooltip';
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
        <div style={{ padding: '2rem 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SEO
                title="Föräldraledighet.se - Optimera din föräldraledighet 2026"
                description="Beräkna och optimera din föräldraledighet. Få ut mer tid och pengar med smarta strategier för 2026."
                canonical="https://foraldraledighet.se/"
            />

            {/* Utility Bar */}
            <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <LanguageToggle />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    {t('landing.title')}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                    {t('landing.subtitle')}
                </p>
            </div>

            {/* Focus Card */}
            <Card style={{
                padding: '2.5rem',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', // Slate shadow
                border: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* S-Level */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '8px' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--color-primary)' }}>
                                {t('landing.sLevel')}
                            </label>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                {t('landing.sLevelSecondary')}
                            </span>
                            <Tooltip text={t('landing.tooltips.sDays')} />
                        </div>
                        <input
                            type="number"
                            placeholder={t('landing.placeholderS')}
                            value={inputs.sDays}
                            onChange={(e) => handleChange('sDays', e.target.value)}
                            style={{
                                width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)', fontSize: '1.1rem',
                                color: 'var(--color-primary)', backgroundColor: 'var(--color-bg)'
                            }}
                        />
                    </div>

                    {/* L-Level */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '8px' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--color-primary)' }}>
                                {t('landing.lLevel')}
                            </label>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                {t('landing.lLevelSecondary')}
                            </span>
                            <Tooltip text={t('landing.tooltips.lDays')} />
                        </div>
                        <input
                            type="number"
                            placeholder={t('landing.placeholderL')}
                            value={inputs.lDays}
                            onChange={(e) => handleChange('lDays', e.target.value)}
                            style={{
                                width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)', fontSize: '1.1rem',
                                color: 'var(--color-primary)', backgroundColor: 'var(--color-bg)'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Reserved */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '4px' }}>
                                <label style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                    {t('landing.reserved')}
                                </label>
                                <Tooltip text={t('landing.tooltips.reserved')} />
                            </div>
                            <input
                                type="number"
                                placeholder={t('landing.placeholderReserved')}
                                value={inputs.reservedDays}
                                onChange={(e) => handleChange('reservedDays', e.target.value)}
                                style={{
                                    width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)', fontSize: '1rem',
                                    color: 'var(--color-primary)', backgroundColor: 'var(--color-bg)'
                                }}
                            />
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                {t('landing.reservedSecondary')}
                            </div>
                        </div>

                        {/* Double Days */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '4px' }}>
                                <label style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                    {t('landing.doubleDays')}
                                </label>
                                <Tooltip text={t('landing.tooltips.double')} />
                            </div>
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
                                    width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)', fontSize: '1rem',
                                    color: 'var(--color-primary)', backgroundColor: 'var(--color-bg)'
                                }}
                            />
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                {t('landing.doubleDaysSecondary')}
                            </div>
                        </div>
                    </div>

                    {/* Helper Link */}
                    <div style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
                        <a
                            href='https://www.forsakringskassan.se/privatperson/logga-in-pa-mina-sidor#/?goto=%2Fprivatperson%2Fmina-sidor%2Falla-e-tjanster%2Fmin-foraldrapenning'
                            target='_blank'
                            style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
                        >
                            {t('landing.externalHelper') || "Hitta dina dagar på Mina Sidor (Försäkringskassan)"}
                        </a>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={handleManualProcess}
                            variant="primary"
                            disabled={!inputs.sDays && !inputs.lDays}
                            style={{
                                padding: '1rem 0',
                                width: '100%',
                                maxWidth: '300px',
                                fontSize: '1.2rem',
                                backgroundColor: 'var(--color-action)',
                                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            {t('landing.continue')}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* New Articles Section */}
            <div style={{ marginTop: '6rem', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '3rem' }}>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{t('landing.strategiesTitle')}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{t('landing.strategiesIntro')}</p>
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
        </div>
    );
};

export default LandingPage;
