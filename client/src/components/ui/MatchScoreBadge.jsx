import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MatchScoreBadge({
  score = 94,
  label = 'MATCH',
  className = '',
  size = 'md'
}) {
  const isHigh = score >= 90;
  const isGood = score >= 80;

  const bgStyle = isHigh
    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
    : isGood
    ? 'bg-brand-50 text-brand-800 border-brand-200'
    : 'bg-amber-50 text-amber-800 border-amber-200';

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-black'
  };

  return (
    <div
      className={`inline-flex items-center rounded-full font-sans font-black tracking-tight border shadow-2xs ${bgStyle} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>{score}% {label}</span>
    </div>
  );
}
