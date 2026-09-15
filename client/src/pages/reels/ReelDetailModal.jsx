import React, { useState, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Star,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useFounder } from '../../context/FounderContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function ReelDetailModal({
  reel,
  isOpen,
  onClose,
  onOpenSupport
}) {
  const { addToast } = useToast();
  const { addToCart } = useFounder();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel?.metrics?.likes || 218);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Priya Narayanan (Chennai)',
      text: 'Received my 2nd box of Millet Crunch! The curry leaf flavor is so genuine, kids loved it.',
      time: '1 day ago'
    },
    {
      id: 'c2',
      author: 'Rajesh Sundaram (Madurai)',
      text: 'Great to see local Madurai brands prioritizing zero palm oil. Truly proud!',
      time: '2 days ago'
    }
  ]);

  if (!isOpen || !reel) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      addToast(`❤️ Liked ${reel.brandName}'s reel!`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('🔗 Reel link copied to clipboard!');
  };

  const handleBuy = () => {
    if (reel.product) {
      addToCart?.({
        id: reel.product.id,
        name: reel.product.name,
        price: reel.product.price,
        brand: reel.brandName,
        image: reel.product.image
      });
      addToast(`🛒 Added ${reel.product.name} (₹${reel.product.price}) to cart!`);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        author: 'You (Verified Buyer)',
        text: newComment.trim(),
        time: 'Just now'
      }
    ]);
    setNewComment('');
    addToast('💬 Comment posted to founder reel!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-slate-800 relative">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ---------------- LEFT PANE: 9:16 VIDEO PLAYER ---------------- */}
        <div className="md:w-1/2 bg-black flex items-center justify-center relative min-h-[380px] md:min-h-[580px] select-none">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.posterUrl}
            className="w-full h-full max-h-[580px] object-contain cursor-pointer"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onClick={togglePlay}
          />

          {/* Central Play/Pause Watermark */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all cursor-pointer ${
                  liked ? 'bg-rose-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PANE: TARGETING RATIONALE & PRODUCT CHECKOUT ---------------- */}
        <div className="md:w-1/2 bg-white flex flex-col justify-between overflow-y-auto max-h-[580px] p-6 space-y-6">
          <div className="space-y-5">
            {/* Founder Identity Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={reel.brandAvatar}
                  alt={reel.brandName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {reel.brandName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Founded by {reel.founderName} • {reel.location}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Category
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {reel.category}
                </span>
              </div>
            </div>

            {/* Audience Fit & Recommendation Rationale */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-extrabold text-emerald-900">
                    Why You Are Seeing This Reel
                  </span>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {reel.audienceFit}% AUDIENCE FIT
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {reel.matchedReason ||
                  'Pre-matched to your regional preference for wholesome snacks and verified local makers in Tamil Nadu.'}
              </p>
            </div>

            {/* Reel Title & Full Description */}
            <div>
              <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                {reel.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {reel.description}
              </p>
            </div>

            {/* Tagged Product Highlight Card */}
            {reel.product && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  Featured Launch Product
                </span>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={reel.product.image}
                      alt={reel.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block">
                        {reel.product.name}
                      </h5>
                      <span className="text-[11px] text-slate-500 block">
                        {reel.product.packSize}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-emerald-700">
                          ₹{reel.product.price}
                        </span>
                        {reel.product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{reel.product.originalPrice}
                          </span>
                        )}
                        {reel.product.discount && (
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                            {reel.product.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleBuy}
                    className="shrink-0 px-4 py-2 text-xs font-bold gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Product</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Direct Support & Community Comments */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Buyer Reviews & Feedback ({comments.length})</span>
                </span>
                <button
                  onClick={() => onOpenSupport?.(reel)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Support {reel.founderName}</span>
                </button>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-0.5 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-800">{c.author}</span>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment or question for the founder..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
                <Button variant="secondary" size="sm" type="submit" className="text-xs font-bold shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
