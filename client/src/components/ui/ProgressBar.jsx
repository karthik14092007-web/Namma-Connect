import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'bg-brand-600',
  label,
  showValue = false,
  className = '',
  height = 'h-2'
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-semibold text-slate-700 truncate pr-2">{label}</span>}
          {showValue && (
            <span className="font-bold text-slate-900 font-sans shrink-0">
              {value} <span className="text-slate-400 font-normal">/ {max}</span>
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
