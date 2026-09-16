import React, { useState, useEffect } from 'react';
import { FounderProvider, useFounder } from './context/FounderContext';
import { ToastProvider } from './context/ToastContext';
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';
import NotificationDrawer from './components/NotificationDrawer';

// Pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import MentorsPage from './pages/MentorsPage';
import MentorProfilePage from './pages/MentorProfilePage';
import FundingPage from './pages/FundingPage';
import MarketingHubPage from './pages/MarketingHubPage';
import MarketplacePage from './pages/MarketplacePage';
import FounderProfilePage from './pages/FounderProfilePage';
import AdminPage from './pages/AdminPage';
import DiagnosticView from './pages/DiagnosticView';
import LaunchReelsPage from './pages/reels/LaunchReelsPage';
import BrandAIPage from './pages/brand-ai/BrandAIPage';

function AppRouter() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedMentorId, setSelectedMentorId] = useState('mentor-1');

  // Switcher for views
  const renderScreen = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage setCurrentView={setCurrentView} />;
      case 'diagnostic':
        return <DiagnosticView setCurrentView={setCurrentView} />;
      case 'roadmap':
        return <RoadmapPage setCurrentView={setCurrentView} />;
      case 'mentors':
        return (
          <MentorsPage
            setCurrentView={setCurrentView}
            setSelectedMentorId={setSelectedMentorId}
          />
        );
      case 'mentor-profile':
        return (
          <MentorProfilePage
            mentorId={selectedMentorId}
            setCurrentView={setCurrentView}
          />
        );
      case 'funding':
        return <FundingPage setCurrentView={setCurrentView} />;
      case 'brand-ai':
        return <BrandAIPage setCurrentView={setCurrentView} />;
      case 'launch-reels':
        return <LaunchReelsPage setCurrentView={setCurrentView} />;
      case 'marketing':
        return <MarketingHubPage setCurrentView={setCurrentView} />;
      case 'marketplace':
        return <MarketplacePage setCurrentView={setCurrentView} />;
      case 'profile':
        return <FounderProfilePage setCurrentView={setCurrentView} />;
      case 'admin':
        return <AdminPage setCurrentView={setCurrentView} />;
      default:
        return <DashboardPage setCurrentView={setCurrentView} />;
    }
  };

  // 1. Landing Page (Public SaaS Layout)
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
        <PublicNavbar setCurrentView={setCurrentView} />
        <main className="flex-1">
          <LandingPage setCurrentView={setCurrentView} />
        </main>
        <Footer setCurrentView={setCurrentView} />
      </div>
    );
  }

  // 2. Onboarding Page (Focused Assessment Layout)
  if (currentView === 'onboarding') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
        <PublicNavbar setCurrentView={setCurrentView} />
        <main className="flex-1">
          <OnboardingPage setCurrentView={setCurrentView} />
        </main>
        <Footer setCurrentView={setCurrentView} />
      </div>
    );
  }

  // 3. Authenticated Views (Founder Operating System Layout with Persistent Sidebar)
  return (
    <AppLayout currentView={currentView} setCurrentView={setCurrentView}>
      {renderScreen()}
    </AppLayout>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <FounderProvider>
        <AppRouter />
      </FounderProvider>
    </ToastProvider>
  );
}
