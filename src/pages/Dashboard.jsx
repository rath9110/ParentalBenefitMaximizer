import React from 'react';
import Card from '../components/Card';
import Timeline from '../components/Timeline'; // We will create this next
import Button from '../components/Button';

const Dashboard = ({ benefitData, userProfile, onReset }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <header style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>FöräldraOptimizer</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Days Left: <strong>{benefitData?.sDays} S-Level</strong></span>
                    <Button onClick={onReset} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }} variant="secondary">New Plan</Button>
                </div>
            </header>

            {/* Main Content - Timeline */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                <div style={{ padding: '2rem' }}>
                    <h3>Your Optimal Timeline</h3>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Drag segments to adjust. Yellow stripes indicate SGI protection needed.</p>

                    <Timeline />

                    {/* Example Alerts Section */}
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Optimization Insights</h4>
                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <Card title="Pension Waiver">
                                <p>Based on <strong>{userProfile.employer}</strong>, you can save ~2000 SEK/mo in pension simply by working 90% instead of 80%.</p>
                            </Card>
                            <Card title="Holiday Hack">
                                <p className="text-primary"><strong>May 15, 2026</strong> is a squeeze day. Take 1 day off, get 4 days free.</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Scorecard */}
            <div style={{
                borderTop: '1px solid #ddd', background: 'white', padding: '1rem 2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
            }}>
                <div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Est. Monthly Net</div>
                    <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24,500 SEK</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Time at Home</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>14.5 Months</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>Strategy Rank</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>A+</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
