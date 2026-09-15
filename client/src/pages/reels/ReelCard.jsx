import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useFounder } from '../../context/FounderContext';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ReelCard({
  reel,
  onOpenDetail,
  onOpenSupport,
  isActiveInFeed = false
}) {
  const { addToast } = useToast();
  const { addToCart } = useFounder();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.metrics?.likes || 120);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Play / pause toggle
  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Sound toggle
  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    addToast(isMuted ? '🔊 Sound unmuted' : '🔇 Sound muted', 'info');
  };

  // Like toggle
  const handleLike = (e) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      addToast(`❤️ Liked ${reel.brandName}'s launch reel!`);
    }
  };

  // Share
  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(window.location.href);
    addToast(`🔗 Reel link copied to clipboard! Share with regional buyers.`);
  };

  // Buy product
  const handleBuy = (e) => {
    e.stopPropagation();
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

  return (
    <div className="relative group w-full max-w-[340px] mx-auto rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800 transition-all hover:shadow-2xl flex flex-col select-none aspect-[9/16] min-h-[540px] max-h-[620px]">
      {/* Video Media or Fallback Poster */}
      <div className="absolute inset-0 z-0 bg-slate-900 cursor-pointer" onClick={togglePlay}>
        {!videoError ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.posterUrl}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            onError={() => setVideoError(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="w-full h-full relative">
            <img
              src={reel.posterUrl}
              alt={reel.title}
              className="w-full h-full object-cover opacity-80 filter brightness-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
          </div>
        )}

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

        {/* Center Play/Pause indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-1 fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Top Header Controls Overlay */}
      <div className="relative z-10 p-3.5 flex items-center justify-between text-white">
        {/* Brand Avatar & Name */}
        <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 max-w-[70%]">
          <img
            src={reel.brandAvatar}
            alt={reel.brandName}
            className="w-6 h-6 rounded-full object-cover border border-emerald-400 shrink-0"
          />
          <div className="min-w-0">
            <span className="text-xs font-bold text-white truncate block leading-tight flex items-center gap-1">
              {reel.brandName}
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 inline" />
            </span>
          </div>
        </div>

        {/* Top Right: Sound Toggle & Fullscreen */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail?.(reel);
            }}
            className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Open Detail View"
          >
            <Maximize2 className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Audience Fit Badge (Top Left Just Below Header) */}
      <div className="relative z-10 px-3.5 pt-1 flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{reel.audienceFit}% AUDIENCE FIT</span>
        </div>
        <span className="text-[10px] font-bold text-slate-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
          {reel.category}
        </span>
      </div>

      {/* Spacer to push content to bottom */}
      <div className="flex-1 cursor-pointer" onClick={togglePlay} />

      {/* Right Interaction Rail (Reel Style) */}
      <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-3.5">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform cursor-pointer group/btn"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              liked
                ? 'bg-rose-600/90 border-rose-400 text-white shadow-lg'
                : 'bg-black/40 border-white/20 text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-white' : 'stroke-[2.2]'}`} />
          </div>
          <span className="text-[11px] font-bold drop-shadow-md">{likesCount}</span>
        </button>

        {/* Support Founder Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenSupport?.(reel);
          }}
          className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform cursor-pointer group/btn"
          title="Directly cheer or message the founder"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/80 hover:bg-amber-500 border border-amber-300 flex items-center justify-center text-white shadow-lg backdrop-blur-md">
            <Sparkles className="w-5 h-5 fill-amber-200" />
          </div>
          <span className="text-[10px] font-bold text-amber-200 drop-shadow-md">Support</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
            <Share2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold drop-shadow-md">{reel.metrics?.shares || 24}</span>
        </button>
      </div>

      {/* Bottom Information & Product Tag Bar */}
      <div className="relative z-10 p-3.5 space-y-2 text-white">
        {/* Why this is recommended / targeting rationale */}
        <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-200 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-md backdrop-blur-xs max-w-full truncate">
          <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{reel.matchedReason || 'Targeted Regional Match'}</span>
        </div>

        {/* Reel Title & Description */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold leading-snug drop-shadow-md line-clamp-2 text-white">
            {reel.title}
          </h4>
          <p
            onClick={(e) => {
              e.stopPropagation();
              setShowFullDesc(!showFullDesc);
            }}
            className={`text-[11px] text-slate-300 mt-0.5 drop-shadow-xs cursor-pointer ${
              showFullDesc ? '' : 'line-clamp-1'
            }`}
          >
            {reel.description}
          </p>
        </div>

        {/* Product Tag Bar with 1-Click Buy CTA */}
        {reel.product && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 flex items-center justify-between gap-2 shadow-lg border border-white/40 text-slate-900">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={reel.product.image}
                alt={reel.product.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-slate-900 truncate block leading-tight">
                  {reel.product.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-emerald-700">₹{reel.product.price}</span>
                  {reel.product.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      ₹{reel.product.originalPrice}
                    </span>
                  )}
                  {reel.product.discount && (
                    <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 px-1 rounded">
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
              className="shrink-0 px-3 py-1.5 text-xs font-bold gap-1 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{reel.cta === 'Buy Product' ? 'Buy Now' : 'View'}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
