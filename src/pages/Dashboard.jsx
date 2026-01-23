import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import CalendarView from '../components/CalendarView';
import Button from '../components/Button';
// import { ... } from '../logic/algorithms'; // Re-enable if needed for Logic V2

const Dashboard = ({ benefitData, userProfile, onReset }) => {
    // --- State ---
    // allocatedDays: Record<dateStr, 'parentA' | 'parentB'>
    const [allocatedDays, setAllocatedDays] = useState({});
    const [activeParent, setActiveParent] = useState('parentA');

    // --- Logic ---

    // 1. Days Count
    const totalSDays = benefitData?.sDays || 0;
    const usedDays = Object.keys(allocatedDays).length;
    const daysLeft = totalSDays - usedDays;

    // 2. Household Net Calculation (Approximation based on Daily Allocate)
    const calculateHouseholdNet = () => {
        // Logic:
        // Parent A Income = (Annual / 12)
        // If a day is allocated to Parent A -> They are on Leave (Low Income ~80% capped) on that day.
        // If not allocated -> They are Working (100% Income).
        // We need to average this over the viewing period.

        // For the demo "Scorecard", let's average the next 12 months.
        // But calculating 365 days loop is heavy? No, it's fine for client-side.

        let totalNetAnnual = 0;

        // Helper: Daily Value
        const getDailyValues = (parent, isLeave) => {
            const dailyGross = (parent.income * 12) / 365;
            if (!isLeave) {
                return dailyGross * 0.75; // Work Net
            } else {
                // Leave Net
                // Cap check? SGI Ceiling ~50k/mo. 
                const cappedIncome = Math.min(parent.income, 45000); // approx SGI cap
                const benefitGross = (cappedIncome * 12 * 0.8) / 365;
                let val = benefitGross * 0.7;

                // Top up?
                if (parent.hasTopUp) {
                    val += (parent.income * 12 * 0.1) / 365 * 0.7; // Approx daily top up
                }
                return val;
            }
        };

        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dStr = d.toISOString().split('T')[0];

            const allocation = allocatedDays[dStr];

            // Parent A
            totalNetAnnual += getDailyValues(userProfile.parentA, allocation === 'parentA');

            // Parent B
            totalNetAnnual += getDailyValues(userProfile.parentB, allocation === 'parentB');
        }

        return Math.round(totalNetAnnual / 12);
    };

    const scorecardNet = useMemo(() => calculateHouseholdNet(), [allocatedDays, userProfile]);

    // --- Handlers ---
    const handleToggleDay = (dateStr, parentId) => {
        setAllocatedDays(prev => {
            const currentOwner = prev[dateStr];
            const newMap = { ...prev };

            if (currentOwner === parentId) {
                // Clicked own day -> Deselect (Clear)
                delete newMap[dateStr];
            } else {
                // Empty or Other Parent -> Set to Active Parent
                // Check if we have days left?
                if (Object.keys(newMap).length < totalSDays) {
                    newMap[dateStr] = parentId;
                }
            }
            return newMap;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <header style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>FöräldraOptimizer</h2>

                    {/* Days Bank */}
                    <div style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>BANK</span>
                        <strong style={{ fontSize: '1.1rem', color: daysLeft < 0 ? 'red' : 'var(--color-primary)' }}>
                            {daysLeft}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>days</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Parent Toggles */}
                    <div style={{ display: 'flex', background: '#eee', padding: '4px', borderRadius: '2rem' }}>
                        <button
                            onClick={() => setActiveParent('parentA')}
                            style={{
                                background: activeParent === 'parentA' ? '#4A90E2' : 'transparent',
                                color: activeParent === 'parentA' ? 'white' : '#666',
                                border: 'none', padding: '0.5rem 1.5rem', borderRadius: '1.5rem', fontWeight: 'bold', cursor: 'pointer',
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
                                border: 'none', padding: '0.5rem 1.5rem', borderRadius: '1.5rem', fontWeight: 'bold', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {userProfile.parentB.name}
                        </button>
                    </div>

                    <Button onClick={onReset} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }} variant="secondary">Reset</Button>
                </div>
            </header>

            {/* Main Content - Calendar */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: 'var(--color-bg)' }}>
                <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Plan your leave</h3>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                            <span style={{ color: '#4A90E2' }}>● {userProfile.parentA.name}</span> &nbsp;
                            <span style={{ color: '#50E3C2' }}>● {userProfile.parentB.name}</span>
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


            {/* Sticky Bottom Scorecard */}
            <div style={{
                borderTop: '1px solid #ddd', background: 'white', padding: '1rem 2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', zIndex: 10
            }}>
                <div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Avg. Household Net (Next 12 mo)</div>
                    <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{scorecardNet.toLocaleString()} SEK</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Days Planned</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{usedDays} / {totalSDays}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <Button variant="action">Save Plan</Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
