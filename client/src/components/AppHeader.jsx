import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  LogOut,
  UserCheck,
  ChevronDown,
  User
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import { useAuth } from '../context/AuthContext';

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
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const viewTitles = {
    dashboard: 'Growth Overview',
    diagnostic: '24-Signal Growth Diagnostic',
    roadmap: '30-Day Growth Plan',
    mentors: 'Smart Mentor Matching',
    'mentor-profile': 'Mentor Profile',
    funding: 'Funding & Grants Fit',
    'brand-ai': 'AI Brand Positioning Assistant',
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

        {/* User Profile Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {(user?.name || activeFounder.founderName || 'F')[0]}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight truncate max-w-[100px]">
                {user?.name || activeFounder.founderName}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block -mt-0.5">
                {user?.role || 'FOUNDER'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="text-xs font-bold text-slate-900 block truncate">
                  {user?.name || activeFounder.founderName}
                </span>
                <span className="text-[11px] text-slate-400 block truncate">
                  {user?.email || 'authenticated'}
                </span>
                <div className="mt-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                    {user?.role || 'FOUNDER'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentView('profile');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-slate-400" />
                <span>My Brand Profile</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('onboarding');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span>Re-Take Diagnostic</span>
              </button>

              <div className="pt-1 mt-1 border-t border-slate-100">
                <button
                  onClick={async () => {
                    setProfileMenuOpen(false);
                    await logout();
                    setCurrentView('login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
