'use client';

import React, { useState } from 'react';
import {
  Sparkles, Check, ChevronDown, Coffee, ShieldCheck, Lock,
  Users, MapPin, MessageSquare, Star, Crown, Building2, Zap, X, Gift, Bell
} from 'lucide-react';

const COMPARE_DATA = [
  { name: 'Feed 7 danh mục + bộ lọc',            free: true,        pro: true,         bus: true },
  { name: 'Bản đồ sân + chỉ đường',          free: true,        pro: true,         bus: true },
  { name: 'Lọc khoảng cách',                     free: true,        pro: true,         bus: true },
  { name: 'Premium request',                  free: '500/ngày',   pro: '2000/ngày',  bus: '3000/ngày' },
  { name: 'AI Search',                        free: '50/ngày',    pro: '100/ngày',   bus: '200/ngày'  },
  { name: 'Lưu bài quan tâm',                 free: '10 bài',    pro: '50 bài',     bus: '200 bài'   },
  { name: 'Nhắc lịch tự động',              free: '5 preset',  pro: '20 preset',  bus: '50 preset' },
  { name: 'Không quảng cáo',                  free: false,       pro: true,         bus: true },
  { name: 'Badge profile',                    free: false,       pro: 'Pro',        bus: 'Verified'  },
  { name: 'Analytics bài đăng',              free: false,       pro: true,         bus: true },
  { name: 'Claim profile sân',               free: false,       pro: false,        bus: true },
  { name: 'Dashboard analytics sân',         free: false,       pro: false,        bus: true },
  { name: 'Ghim bài đầu feed',               free: false,       pro: false,        bus: '2 bài/tháng' },
  { name: 'Hỗ trợ ưu tiên',                 free: false,       pro: false,        bus: true },
];

const FAQS = [
  { q: 'Có bị tự động gia hạn không?',      icon: Lock,        bg: 'bg-emerald-50', c: 'text-emerald-500' },
  { q: 'Thanh toán bằng cách nào?',         icon: Zap,         bg: 'bg-blue-50',    c: 'text-blue-500'   },
  { q: 'Nếu không hài lòng thì sao?',  icon: ShieldCheck, bg: 'bg-emerald-50', c: 'text-emerald-500' },
  { q: 'Free đã đủ dùng chưa?',            icon: Gift,        bg: 'bg-rose-50',    c: 'text-rose-500',
    highlight: true, a: 'Với người chơi bình thường thỉnh thoảng tìm kèo 1-2 lần/tuần thì gói Free hoàn toàn đáp ứng tốt với 500 request mỗi ngày.' },
  { q: 'Business phù hợp với ai?',          icon: Building2,   bg: 'bg-amber-50',   c: 'text-amber-500',
    highlight: true, a: 'Dành cho CLB, chủ sân lông, cần công cụ tự động đăng bài phủ sóng và nhận lịch thông báo tự động mỗi ngày.' },
  { q: 'Có gói dùng thử không?',           icon: Gift,        bg: 'bg-purple-50',  c: 'text-purple-500' },
];

