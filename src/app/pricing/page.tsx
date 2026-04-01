'use client';

import React, { useState } from 'react';
import {
  Sparkles, Check, ChevronDown, Coffee, ShieldCheck, Lock,
  Users, MapPin, MessageSquare, Star, Crown, Building2, Zap, X, Gift, Bell
} from 'lucide-react';

const COMPARE_DATA = [
  { name: 'Feed 7 danh m\u1ee5c + b\u1ed9 l\u1ecdc',            free: true,        pro: true,         bus: true },
  { name: 'B\u1ea3n \u0111\u1ed3 s\u00e2n + ch\u1ec9 \u0111\u01b0\u1eddng',          free: true,        pro: true,         bus: true },
  { name: 'L\u1ecdc kho\u1ea3ng c\u00e1ch',                     free: true,        pro: true,         bus: true },
  { name: 'Premium request',                  free: '500/ng\u00e0y',   pro: '2000/ng\u00e0y',  bus: '3000/ng\u00e0y' },
  { name: 'AI Search',                        free: '50/ng\u00e0y',    pro: '100/ng\u00e0y',   bus: '200/ng\u00e0y'  },
  { name: 'L\u01b0u b\u00e0i quan t\u00e2m',                 free: '10 b\u00e0i',    pro: '50 b\u00e0i',     bus: '200 b\u00e0i'   },
  { name: 'Nh\u1eafc l\u1ecbch t\u1ef1 \u0111\u1ed9ng',              free: '5 preset',  pro: '20 preset',  bus: '50 preset' },
  { name: 'Kh\u00f4ng qu\u1ea3ng c\u00e1o',                  free: false,       pro: true,         bus: true },
  { name: 'Badge profile',                    free: false,       pro: 'Pro',        bus: 'Verified'  },
  { name: 'Analytics b\u00e0i \u0111\u0103ng',              free: false,       pro: true,         bus: true },
  { name: 'Claim profile s\u00e2n',               free: false,       pro: false,        bus: true },
  { name: 'Dashboard analytics s\u00e2n',         free: false,       pro: false,        bus: true },
  { name: 'Ghim b\u00e0i \u0111\u1ea7u feed',               free: false,       pro: false,        bus: '2 b\u00e0i/th\u00e1ng' },
  { name: 'H\u1ed7 tr\u1ee3 \u01b0u ti\u00ean',                 free: false,       pro: false,        bus: true },
];

