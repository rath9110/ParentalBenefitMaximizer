import { HOLIDAYS_2026 } from '../config/constants';

// Strategy IDs
export const STRATEGIES = {
    TIME_STRETCHER: 'STRAT_TIME_STRETCHER',    // 1. Time Stretcher
    CASH_MAXER: 'STRAT_CASH_MAXER',            // 2. Cash Maxer
    SGI_FORTRESS: 'STRAT_SGI_FORTRESS',        // 3. SGI Fortress
    HOLIDAY_SANDWICH: 'STRAT_HOLIDAY_SANDWICH',// 4. Holiday Sandwicher
    PENSION_PROTECT: 'STRAT_PENSION_PROTECT',  // 5. Pension Protector
    GRANDPARENT: 'STRAT_GRANDPARENT',          // 6. Grandparent Proxy
    EQUALITY: 'STRAT_EQUALITY',                // 7. Equality Balanced
    PART_TIME: 'STRAT_PART_TIME',              // 8. Part-Time Transition
};

export const STRATEGY_DETAILS = {
    [STRATEGIES.TIME_STRETCHER]: {
        title: "The Time Stretcher",
        description: "Delay preschool. 0 days first year. 5 days/week after age 1 (using L-days on weekends).",
        icon: "⏳"
    },
    [STRATEGIES.CASH_MAXER]: {
        title: "The Cash Maxer",
        description: "Maximize monthly income. High earner takes leave 7 days/week during top-up window.",
        icon: "💰"
    },
    [STRATEGIES.SGI_FORTRESS]: {
        title: "The SGI Fortress",
        description: "Absolute protection. 5 days/week activity strictly enforced after age 1.",
        icon: "🛡️"
    },
    [STRATEGIES.HOLIDAY_SANDWICH]: {
        title: "The Holiday Sandwicher",
        description: "Maximize vacation. Bridges public holidays ('squeeze days').",
        icon: "🏖️"
    },
    [STRATEGIES.PENSION_PROTECT]: {
        title: "The Pension Protector",
        description: "Takes 1/8th day (12.5%) per day to trigger employer pension waiver while working part-time.",
        icon: "📈"
    },
    [STRATEGIES.GRANDPARENT]: {
        title: "The Grandparent Proxy",
        description: "Transfers 45 days per parent to a senior relative for flexible care.",
        icon: "👵"
    },
    [STRATEGIES.EQUALITY]: {
        title: "The Equality Balanced",
        description: "50/50 split. 60 double days used early. Maximizes parity.",
        icon: "⚖️"
    },
    [STRATEGIES.PART_TIME]: {
        title: "The Part-Time Transition",
        description: "Soft return (75% work). Auto-fills exact benefit fraction to restore 100% net.",
        icon: "🔄"
    }
};

/**
 * Generates an allocation map based on the selected strategy.
 * Includes support for 'extent' (fractional days).
 */
