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

import { useLanguage } from '../../../context/LanguageContext';

const SGIGuide2026 = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="Protect SGI 2026: The 5-day Rule & 1st Birthday"
                    description="Missing the 1-year mark can cost thousands. Everything about SGI protection, the 5-day rule, and how to avoid zeroing your income during parental leave 2026."
                    canonical="https://foraldraledighet.se/articles/2026/sgi-protection"
                    schema={faqSchema}
                />

                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>

                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            SGI Protection After Year 1: How to Avoid Zero Compensation
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            The guide to the 5-day rule, "gap warnings", and how to protect your income in 2026.
                        </p>
                    </header>

                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The child's first birthday is the most critical financial milestone in parental leave. During the first 12 months, your Sickness Benefit Qualifying Income (SGI) is fully "frozen" and protected, regardless of what you do. But on day 366, the automatic protection ends.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>What Happens on the 1st Birthday?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            To keep your SGI at the same level as before birth, you must have full occupation (5 days/week). If you fail to do this, your SGI is reset based on your actual current work time, which can dramatically lower your compensation for sick leave or VAB.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The 5-day Rule: Protecting Your Income</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Protecting 100% SGI requires filling every week with a total of 5 days of activity.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Fully on leave:</strong> Take at least 5 full days of parental benefit per week.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Working part-time:</strong> If you work 60% (3 days), you must take parental benefit for the remaining 40% (2 days).</li>
                            <li><strong>Combine S and L days:</strong> You don't have to burn expensive S-days. It's perfectly fine to use minimum level days (180 SEK) to fill up to 5 days a week.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategic Tips for 2026</h2>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Minimum Level on Weekends</h3>
                        <p style={{ marginBottom: '1rem' }}>
                            You can take minimum level days (L-days) on Saturdays and Sundays without taking any benefit on Friday or Monday. This is a cheap way to reach 5 days a week if you work part-time on weekdays.
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Studies and SGI</h3>
                        <p style={{ marginBottom: '1rem' }}>
                            Studies with student aid (CSN) are SGI-protecting. Remember that protection only applies during the semester. Breaks between semesters must often be covered by parental benefit if not covered by CSN.
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Job Seekers</h3>
                        <p style={{ marginBottom: '1rem' }}>
                            If employment ends, you must register with the Public Employment Service (Arbetsförmedlingen) no later than the first weekday after the child's 1st birthday (or after the last day of employment if later).
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The Risk of Lowered SGI</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Missing the protection lowers the SGI to match current actual income.
                        </p>
                        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <p style={{ margin: 0 }}>
                                <strong>Example:</strong> A person earning 50,000 SEK/month (full SGI) who chooses to work 50% without taking parental benefit after year 1 gets their SGI lowered to 25,000 SEK. This means compensation for VAB or own sickness is halved immediately.
                            </p>
                        </div>

                        <div style={{ background: '#fce4ec', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #e91e63', marginBottom: '2rem' }}>
                            <h3 style={{ marginTop: 0, color: '#880e4f', fontSize: '1.2rem' }}>Pro Tip</h3>
                            <p style={{ margin: 0 }}>
                                Did you know that according to the Parental Leave Act, you have the right to reduce your work time by up to 25% until the child turns 8, regardless of remaining days? However, protecting SGI during that time requires taking days. Want to know how to maximize leave by combining the law with benefits?
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sources and Legislation</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Social Insurance Code (2010:110):</strong> 26 ch. 13-18 §§ regarding SGI protection.</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Försäkringskassan Guidance 2002:1:</strong> SGI Qualifying Income. Source: Försäkringskassan</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Supreme Administrative Court:</strong> Case law regarding "uninterrupted" occupation requirement.</li>
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
                    <p>Source: Försäkringskassan</p>
                </footer>
            </div>
        );
    }

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
                        Att barnet fyller ett år är den viktigaste ekonomiska milstolpen i föräldraledigheten. Under barnets första 12 månader är din sjukpenninggrundande inkomst (SGI) helt "fryst" och skyddad, oavsett vad du gör. Men på 366-dagarsdagen upphör automatiken.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vad händer på 1-årsdagen?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För att behålla din SGI på samma nivå som innan barnet föddes måste du ha full sysselsättning (5 dagar/vecka). Om du inte gör detta fastställs din SGI istället på din faktiska arbetstid, vilket kan sänka din ersättning vid sjukdom eller VAB dramatiskt.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>5-dagarsregeln: Så skyddar du din inkomst</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För att skydda en 100-procentig SGI krävs att du fyller varje vecka med totalt 5 dagars aktivitet.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Helt ledig:</strong> Ta ut minst 5 hela dagar föräldrapenning per vecka.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Jobba deltid:</strong> Om man jobbar 60 % (3 dagar), måste man ta ut föräldrapenning för resterande 40 % (2 dagar).</li>
                        <li><strong>Kombinera S- och L-dagar:</strong> Du behöver inte bränna dina dyra S-dagar. Det går utmärkt att använda lägstanivådagar (180 kr) för att fylla upp till 5 dagar i veckan.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategiska tips för 2026</h2>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Lägstanivå på helgen</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Du kan ta ut lägstanivådagar (L-dagar) på lördagar och söndagar utan att ta ut någon ersättning på fredagen eller måndagen. Detta är ett billigt sätt att nå upp till 5 dagar i veckan om man jobbar deltid på vardagarna.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Studier och SGI</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Studier med studiestöd (CSN) är SGI-skyddande. Men kom ihåg att skyddet bara gäller under terminens gång. Lovdagar mellan terminer måste ofta täckas med föräldrapenning om de inte täcks av CSN.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Arbetssökande</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Om en anställning upphör måste man skriva in sig på Arbetsförmedlingen senast första vardagen efter barnets 1-årsdag (eller efter sista anställningsdagen om det sker senare).
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Risken med sänkt SGI</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Om man missar skyddet sänks SGI:n till att motsvara den aktuella inkomsten.
                    </p>
                    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <p style={{ margin: 0 }}>
                            <strong>Exempel:</strong> En person som tjänar 50 000 kr/mån (full SGI) men väljer att jobba 50 % utan att ta ut föräldrapenning efter 1-årsdagen, får sin SGI sänkt till 25 000 kr. Det innebär att ersättningen för VAB eller egen sjukdom halveras direkt.
                        </p>
                    </div>

                    <div style={{ background: '#fce4ec', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #e91e63', marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: 0, color: '#880e4f', fontSize: '1.2rem' }}>Proffstips</h3>
                        <p style={{ margin: 0 }}>
                            Visste du att man enligt föräldraledighetslagen har rätt att förkorta sin arbetstid med upp till 25 % tills barnet fyller 8 år, oavsett om man har dagar kvar eller inte? Däremot krävs det att man har dagar kvar att ta ut för att skydda sin SGI under den tiden. Vill du att jag förklarar hur man maximerar ledigheten genom att kombinera föräldraledighetslagen med föräldrapenningen?
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Socialförsäkringsbalken (2010:110):</strong> Särskilt 26 kap. 13-18 §§ om SGI-skydd och "tidsbegränsat avbrott i förvärvsarbete".</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Försäkringskassans vägledning 2002:1:</strong> Sjukpenninggrundande inkomst. Källa: Försäkringskassan - Vägledningar</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Högsta förvaltningsdomstolens praxis:</strong> Gällande kravet på "oavbruten" sysselsättning för att behålla SGI-skydd.</li>
                        <li>• <strong>Prisbasbelopp 2026 (59 200 kr):</strong> Regeringsbeslut september 2025. Källa: Regeringen.se</li>
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
                <p>Källa: Försäkringskassan</p>
            </footer>
        </div>
    );
};

export default SGIGuide2026;
