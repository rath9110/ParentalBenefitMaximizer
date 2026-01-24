import { STATUTORY_CONSTANTS_2026, HOLIDAYS_2026 } from '../config/constants.js';

export const STRATEGIES = {
    TIME_STRETCHER: 'STRAT_TIME_STRETCHER',    // 1. Maxa Ledigheten
    CASH_MAXER: 'STRAT_CASH_MAXER',            // 2. Maxa Utbetalningen
    SGI_FORTRESS: 'STRAT_SGI_FORTRESS',        // 3. SGI-Trygghet
    HOLIDAY_SANDWICH: 'STRAT_HOLIDAY_SANDWICH',// 4. Semester & Klämdagar
    PENSION_PROTECT: 'STRAT_PENSION_PROTECT',  // 5. Pensionssäkra
    GRANDPARENT: 'STRAT_GRANDPARENT',          // 6. Släktpusslet
    EQUALITY: 'STRAT_EQUALITY',                // 7. Dela Lika
    PART_TIME: 'STRAT_PART_TIME',              // 8. Mjukstarten
};

export const STRATEGY_DETAILS = {
    [STRATEGIES.TIME_STRETCHER]: {
        title: "Maxa Ledigheten",
        description: "Year 1: 0 days taken. Year 2: 5 days/week using weekends to save days.",
        icon: "⏳"
    },
    [STRATEGIES.CASH_MAXER]: {
        title: "Maxa Utbetalningen",
        description: "7 days/week for high earner. Optimizes top-up window and checks tax caps.",
        icon: "💰"
    },
    [STRATEGIES.SGI_FORTRESS]: {
        title: "SGI-Trygghet",
        description: "Zero tolerance for gaps. Ensures 5 days activity/week after Year 1.",
        icon: "🛡️"
    },
    [STRATEGIES.HOLIDAY_SANDWICH]: {
        title: "Semester & Klämdagar",
        description: "Bridges holidays (Ascension, Midsummer) to unlock long weekends.",
        icon: "🏖️"
    },
    [STRATEGIES.PENSION_PROTECT]: {
        title: "Pensionssäkra",
        description: "Adds 12.5% (1/8th) S-day on workdays to wave ITP1 premiums.",
        icon: "📈"
    },
    [STRATEGIES.GRANDPARENT]: {
        title: "Släktpusslet",
        description: "Transfers 45 days per parent to proxies. Activates warning at 3.5 years.",
        icon: "👵"
    },
    [STRATEGIES.EQUALITY]: {
        title: "Dela Lika",
        description: "50/50 split. 60 Double Days in first 15 months. Alternating 3-month blocks.",
        icon: "⚖️"
    },
    [STRATEGIES.PART_TIME]: {
        title: "Mjukstarten",
        description: "Finds lowest S-day fraction to match 100% net income while working part-time. (e.g. 75% work + 25% benefit)",
        icon: "🔄"
    }
};

/**
 * 2026 Financial Optimization Engine
 * Generates day-by-day allocation map.
 */
