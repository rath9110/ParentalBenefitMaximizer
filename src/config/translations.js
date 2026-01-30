export const translations = {
    en: {
        landing: {
            seo_title: "Föräldraledighet.se - Maximize your Parental Leave 2026",
            seo_desc: "Maximize your parental benefit in 2026. Strategic tools to optimize SGI, parental pay, and day transfers based on the 59,200 SEK price base amount. Plan smarter here.",
            title: "Optimize your Parental Leave",
            subtitle: "Calculate your plan for 2026. Enter your remaining days from Försäkringskassan below.",
            externalHelper: "Find your days on My Pages (Försäkringskassan)",

            sLevel: "S-Days (Income Level)",
            sLevelSecondary: "Based on your salary (390 days total).",

            lLevel: "L-Days (Min. Level)",
            lLevelSecondary: "180 SEK/day (90 days total).",

            daysLeft: "days left",

            reserved: "Locked Days",
            reservedSecondary: "90 days per parent (non-transferable).",
            reservedDesc: "Days locked to each parent.",

            doubleDays: "Double Days",
            doubleDaysSecondary: "Days you take together.",
            doubleDaysDesc: "Days overlapping.",

            daysCount: "days total",
            continue: "Start",
            placeholderS: "e.g. 195",
            placeholderL: "e.g. 45",
            placeholderReserved: "e.g. 90",
            placeholderDouble: "e.g. 10",
            tooltips: {
                sDays: "Sick Pay Level (S-days). Gives ~80% of your salary. You get 390 total shared days per child (born 2014+).",
                lDays: "Minimum Level (L-days). Gives 180 SEK/day regardless of income. You receive 90 total shared days.",
                reserved: "90 days are locked per parent and cannot be transferred. They must be used or forfeited.",
                double: "Double Days: Utilize up to 60 days to be off together. 1 simultaneous day = 2 days deducted (1 from each parent)."
            },
            strategiesTitle: "Become an expert on parenting days",
            strategiesIntro: "Use these strategies to navigate the rules and get the most time or money."
        },
        onboarding: {
            title: "Customize plan",
            childDob: "Child's Date of Birth",
            municipalityLabel: "Municipality (Tax)",
            searchMunicipality: "Search municipality...",
            parentAName: "Parent A Name",
            monthlyIncome: "Monthly Income (Before Tax)",
            parentBName: "Parent B Name",
            employerAgreements: "Employer Agreements",
            noAgreement: "No Agreement / Unsure",
            privateSector: "Private Sector (ITP1)",
            other: "Other",
            topUp: "Apply \"10% Top-up\" Calculation",
            back: "Back",
            next: "Next",
            selectStrategy: "Select a Strategy",
            generatePlan: "Generate Plan",
            skipStrategy: "Skip and go to planner",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "Maximize Leave",
                    description: "Goal: Stay home longest (100% leave). Save days year 1. From year 2 onwards, take contiguous 5-day weeks to maximize total duration."
                },
                STRAT_CASH_MAXER: {
                    title: "Maximize Payout",
                    description: "Goal: Most money now. Deplete days fast when salary is highest (incl. top-up) for max monthly amount."
                },
                STRAT_SGI_FORTRESS: {
                    title: "SGI Security",
                    description: "Goal: Protect SGI. Ensure you never fall into the \"SGI trap\" after year 1, keeping future sick pay and VAB high."
                },
                STRAT_HOLIDAY_SANDWICH: {
                    title: "Long Leave Hack",
                    description: "Goal: Holiday bonus. We puzzle public holidays and squeeze days to give you record-long continuous breaks."
                },
                STRAT_PENSION_PROTECT: {
                    title: "Pension Safe",
                    description: "Goal: Protect future. Work part-time without losing occupational pension. Take exactly 1/8 day to trigger employer payments."
                },
                STRAT_GRANDPARENT: {
                    title: "The Kinship Puzzle",
                    description: "Goal: Relief. Transfer 45 days per parent to a grandparent or friend for more daily flexibility."
                },
                STRAT_EQUALITY: {
                    title: "Share Equally",
                    description: "Goal: Fair 50/50. We split days equally and max out the 60 \"double days\" for as much shared time as possible."
                },
                STRAT_PART_TIME: {
                    title: "The Soft Start",
                    description: "Goal: Keep salary. Reduce work hours but keep 100% of regular wage by filling income gap exactly with parental benefit."
                }
            }
        },
        dashboard: {
            appName: "FöräldraOptimizer",
            reset: "Reset",
            sBank: "S-BANK",
            lBank: "L-BANK",
            painting: "Painting",
            daysFor: "-Days for",
            avgHouseholdNet: "Avg. Household Net",
            allocated: "Allocated",
            savePlan: "Print Plan",
            sharePlan: "Share",
            copied: "Copied!",
            partnerLimit: "Partner limit reached! {days} days reserved."
        },
        calendar: {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            locale: 'en-US'
        },
        articles: {
            ultimateGuide: {
                title: "The Ultimate Guide to Parental Benefits 2026",
                description: "Everything about income caps (PBB), compensation levels, and rules for 2026."
            },
            highIncome: {
                title: "High Income Earners & Tax Strategy",
                description: "Over the limit? How to optimize salary exchange and avoid the state tax trap."
            },
            holidays: {
                title: "Holidays & Leave: Maximizing 2026",
                description: "The \"Sandwich Method\" and how to combine vacation with parental leave."
            },
            sgiProtection: {
                title: "SGI Protection: After Year 1",
                description: "The 5-day rule explained. How to protect your income when the child turns one."
            },
            transferDays: {
                title: "Transfer Days: Involve the Relatives",
                description: "New rules 2026: Giving days to grandparents or friends."
            },
            mjukstarten: {
                title: "The Soft Start: For Leaders",
                description: "Combine career with parenting. Fraction strategies for 100% income."
            }
        }
    },
    sv: {
        landing: {
            seo_title: "Föräldraledighet.se - Optimera din föräldraledighet 2026",
            seo_desc: "Maxa din föräldrapenning 2026. Strategiska verktyg för att optimera SGI, föräldralön och överlåtelse av dagar baserat på prisbasbeloppet 59 200 kr. Planera smartare här.",
            title: "Optimera din föräldraledighet",
            subtitle: "Beräkna din plan för 2026. Ange dina kvarstående dagar från Försäkringskassan nedan.",
            externalHelper: "Hitta dina dagar på Mina Sidor (Försäkringskassan)",

            sLevel: "Sjukpenningnivå (S-dagar)",
            sLevelSecondary: "Ersättning baserad på din lön (390 dagar totalt).",

            lLevel: "Lägstanivå (L-dagar)",
            lLevelSecondary: "180 kr/dag (90 dagar totalt).",

            daysLeft: "dagar kvar",

            reserved: "Låsta dagar",
            reservedSecondary: "90 dagar per förälder (kan ej flyttas).",
            reservedDesc: "Dagar som inte kan flyttas.",

            doubleDays: "Dubbeldagar",
            doubleDaysSecondary: "Dagar ni tar ut samtidigt.",
            doubleDaysDesc: "Dagar tillsammans.",

            daysCount: "dagar totalt",
            continue: "Starta",
            placeholderS: "t.ex. 195",
            placeholderL: "t.ex. 45",
            placeholderReserved: "t.ex. 90",
            placeholderDouble: "t.ex. 10",
            tooltips: {
                sDays: "S-dagar: Ger ca 80% av din inkomst upp till taket. Dessa dagar är grunden i din föräldraledighet.",
                lDays: "L-dagar: En fast ersättning på 180 kr per dag. Används ofta för att dryga ut ledigheten när S-dagarna är slut.",
                reserved: "Dessa 90 dagar är personliga. Om du inte tar ut dem brinner de inne. De kan inte ge till andra föräldern.",
                double: "Dubbeldagar gör att ni kan vara lediga båda två med ersättning. Det dras dagar från båda föräldrarna samtidigt."
            },
            strategiesTitle: "Bli expert på föräldradagar",
            strategiesIntro: "Här är de beprövade metoderna vi använder för att navigera reglerna och få ut mest tid eller pengar."
        },
        onboarding: {
            title: "Anpassa plan",
            childDob: "Barnets födelsedatum",
            municipalityLabel: "Kommun (Skatt)",
            searchMunicipality: "Sök kommun...",
            parentAName: "Namn Förälder A",
            monthlyIncome: "Månadsinkomst (Före skatt)",
            parentBName: "Namn Förälder B",
            employerAgreements: "Kollektivavtal",
            noAgreement: "Inget avtal / Osäker",
            privateSector: "Privat Sektor (ITP1)",
            other: "Annat",
            topUp: "Använd \"10% Top-up\" beräkning",
            back: "Tillbaka",
            next: "Nästa",
            selectStrategy: "Välj en strategi",
            generatePlan: "Generera Plan",
            skipStrategy: "Hoppa över och gå till planeraren",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "Maxa Ledigheten",
                    description: "Mål: Var hemma längst (100% ledig). Spara alla dagar år 1. Från år 2 tar vi ut sammanhängande block om 5 dagar/vecka för att maxa tiden."
                },
                STRAT_CASH_MAXER: {
                    title: "Maxa Utbetalningen",
                    description: "Mål: Mest pengar nu. Vi tömmer dagarna snabbt när lönen är som högst (inkl. tillägg från jobbet) för högsta möjliga månadsbelopp."
                },
                STRAT_SGI_FORTRESS: {
                    title: "SGI-Trygghet",
                    description: "Mål: Skydda din SGI. Vi ser till att du aldrig hamnar i \"SGI-fällan\" efter 1-årsdagen så att din framtida sjukpenning och VAB förblir hög."
                },
                STRAT_HOLIDAY_SANDWICH: {
                    title: "Långledighets-hacket",
                    description: "Mål: Semester-bonus. Vi pusslar ihop röda dagar och klämdagar för att ge dig rekordlånga sammanhängande ledigheter."
                },
                STRAT_PENSION_PROTECT: {
                    title: "Pensionssäkra",
                    description: "Mål: Skydda framtiden. Jobba deltid utan att tappa tjänstepension. Vi tar ut exakt 1/8 dag för att trigga din arbetsgivares inbetalningar."
                },
                STRAT_GRANDPARENT: {
                    title: "Släktpusslet",
                    description: "Mål: Avlastning. Överlåt 45 dagar per förälder till mormor, farfar eller en nära vän för mer flexibilitet i vardagen."
                },
                STRAT_EQUALITY: {
                    title: "Dela Lika",
                    description: "Mål: Rättvis 50/50. Vi delar dagarna helt lika och maxar de 60 \"dubbeldagarna\" för att ni ska få så mycket tid tillsammans som möjligt."
                },
                STRAT_PART_TIME: {
                    title: "Mjukstarten",
                    description: "Mål: Behåll lönen. Gå ner i arbetstid men behåll 100% av din vanliga lön genom att fylla upp inkomsttappet exakt med föräldrapenning."
                }
            }
        },
        dashboard: {
            appName: "FöräldraOptimizer",
            reset: "Återställ",
            sBank: "S-BANK",
            lBank: "L-BANK",
            painting: "Målar",
            daysFor: "-dagar för",
            avgHouseholdNet: "Genomsnittlig Hushållsinkomst",
            allocated: "Allokerat",
            savePlan: "Skriv ut",
            sharePlan: "Dela",
            copied: "Kopierad!",
            partnerLimit: "Partnergräns nådd! {days} days reserverade."
        },
        calendar: {
            weekdays: ['Må', 'Ti', 'On', 'To', 'Fr', 'Lö', 'Sö'],
            locale: 'sv-SE'
        },
        articles: {
            ultimateGuide: {
                title: "Den ultimata guiden till föräldrapenning 2026",
                description: "Allt om prisbasbelopp, ersättningsnivåer och SGI-tak för det kommande året."
            },
            highIncome: {
                title: "Höginkomsttagare & Skatteplanering",
                description: "Över brytpunkten? Så optimerar du löneväxling och undviker statlig skatt."
            },
            holidays: {
                title: "Semester & Ledighet: Maximera 2026",
                description: "\"Sandwich-metoden\" och hur du kombinerar semester med föräldradagar."
            },
            sgiProtection: {
                title: "SGI-Skydd: Efter 1-årsdagen",
                description: "5-dagarsregeln förklarad. Så skyddar du din inkomst när barnet fyller ett."
            },
            transferDays: {
                title: "Överlåtelse: Involvera släkten",
                description: "Nya regler 2026: Ge dagar till morföräldrar eller vänner."
            },
            mjukstarten: {
                title: "Mjukstarten: För ledare",
                description: "Kombinera karriär med föräldraskap. Fraktionsstrategier för 100% inkomst."
            }
        }
    }
};
