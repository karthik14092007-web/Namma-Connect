import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Bell,
  Menu,
  X,
  Compass,
  CheckCircle2,
  Users,
  Coins,
  Megaphone,
  ShoppingBag,
  ShieldCheck,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function Navbar({ currentView, setCurrentView }) {
  const {
    activeFounder,
    unreadCount,
    setIsNotificationOpen,
    loadDemoKavya,
    isLoading
  } = useFounder();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard', badge: activeFounder?.growthScore ? `${activeFounder.growthScore}/100` : null },
    { id: 'roadmap', label: 'Growth Plan' },
    { id: 'mentors', label: 'Mentors' },
    { id: 'funding', label: 'Funding' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'profile', label: 'Profile' },
    { id: 'admin', label: 'Admin' }
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro banner for hackathon evaluators */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-teal-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
              Demo Mode Active
            </span>
            <span className="hidden sm:inline text-teal-200">
              Active Persona: <strong className="text-white">{activeFounder.founderName}</strong> ({activeFounder.brandName} • {activeFounder.location})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadDemoKavya}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-[11px] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Reset data and load benchmark demo persona (Kavya - Namma Crunch)"
            >
              <RotateCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>⚡ Load Demo Persona (Kavya)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-emerald-300 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <span className="font-bold text-xl tracking-tight text-slate-900 block leading-tight font-sans">
                  Namma<span className="text-brand-600 font-extrabold">-Connect</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 block -mt-0.5">
                  D2C Growth Operating System
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs border border-brand-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              title="Founder Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Avatar / Quick Link */}
            <button
              onClick={() => handleNavClick('profile')}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-slate-200 hover:border-brand-300 bg-slate-50 hover:bg-brand-50/50 transition-colors"
              title="View Public Founder Profile"
            >
              <div className="w-7 h-7 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center">
                {activeFounder.founderName ? activeFounder.founderName[0] : 'K'}
              </div>
              <div className="text-left text-xs">
                <span className="font-semibold text-slate-800 block leading-tight truncate max-w-[80px]">
                  {activeFounder.founderName}
                </span>
                <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleNavClick('onboarding')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold shadow-sm shadow-brand-600/20 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Build My</span> Growth Plan
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="p-3 bg-slate-50 rounded-xl mb-3 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Logged in as:</p>
              <p className="text-sm font-bold text-slate-800">
                {activeFounder.founderName} ({activeFounder.brandName})
              </p>
              <p className="text-xs text-emerald-700 font-medium">Growth Score: {activeFounder.growthScore}/100</p>
            </div>
            <button
              onClick={loadDemoKavya}
              className="text-xs px-2.5 py-1 bg-amber-500 text-slate-900 rounded font-semibold"
            >
              Load Kavya
            </button>
          </div>

          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('onboarding')}
              className="w-full py-2.5 text-center rounded-lg bg-brand-600 text-white font-semibold shadow-sm"
            >
              Start New Onboarding Assessment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