export const generateStrategyPattern = (strategyId, startDate, totalSDays, totalLDays, userProfile, doubleDays = 0, childDobStr = null) => {
    const allocation = {}; // Record<dateStr, Record<parentId, {type, extent}>>
    let usedS = 0; // Float
    let usedL = 0; // Float
    const current = new Date(startDate);
    const childDob = childDobStr ? new Date(childDobStr) : new Date(startDate);

    // Double Days Logic (Separate budget?)
    // User requested: "Double Days: Schedules the 60 'Double Days' ... during first 15 months." for Equality Strategy.
    // For others, we probably stick to the input `doubleDays` or 0.
    let doubleDaysBudget = (strategyId === STRATEGIES.EQUALITY) ? 60 : doubleDays;

    // Grandparent Logic: Reduce available days?
    // "Transfer up to 45 days per parent"
    let availableS = totalSDays;
    if (strategyId === STRATEGIES.GRANDPARENT) {
        availableS -= 90; // 45 * 2
        // We don't allocate these in the calendar, effectively "saving" them / removing them from this plan.
    }

    // Determine High Earner
    let pA = userProfile.parentA;
    let pB = userProfile.parentB;
    let highEarnerId = 'parentA';

    const incA = pA.income;
    const incB = pB.income;
    if (incB > incA) highEarnerId = 'parentB';

    // Loop 2 years (approx 730 days)
    for (let i = 0; i < 730; i++) {
        if (usedS >= availableS && usedL >= totalLDays && doubleDaysBudget <= 0) break; // Out of days

        // Fix: Use local date string to match CalendarView and avoid UTC shifts
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;

        const dayOfWeek = current.getDay(); // 0Sun - 6Sat
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = HOLIDAYS_2026.includes(dateStr);

        // Calc Age
        const diffTime = current - childDob;
        const childAgeDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isChildOneYearPlus = childAgeDays >= 365;
        const isChildUnder15Months = childAgeDays < 450;

        let dayAlloc = {};

        // --- 1. DOUBLE DAYS (Priority for Equality Strategy or User Request) ---
        if (doubleDaysBudget > 0 && isChildUnder15Months && !isWeekend && !isHoliday) {
            // Equality Strategy: Prioritize these
            // Others: Only if set
            // Check if we have S days (Double days consume S days usually, or L?)
            // Usually S days. 1 Double Day = 2 S days used (1 per parent).

            if (usedS <= availableS - 2) {
                dayAlloc = {
                    parentA: { parentId: 'parentA', type: 'S', extent: 1.0 },
                    parentB: { parentId: 'parentB', type: 'S', extent: 1.0 }
                };
                usedS += 2;
                doubleDaysBudget--;
                // Skip further logic for this day
                allocation[dateStr] = dayAlloc;
                current.setDate(current.getDate() + 1);
                continue;
            }
        }

        // --- 2. MAIN STRATEGY LOGIC ---

        let shouldTake = false;
        let assignedParent = 'parentA';
        let typeToUse = 'S';
        let extent = 1.0;

        switch (strategyId) {
            case STRATEGIES.TIME_STRETCHER:
                if (isChildOneYearPlus) {
                    // Need 5 days coverage per week for SGI protection.
                    // Goal: Use L-days on weekends (Sat, Sun) to save S-days.
                    // 5 days total: Sat(L), Sun(L), Mon(S), Tue(S), Wed(S).

                    if (dayOfWeek === 6 || dayOfWeek === 0) { // Sat or Sun
                        shouldTake = true;
                        typeToUse = 'L';
                    } else if (dayOfWeek >= 1 && dayOfWeek <= 3) { // Mon, Tue, Wed
                        shouldTake = true;
                        typeToUse = 'S';
                    }
                    // Thu, Fri -> Unpaid (Total = 5 days covered)

                    assignedParent = Math.floor(i / 30) % 2 === 0 ? 'parentA' : 'parentB';
                }
                break;

            case STRATEGIES.CASH_MAXER:
                // 7 days/week (includes weekends)
                // "Requires taking same extent on Fri/Mon to unlock Sat/Sun" -> naturally covered by 7 days/week.
                shouldTake = true;

                // High Earner Priority
                assignedParent = highEarnerId;

                // Switch after Income Cap / Top-up window? (often 180 days)
                if (childAgeDays > 180) {
                    // Maybe share? Or keep maxing?
                    // "Force 7 days/week withdrawal"
                    // Let's swap after 180 days to be realistic/fair or if high earner runs out.
                    assignedParent = (highEarnerId === 'parentA') ? 'parentB' : 'parentA';
                }

                if (usedS < availableS) typeToUse = 'S';
                else typeToUse = 'L';
                break;

            case STRATEGIES.SGI_FORTRESS:
                // Age 0-12m: Automatic protection (Take 0 if possible to save).
                // Age 12m+: Enforce 5 days.
                // "If user works 75%, auto-fill 1.25 days" 
                // We assume user is ON LEAVE if using this planner? 
                // Or is this planner filling gaps?
                // Let's assume standard "Full Time Leave" meant, but specific strategies imply part time.
                // For Fortress: Just ensure 5 days. 
                // Let's do Mon-Fri S-days (Standard) after Year 1.
                if (isChildOneYearPlus) {
                    if (!isWeekend) {
                        shouldTake = true;
                        typeToUse = 'S';
                        assignedParent = Math.floor(i / 30) % 2 === 0 ? 'parentA' : 'parentB';
                    }
                }
                break;

            case STRATEGIES.HOLIDAY_SANDWICH:
                // Scan for squeeze days.
                // If Fri is squeeze (Thu is holiday), take Fri.
                // General: Fill normal weekdays, but prioritize bridging.
                // This is hard to gen pattern for entire year simply.
                // Let's do: Mon-Thu (4 days) to stretch, but FILL SQUEEZE days.
                if (!isWeekend && !isHoliday) {
                    shouldTake = true;
                    // Check if squeeze? (Fri and Thu was holiday?)
                    // Simplified: Just take Mon-Thu normally.
                    if (dayOfWeek === 5) {
                        // It's Friday. Was yesterday holiday?
                        const yest = new Date(current);
                        yest.setDate(yest.getDate() - 1);
                        const yestStr = yest.toISOString().split('T')[0];
                        if (HOLIDAYS_2026.includes(yestStr)) {
                            shouldTake = true; // Take the bridge!
                        } else {
                            shouldTake = false; // Save Fri
                        }
                    }

                    assignedParent = Math.floor(i / 14) % 2 === 0 ? 'parentA' : 'parentB';
                    if (usedS < availableS) typeToUse = 'S'; else typeToUse = 'L';
                }
                break;

            case STRATEGIES.PENSION_PROTECT:
                // "1/8th Hack".
                // Work 80% (Mon-Fri).
                // Take 0.125 days (1 hour) benefit per day? Or per week?
                // "schedules 0.125 days (1/8) of benefit daily."
                if (!isWeekend && !isHoliday) {
                    shouldTake = true;
                    extent = 0.125;
                    typeToUse = 'S';
                    assignedParent = 'parentA'; // Or both? usually one.
                }
                break;

            case STRATEGIES.EQUALITY:
                // 50/50 Split.
                // Double days already handled above.
                // Remaining days: Split evenly.
                // Alternating weeks.
                if (!isWeekend && !isHoliday) {
                    shouldTake = true;
                    // Swap weekly
                    const weekNum = Math.floor(i / 7);
                    assignedParent = weekNum % 2 === 0 ? 'parentA' : 'parentB';

                    if (usedS < availableS) typeToUse = 'S'; else typeToUse = 'L';
                }
                break;

            case STRATEGIES.PART_TIME:
                // "Part-Time Transition" -> 75% work -> 0.25 benefit.
                if (!isWeekend && !isHoliday) {
                    shouldTake = true;
                    extent = 0.25;
                    typeToUse = 'S';
                    assignedParent = Math.floor(i / 30) % 2 === 0 ? 'parentA' : 'parentB';
                }
                break;

            default: // Balanced (Fallback) or Grandparent (Logic is just reservation + balanced rest)
                if (!isWeekend && !isHoliday && dayOfWeek <= 4) { // Mon-Thu
                    shouldTake = true;
                    assignedParent = Math.floor(i / 7) % 2 === 0 ? 'parentA' : 'parentB';
                    if (usedS < availableS) typeToUse = 'S'; else typeToUse = 'L';
                }
                break;
        }

        if (shouldTake) {
            // Check remaining balance
            if (typeToUse === 'S' && usedS + extent > availableS) shouldTake = false;
            if (typeToUse === 'L' && usedL + extent > totalLDays) shouldTake = false;

            if (shouldTake) {
                dayAlloc[assignedParent] = {
                    parentId: assignedParent,
                    type: typeToUse,
                    extent: extent
                };
                if (typeToUse === 'S') usedS += extent;
                else usedL += extent;
            }
        }

        if (Object.keys(dayAlloc).length > 0) {
            allocation[dateStr] = dayAlloc;
        }

        current.setDate(current.getDate() + 1);
    }

    return allocation;
};
