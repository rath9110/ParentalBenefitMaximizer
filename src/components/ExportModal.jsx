import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';
import PlanDocument from './PlanDocument';
import { analyzeExportPlan } from '../logic/exportHelpers';

const ExportModal = ({ isOpen, onClose, allocatedDays, userProfile, activeParent }) => {
    if (!isOpen) return null;
    const { t } = useLanguage();

    // Default dates: Now -> +6 Months
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 6);
        return d.toISOString().split('T')[0];
    });

    const [analysis, setAnalysis] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const data = analyzeExportPlan(allocatedDays, start, end, activeParent);
            setAnalysis({ ...data, startDate: start, endDate: end });
        }
    }, [startDate, endDate, allocatedDays, activeParent]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="modal-content" style={{ backgroundColor: 'white', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Exportera Plan till Arbetsgivare</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Startdatum</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Slutdatum</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                {analysis && (
                    <div style={{ marginBottom: '24px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Förhandsgranskning</h3>
                        <ul style={{ fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
                            <li><strong>{analysis.periods}</strong> ledighetsperioder identifierade (Varning vid &gt; 3)</li>
                            <li><strong>{analysis.totalDays}</strong> dagar totalt i spannet</li>
                        </ul>
                        {analysis.periods > 3 && (
                            <div style={{ marginTop: '8px', color: '#d32f2f', fontSize: '12px', fontWeight: 'bold' }}>
                                ⚠️ Varning: Arbetsgivaren kan neka fler än 3 perioder per år.
                            </div>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" onClick={onClose}>Avbryt</Button>
                    <Button variant="primary" onClick={handlePrint}>🖨️ Skriv ut / Spara PDF</Button>
                </div>

                {/* Hidden Print Content */}
                <div className="print-only">
                    <PlanDocument ref={componentRef} data={analysis} userProfile={userProfile} parentId={activeParent} />
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
