/**
 * Parses the raw text from 'Mina Sidor' to extract benefit days.
 * @param {string} rawText - The raw text pasted by the user.
 * @returns {object} - The extracted state (sDays, lDays, reservedDays).
 */
export const parseMinaSidorText = (rawText) => {
    if (!rawText || typeof rawText !== 'string') {
        return { sDays: 0, lDays: 0, reservedDays: 0 };
    }

    // Regex Specification
    // Use \D* to match non-digits between label and value
    const sLevelRegex = /(?:sjukpenningnivå|S-nivå)\D*(\d+)/i;
    const lLevelRegex = /(?:lägstanivå|L-nivå)\D*(\d+)/i;
    const reservedRegex = /(?:reserverade|locked)\D*(\d+)/i;

    const sMatch = rawText.match(sLevelRegex);
    const lMatch = rawText.match(lLevelRegex);
    const rMatch = rawText.match(reservedRegex);

    const result = {
        sDays: sMatch ? parseInt(sMatch[1], 10) : 0,
        lDays: lMatch ? parseInt(lMatch[1], 10) : 0,
        reservedDays: rMatch ? parseInt(rMatch[1], 10) : 0,
    };

    // Sanitization: We return the integers and the caller should immediately nullify rawText.
    return result;
};
