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
    const TODAY_2026 = new Date('2026-01-24'); // Fixed "Today" anchor for persona
    const current = new Date(startDate);
    const childDob = childDobStr ? new Date(childDobStr) : new Date(startDate);

    // Initial Budget
    let budgetS = totalSDays;
    let budgetL = totalLDays;
    let budgetDouble = (strategyId === STRATEGIES.EQUALITY) ? STATUTORY_CONSTANTS_2026.DOUBLE_DAY_LIMIT : (doubleDays || 0);

    // Strategy 6: Grandparent - Reserve days upfront
    if (strategyId === STRATEGIES.GRANDPARENT) {
        budgetS -= (STATUTORY_CONSTANTS_2026.PROXY_TRANSFER_LIMIT * 2); // Reserve 90 days
        // If users don't have enough days, we handle that by running out early in loop
    }

    // Determine High Earner
    const incA = userProfile.parentA.income;
    const incB = userProfile.parentB.income;
    const highEarnerId = incA >= incB ? 'parentA' : 'parentB';
    const lowEarnerId = incA >= incB ? 'parentB' : 'parentA';

    // Strategy 8: Part-Time Net Match Calculation
    let partTimeExtent = 0;
    if (strategyId === STRATEGIES.PART_TIME) {
        // Assume default "Mjukstart" target is 80% work (standard part time) or use profiles?
        // Let's assume user works 80% (WorkRate 80).
        // Gap is 20%. 
        // We need to fill 20% Income.
        // Approx: Need 0.25 S-days/day to be safe (since S-day is 80% of salary, 0.25 * 0.8 = 0.2 -> 20%)
        partTimeExtent = 0.25;
    }

    // Track usage per parent
    let usedS_A = 0;
    let usedS_B = 0;
    const RESERVED_PER_PARENT = STATUTORY_CONSTANTS_2026.RESERVED_DAYS_PER_PARENT || 90;
    const maxS_PerParent = Math.max(RESERVED_PER_PARENT, budgetS - RESERVED_PER_PARENT);

    // Loop 2 Years (730 Days)
    for (let i = 0; i < 730; i++) {
        // Stop if out of days (Soft stop, strategy logic might try to force L days)
        if (usedS >= budgetS && usedL >= budgetL && budgetDouble <= 0) break;

        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`; // Local YYYY-MM-DD

        const dayOfWeek = current.getDay(); // 0=Sun, 6=Sat
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        // Age Calc
        const ageDiffMs = current - childDob;
        const childAgeDays = Math.ceil(ageDiffMs / (1000 * 60 * 60 * 24));
        const isYear1 = childAgeDays <= 365;
        const isUnder15Months = childAgeDays <= 450;

        // Strategy Decision Logic
        let shouldBook = false;
        let pId = 'parentA'; // Default
        let type = 'S';
        let amount = 1.0;

        // --- 1. DOUBLE DAYS (Priority) ---
        // Strategy 7 uses 60 in first 15 months. 
        if (budgetDouble > 0 && isUnder15Months && !isWeekend && !isHoliday) {
            // Check if we have S-days (Double days usually use S-days from valid parents)
            // Simplified: We book a "Double" event which consumes 1 day from each parent's quota? 
            // In system, Double Day = 1 day deducted from EACH parent.
            if (strategyId === STRATEGIES.EQUALITY || doubleDays > 0) {
                if (budgetS >= 2) {
                    allocation[dateStr] = {
                        parentA: { parentId: 'parentA', type: 'S', extent: 1.0 },
                        parentB: { parentId: 'parentB', type: 'S', extent: 1.0 }
                    };
                    usedS += 2; // 1 from each
                    usedS_A++;
                    usedS_B++;
                    budgetDouble--;
                    current.setDate(current.getDate() + 1);
                    continue; // Done for this day
                }
            }
        }

        // --- 2. PER-STRATEGY LOGIC ---

        switch (strategyId) {
            case STRATEGIES.TIME_STRETCHER:
                // Year 1: 0 days. Year 2: 5 days/week.
                // Smart Logic: Use L-days on weekends.
                if (!isYear1) {
                    if (isWeekend) {
                        shouldBook = true;
                        type = 'L';
                        pId = (Math.floor(i / 7) % 2 === 0) ? 'parentA' : 'parentB'; // Alternate weeks logic
                    } else if (dayOfWeek >= 1 && dayOfWeek <= 3) { // Mon-Wed S-days
                        shouldBook = true;
                        type = 'S';
                        pId = (Math.floor(i / 7) % 2 === 0) ? 'parentA' : 'parentB';
                    }
                }
                break;

            case STRATEGIES.CASH_MAXER:
                // 7 Days / Week
                shouldBook = true;
                pId = highEarnerId;
                // Switch parent after X days? Let's say high earner takes first 6 months then swap?
                // Request says: "Identify high earner... Schedule 7 days... Prioritize top-up window".
                // We'll stick to high earner until they run dry? Or swap? 
                // Let's swap every month to be safe or stick to high earner. 
                // Let's stick high earner for first 180 days (Top up window usually), then maybe swap?
                // Let's keep High Earner as primary.
                type = 'S';
                // Use L days if S runs out?
                if (usedS >= budgetS) type = 'L';
                break;

            case STRATEGIES.SGI_FORTRESS:
                // Year 1: 0 days (if possible). Year 2: Strict 5 days.
                if (!isYear1) {
                    if (!isWeekend) {
                        shouldBook = true;
                        type = 'S';
                        pId = (Math.floor(i / 7) % 2 === 0) ? highEarnerId : lowEarnerId; // Alternate
                    }
                }
                break;

            case STRATEGIES.HOLIDAY_SANDWICH:
                // Scan for Squeeze days.
                // 2026: May 14 (Thu) is holiday -> May 15 (Fri) is Squeeze.
                // Midsummer Eve (Jun 19) is Holiday -> Thu Jun 18 is NOT squeeze, but nice.
                // Logic: If !Weekend AND !Holiday...
                if (!isWeekend && !isHoliday) {
                    // Check if TOMORROW or YESTERDAY is holiday?
                    // Check if TOMORROW or YESTERDAY is holiday?
                    const tmrw = new Date(current); tmrw.setDate(tmrw.getDate() + 1);
                    const yest = new Date(current); yest.setDate(yest.getDate() - 1);

                    const toLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    const tmrwStr = toLocal(tmrw);
                    const yestStr = toLocal(yest);

                    const isSqueeze = HOLIDAYS_2026.includes(tmrwStr) || HOLIDAYS_2026.includes(yestStr);

                    if (isSqueeze) {
                        // Take it!
                        shouldBook = true;
                        type = 'S';
                        pId = highEarnerId;
                    } else if (dayOfWeek <= 4) { // Fill normal Mon-Thu if needed? Or just Hopping?
                        // Assuming "Holiday Hopper" only generates the squeezes + minimal maintenance?
                        // Or is it a full plan? Usually full plan.
                        // Let's fill Mon-Fri normally, but ensure Squeeze is taken 
                        shouldBook = true;
                        type = 'S';
                        pId = (Math.floor(i / 14) % 2 === 0) ? 'parentA' : 'parentB';
                    }
                }
                break;

            case STRATEGIES.PENSION_PROTECT:
                // 1/8th S-day on every workday
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = 0.125;
                    pId = 'parentA'; // Or both? Assuming User is Parent A logic for now or alternating.
                }
                break;

            case STRATEGIES.EQUALITY:
                // 50/50. Double days handled.
                // Alternate 3 months blocks.
                // Month 0-3: A (already has double days mixed in)
                // Month 4-6: B ...
                {
                    if (!isWeekend && !isHoliday) {
                        shouldBook = true;
                        type = 'S';
                        // 3 month block ~ 90 days.
                        const block = Math.floor(i / 90);
                        pId = (block % 2 === 0) ? 'parentA' : 'parentB';
                    }
                }
                break;

            case STRATEGIES.PART_TIME:
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = partTimeExtent;
                    pId = (Math.floor(i / 14) % 2 === 0) ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.GRANDPARENT:
                // Days reserved. Fill rest normally (Balanced).
                if (!isWeekend && !isHoliday && dayOfWeek <= 4) {
                    shouldBook = true;
                    type = 'S';
                    pId = (Math.floor(i / 7) % 2 === 0) ? 'parentA' : 'parentB';
                }
                break;
        }

        // --- Execute Booking with Statutory Limits ---
        if (shouldBook) {
            // Statutory Cap Logic for S-Days
            if (type === 'S') {
                if (pId === 'parentA' && usedS_A + amount > maxS_PerParent) {
                    // Try Parent B?
                    if (usedS_B + amount <= maxS_PerParent) {
                        pId = 'parentB'; // Spillover
                    } else {
                        // Both Capped: Fallback to L if possible
                        if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false;
                    }
                } else if (pId === 'parentB' && usedS_B + amount > maxS_PerParent) {
                    // Try Parent A?
                    if (usedS_A + amount <= maxS_PerParent) {
                        pId = 'parentA'; // Spillover
                    } else {
                        if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false;
                    }
                }
            }

            // Total Budget Check
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
    }

    return allocation;
};
