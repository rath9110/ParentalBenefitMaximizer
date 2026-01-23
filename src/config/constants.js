export const STATUTORY_CONSTANTS_2026 = {
    PBB_2026: 60500, // Price Base Amount (Prisbasbelopp)
    SGI_CEILING_FACTOR: 10, // 10 * PBB
    S_LEVEL_RATE: 0.8 / 365, // 80% per year / 365
    L_LEVEL_FIXED: 180, // SEK per day
    MAX_SAVED_DAYS_AGE_4: 96,
    DOUBLE_DAY_LIMIT: 60,
    PROXY_TRANSFER_LIMIT: 45, // Per parent

    // Derived constants for convenience
    MAX_SGI_INCOME: 60500 * 10, // 605,000 SEK
};

export const HOLIDAYS_2026 = [
    // Simplified list for the demo - normally this would be a full calendar
    '2026-01-01', // New Year's Day
    '2026-01-06', // Epiphany
    '2026-04-03', // Good Friday
    '2026-04-06', // Easter Monday
    '2026-05-01', // May 1st
    '2026-05-14', // Ascension Day (Thursday) - KEY for Squeeze Day
    '2026-06-06', // National Day
    '2026-06-19', // Midsummer Eve (De facto holiday)
    '2026-12-24', // Christmas Eve
    '2026-12-25', // Christmas Day
    '2026-12-26', // Boxing Day
    '2026-12-31', // New Year's Eve
];
