import React from 'react';
import { Sparkles, MapPin, Heart, Bell, RotateCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏸</span>
              <span className="font-bold text-lg text-slate-800">
                SmashMate <span className="text-blue-500">Badminton</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-6 max-w-sm leading-relaxed">
              Tổng hợp bài đăng cầu lông từ nhiều Facebook groups, tìm kèo nhanh hơn với AI,
              lọc theo khoảng cách, và theo dõi lịch chơi trong một ứng dụng.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Search
              </span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Distance Filter
              </span>
              <span className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Heart className="w-3 h-3" /> Interests
              </span>
              <span className="bg-violet-50 text-violet-600 border border-violet-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Bell className="w-3 h-3" /> Reminders
              </span>
            </div>
          </div>

          {/* Tính năng */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4">Tính năng</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="/feed" className="hover:text-blue-600">Tìm kèo</a></li>
              <li><a href="/san" className="hover:text-blue-600">Tìm sân / pass sân</a></li>
              <li><a href="/san" className="hover:text-blue-600">Map view</a></li>
              <li><a href="#" className="hover:text-blue-600">Mua bán dụng cụ</a></li>
            </ul>
          </div>

          {/* Cá nhân */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4">Cá nhân</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Danh sách quan tâm</a></li>
              <li><a href="#" className="hover:text-blue-600">Nhắc lịch của tôi</a></li>
              <li><a href="/feed" className="hover:text-blue-600">Trang feed</a></li>
            </ul>
          </div>

          {/* Thông tin */}
          <div className="md:col-span-3">
            <h4 className="font-bold mb-4">Thông tin</h4>
            <ul className="space-y-3 text-sm text-slate-500 mb-6">
              <li><a href="#" className="hover:text-blue-600">Hỗ trợ</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách quyền riêng tư</a></li>
              <li><a href="#" className="hover:text-blue-600">Điều khoản sử dụng</a></li>
            </ul>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-blue-500" /> Dữ liệu cập nhật liên tục
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                Nguồn bài đăng từ cộng đồng, hệ thống lọc và gợi ý theo tiêu chí.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>&copy; 2026 SmashMate. All rights reserved.</div>
          <div>Dành cho cộng đồng cầu lông Việt Nam.</div>
        </div>
      </div>
    </footer>
  );
}
