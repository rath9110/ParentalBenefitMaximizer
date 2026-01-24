import React from 'react';
import Button from '../../../components/Button';

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

const HolidayGuide2026 = ({ onBack }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
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
                        Sommaren 2026 erbjuder fantastiska möjligheter för dig som vill vara ledig länge utan att tömma ditt förråd av semesterdagar eller föräldradagar. Genom att strategiskt "sandwicha" din semester med föräldrapenning och utnyttja årets röda dagar kan du förlänga din ledighet med flera veckor.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>De nya reglerna 2026: Planera i tid</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Från och med 1 januari 2026 har arbetsgivare fått utökad rätt att kräva att föräldraledighet för perioden juni–augusti anmäls samtidigt som huvudsemestern planeras (ofta senast i mars/april). Detta görs för att underlätta bemanningen, så se till att ha din plan klar tidigt.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi 1: "Semester-Sandwichen"</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        En av de mest effektiva metoderna för en lång ledighet är att varva betald semester med föräldrapenning.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Hur det fungerar:</strong> Du tar t.ex. 2 veckor semester, följt av 2 veckor föräldraledighet, och sedan 2 veckor semester igen.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Fördelen:</strong> Du sparar på dina betalda semesterdagar men får ändå en sammanhängande ledighet på 6 veckor.</li>
                        <li><strong>Viktigt:</strong> Du kan inte ta ut föräldrapenning för samma dagar som du har semesterlön.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategi 2: Nyttja midsommar och klämdagar</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Midsommar 2026 infaller fredagen den <strong>19 juni</strong>. Midsommarafton är i praktiken en ledig dag för de flesta, vilket skapar ett perfekt tillfälle för en långledighet.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Nationaldagen:</strong> Den 6 juni infaller tyvärr på en lördag 2026, vilket innebär att vi missar en extra ledig vardag där.</li>
                        <li><strong>Kristi Himmelsfärd:</strong> Infaller torsdag 14 maj. Genom att ta föräldrapenning på fredagen den 15 maj (en klämdag) får du 4 dagar ledigt till priset av 1 dag.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomi: Semesterlön vs Föräldrapenning</h2>
                    <p style={{ marginBottom: '1rem' }}>När du planerar din sommar är det viktigt att räkna på nettoeffekten.</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Semesterlönetillägg:</strong> När du tar semester får du ofta din vanliga lön plus ett extra tillägg (ca 0,43–1,82 % av månadslönen per dag beroende på avtal).</li>
                        <li><strong>SGI-taket:</strong> Kom ihåg att föräldrapenningen är begränsad till 80 % av din inkomst upp till taket på 592 000 kr år 2026. För höginkomsttagare är semesterdagar därför betydligt mer värda i rena pengar än föräldradagar.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Formel för semesterlön (standard)</h3>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Semesterdagslön = Månadslön × 4,6% + Semestertillägg
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Skydda din SGI under sommaren</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Om ditt barn är över 1 år och du planerar att vara ledig mer än din betalda semester, måste du vara noggrann för att inte "nolla" din SGI.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Full sysselsättning:</strong> Om du t.ex. tar 4 veckors ledighet men bara har 2 veckors betald semester, måste du ta ut föräldrapenning för de övriga 2 veckorna (minst 5 dagar/vecka) för att behålla ditt SGI-skydd.</li>
                        <li><strong>Intjänande av semester:</strong> Du tjänar in betalda semesterdagar under de första 120 dagarna av din föräldraledighet (180 dagar om du är ensamstående).</li>
                    </ul>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                        Innehållet baseras på Semesterlagen (1977:480), Föräldraledighetslagen (1995:584) samt de nya bestämmelserna i Allmänna Bestämmelser (AB) som trädde i kraft 2026.
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

                {/* Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </article>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#888', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                <p>Uppdaterad: 2026-01-24</p>
                <p>Källa: Semesterlagen & Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default HolidayGuide2026;
