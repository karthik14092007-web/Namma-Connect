import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function PublicNavbar({ setCurrentView }) {
  const { loadDemoKavya, isLoading, activeFounder } = useFounder();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoClick = async () => {
    await loadDemoKavya();
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Demo Notification Strip */}
      <div className="bg-slate-900 text-teal-100 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Demo Persona Ready
            </span>
            <span className="hidden sm:inline text-slate-300 text-xs">
              Primary Hackathon Founder: <strong className="text-white">Kavya</strong> (Namma Crunch • Madurai)
            </span>
          </div>
          <button
            onClick={handleDemoClick}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>⚡ 1-Click Demo (Kavya)</span>
          </button>
        </div>
      </div>

      {/* Main SaaS Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight font-sans">
                Namma<span className="text-brand-600 font-black">-Connect</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 block -mt-0.5">
                D2C Growth OS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-brand-700 transition-colors"
            >
              How It Works
            </a>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="hover:text-brand-700 transition-colors cursor-pointer"
            >
              For Founders
            </button>
            <button
              onClick={() => handleNavClick('mentors')}
              className="hover:text-brand-700 transition-colors cursor-pointer"
            >
              Mentors
            </button>
            <button
              onClick={() => handleNavClick('funding')}
              className="hover:text-brand-700 transition-colors cursor-pointer"
            >
              Funding
            </button>
            <button
              onClick={() => handleNavClick('marketplace')}
              className="hover:text-brand-700 transition-colors cursor-pointer"
            >
              Marketplace
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer hidden sm:block"
            >
              Login
            </button>
            <button
              onClick={() => handleNavClick('onboarding')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Get Started</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <a
            href="#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            How It Works
          </a>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700"
          >
            For Founders
          </button>
          <button
            onClick={() => handleNavClick('mentors')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700"
          >
            Mentors
          </button>
          <button
            onClick={() => handleNavClick('funding')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700"
          >
            Funding
          </button>
          <button
            onClick={() => handleNavClick('marketplace')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700"
          >
            Marketplace
          </button>
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex-1 py-2 text-center text-xs font-bold border border-slate-200 rounded-lg text-slate-700"
            >
              Login
            </button>
            <button
              onClick={() => handleNavClick('onboarding')}
              className="flex-1 py-2 text-center text-xs font-bold bg-brand-600 text-white rounded-lg"
            >
              Build Growth Plan
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
