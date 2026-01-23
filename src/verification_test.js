
import { parseMinaSidorText } from './utils/parser.js';
import { checkSGIProtection, optimizePension, calculateEmployerArbitrage, findHolidayHacks, checkProxyTransfer, calculatePartTimeMatch } from './logic/algorithms.js';

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

console.log('\n--- VERIFICATION COMPLETE ---');
