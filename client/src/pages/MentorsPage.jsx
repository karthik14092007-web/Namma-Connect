import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Star,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  Info
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import ExplainableMatchModal from '../components/ExplainableMatchModal';
import BookingModal from '../components/BookingModal';

export default function MentorsPage({ setCurrentView, setSelectedMentorId }) {
  const { activeFounder, mentors } = useFounder();
  const [selectedMentorForExplain, setSelectedMentorForExplain] = useState(null);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');

  const specialtiesList = ['All', 'Performance marketing', 'Brand positioning', 'Supply chain', 'Packaging'];

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.specialties?.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty =
      filterSpecialty === 'All' ||
      m.specialties?.some((s) => s.toLowerCase().includes(filterSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  const handleOpenProfile = (mentor) => {
    if (setSelectedMentorId) {
      setSelectedMentorId(mentor.id);
    }
    setCurrentView('mentor-profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
            Intelligent Advisor Ecosystem (Who Can Help?)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Find the right mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Not every mentor is right for your business. We match you based on your stage, industry and biggest growth challenge.
          </p>
        </div>

        {/* Founder Context Badge */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-2xs self-start md:self-auto">
          <span>Matching Criteria: </span>
          <strong className="text-slate-900">{activeFounder.industry}</strong> •{' '}
          <span className="text-emerald-700 font-bold">{activeFounder.businessStage}</span> •{' '}
          <span className="text-brand-700 font-bold">#1 Gap: {activeFounder.topGaps?.[0]?.dimension || 'Marketing'}</span>
        </div>
      </div>

      {/* ---------------- Search & Filter Bar ---------------- */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by mentor name, marketing skill, or D2C industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setFilterSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterSpecialty === spec
                  ? 'bg-brand-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Mentor Cards Grid ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => {
          const isTopMatch = mentor.matchPercentage >= 90;

          return (
            <div
              key={mentor.id}
              className={`bg-white rounded-2xl border p-6 shadow-soft flex flex-col justify-between transition-all hover:shadow-md ${
                isTopMatch ? 'border-brand-300 ring-1 ring-brand-400/20' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Top Row: Avatar, Name, Match Score */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
                        <span title="Verified D2C Mentor">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{mentor.title}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{mentor.experienceYears} years experience</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {mentor.rating} ({mentor.reviewsCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Percentage Badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black font-sans border ${
                        isTopMatch
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-brand-50 text-brand-800 border-brand-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {mentor.matchPercentage}% Match
                    </span>
                    <button
                      onClick={() => setSelectedMentorForExplain(mentor)}
                      className="block text-[10px] text-brand-700 font-bold hover:underline mt-1 text-right"
                    >
                      Why this match? →
                    </button>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(mentor.specialties || []).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why This Match Bullet Points */}
                <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70 mb-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Why this match for {activeFounder.brandName}?
                  </span>
                  {(mentor.matchReasons || []).slice(0, 3).map((r, idx) => (
                    <p key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </p>
                  ))}
                </div>

                {/* Proof of Work Bio snippet */}
                <p className="text-xs text-slate-500 italic mb-4">
                  "{mentor.proofOfWork}"
                </p>
              </div>

              {/* Card Footer: Pricing & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Consultation Fee
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 font-sans">
                    {mentor.consultationFee}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenProfile(mentor)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => setSelectedMentorForBooking(mentor)}
                    className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Modals ---------------- */}
      <ExplainableMatchModal
        isOpen={!!selectedMentorForExplain}
        onClose={() => setSelectedMentorForExplain(null)}
        entity={selectedMentorForExplain}
        type="mentor"
        onPrimaryAction={() => {
          setSelectedMentorForBooking(selectedMentorForExplain);
          setSelectedMentorForExplain(null);
        }}
      />

      <BookingModal
        isOpen={!!selectedMentorForBooking}
        onClose={() => setSelectedMentorForBooking(null)}
        mentor={selectedMentorForBooking}
      />
    </div>
  );
}
