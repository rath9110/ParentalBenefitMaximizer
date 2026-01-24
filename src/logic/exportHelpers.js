import { HOLIDAYS_2026 } from '../config/constants.js';

/**
 * Calculates leave periods, weekly patterns, and monthly stats.
 * @param {Object} allocatedDays - The big allocation map
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} parentId - 'parentA' or 'parentB'
 */
export const analyzeExportPlan = (allocatedDays, startDate, endDate, parentId) => {
    // 1. Filter relevant allocations in range
    const rangeAllocations = [];
    const startMs = startDate.getTime();
    const endMs = endDate.getTime();

    // Iterate dates between start and end
    const current = new Date(startDate);
    while (current <= endDate) {
        // Format YYYY-MM-DD
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;

        const dayEntry = allocatedDays[dateStr]; // { parentA: {...}, parentB: {...} }
        const userAlloc = dayEntry?.[parentId];

        if (userAlloc) {
            rangeAllocations.push({ date: new Date(current), ...userAlloc, dateStr });
        }

        current.setDate(current.getDate() + 1);
    }

    // 2. Count Periods (Continuous blocks)
    // A gap of > 1 day implies a new period? 
    // Usually weekends don't break a period if Fri and Mon are taken? 
    // Strict definition: Any gap in DATES.
    // However, for Parents, usually "Period" is distinct application.
    // Let's count gaps > 3 days (to allow weekends/holidays)? 
    // Or strictly: if gap > 1 day. 
    // Let's iterate and check diff.
    let periods = 0;
    if (rangeAllocations.length > 0) periods = 1;

    for (let i = 1; i < rangeAllocations.length; i++) {
        const prev = rangeAllocations[i - 1].date;
        const curr = rangeAllocations[i].date;
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

        if (diffDays > 3) {
            periods++;
        }
    }

    // 3. Monthly Stats
    // Map<"YYYY-MM", totalAllocated>
    const monthlyStats = {};
    const monthlyWorkingDays = {}; // Total weekdays in month

    // Helper to populate working days for denominator? 
    // Simple View: "X % Ledig" = Allocated Days / Total Calendar Days? 
    // Or Allocated / Work Days? Usually Work Days.
    // Let's do: Allocated / Calendar Days for simplicity or try to estimate Work Days.
    // User requested: "Jan: 40% ledig".

    // Iterate ALL days in range to build denominators
    const traverse = new Date(startDate);
    while (traverse <= endDate) {
        const y = traverse.getFullYear();
        const m = traverse.toLocaleString('default', { month: 'long' });
        const key = `${m} ${y}`;
        const dStr = traverse.toISOString().split('T')[0]; // Careful with TZ, but simplistic for keys

        if (!monthlyStats[key]) {
            monthlyStats[key] = { allocated: 0, total: 0 };
        }
        monthlyStats[key].total++;

        const dayEntry = allocatedDays[`${traverse.getFullYear()}-${String(traverse.getMonth() + 1).padStart(2, '0')}-${String(traverse.getDate()).padStart(2, '0')}`];
        if (dayEntry?.[parentId]) {
            monthlyStats[key].allocated += (dayEntry[parentId].extent || 1);
        }

        traverse.setDate(traverse.getDate() + 1);
    }

    const monthlyOverview = Object.entries(monthlyStats).map(([month, stats]) => ({
        month,
        percentage: Math.round((stats.allocated / stats.total) * 100)
    }));


    // 4. Weekly Pattern
    // Count occurrences of "Work" vs "Leave" for each weekday
    const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; // Mon-Fri
    const weekTotals = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const t2 = new Date(startDate);
    while (t2 <= endDate) {
        const day = t2.getDay();
        if (day >= 1 && day <= 5) {
            weekTotals[day]++;
            const dStr = `${t2.getFullYear()}-${String(t2.getMonth() + 1).padStart(2, '0')}-${String(t2.getDate()).padStart(2, '0')}`;
            const entry = allocatedDays[dStr]?.[parentId];
            if (entry) {
                weekCounts[day] += (entry.extent || 1);
            }
        }
        t2.setDate(t2.getDate() + 1);
    }

    const weeklySchedule = [
        { day: 'Måndag', val: weekCounts[1], tot: weekTotals[1] },
        { day: 'Tisdag', val: weekCounts[2], tot: weekTotals[2] },
        { day: 'Onsdag', val: weekCounts[3], tot: weekTotals[3] },
        { day: 'Torsdag', val: weekCounts[4], tot: weekTotals[4] },
        { day: 'Fredag', val: weekCounts[5], tot: weekTotals[5] },
    ].map(d => {
        if (d.tot === 0) return { day: d.day, status: 'Ingen data', color: '#ccc' };
        const leaveRatio = d.val / d.tot;
        if (leaveRatio > 0.9) return { day: d.day, status: 'Föräldraledig (100%)', color: '#ffebee' }; // Red-ish bg
        if (leaveRatio < 0.1) return { day: d.day, status: 'I tjänst (100%)', color: '#e8f5e9' }; // Green-ish
        return { day: d.day, status: `Delledig (${Math.round(leaveRatio * 100)}%)`, color: '#fff3e0' }; // Orange
    });

    return {
        periods,
        monthlyOverview,
        weeklySchedule,
        totalDays: rangeAllocations.length
    };
};
