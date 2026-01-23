import React, { useState, useRef } from 'react';
import { STATUTORY_CONSTANTS_2026, HOLIDAYS_2026 } from '../config/constants';

const CalendarView = ({ allocatedDays, activeParent, onToggleDay, startDate = new Date() }) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStartDay = useRef(null);

    // Generate 18 months of days
    const days = [];
    const totalMonths = 18;
    const current = new Date(startDate);

    // Align to start of week (Monday) ? Or just simple continuous list?
    // Let's do a standard Month-grouped grid for better UX.

    for (let i = 0; i < totalMonths; i++) {
        const year = current.getFullYear();
        const month = current.getMonth(); // 0-11

        // Get all days in this month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthDates = [];

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            const dateStr = dateObj.toISOString().split('T')[0];
            monthDates.push({ dateStr, dateObj, dayOfWeek: dateObj.getDay() });
        }

        days.push({ year, month, name: current.toLocaleString('default', { month: 'long' }), days: monthDates });
        current.setMonth(current.getMonth() + 1);
    }

    const handleMouseDown = (dateStr) => {
        setIsDragging(true);
        dragStartDay.current = dateStr;
        onToggleDay(dateStr, activeParent); // Toggle the starting cell immediately
    };

    const handleMouseEnter = (dateStr) => {
        if (isDragging) {
            // Toggle if not already matching active parent (Painting mode)
            // Or just call toggle, which handles the logic
            onToggleDay(dateStr, activeParent);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        dragStartDay.current = null;
    };

    // Colors
    const getDayStyle = (dateStr, dayOfWeek) => {
        const owner = allocatedDays[dateStr];
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        let bg = 'white';
        let color = '#333';

        if (owner === 'parentA') {
            bg = '#4A90E2'; // Blue
            color = 'white';
        } else if (owner === 'parentB') {
            bg = '#50E3C2'; // Teal
            color = 'white';
        } else if (isHoliday) {
            bg = '#FFD700'; // Gold/Yellow for holiday
        } else if (isWeekend) {
            bg = '#F9F9F9'; // Light gray
            color = '#999';
        }

        return {
            backgroundColor: bg,
            color: color,
            border: '1px solid #eee',
            borderRadius: '4px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            cursor: 'pointer',
            userSelect: 'none'
        };
    };

    return (
        <div
            className="calendar-container"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: 'none' }}
        >
            {days.map((m, mIdx) => (
                <div key={`${m.year}-${m.month}`} style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                        {m.name} {m.year}
                    </h4>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '4px'
                    }}>
                        {/* Weekday headers for the first month only? Or every month? Every month is clearer */}
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                            <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', color: '#888', marginBottom: '4px' }}>{d}</div>
                        ))}

                        {/* Padding for start of month (Monday start) */}
                        {Array.from({ length: (m.days[0].dayOfWeek + 6) % 7 }).map((_, i) => (
                            <div key={`pad-${i}`} />
                        ))}

                        {m.days.map(d => (
                            <div
                                key={d.dateStr}
                                style={getDayStyle(d.dateStr, d.dayOfWeek)}
                                onMouseDown={() => handleMouseDown(d.dateStr)}
                                onMouseEnter={() => handleMouseEnter(d.dateStr)}
                            >
                                {d.dateObj.getDate()}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarView;
