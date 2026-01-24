export const translations = {
    en: {
        landing: {
            title: "Maximize Your Parental Benefit",
            subtitle: "Enter your available days from <a href='https://www.forsakringskassan.se/privatperson/logga-in-pa-mina-sidor#/?goto=%2Fprivatperson%2Fmina-sidor%2Falla-e-tjanster%2Fmin-foraldrapenning' target='_blank' style='color: var(--color-primary); text-decoration: underline;'>Försäkringskassan</a>.",
            sLevel: "Sjukpenningnivå (S-Level)",
            lLevel: "Lägstanivå (L-Level)",
            daysLeft: "days left",
            reserved: "Start Date Locked/Reserved Days",
            reservedDesc: "\"Number of days that can't be transferred to my partner\"",
            daysLocked: "days locked",
            doubleDays: "Double Days (Simultaneous)",
            doubleDaysDesc: "Days you plan to be off together (max 60). Consumes 2 days per date.",
            daysCount: "days (allocates {total} total)",
            continue: "Continue Setup",
            placeholderS: "e.g. 195",
            placeholderL: "e.g. 45",
            placeholderReserved: "e.g. 90",
            placeholderDouble: "e.g. 10"
        },
        onboarding: {
            title: "Customize plan",
            whoAreParents: "Who are the parents?",
            childDob: "Child's Date of Birth",
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
            strategySubtitle: "Based on your profile, here are optimized templates.",
            generatePlan: "Generate Plan",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "The Time Stretcher",
                    description: "Goal: Delay preschool. 0 days first year. 5 days/week after age 1 using L-days on weekends."
                },
                STRAT_CASH_MAXER: {
                    title: "The Cash Maxer",
                    description: "Goal: Maximize cash. High earner takes leave 7 days/week during the high-income window."
                },
                STRAT_SGI_FORTRESS: {
                    title: "The SGI Fortress",
                    description: "Goal: Absolute protection. Strictly enforces 5 days/week coverage after child turns 1."
                },
                STRAT_HOLIDAY_SANDWICH: {
                    title: "The Holiday Sandwicher",
                    description: "Goal: Extend vacations. Uses public holidays to create long breaks."
                },
                STRAT_PENSION_PROTECT: {
                    title: "The Pension Protector",
                    description: "Goal: Wealth preservation. Takes 1/8th day daily to trigger pension waivers while working part-time."
                },
                STRAT_GRANDPARENT: {
                    title: "The Grandparent Proxy",
                    description: "Goal: Flexible care. Transfers 45 days per parent to a senior relative."
                },
                STRAT_EQUALITY: {
                    title: "The Equality Balanced",
                    description: "Goal: 50/50 split. Includes 60 Double Days early on for shared time."
                },
                STRAT_PART_TIME: {
                    title: "The Part-Time Transition",
                    description: "Goal: Carrier re-entry. Auto-fills exact benefit fraction to restore 100% net income at 75% work."
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
            savePlan: "Save Plan",
            partnerLimit: "Partner limit reached! {days} days reserved."
        },
        calendar: {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            locale: 'en-US'
        }
    },
    sv: {
        landing: {
            title: "Maximera din föräldrapenning",
            subtitle: "Ange dina tillgängliga dagar från <a href='https://www.forsakringskassan.se/privatperson/logga-in-pa-mina-sidor#/?goto=%2Fprivatperson%2Fmina-sidor%2Falla-e-tjanster%2Fmin-foraldrapenning' target='_blank' style='color: var(--color-primary); text-decoration: underline;'>Försäkringskassan</a>.",
            sLevel: "Sjukpenningnivå (S-dagar)",
            lLevel: "Lägstanivå (L-dagar)",
            daysLeft: "dagar kvar",
            reserved: "Låsta/Reserverade dagar",
            reservedDesc: "\"Antal dagar som inte kan överlåtas till min partner\"",
            daysLocked: "dagar låsta",
            doubleDays: "Dubbeldagar (Samtidiga)",
            doubleDaysDesc: "Dagar ni planerar att vara lediga tillsammans (max 60). Förbrukar 2 dagar per datum.",
            daysCount: "dagar (allokerar {total} totalt)",
            continue: "Fortsätt konfiguration",
            placeholderS: "t.ex. 195",
            placeholderL: "t.ex. 45",
            placeholderReserved: "t.ex. 90",
            placeholderDouble: "t.ex. 10"
        },
        onboarding: {
            title: "Anpassa plan",
            whoAreParents: "Vilka är föräldrarna?",
            childDob: "Barnets födelsedatum",
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
            strategySubtitle: "Baserat på din profil, här är optimerade mallar.",
            generatePlan: "Generera Plan",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "Tidsoptimeraren",
                    description: "Mål: Max tid hemma. 0 dagar år 1. 5 dagar/vecka efter 1 år (L-dagar på helger)."
                },
                STRAT_CASH_MAXER: {
                    title: "Inkomstmaximeraren",
                    description: "Mål: Max månadspeng. Höginkomsttagaren tar 7 dagar/vecka under top-up fönstret."
                },
                STRAT_SGI_FORTRESS: {
                    title: "SGI-Fortet",
                    description: "Mål: Total trygghet. Säkerställer 5 dagar/vecka aktivitet efter 1-årsdagen."
                },
                STRAT_HOLIDAY_SANDWICH: {
                    title: "Semestermackan",
                    description: "Mål: Förläng ledighet. Utnyttjar röda dagar och klämdagar smart."
                },
                STRAT_PENSION_PROTECT: {
                    title: "Pensionsräddaren",
                    description: "Mål: Skydda framtiden. Tar 1/8-dags ersättning dagligen vid deltidsarbete för premiebefrielse."
                },
                STRAT_GRANDPARENT: {
                    title: "Mormor/Farfars-dagar",
                    description: "Mål: Flexibel hjälp. Överlåter 45 dagar per förälder till pensionär."
                },
                STRAT_EQUALITY: {
                    title: "Jämställdhetsbalansen",
                    description: "Mål: 50/50 delning. Inkluderar 60 dubbeldagar tidigt för gemensam tid."
                },
                STRAT_PART_TIME: {
                    title: "Deltidsövergången",
                    description: "Mål: Mjuk återgång. Fyller upp inkomstbortfall exakt med föräldrapenning (netto-match)."
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
            savePlan: "Spara Plan",
            partnerLimit: "Partnergräns nådd! {days} dagar reserverade."
        },
        calendar: {
            weekdays: ['Må', 'Ti', 'On', 'To', 'Fr', 'Lö', 'Sö'],
            locale: 'sv-SE'
        }
    }
};
