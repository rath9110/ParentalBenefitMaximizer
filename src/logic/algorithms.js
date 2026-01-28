import { STATUTORY_CONSTANTS_2026, HOLIDAYS } from '../config/constants.js';

/**
 * Algo 1: SGI Fortress (Protection)
 * Trigger: Child Age >= 12 months (approx 365 days)
 * Goal: Ensure 5 days of coverage (Work + Benefit) per week.
 */
export const checkSGIProtection = (childAgeMonths, weeklyWorkDays, weeklyBenefitDays) => {
    if (childAgeMonths < 12) return { status: 'OK', message: 'No SGI protection needed yet.' };

    const weeklyCoverage = weeklyWorkDays + weeklyBenefitDays;
    if (weeklyCoverage < 5) {
        const daysMissing = 5 - weeklyCoverage;
        return {
            status: 'WARNING',
            missingDays: daysMissing,
            recommendation: `Add ${daysMissing} L-Level days to protect your SGI.`,
            action: 'AUTO_FILL_L_LEVEL'
        };
    }
    return { status: 'OK', message: 'SGI protected.' };
};

/**
 * Algo 2: Pension Protector (ITP1 Waiver)
 * Trigger: ITP1 plan + Work Rate < 100%
 * Goal: Trigger premium waiver with 1/8th day (0.125).
 */
export const optimizePension = (employerPlan, workRatePercent, monthlySalary) => {
    if (employerPlan !== 'ITP1' || workRatePercent >= 100) return null;

    const pensionValueSaved = monthlySalary * 0.045; // Approx 4.5% premium
    return {
        recommendation: 'Take 0.125 S-days on work days.',
        valueSaved: pensionValueSaved,
        action: 'INSERT_PENSION_WAIVER'
    };
};

/**
 * Algo 3: Employer Arbitrage (Cash Max)
 * Goal: Maximize top-ups during the initial period.
 */
export const calculateEmployerArbitrage = (salaryParentA, salaryParentB, topUpWindowDays = 180) => {
    const highestEarner = salaryParentA > salaryParentB ? 'Parent A' : 'Parent B';
    const bonusEstimate = Math.max(salaryParentA, salaryParentB) * 0.10 * (topUpWindowDays / 30); // Rough estimate

    return {
        strategy: `Maximize ${highestEarner} withdrawal for first ${topUpWindowDays} days.`,
        bonusEstimate: Math.round(bonusEstimate),
        action: 'MAXIMIZE_HIGH_EARNER_EARLY'
    };
};

/**
 * Algo 4: Summer Hopper (Holiday Multiplier)
 * Goal: Find squeeze days.
 */
export const findHolidayHacks = (year = 2026) => {
    // Simple logic: If Thursday is a holiday, Friday is a squeeze day.
    // In a real app, this would check days of the week for all holidays.
    const hacks = [];
    HOLIDAYS.forEach(dateStr => {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay(); // 0Sun, 1Mon... 4Thu, 5Fri

        // Example: If Holiday is Thursday (4), suggest Friday (5) as S-day to get Sat/Sun free? 
        // Actually, widespread 'Klämdag' is usually Friday after Ascension Day.
        if (dayOfWeek === 4) { // Thursday
            const squeezeDate = new Date(date);
            squeezeDate.setDate(date.getDate() + 1);
            hacks.push({
                holiday: dateStr,
                squeezeDay: squeezeDate.toISOString().split('T')[0],
                message: 'Take Friday off to get a 4-day weekend.',
                type: 'GREEN_GLOW'
            });
        }
    });
    return hacks;
};

/**
 * Algo 5: Grandparent Proxy (Transfer)
 * Trigger: S-Days > 96 days left at 42 months (3.5 years).
 */
export const checkProxyTransfer = (sDaysRemaining, childAgeMonths) => {
    const limit = STATUTORY_CONSTANTS_2026.MAX_SAVED_DAYS_AGE_4;
    if (childAgeMonths >= 42 && sDaysRemaining > limit) {
        const overflow = sDaysRemaining - limit;
        const transferable = Math.min(overflow, STATUTORY_CONSTANTS_2026.PROXY_TRANSFER_LIMIT * 2); // 90 max total
        return {
            alert: 'Days expiring soon!',
            transferableDays: transferable,
            action: 'TRANSFER_TO_PROXY'
        };
    }
    return null;
};

/**
 * Algo 6: Part-Time Net Match
 * Goal: Fill income gap.
 */
export const calculatePartTimeMatch = (netSalary, targetWorkRate) => {
    const currentNet = netSalary * (targetWorkRate / 100);
    const gap = netSalary - currentNet;

    // How many S-days needed to fill gap?
    // Daily S-day net value approx = (Monthly / 30) * 0.8 (Rough approximation for UI)
    const dailyNetBenefit = (netSalary / 30) * 0.8;
    const daysNeeded = gap / dailyNetBenefit;

    // Round to nearest statutory fraction: 0.125, 0.25, 0.5, 0.75, 1.0
    const fractions = [0.125, 0.25, 0.5, 0.75, 1.0];
    const bestFit = fractions.reduce((prev, curr) =>
        Math.abs(curr - daysNeeded) < Math.abs(prev - daysNeeded) ? curr : prev
    );

    return {
        fractionNeeded: bestFit,
        message: `Work ${targetWorkRate}%, take ${bestFit} S-days to match 100% income.`
    };
};
