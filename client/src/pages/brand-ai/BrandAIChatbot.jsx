// client/src/pages/brand-ai/BrandAIChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  ArrowRight,
  Video,
  Target,
  Users,
  Search,
  CheckCircle2,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { generateBrandAIResponse } from '../../services/brandAIService';

export default function BrandAIChatbot({
  setCurrentView,
  onApplyPositioning,
  onSwitchTab
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello Kavya! I'm your D2C Brand Strategist. I've reviewed Namma Crunch's business data and noticed your messaging is currently targeting everyone, which dilutes customer conversion.",
      structured: {
        what: "Your current positioning is too broad ('Healthy and tasty snacks for everyone').",
        why: "Early-stage D2C brands win by dominating a specific niche before attempting mass expansion.",
        whatNext: "We should focus Namma Crunch around health-conscious young professionals looking for 4 PM office desk snacks.",
        actionLabel: "Apply Sharper Positioning",
        actionType: "apply-positioning",
        bridgeNav: { label: "Launch Targeted Reel →", view: "launch-reels" }
      },
      buttons: ["Yes, refine it", "Show alternatives", "Find keywords", "Create content"]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateBrandAIResponse(text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Here is my strategic recommendation for "${text.trim()}":`,
        structured: responseData,
        buttons: ["Improve Positioning", "Find Keywords", "Launch Reel"]
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleButtonClick = (btn) => {
    if (btn === "Yes, refine it" || btn === "Improve Positioning") {
      if (onApplyPositioning) onApplyPositioning();
      handleSendMessage("Refine my brand positioning for young professionals");
    } else if (btn === "Find keywords" || btn === "Find Keywords") {
      if (onSwitchTab) onSwitchTab('seo');
      handleSendMessage("Give me high-intent keywords for my product");
    } else if (btn === "Create content" || btn === "Launch Reel") {
      setCurrentView('launch-reels');
    } else if (btn === "Show alternatives") {
      handleSendMessage("Show me alternative positioning angles");
    } else {
      handleSendMessage(btn);
    }
  };

  const starterPrompts = [
    "What should my brand stand for?",
    "Who is my ideal customer?",
    "Why isn't my positioning strong?",
    "Give me keywords for my product.",
    "How should I market this product?"
  ];

  const quickActions = [
    { label: "+ Improve Positioning", query: "Improve Positioning" },
    { label: "+ Find My Audience", query: "Find My Audience" },
    { label: "+ Generate Keywords", query: "Generate Keywords" },
    { label: "+ Analyze Competitors", query: "Analyze Competitors" },
    { label: "+ Write Product Description", query: "Write Product Description" },
    { label: "+ Create Content Ideas", query: "Create Content Ideas" }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md flex flex-col h-[740px] max-h-[85vh] overflow-hidden">
      {/* Strategist Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Brand AI
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              Your D2C Growth Strategist
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-1',
                sender: 'ai',
                text: "Restarted strategic consultation. Ask me anything about your positioning, audience, or SEO strategy.",
                buttons: ["Improve Positioning", "Find My Audience", "Generate Keywords"]
              }
            ]);
          }}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Starter Prompts Carousel (Shown if 1-2 messages) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Suggested Strategy Questions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {starterPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 hover:text-brand-700 text-slate-600 border border-slate-200 transition-all cursor-pointer text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAi ? 'items-start' : 'items-end justify-end'}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-emerald-200" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                isAi
                  ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                  : 'bg-brand-600 text-white font-medium ml-auto'
              }`}>
                <p className="leading-relaxed">
                  {msg.text}
                </p>

                {/* Structured Strategic Framework Response */}
                {msg.structured && (
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 text-slate-700 font-sans">
                    {msg.structured.what && (
                      <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                          WHAT:
                        </span>
                        <p className="text-[11px] font-semibold text-slate-800">
                          {msg.structured.what}
                        </p>
                      </div>
                    )}

                    {msg.structured.why && (
                      <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                          WHY:
                        </span>
                        <p className="text-[11px] text-slate-600">
                          {msg.structured.why}
                        </p>
                      </div>
                    )}

                    {msg.structured.whatNext && (
                      <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          WHAT NEXT:
                        </span>
                        <p className="text-[11px] font-bold text-slate-900">
                          {msg.structured.whatNext}
                        </p>
                      </div>
                    )}

                    {/* Bridge Action Navigation Button */}
                    {msg.structured.bridgeNav && (
                      <div className="pt-1 flex items-center justify-end">
                        <button
                          onClick={() => setCurrentView(msg.structured.bridgeNav.view)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-[11px] shadow-xs cursor-pointer"
                        >
                          {msg.structured.bridgeNav.view === 'launch-reels' && <Video className="w-3 h-3 text-emerald-200" />}
                          {msg.structured.bridgeNav.view === 'roadmap' && <Target className="w-3 h-3 text-emerald-200" />}
                          {msg.structured.bridgeNav.view === 'mentors' && <Users className="w-3 h-3 text-emerald-200" />}
                          <span>{msg.structured.bridgeNav.label}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Follow-up Suggestion Chips */}
                {msg.buttons && msg.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {msg.buttons.map((b, i) => (
                      <button
                        key={i}
                        onClick={() => handleButtonClick(b)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 hover:text-brand-700 border border-slate-200 text-[10px] font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
            <div className="w-7 h-7 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
            </div>
            <span className="font-semibold text-slate-500">
              Brand Strategist is analyzing...
            </span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Quick Action Chips */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {quickActions.map((qa, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qa.query)}
            className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white hover:bg-brand-50 hover:text-brand-700 border border-slate-200 text-[10px] font-bold text-slate-700 transition-colors shrink-0 cursor-pointer"
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-100 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask your brand strategist (e.g. How to differentiate?)..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
