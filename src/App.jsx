import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    const [view, setView] = useState('LANDING'); // LANDING, ONBOARDING, DASHBOARD
    const [benefitData, setBenefitData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const handleDataParsed = (data) => {
        setBenefitData(data);
        setView('ONBOARDING');
    };

    const handleOnboardingComplete = (profile) => {
        setUserProfile(profile);
        // Here we would run the initial optimization algorithms using benefitData and profile
        setView('DASHBOARD');
    };

    const handleReset = () => {
        setView('LANDING');
        setBenefitData(null);
        setUserProfile(null);
    };

    return (
        <div className="app-container">
            {view === 'LANDING' && <LandingPage onDataParsed={handleDataParsed} />}
            {view === 'ONBOARDING' && <OnboardingWizard onComplete={handleOnboardingComplete} />}
            {view === 'DASHBOARD' && (
                <Dashboard
                    benefitData={benefitData}
                    userProfile={userProfile}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}

export default App;
