import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  Sparkles,
  MapPin,
  Languages,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import BookingModal from '../components/BookingModal';
import ExplainableMatchModal from '../components/ExplainableMatchModal';

export default function MentorProfilePage({ mentorId, setCurrentView }) {
  const { mentors, activeFounder } = useFounder();
  const mentor = mentors.find((m) => m.id === mentorId) || mentors[0];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  if (!mentor) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-slate-500">Mentor not found.</p>
        <button
          onClick={() => setCurrentView('mentors')}
          className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-bold"
        >
          Return to Mentors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('mentors')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Mentor Directory</span>
      </button>

      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-5">
            <img
              src={mentor.avatarUrl}
              alt={mentor.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{mentor.name}</h1>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-brand-700">{mentor.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {mentor.location}
                </span>
                <span>•</span>
                <span>{mentor.experienceYears} Years D2C Experience</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {mentor.rating} ({mentor.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Match Score & Explain */}
          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black font-sans border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{mentor.matchPercentage || 94}% Compatibility</span>
            </div>
            <button
              onClick={() => setIsExplainOpen(true)}
              className="block text-xs font-bold text-brand-700 hover:underline mt-1 text-right"
            >
              Why this match? →
            </button>
          </div>
        </div>

        {/* Bio & Proof of Work */}
        <div className="py-6 border-b border-slate-100 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              About the Mentor
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Proof of Work
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              "{mentor.proofOfWork}"
            </p>
          </div>
        </div>

        {/* Meta Stats & Fee Booking Bar */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              Startups Supported
            </span>
            <p className="text-base font-extrabold text-slate-900 font-sans">
              {mentor.startupsSupported} Early D2C Brands
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              Languages
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {(mentor.languages || []).join(', ')}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Session Fee
              </span>
              <span className="text-lg font-black text-slate-900 font-sans">
                {mentor.consultationFee}
              </span>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        mentor={mentor}
      />

      {/* Explainable Modal */}
      <ExplainableMatchModal
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        entity={mentor}
        type="mentor"
        onPrimaryAction={() => {
          setIsExplainOpen(false);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
