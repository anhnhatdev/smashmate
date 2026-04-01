'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Plus, Camera, Sparkles, Check, Edit3, Shield, Info, Zap, Trash2, Clock, Calendar
} from 'lucide-react';

const LEVELS = ['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','TBK','Kh\u00e1'];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab]     = useState('ho-so');
  const [selectedLevel, setSelectedLevel] = useState('TBY');
  const [myPosts, setMyPosts]         = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isSaving, setIsSaving]       = useState(false);
  const [saveMsg, setSaveMsg]         = useState('');
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', fbLink: '', address: '' });

  // Load profile on mount
  useEffect(() => {
    if (!session) return;
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => {
        if (!d.success) return;
        const u = d.user;
        setProfileForm({ name: u.name ?? '', phone: u.phone ?? '', fbLink: u.fbLink ?? '', address: u.address ?? '' });
        setSelectedLevel(u.level ?? 'TBY');
      })
      .catch(console.error);
  }, [session]);

  // Load my posts when tab changes
  useEffect(() => {
    if (activeTab !== 'bai-dang' || !session) return;
    setLoadingPosts(true);
    fetch('/api/posts?isMyPosts=true')
      .then(r => r.json())
      .then(d => { if (d.success) setMyPosts(d.posts); })
      .catch(console.error)
      .finally(() => setLoadingPosts(false));
  }, [activeTab, session]);

  const handleSaveProfile = async () => {
    setIsSaving(true); setSaveMsg('');
    try {
      const res  = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileForm, level: selectedLevel }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg('\u2713 ' + data.message);
        setTimeout(() => setSaveMsg(''), 3000);
      }
    } catch (err) {
      setSaveMsg('L\u1ed7i khi l\u01b0u');
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('B\u1ea1n c\u00f3 ch\u1eafc ch\u1eafn mu\u1ed1n x\u00f3a b\u00e0i n\u00e0y?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) setMyPosts(prev => prev.filter(p => p.id !== id));
      else alert('L\u1ed7i khi x\u00f3a b\u00e0i');
    } catch (err) { console.error(err); }
  };

  const TABS = [
    { id: 'ho-so',    label: 'H\u1ed3 s\u01a1' },
    { id: 'bai-dang', label: 'B\u00e0i \u0111\u00e3 \u0111\u0103ng' },
    { id: 'thong-ke', label: 'Th\u1ed1ng k\u00ea' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 py-8 md:py-10">

        {/* Tab bar */}
        <div className="flex overflow-x-auto hide-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-max mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              id={`profile-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${
                activeTab === tab.id ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Blue gradient banner */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_8px_30px_rgba(14,165,233,0.2)] mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="text-white relative z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">H\u1ed3 s\u01a1 c\u00e1 nh\u00e2n</h1>
            <p className="text-blue-100 font-medium">Qu\u1ea3n l\u00fd th\u00f4ng tin c\u00e1 nh\u00e2n v\u00e0 c\u1ea5u h\u00ecnh li\u00ean h\u1ec7 hi\u1ec3n th\u1ecb tr\u00ean b\u00e0i \u0111\u0103ng.</p>
          </div>
          <button className="flex-shrink-0 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition shadow-sm backdrop-blur-md relative z-10">
            <Plus className="w-5 h-5" /> T\u1ea1o b\u00e0i
          </button>
        </div>

        {/* Identity card */}
        <div className="bg-white border text-center md:text-left border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-8 relative overflow-hidden">
          <div className="relative group cursor-pointer flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-blue-400 text-white flex items-center justify-center font-bold text-4xl shadow-md border-4 border-slate-50 overflow-hidden">
              {session?.user?.image
                ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                : (session?.user?.name?.[0]?.toUpperCase() ?? 'U')
              }
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity m-1">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-1 truncate">{session?.user?.name ?? 'Vui l\u00f2ng \u0111\u0103ng nh\u1eadp'}</h2>
            <p className="text-slate-500 mb-4 truncate">{session?.user?.email ?? 'email@example.com'}</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center shadow-inner">FREE</span>
              <button className="text-sky-500 text-xs font-bold flex items-center gap-1 hover:underline bg-sky-500/10 px-3 py-1.5 rounded-full transition hover:bg-sky-500/20">
                <Sparkles className="w-3.5 h-3.5" /> N\u00e2ng c\u1ea5p Pro
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'B\u00e0i \u0111\u0103ng h\u00f4m nay', value: 0, icon: <Info className="w-3.5 h-3.5" />, note: '\u0110\u00e3 d\u00f9ng trong gi\u1edbi h\u1ea1n 3 b\u00e0i/ng\u00e0y', accent: true },
            { label: 'AI search h\u00f4m nay',   value: 0, icon: <Sparkles className="w-3.5 h-3.5" /> },
            { label: 'Premium h\u00f4m nay',     value: 0, icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
          ].map((stat, i) => (
            <div key={i} className={`bg-white border ${stat.accent ? 'border-blue-100' : 'border-slate-200'} rounded-[1.5rem] p-6 shadow-sm hover:border-slate-300 transition flex flex-col`}>
              <div className={`text-xs font-bold ${stat.accent ? 'text-sky-500' : 'text-slate-500'} mb-2 flex items-center gap-1.5 tracking-wide uppercase`}>
                {stat.icon} {stat.label}
              </div>
              <div className="text-4xl font-black text-slate-800 mb-3">{stat.value}</div>
              {stat.note && <div className="text-xs font-medium text-slate-400 mt-auto flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> {stat.note}</div>}
            </div>
          ))}
        </div>

        {/* ── TAB: my posts ── */}
        {activeTab === 'bai-dang' && (
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-sky-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Qu\u1ea3n l\u00fd B\u00e0i \u0111\u0103ng</h2>
                <p className="text-slate-500 text-sm">Xem v\u00e0 ki\u1ec3m so\u00e1t c\u00e1c k\u00e8o \u0111\u1ea5u b\u1ea1n \u0111\u00e3 \u0111\u0103ng</p>
              </div>
            </div>
            {loadingPosts ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-3" />
                <p className="font-medium text-sm">\u0110ang t\u1ea3i...</p>
              </div>
            ) : myPosts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500 font-medium">B\u1ea1n ch\u01b0a \u0111\u0103ng b\u00e0i tuy\u1ec3n k\u00e8o n\u00e0o.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myPosts.map(post => (
                  <div key={post.id} className="border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition shadow-sm bg-slate-50/30">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-slate-800 text-lg">T\u00ecm K\u00e8o: s\u00e2n {post.courtName || 'Ch\u01b0a c\u00f3 t\u00ean'}</h3>
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5 text-blue-600"><Calendar className="w-4 h-4" /> {new Date(post.eventDate).toLocaleDateString('vi-VN')}</div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.startTime} - {post.endTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4" /> S\u1eeda
                      </button>
                      <button
                        id={`delete-post-${post.id}`}
                        onClick={() => deletePost(post.id)}
                        className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition shadow-sm flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> X\u00f3a
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: profile form ── */}
        {activeTab === 'ho-so' && (
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-sky-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Th\u00f4ng tin h\u1ed3 s\u01a1</h2>
                <p className="text-slate-500 text-sm">C\u1eadp nh\u1eadt th\u00f4ng tin \u0111\u1ec3 k\u1ebft b\u1ea1n d\u1ec5 d\u00e0ng h\u01a1n</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">T\u00ean hi\u1ec3n th\u1ecb <span className="text-rose-500">*</span></label>
                <input
                  id="profile-name"
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Nh\u1eadp t\u00ean hi\u1ec3n th\u1ecb"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">S\u1ed1 \u0111i\u1ec7n tho\u1ea1i</label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="09xx xxx xxx"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Link Facebook c\u00e1 nh\u00e2n</label>
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition overflow-hidden">
                  <div className="bg-slate-100/50 text-slate-400 px-4 py-3.5 border-r border-slate-200 font-mono text-sm hidden sm:block">facebook.com/</div>
                  <input
                    id="profile-fb"
                    type="text"
                    value={profileForm.fbLink}
                    onChange={e => setProfileForm(p => ({ ...p, fbLink: e.target.value }))}
                    placeholder="username"
                    className="w-full bg-transparent px-4 py-3.5 outline-none text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">S\u1ed1/\u0110\u01b0\u1eddng/Ph\u01b0\u1eddng</label>
                <input
                  id="profile-address"
                  type="text"
                  value={profileForm.address}
                  onChange={e => setProfileForm(p => ({ ...p, address: e.target.value }))}
                  placeholder="Ph\u01b0\u1eddng 12, Qu\u1eadn 10"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between">
                  Hi\u1ec3n th\u1ecb li\u00ean h\u1ec7
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border border-emerald-100">
                    <Shield className="w-3 h-3" /> B\u1ea3o m\u1eadt
                  </span>
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium cursor-pointer">
                  <option>C\u00f4ng khai</option>
                  <option defaultValue="selected">Ch\u1ec9 th\u00e0nh vi\u00ean \u0111\u0103ng nh\u1eadp</option>
                  <option>Ri\u00eang t\u01b0</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  Tr\u00ecnh \u0111\u1ed9 c\u1ee7a b\u1ea1n
                  <div className="group relative cursor-help">
                    <Info className="w-4 h-4 text-slate-300 hover:text-sky-500 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] bg-slate-800 text-white text-xs p-3 rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition shadow-xl z-10 pointer-events-none leading-relaxed text-center">
                      Gi\u00fap h\u1ec7 th\u1ed1ng v\u00e0 ng\u01b0\u1eddi ch\u01a1i kh\u00e1c gh\u00e9p b\u1ea1n v\u00e0o c\u00e1c k\u00e8o ph\u00f9 h\u1ee3p.
                    </div>
                  </div>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {LEVELS.map(lvl => (
                    <button
                      key={lvl}
                      id={`profile-level-${lvl}`}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        selectedLevel === lvl
                          ? 'bg-blue-50 border-sky-500 text-sky-500 shadow-inner ring-1 ring-sky-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {saveMsg && <span className="text-emerald-600 text-sm font-bold">{saveMsg}</span>}
              <button
                id="btn-save-profile"
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full sm:w-auto bg-sky-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_4px_14px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60"
              >
                {isSaving
                  ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> \u0110ang l\u01b0u...</>
                  : <><Check className="w-5 h-5" /> L\u01b0u thay \u0111\u1ed5i</>}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
