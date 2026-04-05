'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, MousePointerClick } from 'lucide-react';

// Leaflet must be loaded client-side only (accesses window/document)
const DynamicMap = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 flex-col gap-3">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="font-medium text-sm">Đang tải bản đồ...</p>
    </div>
  ),
});

interface Court {
  id: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  activePosts: number;
}

export default function SanPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [search, setSearch]         = useState('');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const url = search
          ? `/api/courts?q=${encodeURIComponent(search)}`
          : '/api/courts';
        const res  = await fetch(url);
        const json = await res.json();
        if (json.success) setCourts(json.data);
      } catch (e) {
        console.error('[SanPage] fetchCourts', e);
      }
    };

    // 300 ms debounce to avoid hammering the API on every keystroke
    const timer = setTimeout(fetchCourts, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const totalActivePosts = courts.reduce((acc, c) => acc + c.activePosts, 0);

  const totalActivePosts = courts.reduce((acc, c) => acc + c.activePosts, 0);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#f8fafc] relative">
      <div className="absolute top-0 left-0 w-full h-[300px] hero-gradient pointer-events-none" />
      <div className="flex-1 flex overflow-hidden w-full relative z-10 max-w-[1600px] mx-auto p-4 gap-6">

        {/* ── SIDEBAR ── */}
        <aside className="w-full md:w-[400px] h-full flex flex-col bg-white/80 backdrop-blur-xl border border-white flex-shrink-0 z-[450] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">

          {/* Header */}
          <div className="p-6 border-b border-slate-100/80 flex flex-col gap-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 sticky top-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-extrabold text-xl text-slate-800 flex items-center gap-2 mb-1 tracking-tight">
                  <MapPin className="w-6 h-6 text-blue-500" /> Bản Đồ Sân Cầu
                </h1>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md font-bold">{courts.length} sân</span>
                  <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-md font-bold">{totalActivePosts} kèo đang mở</span>
                </p>
              </div>
              <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <SlidersHorizontal className="w-4 h-4" /> Lọc
              </button>
            </div>

            {/* Search */}
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="san-search"
                type="text"
                placeholder="Tìm tên sân, địa chỉ, quận..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/60 border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Locate button */}
            <button
              id="btn-locate"
              onClick={() => setIsLocating(p => !p)}
              className={`w-full ${isLocating ? 'bg-blue-600 outline outline-4 outline-blue-100 text-white' : 'bg-blue-50 border-blue-100/50 hover:bg-blue-100 text-blue-600'} border py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all overflow-hidden relative group/btn shadow-sm`}
            >
              {!isLocating && <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />}
              <MousePointerClick className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{isLocating ? 'Đang Lấy Vị Trí...' : 'Bật Vị Trí Để Tìm Sân Gần Nhất'}</span>
            </button>
          </div>

          {/* Court list */}
          <div className="flex-1 overflow-y-auto w-full p-5 flex flex-col gap-4 bg-slate-50/50 no-scrollbar">
            {courts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-60">
                <div className="w-20 h-20 bg-blue-50 shadow-inner rounded-full flex items-center justify-center mb-4">
                   <MapPin className="w-10 h-10 text-blue-300" />
                </div>
                <p className="text-base font-bold text-slate-500">Chưa tìm thấy sân nào</p>
                <p className="text-sm font-medium text-slate-400 mt-1">Thử thay đổi từ khóa tìm kiếm</p>
              </div>
            ) : (
              courts.map(court => (
                <div
                  key={court.id}
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-[1.5rem] border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h3 className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 pr-4 text-base">
                      {court.name}
                    </h3>
                    <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
                      Đang mở
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed relative z-10 font-medium">
                    {court.address}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-slate-100/80 relative z-10">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 px-3 py-1.5 rounded-xl shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      {court.activePosts} kèo
                    </div>
                    <button className="text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                      Chỉ đường
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ── MAP AREA ── */}
        <div className="flex-1 relative z-0 h-full w-full bg-slate-200 overflow-hidden rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white flex items-center gap-2 font-bold text-sm text-slate-700 pointer-events-none">
            <Sparkles className="w-4 h-4 text-blue-500" /> Khám phá sân trên bản đồ
          </div>
          <DynamicMap courts={courts} />
        </div>
      </div>
    </div>
  );
}
