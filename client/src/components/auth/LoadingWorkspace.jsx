import React from 'react';
import { TrendingUp, Loader2 } from 'lucide-react';

export default function LoadingWorkspace({ message = 'Loading your workspace...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 select-none">
      <div className="flex flex-col items-center max-w-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md animate-bounce">
          <TrendingUp className="w-6 h-6 text-emerald-200 stroke-[2.5]" />
        </div>
        
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Namma<span className="text-brand-600">-Connect</span>
          </h2>
          <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mt-0.5">
            Founder Growth Operating System
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 text-slate-600 text-sm font-semibold">
          <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
