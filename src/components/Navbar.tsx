'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Heart, Bell, Coffee, Palette, X, MessageSquare, Star, Send, Check,
  Facebook, LogOut, Mail, Fingerprint, ChevronRight,
} from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

// Google brand SVG icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const THEMES = [
  { name: 'Sáng', icon: '☀️', bg: 'bg-white', stroke: 'bg-slate-200', ball: 'bg-blue-500', themeBg: 'bg-white', textColor: 'text-slate-800' },
  { name: 'Tối', icon: '🌙', bg: 'bg-slate-800', stroke: 'bg-slate-600', ball: 'bg-slate-400', themeBg: 'bg-slate-900', textColor: 'text-white' },
  { name: 'Đại Dương', icon: '🌊', bg: 'bg-blue-100', stroke: 'bg-blue-300', ball: 'bg-blue-500', themeBg: 'bg-sky-50', textColor: 'text-blue-900' },
  { name: 'Rừng Xanh', icon: '🌿', bg: 'bg-emerald-100', stroke: 'bg-emerald-300', ball: 'bg-emerald-500', themeBg: 'bg-emerald-50', textColor: 'text-emerald-900' },
  { name: 'Hoàng Hôn', icon: '🌅', bg: 'bg-orange-100', stroke: 'bg-orange-300', ball: 'bg-orange-500', themeBg: 'bg-orange-50', textColor: 'text-orange-900' },
  { name: 'Hoa Hồng', icon: '🌸', bg: 'bg-rose-100', stroke: 'bg-rose-300', ball: 'bg-rose-500', themeBg: 'bg-rose-50', textColor: 'text-rose-900' },
];

