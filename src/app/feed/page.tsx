'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  MapPin, Heart, Sparkles, Search, SlidersHorizontal, Flame, Plus,
  Clock, Trophy, Users, ExternalLink, Share2, Banknote, Phone,
  ChevronDown, Check, MousePointerClick, GraduationCap, Shield,
  User, ShoppingBag, Gift, Facebook
} from 'lucide-react';
import CreatePostModal from '@/components/CreatePostModal';

const TABS = [
  { id: 'tuyen-keo', label: 'Tìm kèo',  icon: Users },
  { id: 'pass-san',  label: 'Pass sân', icon: MapPin },
  { id: 'mua-ban',   label: 'Mua bán',  icon: ShoppingBag },
  { id: 'lop-day',   label: 'Lớp dạy', icon: GraduationCap },
  { id: 'clb',       label: 'CLB',       icon: Shield },
  { id: 'tim-ban',   label: 'Tìm bạn', icon: User },
  { id: 'uu-dai',    label: 'Ưu đãi',  icon: Gift },
];

const LEVELS = ['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','TBK','Khá'];

export default function FeedPage() {
  const { data: session } = useSession();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const [activeTab, setActiveTab]       = useState('tuyen-keo');
  const [searchQuery, setSearchQuery]   = useState('');
  const [filterDate, setFilterDate]     = useState(new Date().toISOString().split('T')[0]);
  const [filterTimeFrom, setFilterTimeFrom] = useState('');
  const [filterTimeTo, setFilterTimeTo]     = useState('');
  const [filterLevels, setFilterLevels]     = useState<string[]>([]);
  const [filterSlots, setFilterSlots]       = useState('');
  const [filterRadius, setFilterRadius]     = useState('');
  const [userLocation, setUserLocation]     = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating]         = useState(false);

  const [posts, setPosts]           = useState<any[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [savedIds, setSavedIds]     = useState<Set<string>>(new Set());

  // ── fetch posts ──────────────────────────────────────────────
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        type:     activeTab,
        q:        searchQuery,
        date:     filterDate,
        timeFrom: filterTimeFrom,
        timeTo:   filterTimeTo,
        levels:   filterLevels.join(','),
        slots:    filterSlots,
        radius:   filterRadius,
        lat:      userLocation ? String(userLocation.lat) : '',
        lng:      userLocation ? String(userLocation.lng) : '',
      });
      const res  = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error('[FeedPage] fetchPosts', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, searchQuery, filterDate, filterTimeFrom, filterTimeTo,
     filterLevels, filterSlots, filterRadius, userLocation]);

  // load saved IDs on mount
  useEffect(() => {
    if (!session) return;
    fetch('/api/interests')
      .then(r => r.json())
      .then(d => { if (d.success) setSavedIds(new Set(d.interests.map((i: any) => i.id))); })
      .catch(() => {});
  }, [session]);

  // ── geolocation ───────────────────────────────────────────────
  const handleGetLocation = () => {
    setIsLocating(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        if (!filterRadius) setFilterRadius('5');
        setIsLocating(false);
      },
      () => { alert('Không thể lấy vị trí.'); setIsLocating(false); },
    );
  };

  // ── bookmark toggle ───────────────────────────────────────────
  const toggleSave = async (postId: string) => {
    if (!session) { alert('Vui lòng đăng nhập để lưu bài viết'); return; }
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
    try {
      await fetch('/api/interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
    } catch {
      // rollback on error
      setSavedIds(prev => {
        const next = new Set(prev);
        next.has(postId) ? next.delete(postId) : next.add(postId);
        return next;
      });
    }
  };

  const clearFilters = () => {
    setSearchQuery(''); setFilterDate(''); setFilterTimeFrom('');
    setFilterTimeTo(''); setFilterLevels([]); setFilterSlots('');
    setFilterRadius(''); setUserLocation(null);
  };

  const timeAgo = (iso: string) => {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (diff < 1)    return 'Vừa xong';
    if (diff < 60)   return `${diff} phút trước`;
    if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`;
    return new Date(iso).toLocaleDateString('vi-VN');
  };

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="max-w-[1400px] w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">

        {/* ── LEFT SIDEBAR ─────────────────────────── */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4">

          {/* Tab strip */}
          <div className="flex gap-2 w-full overflow-x-auto pb-2 snap-x hide-scrollbar">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-start flex-none rounded-xl py-2.5 px-4 text-sm font-bold flex items-center gap-2 transition shadow-sm ${
                    active ? 'bg-blue-500 text-white border border-blue-600'
                           : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Filter card */}
          <div className="bg-white rounded-2xl border border-blue-500/20 shadow-sm overflow-hidden sticky top-24">
            <div className="bg-blue-500 text-white p-4 font-bold flex items-center gap-2 text-lg">
              <SlidersHorizontal className="w-5 h-5" /> Bộ lọc
            </div>

            <div className="p-5 flex flex-col gap-6 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">

              {/* Search */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 block">Tìm kiếm nhanh</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    id="feed-search"
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tên sân, ghi chú..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Vị trí
                </label>
                {!userLocation ? (
                  <button
                    id="btn-get-location"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="w-full bg-cyan-50 border border-cyan-100 text-cyan-600 hover:bg-cyan-100 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition"
                  >
                    {isLocating
                      ? <><div className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" /> Đang lấy...</>
                      : <><MousePointerClick className="w-4 h-4" /> Bật vị trí để lọc theo sân</>}
                  </button>
                ) : (
                  <div className="w-full bg-emerald-50 border border-emerald-100 text-emerald-600 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Đã lấy vị trí
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 block">Ngày chơi</label>
                <input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Time range */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Khung giờ chơi
                </label>
                <div className="flex gap-2">
                  {[['filterTimeFrom', filterTimeFrom, setFilterTimeFrom, 'Từ giờ', ['17:00','18:00','19:00','20:00']],
                    ['filterTimeTo',   filterTimeTo,   setFilterTimeTo,   'Đến giờ', ['20:00','21:00','22:00','23:00']]].map(([id, val, setter, placeholder, opts]: any) => (
                    <select
                      key={id}
                      id={id}
                      value={val}
                      onChange={e => setter(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 cursor-pointer text-slate-700"
                    >
                      <option value="">{placeholder}</option>
                      {(opts as string[]).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 block">Trình độ</label>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(lvl => {
                    const active = filterLevels.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        id={`level-${lvl}`}
                        onClick={() => setFilterLevels(prev => active ? prev.filter(l => l !== lvl) : [...prev, lvl])}
                        className={`px-3 py-1.5 border rounded-full text-xs font-medium transition shadow-sm ${
                          active ? 'bg-blue-50 border-blue-500 text-blue-600'
                                 : 'border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 bg-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots */}
              <div>
                <label className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Số slot
                </label>
                <div className="flex flex-wrap gap-2">
                  {[['', 'Tất cả'], ['1-2', '1-2 người'], ['3-4', '3-4 người'], ['5+', '5+ người']].map(([val, label]) => (
                    <button
                      key={val}
                      id={`slot-${val || 'all'}`}
                      onClick={() => setFilterSlots(val)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition ${
                        filterSlots === val ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div className={`transition-opacity ${!userLocation ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Khoảng cách tối đa
                </label>
                <select
                  id="filter-radius"
                  value={filterRadius}
                  onChange={e => setFilterRadius(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 cursor-pointer text-slate-700 shadow-sm"
                >
                  <option value="">Tất cả</option>
                  <option value="5">Dưới 5 km</option>
                  <option value="10">Dưới 10 km</option>
                  <option value="15">Dưới 15 km</option>
                  <option value="20">Dưới 20 km</option>
                </select>
              </div>

              {/* Active chips */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-blue-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Đang lọc
                  </label>
                  <button onClick={clearFilters} className="text-xs font-bold text-rose-500 hover:text-rose-600">
                    Xóa tất cả
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userLocation   && <Chip label="Gần tôi"         onRemove={() => setUserLocation(null)} />}
                  {filterRadius   && <Chip label={`< ${filterRadius}km`}  onRemove={() => setFilterRadius('')} />}
                  {filterTimeFrom && <Chip label={`Từ ${filterTimeFrom}`} onRemove={() => setFilterTimeFrom('')} />}
                  {filterTimeTo   && <Chip label={`Đến ${filterTimeTo}`}   onRemove={() => setFilterTimeTo('')} />}
                  {filterLevels.map(lvl => <Chip key={lvl} label={lvl} onRemove={() => setFilterLevels(p => p.filter(l => l !== lvl))} />)}
                  {filterSlots    && <Chip label={`${filterSlots} slot`}  onRemove={() => setFilterSlots('')} />}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN FEED ─────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-6 w-full">

          {/* Banner */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="mb-4 sm:mb-0 relative z-10">
              <h1 className="text-2xl font-bold flex items-center gap-2 mb-1">
                <Flame className="w-6 h-6" /> Cầu lông hôm nay
              </h1>
              <p className="text-blue-100 text-sm">Tìm bạn chơi, đối thủ, nhóm cầu lông gần bạn</p>
            </div>
            <button
              id="btn-create-post"
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-white/20 hover:bg-white/30 transition border border-white/20 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold relative z-10 backdrop-blur-sm"
            >
              <Plus className="w-4 h-4" /> Tạo bài đăng
            </button>
          </div>

          {/* Results meta */}
          <div className="flex justify-between items-center px-1">
            <div className="text-sm font-bold text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {posts.length} kết quả
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50 shadow-sm transition">
              Mới nhất <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Post list */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-3" />
                <p className="font-medium text-sm">Đang tải...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">Chưa có bài đăng nào.</h3>
                <p className="text-slate-500 text-sm">Hãy là người đầu tiên tạo bài!</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow border-l-4 border-l-blue-500 flex flex-col">
                  <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm w-full lg:w-3/4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 font-bold text-blue-600 bg-blue-50/50 w-max px-3 py-1 rounded-lg">
                          <Clock className="w-4 h-4" /> {post.startTime} - {post.endTime}
                        </div>
                        {post.maleSlots > 0 && (
                          <div className="flex items-center gap-2 text-amber-600 font-bold px-3">
                            <Trophy className="w-4 h-4" /> Nam: {post.maleLevels?.join(', ')}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-indigo-500 font-bold px-3">
                          <Users className="w-4 h-4" />
                          {post.targetGender === 'male' ? 'Chỉ Nam' : post.targetGender === 'female' ? 'Chỉ Nữ' : 'Nam & Nữ'}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-2 text-rose-600 font-bold leading-tight px-3 md:px-0">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{post.courtName}</span>
                          <ExternalLink className="w-3 h-3 text-rose-300 mt-1 flex-shrink-0" />
                        </div>
                        {post.femaleSlots > 0 && (
                          <div className="flex items-center gap-2 text-amber-600 font-bold px-3 md:px-0">
                            <Trophy className="w-4 h-4" /> Nữ: {post.femaleLevels?.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                      {post.contactFb && (
                        <button
                          onClick={() => window.open(post.contactFb, '_blank')}
                          className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-700 transition"
                          title="Xem trên Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </button>
                      )}
                      <button className="w-10 h-10 border border-slate-200 text-slate-500 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`w-10 h-10 border rounded-xl flex items-center justify-center transition ${
                          savedIds.has(post.id)
                            ? 'bg-rose-50 border-rose-300 text-rose-500'
                            : 'border-slate-200 text-slate-400 bg-white hover:bg-rose-50 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${savedIds.has(post.id) ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-5 text-xs font-bold flex-wrap">
                    {post.maleSlots > 0 && (
                      <span className="bg-blue-50/80 text-blue-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-blue-100/50">
                        <Banknote className="w-3.5 h-3.5" /> Nam {post.maleFee}k ({post.maleSlots} slot)
                      </span>
                    )}
                    {post.femaleSlots > 0 && (
                      <span className="bg-rose-50/80 text-rose-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-rose-100/50">
                        <Banknote className="w-3.5 h-3.5" /> Nữ {post.femaleFee}k ({post.femaleSlots} slot)
                      </span>
                    )}
                    {post.contactPhone && (
                      <span className="bg-emerald-50/80 text-emerald-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-emerald-100/50">
                        <Phone className="w-3.5 h-3.5" /> {post.contactPhone}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-slate-800 tracking-tight">
                    Tìm kèo sân {post.courtName} — {new Date(post.eventDate).toLocaleDateString('vi-VN')}
                  </h3>
                  {post.notes && <p className="text-sm text-slate-600 mb-5 whitespace-pre-line leading-relaxed">{post.notes}</p>}

                  <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-slate-100/80">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-7 h-7 rounded-full bg-slate-200 border border-slate-200 object-cover"
                        src={post.author?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'U')}&background=cbd5e1&color=fff`}
                        alt="Avatar"
                      />
                      <span className="font-bold text-blue-600">{post.author?.name || 'Thành viên vô danh'}</span>
                      <span className="font-medium text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded ml-1">
                        {timeAgo(post.createdAt)}
                      </span>
                    </div>
                    <button className="text-slate-500 font-semibold hover:text-slate-800 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-slate-50">
                      Chi tiết <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <CreatePostModal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} />
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      onClick={onRemove}
      className="bg-blue-100/50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-blue-100 transition"
    >
      {label} <span className="opacity-60 ml-1">×</span>
    </span>
  );
}
