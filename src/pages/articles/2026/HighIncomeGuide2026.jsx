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

const HighIncomeGuide2026 = ({ onBack }) => {
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
                    <p style={{ marginBottom: '1.5rem' }}>
                        För dig som tjänar över brytpunkten för statlig skatt är föräldraledigheten inte bara en fråga om tid med barnet, utan ett komplext pussel av skatteplanering och avtalsförmåner. Under 2026, med ett prisbasbelopp på <strong>59 200 kr</strong>, blir marginalerna extra viktiga att bevaka för att undvika onödiga inkomsttapp.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Taket vs. Din verkliga lön</h2>
                    <p style={{ marginBottom: '1rem' }}>Det är en vanlig missuppfattning att alla får 80 % av sin lön från Försäkringskassan. För höginkomsttagare slår taket i snabbt.</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>SGI-taket 2026:</strong> Taket för föräldrapenning ligger på 10 prisbasbelopp, vilket motsvarar en årsinkomst på 592 000 kr (ca 49 333 kr/mån).</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Inkomsten över taket:</strong> Allt du tjänar över 49 333 kr/mån ger 0 kr i extra ersättning från staten.</li>
                        <li><strong>Dagsersättning:</strong> Vid max-SGI får du ut ca 1 259 kr/dag före skatt.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Statlig skatt och brytpunkten 2026</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Som höginkomsttagare är brytpunkten för statlig inkomstskatt din viktigaste siffra. Under 2026 har regeringen justerat upp denna gräns.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Brytpunkt 2026:</strong> Du börjar betala 20 % statlig inkomstskatt på inkomster över 660 400 kr per år (ca 55 033 kr/mån).</li>
                        <li><strong>Marginalskatten:</strong> Över denna nivå kan din totala marginalskatt (kommunal + statlig) landa på omkring 52–53 % beroende på din hemkommun.</li>
                    </ul>
                    <p style={{ background: '#fff3e0', padding: '1rem', borderLeft: '4px solid #ff9800', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                        <strong>Strategiskt tips:</strong> Om du tar ut 7 dagar i veckan som höginkomsttagare riskerar du att pressa upp din beskattningsbara inkomst över brytpunkten, vilket gör att staten tar en större del av din föräldrapenning.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Föräldralön: Din viktigaste förmån</h2>
                    <p style={{ marginBottom: '1rem' }}>Eftersom staten inte ersätter inkomster över taket, är föräldralön (via ditt kollektivavtal eller anställningsavtal) avgörande.</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Utfyllnad till 90 %:</strong> De flesta stora kollektivavtal fyller upp din inkomst så att du landar på ca 90 % av din faktiska lön, även på den del som ligger över Försäkringskassans tak.</li>
                        <li><strong>Tidsbegränsning:</strong> Denna förmån är ofta begränsad till 180 eller 360 dagar. Din strategi bör vara att maximera uttagen under just denna period.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi: "Net Match" vid deltidsarbete</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Att jobba 80 % och ta 1 dags föräldrapenning kan för en höginkomsttagare resultera i nästan 100 % nettoinkomst. Detta beror på:
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Lägre skattetryck:</strong> Genom att sänka din bruttolön något kan du hamna under brytpunkten för statlig skatt.</li>
                        <li><strong>Jobbskatteavdraget:</strong> Det förstärkta jobbskatteavdraget 2026 gynnar de som faktiskt arbetar, vilket gör kombinationen arbete/ledighet ekonomiskt effektiv.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '1rem' }}>Jämförelse: Brutto vs. Netto (Exempel vid lön 65 000 kr/mån)</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '1rem' }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Scenario</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Bruttoinkomst (mån)</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Est. Netto</th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Kommentar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.75rem' }}>Arbeta 100 %</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>65 000 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~46 000 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Hög statlig skatt på toppen.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.75rem' }}>Helt ledig (FP + 10 % föräldralön)</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~43 500 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>~32 500 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>SGI-taket begränsar ersättningen.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Arbeta 80 % + 1 dag FP</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>~58 500 kr</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: 'green' }}>~43 500 kr</td>
                                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#666' }}>Optimerat skattetryck; nära full lön.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                        Denna guide baseras på Socialförsäkringsbalken (2010:110) och de av regeringen fastställda skiktgränserna för inkomståret 2026. Föräldralön styrs av de enskilda kollektivavtalen (t.ex. ITP, Teknikavtalet).
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
                <p>Källa: Skatteverket & Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default HighIncomeGuide2026;