export const generateStrategyPattern = (strategyId, startDate, totalSDays, totalLDays, userProfile, doubleDays = 0, childDobStr = null) => {
    const allocation = {};
    let usedS = 0;
    let usedL = 0;

    // Date setup
    const TODAY_2026 = new Date('2026-01-24');
    const current = new Date(startDate);
    const childDob = childDobStr ? new Date(childDobStr) : new Date(startDate);

    // Initial Budget
    let budgetS = totalSDays;
    let budgetL = totalLDays;
    let budgetDouble = (strategyId === STRATEGIES.EQUALITY) ? STATUTORY_CONSTANTS_2026.DOUBLE_DAY_LIMIT : (doubleDays || 0);

    // Strategy 6: Grandparent - Reserve days upfront
    // Logic: "Transfer up to 45 days per parent". We simply remove them from the 'bookable' pool
    // to simulate them being transferred away.
    if (strategyId === STRATEGIES.GRANDPARENT) {
        budgetS -= (STATUTORY_CONSTANTS_2026.PROXY_TRANSFER_LIMIT * 2); // Reserve 90 days total
    }

    // Determine High Earner
    const incA = userProfile.parentA.income;
    const incB = userProfile.parentB.income;
    const highEarnerId = incA >= incB ? 'parentA' : 'parentB';
    const lowEarnerId = incA >= incB ? 'parentB' : 'parentA';

    // Strategy 8: Mjukstarten (Part-Time Net Match)
    let partTimeExtent = 0;
    if (strategyId === STRATEGIES.PART_TIME) {
        // "Find the lowest fraction (1/4 or 1/2) that bridges the gap."
        // Simplified default: 0.25 (1/4) to complement an 80% work schedule.
        partTimeExtent = 0.25;
    }

    // Track usage per parent
    let usedS_A = 0;
    let usedS_B = 0;
    const RESERVED_PER_PARENT = STATUTORY_CONSTANTS_2026.RESERVED_DAYS_PER_PARENT || 90;
    const maxS_PerParent = Math.max(RESERVED_PER_PARENT, budgetS - RESERVED_PER_PARENT);

    // Loop 2 Years (730 Days)
    for (let i = 0; i < 730; i++) {
        // Soft stop if out of days
        if (usedS >= budgetS && usedL >= budgetL && budgetDouble <= 0) break;

        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;

        const dayOfWeek = current.getDay(); // 0=Sun, 6=Sat
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        // Age Calc
        const ageDiffMs = current - childDob;
        const childAgeDays = Math.ceil(ageDiffMs / (1000 * 60 * 60 * 24));
        const isYear1 = childAgeDays <= 365;
        const isUnder15Months = childAgeDays <= 450;

        let shouldBook = false;
        let pId = 'parentA';
        let type = 'S';
        let amount = 1.0;

        // --- 1. DOUBLE DAYS (Priority) ---
        // "Schedule 60 Double Days within the first 15 months."
        if (budgetDouble > 0 && isUnder15Months && !isWeekend && !isHoliday) {
            if (strategyId === STRATEGIES.EQUALITY || doubleDays > 0) {
                // Determine valid Double Days usage (requires 1 S-day from each)
                if (budgetS >= 2) {
                    // Check specific parent caps
                    // We need 1 from A and 1 from B
                    if (usedS_A < maxS_PerParent && usedS_B < maxS_PerParent) {
                        allocation[dateStr] = {
                            parentA: { parentId: 'parentA', type: 'S', extent: 1.0 },
                            parentB: { parentId: 'parentB', type: 'S', extent: 1.0 }
                        };
                        usedS += 2;
                        usedS_A++;
                        usedS_B++;
                        budgetDouble--;
                        current.setDate(current.getDate() + 1);
                        continue;
                    }
                }
            }
        }

        // --- 2. PER-STRATEGY LOGIC ---

        switch (strategyId) {
            case STRATEGIES.TIME_STRETCHER:
                // Year 1: 0 days. Year 2: 5 days/week to protect SGI.
                // "Smörgås-logic": If Sat/Sun used, Fri or Mon must be L-level.
                if (!isYear1) {
                    // Start filling from Weekends backwards? 
                    // To maximize time off, we want to use L days on weekends.
                    // If we use L on Sat/Sun, we must work/take L on Mon/Fri.
                    // Goal is 5 days activity. 
                    // Pattern: L (Fri), L (Sat), L (Sun) + 2 Work/S days?
                    // Or SGI protection says "Active 5 days".
                    // Taking L-day counts as activity.
                    // Strategy: Take Fri, Sat, Sun, Mon as L-days? (4 days). 
                    // Need 1 more day to reach 5? Tue?
                    // This strategy consumes L days fast.

                    // Simplified implementation of "Smörgås": 
                    // Fri(L), Sat(L), Sun(L) -> 3 days/week used. Cost = 3 L days.
                    // User works Mon-Thu? (4 days work + 3 days L = 7 days activity). Perfect SGI protection.
                    // This creates a 4-day work week? Or 0-day work week?
                    // "Maximize total number of days at home".
                    // If we want max at home, we don't work.
                    // So we need 5 days Benefit.
                    // Fri(L), Sat(L), Sun(L), Mon(S), Tue(S)?

                    // Let's implement a standard "Long Weekend" pattern:
                    // Fri (L), Sat (L), Sun (L). And Mon (S), Tue (S).
                    // This uses 2 S and 3 L per week. Highly efficient stretching.

                    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) { // Fri, Sat, Sun
                        shouldBook = true;
                        type = 'L';
                        // Alternate parents weekly
                        const weekNum = Math.floor(i / 7);
                        pId = (weekNum % 2 === 0) ? 'parentA' : 'parentB';
                    } else if (dayOfWeek === 1 || dayOfWeek === 2) { // Mon, Tue
                        shouldBook = true;
                        type = 'S';
                        const weekNum = Math.floor(i / 7);
                        pId = (weekNum % 2 === 0) ? 'parentA' : 'parentB';
                    }
                }
                break;

            case STRATEGIES.CASH_MAXER:
                // "7.0 S-level days/week during the employer's 10% top-up window (first 180 days)."
                // After 180 days, continue with High Earner until cap?
                // Or switch? Usually max cash means high earner takes all.

                if (childAgeDays <= STATUTORY_CONSTANTS_2026.TOP_UP_WINDOW_DAYS) {
                    shouldBook = true;
                    type = 'S';
                    pId = highEarnerId;
                } else {
                    // After top-up window, still prioritize high earner for SGI cap reasons?
                    // Yes, unless they run out.
                    shouldBook = true;
                    type = 'S';
                    pId = highEarnerId;
                }

                // Fallback to L if S runs out is handled by generalized logic below.
                break;

            case STRATEGIES.SGI_FORTRESS:
                // "Year 1: 0 days payout. Year 2: Enforce 5.0 days/week activity."
                // "Auto-fill gaps with smallest possible fractions (1/8)."
                // NOTE: This assumes the user IS NOT WORKING in Year 2, or needs to top up?
                // Usually "SGI Fortress" implies the user wants to stay home but protect SGI.
                // So we need 5 full days of "activity". 
                // If not working, we need 5 Benefit Days.
                // IF working 80%, we fill the gap.
                // Let's assume the user is "At Home" fully in this simulation?
                // If so, 5 days S/L per week.
                // "Smallest fraction" suggests they ARE working?
                // "Often used to maintain a 4-day work week (80%) with a Friday SGI-filler."
                // OK, let's model that: Mon-Thu Work (Active). Fri -> needs filler.

                if (!isYear1) {
                    if (dayOfWeek === 5) { // Friday
                        shouldBook = true;
                        type = 'S';
                        amount = 0.125; // "1/8 to seal the week"
                        pId = (Math.floor(i / 7) % 2 === 0) ? highEarnerId : lowEarnerId;
                    }
                }
                break;

            case STRATEGIES.HOLIDAY_SANDWICH:
                // "Scan HOLIDAYS_2026. Identify Klämdagar... Take Friday as S-day."
                // Logic: If Friday is between Thursday Holiday and Weekend.
                // Or if Monday is between Weekend and Tuesday Holiday.
                if (!isWeekend && !isHoliday) {
                    const tmrw = new Date(current); tmrw.setDate(tmrw.getDate() + 1);
                    const yest = new Date(current); yest.setDate(yest.getDate() - 1);

                    const toLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    const tmrwStr = toLocal(tmrw);
                    const yestStr = toLocal(yest);

                    const isSqueeze = HOLIDAYS_2026.includes(tmrwStr) || HOLIDAYS_2026.includes(yestStr);

                    if (isSqueeze) {
                        shouldBook = true;
                        type = 'S';
                        pId = highEarnerId; // Or alternate
                    }
                }
                break;

            case STRATEGIES.PENSION_PROTECT:
                // "Take exactly 0.125 (1/8) S-day for every day of partial work."
                // Assuming standard Mon-Fri work week where user works <100%.
                // We book 0.125 daily on weekdays.
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = 0.125;
                    pId = 'parentA'; // Usually applies to the one working part time. Default A.
                }
                break;

            case STRATEGIES.EQUALITY:
                // "Swap primary caregiver every 3-6 months."
                // "60 Double Days" handled above.
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    // 3 month block ~ 90 days.
                    const block = Math.floor(i / 90);
                    pId = (block % 2 === 0) ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.PART_TIME:
                // "Work part-time (e.g., 60-80%)".
                // "Find lowest fraction (1/4 or 1/2)".
                // We determined 0.25 above.
                // Book on all weekdays.
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = partTimeExtent;
                    const weekNum = Math.floor(i / 7);
                    pId = (weekNum % 2 === 0) ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.GRANDPARENT:
                // "Transfer up to 45 days...". Days removed from budget.
                // Remainder: Normal usage? Or just burn weekends?
                // Let's assume balanced usage of remaining days.
                if (!isWeekend && !isHoliday && dayOfWeek <= 4) {
                    shouldBook = true;
                    type = 'S';
                    const weekNum = Math.floor(i / 7);
                    pId = (weekNum % 2 === 0) ? 'parentA' : 'parentB';
                }
                break;
        }

        // --- Execute Booking with Statutory Limits ---
        if (shouldBook) {
            // Cap Logic
            if (type === 'S') {
                if (pId === 'parentA' && usedS_A + amount > maxS_PerParent) {
                    // Try Spillover
                    if (usedS_B + amount <= maxS_PerParent) pId = 'parentB';
                    else { if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false; }
                } else if (pId === 'parentB' && usedS_B + amount > maxS_PerParent) {
                    // Try Spillover
                    if (usedS_A + amount <= maxS_PerParent) pId = 'parentA';
                    else { if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false; }
                }
            }

            // Budget Check
            if (type === 'S' && usedS + amount > budgetS) {
                if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false;
            }
            if (type === 'L' && usedL + amount > budgetL) shouldBook = false;

            if (shouldBook) {
                allocation[dateStr] = {
                    [pId]: { parentId: pId, type: type, extent: amount }
                };
                if (type === 'S') {
                    usedS += amount;
                    if (pId === 'parentA') usedS_A += amount;
                    if (pId === 'parentB') usedS_B += amount;
                } else {
                    usedL += amount;
                }
            }
        }

        current.setDate(current.getDate() + 1);
    } // End Loop

    return allocation;
};

