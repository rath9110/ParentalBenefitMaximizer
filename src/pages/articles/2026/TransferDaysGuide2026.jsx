import React from 'react';
import Button from '../../../components/Button';
import SEO from '../../../components/SEO';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Hur många dagar kan jag ge till mormor 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Om ni har gemensam vårdnad kan ni överlåta totalt 90 dagar till mormor (45 dagar var). Om du har ensam vårdnad kan du överlåta 90 dagar själv."
            }
        },
        {
            "@type": "Question",
            "name": "Kan en pensionär få föräldrapenning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, pensionärer kan ta emot överlåtna dagar. De får då ersättning på grundnivå (250 kr/dag för S-dagar eller 180 kr/dag för L-dagar) under förutsättning att de avstår från sin pension den dagen."
            }
        },
        {
            "@type": "Question",
            "name": "Måste mormors arbetsgivare godkänna ledigheten?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, enligt föräldraledighetslagen har den som får dagar överlåtna till sig samma rätt till ledighet som en förälder, förutsatt att anmälan görs minst två månader i förväg."
            }
        },
        {
            "@type": "Question",
            "name": "Kan jag överlåta de reserverade 90 dagarna?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nej, de 90 dagar som är reserverade för varje förälder kan inte överlåtas till någon annan än barnets andra vårdnadshavare eller en sambo."
            }
        }
    ]
};

const TransferDaysGuide2026 = ({ onBack }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Överlåtelse av föräldradagar 2026: Guide för mor- och farföräldrar"
                description="Lär dig reglerna för att överlåta föräldrapenningdagar till anhöriga. Allt om ersättningsnivåer för pensionärer, arbetsgivarintyg och ansökan."
                schema={faqSchema}
                canonical="https://foraldraledighet.se/articles/2026/transfer-days"
            />
            <div style={{ marginBottom: '2rem' }}>
                <Button onClick={onBack} variant="secondary">← Tillbaka</Button>
            </div>

            <article>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        Överlåtelse av dagar: Så involverar du mor- och farföräldrar i planeringen
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Sedan lagändringen i juli 2024 har svenska föräldrar fått ett helt nytt verktyg för att få ihop livspusslet: möjligheten att överlåta föräldrapenningdagar till någon som inte är barnets vårdnadshavare. Under 2026 har vi sett hur detta blivit en hörnsten i moderna familjers strategier för att förlänga tiden hemma och underlätta återgången till arbete.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Hur många dagar kan man överlåta?</h2>
                    <p style={{ marginBottom: '1rem' }}>Reglerna är tydliga och baseras på din vårdnadsform:</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Gemensam vårdnad:</strong> Varje förälder kan överlåta upp till 45 dagar vardera till en annan person (totalt 90 dagar per barn).</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Ensam vårdnad:</strong> Du kan överlåta upp till 90 dagar till en eller flera utomstående personer.</li>
                        <li><strong>De reserverade dagarna:</strong> Kom ihåg att de 90 dagar som är reserverade för respektive förälder ("pappa/mamma-månaderna") aldrig kan överlåtas till någon annan än den andra föräldern eller en sambo.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vem kan ta emot dagarna?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Mottagaren kan vara en mor- eller farförälder, en annan släkting, en vän eller en granne. Det finns dock tre grundkrav för mottagaren:
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Personen måste vara försäkrad för föräldrapenning i Sverige.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Personen får inte arbeta, söka jobb eller studera under tiden de tar emot föräldrapenning.</li>
                        <li>Personen måste avstå från arbete eller pension för att ta hand om barnet.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomi: Vad får morfar i plånboken?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Detta är den vanligaste frågan. Ersättningen beräknas nämligen på mottagarens inkomstförhållanden, inte förälderns.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Om mottagaren arbetar (SGI-baserat)</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Om en morförälder fortfarande yrkesarbetar baseras ersättningen på hens egen sjukpenninggrundande inkomst (SGI). Taket för ersättningen är detsamma som för föräldrar, vilket 2026 innebär en maxersättning på ca 1 259 kr per dag före skatt.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Om mottagaren är pensionär (Garantinivå)</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        För pensionärer som inte längre har en SGI från arbete betalas ersättningen ut på grundnivå/garantinivå.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Sjukpenningnivå (S-dagar):</strong> Om du överlåter S-dagar får en person utan SGI 250 kr per dag (2026 års nivå).</li>
                        <li><strong>Lägstanivå (L-dagar):</strong> Om du överlåter L-dagar får mottagaren 180 kr per dag.</li>
                    </ul>

                    <div style={{ background: '#e8f4fc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', marginTop: '2rem', marginBottom: '2rem' }}>
                        <p style={{ fontStyle: 'italic', margin: 0 }}>
                            <strong>Strategiskt tips:</strong> Det är ofta mer lönsamt för hushållet att föräldern jobbar 100 % och morföräldern tar ut garantidagar, än att föräldern tar ut garantidagar själv, eftersom förälderns inkomstbortfall oftast är betydligt högre än morförälderns ersättning.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Rätt till ledighet från jobbet</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        En viktig detalj som många missar är att den som får dagar överlåtna till sig har lagstadgad rätt att vara ledig från sitt arbete.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Arbetstagaren (t.ex. en arbetande farmor) ska anmäla ledigheten till sin arbetsgivare minst två månader i förväg.</li>
                        <li>Ledigheten är semesterlönegrundande i upp till 120 dagar, precis som för biologiska föräldrar.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                        Dessa regler återfinns i Socialförsäkringsbalken (2010:110), 12 kap. gällande överlåtelse av rätt till föräldrapenning, samt i Föräldraledighetslagen (1995:584) gällande rätten till ledighet för den som tagit emot dagar.
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
                <p>Källa: Socialförsäkringsbalken & Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default TransferDaysGuide2026;
