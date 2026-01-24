import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Vad är Mjukstarten?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mjukstarten bygger på principen om delledighet där du kombinerar arbete med föräldrapenning i fasta fraktioner (t.ex. 1/8, 1/4 eller 1/2 dag) för en mjuk övergång."
            }
        },
        {
            "@type": "Question",
            "name": "Hur påverkar Mjukstarten min SGI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Genom att säkerställa sysselsättning 5 dagar i veckan (arbete + föräldrapenning) skyddar du automatiskt din Sjukpenninggrundande inkomst (SGI) efter barnets 1-årsdag."
            }
        },
        {
            "@type": "Question",
            "name": "Hur många perioder av ledighet får jag ha?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enligt Föräldraledighetslagen får du dela upp din ledighet på max tre perioder per kalenderår. En sammanhängande deltid räknas dock som en enda period."
            }
        }
    ]
};

const MjukstartenGuide2026 = ({ onBack }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Mjukstarten 2026: Planera en hållbar föräldraledighet"
                description="Lär dig hur du kombinerar karriär och föräldraskap med Mjukstarten. Optimera inkomst, skydda SGI och behåll pensionsinbetalningar."
                canonical="https://foraldraledighet.se/articles/2026/mjukstarten"
                schema={faqSchema}
            />

            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        Mjukstarten: Så planerar du en hållbar föräldraledighet 2026
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Att balansera en karriär som specialist eller ledare med livet som nybliven förälder kräver en strategi.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        En av de mest framgångsrika metoderna för professionella i Sverige är <strong>"Mjukstarten"</strong>. Här går vi igenom hur du optimerar din ledighet för att behålla din inkomst, skydda din pension och samtidigt underlätta för ditt team och din chef.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vad är "Mjukstarten"?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Mjukstarten bygger på principen om <strong>delledighet</strong>. Istället för att vara helt borta från arbetsmarknaden under ett år, kombinerar du arbete med föräldrapenning i fasta fraktioner (t.ex. 1/8, 1/4 eller 1/2 dag). Detta skapar en mjuk övergång och bibehåller din relevans i verksamheten.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Varför välja denna strategi?</h3>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li><strong>Inkomstmatchning:</strong> Genom att kombinera deltidsarbete med föräldrapenning kan du nå nära 100 % av din vanliga nettolön.</li>
                        <li><strong>SGI-skydd:</strong> Efter barnets 1-årsdag är det kritiskt att ha sysselsättning 5 dagar i veckan för att skydda din Sjukpenninggrundande inkomst. Mjukstarten gör detta automatiskt.</li>
                        <li><strong>Karriärkontinuitet:</strong> Du tappar inte fart i viktiga projekt och är kvar i loopen för lönerevision och befordringar.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>De juridiska ramarna du behöver ha koll på</h2>
                    <p style={{ marginBottom: '1rem' }}>För att din plan ska bli framgångsrik måste den följa <strong>Föräldraledighetslagen</strong>. Här är de tre viktigaste reglerna för 2026:</p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Rätten till delledighet</h3>
                    <p style={{ marginBottom: '1rem' }}>Du har lagstadgad rätt att förkorta din arbetstid med upp till <strong>25 %</strong> (arbeta 75 %) fram till barnet fyller 8 år (eller avslutar första skolåret), även utan att ta ut föräldrapenning.</p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Tre-periods-regeln</h3>
                    <p style={{ marginBottom: '1rem' }}>Enligt 10 § i Föräldraledighetslagen får du dela upp din ledighet på max <strong>tre perioder per kalenderår</strong>.</p>
                    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                        <strong>Expert-tips:</strong> En sammanhängande period av deltid (t.ex. 80 % under hela hösten) räknas som <strong>en enda period</strong>. Det är detta som gör Mjukstarten så populär hos HR - den är administrativt enkel.
                    </div>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Anmäl i tid</h3>
                    <p style={{ marginBottom: '1rem' }}>Du måste informera din arbetsgivare minst <strong>två månader</strong> i förväg. Detta är inte bara en lag, det är god etik för att din chef ska kunna planera resurserna.</p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomisk optimering: Räkna på din Mjukstart</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För att förstå hur mycket föräldrapenning du behöver ta ut för att täcka inkomstbortfallet använder vi följande formel för dagsersättning på sjukpenningsnivå (S-dagar).
                        <br /><em style={{ fontSize: '0.9rem', color: '#666' }}>Kom ihåg att SGI för 2026 är takplacerad vid <strong>592 000 kr</strong>.</em>
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Vanliga uttagsgrader (Fraktioner)</h3>
                    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Omfattning</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Ledig tid (8h dag)</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Strategisk användning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/8 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>1 timme</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Perfekt för att skydda pensionen (Premiebefrielse).</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/4 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>2 timmar</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Standard för att gå från 100 % till 75 % arbete.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/2 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>4 timmar</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Idealisk för en jämn 50/50-delning mellan föräldrar.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Så säljer du in planen till din chef</h2>
                    <p style={{ marginBottom: '1rem' }}>En "vikarie-vänlig" plan är nyckeln till ett ja. När du presenterar Mjukstarten för din manager, fokusera på följande:</p>
                    <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Förutsägbarhet:</strong> Ett fast schema (t.ex. ledig varje fredag) är lättare att planera runt än fragmenterade strödagar.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Kostnadseffektivitet:</strong> Arbetsgivaren slipper ofta rekrytera en dyr extern vikarie om du är kvar på 75-80 %.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Överlämning:</strong> Du kan själv styra dina projekt och säkerställa en sömlös kunskapsöverföring.</li>
                    </ol>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sammanfattning för 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Mjukstarten är inte bara en förmån för dig som förälder, det är en hållbar affärsstrategi. Genom att använda Antigravitys algoritmer kan du räkna ut exakt vilken fraktion som maximerar din plånbok samtidigt som du behåller din professionella status.
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
                <p>Källa: Försäkringskassan & Föräldraledighetslagen</p>
            </footer>
        </div>
    );
};

export default MjukstartenGuide2026;
