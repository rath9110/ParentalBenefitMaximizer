/**
 * Swedish Tax Calculator ( Simplified 2026 Model )
 * 
 * Handles:
 * - Municipal Tax (Kommunalskatt)
 * - State Tax (Statlig inkomstskatt) - Threshold ~55k/mo
 * - Basic Deduction (Grundavdrag) - Dynamic
 * - Earned Income Tax Credit (Jobbskattavdrag) - Only for work income
 */

// 2026 Estimated Constants
const PBB = 58800; // Prisbasbelopp estimate
const STATE_TAX_THRESHOLD_YEARLY = 660400; // User specified 660,400 SEK
const STATE_TAX_THRESHOLD_MONTHLY = Math.round(STATE_TAX_THRESHOLD_YEARLY / 12);

/**
 * Calculates approximately the Basic Deduction (Grundavdrag)
 * Based on income level relative to PBB.
 */
const calculateGrundavdrag = (annualIncome) => {
    // Simplified model of the curve
    // Low income -> High deduction
    // Med income -> increasing
    // High income -> decreasing to floor

    // Very rough approximation for UI purposes:
    if (annualIncome < 0.99 * PBB) return 0.423 * PBB;
    if (annualIncome < 2.72 * PBB) return 0.423 * PBB + 0.2 * (annualIncome - 0.99 * PBB);
    if (annualIncome < 3.11 * PBB) return 0.77 * PBB;
    if (annualIncome < 7.88 * PBB) return 0.77 * PBB - 0.1 * (annualIncome - 3.11 * PBB);
    return 0.293 * PBB; // Floor
};

/**
 * Calculates Jobbskattavdrag (Work Credit)
 * Only applicable to WORK income, not Benefit income.
 */
const calculateJobbskattavdrag = (annualWorkIncome, annualTaxableIncome, municipalTaxRate) => {
    if (annualWorkIncome <= 0) return 0;

    // Simplified 2025/2026 model
    // Base is roughly related to PBB and municipal tax rate
    // Max credit is around 35-40k per year for average earners

    const PBB_Part = PBB;
    let base = 0;

    if (annualWorkIncome < 1 * PBB_Part) {
        base = (annualWorkIncome - calculateGrundavdrag(annualWorkIncome)) * municipalTaxRate;
    } else {
        // Standard formula approx
        base = (1.5 * PBB_Part + 0.12 * (annualWorkIncome - 1 * PBB_Part));
        // Cap?
    }

    // Rough cap for high earners scaling down?
    // Actually JSA increases with income up to a cap ~160k SEK/month then simplified phase out or flat?
    // Let's use a linear approx for "Standard User" (25k - 60k range)
    // Approx 2500 - 3500 SEK/month reduction in tax.

    // ALGO: Max achievable reduction ~43,000 SEK/year
    // Ramps up from 0 to 350k income.

    let reduction = 0;
    if (annualWorkIncome < 300000) reduction = annualWorkIncome * 0.1; // 10% 
    else reduction = 30000 + (annualWorkIncome - 300000) * 0.03; // Slower growth

    // Cap at 45k
    if (reduction > 45000) reduction = 45000;

    return reduction;
};


/**
 * Calculates Annual Net Income with mixed Work and Benefit sources.
 * Correctly applies Jobbskattavdrag only to the Work portion.
 * 
 * @param {number} grossWorkYearly 
 * @param {number} grossBenefitYearly 
 * @param {number} taxRatePercent 
 * @returns {number} Net Annual Income
 */
export const calculateAnnualMixedNet = (grossWorkYearly, grossBenefitYearly, taxRatePercent) => {
    const totalGross = grossWorkYearly + grossBenefitYearly;
    const taxRate = taxRatePercent / 100;

    // 1. Basic Deduction (Grundavdrag) based on TOTAL income
    const ga = calculateGrundavdrag(totalGross);
    const taxableIncome = Math.max(0, totalGross - ga);

    // 2. Municipal Tax on taxable income
    const municipalTax = taxableIncome * taxRate;

    // 3. State Tax on taxable income over threshold
    let stateTax = 0;
    if (taxableIncome > (STATE_TAX_THRESHOLD_YEARLY - ga)) {
        const taxableOverThreshold = Math.max(0, totalGross - STATE_TAX_THRESHOLD_YEARLY); // Simplified check
        stateTax = taxableOverThreshold * 0.20;
    }

    // 4. Jobbskattavdrag (Work Credit) - Based only on Work Income?
    // Actually, JSA is calculated on Work Income but constrained by Total Tax?
    // Simplified: Calculate JSA based on Work Income level.
    const jsa = calculateJobbskattavdrag(grossWorkYearly, taxableIncome, taxRate);

    // Total Tax
    // Cannot be less than 0
    const totalTax = Math.max(0, municipalTax + stateTax - jsa);

    return Math.round(totalGross - totalTax);
};

/**
 * Calculates Monthly Net Income (Legacy wrapper)
 */
export const calculateNetIncome = (grossMonthly, taxRatePercent, isBenefit = false) => {
    const annualGross = grossMonthly * 12;
    if (isBenefit) {
        return Math.round(calculateAnnualMixedNet(0, annualGross, taxRatePercent) / 12);
    } else {
        return Math.round(calculateAnnualMixedNet(annualGross, 0, taxRatePercent) / 12);
    }
};
