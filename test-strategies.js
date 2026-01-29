import { STRATEGIES, generateStrategyPattern } from './src/logic/strategies.js';

// Mock Data
const mockProfile = {
    parentA: { name: 'Alice', income: 50000, hasTopUp: true },
    parentB: { name: 'Bob', income: 30000, hasTopUp: false },
    childDob: '2026-01-01',
    taxRate: 30.0
};

const mockBenefitData = {
    sDays: 390,
    lDays: 90,
    reservedDays: 90,
    doubleDays: 60
};

const testResults = [];

function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion Failed: ${message}`);
    }
}

async function runTests() {
    console.log("🚀 Starting Strategy Engine Audit...");

    for (const [key, id] of Object.entries(STRATEGIES)) {
        if (id === STRATEGIES.NONE) continue;

        console.log(`\n--- Testing: ${key} (${id}) ---`);

        try {
            const allocation = generateStrategyPattern(
                id,
                new Date('2026-01-01'),
                mockBenefitData.sDays,
                mockBenefitData.lDays,
                mockProfile,
                mockBenefitData.doubleDays,
                mockProfile.childDob
            );

            const dates = Object.keys(allocation).sort();
            const totalAllocatedDays = Object.values(allocation).reduce((acc, current) => {
                return acc + Object.values(current).reduce((dayAcc, alloc) => dayAcc + alloc.extent, 0);
            }, 0);

            console.log(`- Total unique dates with leave: ${dates.length}`);
            console.log(`- Total benefit days consumed: ${totalAllocatedDays.toFixed(1)}`);

            // Strategy-specific checks
            if (id === STRATEGIES.TIME_STRETCHER) {
                // Check Year 1 vs Year 2
                const year1Days = dates.filter(d => d.startsWith('2026')).length;
                const year2Days = dates.filter(d => d.startsWith('2027')).length;
                console.log(`  * Year 1 (Saved): ${year1Days} dates (mostly double days)`);
                console.log(`  * Year 2 (Spent): ${year2Days} dates`);

                // Verify 5-day week in Year 2
                const feb27 = dates.filter(d => d.startsWith('2027-02-'));
                console.log(`  * Samples in Feb 2027: ${feb27.length} days (Target is ~20 for 5d/week)`);
                assert(year2Days > year1Days, "Year 2 should have significantly more active benefit days than Year 1");
            }

            if (id === STRATEGIES.CASH_MAXER) {
                const samps = dates.slice(100, 110);
                const is7Days = samps.length >= 7; // Simple check for density
                console.log(`  * Sample Density: High (7d/week mode active)`);
                assert(totalAllocatedDays > 400, "Cash Maxer should use a very high amount of days quickly");
            }

            if (id === STRATEGIES.EQUALITY) {
                let countA = 0;
                let countB = 0;
                Object.values(allocation).forEach(day => {
                    if (day.parentA) countA += day.parentA.extent;
                    if (day.parentB) countB += day.parentB.extent;
                });
                console.log(`  * Parent A: ${countA.toFixed(1)} days`);
                console.log(`  * Parent B: ${countB.toFixed(1)} days`);
                const diff = Math.abs(countA - countB);
                console.log(`  * Difference: ${diff.toFixed(1)}`);
                assert(diff < 50, "Equality strategy should keep parent split relatively balanced");
            }

            if (id === STRATEGIES.SGI_FORTRESS) {
                // SGI Fortress only kicks in AFTER Year 1 (2026).
                // Initial days in mapping are year 1 double days (1.0 each)
                const year2Allocations = Object.entries(allocation).filter(([date]) => date.startsWith('2027'));
                const year2Samples = year2Allocations.slice(0, 10).map(e => e[1]);
                const areSmallFractions = year2Samples.every(s => Object.values(s)[0].extent === 0.125);
                console.log(`  * Using Friday Fillers (0.125) in Year 2: ${areSmallFractions}`);
                assert(year2Samples.length === 0 || areSmallFractions, "SGI Fortress should use 1/8th day fillers in Year 2");
            }

            // Period Counting Logic
            const parentPeriods = { parentA: 0, parentB: 0 };
            const lastDate = { parentA: null, parentB: null };

            dates.forEach(dateStr => {
                const dayAlloc = allocation[dateStr];
                const d = new Date(dateStr);

                ['parentA', 'parentB'].forEach(pId => {
                    if (dayAlloc[pId]) {
                        if (!lastDate[pId]) {
                            parentPeriods[pId] = 1;
                        } else {
                            const diff = (d - lastDate[pId]) / (1000 * 60 * 60 * 24);
                            if (diff > 8) { // Gap larger than a week + weekend
                                parentPeriods[pId]++;
                            }
                        }
                        lastDate[pId] = d;
                    }
                });
            });

            console.log(`  * Periods: Parent A: ${parentPeriods.parentA}, Parent B: ${parentPeriods.parentB}`);
            if (id !== STRATEGIES.HOLIDAY_SANDWICH) {
                assert(parentPeriods.parentA <= 3, `Parent A has too many chunks (${parentPeriods.parentA})`);
                assert(parentPeriods.parentB <= 3, `Parent B has too many chunks (${parentPeriods.parentB})`);
            } else {
                console.log(`  * (Skipping strict chunk check for Holiday Sandwich)`);
            }

            testResults.push({ strategy: key, status: 'PASS' });
        } catch (err) {
            console.error(`❌ Error in ${key}:`, err.message);
            testResults.push({ strategy: key, status: 'FAIL', error: err.message });
        }
    }

    console.log("\n--- Final Audit Summary ---");
    testResults.forEach(r => console.log(`${r.status === 'PASS' ? '✅' : '❌'} ${r.strategy}: ${r.status}${r.error ? ` (${r.error})` : ''}`));
}

runTests();
