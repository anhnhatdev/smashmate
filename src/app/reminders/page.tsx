'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Bell, ArrowLeft, Plus, Sparkles, XCircle, MapPin, Clock,
  ChevronDown, ArrowDownUp, Calendar, Trash2, ToggleLeft, ToggleRight,
} from 'lucide-react';

const DAYS   = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const LEVELS = ['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','TBK','Kh\u00e1'];

export default function RemindersPage() {
  const { data: session } = useSession();
  const [reminders, setReminders]       = useState<any[]>([]);
  const [matchedPosts, setMatchedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [isCreating, setIsCreating]     = useState(false);

  const [formLabel,    setFormLabel]    = useState('');
  const [formDays,     setFormDays]     = useState<number[]>([]);
  const [formTimeFrom, setFormTimeFrom] = useState('18:00');
  const [formTimeTo,   setFormTimeTo]   = useState('21:00');
  const [formLevels,   setFormLevels]   = useState<string[]>([]);

  const fetchData = async () => {
    if (!session) return;
    setIsLoading(true);
    try {
      const res  = await fetch('/api/reminders?matchPosts=true');
      const data = await res.json();
      if (data.success) {
        setReminders(data.reminders);
        setMatchedPosts(data.matchedPosts ?? []);
      }
    } catch (e) {
      console.error('[RemindersPage] fetchData', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [session]);

  const handleCreate = async () => {
    if (!formLabel || formDays.length === 0 || !formTimeFrom || !formTimeTo) {
      alert('Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin');
      return;
    }
    try {
      const res  = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: formLabel, daysOfWeek: formDays, timeFrom: formTimeFrom, timeTo: formTimeTo, levels: formLevels }),
      });
      const data = await res.json();
      if (data.success) {
        setReminders(prev => [data.reminder, ...prev]);
        setIsCreating(false);
        setFormLabel(''); setFormDays([]); setFormLevels([]);
      }
    } catch (e) { console.error(e); }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res  = await fetch(`/api/reminders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !current } : r));
      }
    } catch (e) { console.error(e); }
  };

  const deleteReminder = async (id: string) => {
    if (!confirm('X\u00f3a nh\u1eafc l\u1ecbch n\u00e0y?')) return;
    try {
      const res = await fetch(`/api/reminders/${id}`, { method: 'DELETE' });
      if (res.ok) setReminders(prev => prev.filter(r => r.id !== id));
    } catch (e) { console.error(e); }
  };

  const toggleDay   = (d: number) => setFormDays(p   => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
  const toggleLevel = (l: string) => setFormLevels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc]">
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12">

        {/* Banner */}
        <div className="bg-[#6366f1] text-white rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm mb-10">
          <div className="flex items-start gap-4">
            <Bell className="w-8 h-8 stroke-[1.5] mt-1" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Nh\u1eafc l\u1ecbch ch\u01a1i c\u1ea7u</h1>
              <p className="text-indigo-100 font-medium text-sm">
                {reminders.filter(r => r.active).length} nh\u1eafc l\u1ecbch \u0111ang b\u1eadt \u2022 {matchedPosts.length} b\u00e0i ph\u00f9 h\u1ee3p
              </p>
            </div>
          </div>
          <Link href="/feed" className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/10 px-5 py-2.5 rounded-xl font-bold transition w-full md:w-auto">
            <ArrowLeft className="w-4 h-4" /> Feed
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT: Reminder list ── */}
          <div className="w-full lg:w-[38%] flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 text-base">Danh s\u00e1ch nh\u1eafc l\u1ecbch</h2>
              <button
                id="btn-create-reminder"
                onClick={() => setIsCreating(p => !p)}
                className="bg-[#6366f1] text-white hover:bg-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> T\u1ea1o m\u1edbi
              </button>
            </div>

            {/* Create form */}
            {isCreating && (
              <div className="bg-white border border-indigo-100 rounded-2xl p-5 mb-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Nh\u1eafc l\u1ecbch m\u1edbi</h3>

                <div className="mb-3">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">T\u00ean nh\u1eafc l\u1ecbch</label>
                  <input
                    id="reminder-label"
                    value={formLabel}
                    onChange={e => setFormLabel(e.target.value)}
                    placeholder="V\u00ed d\u1ee5: T\u1ed1i T3 v\u00e0 T5 m\u1ed7i tu\u1ea7n"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="mb-3">
                  <label className="text-xs font-bold text-slate-600 mb-2 block">Ng\u00e0y trong tu\u1ea7n</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS.map((d, i) => (
                      <button
                        key={i}
                        id={`day-${i}`}
                        onClick={() => toggleDay(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                          formDays.includes(i)
                            ? 'bg-indigo-500 text-white border-indigo-400'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-3 flex gap-2">
                  {[['reminder-from', formTimeFrom, setFormTimeFrom, 'T\u1eeb'], ['reminder-to', formTimeTo, setFormTimeTo, '\u0110\u1ebfn']].map(([id, val, setter, label]: any) => (
                    <div key={id} className="flex-1">
                      <label className="text-xs font-bold text-slate-600 mb-1 block">{label}</label>
                      <input
                        id={id}
                        type="time"
                        value={val}
                        onChange={e => setter(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="text-xs font-bold text-slate-600 mb-2 block">Tr\u00ecnh \u0111\u1ed9 (kh\u00f4ng b\u1eaft bu\u1ed9c)</label>
                  <div className="flex flex-wrap gap-1.5">
                    {LEVELS.map(l => (
                      <button
                        key={l}
                        id={`rlevel-${l}`}
                        onClick={() => toggleLevel(l)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                          formLevels.includes(l)
                            ? 'bg-indigo-500 text-white border-indigo-400'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={handleCreate} className="flex-1 bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition">
                    T\u1ea1o nh\u1eafc l\u1ecbch
                  </button>
                  <button onClick={() => setIsCreating(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 transition">
                    H\u1ee7y
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            {!session ? (
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center h-[200px]">
                <Bell className="w-10 h-10 text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm font-medium">\u0110\u0103ng nh\u1eadp \u0111\u1ec3 t\u1ea1o nh\u1eafc l\u1ecbch</p>
              </div>
            ) : reminders.length === 0 && !isCreating ? (
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center h-[280px]">
                <Bell className="w-12 h-12 text-slate-300 stroke-[1.5] mb-4" />
                <p className="text-slate-500 text-sm mb-4 font-medium">Ch\u01b0a c\u00f3 nh\u1eafc l\u1ecbch n\u00e0o</p>
                <button onClick={() => setIsCreating(true)} className="bg-white border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-full font-bold text-xs text-slate-700 transition shadow-sm flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> T\u1ea1o nh\u1eafc l\u1ecbch \u0111\u1ea7u ti\u00ean
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {reminders.map(r => (
                  <div key={r.id} className={`bg-white border ${r.active ? 'border-indigo-200' : 'border-slate-200'} rounded-2xl p-4 shadow-sm transition`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold text-sm ${r.active ? 'text-indigo-700' : 'text-slate-500'}`}>{r.label}</h3>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => toggleActive(r.id, r.active)}>
                          {r.active
                            ? <ToggleRight className="w-6 h-6 text-indigo-500" />
                            : <ToggleLeft  className="w-6 h-6 text-slate-400" />}
                        </button>
                        <button onClick={() => deleteReminder(r.id)} className="text-slate-300 hover:text-rose-500 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 text-[11px] font-semibold text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">{r.daysOfWeek.map((d: number) => DAYS[d]).join(', ')}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded">{r.timeFrom} \u2013 {r.timeTo}</span>
                      {r.levels?.length > 0 && <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{r.levels.join(', ')}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Matched posts ── */}
          <div className="w-full lg:flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
                B\u00e0i \u0111\u0103ng ph\u00f9 h\u1ee3p ({matchedPosts.length})
              </h2>
              <div className="flex items-center gap-2">
                <button className="bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 flex items-center gap-1.5 shadow-sm transition">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> M\u1ecdi kho\u1ea3ng c\u00e1ch <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 flex items-center gap-1.5 shadow-sm transition">
                  <ArrowDownUp className="w-3.5 h-3.5 text-slate-400" /> Gi\u1edd s\u1edbm nh\u1ea5t <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-slate-400 font-medium text-sm">\u0110ang t\u00ecm b\u00e0i ph\u00f9 h\u1ee3p...</p>
              </div>
            ) : matchedPosts.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 lg:p-12 flex flex-col items-center justify-center text-center shadow-sm min-h-[280px]">
                <XCircle className="w-10 h-10 text-slate-300 stroke-[1.5] mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ch\u01b0a c\u00f3 k\u1ebft qu\u1ea3 ph\u00f9 h\u1ee3p</h3>
                <p className="text-slate-500 text-sm">B\u1eadt \u00edt nh\u1ea5t m\u1ed9t nh\u1eafc l\u1ecbch \u0111\u1ec3 xem b\u00e0i \u0111\u0103ng ph\u00f9 h\u1ee3p</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {matchedPosts.map((post: any) => (
                  <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-200 transition shadow-sm hover:shadow-md">
                    <h3 className="font-bold text-slate-800 mb-2">S\u00e2n {post.courtName || 'Ch\u01b0a c\u00f3 t\u00ean'}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.eventDate).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.startTime} \u2013 {post.endTime}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap text-[11px]">
                      {post.maleLevels?.map((l: string) => (
                        <span key={l} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-semibold">Nam {l}</span>
                      ))}
                      {post.femaleLevels?.map((l: string) => (
                        <span key={l} className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded font-semibold">N\u1eef {l}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
