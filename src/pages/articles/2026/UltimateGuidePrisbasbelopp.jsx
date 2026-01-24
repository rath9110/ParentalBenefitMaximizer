import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Vad är prisbasbeloppet 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Prisbasbeloppet för 2026 är 59 200 kr. Det används för att beräkna taket i föräldraförsäkringen och andra sociala ersättningar."
            }
        },
        {
            "@type": "Question",
            "name": "Hur mycket är max föräldrapenning 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Den högsta sjukpenninggrundande inkomsten (SGI) för föräldrapenning är 592 000 kr (10 prisbasbelopp). Det ger en maxersättning på cirka 1 259 kr per dag före skatt."
            }
        },
        {
            "@type": "Question",
            "name": "Hur många dagar kan jag överlåta till en morförälder?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Föräldrar med gemensam vårdnad kan överlåta upp till 45 dagar var (totalt 90 dagar) till en annan nära vuxen, till exempel en morförälder."
            }
        },
        {
            "@type": "Question",
            "name": "Vad händer med föräldradagarna vid 4-årsdagen?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "När barnet fyller 4 år får föräldrarna tillsammans spara högst 96 dagar. Resterande dagar som inte tagits ut försvinner."
            }
        }
    ]
};

const UltimateGuidePrisbasbelopp = ({ onBack }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Föräldrapenning 2026: Prisbasbelopp & Ersättningsnivåer (Guide)"
                description="Aktuella belopp för 2026! Prisbasbeloppet är 59 200 kr. Se hur det påverkar din maxersättning, SGI-taket och lägstanivådagarna."
                canonical="https://foraldraledighet.se/articles/2026/guide"
                schema={faqSchema}
            />

            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        Den ultimata guiden till föräldrapenning 2026
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Allt du behöver veta om ersättningsnivåer, SGI-tak och överlåtelse av dagar för det kommande året.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Välkommen till 2026. Det här året är prisbasbeloppet fastställt till <strong>59 200 kr</strong>, vilket direkt påverkar hur mycket pengar du får i plånboken när du är hemma med barn. Att navigera i föräldraförsäkringen handlar om mer än att bara "vara ledig" – det är en strategisk planering för att skydda din SGI, maximera din pension och få ut så många dagar som möjligt tillsammans med familjen.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Grunderna: Dina 480 dagar</h2>
                    <p style={{ marginBottom: '1rem' }}>Varje barn i Sverige har 480 dagar med föräldrapenning knutna till sig. Dagarna är uppdelade i två nivåer:</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>390 dagar slut på sjukpenningnivå:</strong> Ersättningen baseras på din inkomst (SGI).</li>
                        <li><strong>90 dagar på lägstanivå:</strong> Ersättningen är fast och ligger 2026 på 180 kr per dag.</li>
                    </ul>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Föräldrar med gemensam vårdnad får 240 dagar var, där 90 dagar på sjukpenningnivå är reserverade och inte kan överlåtas till den andra föräldern.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomin: Så mycket får du 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Din ersättning styrs av din sjukpenninggrundande inkomst (SGI). För att beräkna din dagsersättning används prisbasbeloppet som ankare för taket i försäkringen.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Taket för föräldrapenning</h3>
                    <p style={{ marginBottom: '1rem' }}>Det högsta beloppet du kan få baseras på 10 prisbasbelopp. För 2026 innebär det:</p>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                        Högsta SGI för föräldrapenning = 10 × 59 200 = 592 000 kr
                    </div>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Om du tjänar mer än <strong>49 333 kr</strong> i månaden, får du alltså ingen extra ersättning från Försäkringskassan. För VAB (tillfällig föräldrapenning) är taket lägre och ligger på 7,5 prisbasbelopp (444 000 kr/år).
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Formeln för dagsersättning</h3>
                    <p style={{ marginBottom: '1rem' }}>För att räkna ut din ersättning per dag på sjukpenningnivå används följande formel:</p>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                        Dagsersättning = (SGI × 0,97 × 0,80) / 365
                    </div>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Vid maxinkomst 2026 blir den högsta dagsersättningen cirka <strong>1 259 kr</strong> före skatt.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>SGI-skydd: De kritiska milstolparna</h2>
                    <p style={{ marginBottom: '1.5rem' }}>Det vanligaste felet föräldrar gör är att missa kraven för att skydda sin SGI.</p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Barnets första år (0–12 månader)</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Under barnets första år är din SGI helt skyddad, oavsett om du tar ut föräldrapenning eller inte. Du kan alltså "snåla" på dagarna för att förlänga ledigheten utan att riskera din framtida ersättning vid sjukdom eller VAB.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Efter 1-årsdagen: 5-dagarsregeln</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Dagen ditt barn fyller 1 år förändras allt. För att behålla din SGI på samma nivå som innan måste du nu ha "full sysselsättning" fem dagar i veckan. Det innebär en kombination av:
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li>Arbete</li>
                        <li>Föräldrapenning (minst 5 hela dagar per vecka för fullt skydd)</li>
                        <li>Studier eller arbetslöshet med ersättning</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>2026 års specialregler: Överlåtelse och dubbeldagar</h2>
                    <p style={{ marginBottom: '1rem' }}>Sedan de stora regeländringarna 2024 har systemet blivit mer flexibelt för att passa moderna familjer.</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Överlåtelse till nära anhöriga:</strong> Du kan nu överlåta upp till 45 dagar per förälder (totalt 90 dagar) till någon annan än barnets förälder, till exempel en mor- eller farförälder. Mottagaren måste vara försäkrad i Sverige och avstå från arbete eller pension för att få ersättningen.</li>
                        <li><strong>Fler dubbeldagar:</strong> Ni kan använda upp till 60 dubbeldagar tills barnet är 15 månader. Det innebär att båda föräldrarna är hemma samtidigt och tar varsin dag.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Milstolpar att hålla koll på</h2>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>4-årsdagen:</strong> Efter denna dag får ni bara spara totalt 96 dagar tillsammans. Planera för att ta ut överskjutande dagar i god tid.</li>
                        <li><strong>12-årsdagen:</strong> För barn födda 2014 eller senare upphör rätten till föräldrapenning helt när barnet fyller 12 år.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                        Denna guide bygger på gällande lagstiftning i Socialförsäkringsbalken (2010:110) och Försäkringskassans fastställda belopp för 2026. Prisbasbeloppet fastställs årligen av regeringen baserat på konsumentprisindex.
                    </p>
                </section>

                <div className="faq-section">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>Vanliga Frågor</h2>
                    {faqSchema.mainEntity.map((item, index) => (
                        <div key={index} style={{ marginBottom: '2.5rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem' }}>
                                {item.name}
                            </h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444' }}>
                                {item.acceptedAnswer.text}
                            </p>
                        </div>
                    ))}
                </div>
            </article>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#888', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                <p>Uppdaterad: 2026-01-24</p>
                <p>Källa: Försäkringskassan & SCB</p>
            </footer>
        </div>
    );
};

export default UltimateGuidePrisbasbelopp;
