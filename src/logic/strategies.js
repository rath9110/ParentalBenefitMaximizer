import { STATUTORY_CONSTANTS_2026, HOLIDAYS } from '../config/constants.js';

export const STRATEGIES = {
    TIME_STRETCHER: 'STRAT_TIME_STRETCHER',    // 1. Maxa Ledigheten
    CASH_MAXER: 'STRAT_CASH_MAXER',            // 2. Maxa Utbetalningen
    SGI_FORTRESS: 'STRAT_SGI_FORTRESS',        // 3. SGI-Trygghet
    HOLIDAY_SANDWICH: 'STRAT_HOLIDAY_SANDWICH',// 4. Semester & Klämdagar
    PENSION_PROTECT: 'STRAT_PENSION_PROTECT',  // 5. Pensionssäkra
    GRANDPARENT: 'STRAT_GRANDPARENT',          // 6. Släktpusslet
    EQUALITY: 'STRAT_EQUALITY',                // 7. Dela Lika
    PART_TIME: 'STRAT_PART_TIME',              // 8. Mjukstarten
    NONE: 'STRAT_NONE',                        // Skip strategy
};

export const STRATEGY_DETAILS = {
    [STRATEGIES.TIME_STRETCHER]: {
        title: "Maxa Ledigheten",
        description: "Mål: Var hemma längst (100% ledig). Spara alla dagar år 1. Från år 2 tar vi ut sammanhängande block om 5 dagar/vecka för att maxa tiden.",
        icon: "⏳"
    },
    [STRATEGIES.CASH_MAXER]: {
        title: "Maxa Utbetalningen",
        description: "Goal: Most money now. Deplete days fast when salary is highest (incl. top-up) for max monthly amount.",
        icon: "💰"
    },
    [STRATEGIES.SGI_FORTRESS]: {
        title: "SGI-Trygghet",
        description: "Goal: Protect SGI. Ensure you never fall into the \"SGI trap\" after year 1, keeping future sick pay and VAB high.",
        icon: "🛡️"
    },
    [STRATEGIES.HOLIDAY_SANDWICH]: {
        title: "Långledighets-hacket",
        description: "Goal: Holiday bonus. We automatically find \"squeeze days\" between red days and weekends to maximize your consecutive time off.",
        icon: "🏖️"
    },
    [STRATEGIES.PENSION_PROTECT]: {
        title: "Pensionssäkra",
        description: "Goal: Protect future. Work part-time without losing occupational pension. Take exactly 1/8 day to trigger employer payments.",
        icon: "📈"
    },
    [STRATEGIES.GRANDPARENT]: {
        title: "Släktpusslet",
        description: "Goal: Relief. Transfer 45 days per parent to a grandparent or friend for more daily flexibility.",
        icon: "👵"
    },
    [STRATEGIES.EQUALITY]: {
        title: "Dela Lika",
        description: "Goal: Fair 50/50. We split all days (S and L) equally, assigning one half to each parent in a single clean block.",
        icon: "⚖️"
    },
    [STRATEGIES.PART_TIME]: {
        title: "Mjukstarten",
        description: "Goal: Keep salary. Reduce work hours but keep 100% of regular wage by filling income gap exactly with parental benefit.",
        icon: "🔄"
    }
};

/**
 * 2026 Financial Optimization Engine
 * Generates day-by-day allocation map.
 */
