import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Var går brytpunkten för statlig skatt 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Brytpunkten för statlig inkomstskatt 2026 är 660 400 kr per år, vilket motsvarar en månadslön på cirka 55 033 kr."
            }
        },
        {
            "@type": "Question",
            "name": "Hur påverkar föräldralön min inkomst över SGI-taket?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Föräldralön från din arbetsgivare fyller ofta upp glappet där Försäkringskassans ersättning slutar, så att du totalt kan få ut cirka 90 % av din lön även på belopp över taket."
            }
        },
        {
            "@type": "Question",
            "name": "Är det lönsamt att ta ut 7 dagar föräldrapenning som höginkomsttagare?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Det ger mest pengar brutto, men eftersom den statliga inkomstskatten slår till vid inkomster över 55 033 kr/mån, kan en stor del av ersättningen försvinna i skatt om du redan har en hög lön."
            }
        }
    ]
};

import { useLanguage } from '../../../context/LanguageContext';

const HighIncomeGuide2026 = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="High Earners & Parental Leave 2026: SGI Caps & Tax Planning"
                    description="Earning above the threshold? Learn how to maximize your parental benefit in 2026 with our strategies for high income earners. Guide to SGI caps, 10-base amounts, and net salary optimization."
                    canonical="https://foraldraledighet.se/articles/2026/high-income"
                    schema={faqSchema}
                />

                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>

                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            High Earner's Guide: Optimize Parental Pay & Taxes 2026
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Strategies to avoid income loss and maximize net compensation for those earning significantly above the threshold.
                        </p>
                    </header>

                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The Cap vs. Your Real Salary 2026</h2>
                        <p style={{ marginBottom: '1rem' }}>State compensation is capped, making your occupational pension and collective agreement your best friends.</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>SGI Cap 2026:</strong> 592,000 SEK/year (49,333 SEK/month).</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Max PB from Försäkringskassan:</strong> Approx. 38,300 SEK/month before tax (if taking 7 days/week).</li>
                            <li><strong>Income above the cap:</strong> Without parental pay from your employer, you get 0 SEK for every krona earned above 49,333 SEK.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The Threshold & State Tax 2026</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            For 2026, it is crucial to manage your annual income to avoid paying unnecessary state tax on your parental benefit.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Estimated threshold 2026:</strong> Approx. 676,000 SEK annual income (approx. 56,300 SEK/month) before 20% state tax kicks in.</li>
                        </ul>
                        <p style={{ background: '#e3f2fd', padding: '1rem', borderLeft: '4px solid #2196f3', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                            <strong>Strategy:</strong> If your annual salary incl. bonuses looks to land above 676,000 SEK, consider taking fewer PB days during 2026 and saving them for a year with lower total income.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Parental Pay: Your Main Leverage</h2>
                        <p style={{ marginBottom: '1rem' }}>Check your specific agreement (e.g., Teknikavtalet, ITP, or Finansavtalet).</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Top-up:</strong> Most qualified agreements give you 10% extra up to the SGI cap (reaching 90%) and 90% of salary on the part exceeding the cap.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Qualification period:</strong> Often requires 12 months of continuous employment to get max days (180 days is standard).</li>
                            <li><strong>Pension contribution:</strong> Ensure your employer pays "premium waiver insurance". This means they continue paying into your occupational pension as if you worked 100%.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategy: Smart Part-Time</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Working 80% and taking 0 PB days is often more profitable than taking 1 PB day, due to how the tax system is structured.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Work 80%:</strong> You get full job tax deduction on your salary.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>PB 1 day:</strong> You get no tax "discount" for this day.</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <strong>ROI Analysis:</strong> For a high earner with 70,000+ monthly salary, it is often better to be frugal with days to protect SGI and save days to extend vacations later, rather than burning them for a marginal net increase now.
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '1rem' }}>Comparison: Net Effect 2026 (Example salary 75,000 SEK/month)</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '1rem' }}>
                                <thead>
                                    <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Scenario</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Gross (PB+Salary)</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Est. Net</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '0.75rem' }}>Work 100%</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>75,000 SEK</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>~51,000 SEK</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Max state tax & max pension.</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '0.75rem' }}>On Leave (PB + Top-up)</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>~67,500 SEK</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>~46,000 SEK</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Assumes 90% top-up from employer.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Work 80% (No PB)</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>60,000 SEK</td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: 'green' }}>~43,500 SEK</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Lower tax, saves PB days for later.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Verification Sources (January 2026)</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>PBB 2026 (59,200 SEK):</strong> Established per regulation (2025:XXX) based on CPI. Source: SCB.se</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>State Tax Threshold 2026:</strong> Skatteverket tables for income year 2026. Threshold indexed by CPI + 2%. Source: Skatteverket.se</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Collective Agreements:</strong> Based on standard agreements for Unionen/Sveriges Ingenjörer regarding top-up and premium waiver. Source: Avtalat.se</li>
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
                    <p>Source: Skatteverket & Försäkringskassan</p>
                </footer>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Höginkomsttagare & Föräldraledighet 2026: SGI-tak & Skatteplanering"
                description="Tjänar du över brytpunkten? Lär dig maximera din föräldrapenning 2026 med våra strategier för höginkomsttagare. Guide till SGI-tak, 10-basbelopp och nettolöneoptimering."
                canonical="https://foraldraledighet.se/articles/2026/high-income"
                schema={faqSchema}
            />

            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        Höginkomsttagarens guide: Optimera din föräldralön och skatt 2026
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Strategier för att undvika inkomsttapp och maximera nettoersättningen för dig med lön över brytpunkten.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Taket vs. Din verkliga lön 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>Statens ersättning är begränsad, vilket gör din tjänstepension och ditt kollektivavtal till dina bästa vänner.</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>SGI-taket 2026:</strong> 592 000 kr/år (49 333 kr/mån).</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Max FP från Försäkringskassan:</strong> Cirka 38 300 kr/mån före skatt (om du tar 7 dagar/vecka).</li>
                        <li><strong>Inkomsten över taket:</strong> Utan föräldralön från din arbetsgivare får du 0 kr för varje krona du tjänar över 49 333 kr.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Brytpunkten och Statlig skatt 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För 2026 är det avgörande att styra din årsinkomst så att du inte betalar onödig statlig skatt på din föräldrapenning.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Uppskattad brytpunkt 2026:</strong> Cirka 676 000 kr i årsinkomst (ca 56 300 kr/mån) innan statlig skatt på 20 % tillkommer.</li>
                    </ul>
                    <p style={{ background: '#e3f2fd', padding: '1rem', borderLeft: '4px solid #2196f3', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                        <strong>Strategi:</strong> Om din årslön inkl. bonusar ser ut att landa över 676 000 kr, bör du överväga att ta ut färre FP-dagar under 2026 och istället spara dem till ett år med lägre totalinkomst.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Föräldralön: Din viktigaste hävstång</h2>
                    <p style={{ marginBottom: '1rem' }}>Kontrollera ditt specifika avtal (t.ex. Teknikavtalet, ITP eller Finansavtalet).</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Utfyllnaden:</strong> De flesta kvalificerade avtal ger dig 10 % extra upp till SGI-taket (så du når 90 %) och 90 % av lönen på den del som överstiger taket.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Kvalifikationstid:</strong> Ofta krävs 12 månaders sammanhängande anställning för att få max antal dagar (180 dagar är standard).</li>
                        <li><strong>Pensionsavsättning:</strong> Se till att din arbetsgivare betalar "premiebefrielseförsäkring". Det innebär att de fortsätter betala in till din tjänstepension som om du jobbade 100 %.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi: Den smarta deltiden</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Att jobba 80 % och ta 0 dagar FP är ofta mer lönsamt än att ta 1 dag FP, på grund av hur skattesystemet är uppbyggt.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Arbete 80 %:</strong> Du får fullt jobbskatteavdrag på din lön.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>FP 1 dag:</strong> Du får ingen "rabatt" på skatten för denna dag.</li>
                    </ul>
                    <p style={{ marginBottom: '1.5rem' }}>
                        <strong>ROI-analys:</strong> För en höginkomsttagare med 70 000+ i månadslön är det ofta bättre att "snåla" med dagarna för att skydda SGI och spara dagarna för att förlänga semestrar senare, snarare än att bränna dem för en marginell nettoökning nu.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '1rem' }}>Jämförelse: Nettoeffekt 2026 (Exempel lön 75 000 kr/mån)</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '1rem' }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Scenario</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Brutto (FP+Lön)</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Est. Netto</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Kommentar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.75rem' }}>Arbeta 100 %</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>75 000 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~51 000 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Max statlig skatt & max pension.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.75rem' }}>Ledig (FP + Föräldralön)</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~67 500 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~46 000 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Förutsätter 90 % utfyllnad från AG.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Arbeta 80 % (Ingen FP)</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>60 000 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: 'green' }}>~43 500 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Sänkt skatt, sparar FP-dagar till senare.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källor för verifiering (Januari 2026)</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>PBB 2026 (59 200 kr):</strong> Fastställt i enlighet med förordning (2025:XXX) baserat på KPI-utvecklingen. Källa: SCB.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Skiktgräns för statlig skatt 2026:</strong> Skatteverkets tabeller för inkomståret 2026. Skiktgränsen räknas upp med KPI + 2 procentenheter (om ej pausad). Källa: Skatteverket.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Socialförsäkringsbalken (2010:110):</strong> Särskilt 12 kap. gällande beräkningsgrunder för SGI.</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Kollektivavtalsvillkor:</strong> Baserat på standardavtal för Unionen/Sveriges Ingenjörer (Teknikavtalet) gällande föräldralön och premiebefrielse. Källa: Avtalat.se</li>
                        <li>• <strong>Jobbskatteavdraget 2026:</strong> Finansdepartementets budgetproposition 2025/26 gällande förstärkt jobbskatteavdrag för medel- och höginkomsttagare.</li>
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
                <p>Källa: Skatteverket & Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default HighIncomeGuide2026;
