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

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <div className="flex-1 flex overflow-hidden w-full relative">

        {/* ── SIDEBAR ── */}
        <aside className="w-[360px] h-full flex flex-col bg-white border-r border-slate-200 flex-shrink-0 z-[450] shadow-[4px_0_24px_rgba(0,0,0,0.02)]">

          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-white sticky top-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-sky-500" /> Danh sách sân
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  {courts.length} sân · {totalActivePosts} bài đăng
                </p>
              </div>
              <button className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-sky-500/20 text-sky-500 px-3 py-1.5 rounded-xl text-sm font-bold transition">
                <SlidersHorizontal className="w-4 h-4" /> Bộ lọc
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                id="san-search"
                type="text"
                placeholder="Tìm sân theo tên, địa chỉ, quận..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>

            {/* Locate button */}
            <button
              id="btn-locate"
              onClick={() => setIsLocating(p => !p)}
              className={`w-full ${isLocating ? 'bg-sky-100 border-sky-200' : 'bg-sky-50 border-sky-100 hover:bg-sky-100'} border text-sky-500 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition`}
            >
              <MousePointerClick className="w-4 h-4" />
              Bật vị trí để xem khoảng cách
            </button>
          </div>

          {/* Court list */}
          <div className="flex-1 overflow-y-auto w-full p-4 flex flex-col gap-3 bg-slate-50/50">
            {courts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-60">
                <MapPin className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-500">Không tìm thấy sân nào</p>
              </div>
            ) : (
              courts.map(court => (
                <div
                  key={court.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-500/40 transition cursor-pointer group flex flex-col relative overflow-hidden"
                >
                  <div className="w-1 h-full bg-sky-500 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 group-hover:text-sky-500 transition line-clamp-1 pr-4">
                      {court.name}
                    </h3>
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      Đang mở
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-1">{court.address}</p>
                  <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {court.activePosts} kèo đang tìm
                    </div>
                    <button className="text-sky-500 font-medium hover:underline">
                      Chỉ đường
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ── MAP AREA ── */}
        <div className="flex-1 relative z-0 h-[calc(100vh-64px)] w-full bg-slate-200">
          <DynamicMap courts={courts} />
        </div>
      </div>
    </div>
  );
}
