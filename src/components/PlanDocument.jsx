import React from 'react';

const PlanDocument = React.forwardRef(({ data, userProfile, parentId }, ref) => {
    if (!data) return null;

    const { periods, monthlyOverview, weeklySchedule, startDate, endDate } = data;
    const parentName = userProfile[parentId]?.name || (parentId === 'parentA' ? 'Förälder 1' : 'Förälder 2');

    // Total % approximation
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const avgExtent = monthlyOverview.reduce((acc, m) => acc + m.percentage, 0) / (monthlyOverview.length || 1);

    return (
        <div ref={ref} className="print-container" style={{ padding: '40px', fontFamily: '"Inter", "Helvetica", sans-serif', color: '#333', background: 'white' }}>
            {/* 1. Header & ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1a2b3c', paddingBottom: '20px', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Ansökan om Föräldraledighet</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px auto', gap: '8px', fontSize: '14px' }}>
                        <strong>Namn:</strong> <span>{parentName}</span>
                        <strong>Datum:</strong> <span>{new Date().toLocaleDateString('sv-SE')}</span>
                    </div>
                </div>
            </div>

            {/* 2. Formal Text */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ borderLeft: '4px solid #1a2b3c', paddingLeft: '10px', marginBottom: '15px' }}>Sammanfattning</h3>
                <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                    Härmed ansökes om föräldraledighet i enlighet med Föräldraledighetslagen (1995:584).
                    Ansökan avser perioden <strong>{startDate.toLocaleDateString('sv-SE')}</strong> till <strong>{endDate.toLocaleDateString('sv-SE')}</strong> med
                    en genomsnittlig omfattning av ca <strong>{Math.round(avgExtent)}%</strong>.
                </p>
                {periods > 3 && (
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff3e0', border: '1px solid #ffcc80', fontSize: '12px' }}>
                        <strong>Notera:</strong> Denna plan genererar {periods} separata ledighetsperioder.
                        Enligt lag har man rätt till 3 perioder per år. Arbetsgivarens godkännande kan krävas för överskjutande perioder.
                    </div>
                )}
            </div>

            {/* 3. Weekly Schedule */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ borderLeft: '4px solid #1a2b3c', paddingLeft: '10px', marginBottom: '15px' }}>Veckoschema (Normalvecka)</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f7fa', color: '#1a2b3c', textAlign: 'left' }}>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Dag</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status & Omfattning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklySchedule.map((d, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{d.day}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: d.color,
                                        display: 'inline-block'
                                    }}>
                                        {d.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. Monthly Overview */}
            <div style={{ marginBottom: '60px' }}>
                <h3 style={{ borderLeft: '4px solid #1a2b3c', paddingLeft: '10px', marginBottom: '15px' }}>Månadsöversikt (Löneunderlag)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                    {monthlyOverview.map((m, i) => (
                        <div key={i} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>{m.month}</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a2b3c' }}>{m.percentage}%</div>
                            <div style={{ fontSize: '12px' }}>Ledighet</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Signatures */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: 'auto' }}>
                <div>
                    <div style={{ borderBottom: '1px solid #333', height: '40px' }}></div>
                    <div style={{ marginTop: '5px', fontSize: '12px', textTransform: 'uppercase' }}>Underskrift Anställd ({parentName})</div>
                </div>
                <div>
                    <div style={{ borderBottom: '1px solid #333', height: '40px' }}></div>
                    <div style={{ marginTop: '5px', fontSize: '12px', textTransform: 'uppercase' }}>Underskrift Chef</div>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 0mm; size: A4; }
                    body * { visibility: hidden; }
                    .print-container, .print-container * { visibility: visible; }
                    .print-container { position: absolute; left: 0; top: 0; width: 100%; min-height: 100vh; }
                }
            `}</style>
        </div>
    );
});

export default PlanDocument;