export const generateStrategyPattern = (strategyId, startDate, totalSDays, totalLDays, userProfile, doubleDays = 0, childDobStr = null) => {
    if (strategyId === STRATEGIES.NONE) return {};
    const allocation = {};
    let usedS = 0;
    let usedL = 0;

    const current = new Date(startDate);
    const childDob = childDobStr ? new Date(childDobStr) : new Date(startDate);

    let budgetS = totalSDays;
    let budgetL = totalLDays;
    let budgetDouble = (strategyId === STRATEGIES.EQUALITY) ? STATUTORY_CONSTANTS_2026.DOUBLE_DAY_LIMIT : (doubleDays || 0);

    if (strategyId === STRATEGIES.GRANDPARENT) {
        budgetS -= (STATUTORY_CONSTANTS_2026.PROXY_TRANSFER_LIMIT * 2);
    }

    const incA = userProfile.parentA.income;
    const incB = userProfile.parentB.income;
    const highEarnerId = incA >= incB ? 'parentA' : 'parentB';

    let usedS_A = 0;
    let usedS_B = 0;
    let usedL_A = 0;
    let usedL_B = 0;

    const RESERVED_PER_PARENT = STATUTORY_CONSTANTS_2026.RESERVED_DAYS_PER_PARENT || 90;
    const totalBank = budgetS + budgetL;
    let maxTotal_PerParent = Math.max(RESERVED_PER_PARENT, Math.floor(totalBank / 2));
    let maxS_PerParent = Math.max(RESERVED_PER_PARENT, budgetS - RESERVED_PER_PARENT);

    if (strategyId === STRATEGIES.EQUALITY) {
        maxS_PerParent = Math.floor(budgetS / 2);
        maxTotal_PerParent = Math.floor(totalBank / 2);
    }

    for (let i = 0; i < 730; i++) {
        if (usedS >= budgetS && usedL >= budgetL && budgetDouble <= 0) break;

        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;

        const dayOfWeek = current.getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const isHoliday = HOLIDAYS.includes(dateStr);

        const ageDiffMs = current - childDob;
        const childAgeDays = Math.ceil(ageDiffMs / (1000 * 60 * 60 * 24));
        const isYear1 = childAgeDays <= 365;
        const isUnder15Months = childAgeDays <= 450;

        let shouldBook = false;
        let pId = 'parentA';
        let type = 'S';
        let amount = 1.0;

        // --- 1. DOUBLE DAYS (Priority) ---
        if (budgetDouble > 0 && isUnder15Months && !isWeekend && !isHoliday) {
            if (usedS_A < maxS_PerParent && usedS_B < maxS_PerParent && budgetS >= 2) {
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

        // --- 2. PER-STRATEGY LOGIC ---
        switch (strategyId) {
            case STRATEGIES.TIME_STRETCHER:
                if (!isYear1 && dayOfWeek >= 1 && dayOfWeek <= 5) {
                    shouldBook = true;
                    type = 'S';
                    pId = (usedS_A < maxS_PerParent) ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.CASH_MAXER:
                shouldBook = true;
                type = 'S';
                pId = highEarnerId;
                break;

            case STRATEGIES.SGI_FORTRESS:
                if (!isYear1 && dayOfWeek === 5) {
                    shouldBook = true;
                    type = 'S';
                    amount = 0.125;
                    pId = highEarnerId;
                }
                break;

            case STRATEGIES.HOLIDAY_SANDWICH:
                // Find any "squeeze day" (weekday between holiday and weekend)
                if (!isWeekend && !isHoliday) {
                    const tmrw = new Date(current); tmrw.setDate(tmrw.getDate() + 1);
                    const yest = new Date(current); yest.setDate(yest.getDate() - 1);
                    const toLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    if (HOLIDAYS.includes(toLocal(tmrw)) || HOLIDAYS.includes(toLocal(yest))) {
                        shouldBook = true;
                        type = 'S';
                        pId = 'parentA';
                    }
                }
                break;

            case STRATEGIES.PENSION_PROTECT:
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = 0.125;
                    pId = 'parentA';
                }
                break;

            case STRATEGIES.EQUALITY:
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    pId = (usedS_A + usedL_A < maxTotal_PerParent) ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.PART_TIME:
                if (!isWeekend && !isHoliday) {
                    shouldBook = true;
                    type = 'S';
                    amount = 0.25;
                    pId = 'parentA';
                }
                break;

            case STRATEGIES.GRANDPARENT:
                if (!isWeekend && !isHoliday && dayOfWeek <= 4) {
                    shouldBook = true;
                    type = 'S';
                    pId = (usedS_A < maxS_PerParent) ? 'parentA' : 'parentB';
                }
                break;
        }

        // --- Execute Booking with Statutory Limits ---
        if (shouldBook) {
            if (type === 'S') {
                if (pId === 'parentA' && usedS_A + amount > maxS_PerParent) {
                    if (usedS_B + amount <= maxS_PerParent) pId = 'parentB';
                    else { if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false; }
                } else if (pId === 'parentB' && usedS_B + amount > maxS_PerParent) {
                    if (usedS_A + amount <= maxS_PerParent) pId = 'parentA';
                    else { if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false; }
                }
            }

            if (type === 'S' && usedS + amount > budgetS) {
                if (usedL + amount <= budgetL) type = 'L'; else shouldBook = false;
            }
            if (type === 'L' && usedL + amount > budgetL) shouldBook = false;

            if (shouldBook) {
                allocation[dateStr] = allocation[dateStr] || {};
                allocation[dateStr][pId] = { parentId: pId, type: type, extent: amount };

                if (type === 'S') {
                    usedS += amount;
                    if (pId === 'parentA') usedS_A += amount;
                    if (pId === 'parentB') usedS_B += amount;
                } else {
                    usedL += amount;
                    if (pId === 'parentA') usedL_A += amount;
                    if (pId === 'parentB') usedL_B += amount;
                }
            }
        }
        current.setDate(current.getDate() + 1);
    }
    return allocation;
};

export const analyzeStrategy = (allocation, userProfile) => {
    const warnings = [];
    const dates = Object.keys(allocation).sort();
    const THRESHOLD = STATUTORY_CONSTANTS_2026.STATE_TAX_THRESHOLD;
    if (userProfile.parentA.income * 12 > THRESHOLD || userProfile.parentB.income * 12 > THRESHOLD) {
        warnings.push({
            type: 'tax',
            message: `Warning: High Income detected (> ${THRESHOLD.toLocaleString()} SEK/yr). State tax (20%) may reduce benefit value.`
        });
    }

    let periods = 0;
    if (dates.length > 0) {
        periods = 1;
        let lastDate = new Date(dates[0]);
        for (let i = 1; i < dates.length; i++) {
            const thisDate = new Date(dates[i]);
            const diffDays = (thisDate - lastDate) / (1000 * 60 * 60 * 24);
            if (diffDays > 8) periods++;
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
