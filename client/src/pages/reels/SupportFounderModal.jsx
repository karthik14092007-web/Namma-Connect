import React, { useState } from 'react';
import { X, Heart, MessageSquare, Package, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function SupportFounderModal({ reel, isOpen, onClose, onCheerSuccess }) {
  const [supportType, setSupportType] = useState('cheer'); // 'cheer' | 'inquiry' | 'sample'
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen || !reel) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onCheerSuccess?.(supportType, message || 'Cheered the founder!');
      setSent(false);
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Support Delivered!</h3>
            <p className="text-sm text-slate-600">
              {reel.founderName} from {reel.brandName} received your message. You are directly empowering local D2C entrepreneurs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img
                src={reel.brandAvatar}
                alt={reel.brandName}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Direct Founder Support
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                  Support {reel.founderName}
                </h3>
                <p className="text-xs text-slate-500">
                  {reel.brandName} • {reel.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSupportType('cheer')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  supportType === 'cheer'
                    ? 'border-rose-300 bg-rose-50 text-rose-700 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-5 h-5 mb-1 ${supportType === 'cheer' ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                <span>Send Cheer</span>
              </button>

              <button
                type="button"
                onClick={() => setSupportType('inquiry')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  supportType === 'inquiry'
                    ? 'border-brand-300 bg-brand-50 text-brand-700 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className={`w-5 h-5 mb-1 ${supportType === 'inquiry' ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>Ask Question</span>
              </button>

              <button
                type="button"
                onClick={() => setSupportType('sample')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  supportType === 'sample'
                    ? 'border-amber-300 bg-amber-50 text-amber-800 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Package className={`w-5 h-5 mb-1 ${supportType === 'sample' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>Request Sample</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {supportType === 'cheer' && 'Personal Message of Encouragement:'}
                {supportType === 'inquiry' && 'What would you like to ask the founder?'}
                {supportType === 'sample' && 'Tell the founder your delivery location & interest:'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  supportType === 'cheer'
                    ? 'Love the authenticity and mission! Keep growing!'
                    : supportType === 'inquiry'
                    ? 'Can you deliver to Salem within 2 days? Is this safe for toddlers?'
                    : 'Interested in trying a sample pack before placing a bulk order for our office.'
                }
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder-slate-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Send to {reel.founderName}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
