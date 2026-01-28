export const STATUTORY_CONSTANTS_2026 = {
    PBB: 59200, // Price Base Amount
    IBB: 78300, // Estimated Income Base Amount
    SGI_CAP_FULL: 592000, // 10 * PBB
    SGI_CAP_VAB: 444000, // 7.5 * PBB
    STATE_TAX_THRESHOLD: 660400, // 2026 Threshold
    L_LEVEL_RATE: 180, // SEK per day
    MAX_SAVED_DAYS_AGE_4: 96,
    PROXY_TRANSFER_LIMIT: 45, // Per parent
    DOUBLE_DAY_LIMIT: 60,
    RESERVED_DAYS_PER_PARENT: 90,
    TOP_UP_WINDOW_DAYS: 180,
    PERIOD_LIMIT_PER_YEAR: 3
};

export const HOLIDAYS_2026 = [
    '2026-01-01', // Nyårsdagen
    '2026-01-06', // Trettondedag jul
    '2026-04-03', // Långfredagen
    '2026-04-06', // Annandag påsk
    '2026-05-01', // Första maj
    '2026-05-14', // Kristi Himmelsfärdsdag
    '2026-06-06', // Nationaldagen
    '2026-06-19', // Midsommarafton
    '2026-10-31', // Alla helgons dag
    '2026-12-24', // Julafton
    '2026-12-25', // Juldagen
    '2026-12-26', // Annandag jul
    '2026-12-31'  // Nyårsafton
];

export const HOLIDAYS_2027 = [
    '2027-01-01', // Nyårsdagen
    '2027-01-06', // Trettondedag jul
    '2027-03-26', // Långfredagen
    '2027-03-29', // Annandag påsk
    '2027-05-01', // Första maj
    '2027-05-06', // Kristi Himmelsfärdsdag
    '2027-06-06', // Nationaldagen
    '2027-06-25', // Midsommarafton
    '2027-11-06', // Alla helgons dag
    '2027-12-24', // Julafton
    '2027-12-25', // Juldagen
    '2027-12-26', // Annandag jul
    '2027-12-31'  // Nyårsafton
];

export const HOLIDAYS = [...HOLIDAYS_2026, ...HOLIDAYS_2027];