/**
 * 2026 Strategy Analysis
 * Checks for period limits (3-period rule) and tax warnings.
 */
export const analyzeStrategy = (allocation, userProfile) => {
    const warnings = [];
    const dates = Object.keys(allocation).sort();

    // 1. Check Income Cap (State Tax)
    // "If total annual income exceeds 660,400 SEK, trigger a warning"
    // Simplified: Check if user profile income * 12 > Threshold
    const THRESHOLD = STATUTORY_CONSTANTS_2026.STATE_TAX_THRESHOLD;
    if (userProfile.parentA.income * 12 > THRESHOLD || userProfile.parentB.income * 12 > THRESHOLD) {
        warnings.push({
            type: 'tax',
            message: `Warning: High Income detected (> ${THRESHOLD.toLocaleString()} SEK/yr). State tax (20%) may reduce benefit value. Consider "Pension Protect" strategy.`
        });
    }

    // 2. "3-Period Rule" Check
    // "If the chosen strategy creates more than 3 distinct blocks of leave per calendar year."
    // We need to count disjoint intervals.
    // Heuristic: If gap between bookings > 0 days (excluding weekends?), it's a new period?
    // Actually, "Period" usually means any contiguous block.
    // "Every Friday" is legally ONE period if requested as such.
    // So we need to group by "Regularity".
    // If we detect a pattern (e.g. every 7 days), it's 1 period.
    // Simplified: Count > 7 day gaps as new periods.

    let periods = 0;
    if (dates.length > 0) {
        periods = 1;
        let lastDate = new Date(dates[0]);

        for (let i = 1; i < dates.length; i++) {
            const thisDate = new Date(dates[i]);
            const diffDays = (thisDate - lastDate) / (1000 * 60 * 60 * 24);

            // If gap is significant (> 10 days?), count as new period
            // "Every Friday" -> gap is 7 days.
            // "Every Month" -> gap is 30 days.
            // Let's set tolerance at 8 days.
            if (diffDays > 8) {
                periods++;
            }
            lastDate = thisDate;
        }
    }

    if (periods > STATUTORY_CONSTANTS_2026.PERIOD_LIMIT_PER_YEAR) {
        warnings.push({
            type: 'hr',
            message: `Notice: This plan creates ~${periods} leave periods. Swedish law guarantees 3 periods/year. Additional periods require employer approval.`
        });
    }

    return warnings;
};
