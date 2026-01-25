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

import { useLanguage } from '../../../context/LanguageContext';

const UltimateGuidePrisbasbelopp = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="Parental Benefit 2026: Price Base Amount & Levels (Guide)"
                    description="Current amounts for 2026! The price base amount is 59,200 SEK. See how it affects your max benefit, SGI cap, and minimum level days."
                    canonical="https://foraldraledighet.se/articles/2026/guide"
                    schema={faqSchema}
                />
                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>
                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            The Ultimate Guide to Parental Benefit 2026
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Everything you need to know about compensation levels, SGI caps, and transferring days for the upcoming year.
                        </p>
                    </header>
                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Welcome to 2026. This year, the price base amount (PBB) is set to <strong>59,200 SEK</strong>, directly affecting the cap on your parental benefit. Navigating parental insurance is about strategic planning to protect your SGI, maximize future pension, and optimize family time.
                        </p>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The Basics: Your 480 Days</h2>
                        <p style={{ marginBottom: '1rem' }}>Every child in Sweden is entitled to 480 days of parental benefit. Divided as follows:</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>390 days at sickness benefit level:</strong> Compensation based on your income (SGI).</li>
                            <li><strong>90 days at minimum level:</strong> Fixed compensation, 180 SEK per day in 2026.</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', background: '#f9f9f9', padding: '1rem', borderLeft: '4px solid var(--color-primary)' }}>
                            <strong>Important Lock:</strong> You cannot use minimum level days until you have used 180 sickness benefit days for the child.
                        </p>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Economics: Your 2026 Payout</h2>
                        <p style={{ marginBottom: '1rem' }}>Your compensation is driven by your Sickness Benefit Qualifying Income (SGI).</p>
                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Caps & Max Amounts</h3>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Parental Benefit Cap (10 PBB):</strong> 10 × 59,200 = 592,000 SEK/year.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Max Daily Benefit:</strong> ~1,259 SEK/day before tax.</li>
                            <li><strong>VAB Cap (7.5 PBB):</strong> 7.5 × 59,200 = 444,000 SEK/year.</li>
                        </ul>
                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Daily Benefit Formula</h3>
                        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                            Daily Benefit = (SGI × 0.80) / 365
                        </div>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                            (Note: The previously used factor 0.97 is not used for parental benefit calculation).
                        </p>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>SGI Protection: Critical Milestones</h2>
                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Child's First Year (0–12 months)</h3>
                        <p style={{ marginBottom: '1rem' }}>Your SGI is fully protected regardless of withdrawals.</p>
                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>After the 1st Birthday</h3>
                        <p style={{ marginBottom: '1rem' }}>
                            You must have "full occupation" 5 days/week (work, parental benefit, or studies) to protect your pre-birth SGI level.
                        </p>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>2026 Special Rules & Reforms</h2>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Transfer to Relatives (incl. Pensioners):</strong> You can transfer 45 days per parent (90 total) to e.g., a grandparent. <br /><em>New:</em> Pensioners can receive these days and compensation without pausing their pension.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Double Days:</strong> You can use up to 60 double days until the child is 15 months old.</li>
                            <li><strong>Extended VAB (New 2026):</strong> From Jan 1, 2026, you can use VAB for meetings with school or social services if the child has a care need.</li>
                        </ul>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Milestones to Watch</h2>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>4th Birthday:</strong> After this day, you can only save 96 days in total.</li>
                            <li><strong>End Date:</strong> The right to parental benefit ends when the child turns 12 OR finishes year 5.</li>
                        </ul>
                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sources (January 2026)</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Price Base Amount 2026:</strong> Set by Govt to 59,200 SEK. Source: Regeringen.se</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Levels & Caps:</strong> Försäkringskassan official table 2026.</li>
                            <li>• <strong>Transfer Rules:</strong> Socialförsäkringsbalken (2010:110).</li>
                        </ul>
                    </section>
                    <div className="faq-section">
                        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>FAQ</h2>
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
                    <p>Updated: 2026-01-24</p>
                    <p>Source: Försäkringskassan & SCB</p>
                </footer>
            </div>
        );
    }

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
                        Välkommen till 2026. Det här året är prisbasbeloppet fastställt till <strong>59 200 kr</strong>, vilket direkt påverkar taket i din föräldrapenning. Att navigera i föräldraförsäkringen handlar om strategisk planering för att skydda din SGI, maximera din framtida pension och optimera familjens gemensamma tid.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Grunderna: Dina 480 dagar</h2>
                    <p style={{ marginBottom: '1rem' }}>Varje barn i Sverige har 480 dagar med föräldrapenning. Dagarna är uppdelade enligt följande:</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>390 dagar på sjukpenningnivå:</strong> Ersättningen baseras på din inkomst (SGI).</li>
                        <li><strong>90 dagar på lägstanivå:</strong> Ersättningen är fast och ligger 2026 på 180 kr per dag.</li>
                    </ul>
                    <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', background: '#f9f9f9', padding: '1rem', borderLeft: '4px solid var(--color-primary)' }}>
                        <strong>Viktig spärr:</strong> Du kan inte ta ut lägstanivådagar förrän ni tillsammans har tagit ut 180 dagar på sjukpenningnivå för barnet.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomin: Så mycket får du 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Din ersättning styrs av din sjukpenninggrundande inkomst (SGI).
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Tak och maxbelopp</h3>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Taket för föräldrapenning (10 PBB):</strong> 10 × 59 200 = 592 000 kr/år.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Maximal dagsersättning:</strong> 1 259 kr/dag före skatt.</li>
                        <li><strong>Taket för VAB (7,5 PBB):</strong> 7,5 × 59 200 = 444 000 kr/år.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Formeln för dagsersättning</h3>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                        Dagsersättning = (SGI × 0,80) / 365
                    </div>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                        (Notera: Den tidigare använda faktorn 0,97 används inte för beräkning av föräldrapenning utan var en historisk kvarleva från sjukpenningberäkningar).
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>SGI-skydd: De kritiska milstolparna</h2>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Barnets första år (0–12 månader)</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Din SGI är helt skyddad oavsett uttag.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Efter 1-årsdagen</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Du måste ha "full sysselsättning" 5 dagar/vecka (jobb, föräldrapenning eller studier) för att behålla din SGI på samma nivå som innan förlossningen.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>2026 års specialregler & reformer</h2>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Överlåtelse till närstående (inkl. pensionärer):</strong> Du kan överlåta 45 dagar per förälder (90 totalt) till t.ex. en morförälder. <br /><em>Nyhet:</em> En mor- eller farförälder som är pensionär kan ta emot dessa dagar och få ersättning samtidigt som de tar ut sin pension. De behöver inte "avstå" sin pension, bara avstå eventuellt arbete.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Dubbeldagar:</strong> Ni kan använda upp till 60 dubbeldagar tills barnet är 15 månader.</li>
                        <li><strong>Utökad VAB (Nytt för 2026):</strong> Från 1 januari 2026 kan du vabba för att delta i möten med skola, förskola eller socialtjänst om barnet har ett vårdbehov (t.ex. vid NPF eller skada).</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Milstolpar att hålla koll på</h2>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>4-årsdagen:</strong> Efter denna dag får ni bara spara totalt 96 dagar tillsammans.</li>
                        <li><strong>Slutdatum:</strong> Rätten till föräldrapenning upphör när barnet fyller 12 år ELLER när barnet slutar årskurs 5, beroende på vilket som inträffar sist.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källor (Januari 2026)</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Prisbasbelopp 2026:</strong> Fastställt av Regeringen (Socialdepartementet) till 59 200 kr den 18 september 2025. Källa: Regeringen.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Ersättningsnivåer & SGI-tak:</strong> Försäkringskassans officiella tabell för 2026. Källa: Försäkringskassan - Aktuella belopp</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Lagtext om överlåtelse:</strong> Socialförsäkringsbalken (2010:110) 12 kap. 17 a-b §§.</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Regler för pensionärer:</strong> Försäkringskassans vägledning (2002:1) samt uppdaterad praxis efter 2024-reformen.</li>
                        <li>• <strong>Nya VAB-regler 2026:</strong> Proposition 2025/26:1 (Budgetpropositionen) samt pressmeddelande från Socialdepartementet januari 2026. Källa: Försäkringskassan - Fler situationer för vab</li>
                    </ul>
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