const LOCATIONS = [
  { id: 'HANOI', name: 'Hà Nội' },
  { id: 'HCM', name: 'TP.HCM' },
  { id: 'DANANG', name: 'Đà Nẵng' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'ungho' | 'gopy' | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState('HCM');
  const [selectedTheme, setSelectedTheme] = useState('Sáng');
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);

  return (
    <>
      {/* ── Sticky Navbar ── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl">🏸</span>
              <span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:block">
                Giao lưu <span className="text-[#0ea5e9]">Cầu Lông</span>
              </span>
            </Link>

            {/* Nav links */}
            {isLoggedIn ? (
              <div className="hidden md:flex gap-1 bg-white items-center">
                <Link href="/feed" className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Tìm kèo</Link>
                <Link href="/san" className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Sân</Link>
                <Link href="/xep-hang" className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Xếp hạng</Link>
                <Link href="/pricing" className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Sử dụng</Link>
              </div>
            ) : (
              <div className="hidden md:flex bg-slate-100 p-1 rounded-full gap-1">
                <Link href="/feed" className="px-5 py-1.5 rounded-full text-sm font-medium bg-white text-slate-800 shadow-sm">Tìm kèo</Link>
                <Link href="/san" className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">Sân</Link>
                <Link href="/xep-hang" className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">Xếp hạng</Link>
                <Link href="/pricing" className="px-5 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800">Sử dụng</Link>
              </div>
            )}

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Location picker (logged in only) */}
              {isLoggedIn && (
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border"
                >
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {LOCATIONS.find((l) => l.id === selectedLocation)?.name || 'TP.HCM'}
                </button>
              )}

              {/* Theme picker */}
              <div className="relative">
                <button
                  onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                >
                  <Palette className="h-3.5 w-3.5 text-slate-500" />
                  <span className={`w-2.5 h-2.5 rounded-full border border-slate-200 ${selectedTheme === 'Sáng' ? 'bg-white' : THEMES.find((t) => t.name === selectedTheme)?.ball}`} />
                  {selectedTheme.split(' ')[0]}
                </button>

                {isAppearanceOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAppearanceOpen(false)} />
                    <div className="absolute top-[calc(100%+12px)] right-0 w-[340px] bg-white border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-3xl p-5 z-50">
                      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-700">
                        <Palette className="w-4 h-4 text-slate-400" /> Chọn giao diện
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {THEMES.map((theme) => (
                          <div
                            key={theme.name}
                            onClick={() => { setSelectedTheme(theme.name); setIsAppearanceOpen(false); }}
                            className={`relative border rounded-2xl p-3 cursor-pointer transition flex flex-col items-center gap-2 ${
                              selectedTheme === theme.name
                                ? 'border-[#0ea5e9] bg-[#f0f9ff]'
                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-24 h-10 rounded-lg border border-slate-100 overflow-hidden ${theme.themeBg} flex items-center p-2`}>
                              <div className={`w-full h-full rounded ${theme.bg} border border-slate-200 flex items-center px-1`}>
                                <div className={`w-4 h-1.5 rounded-full ${theme.stroke} mr-auto`} />
                                <div className={`w-2 h-2 rounded-full ${theme.ball}`} />
                              </div>
                            </div>
                            <div className={`text-xs font-bold flex items-center gap-1.5 ${theme.textColor}`}>
                              <span>{theme.icon}</span> {theme.name}
                            </div>
                            {selectedTheme === theme.name && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Support button */}
              <button
                onClick={() => setSupportTab('ungho')}
                className="hidden lg:flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 shadow-sm transition"
              >
                <Coffee className="h-3.5 w-3.5" /> Ủng hộ &amp; Góp ý
              </button>

              {/* Interest & Reminder icons */}
              <Link href="/interests" title="Quan tâm" className="h-9 w-9 flex items-center justify-center rounded-full text-rose-500 hover:bg-rose-50 transition-colors">
                <Heart className="h-[18px] w-[18px]" />
              </Link>
              <Link href="/reminders" title="Nhắc lịch" className="h-9 w-9 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-50 transition-colors mr-1 sm:mr-2 relative">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </Link>

              {/* Auth: avatar or login button */}
              {isLoggedIn ? (
                <div
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full pr-4 border border-transparent hover:border-slate-200 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden">
                    {session.user?.image
                      ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                      : (session.user?.name?.[0]?.toUpperCase() || 'U')
                    }
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden xl:block line-clamp-1 max-w-[120px]">
                    {session.user?.name || 'User'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden md:flex bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all items-center gap-2"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── LOCATION MODAL ── */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" onClick={() => setIsLocationModalOpen(false)} />
          <div className="bg-white rounded-[2rem] p-6 max-w-[360px] w-full relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <button onClick={() => setIsLocationModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 p-2 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-[#e0f2fe] text-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
              <MapPin className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-1">Chọn khu vực</h3>
            <p className="text-center text-slate-500 text-sm mb-6 leading-relaxed">
              Đổi khu vực để cập nhật dữ liệu theo địa điểm mới
            </p>
            <div className="space-y-3 mb-6">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => { setSelectedLocation(loc.id); setIsLocationModalOpen(false); }}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${
                    selectedLocation === loc.id
                      ? 'bg-[#e0f2fe] border-[#0ea5e9] text-slate-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="font-bold text-base">{loc.name}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{loc.id}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 font-medium">Bạn có thể thay đổi khu vực bất cứ lúc nào</p>
          </div>
        </div>
      )}

      {/* ── SUPPORT & FEEDBACK MODAL ── */}
      {supportTab !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSupportTab(null)} />
          <div className="bg-white rounded-[2rem] max-w-lg w-full relative z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 relative">
              <button
                onClick={() => setSupportTab('ungho')}
                className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition ${
                  supportTab === 'ungho' ? 'border-[#d97706] text-[#d97706]' : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Coffee className="w-4 h-4" /> Ủng hộ
              </button>
              <button
                onClick={() => setSupportTab('gopy')}
                className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition ${
                  supportTab === 'gopy' ? 'border-[#0ea5e9] text-[#0ea5e9]' : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Góp ý
              </button>
              <div className="absolute top-1/2 -translate-y-1/2 right-3">
                <button onClick={() => setSupportTab(null)} className="p-1.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-full hover:bg-slate-100 hover:text-slate-600 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              {/* Tab: Ủng hộ */}
              {supportTab === 'ungho' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#e1cec7] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-[#5c3e35]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Cảm ơn bạn!</h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                    Nếu thấy <span className="font-bold text-[#0ea5e9]">SmashMate</span> hữu ích, hãy ủng hộ mình một ly cà phê!
                  </p>
                  <div className="border border-slate-200 rounded-3xl p-4 inline-block mb-6 shadow-sm bg-white">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://smashmate.vn/donate&color=0f172a&bgcolor=ffffff"
                      alt="QR Code ủng hộ"
                      className="w-[180px] h-[180px] rounded-xl mx-auto"
                    />
                    <div className="text-xs font-bold text-slate-500 mt-4 pt-3 border-t border-slate-100 tracking-widest uppercase">
                      SmashMate Sponsor
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 text-xs font-semibold p-4 rounded-xl border border-amber-100 max-w-[340px] mx-auto">
                    🙏 Mọi đóng góp đều giúp duy trì nền tảng miễn phí cho cộng đồng!
                  </div>
                </div>
              )}

              {/* Tab: Góp ý */}
              {supportTab === 'gopy' && (
                <div>
                  <h3 className="text-center font-bold text-slate-700 mb-4">Bạn thấy SmashMate thế nào?</h3>
                  <div className="flex justify-center gap-3 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-10 h-10 cursor-pointer transition-all hover:scale-110 ${
                          rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-500 mb-2">Loại góp ý (tuỳ chọn)</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'bug', icon: '🐛', label: 'Lỗi / Bug', activeClass: 'bg-emerald-50 border-emerald-200 text-emerald-700', inactiveClass: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
                        { id: 'idea', icon: '💡', label: 'Ý tưởng mới', activeClass: 'bg-amber-50 border-amber-200 text-amber-700', inactiveClass: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
                        { id: 'ux', icon: '🎨', label: 'Giao diện / UX', activeClass: 'bg-rose-50 border-rose-200 text-rose-700', inactiveClass: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
                        { id: 'other', icon: '💬', label: 'Khác', activeClass: 'bg-purple-50 border-purple-200 text-purple-700', inactiveClass: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFeedbackType(feedbackType === type.id ? null : type.id)}
                          className={`px-4 py-2 rounded-full text-xs font-bold border flex items-center gap-1.5 transition ${
                            feedbackType === type.id ? type.activeClass : type.inactiveClass
                          }`}
                        >
                          <span>{type.icon}</span> {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Viết góp ý, báo lỗi, hoặc chia sẻ ý tưởng..."
                    className="w-full border border-slate-200 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent min-h-[140px] bg-slate-50/50 mb-6"
                  />
                  <button className="w-full bg-[#0ea5e9] text-white font-bold py-4 rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-[#0284c7] transition flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Gửải góp ý
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ── */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)} />
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-sm w-full relative z-10 shadow-2xl">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-5 right-5 text-slate-400 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
              <span className="text-4xl">🏸</span>
            </div>
            <h3 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
              Đăng nhập <span className="text-[#0ea5e9]">SmashMate</span>
            </h3>
            <p className="text-center text-slate-500 text-sm mb-10 font-medium">
              Cùng 10,000+ lông thủ kết nối mỗi ngày.
            </p>
            <div className="space-y-3 mb-8">
              <button onClick={() => signIn('google')} className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-2xl px-4 py-3.5 flex items-center justify-center gap-3 transition font-bold text-slate-700">
                <GoogleIcon /> Tiếp tục với Google
              </button>
              <button onClick={() => signIn('facebook')} className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-2xl px-4 py-3.5 flex items-center justify-center gap-3 transition shadow-[0_4px_12px_rgba(24,119,242,0.3)] font-bold">
                <Facebook className="w-5 h-5 fill-white stroke-none" /> Tiếp tục với Facebook
              </button>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Đăng nhập nhanh, an toàn, không cần mật khẩu
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── USER PROFILE DRAWER ── */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)} />
          <div className="bg-white w-full max-w-[360px] h-full relative z-10 shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0ea5e9] to-blue-600 text-white p-6 pb-8 relative shrink-0">
              <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition">
                <X className="w-4 h-4" />
              </button>
              <h2 className="font-bold text-lg mb-6">Ố sơ của tôi</h2>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center font-bold text-4xl shadow-lg mb-4 overflow-hidden">
                  {session?.user?.image
                    ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                    : (session?.user?.name?.[0]?.toUpperCase() || 'U')
                  }
                </div>
                <div className="text-xl font-extrabold mb-1.5">{session?.user?.name || 'Người dùng mới'}</div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/20">Thành viên</div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6 flex flex-col gap-6">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Email</div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0ea5e9]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="font-medium text-slate-700 text-sm truncate">{session?.user?.email || 'Chưa cập nhật'}</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Thống kê</div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ value: '—', label: 'Tin đăng' }, { value: '—', label: 'Kèo' }, { value: '2026', label: 'Năm', highlight: true }].map((stat) => (
                    <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                      <div className={`text-xl font-black mb-1 ${stat.highlight ? 'text-[#0ea5e9]' : 'text-slate-800'}`}>{stat.value}</div>
                      <div className="text-[11px] font-bold text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tài khoản</div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-0.5">ID Người dùng</div>
                    <div className="font-mono text-sm text-slate-700">usr_9x...2a4</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">
              <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 font-bold transition">
                Mở trang hồ sơ <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <button
                onClick={() => { setIsProfileOpen(false); signOut(); }}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 font-bold transition shadow-[0_4px_12px_rgba(244,63,94,0.3)]"
              >
                <LogOut className="w-5 h-5" /> Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
