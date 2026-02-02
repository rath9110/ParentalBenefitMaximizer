
import { parseMinaSidorText } from './utils/parser.js';
import { checkSGIProtection, optimizePension, calculateEmployerArbitrage, findHolidayHacks, checkProxyTransfer, calculatePartTimeMatch, checkFirstYearCoverage } from './logic/algorithms.js';

console.log('--- STARTING VERIFICATION ---');

// 1. Parser Verification
console.log('\n--- 1. Parser Test ---');
const rawText = "Här är din sammanställning: sjukpenningnivå: 195 dagar kvar. lägstanivå: 45 dagar kvar. reserverade: 30 dagar.";
const parsed = parseMinaSidorText(rawText);
console.log('Input:', rawText);
console.log('Output:', parsed);
if (parsed.sDays === 195 && parsed.lDays === 45 && parsed.reservedDays === 30) {
    console.log('✅ Parser: PASS');
} else {
    console.error('❌ Parser: FAIL');
}

// 2. Algo Verification
console.log('\n--- 2. Algorithms Test ---');

// SGI Protection
const sgi = checkSGIProtection(13, 2, 0); // 13 months old, 2 days work, 0 benefit
console.log('SGI Protection (Should Warn):', sgi);
if (sgi.status === 'WARNING' && sgi.missingDays === 3) {
    console.log('✅ SGI Algo: PASS');
} else {
    console.error('❌ SGI Algo: FAIL');
}

// Pension
const pension = optimizePension('ITP1', 80, 40000);
console.log('Pension (Should Recommend):', pension);
if (pension && pension.valueSaved === 1800) { // 40000 * 0.045
    console.log('✅ Pension Algo: PASS');
} else {
    console.error('❌ Pension Algo: FAIL');
}

// Arbitrage
const arbitrage = calculateEmployerArbitrage(50000, 30000);
console.log('Arbitrage (Should Pick Parent A):', arbitrage);
if (arbitrage.action === 'MAXIMIZE_HIGH_EARNER_EARLY') {
    console.log('✅ Arbitrage Algo: PASS');
} else {
    console.error('❌ Arbitrage Algo: FAIL');
}

// Holiday Hacks
const hacks = findHolidayHacks();
console.log(`Holiday Hacks found: ${hacks.length}`);
if (hacks.length > 0) {
    console.log('✅ Holiday Algo: PASS');
} else {
    console.log('⚠️ Holiday Algo: NO MATCHES (Check constraints)');
}

// First Year Coverage
console.log('\n--- 3. First Year Coverage Test ---');
const dob = '2026-01-01';
const emptyAlloc = {};
const gapTest = checkFirstYearCoverage(dob, emptyAlloc);
console.log('Gap Test (Should have gap):', gapTest);
if (gapTest.hasGap && gapTest.message === "Barnet måste ha en förälder hemma hela första året") {
    console.log('✅ First Year Coverage (Gap): PASS');
} else {
    console.error('❌ First Year Coverage (Gap): FAIL');
}

// Dummy alloc for first year weekdays (simplified test)
const fullAlloc = {};
const startDate = new Date(dob);
for (let i = 0; i < 400; i++) {
    const d = new Date(dob);
    d.setDate(startDate.getDate() + i);
    const ds = d.toISOString().split('T')[0];
    fullAlloc[ds] = { parentA: { type: 'S' } };
}
const noGapTest = checkFirstYearCoverage(dob, fullAlloc);
console.log('No Gap Test:', noGapTest.hasGap ? 'Gap found' : 'No gap');
if (!noGapTest.hasGap) {
    console.log('✅ First Year Coverage (No Gap): PASS');
} else {
    console.error('❌ First Year Coverage (No Gap): FAIL');
}

console.log('\n--- VERIFICATION COMPLETE ---');