export default function PricingPage() {
  const [billing, setBilling]   = useState<'thang' | 'quy' | 'nam'>('thang');
  const [openFaqs, setOpenFaqs] = useState<number[]>([3, 4]);

  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const renderValue = (val: boolean | string, colorClass: string) => {
    if (val === true)  return <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto"><Check className="w-4 h-4" /></div>;
    if (val === false) return <div className="w-6 h-6 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto"><X className="w-4 h-4" /></div>;
    if (val === 'Pro' || val === 'Verified')
      return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colorClass}`} style={{ backgroundColor: val === 'Pro' ? '#eff6ff' : '#f0fdf4' }}>{val}</span>;
    return <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{val}</span>;
  };

  const proPrice = billing === 'thang' ? '49.000đ' : billing === 'quy' ? '39.000đ' : '33.000đ';

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 w-full pb-20">

        {/* Hero */}
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 mb-6">
            <Sparkles className="w-4 h-4" /> BẢNG GIÁ SMASHMATE
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Giá phù hợp <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">cho bạn</span>
          </h1>
          <p className="text-xl text-slate-500 mb-8 font-medium">Pro cho trải nghiệm không giới hạn.</p>
          <p className="text-slate-800 font-medium mb-12">
            Chỉ từ <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mx-1"><Coffee className="w-4 h-4" /> 49.000đ/tháng</span> — bằng 1 ly cà phê
          </p>

          {/* Billing toggle */}
          <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mx-auto mb-12">
            {([['thang', 'Tháng', ''], ['quy', 'Quý', '-20%'], ['nam', 'Năm', '-32%']] as const).map(([val, label, badge]) => (
              <button
                key={val}
                id={`billing-${val}`}
                onClick={() => setBilling(val)}
                className={`px-8 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
                  billing === val ? 'bg-blue-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
                {badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    billing === val ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                  }`}>{badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="max-w-[1400px] mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

            {/* Free */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:-translate-y-1 transition-all flex flex-col">
              <div className="mt-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-200 shadow-sm"><Zap className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Free</h3>
                  <p className="text-xs text-slate-500">Thoải mái tìm kèo, không cần trả phí</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-slate-900">0đ</span><span className="text-slate-500 ml-2">/ tháng</span></div>
              <button id="btn-free" className="w-full bg-slate-50 text-slate-800 border border-slate-200 font-bold py-3.5 rounded-xl mb-8 hover:bg-slate-100 transition">Dùng ngay — Miễn phí</button>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['Feed 7 tabs + bộ lọc đầy đủ','Bản đồ sân + chỉ đường','AI Search — 50 lượt/ngày','Premium request — 500 lượt/ngày','Lưu quan tâm — tối đa 10 bài','Nhắc lịch — tối đa 5 preset'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Pro (highlighted) */}
            <div className="bg-white/90 backdrop-blur-xl border-[3px] border-blue-400 rounded-[2rem] p-6 shadow-[0_12px_40px_rgba(59,130,246,0.25)] flex flex-col md:-translate-y-4 relative group hover:-translate-y-6 transition-all duration-300 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 text-xs font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm border border-blue-200">
                <Star className="w-3.5 h-3.5 fill-blue-600" /> PHỔ BIẾN NHẤT
              </div>
              <div className="mt-8 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)]"><Crown className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Pro</h3>
                  <p className="text-xs text-slate-500">Cho lông thủ muốn không bỏ lỡ kèo nào</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-sky-500">{proPrice}</span><span className="text-slate-500 ml-2">/ tháng</span></div>
              <button id="btn-pro" className="w-full bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl mb-2 shadow-[0_6px_16px_rgba(124,58,237,0.3)] hover:bg-[#6d28d9] transition">Bắt đầu dùng Pro</button>
              <div className="text-center text-xs text-sky-500 font-bold mb-6 flex items-center justify-center gap-1"><Gift className="w-3.5 h-3.5" /> 7 ngày dùng thử miễn phí</div>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['Tất cả tính năng Free +','AI Search — 100 lượt/ngày','Premium request — 2000 lượt/ngày','Lưu quan tâm — 50 bài','Nhắc lịch — 20 preset'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
              <div className="mt-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f97316] rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)]"><Building2 className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Business</h3>
                  <p className="text-xs text-slate-500">Cho chủ sân, HLV và câu lạc bộ</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-slate-900">199.000đ</span><span className="text-slate-500 ml-2">/ tháng</span></div>
              <button id="btn-business" className="w-full bg-[#f43f5e] text-white font-bold py-3.5 rounded-xl mb-8 shadow-[0_6px_16px_rgba(244,63,94,0.3)] hover:bg-[#e11d48] transition">Liên hệ tư vấn</button>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['Tất cả tính năng Pro +','Kết quả nhắc lịch mỗi lần tải — 100 bài','Claim profile sân cầu lông','Dashboard analytics sân','Tự đăng sân trống & khuyến mãi'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-sky-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Tất cả tính năng theo từng gói</h2>
            <p className="text-slate-500">Xem chính xác bạn nhận được gì</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] overflow-x-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-6 px-6 font-bold text-base w-1/3">Tính năng</th>
                  <th className="py-6 px-4 font-bold text-center">Free</th>
                  <th className="py-6 px-4 font-bold text-center text-blue-600 bg-blue-50/50"><Crown className="w-4 h-4 inline mr-1" />Pro</th>
                  <th className="py-6 px-4 font-bold text-center text-orange-600 bg-orange-50/50"><Building2 className="w-4 h-4 inline mr-1" />Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {COMPARE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-5 px-6 font-medium text-slate-700">{row.name}</td>
                    <td className="py-5 px-4 text-center border-l border-slate-100">{renderValue(row.free, 'text-slate-600')}</td>
                    <td className="py-5 px-4 text-center border-l-2 border-r-2 border-blue-50 bg-blue-50/20">{renderValue(row.pro, 'text-blue-600')}</td>
                    <td className="py-5 px-4 text-center border-l border-slate-100 bg-orange-50/10">{renderValue(row.bus, 'text-orange-600')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust cards */}
        <div className="max-w-4xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, bg: 'bg-emerald-500', border: 'border-emerald-100', title: 'Hoàn tiền 7 ngày', desc: '100% hoàn tiền nếu không hài lòng' },
              { icon: Lock,        bg: 'bg-blue-500',    border: 'border-blue-100',    title: 'Không tự gia hạn',  desc: 'Bạn chủ động, không bind thẻ' },
              { icon: Coffee,      bg: 'bg-amber-500',   border: 'border-amber-100',   title: 'Giá = 1 ly cà phê',  desc: '49.000đ / tháng — ai cũng mua được' },
            ].map(({ icon: Icon, bg, border, title, desc }) => (
              <div key={title} className={`bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl ${bg} text-white flex flex-shrink-0 items-center justify-center shadow-sm`}><Icon className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-800 mb-1">{title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Câu hỏi thường gặp</h2>
            <p className="text-slate-500">Mọi thứ bạn cần biết về bảng giá SmashMate</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const Icon = faq.icon;
              return (
                <div
                  key={idx}
                  id={`faq-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className={`border rounded-2xl overflow-hidden transition-all cursor-pointer ${
                    openFaqs.includes(idx) ? 'border-blue-200 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="p-4 md:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${faq.bg} ${faq.c}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className={`font-bold text-sm md:text-base ${
                        faq.highlight ? 'text-white bg-blue-500 px-3 py-1 rounded-lg' : 'text-slate-800'
                      }`}>{faq.q}</h4>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaqs.includes(idx) && 'a' in faq && (
                    <div className="px-4 md:px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 mt-2">
                      {(faq as any).a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="inline-flex items-center gap-2 bg-white/20 text-white backdrop-blur-sm px-5 py-2 rounded-full text-xs font-black tracking-widest mb-8 border border-white/20">
              <Crown className="w-4 h-4" /> NÂNG CẤP NGAY
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
              Sẵn sàng nâng cấp trải nghiệm?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 opacity-90 leading-relaxed">
              Dùng thử Pro 7 ngày miễn phí. Không cần thanh toán trước. Hủy bất cứ lúc nào.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button id="cta-pro" className="w-full sm:w-auto bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" /> Dùng Thử Pro Miễn Phí
              </button>
              <button id="cta-free" className="w-full sm:w-auto bg-transparent border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition flex items-center justify-center gap-2">
                Tiếp tục dùng Free →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
