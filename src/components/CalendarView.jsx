import React, { useState, useRef } from 'react';
import { STATUTORY_CONSTANTS_2026, HOLIDAYS_2026 } from '../config/constants';
import { useLanguage } from '../context/LanguageContext';

const CalendarView = ({ allocatedDays, activeParent, onToggleDay, startDate = new Date() }) => {
    const { t, language } = useLanguage();
    const [isDragging, setIsDragging] = useState(false);
    const dragStartDay = useRef(null);

    // Generate 18 months of days
    const days = [];
    const totalMonths = 18;
    const current = new Date(startDate);
    const locale = t('calendar.locale');

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
            // Fix: Use local date string construction to avoid UTC timezone shifts (off-by-one errors)
            const dateStr = [
                year,
                String(month + 1).padStart(2, '0'),
                String(d).padStart(2, '0')
            ].join('-');

            monthDates.push({ dateStr, dateObj, dayOfWeek: dateObj.getDay() });
        }

        days.push({ year, month, name: current.toLocaleString(locale, { month: 'long' }), days: monthDates });
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
        const owners = allocatedDays[dateStr] || {}; // Now a map
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        let bg = 'white';
        let color = '#333';
        const hasA = owners.parentA;
        const hasB = owners.parentB;

        if (hasA && hasB) {
            // Double Day - Split
            bg = '#4A90E2';
            color = 'white';
        } else if (hasA) {
            bg = '#4A90E2'; // Blue
            color = 'white';
        } else if (hasB) {
            bg = '#50E3C2'; // Teal
            color = 'white';
        } else if (isHoliday) {
            bg = '#FFD700'; // Gold/Yellow for holiday
        } else if (isWeekend) {
            bg = '#F9F9F9'; // Light gray
            color = '#999';
        }

        const isDouble = hasA && hasB;

        return {
            backgroundColor: bg,
            backgroundImage: isDouble ? 'linear-gradient(135deg, #4A90E2 50%, #50E3C2 50%)' : 'none',
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

    const weekdays = t('calendar.weekdays') || ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
        <div
            className="calendar-container"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: 'none' }}
        >
            <div className="calendar-main-grid">
                {days.map((m, mIdx) => (
                    <div key={`${m.year}-${m.month}`} style={{ breakInside: 'avoid' }}>
                        <h4 style={{ marginBottom: '0.5rem', textTransform: 'capitalize', fontSize: '1rem', textAlign: 'center' }}>
                            {m.name} {m.year}
                        </h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '2px'
                        }}>
                            {/* Weekday headers */}
                            {weekdays.map(d => (
                                <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', color: '#888', marginBottom: '2px' }}>{d}</div>
                            ))}

                            {/* Padding */}
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
        </div>
    );
};

export default CalendarView;
