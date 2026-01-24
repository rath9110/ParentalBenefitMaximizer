import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "När måste jag börja ta ut 5 dagar i veckan för att skydda min SGI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Du måste börja ta ut föräldrapenning så att du har sysselsättning 5 dagar per vecka senast från och med barnets 1-årsdag."
            }
        },
        {
            "@type": "Question",
            "name": "Kan jag använda lägstanivådagar för att skydda min SGI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, du kan använda både dagar på sjukpenningnivå och lägstanivå för att uppfylla kravet på 5 dagars sysselsättning per vecka."
            }
        },
        {
            "@type": "Question",
            "name": "Vad händer om jag glömmer att ta ut dagar efter barnet fyllt 1 år?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Om du har ett glapp i din sysselsättning efter 1-årsdagen riskerar din SGI att sänkas eller nollas, vilket ger lägre ersättning vid sjukdom eller VAB."
            }
        },
        {
            "@type": "Question",
            "name": "Måste jag ta ut föräldrapenning på helgen för att skydda min SGI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Det beror på din totala sysselsättning. Om du inte jobbar och vill ha fullt SGI-skydd måste du ha totalt 5 dagar med ersättning per vecka, vilket kan inkludera helgdagar om det behövs för att nå upp till 5 dagar."
            }
        }
    ]
};

const SGIGuide2026 = ({ onBack }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Skydda SGI 2026: 5-dagarsregeln & 1-årsdagen"
                description="Missar du 1-årsdagen kan det kosta tusenlappar. Allt om SGI-skydd, 5-dagarsregeln och hur du undviker att nolla din inkomst under föräldraledigheten 2026."
                canonical="https://foraldraledighet.se/articles/2026/sgi-protection"
                schema={faqSchema}
            />

            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        SGI-skydd efter 1 år: Så undviker du att din ersättning nollas
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Guiden till 5-dagarsregeln, "glapp-varning" och hur du skyddar din inkomst 2026.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Att barnet fyller ett år är en milstolpe som firas med tårta, men för din ekonomi är det den mest kritiska dagen i hela föräldraledigheten. Under barnets första 12 månader är din sjukpenninggrundande inkomst (SGI) automatiskt skyddad, men på 1-årsdagen upphör detta skydd. Om du inte agerar rätt riskerar du att din SGI sänks till noll, vilket gör att du förlorar din ersättning vid sjukdom eller VAB.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vad händer på 1-årsdagen?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Från och med barnets första födelsedag måste du ha en så kallad full sysselsättning för att behålla din tidigare SGI. Det innebär att du måste fylla upp veckans alla fem arbetsdagar med antingen arbete, föräldrapenning eller en kombination av båda.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>5-dagarsregeln: Din försäkring mot inkomstbortfall</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För att skydda din SGI 2026 krävs att du har sysselsättning i samma omfattning som din SGI är beräknad på (oftast 100 %).
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Om du är helt ledig:</strong> Du måste ta ut minst 5 hela dagar med föräldrapenning per vecka.</li>
                        <li><strong>Om du jobbar deltid:</strong> Du måste ta ut föräldrapenning i samma omfattning som du har gått ner i arbetstid. Jobbar du till exempel 60 % (3 dagar), måste du ta ut 2 dagar föräldrapenning.</li>
                    </ul>

                    <div style={{ background: '#ffebee', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef5350', marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: 0, color: '#c62828', fontSize: '1.2rem' }}>⚠️ Glapp-varning</h3>
                        <p style={{ margin: 0 }}>
                            Det får inte finnas några avbrott (glapp) mellan din sysselsättning. Även en enda oskyddad dag kan leda till att din SGI räknas om baserat på din nuvarande, lägre inkomst.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategier för att skydda din SGI 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        I år är prisbasbeloppet <strong>59 200 kr</strong>, vilket gör att din SGI är värd mer än någonsin. Här är tre sätt att navigera 1-årsgränsen:
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. "SGI-gardet" (Kombinera S- och L-dagar)</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Du behöver inte bara använda dina värdefulla dagar på sjukpenningnivå för att skydda din inkomst. Du kan även använda lägstanivådagar (L-dagar) för att fylla upp till 5 dagar per vecka.
                    </p>
                    <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                        <strong>Tips:</strong> Spara L-dagarna till efter 1-årsdagen för att "köpa" dig SGI-skydd billigt när du börjar jobba deltid.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Helghacket och röda dagar</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        För att nå upp till 5 dagar i veckan måste du ibland ta ut ersättning även på helger eller röda dagar om du inte jobbar då.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        <strong>Regel 2026:</strong> För att få ersättning på en lördag eller söndag på sjukpenningnivå krävs att du tar ut ersättning i samma omfattning på den anslutande fredagen eller måndagen.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Arbetssökande och SGI</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Om du planerar att sluta ditt jobb i samband med föräldraledigheten måste du anmäla dig som arbetssökande på Arbetsförmedlingen senast på barnets 1-årsdag för att inte förlora ditt skydd.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Risken med att "nollas"</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Om du inte skyddar din SGI och arbetar mindre än tidigare, räknas din SGI om till din faktiska inkomst.
                    </p>
                    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <p style={{ margin: 0 }}>
                            <strong>Exempel:</strong> Du jobbade 100 % innan barnet kom. Efter 1-årsdagen jobbar du 50 % men tar inte ut någon föräldrapenning. Din nya SGI baseras då på din 50-procentiga lön. Om du då blir sjuk eller behöver vabba, får du bara hälften så mycket i ersättning som tidigare.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                        Dessa regler styrs av Socialförsäkringsbalken (2010:110), 26 kap. gällande sjukpenninggrundande inkomst och dess skyddstider. Försäkringskassans tillämpning av 5-dagarsregeln är praxis för att säkerställa att föräldrar inte står utanför försäkringssystemet.
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
                <p>Källa: Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default SGIGuide2026;
