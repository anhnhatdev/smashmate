'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCcw, Shield, MapPin, Trophy, Crown } from 'lucide-react';

const RANK_THEMES = [
  { cardBg: 'bg-gradient-to-b from-amber-50 to-white',   border: 'border-amber-300',  badgeBg: 'bg-amber-300',  badgeText: 'text-amber-900',  countText: 'text-amber-700',  countBorder: 'border-amber-200',  shadow: 'shadow-[0_4px_32px_rgba(251,191,36,0.15)]', scale: 'md:-translate-y-4' },
  { cardBg: 'bg-gradient-to-b from-slate-100/50 to-white', border: 'border-slate-200', badgeBg: 'bg-slate-200',  badgeText: 'text-slate-700',  countText: 'text-slate-800', countBorder: 'border-slate-100', shadow: '', scale: '' },
  { cardBg: 'bg-gradient-to-b from-orange-50 to-white',  border: 'border-orange-200', badgeBg: 'bg-orange-200', badgeText: 'text-orange-900', countText: 'text-orange-700', countBorder: 'border-orange-200', shadow: '', scale: '' },
];

// Podium display order: 2nd (left), 1st (centre), 3rd (right)
const PODIUM_ORDER = [1, 0, 2];

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<'tac-gia' | 'san'>('tac-gia');
  const [period, setPeriod]       = useState<'today' | 'week'>('today');
  const [data, setData]           = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const type = activeTab === 'tac-gia' ? 'authors' : 'courts';
      const res  = await fetch(`/api/leaderboard?type=${type}&period=${period}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error('[RankingPage]', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchLeaderboard(); }, [activeTab, period]);

  const top3   = PODIUM_ORDER.map(i => data[i]).filter(Boolean);
  const others = data.slice(3);
  const valueLabel = activeTab === 'tac-gia' ? 'Bài đăng' : 'Kèo đăng';
  const valueKey   = activeTab === 'tac-gia' ? 'posts' : 'activePosts';

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden gap-6">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-amber-500" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Xếp hạng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-400 to-amber-500">hôm nay</span>
          </h1>
          <div className="flex gap-3 items-center w-full md:w-auto">
            <div className="flex flex-1 md:flex-none bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
              {([['today', 'Ngày', 'Nhịp hiện tại'], ['week', 'Tuần', '7 ngày gần nhất']] as const).map(([val, label, sub]) => (
                <button
                  key={val}
                  id={`period-${val}`}
                  onClick={() => setPeriod(val)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl flex flex-col items-center justify-center transition ${
                    period === val ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="font-bold text-sm">{label}</span>
                  <span className="text-[10px] opacity-70">{sub}</span>
                </button>
              ))}
            </div>
            <button
              id="btn-refresh-leaderboard"
              onClick={fetchLeaderboard}
              className="w-12 h-12 flex-shrink-0 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 text-slate-600 transition active:scale-95"
              aria-label="Làm mới"
            >
              <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Type tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex gap-2 mb-8 w-fit max-w-full overflow-x-auto">
          {[
            { id: 'tac-gia', label: 'Tác giả', sub: 'Người đăng nổi bật', icon: Shield,  active: 'bg-blue-50 text-blue-600' },
            { id: 'san',     label: 'Sân',     sub: 'Điểm nóng giao lưu', icon: MapPin, active: 'bg-emerald-50 text-emerald-600' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id as any;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 w-48 rounded-xl py-3 px-4 flex items-center gap-3 transition-colors ${
                  isActive ? tab.active : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <div className="font-bold text-sm">{tab.label}</div>
                  <div className="text-[10px] opacity-80">{tab.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Leaderboard card */}
        <div className="bg-white/60 backdrop-blur-md border border-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block border border-blue-200">
                {activeTab === 'tac-gia' ? 'Bảng tác giả' : 'Bảng sân'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Xếp hạng {activeTab === 'tac-gia' ? 'tác giả' : 'sân'}
              </h2>
            </div>
            <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                {period === 'today' ? 'Hôm nay' : '7 ngày'}
              </div>
              <div className="text-xl font-black text-slate-800">{data.length} vị trí</div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin" />
              <p className="text-slate-400 font-medium">Đang tải bảng xếp hạng...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Trophy className="w-16 h-16 text-slate-200" />
              <p className="text-slate-500 font-medium text-lg">Chưa có dữ liệu</p>
              <p className="text-slate-400 text-sm">Hãy đăng bài để lên bảng xếp hạng!</p>
            </div>
          ) : (
            <>
              {/* Podium */}
              {top3.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
                  {top3.map((user, posIdx) => {
                    const themeIdx = posIdx === 1 ? 0 : posIdx === 0 ? 1 : 2;
                    const theme    = RANK_THEMES[themeIdx];
                    const isChamp  = user.rank === 1;
                    return (
                      <div
                        key={user.rank}
                        className={`${theme.cardBg} border ${theme.shadow} ${theme.border} ${theme.scale} rounded-[2.5rem] p-8 flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform`}
                      >
                        <div className={`absolute top-5 right-5 ${theme.badgeBg} ${theme.badgeText} text-xs font-black px-3 py-1.5 rounded-lg`}># {user.rank}</div>
                        {isChamp && <Crown className="absolute top-5 left-5 w-6 h-6 text-amber-500 fill-amber-400" />}
                        <div className="relative mb-5">
                          <img src={user.avatar} className="w-24 h-24 rounded-full border-[6px] border-white shadow-xl object-cover" alt={user.name} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h3>
                        <p className="text-slate-500 text-sm mb-6">{user.desc}</p>
                        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">{valueLabel}</div>
                        <div className={`text-4xl font-black ${theme.countText} bg-white px-8 py-2.5 rounded-2xl shadow-sm border ${theme.countBorder}`}>
                          {user[valueKey]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rank 4–10 */}
              {others.length > 0 && (
                <div className="flex flex-col gap-3">
                  {others.map((user: any) => (
                    <div key={user.rank} className="bg-white/80 border border-slate-200 rounded-3xl p-4 md:p-5 flex justify-between items-center hover:shadow-md hover:border-blue-100 hover:bg-white transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-10 text-center font-bold text-slate-400 text-sm bg-slate-50 py-1 rounded-lg">
                          <span className="text-[10px]">#</span>{user.rank}
                        </div>
                        <img src={user.avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-slate-100 shadow-sm group-hover:border-blue-200 transition-colors" alt={user.name} />
                        <div>
                          <div className="font-bold text-slate-800 text-base md:text-lg mb-0.5 group-hover:text-blue-600 transition-colors">{user.name}</div>
                          <div className="text-xs md:text-sm text-slate-500 line-clamp-1">{user.desc}</div>
                        </div>
                      </div>
                      <div className="font-black text-2xl text-slate-800 px-4">{user[valueKey]}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
