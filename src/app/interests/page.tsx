'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Heart, Share2, ArrowLeft, Info, ChevronDown, XCircle,
  Users, MapPin, Store, GraduationCap, Building2,
  Calendar, Clock, Trash2,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'tuyen-keo', label: 'Tìm kèo',  icon: Users,        color: 'text-blue-500'   },
  { id: 'pass-san',  label: 'Pass sân', icon: MapPin,        color: 'text-emerald-500' },
  { id: 'mua-ban',   label: 'Mua bán',  icon: Store,         color: 'text-amber-500'  },
  { id: 'lop-day',   label: 'Lớp dạy', icon: GraduationCap, color: 'text-purple-500'  },
  { id: 'clb',       label: 'CLB',       icon: Building2,    color: 'text-orange-500' },
];

export default function InterestsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab]   = useState('tuyen-keo');
  const [interests, setInterests]   = useState<any[]>([]);
  const [isLoading, setIsLoading]   = useState(false);

  const fetchInterests = async () => {
    if (!session) return;
    setIsLoading(true);
    try {
      const res  = await fetch(`/api/interests?postType=${activeTab}`);
      const data = await res.json();
      if (data.success) setInterests(data.interests);
    } catch (e) {
      console.error('[InterestsPage]', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchInterests(); }, [activeTab, session]);

  const removeInterest = async (postId: string) => {
    try {
      const res  = await fetch('/api/interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success && !data.saved) {
        setInterests(prev => prev.filter(i => i.id !== postId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12">

        {/* Banner */}
        <div className="bg-[#f43f5e] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_8px_30px_rgba(244,63,94,0.2)]">
          <div className="flex items-start gap-4 text-white">
            <Heart className="w-8 h-8 fill-white text-white mt-1" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Bài viết quan tâm</h1>
              <p className="text-rose-100 font-medium opacity-90">{interests.length} bài viết đã lưu</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold transition">
              <Share2 className="w-4 h-4" /> Chia sẻ tab này
            </button>
            <Link href="/feed" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold transition">
              <ArrowLeft className="w-4 h-4" /> Về Feed
            </Link>
          </div>
        </div>

        {/* Info alert */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-blue-800 text-sm">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p>Dữ liệu được đồng bộ theo thời gian thực. Nhấn <Heart className="w-4 h-4 inline-block text-rose-500 fill-rose-100 mx-1 align-sub" /> trên bài đăng ngoài Feed để lưu vào đây.</p>
        </div>

        {/* Category tabs */}
        <div className="mt-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 mb-6">
            {CATEGORIES.map(cat => {
              const Icon    = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`interests-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : cat.color}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* List header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {interests.length} bài trong mục này
            </div>
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm">
              Mới nhất <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          {!session ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center shadow-sm">
              <Heart className="w-12 h-12 text-slate-300 mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Vui lòng đăng nhập</h3>
              <p className="text-slate-500 text-sm mb-6">Đăng nhập để xem danh sách bài viết đã lưu</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin" />
              <p className="text-slate-400 font-medium text-sm">Đang tải...</p>
            </div>
          ) : interests.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                <XCircle className="w-12 h-12 text-slate-300 stroke-[1.5]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Chưa có bài viết quan tâm nào</h3>
              <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Nhấn vào biểu tượng <Heart className="w-4 h-4 inline-block text-rose-500 fill-rose-500 mx-1 align-sub" /> trên bài viết ở trang Feed để lưu lại
              </p>
              <Link href="/feed" className="bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-bold px-8 py-3.5 rounded-full transition-all shadow-sm">
                Khám phá Feed
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {interests.map((post: any) => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-rose-200 transition shadow-sm hover:shadow-md">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-slate-800 text-lg">
                      Tìm Kèo: sân {post.courtName || 'Chưa có tên'}
                    </h3>
                    <div className="flex items-center flex-wrap gap-4 text-sm font-medium text-slate-500">
                      <div className="flex items-center gap-1.5 text-blue-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.eventDate).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.startTime} - {post.endTime}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Đã lưu {new Date(post.savedAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/feed" className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition">
                      Xem bài
                    </Link>
                    <button
                      id={`remove-interest-${post.id}`}
                      onClick={() => removeInterest(post.id)}
                      className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl text-sm font-bold hover:bg-rose-100 transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" /> Bỏ lưu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
