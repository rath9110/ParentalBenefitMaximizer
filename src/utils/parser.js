/**
 * Parses the raw text from 'Mina Sidor' to extract benefit days.
 * @param {string} rawText - The raw text pasted by the user.
 * @returns {object} - The extracted state (sDays, lDays, reservedDays).
 */
export const parseMinaSidorText = (rawText) => {
    if (!rawText || typeof rawText !== 'string') {
        return { sDays: 0, lDays: 0, reservedDays: 0 };
    }

    // Helper: Extract valid days from a potential smashed string like "390195195"
    // Logic: Try to split string into A, B, C where A = B + C. Return C.
    const extractRemainingDays = (numStr) => {
        const clean = numStr.replace(/\D/g, ''); // just digits
        if (!clean) return 0;

        const val = parseInt(clean, 10);
        if (val < 500) return val; // Likely a normal single number (e.g. 195)

        // Heuristic: Try to find split A=B+C
        // Max length typically 9 (e.g. 480 240 240)
        const len = clean.length;

        // Iterate possible split points
        for (let i = 1; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                const strA = clean.substring(0, i);
                const strB = clean.substring(i, j);
                const strC = clean.substring(j);

                const A = parseInt(strA, 10);
                const B = parseInt(strB, 10);
                const C = parseInt(strC, 10);

                if (A === B + C) {
                    return C; // Found the "Remaining" part
                }
            }
        }
        return 0; // Fallback
    };

    // Regex: 
    // 1. Find Label
    // 2. Grab immediate following digits (possibly smashed)

    const sMatch = rawText.match(/(?:sjukpenningnivå|S-nivå)\D*(\d+)/i);
    const lMatch = rawText.match(/(?:lägstanivå|L-nivå)\D*(\d+)/i);
    const rMatch = rawText.match(/(?:reserverade|locked)[\D]*(\d+)/i);

    // For reserved, typically it's just "90" in the text like "Av dessa är 90 dagar reserverade"
    // So standard match usually works, but if it was in the table it might be smashed too. 
    // The user example had "Av dessa är 90 dagar..." which is standard.

    const result = {
        sDays: sMatch ? extractRemainingDays(sMatch[1]) : 0,
        lDays: lMatch ? extractRemainingDays(lMatch[1]) : 0,
        reservedDays: rMatch ? parseInt(rMatch[1], 10) : 0,
    };

    return result;
};
