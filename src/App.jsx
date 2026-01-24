import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';

import UltimateGuidePrisbasbelopp from './pages/articles/2026/UltimateGuidePrisbasbelopp';
import HighIncomeGuide2026 from './pages/articles/2026/HighIncomeGuide2026';
import SGIGuide2026 from './pages/articles/2026/SGIGuide2026';
import HolidayGuide2026 from './pages/articles/2026/HolidayGuide2026';
import TransferDaysGuide2026 from './pages/articles/2026/TransferDaysGuide2026';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function AppContent() {
    const navigate = useNavigate();
    // const [view, setView] = useState('LANDING'); // Removed in favor of Router
    const [benefitData, setBenefitData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const handleDataParsed = (data) => {
        setBenefitData(data);
        navigate('/setup');
    };

    const handleOnboardingComplete = (profile) => {
        setUserProfile(profile);
        // Here we would run the initial optimization algorithms using benefitData and profile
        navigate('/planner');
    };

    const handleReset = () => {
        setBenefitData(null);
        setUserProfile(null);
        navigate('/');
    };

    // Adapter for legacy onNavigate prop from LandingPage
    const handleNavigation = (target) => {
        if (target === 'FAQ_2026') {
            navigate('/articles/2026/guide');
        } else if (target === 'HIGH_INCOME_2026') {
            navigate('/articles/2026/high-income');
        } else if (target === 'SGI_PROTECTION_2026') {
            navigate('/articles/2026/sgi-protection');
        } else if (target === 'HOLIDAY_2026') {
            navigate('/articles/2026/holidays');
        } else if (target === 'TRANSFER_DAYS_2026') {
            navigate('/articles/2026/transfer-days');
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
                        />
                    ) : (
                        <Navigate to="/" replace />
                    )
                } />

                <Route path="/articles/2026/guide" element={
                    <UltimateGuidePrisbasbelopp onBack={() => navigate('/')} />
                } />
                <Route path="/articles/2026/high-income" element={
                    <HighIncomeGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/articles/2026/sgi-protection" element={
                    <SGIGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/articles/2026/holidays" element={
                    <HolidayGuide2026 onBack={() => navigate('/')} />
                } />
                <Route path="/articles/2026/transfer-days" element={
                    <TransferDaysGuide2026 onBack={() => navigate('/')} />
                } />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App;
