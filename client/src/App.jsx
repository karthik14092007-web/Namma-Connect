import React, { useState, useEffect } from 'react';
import { FounderProvider, useFounder } from './context/FounderContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

function AppContent() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedMentorId, setSelectedMentorId] = useState('mentor-1');

  // Render view router
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage setCurrentView={setCurrentView} />;
      case 'onboarding':
        return <OnboardingPage setCurrentView={setCurrentView} />;
      case 'dashboard':
        return <DashboardPage setCurrentView={setCurrentView} />;
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
      case 'marketing':
        return <MarketingHubPage setCurrentView={setCurrentView} />;
      case 'marketplace':
        return <MarketplacePage setCurrentView={setCurrentView} />;
      case 'profile':
        return <FounderProfilePage setCurrentView={setCurrentView} />;
      case 'admin':
        return <AdminPage setCurrentView={setCurrentView} />;
      default:
        return <LandingPage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Slide-over Notifications */}
      <NotificationDrawer setCurrentView={setCurrentView} />

      {/* Global Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}

export default function App() {
  return (
    <FounderProvider>
      <AppContent />
    </FounderProvider>
  );
}
