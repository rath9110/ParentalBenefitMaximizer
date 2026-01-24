import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import CalendarView from '../components/CalendarView';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { HOLIDAYS_2026 } from '../config/constants';
import { generateStrategyPattern } from '../logic/strategies';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import { calculateAnnualMixedNet } from '../logic/taxCalculator';
import ExportModal from '../components/ExportModal';

const Dashboard = ({ benefitData, userProfile, onReset }) => {
    const { t } = useLanguage();
    // --- State ---
    // allocatedDays: Record<dateStr, { parentId: string, type: 'S' | 'L' }>
    const [allocatedDays, setAllocatedDays] = useState(() => {
        // Auto-fill logic on init
        if (userProfile && userProfile.strategy) {
            // CORRECTED CALL: 6 Arguments
            return generateStrategyPattern(
                userProfile.strategy,
                new Date(),
                benefitData?.sDays || 0,
                benefitData?.lDays || 0,
                userProfile,
                benefitData?.doubleDays || 0,
                userProfile.childDob
            );
        }
        return {};
    });

    const [activeParent, setActiveParent] = useState('parentA');
    const [activeType, setActiveType] = useState('S'); // 'S' or 'L'
    const [isExportOpen, setIsExportOpen] = useState(false);

    // --- Logic ---
    const totalS = benefitData?.sDays || 0;
    const totalL = benefitData?.lDays || 0;
    const reservedS = benefitData?.reservedDays || 0;
    const plannedDouble = benefitData?.doubleDays || 0;

    const counts = useMemo(() => {
        let usedS = 0;
        let usedL = 0;
        let usedS_Partner = 0;

        Object.entries(allocatedDays).forEach(([dateStr, val]) => {
            // Robust parsing: "2026-01-01" -> 2026, 0, 1
            const [y, m, d] = dateStr.split('-').map(Number);
            const date = new Date(y, m - 1, d); // Local midnight
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isHoliday = HOLIDAYS_2026.includes(dateStr);

            // Count all allocations, even on weekends/holidays if they exist in the map


            // val is { parentA: {type: 'S'}, parentB: {type: 'S'} }
            Object.values(val).forEach(allocation => {
                const amount = allocation.extent || 1;
                if (allocation.type === 'S') {
                    usedS += amount;
                    if (allocation.parentId === 'parentB') usedS_Partner += amount;
                }
                if (allocation.type === 'L') usedL += amount;
            });
        });

        // Round to 1 decimal for display
        return {
            usedS: Math.round(usedS * 10) / 10,
            usedL: Math.round(usedL * 10) / 10,
            usedS_Partner: Math.round(usedS_Partner * 10) / 10
        };
    }, [allocatedDays]);

    const sLeft = Math.round((totalS - counts.usedS) * 10) / 10;
    const lLeft = Math.round((totalL - counts.usedL) * 10) / 10;
    const partnerMaxS = Math.max(0, totalS - reservedS);
    const partnerSLeft = Math.round((partnerMaxS - counts.usedS_Partner) * 10) / 10;

    // Household Net Calculation (Annualized Estimate)
    const calculateHouseholdNet = () => {
        // 1. Aggregate Year 1 Gross Income for each Parent
        let grossWorkA = 0;
        let grossBenefitA = 0;
        let grossWorkB = 0;
        let grossBenefitB = 0;

        // Helper to get daily salary rate
        const getDailySalary = (income) => (income * 12) / 365;

        const today = new Date();
        // Loop 1 year from now
        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dStr = `${y}-${m}-${day}`;

            const allocationMap = allocatedDays[dStr];
            const isHoliday = HOLIDAYS_2026.includes(dStr);
            const wDay = d.getDay();
            const isWeekend = wDay === 0 || wDay === 6;
            const isFreeTime = isWeekend || isHoliday;

            const allocA = allocationMap?.parentA || null;
            const allocB = allocationMap?.parentB || null;

            // Parent A
            // Base Salary (Always earned unless deducted for work-day absence)
            // Deduction only happens if (Allocated AND WorkDay)
            let deductA = false;
            let benefitA = 0;

            if (allocA) {
                const extent = allocA.extent || 1;
                // Calculate Benefit
                if (allocA.type === 'S') {
                    const cappedIncome = Math.min(userProfile.parentA.income, 45000);
                    benefitA += ((cappedIncome * 12 * 0.8) / 365) * extent;
                    if (userProfile.parentA.hasTopUp) {
                        // Top up usually only for Work Days? Or if you take S-days?
                        // Collective agreement usually pays top-up on S-days regardless?
                        // Let's assume yes.
                        benefitA += ((userProfile.parentA.income * 12 * 0.1) / 365) * extent;
                    }
                } else {
                    benefitA += 180 * extent;
                }

                // Work Day logic
                if (!isFreeTime) {
                    deductA = true;
                    // If fractional (extent < 1), we deduct 'extent' salary.
                    // But we add (1-extent) salary.
                    // Simplified: Add Salary * (1-extent).
                }
            }

            // Add Salary
            const dailySalA = getDailySalary(userProfile.parentA.income);
            if (deductA) {
                const extent = allocA?.extent || 1;
                grossWorkA += dailySalA * (1 - extent);
            } else {
                grossWorkA += dailySalA;
            }
            grossBenefitA += benefitA;


            // Parent B (Same Logic)
            let deductB = false;
            let benefitB = 0;

            if (allocB) {
                const extent = allocB.extent || 1;
                if (allocB.type === 'S') {
                    const cappedIncome = Math.min(userProfile.parentB.income, 45000);
                    benefitB += ((cappedIncome * 12 * 0.8) / 365) * extent;
                    if (userProfile.parentB.hasTopUp) {
                        benefitB += ((userProfile.parentB.income * 12 * 0.1) / 365) * extent;
                    }
                } else {
                    benefitB += 180 * extent;
                }

                if (!isFreeTime) deductB = true;
            }

            const dailySalB = getDailySalary(userProfile.parentB.income);
            if (deductB) {
                const extent = allocB?.extent || 1;
                grossWorkB += dailySalB * (1 - extent);
            } else {
                grossWorkB += dailySalB;
            }
            grossBenefitB += benefitB;
        }

        // 2. Calculate Net
        const taxRate = userProfile.taxRate || 32.0;
        const netA = calculateAnnualMixedNet(grossWorkA, grossBenefitA, taxRate);
        const netB = calculateAnnualMixedNet(grossWorkB, grossBenefitB, taxRate);

        return Math.round((netA + netB) / 12);
    };

    const scorecardNet = useMemo(() => calculateHouseholdNet(), [allocatedDays, userProfile]);

    const handleToggleDay = (dateStr, parentId) => {
        setAllocatedDays(prev => {
            const currentDayMap = prev[dateStr] || {};
            // currentDayMap is { parentA: {...}, parentB: {...} } or empty

            const newMap = { ...prev };
            const parentAlloc = currentDayMap[parentId];

            if (parentAlloc) {
                // Determine if we are just removing THIS parent's allocation
                const newDayMap = { ...currentDayMap };
                delete newDayMap[parentId];

                if (Object.keys(newDayMap).length === 0) {
                    delete newMap[dateStr];
                } else {
                    newMap[dateStr] = newDayMap;
                }
            } else {
                // Adding allocation
                if (activeType === 'S') {
                    if (sLeft <= 0) return prev;
                    if (parentId === 'parentB' && partnerSLeft <= 0) {
                        alert(t('dashboard.partnerLimit').replace('{days}', reservedS));
                        return prev;
                    }
                } else {
                    if (lLeft <= 0) return prev;
                    // Double day constraint check for L-level (must have 180 S first) is too complex for this click handler currently
                }

                // Check double day limit? 
                // We'll leave it loose for now (user can overdraw into double days) but visually track it?

                newMap[dateStr] = {
                    ...currentDayMap,
                    [parentId]: { parentId, type: activeType }
                };
            }
            return newMap;
        });
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <SEO title="Min Planering - Föräldraledighet.se" />
                <header style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee', background: 'white', zIndex: 10 }}>
                    <div className="dashboard-header">
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>{t('dashboard.appName')}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LanguageToggle />
                            <Button onClick={onReset} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }} variant="secondary">{t('dashboard.reset')}</Button>
                        </div>
                    </div>

                    <div className="dashboard-controls">
                        <div className="dashboard-banks">
                            <div
                                onClick={() => setActiveType('S')}
                                style={{
                                    background: activeType === 'S' ? '#e3f2fd' : '#f5f5f5',
                                    border: activeType === 'S' ? '2px solid #2196F3' : '2px solid transparent',
                                    padding: '0.25rem 0.75rem', borderRadius: '8px', cursor: 'pointer', flex: 1
                                }}
                            >
                                <div style={{ fontSize: '0.7rem', color: '#666' }}>{t('dashboard.sBank')}</div>
                                <div style={{ fontWeight: 'bold', color: sLeft < 0 ? 'red' : '#333' }}>{sLeft}</div>
                            </div>

                            <div
                                onClick={() => setActiveType('L')}
                                style={{
                                    background: activeType === 'L' ? '#fff3e0' : '#f5f5f5',
                                    border: activeType === 'L' ? '2px solid #FF9800' : '2px solid transparent',
                                    padding: '0.25rem 0.75rem', borderRadius: '8px', cursor: 'pointer', flex: 1
                                }}
                            >
                                <div style={{ fontSize: '0.7rem', color: '#666' }}>{t('dashboard.lBank')}</div>
                                <div style={{ fontWeight: 'bold', color: lLeft < 0 ? 'red' : '#333' }}>{lLeft}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', background: '#eee', padding: '4px', borderRadius: '2rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setActiveParent('parentA')}
                                style={{
                                    background: activeParent === 'parentA' ? '#4A90E2' : 'transparent',
                                    color: activeParent === 'parentA' ? 'white' : '#666',
                                    border: 'none', padding: '0.5rem 1rem', borderRadius: '1.5rem', fontWeight: 'bold', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {userProfile.parentA.name}
                            </button>
                            <button
                                onClick={() => setActiveParent('parentB')}
                                style={{
                                    background: activeParent === 'parentB' ? '#50E3C2' : 'transparent',
                                    color: activeParent === 'parentB' ? 'white' : '#666',
                                    border: 'none', padding: '0.5rem 1rem', borderRadius: '1.5rem', fontWeight: 'bold', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {userProfile.parentB.name}
                                {activeParent === 'parentB' && activeType === 'S' && (
                                    <span style={{ fontSize: '0.7rem', display: 'block', fontWeight: 'normal', opacity: 0.8 }}>
                                        ({partnerSLeft} {t('landing.daysLeft')})
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: 'var(--color-bg)' }}>
                    <div style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>

                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                {t('dashboard.painting')} <strong>{activeType}{t('dashboard.daysFor')}</strong> <strong>{activeParent === 'parentA' ? userProfile.parentA.name : userProfile.parentB.name}</strong>
                            </p>
                        </div>

                        <Card>
                            <CalendarView
                                allocatedDays={allocatedDays}
                                activeParent={activeParent}
                                onToggleDay={handleToggleDay}
                            />
                        </Card>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid #ddd', background: 'white', padding: '1rem 2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', zIndex: 10
                }}>
                    <div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{t('dashboard.avgHouseholdNet')}</div>
                        <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{scorecardNet.toLocaleString()} SEK</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{t('dashboard.allocated')}</div>
                        <div>S: {counts.usedS} | L: {counts.usedL}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <Button variant="action" onClick={() => setIsExportOpen(true)}>{t('dashboard.savePlan')}</Button>
                    </div>
                </div>
            </div>
            {/* Modals - Outside overflow hidden */}
            <ExportModal
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                allocatedDays={allocatedDays}
                userProfile={userProfile}
                activeParent={activeParent}
            />
        </>
    );
};

export default Dashboard;
