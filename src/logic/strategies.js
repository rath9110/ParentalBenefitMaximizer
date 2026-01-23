import { HOLIDAYS_2026 } from '../config/constants';

// Strategy IDs
export const STRATEGIES = {
    CASH_MAX: 'STRAT_CASH_MAX',          // "Income Booster"
    TIME_MAX: 'STRAT_TIME_MAX',          // "SGI Safe-Guard"
    BALANCED: 'STRAT_BALANCED',          // "Balanced 80%"
};

export const STRATEGY_DETAILS = {
    [STRATEGIES.CASH_MAX]: {
        title: "Income Booster (Max Cash)",
        description: "Maximizes top-ups by prioritizing the higher earner for the first 6 months (7 days/week).",
        icon: "💰"
    },
    [STRATEGIES.TIME_MAX]: {
        title: "SGI Safe-Guard (Max Time)",
        description: "Takes 0 days Year 1. Uses L-Days and S-Days sparingly to protect SGI in Year 2.",
        icon: "⏳"
    },
    [STRATEGIES.BALANCED]: {
        title: "Balanced 50/50",
        description: "Splits days evenly between parents, taking 4 days/week to stretch time.",
        icon: "⚖️"
    }
};

/**
 * Generates an allocation map based on the selected strategy and financial profile.
 * 
 * @param {string} strategyId 
 * @param {Date} startDate 
 * @param {number} totalSDays 
 * @param {number} totalLDays 
 * @param {Object} userProfile 
 * @returns {Object} allocatedDays map { "YYYY-MM-DD": { parentId, type: 'S' | 'L' } }
 */
export const generateStrategyPattern = (strategyId, startDate, totalSDays, totalLDays, userProfile) => {
    const allocation = {};
    let usedS = 0;
    let usedL = 0;
    const current = new Date(startDate);

    // Determine Logic
    let cashParent = 'parentA';
    let secondaryParent = 'parentB';

    if (userProfile) {
        // Simple logic: Highest income + topup gets priority for Cash strategy
        const pA = userProfile.parentA;
        const pB = userProfile.parentB;
        const scoreA = pA.income + (pA.hasTopUp ? 100000 : 0);
        const scoreB = pB.income + (pB.hasTopUp ? 100000 : 0);

        if (scoreB > scoreA) {
            cashParent = 'parentB';
            secondaryParent = 'parentA';
        }
    }

    // Loop for 2 years (730 days)
    for (let i = 0; i < 730; i++) {
        if (usedS >= totalSDays && usedL >= totalLDays) break; // Out of days

        const dateStr = current.toISOString().split('T')[0];
        const dayOfWeek = current.getDay(); // 0Sun - 6Sat
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        let shouldTake = false;
        let assignedParent = 'parentA';
        let typeToUse = 'S'; // Default

        // --- STRATEGY RULES ---

        if (strategyId === STRATEGIES.CASH_MAX) {
            // Aggressive: 7 days/week
            shouldTake = true;

            // Parent Logic: Income Booster defaults to "Cash Parent" mostly
            // But let's split after 6 months to be fair?
            // "Income Booster" = Maximize household net.
            // Usually keeping high earner on leave is BAD for net (loss of high income).
            // Actually, usually LOW EARNER should take the leave to minimize loss?
            // UNLESS top-up makes it nearly 100%.
            // Let's assume User wants to maximize *Benefit Payout*? No, usually Net.
            // Standard advice: Low earner takes leave. High earner works.
            // BUT "Top Up" makes high earner leave lucrative.
            // Let's stick to: Cash Parent takes first 180 (Top Up window), then swap.

            if (i < 180) {
                assignedParent = cashParent;
            } else {
                assignedParent = secondaryParent;
            }

            // Type Logic: S days first, then L days
            if (usedS < totalSDays) {
                typeToUse = 'S';
            } else if (usedL < totalLDays) {
                typeToUse = 'L';
            } else {
                shouldTake = false;
            }
        }
        else if (strategyId === STRATEGIES.TIME_MAX) {
            // SGI Safe Guard
            // Year 1: 0 days.
            // Year 2: 5 days/week (Mon-Fri).
            if (i >= 365) {
                if (!isWeekend && !isHoliday) {
                    shouldTake = true;
                    // Split 50/50 every month (approx 30 days)
                    assignedParent = Math.floor(i / 30) % 2 === 0 ? 'parentA' : 'parentB';

                    // Priority: Use L days first? No, SGI protection requires "Benefit", L counts.
                    // People usually save S days for cash, use L for protection if low on S.
                    // Let's mix: Use S for 3 days, L for 2 days?
                    // Simpler: Use S days until low, then L.
                    if (usedS < totalSDays) typeToUse = 'S';
                    else if (usedL < totalLDays) typeToUse = 'L';
                    else shouldTake = false;
                }
            }
        }
        else if (strategyId === STRATEGIES.BALANCED) {
            // 4 days/week (Mon-Thu)
            if (dayOfWeek >= 1 && dayOfWeek <= 4 && !isHoliday) {
                shouldTake = true;

                // Strictly 50/50 Split
                // Swap every week?
                const weekNum = Math.floor(i / 7);
                assignedParent = weekNum % 2 === 0 ? 'parentA' : 'parentB';

                if (usedS < totalSDays) typeToUse = 'S';
                else if (usedL < totalLDays) typeToUse = 'L';
                else shouldTake = false;
            }
        }

        if (shouldTake) {
            allocation[dateStr] = { parentId: assignedParent, type: typeToUse };

            if (typeToUse === 'S') usedS++;
            else usedL++;
        }

        current.setDate(current.getDate() + 1);
    }

    return allocation;
};
