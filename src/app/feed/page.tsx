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
    <div className="flex flex-col flex-1 bg-[#f8fafc] relative">
      <div className="absolute top-0 left-0 w-full h-[300px] hero-gradient pointer-events-none" />
      <main className="max-w-[1400px] w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 relative z-10">

        {/* ── LEFT SIDEBAR ─────────────────────────── */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">

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
                  className={`snap-start flex-none rounded-xl py-2.5 px-4 text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-sm ${
                    active ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white btn-primary scale-105'
                           : 'bg-white/80 backdrop-blur-md text-slate-600 border border-slate-200/60 hover:bg-white hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Filter card (Glassmorphism) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 font-bold flex items-center gap-2 text-lg">
              <SlidersHorizontal className="w-5 h-5" /> Bộ Lọc Thông Minh
            </div>

            <div className="p-6 flex flex-col gap-7 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">

              {/* Search */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block">Tìm kiếm</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    id="feed-search"
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tên sân, ghi chú..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" /> Vị trí gần bạn
                </label>
                {!userLocation ? (
                  <button
                    id="btn-get-location"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-600 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 -translate-x-full group-hover:duration-1000 group-hover:translate-x-full transition-transform" />
                    {isLocating
                      ? <><div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> Đang định vị...</>
                      : <><MousePointerClick className="w-4 h-4" /> Bật Vị Trí</>}
                  </button>
                ) : (
                  <div className="w-full bg-emerald-50 border border-emerald-100 text-emerald-600 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-inner">
                    <Check className="w-4 h-4" /> Đã Lấy Vị Trí
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" /> Thời gian
                </label>
                <input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700 mb-3"
                />
                <div className="flex gap-2">
                  {[['filterTimeFrom', filterTimeFrom, setFilterTimeFrom, 'Từ giờ', ['17:00','18:00','19:00','20:00']],
                    ['filterTimeTo',   filterTimeTo,   setFilterTimeTo,   'Đến giờ', ['20:00','21:00','22:00','23:00']]].map(([id, val, setter, placeholder, opts]) => (
                    <select
                      key={id}
                      id={id}
                      value={val}
                      onChange={e => setter(e.target.value)}
                      className="flex-1 bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-700 font-medium transition-all"
                    >
                      <option value="">{placeholder}</option>
                      {opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" /> Trình độ
                </label>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(lvl => {
                    const active = filterLevels.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        id={`level-${lvl}`}
                        onClick={() => setFilterLevels(prev => active ? prev.filter(l => l !== lvl) : [...prev, lvl])}
                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm ${
                          active ? 'bg-indigo-50 border-indigo-500 text-indigo-700 scale-105'
                                 : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-white bg-slate-50/50'
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
                <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-500" /> Số Slot
                </label>
                <div className="flex flex-wrap gap-2">
                  {[['', 'Tất cả'], ['1-2', '1-2 slot'], ['3-4', '3-4 slot'], ['5+', '5+ slot']].map(([val, label]) => (
                    <button
                      key={val}
                      id={`slot-${val || 'all'}`}
                      onClick={() => setFilterSlots(val)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all border ${
                        filterSlots === val ? 'bg-blue-600 border-blue-600 text-white scale-105' : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div className={`transition-opacity ${!userLocation ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" /> Bán kính tối đa
                </label>
                <select
                  id="filter-radius"
                  value={filterRadius}
                  onChange={e => setFilterRadius(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-700 font-medium transition-all shadow-sm"
                >
                  <option value="">Tất cả</option>
                  <option value="5">Dưới 5 km</option>
                  <option value="10">Dưới 10 km</option>
                  <option value="15">Dưới 15 km</option>
                  <option value="20">Dưới 20 km</option>
                </select>
              </div>

              {/* Active chips */}
              <div className="border-t border-slate-100/80 pt-5 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> Đang lọc
                  </label>
                  <button onClick={clearFilters} className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline">
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
                  {!userLocation && !filterRadius && !filterTimeFrom && !filterTimeTo && filterLevels.length === 0 && !filterSlots && (
                    <span className="text-xs text-slate-400 italic">Chưa áp dụng bộ lọc nào.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN FEED ─────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-6 w-full">

          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden shadow-[0_8px_30px_rgb(59,130,246,0.3)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full translate-y-1/2 -translate-x-4 blur-2xl pointer-events-none" />
            <div className="mb-6 sm:mb-0 relative z-10">
              <h1 className="text-3xl font-extrabold flex items-center gap-3 mb-2 tracking-tight">
                <Flame className="w-8 h-8 text-amber-400" /> Cầu Lông Hôm Nay
              </h1>
              <p className="text-blue-100 text-base max-w-md font-medium">Khám phá hàng trăm bài đăng tìm bạn đồng hành, chia sẻ sân trống gần bạn nhất.</p>
            </div>
            <button
              id="btn-create-post"
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-white text-blue-600 hover:scale-105 transition-all duration-300 px-6 py-3.5 rounded-2xl flex items-center gap-2 text-sm font-bold relative z-10 shadow-lg"
            >
              <Plus className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full p-0.5" /> Tạo Bài Đăng
            </button>
          </div>

          {/* Results meta */}
          <div className="flex justify-between items-center px-2 mt-2">
            <div className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Tìm thấy {posts.length} trận đấu
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 hover:shadow-md transition-all">
              Mới nhất <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Post list */}
          <div className="flex flex-col gap-5">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-[2rem] p-6 shadow-sm flex flex-col gap-4 animate-pulse">
                   <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-3 w-2/3">
                         <div className="h-6 bg-slate-200 rounded-lg w-1/2" />
                         <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
                         <div className="h-4 bg-slate-200 rounded-lg w-1/4" />
                      </div>
                      <div className="flex gap-2">
                         <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                         <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                      </div>
                   </div>
                   <div className="h-8 bg-slate-100 rounded-xl w-full mt-4" />
                   <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />
                      <div className="h-4 bg-slate-200 rounded-lg w-24" />
                   </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-12 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center mt-4">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full flex items-center justify-center text-blue-500 mb-6 shadow-sm border border-white">
                  <Users className="w-12 h-12 opacity-80" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Chưa có bài đăng nào!</h3>
                <p className="text-slate-500 text-base max-w-sm mb-8">Thử thay đổi bộ lọc hoặc xóa các tùy chọn lọc để xem thêm các trận đấu khác.</p>
                <button onClick={clearFilters} className="btn-primary bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
                  Xóa Bộ Lọc Ngay
                </button>
              </div>
            ) : (
              posts.map(post => {
                const isSaved = savedIds.has(post.id);
                return (
                  <div key={post.id} className="group bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-[2rem] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-5 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm w-full lg:w-3/4">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2.5 font-bold text-blue-700 bg-blue-50 border border-blue-100 w-max px-4 py-1.5 rounded-xl shadow-sm">
                            <Clock className="w-4 h-4 text-blue-500" /> {post.startTime} - {post.endTime}
                          </div>
                          {post.maleSlots > 0 && (
                            <div className="flex items-center gap-2.5 text-amber-600 font-bold px-2 md:px-0">
                              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
                                <Trophy className="w-3.5 h-3.5" />
                              </div>
                              Nam: {post.maleLevels?.join(', ')}
                            </div>
                          )}
                          <div className="flex items-center gap-2.5 text-indigo-600 font-bold px-2 md:px-0 mt-1">
                            <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shrink-0">
                              <Users className="w-3.5 h-3.5" />
                            </div>
                            {post.targetGender === 'male' ? 'Chỉ Tuyển Nam' : post.targetGender === 'female' ? 'Chỉ Tuyển Nữ' : 'Tuyển Nam & Nữ'}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-2.5 text-rose-600 font-bold leading-tight px-2 md:px-0">
                            <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 shrink-0">
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <span className="mt-1">{post.courtName}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-rose-300 mt-1.5 shrink-0" />
                          </div>
                          {post.femaleSlots > 0 && (
                            <div className="flex items-center gap-2.5 text-amber-600 font-bold px-2 md:px-0">
                              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
                                <Trophy className="w-3.5 h-3.5" />
                              </div>
                              Nữ: {post.femaleLevels?.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
                        {post.contactFb && (
                          <button
                            onClick={() => window.open(post.contactFb, '_blank')}
                            className="w-11 h-11 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center shadow-md hover:bg-[#166fe5] hover:scale-105 transition-all"
                            title="Xem chi tiết trên Facebook"
                          >
                            <Facebook className="w-5 h-5 fill-current" />
                          </button>
                        )}
                        <button className="w-11 h-11 border border-slate-200 text-slate-500 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm group">
                          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className={`w-11 h-11 border rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                            isSaved
                              ? 'bg-rose-50 border-rose-300 text-rose-500'
                              : 'border-slate-200 text-slate-400 bg-white/80 backdrop-blur-sm hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
                          }`}
                        >
                          <Heart className={`w-[18px] h-[18px] transition-transform ${isSaved ? 'fill-rose-500 scale-110 flex-shrink-0' : 'hover:scale-110 flex-shrink-0'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mb-6 text-[13px] font-bold flex-wrap relative z-10">
                      {post.maleSlots > 0 && (
                        <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-blue-100 shadow-sm">
                          <Banknote className="w-4 h-4 text-blue-500" /> Nam {post.maleFee}k <span className="opacity-60 ml-0.5 font-medium">({post.maleSlots} slot)</span>
                        </span>
                      )}
                      {post.femaleSlots > 0 && (
                        <span className="bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-rose-100 shadow-sm">
                          <Banknote className="w-4 h-4 text-rose-500" /> Nữ {post.femaleFee}k <span className="opacity-60 ml-0.5 font-medium">({post.femaleSlots} slot)</span>
                        </span>
                      )}
                      {post.contactPhone && (
                        <span className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-100 shadow-sm">
                          <Phone className="w-4 h-4 text-emerald-500" /> {post.contactPhone}
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-xl mb-2.5 text-slate-800 tracking-tight leading-snug">
                      Tìm kèo giao lưu tại <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:underline cursor-pointer">{post.courtName}</span> — {new Date(post.eventDate).toLocaleDateString('vi-VN')}
                    </h3>
                    {post.notes && (
                      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4 mb-5">
                         <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed font-medium italic">"{post.notes}"</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-auto pt-5 border-t border-slate-100/80 relative z-10">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm object-cover"
                          src={post.author?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'U')}&background=e2e8f0&color=475569`}
                          alt="Avatar"
                        />
                        <div>
                           <div className="font-bold text-sm text-slate-800">{post.author?.name || 'Thành viên Ẩn Danh'}</div>
                           <div className="font-medium text-[11px] text-slate-400 mt-0.5">
                             Đã tạo {timeAgo(post.createdAt)}
                           </div>
                        </div>
                      </div>
                      <button className="text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 hover:bg-blue-100 hover:scale-105 transition-all">
                        Chi tiết <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
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
      className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 border border-indigo-100/50 shadow-sm transition-all"
    >
      {label} <span className="opacity-70 bg-indigo-200/50 rounded-full w-4 h-4 flex items-center justify-center pb-[1px] hover:bg-indigo-300 hover:text-white transition-colors">×</span>
    </span>
  );
}
