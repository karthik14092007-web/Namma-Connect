import React from 'react';
import {
  X,
  Bell,
  Target,
  Handshake,
  Coins,
  TrendingUp,
  Rocket,
  CheckCheck,
  Calendar,
  ShoppingBag,
  Award
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function NotificationDrawer({ setCurrentView }) {
  const {
    notifications,
    unreadCount,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationRead,
    markAllNotificationsRead
  } = useFounder();

  if (!isNotificationOpen) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'target':
        return <Target className="w-4 h-4 text-emerald-600" />;
      case 'handshake':
        return <Handshake className="w-4 h-4 text-brand-600" />;
      case 'coins':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'trending-up':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'rocket':
        return <Rocket className="w-4 h-4 text-purple-600" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-4 h-4 text-teal-600" />;
      case 'award':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      const viewMap = {
        '/dashboard': 'dashboard',
        '/roadmap': 'roadmap',
        '/mentors': 'mentors',
        '/funding': 'funding',
        '/marketing': 'marketing',
        '/marketplace': 'marketplace'
      };
      const view = viewMap[notif.link] || 'dashboard';
      setCurrentView(view);
      setIsNotificationOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-teal-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/10 text-emerald-300">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Founder Notifications</h3>
                <p className="text-xs text-teal-200">
                  {unreadCount > 0 ? `${unreadCount} unread updates` : 'All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-teal-200 hover:text-white p-1 flex items-center gap-1"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100 space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                    notif.read
                      ? 'bg-white hover:bg-slate-50 opacity-80'
                      : 'bg-brand-50/50 hover:bg-brand-50 border border-brand-100 shadow-xs'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-200/80 shrink-0 mt-0.5">
                    {getIcon(notif.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {notif.message}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-brand-700 hover:underline">
                        Take action →
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-600 inline-block" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            Real-time triggers based on your Growth Plan progress
          </div>
        </div>
      </div>
    </div>
  );
}
