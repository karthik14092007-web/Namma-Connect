import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FounderProvider } from './context/FounderContext';
import { ToastProvider } from './context/ToastContext';

// Components & Guards
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
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

const viewToPathMap = {
  landing: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  roadmap: '/growth-plan',
  'growth-plan': '/growth-plan',
  diagnostic: '/diagnostic',
  mentors: '/mentors',
  'mentor-profile': '/mentors',
  funding: '/funding',
  'brand-ai': '/brand-ai',
  'launch-reels': '/launch-reels',
  marketing: '/marketing-hub',
  'marketing-hub': '/marketing-hub',
  marketplace: '/marketplace',
  profile: '/my-brand',
  'my-brand': '/my-brand',
  onboarding: '/onboarding',
  admin: '/admin'
};

function getPathViewId(pathname) {
  if (pathname.startsWith('/growth-plan')) return 'roadmap';
  if (pathname.startsWith('/diagnostic')) return 'diagnostic';
  if (pathname.startsWith('/mentors')) return 'mentors';
  if (pathname.startsWith('/funding')) return 'funding';
  if (pathname.startsWith('/brand-ai')) return 'brand-ai';
  if (pathname.startsWith('/launch-reels')) return 'launch-reels';
  if (pathname.startsWith('/marketing-hub')) return 'marketing';
  if (pathname.startsWith('/marketplace')) return 'marketplace';
  if (pathname.startsWith('/my-brand') || pathname.startsWith('/profile')) return 'profile';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/onboarding')) return 'onboarding';
  return 'dashboard';
}

function LandingWrapper() {
  const navigate = useNavigate();
  const handleNav = (viewId) => {
    navigate(viewToPathMap[viewId] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      <PublicNavbar setCurrentView={handleNav} />
      <main className="flex-1">
        <LandingPage setCurrentView={handleNav} />
      </main>
      <Footer setCurrentView={handleNav} />
    </div>
  );
}

function OnboardingWrapper() {
  const navigate = useNavigate();
  const handleNav = (viewId) => {
    navigate(viewToPathMap[viewId] || '/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      <PublicNavbar setCurrentView={handleNav} />
      <main className="flex-1">
        <OnboardingPage setCurrentView={handleNav} />
      </main>
      <Footer setCurrentView={handleNav} />
    </div>
  );
}

function MentorProfileRouteWrapper({ setCurrentView, selectedMentorId }) {
  const { id } = useParams();
  return <MentorProfilePage mentorId={id || selectedMentorId || 'mentor-1'} setCurrentView={setCurrentView} />;
}

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMentorId, setSelectedMentorId] = useState('mentor-1');

  const currentView = getPathViewId(location.pathname);

  const handleNav = (viewId) => {
    const targetPath = viewToPathMap[viewId] || '/dashboard';
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Routes>
      {/* Public Unauthenticated Routes */}
      <Route path="/" element={<LandingWrapper />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignupPage />
          </PublicOnlyRoute>
        }
      />

      {/* Onboarding Route */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingWrapper />
          </ProtectedRoute>
        }
      />

      {/* Protected Founder Routes (wrapped in AppLayout) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout currentView="dashboard" setCurrentView={handleNav}>
              <DashboardPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/growth-plan"
        element={
          <ProtectedRoute>
            <AppLayout currentView="roadmap" setCurrentView={handleNav}>
              <RoadmapPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/diagnostic"
        element={
          <ProtectedRoute>
            <AppLayout currentView="diagnostic" setCurrentView={handleNav}>
              <DiagnosticView setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentors"
        element={
          <ProtectedRoute>
            <AppLayout currentView="mentors" setCurrentView={handleNav}>
              <MentorsPage setCurrentView={handleNav} setSelectedMentorId={setSelectedMentorId} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentors/:id"
        element={
          <ProtectedRoute>
            <AppLayout currentView="mentor-profile" setCurrentView={handleNav}>
              <MentorProfileRouteWrapper setCurrentView={handleNav} selectedMentorId={selectedMentorId} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/funding"
        element={
          <ProtectedRoute>
            <AppLayout currentView="funding" setCurrentView={handleNav}>
              <FundingPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/launch-reels"
        element={
          <ProtectedRoute>
            <AppLayout currentView="launch-reels" setCurrentView={handleNav}>
              <LaunchReelsPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand-ai"
        element={
          <ProtectedRoute>
            <AppLayout currentView="brand-ai" setCurrentView={handleNav}>
              <BrandAIPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketing-hub"
        element={
          <ProtectedRoute>
            <AppLayout currentView="marketing" setCurrentView={handleNav}>
              <MarketingHubPage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <AppLayout currentView="marketplace" setCurrentView={handleNav}>
              <MarketplacePage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-brand"
        element={
          <ProtectedRoute>
            <AppLayout currentView="profile" setCurrentView={handleNav}>
              <FounderProfilePage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout currentView="profile" setCurrentView={handleNav}>
              <FounderProfilePage setCurrentView={handleNav} />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AppLayout currentView="admin" setCurrentView={handleNav}>
              <AdminPage setCurrentView={handleNav} />
            </AppLayout>
          </AdminRoute>
        }
      />

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <FounderProvider>
            <AppRoutes />
          </FounderProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
