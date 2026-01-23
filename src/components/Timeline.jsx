import React from 'react';

const Timeline = ({ totalSDays, workRates, onMonthClick }) => {
    const months = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', minWidth: '1000px', position: 'relative', paddingTop: '2rem' }}>

                {months.map(m => {
                    const rate = workRates[m] || 0;
                    // Visual: 0% work = High Bar (Full Leave), 100% work = Low Bar? Or distinct colors?
                    // Let's use Color Opacity/Fill.
                    // Green = Leave (Low Work Rate), Grey = Work (High Work Rate).
                    const isLeave = rate < 100;

                    return (
                        <div
                            key={m}
                            onClick={() => onMonthClick(m)}
                            style={{
                                flex: 1, minWidth: '60px', textAlign: 'center', position: 'relative', cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            className="timeline-month"
                        >
                            <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', marginBottom: '0.5rem' }}>
                                Mo {m}
                            </span>

                            {/* Grid Line */}
                            <div style={{
                                height: '200px', width: '1px', background: '#eee', margin: '0 auto',
                                borderRight: m === 12 ? '2px dashed var(--color-alert)' : 'none'
                            }} />

                            {/* Interactive Block Overlay */}
                            <div style={{
                                position: 'absolute', top: '30px', left: '2px', right: '2px', height: '160px',
                                borderRadius: '4px',
                                background: isLeave ? 'var(--color-primary)' : '#ccc',
                                opacity: isLeave ? 1 - (rate / 100) * 0.8 : 0.1, // Full opacity if 0% work.
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: isLeave ? 'white' : '#666', fontWeight: 'bold', fontSize: '0.9rem',
                                flexDirection: 'column'
                            }}>
                                {rate < 100 ? <span>Leave</span> : <span>Work</span>}
                                <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{rate}% Work</span>
                            </div>
                        </div>
                    );
                })}

            </div>
            <style>{`
         .timeline-month:hover { background-color: rgba(0,0,0,0.02); }
       `}</style>
        </div>
    );
};

export default Timeline;
