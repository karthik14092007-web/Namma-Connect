import React from 'react';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center font-bold tracking-tight rounded-full whitespace-nowrap transition-colors';

  const variants = {
    brand: 'bg-brand-50 text-brand-700 border border-brand-200/80',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-300',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/70',
    verified: 'bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs',
    proofOfWork: 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-xs px-3 py-1 gap-1.5'
  };

  return (
    <span className={`${base} ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {variant === 'verified' && !Icon && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
      {variant === 'proofOfWork' && !Icon && <Award className="w-3 h-3 text-amber-600 shrink-0" />}
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
