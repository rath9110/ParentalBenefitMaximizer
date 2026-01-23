import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import Timeline from '../components/Timeline';
import Button from '../components/Button';
import {
    checkSGIProtection,
    optimizePension,
    findHolidayHacks,
    calculateEmployerArbitrage,
    checkProxyTransfer,
    calculatePartTimeMatch
} from '../logic/algorithms';
import { STATUTORY_CONSTANTS_2026 } from '../config/constants';

const Dashboard = ({ benefitData, userProfile, onReset }) => {
    // State for Work Rates per month (1-18)
    // Default: Month 1-9 (0% work, 100% leave), Month 10-18 (50% work)
    const [workRates, setWorkRates] = useState(() => {
        const rates = {};
        for (let i = 1; i <= 18; i++) {
            rates[i] = i <= 9 ? 0 : 50;
        }
        return rates;
    });

    const [selectedMonth, setSelectedMonth] = useState(null); // For the editor modal

    // Helper to calculate Net for one parent
    const calculateParentNet = (parent, monthIndex) => {
        if (!parent) return 0;

        // 1. Work Income (Net approx 75% of Gross)
        // If monthIndex (1-based) is allocated to this parent.
        // For MVP simplification: We assume "Work Rate" applies to Parent A primarily for the interactivity demo.
        // Parent B provides fixed income support in this demo unless we double the complexity.
        // Let's assume the slider controls Parent A's work rate. Parent B works 100% when A is off, and vice versa?
        // User Request: "Household Sync" -> "Partner Salary input" -> "Total household net".

        // Let's model: Parent A is the "Primary Leave Taker" for this timeline view (0% work initially).
        // Parent B works 100% mostly.

        const workRateA = workRates[monthIndex] / 100;
        const workIncomeA = parent.income * workRateA * 0.75; // Approx Net

        // Benefit Income (S-Days)
        // If working 0%, taking ~20 days/mo? If working 50%, taking 10 days?
        // S-Day Rate = (Annual * 0.8) / 365
        // Daily Gross = (parent.income * 12 * 0.8) / 365
        // Daily Net ~= Daily Gross * 0.7
        const dailyGross = (parent.income * 12 * 0.8) / 365;
        const dailyNet = dailyGross * 0.7;

        const daysTaken = (1 - workRateA) * 22; // Approx 22 work days/mo logic
        const benefitIncomeA = daysTaken * dailyNet;

        // Top-up (Föräldralön)
        // Generally pays difference to 90% or 10% extra for first X Days (say 180 days / 6 months)
        let topUpA = 0;
        if (parent.hasTopUp && monthIndex <= 6 && workRateA < 0.5) { // Rough logic: eligible first 6 mo if on leave
            // Top up is roughly 10% of gross salary
            topUpA = parent.income * 0.10 * 0.7; // Net after tax
        }

        return workIncomeA + benefitIncomeA + topUpA;
    };

    const calculateHouseholdNet = (monthIndex) => {
        // Parent A (Dynamic via slider)
        const netA = calculateParentNet(userProfile.parentA, monthIndex);

        // Parent B (Static 100% work for MVP, unless we add a second slider track)
        // If Parent A is working 0%, Parent B is working 100%.
        // If Parent A is working 50%, Parent B is working 100% (Double Days?) or 50%?
        // Let's assume Parent B works 100% always for "Financial Base" unless stated.
        const netB = userProfile.parentB.income * 0.75;

        // But if Parent B has top-up? Only relevant if B is on leave. 
        // For this demo, we focus on Parent A's "Optimization" journey.

        return Math.round(netA + netB);
    };

    // 1. Run Optimization Logic (Re-wired for new profile structure)
    const insights = useMemo(() => {
        const results = [];
        if (!benefitData || !userProfile) return results;

        const { parentA, parentB, goal } = userProfile;

        // Algo 1: SGI Protection
        const sgi = checkSGIProtection(13, 2, 0);
        if (sgi.status === 'WARNING') {
            results.push({ title: 'SGI Protection', message: sgi.recommendation, type: 'alert', id: 'sgi-1' });
        }

        // Algo 2: Pension (Check both parents)
        [parentA, parentB].forEach(p => {
            const pension = optimizePension(p.agreement, 80, p.income);
            if (pension) {
                results.push({
                    title: `Pension Waiver (${p.name})`,
                    message: `${pension.recommendation} Saves ~${pension.valueSaved.toFixed(0)} SEK/mo.`,
                    type: 'highlight',
                    id: `pen-${p.name}`
                });
            }
        });

        // Algo 3: Employer Arbitrage (If Goal = Cash)
        if (goal === 'cash') {
            const arbitrage = calculateEmployerArbitrage(parentA.income, parentB.income);
            results.push({
                title: 'Cash Booster',
                message: `${arbitrage.strategy} Bonus: ~${arbitrage.bonusEstimate} SEK.`,
                type: 'info',
                id: 'arb-1'
            });
        }

        // Algo 4: Holiday Hacks
        if (goal === 'time') {
            const hacks = findHolidayHacks();
            if (hacks.length > 0) {
                hacks.slice(0, 1).forEach((hack, idx) => {
                    results.push({
                        title: 'Holiday Hack',
                        message: `${hack.message} (${hack.holiday})`,
                        type: 'highlight',
                        id: `hack-${idx}`
                    });
                });
            }
        }

        return results;
    }, [benefitData, userProfile]);

    // 2. Scorecard - Average Monthly Net over the year
    const scorecard = useMemo(() => {
        // Average of first 12 months
        let totalNet = 0;
        for (let i = 1; i <= 12; i++) {
            totalNet += calculateHouseholdNet(i);
        }
        const avgNet = Math.round(totalNet / 12);

        // Time Estimate
        // Sum of (1 - workRate)
        let totalLeaveMonths = 0;
        Object.values(workRates).forEach(rate => {
            totalLeaveMonths += (1 - rate / 100);
        });

        return {
            net: avgNet.toLocaleString(),
            time: totalLeaveMonths.toFixed(1),
            rank: 'A'
        };
    }, [workRates, userProfile]); // Recalc when workRates change

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <header style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>FöräldraOptimizer</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Days Left: <strong>{benefitData?.sDays || 0} S-Level</strong></span>
                    <Button onClick={onReset} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }} variant="secondary">New Plan</Button>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                <div style={{ padding: '2rem' }}>
                    <h3>Household Plan: {userProfile?.parentA.name} & {userProfile?.parentB.name}</h3>

                    <div style={{ marginBottom: '2rem' }}>
                        <Timeline
                            totalSDays={benefitData?.sDays || 0}
                            workRates={workRates}
                            onMonthClick={(m) => setSelectedMonth(m)}
                        />
                        <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem', textAlign: 'center' }}>
                            Tap detailed month blocks to edit Work %
                        </p>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Optimization Insights ({insights.length})</h4>
                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            {insights.map(insight => (
                                <Card key={insight.id} title={insight.title} className={insight.type === 'alert' ? 'border-alert' : ''}>
                                    <p style={{ color: insight.type === 'alert' ? 'var(--color-alert)' : 'inherit' }}>
                                        {insight.message}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor Modal / Slider */}
            {selectedMonth && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }} onClick={() => setSelectedMonth(null)}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '300px' }} onClick={e => e.stopPropagation()}>
                        <h3>Edit Month {selectedMonth}</h3>
                        <p className="text-muted">Work Percentage: <strong>{workRates[selectedMonth]}%</strong></p>

                        <input
                            type="range" min="0" max="100" step="25"
                            value={workRates[selectedMonth]}
                            onChange={(e) => setWorkRates(prev => ({ ...prev, [selectedMonth]: parseInt(e.target.value) }))}
                            style={{ width: '100%', margin: '1.5rem 0' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#999' }}>
                            <span>Home (0%)</span>
                            <span>Half (50%)</span>
                            <span>Work (100%)</span>
                        </div>

                        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                            <Button onClick={() => setSelectedMonth(null)}>Done</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Bottom Scorecard */}
            <div style={{
                borderTop: '1px solid #ddd', background: 'white', padding: '1rem 2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
            }}>
                <div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Avg. Household Net</div>
                    <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{scorecard.net} SEK</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Total Time Home</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{scorecard.time} Months</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Strategy Rank</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{scorecard.rank}</div>
                </div>
            </div>

            <style>{`
         .border-alert { border: 2px solid var(--color-alert) !important; }
       `}</style>
        </div>
    );
};

export default Dashboard;
