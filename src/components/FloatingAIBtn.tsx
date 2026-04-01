'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles, X, Grid, Heart, Bell, ShoppingBag, MapPin, Users, Send,
  Droplets, Coffee, MessageSquare, Clock, ShieldCheck, Zap,
} from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

const SUGGESTIONS = [
  'Tìm kèo tối nay khu vực Cầu Giấy trình TB+',
  'Có sân trống ngày mai buổi sáng không?',
  'Tìm lớp dạy cầu lông cho người mới',
];

const FEATURE_ICONS = [
  { icon: Users, label: 'Tìm kèo', color: 'blue' },
  { icon: MapPin, label: 'Sân trống', color: 'emerald' },
  { icon: ShoppingBag, label: 'Mua bán', color: 'amber' },
  { icon: Heart, label: 'Quan tâm', color: 'rose' },
  { icon: Bell, label: 'Nhắc lịch', color: 'indigo' },
];

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600',
  amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600',
  rose: 'bg-rose-100 text-rose-600 group-hover:bg-rose-600',
  indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600',
};

export default function FloatingAIBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'features'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentMessage: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {
        id: Date.now(),
        role: 'ai',
        content: data.success ? data.reply : (data.error || 'Lỗi server.'),
      }]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), role: 'ai', content: 'Lỗi mạng khi gọi AI.' }]);
    }
    setIsTyping(false);
  };

  if (isOpen) {
    return (
      <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-6 w-full sm:w-[380px] h-[100dvh] sm:h-[650px] bg-slate-50 shadow-2xl z-50 flex flex-col sm:rounded-3xl border border-slate-200 overflow-hidden font-sans">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#0ea5e9] to-indigo-600 p-5 text-white relative flex-shrink-0 shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold flex items-center gap-2">
                  SmashMate AI{' '}
                  <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Beta</span>
                </h3>
                <p className="text-xs text-blue-100 font-medium">Hỏi bằng tiếng Việt • AI tìm bài đăng</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab(activeTab === 'chat' ? 'features' : 'chat')}
                className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition border border-white/10 ${
                  activeTab === 'features' ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition border border-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 bg-white/10 hover:bg-white/20 transition border border-white/20 rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5" /> Welcome tier đang hoạt động
          </div>
        </div>

        {/* Droplet decoration */}
        <div className="absolute right-[-12px] top-[140px] w-10 h-10 bg-white shadow-md rounded-l-full hidden sm:flex items-center pl-2 text-blue-500 z-50">
          <Droplets className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">

          {/* Features tab */}
          {activeTab === 'features' && (
            <div className="p-5 flex flex-col gap-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-1 border-b border-slate-200 pb-3">
                <span>TÍNH NĂNG</span>
                <button onClick={() => setActiveTab('chat')} className="hover:text-slate-700">Đóng</button>
              </div>
              <div className="grid grid-cols-3 gap-y-8 gap-x-2 text-center text-xs font-semibold text-slate-600">
                {FEATURE_ICONS.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-1 transition group">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-sm group-hover:text-white ${COLOR_MAP[color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-800 text-lg">Xin chào! Mình là SmashMate AI</h4>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Zap className="w-4 h-4" /></div>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Gõ 1 câu &rarr; AI hiểu ý bạn &rarr; mở đúng feed/filter. Bạn tiết kiệm thời gian tìm kèo.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ icon: Zap, label: 'Nhanh', sub: '1 câu lệnh', c: 'text-amber-500' },
                    { icon: Clock, label: 'Nhắc lịch', sub: 'khung giờ', c: 'text-blue-500' },
                    { icon: ShieldCheck, label: 'Welcome', sub: 'đang bật', c: 'text-emerald-500' },
                  ].map(({ icon: Icon, label, sub, c }) => (
                    <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center gap-1">
                      <Icon className={`w-4 h-4 ${c}`} />
                      <span className="text-xs font-bold text-slate-700">{label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat tab */}
          {activeTab === 'chat' && (
            <div className="flex flex-col p-4">
              {messages.length === 0 && (
                <div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-800 text-lg">Xin chào! Mình là SmashMate AI</h4>
                      <div className="p-2 bg-blue-50 text-[#0ea5e9] rounded-xl"><Sparkles className="w-4 h-4" /></div>
                    </div>
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      Gõ 1 câu → AI hiểu ý bạn → mở đúng feed/filter.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ icon: Zap, label: 'Nhanh', sub: '1 câu lệnh', c: 'text-[#0ea5e9]' },
                        { icon: Clock, label: 'Nhắc lịch', sub: 'khung giờ', c: 'text-indigo-500' },
                        { icon: ShieldCheck, label: 'Welcome', sub: 'đang bật', c: 'text-emerald-500' },
                      ].map(({ icon: Icon, label, sub, c }) => (
                        <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center gap-1">
                          <Icon className={`w-4 h-4 ${c}`} />
                          <span className="text-xs font-bold text-slate-700">{label}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Ví dụ câu hỏi</div>
                  <div className="flex flex-col gap-2.5">
                    {SUGGESTIONS.map((sug, i) => (
                      <div
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="bg-white border border-slate-200 text-slate-700 p-3.5 rounded-xl text-sm hover:bg-slate-50 hover:border-blue-300 transition cursor-pointer flex items-center gap-3 shadow-sm"
                      >
                        <Sparkles className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate">{sug}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {messages.length > 0 && (
                <div className="flex flex-col gap-4 pb-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'user' ? (
                        <div className="bg-[#0ea5e9] text-white px-5 py-3 rounded-2xl rounded-br-sm max-w-[85%] text-sm font-medium shadow-sm leading-relaxed whitespace-pre-line">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-200 text-slate-800 px-5 py-4 rounded-2xl rounded-tl-sm text-sm font-medium shadow-sm leading-relaxed whitespace-pre-line max-w-[90%]">
                          {msg.content}
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 min-h-[44px]">
                        {[0, 0.2, 0.4].map((d) => (
                          <div
                            key={d}
                            className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${d}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} className="pb-2" />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="bg-white border-t border-slate-200 px-4 py-3 flex-shrink-0 z-10">
          <div className="flex justify-between items-center mb-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-bold hover:bg-amber-100 transition border border-amber-100/50">
              <Coffee className="w-3.5 h-3.5" /> Ủng hộ
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-100 transition border border-blue-100/50">
              <MessageSquare className="w-3.5 h-3.5" /> Góp ý
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="VD: tìm kèo tối nay Cầu Giấy TB+..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-14 py-3 text-sm focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 transition text-slate-800 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 w-10 h-10 rounded-full bg-[#8bc7e9] text-white flex items-center justify-center transition disabled:opacity-50 hover:bg-[#0ea5e9] hover:scale-105"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Closed state: floating button cluster
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none group">
      {/* Speech bubble */}
      <div className="pointer-events-auto bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-100 py-3.5 px-4 max-w-[210px] relative transition-transform origin-bottom-right group-hover:-translate-y-1">
        <p className="text-[13px] font-bold text-slate-700 leading-[1.4]">
          Hỏi bằng tiếng Việt — AI tìm bài đăng cho bạn! <span className="inline-block ml-1">🏸</span>
        </p>
        <div className="absolute -bottom-1.5 right-12 w-3.5 h-3.5 bg-white border-r border-b border-slate-100 rotate-45" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 items-center pointer-events-auto mt-1">
        <button className="bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] border border-emerald-400/50 rounded-full px-5 py-[11px] font-bold hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 active:scale-95">
          Cài app
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#3b82f6] to-[#4f46e5] text-white shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(59,130,246,0.4)] transition-all border border-blue-400/30 px-6 py-2.5 rounded-[2rem] flex items-center gap-2 active:scale-95 group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-indigo-400/0 -translate-x-[150%] skew-x-[-30deg] group-hover/btn:transition-transform group-hover/btn:duration-700 group-hover/btn:translate-x-[150%]" />
          <Sparkles className="h-5 w-5 fill-white/10 relative z-10" />
          <div className="flex flex-col items-start leading-tight relative z-10 ml-0.5">
            <span className="text-[17px] font-bold tracking-tight">Trợ lý AI</span>
            <span className="text-[11px] text-blue-100 font-medium tracking-wide">Tìm kiếm</span>
          </div>
        </button>
      </div>
    </div>
  );
}
