import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import CalendarView from '../components/CalendarView';
import Button from '../components/Button';
import { HOLIDAYS_2026 } from '../config/constants';
import { generateStrategyPattern } from '../logic/strategies';

const Dashboard = ({ benefitData, userProfile, onReset }) => {
    // --- State ---
    // allocatedDays: Record<dateStr, { parentId: string, type: 'S' | 'L' }>
    const [allocatedDays, setAllocatedDays] = useState(() => {
        // Auto-fill logic on init
        if (userProfile && userProfile.strategy) {
            // CORRECTED CALL: 5 Arguments
            return generateStrategyPattern(
                userProfile.strategy,
                new Date(),
                benefitData?.sDays || 0,
                benefitData?.lDays || 0,
                userProfile
            );
        }
        return {};
    });

    const [activeParent, setActiveParent] = useState('parentA');
    const [activeType, setActiveType] = useState('S'); // 'S' or 'L'

    // --- Logic ---
    const totalS = benefitData?.sDays || 0;
    const totalL = benefitData?.lDays || 0;
    const reservedS = benefitData?.reservedDays || 0;

    const counts = useMemo(() => {
        let usedS = 0;
        let usedL = 0;
        let usedS_Partner = 0;

        Object.entries(allocatedDays).forEach(([dateStr, val]) => {
            const date = new Date(dateStr);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isHoliday = HOLIDAYS_2026.includes(dateStr);

            if (!isWeekend && !isHoliday) {
                if (val.type === 'S') {
                    usedS++;
                    if (val.parentId === 'parentB') usedS_Partner++;
                }
                if (val.type === 'L') usedL++;
            }
        });

        return { usedS, usedL, usedS_Partner };
    }, [allocatedDays]);

    const sLeft = totalS - counts.usedS;
    const lLeft = totalL - counts.usedL;
    const partnerMaxS = Math.max(0, totalS - reservedS);
    const partnerSLeft = partnerMaxS - counts.usedS_Partner;

    // Household Net Calculation
    const calculateHouseholdNet = () => {
        let totalNetAnnual = 0;

        const getDailyValues = (parent, allocation) => {
            const dailyGross = (parent.income * 12) / 365;
            if (!allocation) {
                return dailyGross * 0.75;
            } else {
                let dailyRate = 0;
                if (allocation.type === 'S') {
                    const cappedIncome = Math.min(parent.income, 45000);
                    const benefitGross = (cappedIncome * 12 * 0.8) / 365;
                    dailyRate = benefitGross * 0.7;
                    if (parent.hasTopUp) {
                        dailyRate += (parent.income * 12 * 0.1) / 365 * 0.7;
                    }
                } else {
                    dailyRate = 180 * 0.7;
                }
                return dailyRate;
            }
        };

        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dStr = d.toISOString().split('T')[0];

            const allocation = allocatedDays[dStr];
            const allocA = allocation?.parentId === 'parentA' ? allocation : null;
            const allocB = allocation?.parentId === 'parentB' ? allocation : null;

            totalNetAnnual += getDailyValues(userProfile.parentA, allocA);
            totalNetAnnual += getDailyValues(userProfile.parentB, allocB);
        }
        return Math.round(totalNetAnnual / 12);
    };

    const scorecardNet = useMemo(() => calculateHouseholdNet(), [allocatedDays, userProfile]);

    const handleToggleDay = (dateStr, parentId) => {
        setAllocatedDays(prev => {
            const current = prev[dateStr];
            const newMap = { ...prev };

            if (current && current.parentId === parentId) {
                delete newMap[dateStr];
            } else {
                if (activeType === 'S') {
                    if (sLeft <= 0) return prev;
                    if (parentId === 'parentB' && partnerSLeft <= 0) {
                        alert(`Partner limit reached! ${reservedS} days reserved.`);
                        return prev;
                    }
                } else {
                    if (lLeft <= 0) return prev;
                }
                newMap[dateStr] = { parentId: parentId, type: activeType };
            }
            return newMap;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <header style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee', background: 'white', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>FöräldraOptimizer</h2>
                    <Button onClick={onReset} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }} variant="secondary">Reset</Button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div
                            onClick={() => setActiveType('S')}
                            style={{
                                background: activeType === 'S' ? '#e3f2fd' : '#f5f5f5',
                                border: activeType === 'S' ? '2px solid #2196F3' : '2px solid transparent',
                                padding: '0.25rem 0.75rem', borderRadius: '8px', cursor: 'pointer'
                            }}
                        >
                            <div style={{ fontSize: '0.7rem', color: '#666' }}>S-BANK</div>
                            <div style={{ fontWeight: 'bold', color: sLeft < 0 ? 'red' : '#333' }}>{sLeft}</div>
                        </div>

                        <div
                            onClick={() => setActiveType('L')}
                            style={{
                                background: activeType === 'L' ? '#fff3e0' : '#f5f5f5',
                                border: activeType === 'L' ? '2px solid #FF9800' : '2px solid transparent',
                                padding: '0.25rem 0.75rem', borderRadius: '8px', cursor: 'pointer'
                            }}
                        >
                            <div style={{ fontSize: '0.7rem', color: '#666' }}>L-BANK</div>
                            <div style={{ fontWeight: 'bold', color: lLeft < 0 ? 'red' : '#333' }}>{lLeft}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', background: '#eee', padding: '4px', borderRadius: '2rem' }}>
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
                                    ({partnerSLeft} left)
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: 'var(--color-bg)' }}>
                <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                            Painting <strong>{activeType}-Days</strong> for <strong>{activeParent === 'parentA' ? userProfile.parentA.name : userProfile.parentB.name}</strong>
                        </p>
                    </div>

                    <Card>
                        <CalendarView
                            allocatedDays={Object.fromEntries(
                                Object.entries(allocatedDays).map(([k, v]) => [k, v.parentId])
                            )}
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
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Avg. Household Net</div>
                    <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{scorecardNet.toLocaleString()} SEK</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Allocated</div>
                    <div>S: {counts.usedS} | L: {counts.usedL}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <Button variant="action">Save Plan</Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
