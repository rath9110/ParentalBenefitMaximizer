import { parseMinaSidorText } from './utils/parser.js';

const messyInput = "NivåTotalt antal dagarAnvända dagarKvarvarande dagarSjukpenningnivå390195195Lägstanivå904545Av dessa är 90 dagar reserverade för dig och kan inte överlåtas.";

console.log("Testing Messy Input:");
console.log(messyInput);

const result = parseMinaSidorText(messyInput);
console.log("\nParsed Result:");
console.log(result);

// Expected: S-Level=195 (Remaining), L-Level=45 (Remaining)
if (result.sDays === 195 && result.lDays === 45) {
    console.log("✅ PASS");
} else {
    console.log("❌ FAIL");
}
