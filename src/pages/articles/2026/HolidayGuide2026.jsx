import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Kan jag ta ut föräldrapenning under min semester?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nej, du kan inte få föräldrapenning för samma dagar som du tar ut betald semester. Du måste avbryta din föräldraledighet för att ha semester."
            }
        },
        {
            "@type": "Question",
            "name": "När måste jag senast anmäla föräldraledighet för sommaren 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Från 2026 kan arbetsgivare kräva att du anmäler ledighet för juni-augusti samtidigt som du lämnar in dina semesterönskemål, ofta i mars eller april."
            }
        },
        {
            "@type": "Question",
            "name": "Tjänar jag in semester när jag är föräldraledig?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, föräldraledighet är semesterlönegrundande under de första 120 dagarna (per barn och födsel), eller 180 dagar om du är ensamstående vårdnadshavare."
            }
        },
        {
            "@type": "Question",
            "name": "När är midsommar 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Midsommarafton infaller fredagen den 19 juni 2026. Midsommardagen är lördagen den 20 juni."
            }
        }
    ]
};

import { useLanguage } from '../../../context/LanguageContext';

const HolidayGuide2026 = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="Vacation & Parental Leave 2026: Maximize Summer"
                    description="Plan your summer 2026 smartly! The 'Sandwich Method', vacation days vs parental days, and rules for holiday pay-qualifying time. Maximize your leave with our guide."
                    canonical="https://foraldraledighet.se/articles/2026/holidays"
                    schema={faqSchema}
                />

                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>

                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            Vacation & Parental Leave: Maximize Your Summer 2026
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Learn the "Sandwich Method" and how to best combine vacation with parental days for a longer summer.
                        </p>
                    </header>

                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Summer 2026 offers a puzzle for those wanting to maximize family time. By combining the Vacation Act with parental insurance, you can achieve a significantly longer continuous leave than the standard four weeks.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategy 1: "The Sandwich Method" & The 3-Period Rule</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Alternating vacation with parental pay is a well-known way to save valuable vacation days.
                        </p>
                        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <p style={{ margin: 0 }}>
                                <strong>Example:</strong> 2 weeks vacation + 2 weeks PL + 2 weeks vacation.
                            </p>
                        </div>
                        <div style={{ background: '#ffebee', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef5350', marginBottom: '2rem' }}>
                            <h3 style={{ marginTop: 0, color: '#c62828', fontSize: '1.2rem' }}>⚠️ Warning</h3>
                            <p style={{ margin: 0 }}>
                                According to the Parental Leave Act, employees are entitled to a maximum of three periods per calendar year. A "period" starts every time you go on parental leave after working or having vacation. If you split your summer too much, your employer can deny parental leave later in the autumn or at Christmas.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategy 2: Use the Calendar 2026</h2>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Ascension Day (May 14):</strong> By taking one day of parental benefit on Friday, May 15, you create a 4-day weekend.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Midsummer:</strong> Midsummer Eve falls on Friday, June 19, 2026. Often a non-working day by collective agreement, making it a perfect starting point for a longer leave.</li>
                            <li><strong>National Day:</strong> June 6 is a Saturday in 2026. Many collective agreements give an extra day off (compensatory day) to be taken at another time – check your agreement!</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Economics: What Pays Best?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            For high earners, vacation days are almost always worth more financially than parental benefit, as the parental benefit is capped at ~1,259 SEK/day (at max SGI 2026).
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Vacation Pay Formula</h3>
                        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                            Daily Pay = (Monthly Salary / 21) + (Monthly Salary × Vacation Supplement)
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                            (Vacation supplement is often around 0.43–0.8% depending on agreement).
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Protect SGI During Summer</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            For children over 1 year, full occupation 5 days a week is required to protect SGI.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Combination:</strong> Paid vacation counts as occupation. If you have 20 vacation days (4 weeks) but are off for 6 weeks, the remaining 10 days must be covered by parental benefit (at least 5 days/week) to protect your income base.</li>
                            <li><strong>Vacation-qualifying PL:</strong> The first 120 days of parental leave (per birth) entitle you to earn new vacation days, just as if you were working.</li>
                        </ul>

                        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #43a047', marginBottom: '2rem' }}>
                            <h3 style={{ marginTop: 0, color: '#2e7d32', fontSize: '1.2rem' }}>Pro Tip</h3>
                            <p style={{ margin: 0 }}>
                                If you work at a company with a collective agreement, you can often get parental pay (top-up from employer). But watch out: many agreements require you to take parental benefit from Försäkringskassan in a continuous period for parental pay to be paid out. "Sandwiching" too much can in the worst case make you miss out on your parental pay.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sources and Legislation</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Parental Leave Act (1995:584):</strong> §10 on 3-period limit and §13 on notification time (2 months).</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Annual Leave Act (1977:480):</strong> §17 on vacation pay-qualifying absence (120/180-day rule).</li>
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
                    <p>Source: Vacation Act & Försäkringskassan</p>
                </footer>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Semester & Föräldrapenning 2026: Så maxar du sommaren"
                description="Planera sommaren 2026 smart! Sandwichen-metoden, semesterdagar vs föräldradagar och regler för semesterlönegrundande tid. Maximera din ledighet med vår guide."
                canonical="https://foraldraledighet.se/articles/2026/holidays"
                schema={faqSchema}
            />

            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        Semester & Föräldrapenning: Maximera din ledighet sommaren 2026
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Lär dig "sandwich-metoden" och hur du bäst kombinerar semester med föräldradagar för en längre sommar.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Sommaren 2026 bjuder på ett pussel för den som vill maximera sin tid med familjen. Genom att kombinera semesterlagen med föräldraförsäkringen går det att få en betydligt längre sammanhängande ledighet än de standardiserade fyra veckorna.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi 1: "Sandwich-metoden" och 3-periodsregeln</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Att varva semester med föräldrapenning är ett välkänt sätt att spara på värdefulla semesterdagar.
                    </p>
                    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <p style={{ margin: 0 }}>
                            <strong>Exempel:</strong> 2 veckor semester + 2 veckor FL + 2 veckor semester.
                        </p>
                    </div>
                    <div style={{ background: '#ffebee', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef5350', marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: 0, color: '#c62828', fontSize: '1.2rem' }}>⚠️ Varning</h3>
                        <p style={{ margin: 0 }}>
                            Enligt Föräldraledighetslagen har anställda rätt till max tre perioder per kalenderår. En "period" påbörjas varje gång man går på föräldraledighet efter att ha arbetat eller haft semester. Om man splittrar sin sommar för mycket kan arbetsgivaren neka föräldraledighet senare under hösten eller vid jul.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi 2: Nyttja kalendern 2026</h2>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Kristi Himmelsfärd (14 maj):</strong> Genom att ta en dag föräldrapenning fredagen den 15 maj skapas en 4-dagarshelg.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Midsommar:</strong> Midsommarafton infaller fredagen den 19 juni 2026. Det är ofta en arbetsfri dag enligt kollektivavtal, vilket gör det till en perfekt startpunkt för en längre ledighet.</li>
                        <li><strong>Nationaldagen:</strong> Den 6 juni är en lördag 2026. Många kollektivavtal ger då en extra ledig dag (ersättningsdag) som kan tas ut vid ett annat tillfälle under året – kolla ditt avtal!</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomi: Vad lönar sig bäst?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För höginkomsttagare är semesterdagar nästan alltid mer värda rent ekonomiskt än föräldrapenning, eftersom föräldrapenningen har ett tak på 1 259 kr/dag (vid max-SGI 2026).
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Formel för semesterdaglön (Sammalöneregeln)</h3>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
                        Dagersättning = (Månadslön / 21) + (Månadslön × Semestertilläggsvärde)
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                        (Semestertillägget är ofta runt 0,43–0,8 % beroende på avtal).
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Skydda SGI under sommaren</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För barn över 1 år krävs full sysselsättning 5 dagar i veckan för att skydda SGI.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Kombination:</strong> Betald semester räknas som sysselsättning. Om man har 20 dagars semester (4 veckor) men är ledig 6 veckor, måste de resterande 10 dagarna täckas av föräldrapenning (minst 5 dagar/vecka) för att skydda inkomstunderlaget.</li>
                        <li><strong>Semesterlönegrundande FL:</strong> De första 120 dagarna av föräldraledigheten (per födsel) ger rätt till intjänande av nya semesterdagar, precis som om man arbetat.</li>
                    </ul>

                    <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #43a047', marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: 0, color: '#2e7d32', fontSize: '1.2rem' }}>Proffstips</h3>
                        <p style={{ margin: 0 }}>
                            Om man jobbar på ett företag med kollektivavtal kan man ofta få föräldralön (utfyllnad från arbetsgivaren). Men se upp: många avtal kräver att man tar ut föräldrapenning från Försäkringskassan i en sammanhängande period för att föräldralönen ska betalas ut. Att "sandwicha" för mycket kan i värsta fall göra att man missar sin föräldralön.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Föräldraledighetslagen (1995:584):</strong> §10 om begränsning till tre perioder per år och §13 om anmälningstid (2 månader). Källa: Riksdagen.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Semesterlagen (1977:480):</strong> §17 om semesterlönegrundande frånvaro (120/180-dagarsregeln). Källa: Riksdagen.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Prisbasbelopp 2026:</strong> Fastställt till 59 200 kr. Källa: SCB</li>
                        <li>• <strong>Kalender 2026:</strong> Verifierad via Svenska Kalendern (Midsommar 19 juni, Nationaldagen lördag 6 juni).</li>
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
                <p>Källa: Semesterlagen & Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default HolidayGuide2026;
