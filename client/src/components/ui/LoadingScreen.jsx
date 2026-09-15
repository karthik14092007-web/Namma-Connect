import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Target, BarChart2 } from 'lucide-react';

export default function LoadingScreen({ onComplete, brandName = 'your brand' }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Auditing stage & product category parameters...',
    'Evaluating revenue trends & growth bottlenecks...',
    'Computing 6-dimension Brand Growth Score...',
    'Compiling your personalized 30-Day Growth Plan...',
    'Matching top regional mentors and funding schemes...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-6">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-brand-100 animate-ping opacity-50" />
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 animate-pulse">
            <TrendingUp className="w-8 h-8 text-emerald-200 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Namma-Connect Growth Engine
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-2">
            Analyzing your business...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Generating customized diagnosis and roadmap for <strong className="text-slate-800">{brandName}</strong>.
          </p>
        </div>

        <div className="space-y-2.5 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
          {steps.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                  isDone
                    ? 'text-emerald-700 font-semibold'
                    : isCurrent
                    ? 'text-brand-700 font-bold'
                    : 'text-slate-300 font-medium'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border text-[10px] ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isCurrent
                      ? 'border-brand-600 text-brand-600 animate-spin'
                      : 'border-slate-300 text-slate-300'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : '•'}
                </div>
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