const FAQS = [
  { q: 'C\u00f3 b\u1ecb t\u1ef1 \u0111\u1ed9ng gia h\u1ea1n kh\u00f4ng?',      icon: Lock,        bg: 'bg-emerald-50', c: 'text-emerald-500' },
  { q: 'Thanh to\u00e1n b\u1eb1ng c\u00e1ch n\u00e0o?',         icon: Zap,         bg: 'bg-blue-50',    c: 'text-blue-500'   },
  { q: 'N\u1ebfu kh\u00f4ng h\u00e0i l\u00f2ng th\u00ec sao?',  icon: ShieldCheck, bg: 'bg-emerald-50', c: 'text-emerald-500' },
  { q: 'Free \u0111\u00e3 \u0111\u1ee7 d\u00f9ng ch\u01b0a?',            icon: Gift,        bg: 'bg-rose-50',    c: 'text-rose-500',
    highlight: true, a: 'V\u1edbi ng\u01b0\u1eddi ch\u01a1i b\u00ecnh th\u01b0\u1eddng th\u1ec9nh tho\u1ea3ng t\u00ecm k\u00e8o 1-2 l\u1ea7n/tu\u1ea7n th\u00ec g\u00f3i Free ho\u00e0n to\u00e0n \u0111\u00e1p \u1ee9ng t\u1ed1t v\u1edbi 500 request m\u1ed7i ng\u00e0y.' },
  { q: 'Business ph\u00f9 h\u1ee3p v\u1edbi ai?',          icon: Building2,   bg: 'bg-amber-50',   c: 'text-amber-500',
    highlight: true, a: 'D\u00e0nh cho CLB, ch\u1ee7 s\u00e2n l\u00f4ng, c\u1ea7n c\u00f4ng c\u1ee5 t\u1ef1 \u0111\u1ed9ng \u0111\u0103ng b\u00e0i ph\u1ee7 s\u00f3ng v\u00e0 nh\u1eadn l\u1ecbch th\u00f4ng b\u00e1o t\u1ef1 \u0111\u1ed9ng m\u1ed7i ng\u00e0y.' },
  { q: 'C\u00f3 g\u00f3i d\u00f9ng th\u1eed kh\u00f4ng?',           icon: Gift,        bg: 'bg-purple-50',  c: 'text-purple-500' },
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

  const proPrice = billing === 'thang' ? '49.000\u0111' : billing === 'quy' ? '39.000\u0111' : '33.000\u0111';

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 w-full pb-20">

        {/* Hero */}
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 mb-6">
            <Sparkles className="w-4 h-4" /> B\u1ea2NG GI\u00c1 SMASHMATE
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Gi\u00e1 ph\u00f9 h\u1ee3p <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">cho b\u1ea1n</span>
          </h1>
          <p className="text-xl text-slate-500 mb-8 font-medium">Pro cho tr\u1ea3i nghi\u1ec7m kh\u00f4ng gi\u1edbi h\u1ea1n.</p>
          <p className="text-slate-800 font-medium mb-12">
            Ch\u1ec9 t\u1eeb <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mx-1"><Coffee className="w-4 h-4" /> 49.000\u0111/th\u00e1ng</span> \u2014 b\u1eb1ng 1 ly c\u00e0 ph\u00ea
          </p>

          {/* Billing toggle */}
          <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mx-auto mb-12">
            {([['thang', 'Th\u00e1ng', ''], ['quy', 'Qu\u00fd', '-20%'], ['nam', 'N\u0103m', '-32%']] as const).map(([val, label, badge]) => (
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
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
              <div className="mt-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-200 shadow-sm"><Zap className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Free</h3>
                  <p className="text-xs text-slate-500">Tho\u1ea3i m\u00e1i t\u00ecm k\u00e8o, kh\u00f4ng c\u1ea7n tr\u1ea3 ph\u00ed</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-slate-900">0\u0111</span><span className="text-slate-500 ml-2">/ th\u00e1ng</span></div>
              <button id="btn-free" className="w-full bg-slate-50 text-slate-800 border border-slate-200 font-bold py-3.5 rounded-xl mb-8 hover:bg-slate-100 transition">D\u00f9ng ngay \u2014 Mi\u1ec5n ph\u00ed</button>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['Feed 7 tabs + b\u1ed9 l\u1ecdc \u0111\u1ea7y \u0111\u1ee7','B\u1ea3n \u0111\u1ed3 s\u00e2n + ch\u1ec9 \u0111\u01b0\u1eddng','AI Search \u2014 50 l\u01b0\u1ee3t/ng\u00e0y','Premium request \u2014 500 l\u01b0\u1ee3t/ng\u00e0y','L\u01b0u quan t\u00e2m \u2014 t\u1ed1i \u0111a 10 b\u00e0i','Nh\u1eafc l\u1ecbch \u2014 t\u1ed1i \u0111a 5 preset'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Pro (highlighted) */}
            <div className="bg-white border-2 border-blue-400 rounded-[2rem] p-6 shadow-[0_12px_40px_rgba(59,130,246,0.15)] flex flex-col md:-translate-y-4 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 text-xs font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm border border-blue-200">
                <Star className="w-3.5 h-3.5 fill-blue-600" /> PH\u1ed4 BI\u1ebeN NH\u1ea4T
              </div>
              <div className="mt-8 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)]"><Crown className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Pro</h3>
                  <p className="text-xs text-slate-500">Cho l\u00f4ng th\u1ee7 mu\u1ed1n kh\u00f4ng b\u1ecf l\u1ee1 k\u00e8o n\u00e0o</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-sky-500">{proPrice}</span><span className="text-slate-500 ml-2">/ th\u00e1ng</span></div>
              <button id="btn-pro" className="w-full bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl mb-2 shadow-[0_6px_16px_rgba(124,58,237,0.3)] hover:bg-[#6d28d9] transition">B\u1eaft \u0111\u1ea7u d\u00f9ng Pro</button>
              <div className="text-center text-xs text-sky-500 font-bold mb-6 flex items-center justify-center gap-1"><Gift className="w-3.5 h-3.5" /> 7 ng\u00e0y d\u00f9ng th\u1eed mi\u1ec5n ph\u00ed</div>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['T\u1ea5t c\u1ea3 t\u00ednh n\u0103ng Free +','AI Search \u2014 100 l\u01b0\u1ee3t/ng\u00e0y','Premium request \u2014 2000 l\u01b0\u1ee3t/ng\u00e0y','L\u01b0u quan t\u00e2m \u2014 50 b\u00e0i','Nh\u1eafc l\u1ecbch \u2014 20 preset'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="bg-orange-50/30 border border-orange-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
              <div className="mt-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f97316] rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)]"><Building2 className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Business</h3>
                  <p className="text-xs text-slate-500">Cho ch\u1ee7 s\u00e2n, HLV v\u00e0 c\u00e2u l\u1ea1c b\u1ed9</p>
                </div>
              </div>
              <div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-slate-900">199.000\u0111</span><span className="text-slate-500 ml-2">/ th\u00e1ng</span></div>
              <button id="btn-business" className="w-full bg-[#f43f5e] text-white font-bold py-3.5 rounded-xl mb-8 shadow-[0_6px_16px_rgba(244,63,94,0.3)] hover:bg-[#e11d48] transition">Li\u00ean h\u1ec7 t\u01b0 v\u1ea5n</button>
              <ul className="space-y-4 flex-1 text-sm text-slate-700 font-medium">
                {['T\u1ea5t c\u1ea3 t\u00ednh n\u0103ng Pro +','K\u1ebft qu\u1ea3 nh\u1eafc l\u1ecbch m\u1ed7i l\u1ea7n t\u1ea3i \u2014 100 b\u00e0i','Claim profile s\u00e2n c\u1ea7u l\u00f4ng','Dashboard analytics s\u00e2n','T\u1ef1 \u0111\u0103ng s\u00e2n tr\u1ed1ng & khuy\u1ebfn m\u00e3i'].map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-sky-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">T\u1ea5t c\u1ea3 t\u00ednh n\u0103ng theo t\u1eebng g\u00f3i</h2>
            <p className="text-slate-500">Xem ch\u00ednh x\u00e1c b\u1ea1n nh\u1eadn \u0111\u01b0\u1ee3c g\u00ec</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-x-auto shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-6 px-6 font-bold text-base w-1/3">T\u00ednh n\u0103ng</th>
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
              { icon: ShieldCheck, bg: 'bg-emerald-500', border: 'border-emerald-100', title: 'Ho\u00e0n ti\u1ec1n 7 ng\u00e0y', desc: '100% ho\u00e0n ti\u1ec1n n\u1ebfu kh\u00f4ng h\u00e0i l\u00f2ng' },
              { icon: Lock,        bg: 'bg-blue-500',    border: 'border-blue-100',    title: 'Kh\u00f4ng t\u1ef1 gia h\u1ea1n',  desc: 'B\u1ea1n ch\u1ee7 \u0111\u1ed9ng, kh\u00f4ng bind th\u1ebb' },
              { icon: Coffee,      bg: 'bg-amber-500',   border: 'border-amber-100',   title: 'Gi\u00e1 = 1 ly c\u00e0 ph\u00ea',  desc: '49.000\u0111 / th\u00e1ng \u2014 ai c\u0169ng mua \u0111\u01b0\u1ee3c' },
            ].map(({ icon: Icon, bg, border, title, desc }) => (
              <div key={title} className={`bg-white border ${border} rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition`}>
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
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">C\u00e2u h\u1ecfi th\u01b0\u1eddng g\u1eb7p</h2>
            <p className="text-slate-500">M\u1ecdi th\u1ee9 b\u1ea1n c\u1ea7n bi\u1ebft v\u1ec1 b\u1ea3ng gi\u00e1 SmashMate</p>
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
              <Crown className="w-4 h-4" /> N\u00c2NG C\u1ea4P NGAY
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
              S\u1eb5n s\u00e0ng n\u00e2ng c\u1ea5p tr\u1ea3i nghi\u1ec7m?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 opacity-90 leading-relaxed">
              D\u00f9ng th\u1eed Pro 7 ng\u00e0y mi\u1ec5n ph\u00ed. Kh\u00f4ng c\u1ea7n thanh to\u00e1n tr\u01b0\u1edbc. H\u1ee7y b\u1ea5t c\u1ee9 l\u00fac n\u00e0o.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button id="cta-pro" className="w-full sm:w-auto bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" /> D\u00f9ng Th\u1eed Pro Mi\u1ec5n Ph\u00ed
              </button>
              <button id="cta-free" className="w-full sm:w-auto bg-transparent border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition flex items-center justify-center gap-2">
                Ti\u1ebfp t\u1ee5c d\u00f9ng Free \u2192
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
