'use client';

import React, { useState } from 'react';
import { X, Users, MapPin, ShoppingBag, GraduationCap, Shield, User, Gift, Phone, Calendar, Clock, Edit3, Link as LinkIcon, Plus, ChevronDown } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState('tuyen-keo');
  const [targetGender, setTargetGender] = useState('all');
  const [maleLevel, setMaleLevel] = useState<string[]>([]);
  const [femaleLevel, setFemaleLevel] = useState<string[]>([]);
  const [courtName, setCourtName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maleSlots, setMaleSlots] = useState('');
  const [maleFee, setMaleFee] = useState('');
  const [femaleSlots, setFemaleSlots] = useState('');
  const [femaleFee, setFemaleFee] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactFb, setContactFb] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const TABS = [
    { id: 'tuyen-keo', label: 'Tuy\u1ec3n k\u00e8o', icon: Users },
    { id: 'pass-san',  label: 'Pass s\u00e2n',     icon: MapPin },
    { id: 'mua-ban',   label: 'Mua b\u00e1n',      icon: ShoppingBag },
    { id: 'lop-day',   label: 'L\u1edbp d\u1ea1y', icon: GraduationCap },
    { id: 'clb',       label: 'CLB',              icon: Shield },
    { id: 'tim-ban',   label: 'T\u00ecm b\u1ea1n/S\u00e2n', icon: User },
    { id: 'uu-dai',    label: '\u01aeu \u0111\u00e3i',      icon: Gift },
  ];

  const LEVELS = ['Y','Y+','TBY','TBY+','TB-','TB','TB+','TB++','TBK','Kh\u00e1'];

  const toggleLevel = (level: string, isMale: boolean) => {
    if (isMale) setMaleLevel(p => p.includes(level) ? p.filter(l => l !== level) : [...p, level]);
    else        setFemaleLevel(p => p.includes(level) ? p.filter(l => l !== level) : [...p, level]);
  };

  const handleSubmit = async () => {
    if (!courtName || !eventDate || !startTime || !endTime) {
      alert('Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ee7 Th\u00f4ng tin S\u00e2n v\u00e0 Th\u1eddi gian!');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postType: activeTab, courtName, eventDate, startTime, endTime, targetGender,
          maleSlots: Number(maleSlots), maleFee: Number(maleFee), maleLevels: maleLevel,
          femaleSlots: Number(femaleSlots), femaleFee: Number(femaleFee), femaleLevels: femaleLevel,
          contactPhone, contactFb, notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('\u0110\u0103ng b\u00e0i th\u00e0nh c\u00f4ng!');
      onClose();
    } catch (err: any) {
      alert('L\u1ed7i: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-[850px] max-h-[90vh] flex flex-col relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="bg-[#3b82f6] text-white p-5 md:p-6 rounded-t-3xl relative shrink-0">
          <button onClick={onClose} className="absolute top-5 right-5 text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
          <div className="pr-10 flex gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">T\u1ea1o b\u00e0i \u0111\u0103ng</h2>
              <p className="text-blue-100 text-sm">\u0110\u0103ng b\u00e0i tuy\u1ec3n ng\u01b0\u1eddi giao l\u01b0u theo l\u1ecbch v\u00e0 tr\u00ecnh \u0111\u1ed9.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 md:px-6 pt-5 bg-white border-b border-slate-100 shrink-0">
          <div className="flex gap-2 w-full overflow-x-auto hide-scrollbar pb-5 snap-x">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-start flex-none border rounded-xl py-2 px-4 text-sm font-bold flex items-center gap-2 transition ${
                    activeTab === tab.id ? 'bg-[#3b82f6] text-white border-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />{tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-7">
          {/* Court */}
          <div>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <select value={courtName} onChange={e => setCourtName(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-[15px] text-slate-700 outline-none focus:border-[#3b82f6] appearance-none cursor-pointer font-medium shadow-sm">
                <option value="" disabled>Ch\u1ecdn s\u00e2n...</option>
                <option value="S\u00e2n Rian Sport (G\u00f2 V\u1ea5p)">S\u00e2n Rian Sport (G\u00f2 V\u1ea5p)</option>
                <option value="S\u00e2n Ph\u1ea1m Tu (Thanh Tr\u00ec)">S\u00e2n Ph\u1ea1m Tu (Thanh Tr\u00ec)</option>
                <option value="S\u00e2n Viettel (T\u00e2n B\u00ecnh)">S\u00e2n Viettel (T\u00e2n B\u00ecnh)</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-[13px] text-slate-500 mt-2 ml-1">B\u1eaft bu\u1ed9c ch\u1ecdn 1 s\u00e2n t\u1eeb danh s\u00e1ch.</p>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5"><Users className="w-4 h-4" /> \u0110\u1ed1i t\u01b0\u1ee3ng c\u1ea7n tuy\u1ec3n <span className="text-rose-500">*</span></label>
            <div className="flex gap-3">
              {[['male','Ch\u1ec9 nam'],['female','Ch\u1ec9 n\u1eef'],['all','Nam v\u00e0 n\u1eef']].map(([val,lbl]) => (
                <button key={val} onClick={() => setTargetGender(val)} className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition ${targetGender === val ? 'bg-[#0ea5e9] text-white border-[#0ea5e9]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{lbl}</button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Ng\u00e0y <span className="text-rose-500">*</span></label>
              <input value={eventDate} onChange={e => setEventDate(e.target.value)} type="date" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
            </div>
            {[['start','B\u1eaft \u0111\u1ea7u',startTime,setStartTime],['end','K\u1ebft th\u00fac',endTime,setEndTime]].map(([key,lbl,val,setter]: any) => (
              <div key={key}>
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lbl} <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <select value={val} onChange={e => setter(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] appearance-none cursor-pointer shadow-sm font-medium">
                    <option value="" disabled>Ch\u1ecdn gi\u1edd</option>
                    {['06:00','07:00','08:00','09:00','17:00','18:00','19:00','20:00','21:00','22:00'].map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-slate-100" />

          {/* Male section */}
          {(targetGender === 'all' || targetGender === 'male') && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><User className="w-4 h-4" /> C\u1ea7n tuy\u1ec3n nam <span className="text-rose-500">*</span></label>
                  <input value={maleSlots} onChange={e => setMaleSlots(e.target.value)} type="number" placeholder="VD: 2" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2">Ph\u00ed nam (k)</label>
                  <input value={maleFee} onChange={e => setMaleFee(e.target.value)} type="number" placeholder="VD: 80" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Tr\u00ecnh \u0111\u1ed9 nam <span className="text-rose-500">*</span></label>
                <div className="flex flex-wrap gap-2.5">
                  {LEVELS.map(lvl => (
                    <button key={`m-${lvl}`} onClick={() => toggleLevel(lvl, true)} className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${maleLevel.includes(lvl) ? 'bg-blue-50 border-[#3b82f6] text-[#3b82f6]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{lvl}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {targetGender === 'all' && <div className="h-px w-full bg-slate-100" />}

          {/* Female section */}
          {(targetGender === 'all' || targetGender === 'female') && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><User className="w-4 h-4" /> C\u1ea7n tuy\u1ec3n n\u1eef <span className="text-rose-500">*</span></label>
                  <input value={femaleSlots} onChange={e => setFemaleSlots(e.target.value)} type="number" placeholder="VD: 1" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2">Ph\u00ed n\u1eef (k)</label>
                  <input value={femaleFee} onChange={e => setFemaleFee(e.target.value)} type="number" placeholder="VD: 60" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Tr\u00ecnh \u0111\u1ed9 n\u1eef <span className="text-rose-500">*</span></label>
                <div className="flex flex-wrap gap-2.5">
                  {LEVELS.map(lvl => (
                    <button key={`f-${lvl}`} onClick={() => toggleLevel(lvl, false)} className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${femaleLevel.includes(lvl) ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{lvl}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="h-px w-full bg-slate-100" />

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Phone className="w-4 h-4" /> S\u1ed1 \u0111i\u1ec7n tho\u1ea1i</label>
              <input value={contactPhone} onChange={e => setContactPhone(e.target.value)} type="tel" placeholder="09xxxxxx" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> Link Facebook</label>
              <input value={contactFb} onChange={e => setContactFb(e.target.value)} type="text" placeholder="https://facebook.com/..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5"><Edit3 className="w-4 h-4" /> Ghi ch\u00fa</label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3b82f6] transition shadow-sm font-medium resize-none" placeholder="Th\u00f4ng tin th\u00eam..." />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-100 p-5 md:p-6 rounded-b-3xl shrink-0 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">H\u1ee7y</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${isSubmitting ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:bg-blue-600'}`}>
            {isSubmitting ? <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
            {isSubmitting ? '\u0110ang l\u01b0u...' : 'L\u01b0u v\u00e0 \u0111\u0103ng b\u00e0i'}
          </button>
        </div>
      </div>
    </div>
  );
}
