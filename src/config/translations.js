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
            generatePlan: "Generate Plan",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "Maximize Leave",
                    description: "Goal: Stay home longest. Save all days year 1. Afterwards, take exactly what's needed to protect your income."
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
            generatePlan: "Generera Plan",
            strategies: {
                STRAT_TIME_STRETCHER: {
                    title: "Maxa Ledigheten",
                    description: "Mål: Var hemma längst. Spara alla dagar under år 1. Efteråt tar vi ut precis det som krävs för att skydda din inkomst."
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
            savePlan: "Spara Plan",
            partnerLimit: "Partnergräns nådd! {days} dagar reserverade."
        },
        calendar: {
            weekdays: ['Må', 'Ti', 'On', 'To', 'Fr', 'Lö', 'Sö'],
            locale: 'sv-SE'
        }
    }
};
