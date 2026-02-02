import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from './context/LanguageContext';

import UltimateGuidePrisbasbelopp from './pages/articles/2026/UltimateGuidePrisbasbelopp';
import HighIncomeGuide2026 from './pages/articles/2026/HighIncomeGuide2026';
import SGIGuide2026 from './pages/articles/2026/SGIGuide2026';
import HolidayGuide2026 from './pages/articles/2026/HolidayGuide2026';
import TransferDaysGuide2026 from './pages/articles/2026/TransferDaysGuide2026';
import MjukstartenGuide2026 from './pages/articles/2026/MjukstartenGuide2026';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function AppContent() {
    const navigate = useNavigate();

    // 1. Capture URL State strictly ONCE on component mount
    const [sharedState] = useState(() => {
        const p = new URLSearchParams(window.location.search);
        const s = p.get('s');
        if (!s) return { isShared: false };
        return {
            isShared: true,
            s, l: p.get('l'), r: p.get('r'), d: p.get('d'),
            dob: p.get('dob'), mun: p.get('mun'), mun_name: p.get('mun_name'),
            pa_n: p.get('pa_n'), pa_inc: p.get('pa_inc'), pa_tu: p.get('pa_tu'),
            pb_n: p.get('pb_n'), pb_inc: p.get('pb_inc'), pb_tu: p.get('pb_tu'),
            strat: p.get('strat'), cal: p.get('cal')
        };
    });

    const [benefitData, setBenefitData] = useState(() => {
        if (sharedState.isShared) {
            return {
                sDays: parseInt(sharedState.s) || 240,
                lDays: parseInt(sharedState.l) || 0,
                reservedDays: parseInt(sharedState.r) || 90,
                doubleDays: parseInt(sharedState.d) || 30
            };
        }
        const saved = localStorage.getItem('parental_benefit_data');
        return saved ? JSON.parse(saved) : null;
    });

    const [userProfile, setUserProfile] = useState(() => {
        if (sharedState.dob) {
            return {
                childDob: sharedState.dob,
                municipality: { id: sharedState.mun || '', name: sharedState.mun_name || '' },
                parentA: {
                    name: sharedState.pa_n || 'Parent A',
                    income: parseInt(sharedState.pa_inc) || 0,
                    hasTopUp: sharedState.pa_tu === '1'
                },
                parentB: {
                    name: sharedState.pb_n || 'Parent B',
                    income: parseInt(sharedState.pb_inc) || 0,
                    hasTopUp: sharedState.pb_tu === '1'
                },
                strategy: sharedState.strat || 'STRAT_NONE'
            };
        }
        const saved = localStorage.getItem('parental_user_profile');
        return saved ? JSON.parse(saved) : null;
    });

    // Auto-save to LocalStorage
    React.useEffect(() => {
        if (benefitData) localStorage.setItem('parental_benefit_data', JSON.stringify(benefitData));
        if (userProfile) localStorage.setItem('parental_user_profile', JSON.stringify(userProfile));
    }, [benefitData, userProfile]);

    // Track if this was a shared link import to override local calendar
    const [isSharedImport] = useState(sharedState.isShared);
    const [sharedCalendar] = useState(sharedState.cal);

    // 2. Navigation and URL cleanup
    React.useEffect(() => {
        if (sharedState.isShared) {
            console.log('[App] Plan imported via Shared Link. Calendar data length:', sharedState.cal?.length || 0);
            navigate('/planner', { replace: true });
            // Clean URL bar but the state is already safely in sharedState
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [sharedState, navigate]);

    // Auto-save to LocalStorage
    React.useEffect(() => {
        if (benefitData) localStorage.setItem('parental_benefit_data', JSON.stringify(benefitData));
        if (userProfile) localStorage.setItem('parental_user_profile', JSON.stringify(userProfile));
    }, [benefitData, userProfile]);

    const handleDataParsed = (data) => {
        setBenefitData(data);
        navigate('/setup');
    };

    const handleOnboardingComplete = (profile) => {
        setUserProfile(profile);
        navigate('/planner');
    };

    const handleReset = () => {
        localStorage.removeItem('parental_benefit_data');
        localStorage.removeItem('parental_user_profile');
        localStorage.removeItem('parental_allocated_days');
        window.location.href = '/'; // Hard reload for clean state
    };

    // Adapter for legacy onNavigate prop from LandingPage
    const handleNavigation = (target) => {
        if (target === 'FAQ_2026') {
            navigate('/planera-foraldraledighet');
        } else if (target === 'HIGH_INCOME_2026') {
            navigate('/foraldrapenning-hoginkomsttagare');
        } else if (target === 'SGI_PROTECTION_2026') {
            navigate('/sgi-skydd-2026');
        } else if (target === 'HOLIDAY_2026') {
            navigate('/semester-och-foraldrapenning');
        } else if (target === 'TRANSFER_DAYS_2026') {
            navigate('/overlatelse-av-foraldradagar');
        } else if (target === 'PART_TIME_2026') {
            navigate('/mjukstarten-guide');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<LandingPage onDataParsed={handleDataParsed} onNavigate={handleNavigation} />} />

                <Route path="/setup" element={
                    <OnboardingWizard onComplete={handleOnboardingComplete} />
                } />

                <Route path="/planner" element={
                    // Protect route: Redirect to landing if no data
                    benefitData && userProfile ? (
                        <Dashboard
                            benefitData={benefitData}
                            userProfile={userProfile}
                            onReset={handleReset}
                            isSharedPlan={isSharedImport}
                            sharedCalendar={sharedCalendar}
                        />
                    ) : (
                        <Navigate to="/" replace />
                    )
                } />

                <Route path="/planera-foraldraledighet" element={
                    <UltimateGuidePrisbasbelopp onBack={() => navigate('/')} />
                } />
                <Route path="/foraldrapenning-hoginkomsttagare" element={
                    <HighIncomeGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/sgi-skydd-2026" element={
                    <SGIGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/semester-och-foraldrapenning" element={
                    <HolidayGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/overlatelse-av-foraldradagar" element={
                    <TransferDaysGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/mjukstarten-guide" element={
                    <MjukstartenGuide2026 onBack={() => navigate('/')} />
                } />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
            <Analytics />
        </LanguageProvider>
    );
}

export default App;
