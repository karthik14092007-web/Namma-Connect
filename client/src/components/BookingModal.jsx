import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function BookingModal({ isOpen, onClose, mentor }) {
  if (!isOpen || !mentor) return null;

  const { bookConsultation } = useFounder();
  const [selectedDate, setSelectedDate] = useState('Next Monday');
  const [selectedSlot, setSelectedSlot] = useState('4:00 PM – 4:45 PM');
  const [notes, setNotes] = useState('Reviewing our 30-day marketing engine and brand positioning.');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '11:00 AM – 11:45 AM',
    '2:30 PM – 3:15 PM',
    '4:00 PM – 4:45 PM',
    '6:00 PM – 6:45 PM'
  ];

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await bookConsultation(mentor.id, {
      date: selectedDate,
      timeSlot: selectedSlot,
      notes
    });
    setIsSubmitting(false);
    setIsBooked(true);
  };

  const handleDone = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0">
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300">
                1-on-1 Growth Consultation
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                {mentor.name}
              </h3>
              <p className="text-xs text-teal-200 truncate">{mentor.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Consultation Confirmed!</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              Your 45-minute growth consultation with <strong>{mentor.name}</strong> has been scheduled for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1 text-left">
              <p className="flex items-center justify-between">
                <span className="text-slate-500">Session Fee:</span>
                <span className="font-bold text-slate-900">{mentor.consultationFee}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-500">Mode:</span>
                <span className="font-semibold text-emerald-700">Google Meet (Link sent via email)</span>
              </p>
            </div>
            <button
              onClick={handleDone}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              Return to Mentors
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-4">
            {/* Session Fee banner */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Session Fee:</span>
              <span className="font-bold text-brand-800 text-sm">{mentor.consultationFee}</span>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Select Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Next Monday">Next Monday (10:00 AM – 6:00 PM)</option>
                <option value="Next Wednesday">Next Wednesday (2:00 PM – 7:00 PM)</option>
                <option value="Next Friday">Next Friday (11:00 AM – 5:00 PM)</option>
                <option value="This Saturday">This Saturday (Weekend Mastermind)</option>
              </select>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Select Time Slot (45 min)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-xs p-2 rounded-lg border text-center font-medium transition-all ${
                      selectedSlot === slot
                        ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Discussion Agenda */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                What is your #1 question for this session?
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., How to lower our Meta ad CAC and structure regional distribution..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-md shadow-brand-600/20 transition-all cursor-pointer"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm & Reserve Slot'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
