import React from 'react';
import { TrendingUp, Heart, Shield, Award, Sparkles } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-md shadow-brand-700/30">
                <TrendingUp className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Namma<span className="text-brand-400 font-extrabold">-Connect</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-4">
              A digital growth operating system empowering early-stage D2C founders, rural artisans, and small-town entrepreneurs to diagnose business gaps, build structured roadmaps, and connect with trusted mentors and stage-appropriate capital.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Verified Founder Network
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Explainable Matching
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Platform Journey
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Growth Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('roadmap')}
                  className="hover:text-white transition-colors"
                >
                  30-Day Growth Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('mentors')}
                  className="hover:text-white transition-colors"
                >
                  Smart Mentor Matching
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('funding')}
                  className="hover:text-white transition-colors"
                >
                  Funding & Grants Fit
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('marketing')}
                  className="hover:text-white transition-colors"
                >
                  Targeted Marketing Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  D2C Founder Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="hover:text-white transition-colors"
                >
                  Founder Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-white transition-colors"
                >
                  Admin Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('profile')}
                  className="hover:text-white transition-colors"
                >
                  Public Brand Profile
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Namma-Connect. Empowering India's next generation of D2C icons.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for Bharat's ambitious founders with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
