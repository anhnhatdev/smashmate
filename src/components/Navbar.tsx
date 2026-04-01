'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Heart, Bell, Coffee, Palette, X, MessageSquare, Star, Send, Check, Facebook, LogOut, Fingerprint, ChevronRight } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'ungho' | 'gopy' | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState('HCM');
  const [selectedTheme, setSelectedTheme] = useState('S\u00e1ng');
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);

  const THEMES = [
    { name: 'S\u00e1ng', icon: '\u2600\ufe0f', bg: 'bg-white', stroke: 'bg-slate-200', ball: 'bg-blue-500', themeBg: 'bg-white', textColor: 'text-slate-800' },
    { name: 'T\u1ed1i', icon: '\ud83c\udf19', bg: 'bg-slate-800', stroke: 'bg-slate-600', ball: 'bg-slate-400', themeBg: 'bg-slate-900', textColor: 'text-white' },
    { name: '\u0110\u1ea1i D\u01b0\u01a1ng', icon: '\ud83c\udf0a', bg: 'bg-blue-100', stroke: 'bg-blue-300', ball: 'bg-blue-500', themeBg: 'bg-sky-50', textColor: 'text-blue-900' },
    { name: 'R\u1eebng Xanh', icon: '\ud83c\udf3f', bg: 'bg-emerald-100', stroke: 'bg-emerald-300', ball: 'bg-emerald-500', themeBg: 'bg-emerald-50', textColor: 'text-emerald-900' },
    { name: 'Ho\u00e0ng H\u00f4n', icon: '\ud83c\udf05', bg: 'bg-orange-100', stroke: 'bg-orange-300', ball: 'bg-orange-500', themeBg: 'bg-orange-50', textColor: 'text-orange-900' },
    { name: 'Hoa H\u1ed3ng', icon: '\ud83c\udf38', bg: 'bg-rose-100', stroke: 'bg-rose-300', ball: 'bg-rose-500', themeBg: 'bg-rose-50', textColor: 'text-rose-900' },
  ];

  const LOCATIONS = [
    { id: 'HANOI', name: 'H\u00e0 N\u1ed9i' },
    { id: 'HCM',   name: 'TP.HCM' },
    { id: 'DANANG',name: '\u0110\u00e0 N\u1eb5ng' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl">\ud83c\udff8</span>
              <span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:block">
                Giao l\u01b0u <span className="text-[#0ea5e9]">C\u1ea7u L\u00f4ng</span>
              </span>
            </Link>

            {isLoggedIn ? (
              <div className="hidden md:flex gap-1 bg-white items-center">
                <Link href="/feed"     className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">T\u00ecm k\u00e8o</Link>
                <Link href="/san"      className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">S\u00e2n</Link>
                <Link href="/xep-hang" className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">X\u1ebfp h\u1ea1ng</Link>
                <Link href="/pricing"  className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">S\u1eed d\u1ee5ng</Link>
              </div>
            ) : (
              <div className="hidden md:flex bg-slate-100 p-1 rounded-full gap-1">
                <Link href="/feed"     className="px-5 py-1.5 rounded-full text-sm font-medium bg-white text-slate-800 shadow-sm">T\u00ecm k\u00e8o</Link>
                <Link href="/san"      className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">S\u00e2n</Link>
                <Link href="/xep-hang" className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">X\u1ebfp h\u1ea1ng</Link>
                <Link href="/pricing"  className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">S\u1eed d\u1ee5ng</Link>
              </div>
            )}

            <div className="flex items-center gap-3">
              {isLoggedIn && (
                <button onClick={() => setIsLocationModalOpen(true)} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {LOCATIONS.find(l => l.id === selectedLocation)?.name || 'TP.HCM'}
                </button>
              )}

              <div className="relative">
                <button onClick={() => setIsAppearanceOpen(!isAppearanceOpen)} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                  <Palette className="h-3.5 w-3.5 text-slate-500" />
                  <span className={`w-2.5 h-2.5 rounded-full border border-slate-200 shadow-inner ${selectedTheme === 'S\u00e1ng' ? 'bg-white' : THEMES.find(t => t.name === selectedTheme)?.ball}`} />
                  {selectedTheme.split(' ')[0]}
                </button>
                {isAppearanceOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAppearanceOpen(false)} />
                    <div className="absolute top-[calc(100%+12px)] right-0 w-[340px] bg-white border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-3xl p-5 z-50">
                      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-700"><Palette className="w-4 h-4 text-slate-400" /> Ch\u1ecdn giao di\u1ec7n</div>
                      <div className="grid grid-cols-2 gap-3">
                        {THEMES.map(theme => (
                          <div key={theme.name} onClick={() => { setSelectedTheme(theme.name); setIsAppearanceOpen(false); }} className={`relative border rounded-2xl p-3 cursor-pointer transition flex flex-col items-center justify-center gap-2 ${selectedTheme === theme.name ? 'border-[#0ea5e9] bg-[#f0f9ff]' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}>
                            <div className={`w-24 h-10 rounded-lg shadow-sm flex items-center justify-center p-2 border border-slate-100 overflow-hidden ${theme.themeBg}`}>
                              <div className={`w-full h-full rounded ${theme.bg} border border-slate-200 shadow-sm flex items-center px-1`}>
                                <div className={`w-4 h-1.5 rounded-full ${theme.stroke} mr-auto`} />
                                <div className={`w-2 h-2 rounded-full ${theme.ball}`} />
                              </div>
                            </div>
                            <div className={`text-xs font-bold flex items-center gap-1.5 ${theme.textColor}`}><span>{theme.icon}</span> {theme.name}</div>
                            {selectedTheme === theme.name && <div className="absolute top-2 right-2 w-5 h-5 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button onClick={() => setSupportTab('ungho')} className="hidden lg:flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 shadow-sm transition">
                <Coffee className="h-3.5 w-3.5" /> \u1ee2ng h\u1ed9 &amp; G\u00f3p \u00fd
              </button>
              <Link href="/interests" title="Quan t\u00e2m" className="h-9 w-9 flex items-center justify-center rounded-full text-rose-500 hover:bg-rose-50 transition-colors">
                <Heart className="h-4.5 w-4.5" />
              </Link>
              <Link href="/reminders" title="Nh\u1eafc l\u1ecbch" className="h-9 w-9 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-50 transition-colors mr-1 sm:mr-2 relative">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </Link>

              {isLoggedIn ? (
                <div onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full pr-4 border border-transparent hover:border-slate-200 transition">
                  <div className="w-8 h-8 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden">
                    {session!.user?.image ? <img src={session!.user.image} alt="Avatar" className="w-full h-full object-cover" /> : (session!.user?.name?.[0]?.toUpperCase() || 'U')}
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden xl:block line-clamp-1 max-w-[120px]">{session!.user?.name || 'User'}</span>
                </div>
              ) : (
                <button onClick={() => setIsLoginModalOpen(true)} className="hidden md:flex bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all items-center gap-2">
                  \u0110\u0103ng nh\u1eadp
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* LOCATION MODAL */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" onClick={() => setIsLocationModalOpen(false)} />
          <div className="bg-white rounded-[2rem] p-6 max-w-[360px] w-full relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <button onClick={() => setIsLocationModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 p-2 rounded-full transition"><X className="w-5 h-5" /></button>
            <div className="w-16 h-16 bg-[#e0f2fe] text-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-4 mt-2"><MapPin className="w-7 h-7 stroke-[2.5]" /></div>
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-1">Ch\u1ecdn khu v\u1ef1c</h3>
            <p className="text-center text-slate-500 text-sm mb-6 leading-relaxed px-2">\u0110\u1ed5i khu v\u1ef1c \u0111\u1ec3 c\u1eadp nh\u1eadt d\u1eef li\u1ec7u theo \u0111\u1ecba \u0111i\u1ec3m m\u1edbi</p>
            <div className="space-y-3 mb-6">
              {LOCATIONS.map(loc => (
                <div key={loc.id} onClick={() => { setSelectedLocation(loc.id); setIsLocationModalOpen(false); }} className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${selectedLocation === loc.id ? 'bg-[#e0f2fe] border-[#0ea5e9]' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="font-bold text-base">{loc.name}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{loc.id}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 font-medium">B\u1ea1n c\u00f3 th\u1ec3 thay \u0111\u1ed5i b\u1ea5t c\u1ee9 l\u00fac n\u00e0o</p>
          </div>
        </div>
      )}

      {/* SUPPORT MODAL */}
      {supportTab !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSupportTab(null)} />
          <div className="bg-white rounded-[2rem] max-w-lg w-full relative z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex border-b border-slate-100 relative">
              {(['ungho', 'gopy'] as const).map(tab => (
                <button key={tab} onClick={() => setSupportTab(tab)} className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition ${supportTab === tab ? (tab === 'ungho' ? 'border-amber-500 text-amber-600' : 'border-[#0ea5e9] text-[#0ea5e9]') : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
                  {tab === 'ungho' ? <><Coffee className="w-4 h-4" /> \u1ee2ng h\u1ed9</> : <><MessageSquare className="w-4 h-4" /> G\u00f3p \u00fd</>}
                </button>
              ))}
              <div className="absolute top-1/2 -translate-y-1/2 right-3"><button onClick={() => setSupportTab(null)} className="p-1.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-full hover:bg-slate-100 transition"><X className="w-4 h-4" /></button></div>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto">
              {supportTab === 'ungho' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center"><Coffee className="w-8 h-8 text-amber-700" /></div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">C\u1ea3m \u01a1n b\u1ea1n!</h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-[280px] mx-auto">N\u1ebfu th\u1ea5y <span className="font-bold text-[#0ea5e9]">SmashMate</span> h\u1eefu \u00edch, h\u00e3y \u1ee7ng h\u1ed9 m\u00ecnh m\u1ed9t ly c\u00e0 ph\u00ea!</p>
                  <div className="bg-amber-50 text-amber-700 text-xs font-semibold p-4 rounded-xl border border-amber-100">
                    \ud83d\ude4f M\u1ecdi \u0111\u00f3ng g\u00f3p \u0111\u1ec1u gi\u00fap duy tr\u00ec n\u1ec1n t\u1ea3ng mi\u1ec5n ph\u00ed!
                  </div>
                </div>
              )}
              {supportTab === 'gopy' && (
                <div>
                  <h3 className="text-center font-bold text-slate-700 mb-4">B\u1ea1n th\u1ea5y SmashMate th\u1ebf n\u00e0o?</h3>
                  <div className="flex justify-center gap-2 mb-8">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} onClick={() => setRating(star)} className={`w-10 h-10 cursor-pointer transition-all hover:scale-110 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-200'}`} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[{id:'bug',label:'L\u1ed7i/Bug'},{id:'idea',label:'\u00dd t\u01b0\u1edfng'},{id:'ux',label:'UX'},{id:'other',label:'Kh\u00e1c'}].map(t => (
                      <button key={t.id} onClick={() => setFeedbackType(feedbackType===t.id?null:t.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${feedbackType===t.id ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t.label}</button>
                    ))}
                  </div>
                  <textarea placeholder="Vi\u1ebft g\u00f3p \u00fd..." className="w-full border border-slate-200 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] min-h-[120px] mb-4" />
                  <button className="w-full bg-[#0ea5e9] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"><Send className="w-5 h-5" /> G\u1eedi g\u00f3p \u00fd</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)} />
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-sm w-full relative z-10 shadow-2xl">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-5 right-5 text-slate-400 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition"><X className="w-5 h-5" /></button>
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6"><span className="text-4xl">\ud83c\udff8</span></div>
            <h3 className="text-2xl font-extrabold text-center text-slate-800 mb-2">\u0110\u0103ng nh\u1eadp <span className="text-[#0ea5e9]">SmashMate</span></h3>
            <p className="text-center text-slate-500 text-sm mb-10 font-medium">C\u00f9ng 10,000+ l\u00f4ng th\u1ee7 k\u1ebft n\u1ed1i m\u1ed7i ng\u00e0y.</p>
            <div className="space-y-3 mb-8">
              <button onClick={() => signIn('google')} className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-2xl px-4 py-3.5 flex items-center justify-center gap-3 transition shadow-sm font-bold text-slate-700">
                <GoogleIcon /> Ti\u1ebfp t\u1ee5c v\u1edbi Google
              </button>
              <button onClick={() => signIn('facebook')} className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-2xl px-4 py-3.5 flex items-center justify-center gap-3 transition font-bold">
                <Facebook className="w-5 h-5 fill-white stroke-none" /> Ti\u1ebfp t\u1ee5c v\u1edbi Facebook
              </button>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> \u0110\u0103ng nh\u1eadp nhanh, an to\u00e0n
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE DRAWER */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)} />
          <div className="bg-white w-full max-w-[360px] h-full relative z-10 shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="bg-gradient-to-br from-[#0ea5e9] to-blue-600 text-white p-6 pb-8 relative shrink-0">
              <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"><X className="w-4 h-4" /></button>
              <h2 className="font-bold text-lg mb-6">H\u1ed3 s\u01a1 c\u1ee7a t\u00f4i</h2>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center font-bold text-4xl shadow-lg mb-4 overflow-hidden">
                  {session?.user?.image ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" /> : (session?.user?.name?.[0]?.toUpperCase() || 'U')}
                </div>
                <div className="text-xl font-extrabold mb-1.5">{session?.user?.name || 'Ng\u01b0\u1eddi d\u00f9ng m\u1edbi'}</div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Th\u00e0nh vi\u00ean</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6 flex flex-col gap-6">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Email</div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <span className="font-medium text-slate-700 text-sm truncate">{session?.user?.email || 'Ch\u01b0a c\u1eadp nh\u1eadt'}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">T\u00e0i kho\u1ea3n</div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <Fingerprint className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-0.5">ID</div>
                    <div className="font-mono text-sm text-slate-700">usr_9x...2a4</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">
              <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 font-bold transition">
                M\u1edf trang h\u1ed3 s\u01a1 <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <button onClick={() => { setIsProfileOpen(false); signOut(); }} className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 font-bold transition">
                <LogOut className="w-5 h-5" /> \u0110\u0103ng xu\u1ea5t
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
