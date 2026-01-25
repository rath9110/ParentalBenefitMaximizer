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

import { useLanguage } from '../../../context/LanguageContext';

const MjukstartenGuide2026 = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="Soft Start 2026: Plan Sustainable Parental Leave"
                    description="Learn how to combine career and parenthood with the Soft Start. Optimize income, protect SGI, and keep pension contributions."
                    canonical="https://foraldraledighet.se/mjukstarten-guide"
                    schema={faqSchema}
                />

                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>

                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            The Soft Start: How to Plan a Sustainable Parental Leave 2026
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Balancing a career as a specialist or leader with life as a new parent requires a strategy.
                        </p>
                    </header>

                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Balancing a career as a specialist or leader with life as a parent requires precision. "The Soft Start" is a method where you combine work with parental benefit in fixed fractions to maintain momentum in your career and protect your finances.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>What is "The Soft Start"?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            The strategy builds on partial leave. Instead of total absence, you work part-time and fill up the remaining time with parental benefit. Försäkringskassan allows withdrawal in fixed steps: 1/8 (12.5%), 1/4 (25%), 1/2 (50%) or 3/4 (75%) of a day.
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Why Choose This Strategy?</h3>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Career Continuity:</strong> You keep responsibility for your strategic projects and don't miss important decisions or salary reviews.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>SGI Protection:</strong> By ensuring the sum of work and parental benefit becomes 100% (e.g. 75% work + 25% parental benefit), your SGI is fully protected even after the child's 1st birthday.</li>
                            <li><strong>Pension Contributions:</strong> Parental leave with compensation often activates "premium waiver" via the collective agreement, meaning your occupational pension continues to be paid in even though you work less.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>The Legal Framework 2026</h2>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Right to Partial Leave:</strong> You have a statutory right to reduce your work time by up to 25% (down to 75% occupation) until the child turns 8 or finishes year 1.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Three-Period Rule:</strong> You are entitled to three leave periods per calendar year. A fixed part-time schedule running over several months counts legally as a single period, saving your occasions for e.g. Christmas or summer leave.</li>
                            <li><strong>Notification:</strong> Application must be submitted to the employer at least two months in advance.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Economic Calculation: Withdrawal Rates</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            To calculate your daily compensation 2026 (at max SGI 592,000 SEK):
                        </p>
                        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1.5rem', textAlign: 'center' }}>
                            Daily Benefit = (592,000 × 0.80) / 365 ≈ 1,259 SEK/day
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            (Note: Factor 0.97 is not used for parental benefit, only sick pay).
                        </p>

                        <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Extent Requirements</h3>
                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                                <thead>
                                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                        <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Extent</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Leave Time (40h/w)</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Requirement for SGI Protection</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/8 day</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>5 hours / week</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Requires 87.5% work.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/4 day</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>10 hours / week</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Requires 75% work.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/2 day</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>20 hours / week</td>
                                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Requires 50% work.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategic Pitch to Your Boss</h2>
                        <p style={{ marginBottom: '1rem' }}>Focus on the business benefit:</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Resource Planning:</strong> A fixed schedule (e.g. off every Wednesday) minimizes uncertainty in the team.</li>
                            <li><strong>Cost Control:</strong> The employer saves salary costs while retaining your expertise, which is often more efficient than hiring an external consultant.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sources and Legislation</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Parental Leave Act (1995:584):</strong> §7 (Right to reduced working hours) and §10 (Division of leave).</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Social Insurance Code (2010:110):</strong> 26 ch. 13-18 §§ regarding SGI protection.</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Collective Agreement Info (ITP):</strong> Rules on premium waiver insurance during parental leave.</li>
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
                    <p>Source: Försäkringskassan & Parental Leave Act</p>
                </footer>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
            <SEO
                title="Mjukstarten 2026: Planera en hållbar föräldraledighet"
                description="Lär dig hur du kombinerar karriär och föräldraskap med Mjukstarten. Optimera inkomst, skydda SGI och behåll pensionsinbetalningar."
                canonical="https://foraldraledighet.se/mjukstarten-guide"
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
                        Att balansera en karriär som specialist eller ledare med livet som förälder kräver precision. "Mjukstarten" är en metod där man kombinerar arbete med föräldrapenning i fasta fraktioner för att behålla momentum i karriären och skydda sin ekonomi.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vad är "Mjukstarten"?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Strategin bygger på delledighet. Istället för en total frånvaro arbetar man deltid och fyller upp resterande tid med föräldrapenning. Försäkringskassan tillåter uttag i fasta steg: 1/8 (12,5 %), 1/4 (25 %), 1/2 (50 %) eller 3/4 (75 %) av en dag.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Varför välja denna strategi?</h3>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Karriärkontinuitet:</strong> Du behåller ansvaret för dina strategiska projekt och missar inte viktiga beslut eller lönerevisioner.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>SGI-skydd:</strong> Genom att se till att summan av arbete och föräldrapenning blir 100 % (t.ex. 75 % arbete + 25 % föräldrapenning) är din SGI helt skyddad även efter barnets 1-årsdag.</li>
                        <li><strong>Pensionsavsättningar:</strong> Vid föräldraledighet med ersättning aktiveras ofta "premiebefrielse" via kollektivavtalet, vilket innebär att din tjänstepension fortsätter att betalas in trots att du arbetar mindre.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>De juridiska ramarna 2026</h2>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Rätten till delledighet:</strong> Du har lagstadgad rätt att förkorta din arbetstid med upp till 25 % (ner till 75 % sysselsättning) tills barnet fyller 8 år eller avslutar årskurs 1.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Tre-periods-regeln:</strong> Du har rätt till tre ledighetsperioder per kalenderår. En fastställd deltid som löper över flera månader räknas juridiskt som en enda period, vilket sparar dina tillfällen för t.ex. jul- eller sommarledighet.</li>
                        <li><strong>Anmälan:</strong> Ansökan ska lämnas till arbetsgivaren senast två månader i förväg.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomisk kalkyl: Uttagsgrader</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        För att beräkna din dagsersättning 2026 (vid max SGI 592 000 kr):
                    </p>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Dagsersättning = (592 000 × 0,80) / 365 ≈ 1 259 kr/dag
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                        (Notera: Faktor 0.97 används inte för föräldrapenning, endast sjukpenning).
                    </p>

                    <h3 style={{ fontSize: '1.4rem', color: '#444', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Omfattningskrav</h3>
                    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Omfattning</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Ledig tid (40h/v)</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Krav för SGI-skydd</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/8 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>5 timmar / vecka</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Kräver 87,5 % arbete.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/4 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>10 timmar / vecka</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Kräver 75 % arbete.</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>1/2 dag</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>20 timmar / vecka</td>
                                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Kräver 50 % arbete.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategiskt införsäljning till din chef</h2>
                    <p style={{ marginBottom: '1rem' }}>Fokusera på verksamhetsnyttan:</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Resursplanering:</strong> Ett fast schema (t.ex. ledig varje onsdag) minimerar osäkerhet i teamet.</li>
                        <li><strong>Kostnadskontroll:</strong> Arbetsgivaren sparar lönekostnader samtidigt som de behåller din expertis, vilket ofta är mer effektivt än att hyra in en extern konsult.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Föräldraledighetslagen (1995:584):</strong> §7 (Rätt till förkortning av arbetstid) och §10 (Uppdelning av ledighet). Källa: Riksdagen.se</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Socialförsäkringsbalken (2010:110):</strong> 26 kap. 13-18 §§ om SGI-skydd.</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Kollektivavtalsinformation (ITP):</strong> Regler om premiebefrielseförsäkring vid föräldraledighet. Källa: Avtalat.se</li>
                        <li>• <strong>Försäkringskassan 2026:</strong> Aktuella uttagsgrader och SGI-tak. Källa: Försäkringskassan.se</li>
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
                <p>Källa: Försäkringskassan & Föräldraledighetslagen</p>
            </footer>
        </div>
    );
};

export default MjukstartenGuide2026;
