import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import NotificationDrawer from './NotificationDrawer';

export default function AppLayout({ currentView, setCurrentView, children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-6 overflow-x-hidden">
        <AppHeader
          currentView={currentView}
          setCurrentView={setCurrentView}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Slide-over Notification Drawer */}
      <NotificationDrawer setCurrentView={setCurrentView} />
    </div>
  );
}
