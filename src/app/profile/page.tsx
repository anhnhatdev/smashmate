'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Plus, Camera, Sparkles, Check, Edit3, Shield, Info, Zap, Trash2, Clock, Calendar
} from 'lucide-react';

const LEVELS = ['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','TBK','Khá'];

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
        setSaveMsg('✓ ' + data.message);
        setTimeout(() => setSaveMsg(''), 3000);
      }
    } catch (err) {
      setSaveMsg('Lỗi khi lưu');
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài này?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) setMyPosts(prev => prev.filter(p => p.id !== id));
      else alert('Lỗi khi xóa bài');
    } catch (err) { console.error(err); }
  };

  const TABS = [
    { id: 'ho-so',    label: 'Hồ sơ' },
    { id: 'bai-dang', label: 'Bài đã đăng' },
    { id: 'thong-ke', label: 'Thống kê' },
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
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">Hồ sơ cá nhân</h1>
            <p className="text-blue-100 font-medium">Quản lý thông tin cá nhân và cấu hình liên hệ hiển thị trên bài đăng.</p>
          </div>
          <button className="flex-shrink-0 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition shadow-sm backdrop-blur-md relative z-10">
            <Plus className="w-5 h-5" /> Tạo bài
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
            <h2 className="text-2xl font-extrabold text-slate-800 mb-1 truncate">{session?.user?.name ?? 'Vui lòng đăng nhập'}</h2>
            <p className="text-slate-500 mb-4 truncate">{session?.user?.email ?? 'email@example.com'}</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center shadow-inner">FREE</span>
              <button className="text-sky-500 text-xs font-bold flex items-center gap-1 hover:underline bg-sky-500/10 px-3 py-1.5 rounded-full transition hover:bg-sky-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Nâng cấp Pro
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Bài đăng hôm nay', value: 0, icon: <Info className="w-3.5 h-3.5" />, note: 'Đã dùng trong giới hạn 3 bài/ngày', accent: true },
            { label: 'AI search hôm nay',   value: 0, icon: <Sparkles className="w-3.5 h-3.5" /> },
            { label: 'Premium hôm nay',     value: 0, icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
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
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Quản lý Bài đăng</h2>
                <p className="text-slate-500 text-sm">Xem và kiểm soát các kèo đấu bạn đã đăng</p>
              </div>
            </div>
            {loadingPosts ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-3" />
                <p className="font-medium text-sm">Đang tải...</p>
              </div>
            ) : myPosts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500 font-medium">Bạn chưa đăng bài tuyển kèo nào.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myPosts.map(post => (
                  <div key={post.id} className="border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition shadow-sm bg-slate-50/30">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-slate-800 text-lg">Tìm Kèo: sân {post.courtName || 'Chưa có tên'}</h3>
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5 text-blue-600"><Calendar className="w-4 h-4" /> {new Date(post.eventDate).toLocaleDateString('vi-VN')}</div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.startTime} - {post.endTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4" /> Sửa
                      </button>
                      <button
                        id={`delete-post-${post.id}`}
                        onClick={() => deletePost(post.id)}
                        className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition shadow-sm flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Xóa
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
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Thông tin hồ sơ</h2>
                <p className="text-slate-500 text-sm">Cập nhật thông tin để kết bạn dễ dàng hơn</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tên hiển thị <span className="text-rose-500">*</span></label>
                <input
                  id="profile-name"
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Nhập tên hiển thị"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Link Facebook cá nhân</label>
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Số/Đường/Phường</label>
                <input
                  id="profile-address"
                  type="text"
                  value={profileForm.address}
                  onChange={e => setProfileForm(p => ({ ...p, address: e.target.value }))}
                  placeholder="Phường 12, Quận 10"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between">
                  Hiển thị liên hệ
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border border-emerald-100">
                    <Shield className="w-3 h-3" /> Bảo mật
                  </span>
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl px-4 py-3.5 outline-none transition text-slate-800 font-medium cursor-pointer">
                  <option>Công khai</option>
                  <option defaultValue="selected">Chỉ thành viên đăng nhập</option>
                  <option>Riêng tư</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  Trình độ của bạn
                  <div className="group relative cursor-help">
                    <Info className="w-4 h-4 text-slate-300 hover:text-sky-500 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] bg-slate-800 text-white text-xs p-3 rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition shadow-xl z-10 pointer-events-none leading-relaxed text-center">
                      Giúp hệ thống và người chơi khác ghép bạn vào các kèo phù hợp.
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
                  ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Đang lưu...</>
                  : <><Check className="w-5 h-5" /> Lưu thay đổi</>}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
