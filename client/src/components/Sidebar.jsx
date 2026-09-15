import React from 'react';
import {
  LayoutDashboard,
  Target,
  Users,
  Coins,
  ShoppingBag,
  Megaphone,
  UserCheck,
  Bell,
  Settings,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Video,
  X
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function Sidebar({
  currentView,
  setCurrentView,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  const {
    activeFounder,
    unreadCount,
    setIsNotificationOpen,
    loadDemoKavya,
    isLoading
  } = useFounder();

  const navLinks = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Growth Plan', icon: Target },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'funding', label: 'Funding', icon: Coins },
    { id: 'brand-ai', label: 'Brand AI', icon: Sparkles, badge: 'AI' },
    { id: 'launch-reels', label: 'Launch Reels', icon: Video, badge: 'New' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'marketing', label: 'Marketing Hub', icon: Megaphone },
    { id: 'profile', label: 'My Brand', icon: UserCheck },
    { id: 'admin', label: 'Ecosystem Admin', icon: TrendingUp }
  ];

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    if (setMobileSidebarOpen) setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64 select-none">
      {/* Platform Branding */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight font-sans">
              Namma<span className="text-brand-600 font-black">-Connect</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 block -mt-0.5">
              Growth OS
            </span>
          </div>
        </button>

        {mobileSidebarOpen && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Founder Status Mini-Card */}
      <div className="p-3.5 mx-3 my-3 bg-slate-50 rounded-2xl border border-slate-200/70">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              {activeFounder.founderName ? activeFounder.founderName[0] : 'K'}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate block leading-tight">
                {activeFounder.brandName}
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                {activeFounder.founderName} • {activeFounder.location.split(',')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">Growth Score:</span>
          <span className="font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200/60">
            {activeFounder.growthScore}/100
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
          Founder Tools
        </div>

        {navLinks.map((link) => {
          const isActive = currentView === link.id;
          const Icon = link.icon;

          return (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/70 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
              <span className="truncate">{link.label}</span>
              {link.badge && (
                <span className="ml-auto text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-300">
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-3 border-t border-slate-100 my-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            System
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Reset / Reload Demo Persona */}
          <button
            onClick={loadDemoKavya}
            disabled={isLoading}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-amber-900 hover:bg-amber-50 transition-all cursor-pointer text-left"
            title="Reset to benchmark demo persona"
          >
            <RotateCcw className={`w-4 h-4 text-amber-600 shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Reset Demo (Kavya)</span>
          </button>
        </div>
      </nav>

      {/* Footer / Exit to Landing */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
        <button
          onClick={() => handleNav('landing')}
          className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 cursor-pointer"
        >
          <span>← Back to Landing</span>
        </button>
        <span className="text-[10px] text-slate-400 font-mono">v1.0 Demo</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col shrink-0 h-screen sticky top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />
          <div className="relative z-10 w-64 max-w-full h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-around py-2 px-1 shadow-lg">
        {[
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'roadmap', label: 'Plan', icon: Target },
          { id: 'mentors', label: 'Mentors', icon: Users },
          { id: 'funding', label: 'Funding', icon: Coins },
          { id: 'marketing', label: 'Market', icon: Megaphone }
        ].map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-brand-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
