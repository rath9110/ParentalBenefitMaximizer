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

import { useLanguage } from '../../../context/LanguageContext';

const TransferDaysGuide2026 = ({ onBack }) => {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
                <SEO
                    title="Transfer Parental Days 2026: Guide for Grandparents"
                    description="Learn the rules for transferring parental benefit days to relatives. All about compensation levels for pensioners, employer certificates, and application."
                    schema={faqSchema}
                    canonical="https://foraldraledighet.se/articles/2026/transfer-days"
                />
                <div style={{ marginBottom: '2rem' }}>
                    <Button onClick={onBack} variant="secondary">← Back</Button>
                </div>

                <article>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            Transfer Days: How to Involve Grandparents in Planning
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Since the law change in July 2024, Swedish parents have a brand new tool to solve the life puzzle: the ability to transfer parental benefit days to someone who is not the child's guardian. Under 2026, we have seen how this has become a cornerstone in modern family strategies to extend time at home and facilitate the return to work.
                        </p>
                    </header>

                    <section style={{ marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Since 2024, Swedish parents have the option to transfer parental benefit days to someone outside the nuclear family. For 2026, this is an established strategy to enable part-time work or give the child more time with, for example, a grandparent.
                        </p>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>How Many Days Can Be Transferred?</h2>
                        <p style={{ marginBottom: '1rem' }}>The rules are based on your custody arrangement:</p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Joint custody:</strong> Each parent can transfer 45 days each to an outside person (total 90 days per child).</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Sole custody:</strong> You can transfer up to 90 days to one or several people.</li>
                            <li><strong>Important:</strong> The 90 days reserved for you personally (S-days) can never be transferred to a grandparent or friend.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Who Can Receive the Days?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            The recipient can be anyone (grandfather, a neighbor, or a friend), as long as they are insured in Sweden.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Requirement:</strong> The recipient must care for the child instead of working, looking for a job, or studying.</li>
                            <li><strong>Pensioners:</strong> One of the biggest advantages is that pensioners can receive days and get compensation without needing to pause their pension. They thus get an extra income for the time they spend with their grandchild.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Economics: What Is the Compensation?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Compensation is based on the recipient's income conditions:
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Working recipient:</strong> Receives compensation based on their own SGI (max approx. 1,259 SEK/day 2026).</li>
                            <li><strong>Pensioner or person without SGI:</strong> Receives compensation at basic level for S-days (250 SEK/day) or minimum level (180 SEK/day).</li>
                        </ul>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Right to Leave from Work</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            According to the Parental Leave Act, the person receiving days has a statutory right to be on leave from their employment.
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Notification:</strong> The recipient must notify their employer of the leave at least two months in advance.</li>
                            <li><strong>Vacation:</strong> Unlike parents, leave for an outside recipient is not vacation pay qualifying. The recipient thus does not earn new paid vacation days during the leave.</li>
                        </ul>

                        <div style={{ background: '#e1f5fe', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #0288d1', marginBottom: '2rem' }}>
                            <h3 style={{ marginTop: 0, color: '#01579b', fontSize: '1.2rem' }}>Strategic Tip</h3>
                            <p style={{ margin: 0 }}>
                                If you earn above the threshold for state tax (approx. 56,300 SEK/month 2026), it can be tax advantageous to let a grandparent take days at basic level while you work, instead of you taking days that are taxed with your high marginal tax.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Sources and Legislation</h2>
                        <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Social Insurance Code (2010:110):</strong> 12 ch. 17 a–b §§ (Transfer of right to parental benefit).</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Parental Leave Act (1995:584):</strong> 3 § and 13 § (Right to leave for "other insured").</li>
                            <li style={{ marginBottom: '0.5rem' }}>• <strong>Annual Leave Act (1977:480):</strong> 17 § (Limitation of vacation pay-qualifying absence).</li>
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
                </article >

                <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#888', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <p>Updated: 2026-01-24</p>
                    <p>Source: Social Insurance Code & Försäkringskassan</p>
                </footer>
            </div >
        );
    }

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
                    <p style={{ marginBottom: '1.5rem' }}>
                        Sedan 2024 har svenska föräldrar möjligheten att överlåta föräldrapenningdagar till någon utanför kärnfamiljen. För 2026 är detta en etablerad strategi för att möjliggöra deltidsarbete eller ge barnet mer tid med t.ex. en morförälder.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Hur många dagar kan överlåtas?</h2>
                    <p style={{ marginBottom: '1rem' }}>Reglerna baseras på din vårdnadsform:</p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Gemensam vårdnad:</strong> Varje förälder kan överlåta 45 dagar vardera till en utomstående person (totalt 90 dagar per barn).</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Ensam vårdnad:</strong> Du kan överlåta upp till 90 dagar till en eller flera personer.</li>
                        <li><strong>Viktigt:</strong> De 90 dagar som är reserverade för dig personligen (S-dagar) kan aldrig överlåtas till en morförälder eller vän.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Vem kan ta emot dagarna?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Mottagaren kan vara vem som helst (morfar, en granne eller en vän), så länge de är försäkrade i Sverige.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Krav:</strong> Mottagaren måste vårda barnet istället för att arbeta, söka jobb eller studera.</li>
                        <li><strong>Pensionärer:</strong> En av de största fördelarna är att pensionärer kan ta emot dagar och få ersättning utan att behöva pausa sin pension. De får alltså en extra inkomst för tiden de spenderar med sitt barnbarn.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Ekonomi: Vad blir ersättningen?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Ersättningen baseras på mottagarens inkomstförhållanden:
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Arbetande mottagare:</strong> Får ersättning baserat på sin egen SGI (max ca 1 259 kr/dag 2026).</li>
                        <li><strong>Pensionär eller person utan SGI:</strong> Får ersättning på grundnivå för S-dagar (250 kr/dag) eller lägstanivå (180 kr/dag).</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem' }}>Rätt till ledighet från arbetet</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Enligt föräldraledighetslagen har den som får dagar överlåtna till sig en lagstadgad rätt att vara ledig från sin anställning.
                    </p>
                    <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Anmälan:</strong> Mottagaren ska anmäla ledigheten till sin arbetsgivare minst två månader i förväg.</li>
                        <li><strong>Semester:</strong> Till skillnad från föräldrar är ledigheten för en utomstående mottagare inte semesterlönegrundande. Mottagaren tjänar alltså inte in nya betalda semesterdagar under ledigheten.</li>
                    </ul>

                    <div style={{ background: '#e1f5fe', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #0288d1', marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: 0, color: '#01579b', fontSize: '1.2rem' }}>Strategiskt tips</h3>
                        <p style={{ margin: 0 }}>
                            Om du tjänar över brytpunkten för statlig skatt (ca 56 300 kr/mån 2026) kan det vara skattemässigt fördelaktigt att låta en morförälder ta ut dagar på grundnivå medan du arbetar, istället för att du själv tar ut dagar som beskattas med din höga marginalskatt.
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: '#666', marginTop: '3rem', marginBottom: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>Källhänvisningar och lagtext</h2>
                    <ul style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Socialförsäkringsbalken (2010:110):</strong> 12 kap. 17 a–b §§ (Överlåtelse av rätt till föräldrapenning).</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Föräldraledighetslagen (1995:584):</strong> 3 § och 13 § (Rätt till ledighet för "annan försäkrad").</li>
                        <li style={{ marginBottom: '0.5rem' }}>• <strong>Semesterlagen (1977:480):</strong> 17 § (Begränsning av semesterlönegrundande frånvaro).</li>
                        <li>• <strong>Försäkringskassans vägledning (2002:1):</strong> Uppdaterad sektion gällande mottagare av överlåtna dagar och samordning med pension. Källa: Försäkringskassan - Överlåta dagar</li>
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
            </article >

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#888', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                <p>Uppdaterad: 2026-01-24</p>
                <p>Källa: Socialförsäkringsbalken & Försäkringskassan</p>
            </footer>
        </div >
    );
};

export default TransferDaysGuide2026;
