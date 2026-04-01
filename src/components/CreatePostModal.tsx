'use client';

import React, { useState } from 'react';
import {
  X, Users, MapPin, ShoppingBag, GraduationCap, Shield, User, Gift,
  Phone, Calendar, Clock, Edit3, Link as LinkIcon, Plus, ChevronDown,
} from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = [
  { id: 'tuyen-keo', label: 'Tuyển kèo', icon: Users },
  { id: 'pass-san', label: 'Pass sân', icon: MapPin },
  { id: 'mua-ban', label: 'Mua bán', icon: ShoppingBag },
  { id: 'lop-day', label: 'Lớp dạy', icon: GraduationCap },
  { id: 'clb', label: 'CLB', icon: Shield },
  { id: 'tim-ban', label: 'Tìm bạn', icon: User },
  { id: 'uu-dai', label: 'ƯU đãi', icon: Gift },
];

const LEVELS = ['Y', 'Y+', 'TBY', 'TBY+', 'TB-', 'TB', 'TB+', 'TB++', 'TBK', 'Khá'];

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

  const toggleLevel = (level: string, isMale: boolean) => {
    if (isMale) {
      setMaleLevel((prev) => prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]);
    } else {
      setFemaleLevel((prev) => prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]);
    }
  };

  const handleSubmit = async () => {
    if (!courtName || !eventDate || !startTime || !endTime) {
      alert('Vui lòng điền đủ thông tin Sân và Thời gian!');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postType: activeTab,
          courtName,
          eventDate,
          startTime,
          endTime,
          targetGender,
          maleSlots: Number(maleSlots),
          maleFee: Number(maleFee),
          maleLevels: maleLevel,
          femaleSlots: Number(femaleSlots),
          femaleFee: Number(femaleFee),
          femaleLevels: femaleLevel,
          contactPhone,
          contactFb,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('Đăng bài thành công!');
      onClose();
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = 'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-blue-100 transition shadow-sm font-medium';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-3xl w-full max-w-[850px] max-h-[90vh] flex flex-col relative z-10 shadow-2xl">

        {/* Header */}
        <div className="bg-[#3b82f6] text-white p-5 md:p-6 rounded-t-3xl relative shrink-0">
          <button onClick={onClose} className="absolute top-5 right-5 text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
          <div className="pr-10 flex gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">Tạo bài đăng Tuyển kèo</h2>
              <p className="text-blue-100 text-sm">Đăng bài tuyển người giao lưu theo lịch và trình độ bạn mong muốn.</p>
            </div>
          </div>
        </div>

        {/* Post type tabs */}
        <div className="px-5 md:px-6 pt-5 bg-white border-b border-slate-100 shrink-0">
          <div className="flex gap-2 w-full overflow-x-auto pb-5 snap-x">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-start flex-none border rounded-xl py-2 px-4 md:px-5 text-sm font-bold flex items-center gap-2 transition ${
                    isActive
                      ? 'bg-[#3b82f6] text-white border-blue-600 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-7">

          {/* Court */}
          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <select
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-[15px] text-slate-700 outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-blue-100 transition appearance-none cursor-pointer font-medium shadow-sm"
            >
              <option value="" disabled>Chọn sân...</option>
              <option value="Sân Rian Sport (Gò Vấp)">Sân Rian Sport (Gò Vấp)</option>
              <option value="Sân Phạm Tu (Thanh Trì)">Sân Phạm Tu (Thanh Trì)</option>
              <option value="Sân Viettel (Tân Bình)">Sân Viettel (Tân Bình)</option>
            </select>
            <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
            <p className="text-[13px] text-slate-500 mt-2 ml-1">Bắt buộc chọn 1 sân từ danh sách.</p>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Đối tượng tuyển <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-3">
              {[{ v: 'male', l: 'Chỉ nam' }, { v: 'female', l: 'Chỉ nữ' }, { v: 'all', l: 'Nam và nữ' }].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => setTargetGender(v)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition ${
                    targetGender === v ? 'bg-[#0ea5e9] text-white border-[#0ea5e9]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Date & time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Ngày <span className="text-rose-500">*</span>
              </label>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputCls} />
            </div>
            {[{ label: 'Giờ bắt đầu', value: startTime, set: setStartTime, opts: ['06:00', '07:00', '08:00', '18:00', '19:00', '20:00'] },
              { label: 'Giờ kết thúc', value: endTime, set: setEndTime, opts: ['08:00', '09:00', '10:00', '20:00', '21:00', '22:00'] }].map(({ label, value, set, opts }) => (
              <div key={label}>
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {label} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select value={value} onChange={(e) => set(e.target.value)} className={inputCls + ' appearance-none cursor-pointer pr-10'}>
                    <option value="" disabled>Chọn giờ</option>
                    {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-slate-100" />

          {/* Male section */}
          {(targetGender === 'all' || targetGender === 'male') && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Cần tuyển nam <span className="text-rose-500">*</span>
                  </label>
                  <input type="number" value={maleSlots} onChange={(e) => setMaleSlots(e.target.value)} placeholder="VD: 2" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <span className="font-bold text-emerald-500">$</span> Phí nam (k)
                  </label>
                  <input type="number" value={maleFee} onChange={(e) => setMaleFee(e.target.value)} placeholder="VD: 80" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4" /> Trình độ nam <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {LEVELS.map((lvl) => (
                    <button
                      key={`m-${lvl}`}
                      onClick={() => toggleLevel(lvl, true)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                        maleLevel.includes(lvl)
                          ? 'bg-blue-50 border-[#3b82f6] text-[#3b82f6] ring-1 ring-[#3b82f6]/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {targetGender === 'all' && <div className="h-px bg-slate-100" />}

          {/* Female section */}
          {(targetGender === 'all' || targetGender === 'female') && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Cần tuyển nữ <span className="text-rose-500">*</span>
                  </label>
                  <input type="number" value={femaleSlots} onChange={(e) => setFemaleSlots(e.target.value)} placeholder="VD: 1" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <span className="font-bold text-emerald-500">$</span> Phí nữ (k)
                  </label>
                  <input type="number" value={femaleFee} onChange={(e) => setFemaleFee(e.target.value)} placeholder="VD: 60" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4" /> Trình độ nữ <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {LEVELS.map((lvl) => (
                    <button
                      key={`f-${lvl}`}
                      onClick={() => toggleLevel(lvl, false)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                        femaleLevel.includes(lvl)
                          ? 'bg-rose-50 border-rose-500 text-rose-600 ring-1 ring-rose-500/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-slate-100" />

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Số điện thoại
              </label>
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="09xxxxxx" className={inputCls} />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4" /> Link Facebook
              </label>
              <input type="text" value={contactFb} onChange={(e) => setContactFb(e.target.value)} placeholder="https://facebook.com/..." className={inputCls} />
            </div>
          </div>
          <p className="text-[13px] text-slate-500 -translate-y-3 ml-1">
            Cần điền ít nhất số điện thoại hoặc link Facebook.
          </p>

          {/* Notes */}
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4" /> Ghi chú thêm
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Viết thêm thông tin để người xem dễ quyết định hơn..."
              className={inputCls + ' resize-none'}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-100 p-5 md:p-6 rounded-b-3xl shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-slate-500 font-medium">
            Đăng bài hôm nay: <span className="font-bold text-slate-700">0 / 1</span> (còn 1)
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isSubmitting ? 'Đang lưu...' : 'Lưu và đăng bài'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
