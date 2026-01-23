import React from 'react';

const Timeline = () => {
    // Mock data for the timeline (18 months)
    const months = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', minWidth: '1000px', position: 'relative', paddingTop: '2rem' }}>

                {/* Child Age / Months Axis */}
                {months.map(m => (
                    <div key={m} style={{ flex: 1, minWidth: '60px', textAlign: 'center', position: 'relative' }}>
                        <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', marginBottom: '0.5rem' }}>
                            Mo {m}
                        </span>
                        {/* The vertical grid line */}
                        <div style={{
                            height: '200px', width: '1px', background: '#eee', margin: '0 auto',
                            borderRight: m === 12 ? '2px dashed var(--color-alert)' : 'none'
                        }} />

                        {/* 12-Month Checkpoint Label */}
                        {m === 12 && (
                            <div style={{
                                position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                                background: 'var(--color-alert)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px',
                                whiteSpace: 'nowrap'
                            }}>
                                SGI Protection Starts
                            </div>
                        )}
                    </div>
                ))}

                {/* Tracks Layer (Overlaying grid) */}
                <div style={{
                    position: 'absolute', top: '50px', left: 0, right: 0, bottom: 0,
                    display: 'flex', flexDirection: 'column', gap: '1rem', pointerEvents: 'none'
                }}>

                    {/* Parent A Track */}
                    <div style={{ height: '40px', position: 'relative', width: '100%' }}>
                        {/* Example segments */}
                        <div style={{
                            position: 'absolute', left: '2%', width: '30%', height: '100%',
                            background: '#4A90E2', borderRadius: '4px', opacity: 0.8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>
                            Parent A (100%)
                        </div>
                    </div>

                    {/* Parent B Track */}
                    <div style={{ height: '40px', position: 'relative', width: '100%' }}>
                        <div style={{
                            position: 'absolute', left: '35%', width: '20%', height: '100%',
                            background: '#50E3C2', borderRadius: '4px', opacity: 0.8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>
                            Parent B (50%)
                        </div>
                    </div>

                    {/* Joint/Double Days Track */}
                    <div style={{ height: '20px', position: 'relative', width: '100%', marginTop: '0.5rem' }}>
                        <div style={{
                            position: 'absolute', left: '10%', width: '5%', height: '100%',
                            background: '#F5A623', borderRadius: '10px', opacity: 0.9
                        }} title="Double Days" />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Timeline;
