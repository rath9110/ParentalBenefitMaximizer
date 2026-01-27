// Skatteverket API Endpoint
// Dataset: Skattesatser (Tax Rates)
// Using Entryscape Rowstore API
const API_URL = "https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99";

// Fallback data in case API fails (CORS or downtime)
// Top 20 biggest municipalities + extras
const FALLBACK_MUNICIPALITIES = [
    { kommun: "Stockholm", skattesats: 29.82 },
    { kommun: "Göteborg", skattesats: 32.60 },
    { kommun: "Malmö", skattesats: 32.42 },
    { kommun: "Uppsala", skattesats: 32.85 },
    { kommun: "Linköping", skattesats: 31.95 },
    { kommun: "Örebro", skattesats: 33.15 },
    { kommun: "Västerås", skattesats: 31.69 },
    { kommun: "Helsingborg", skattesats: 31.69 },
    { kommun: "Norrköping", skattesats: 33.30 },
    { kommun: "Jönköping", skattesats: 32.60 },
    { kommun: "Umeå", skattesats: 33.30 },
    { kommun: "Lund", skattesats: 31.53 },
    { kommun: "Borås", skattesats: 32.49 },
    { kommun: "Huddinge", skattesats: 31.55 },
    { kommun: "Eskilstuna", skattesats: 32.61 },
    { kommun: "Nacka", skattesats: 29.28 }, // Low tax
    { kommun: "Halmstad", skattesats: 32.08 },
    { kommun: "Sundsvall", skattesats: 33.78 },
    { kommun: "Solna", skattesats: 29.20 }, // Low tax
    { kommun: "Österåker", skattesats: 28.98 }, // Lowest?
    { kommun: "Dorotea", skattesats: 35.15 } // High tax
];

/**
 * Fetches all municipalities and their total tax rates (Municipality + Region).
 * Returns a list of objects: { name: "Stockholm", taxRate: 29.82 }
 */
export const fetchMunicipalities = async () => {
    try {
        const limit = 200;
        let offset = 0;
        let allResults = [];
        let hasMore = true;

        while (hasMore) {
            const params = new URLSearchParams({
                _limit: limit.toString(),
                _offset: offset.toString(),
                'år': '2025'
            });
            const url = `${API_URL}?${params.toString()}`;
            console.log(`[taxService] Fetching: ${url}`);

            const response = await fetch(url);

            if (!response.ok) {
                console.error(`[taxService] API Error: ${response.status} at offset ${offset}`);
                break; // Stop fetching more, use what we have or fallback
            }

            const data = await response.json();
            const results = data.results || [];
            console.log(`[taxService] Got ${results.length} results at offset ${offset}`);
            allResults = [...allResults, ...results];

            if (results.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }
        }

        console.log(`[taxService] Total raw records: ${allResults.length}`);

        if (allResults.length === 0) {
            throw new Error("No tax data found in API");
        }

        const uniqueMap = new Map();

        allResults.forEach(row => {
            let name = row.kommun;
            if (name) {
                // Normalize name to Title Case (e.g., STOCKHOLM -> Stockholm)
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                // Handle special cases with hyphens or spaces if necessary
                name = name.replace(/[- ]\w/g, match => match.toUpperCase());

                if (!uniqueMap.has(name)) {
                    uniqueMap.set(name, {
                        name: name,
                        taxRate: parseFloat(row['summa, exkl. kyrkoavgift'])
                    });
                }
            }
        });

        const finalSorted = Array.from(uniqueMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'sv'));
        console.log(`[taxService] Unique municipalities normalized: ${finalSorted.length}`);
        console.log(`[taxService] First 5:`, finalSorted.slice(0, 5).map(m => m.name));
        return finalSorted;

    } catch (error) {
        console.warn("Using fallback municipality data due to API error:", error);
        return FALLBACK_MUNICIPALITIES.map(m => ({
            name: m.kommun,
            taxRate: m.skattesats
        })).sort((a, b) => a.name.localeCompare(b.name));
    }
};

export const getFallbackTaxRate = () => 32.00; // National average approx
