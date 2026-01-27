import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import CalendarView from '../components/CalendarView';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { HOLIDAYS_2026, STATUTORY_CONSTANTS_2026 } from '../config/constants';
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

    // Early exit if data is missing (guard against crashes) - now AFTER hooks
    if (!benefitData || !userProfile) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Unable to load planner. Missing session data.</p>
                <button onClick={onReset} style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    // --- Logic ---
    const totalS = benefitData?.sDays || 0;
    const totalL = benefitData?.lDays || 0;
    const reservedS = benefitData?.reservedDays || 0;
    const plannedDouble = benefitData?.doubleDays || 0;

    const counts = useMemo(() => {
        let usedS = 0;
        let usedL = 0;
        let usedS_Partner = 0;
        if (!allocatedDays || !benefitData) return { usedS: 0, usedL: 0, usedS_Partner: 0 };

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

    // --- Monthly Income Calculation ---
    const monthlyIncomeData = useMemo(() => {
        const months = {}; // "2026-01" -> { netA, netB, grossWorkA... }
        if (!userProfile || !benefitData) return months;

        const today = new Date();
        const startYear = today.getFullYear();
        const startMonth = today.getMonth(); // 0-11

        // Look ahead 24 months
        for (let mOffset = 0; mOffset < 24; mOffset++) {
            const currentMonthDate = new Date(startYear, startMonth + mOffset, 1);
            const y = currentMonthDate.getFullYear();
            const mon = currentMonthDate.getMonth();
            const daysInMonth = new Date(y, mon + 1, 0).getDate();
            const monthKey = `${y}-${String(mon + 1).padStart(2, '0')}`;

            // Safety check for userProfile nested properties
            const incomeA = userProfile?.parentA?.income || 30000;
            const incomeB = userProfile?.parentB?.income || 30000;

            let monGrossWorkA = incomeA;
            let monGrossBenefitA = 0;
            let monGrossWorkB = incomeB;
            let monGrossBenefitB = 0;

            // 1. Calculate workdays in this specific month for accurate deductions
            let workdaysCount = 0;
            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${y}-${String(mon + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dateObj = new Date(y, mon, d);
                const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                const isHoliday = HOLIDAYS_2026.includes(dateStr);
                if (!isWeekend && !isHoliday) workdaysCount++;
            }

            // Fallback for safety (though every month has workdays)
            const divisor = workdaysCount || 22;

            // Cap at 10 PBB for 2026 (approx 49,333/mo)
            const sgiCap = STATUTORY_CONSTANTS_2026 ? (STATUTORY_CONSTANTS_2026.SGI_CAP_FULL / 12) : 49333;

            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${y}-${String(mon + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dateObj = new Date(y, mon, d);
                const dayOfWeek = dateObj.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const isHoliday = HOLIDAYS_2026.includes(dateStr);
                const isFreeTime = isWeekend || isHoliday;

                const allocationMap = allocatedDays[dateStr];
                const allocA = allocationMap?.parentA || null;
                const allocB = allocationMap?.parentB || null;

                // --- Parent A ---
                if (allocA) {
                    const extent = allocA.extent || 1;
                    if (allocA.type === 'S') {
                        const cappedIncome = Math.min(incomeA, sgiCap);
                        monGrossBenefitA += ((cappedIncome * 12 * 0.8) / 365) * extent;
                        if (userProfile?.parentA?.hasTopUp) {
                            monGrossBenefitA += ((incomeA * 12 * 0.1) / 365) * extent;
                        }
                    } else {
                        monGrossBenefitA += (STATUTORY_CONSTANTS_2026?.L_LEVEL_RATE || 180) * extent;
                    }

                    // Deduct from salary only if it was a working day
                    if (!isFreeTime) {
                        monGrossWorkA -= (incomeA / divisor) * extent;
                    }
                }

                // --- Parent B ---
                if (allocB) {
                    const extent = allocB.extent || 1;
                    if (allocB.type === 'S') {
                        const cappedIncome = Math.min(incomeB, sgiCap);
                        monGrossBenefitB += ((cappedIncome * 12 * 0.8) / 365) * extent;
                        if (userProfile?.parentB?.hasTopUp) {
                            monGrossBenefitB += ((incomeB * 12 * 0.1) / 365) * extent;
                        }
                    } else {
                        monGrossBenefitB += (STATUTORY_CONSTANTS_2026?.L_LEVEL_RATE || 180) * extent;
                    }

                    if (!isFreeTime) {
                        monGrossWorkB -= (incomeB / divisor) * extent;
                    }
                }
            }

            // High precision math cleanup
            monGrossWorkA = Math.max(0, monGrossWorkA);
            monGrossWorkB = Math.max(0, monGrossWorkB);

            // Calc monthly net (projected to annual bracket)
            const taxRate = userProfile.taxRate || 32.0;

            // Net A
            const annualGrossWorkA = monGrossWorkA * 12;
            const annualGrossBenA = monGrossBenefitA * 12;
            const annualNetA = calculateAnnualMixedNet(annualGrossWorkA, annualGrossBenA, taxRate);
            const monthlyNetA = Math.round(annualNetA / 12);

            // Net B
            const annualGrossWorkB = monGrossWorkB * 12;
            const annualGrossBenB = monGrossBenefitB * 12;
            const annualNetB = calculateAnnualMixedNet(annualGrossWorkB, annualGrossBenB, taxRate);
            const monthlyNetB = Math.round(annualNetB / 12);

            months[monthKey] = {
                monthStr: currentMonthDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
                netTotal: monthlyNetA + monthlyNetB,
                isMixed: (monGrossBenefitA + monGrossBenefitB) > 0
            };
        }
        return months;

    }, [allocatedDays, userProfile]);

    const scorecardNet = useMemo(() => {
        if (!monthlyIncomeData) return 0;
        // Average of first 12 months
        // Or average of months where "isMixed" is true?
        // User asked for monthly breakdown, but kept the average scorecard.
        // Let's keep the scorecard as a simple average of the first 12 months for consistency.
        const values = Object.values(monthlyIncomeData).slice(0, 12).map(m => m.netTotal);
        if (values.length === 0) return 0;
        const sum = values.reduce((a, b) => a + b, 0);
        return Math.round(sum / values.length);
    }, [monthlyIncomeData]);



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
                    <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>{t('dashboard.appName')}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                <LanguageToggle />
                                <Button onClick={onReset} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }} variant="secondary">{t('dashboard.reset')}</Button>
                            </div>
                        </div>
                        <Button variant="action" onClick={() => setIsExportOpen(true)} style={{ padding: '0.5rem 1.5rem', marginTop: '0.5rem' }}>{t('dashboard.savePlan')}</Button>
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
                                {userProfile?.parentA?.name || 'You'}
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
                                {userProfile?.parentB?.name || 'Partner'}
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
                    <div style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

                        {/* Main Calendar Area */}
                        <div style={{ flex: 3, minWidth: 0 }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {t('dashboard.painting')} <strong>{activeType}{t('dashboard.daysFor')}</strong> <strong>{activeParent === 'parentA' ? (userProfile?.parentA?.name || 'You') : (userProfile?.parentB?.name || 'Partner')}</strong>
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

                        {/* Side Panel: Monthly Economy */}
                        <div style={{ flex: 1, background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'sticky', top: '1rem' }}>
                            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--color-primary)', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                                Ekonomi per månad
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '70vh', overflowY: 'auto' }}>
                                {Object.values(monthlyIncomeData).slice(0, 18).map((month, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.75rem', backgroundColor: month.isMixed ? '#f8fafc' : 'white',
                                        borderRadius: '8px', border: month.isMixed ? '1px solid #e2e8f0' : '1px solid transparent'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#334155' }}>{month.monthStr}</div>
                                            {month.isMixed && <span style={{ fontSize: '0.65rem', color: '#64748b', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>Ledighet</span>}
                                        </div>
                                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            {month.netTotal.toLocaleString()} kr
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4', fontStyle: 'italic' }}>
                                * Nettolön inkl. bidrag efter skatt. Baserat på angiven månadslön och F-dagarsersättning.
                            </div>
                        </div>

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
