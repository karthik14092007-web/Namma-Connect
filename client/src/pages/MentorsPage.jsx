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
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import ExplainableMatchModal from '../components/ExplainableMatchModal';
import BookingModal from '../components/BookingModal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MatchScoreBadge from '../components/ui/MatchScoreBadge';

export default function MentorsPage({ setCurrentView, setSelectedMentorId }) {
  const { activeFounder, mentors } = useFounder();
  const [selectedMentorForExplain, setSelectedMentorForExplain] = useState(null);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState(null);
  const [expandedMatchId, setExpandedMatchId] = useState(null);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExpandMatch = (id) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- Header (Prompt Section 8) ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="brand" size="md" className="mb-1.5">
            Intelligent Advisor Matching (Who can help me?)
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find the right mentor.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Not every mentor is right for your business. We match you based on your stage, industry and growth challenge.
          </p>
        </div>

        {/* Founder Context Match Criteria */}
        <div className="bg-white p-3 px-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 shadow-2xs self-start md:self-auto">
          <span>Active Match Profile: </span>
          <strong className="text-slate-900">{activeFounder.industry}</strong> •{' '}
          <span className="text-emerald-700 font-bold">{activeFounder.businessStage}</span> •{' '}
          <span className="text-brand-700 font-bold">#1 Gap: {activeFounder.topGaps?.[0]?.dimension || 'Marketing'}</span>
        </div>
      </div>

      {/* ---------------- Search & Filter Bar ---------------- */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by mentor name, role, or D2C specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setFilterSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => {
          const isExpanded = expandedMatchId === mentor.id;

          return (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft flex flex-col justify-between transition-all hover:shadow-md hover:border-brand-200/80"
            >
              <div>
                {/* Header Row: Avatar, Name, Verified Badge, Role, Match Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {mentor.name}
                        </h3>
                        <Badge variant="verified" size="sm">
                          VERIFIED
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold truncate mt-0.5">
                        {mentor.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span>{mentor.experienceYears} yrs exp</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {mentor.rating} ({mentor.reviewsCount})
                        </span>
                        <span>•</span>
                        <span>{mentor.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prominent Match Score Badge */}
                  <div className="text-right shrink-0">
                    <MatchScoreBadge score={mentor.matchPercentage} label="MATCH" size="md" />
                    <button
                      onClick={() => toggleExpandMatch(mentor.id)}
                      className="flex items-center justify-end gap-1 text-[11px] font-bold text-brand-700 hover:text-brand-800 mt-1.5 ml-auto cursor-pointer"
                    >
                      <span>Why this match?</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
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

                {/* Proof of Work Snippet */}
                <p className="text-xs text-slate-500 italic mb-4 line-clamp-2">
                  "{mentor.proofOfWork}"
                </p>

                {/* Expandable "Why this match?" Breakdown Section (Prompt Requirement) */}
                {isExpanded && (
                  <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                      <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">
                        Explainable Weighted Score
                      </span>
                      <span className="font-black text-brand-700">{mentor.matchPercentage}% Total</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Industry</span>
                        <strong className="font-sans">30 / 30</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Business Stage</span>
                        <strong className="font-sans">25 / 25</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Growth Need</span>
                        <strong className="font-sans">18 / 20</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Location</span>
                        <strong className="font-sans">10 / 10</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Language</span>
                        <strong className="font-sans">8 / 10</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-white border border-slate-200/60">
                        <span>Experience</span>
                        <strong className="font-sans">3 / 5</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 space-y-1">
                      {(mentor.matchReasons || []).slice(0, 3).map((r, idx) => (
                        <p key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Pricing & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-extrabold block">
                    Consultation Price
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-900 font-sans">
                    {mentor.consultationFee}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenProfile(mentor)}
                  >
                    View Profile
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedMentorForBooking(mentor)}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedMentorForBooking}
        onClose={() => setSelectedMentorForBooking(null)}
        mentor={selectedMentorForBooking}
      />
    </div>
  );
}
