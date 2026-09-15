import React from 'react';
import {
  Menu,
  Bell,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function AppHeader({
  currentView,
  setCurrentView,
  setMobileSidebarOpen
}) {
  const {
    activeFounder,
    unreadCount,
    setIsNotificationOpen,
    loadDemoKavya,
    isLoading
  } = useFounder();

  const viewTitles = {
    dashboard: 'Growth Overview',
    roadmap: '30-Day Growth Plan',
    mentors: 'Smart Mentor Matching',
    'mentor-profile': 'Mentor Profile',
    funding: 'Funding & Grants Fit',
    'launch-reels': 'Launch Reels (Targeted D2C Video)',
    marketplace: 'D2C Marketplace',
    marketing: 'Founder Marketing Hub',
    profile: 'Public Founder Profile',
    admin: 'Ecosystem Admin Analytics'
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block -mb-0.5">
            Founder Operating System
          </span>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
            {viewTitles[currentView] || 'Growth Dashboard'}
          </h1>
        </div>
      </div>

      {/* Right: Active Persona Status, Quick Actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Founder Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-800">{activeFounder.brandName}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">{activeFounder.location.split(',')[0]}</span>
        </div>

        {/* 1-Click Demo Reset */}
        <button
          onClick={loadDemoKavya}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-all shadow-2xs cursor-pointer"
          title="Reset to benchmark demo persona (Kavya - Namma Crunch)"
        >
          <RotateCcw className={`w-3 h-3 text-amber-600 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden lg:inline">⚡ Reset Demo</span>
          <span className="lg:hidden">⚡ Kavya</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white shadow-xs animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Build / Assess CTA */}
        <button
          onClick={() => {
            setCurrentView('onboarding');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
          <span>New Assessment</span>
        </button>
      </div>
    </header>
  );
}
