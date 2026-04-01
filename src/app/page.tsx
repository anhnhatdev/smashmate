import React from 'react';
import {
  MapPin, Heart, Bell, Sparkles, ArrowRight, Facebook, Globe, RotateCcw,
  Zap, Map, Route, Pin, Bot, CheckCircle, Search, CalendarCheck, ShoppingCart,
  Coffee, MessageSquare, Bug, Lightbulb, Puzzle,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 hero-gradient">

        {/* ─── Hero ─── */}
        <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
            <Sparkles className="h-4 w-4" /> NỀN TẢNG CẦU LÔNG SỐ 1 VIỆT NAM
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-800 leading-tight">
            Chơi Cầu Lông <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-400 to-amber-500">
              Thông Minh Hơn
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Tổng hợp bài đăng từ các group Facebook hàng đầu. Xem bản đồ, bài đăng theo sân,
            chỉ đường ngay và lọc kèo cực nhanh.
          </p>
          <button
            id="hero-cta"
            className="bg-blue-500 text-white px-8 py-3.5 rounded-full text-lg font-bold shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
          >
            Tìm Kèo Ngay <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Dữ liệu cập nhật liên tục từ 10+ Facebook Groups
          </p>
        </section>

        {/* ─── Facebook Groups ─── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <Facebook className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Tổng hợp từ các Group Facebook hàng đầu</h2>
                <p className="text-slate-500">Bài đăng được thu thập tự động và cập nhật liên tục 24/7</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { letter: 'S', color: 'blue', name: 'CLB Cầu Lông Sài Gòn', members: '45K' },
                { letter: 'H', color: 'orange', name: 'Giao Lưu Cầu Lông HN', members: '38K' },
                { letter: 'Đ', color: 'cyan', name: 'Badminton Đà Nẵng', members: '22K' },
                { letter: 'VN', color: 'slate', name: 'Cầu Lông Việt Nam', members: '120K' },
              ].map(({ letter, color, name, members }) => (
                <div key={name} className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 bg-white shadow-sm">
                  <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center font-bold text-${color}-600`}>{letter}</div>
                  <div>
                    <div className="font-bold text-sm">{name}</div>
                    <div className="text-xs text-slate-500">{members} thành viên</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-600 pt-6 border-t border-slate-100">
              <span><span className="w-2 h-2 inline-block rounded-full bg-emerald-500 mr-2" />Đang theo dõi <strong>10+ groups</strong></span>
              <span><strong>500+</strong> bài mới / tuần</span>
              <span>Cập nhật mỗi <strong>15 phút</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: Globe, color: 'blue', title: 'Thu thập', desc: 'Từ 10+ groups lớn' },
              { icon: Zap, color: 'emerald', title: 'Phân loại', desc: 'AI tự phân loại bài' },
              { icon: RotateCcw, color: 'cyan', title: 'Cập nhật', desc: 'Mỗi 15 phút liên tục' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                <div className={`w-14 h-14 bg-${color}-50 text-${color}-500 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3 Feature Cards ─── */}
        <section className="max-w-6xl mx-auto px-4 mb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="h-4 w-4" /> TÍNH NĂNG NỔI BẬT
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-slate-800">Tìm kèo chưa bao giờ dễ hơn</h2>
          <p className="text-slate-500 mb-10">3 tính năng giúp bạn không bỏ lỡ trận đấu nào</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Map */}
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 transition-transform hover:-translate-y-2">
              <div className="flex justify-between items-start mb-16">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                  <Map className="w-3 h-3" /> BẢN ĐỒ
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Globe className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-snug">Bản đồ sân thông minh + popup bài đăng theo sân</h3>
              <p className="text-blue-100 mb-8">Chạm vào sân để xem số bài đăng, danh sách giờ hiện tại và chỉ đường trực tiếp.</p>
              <div className="flex flex-wrap gap-2">
                {[{ icon: Map, l: 'Map sân' }, { icon: MapPin, l: 'Khoảng cách' }, { icon: Route, l: 'Chỉ đường' }].map(({ icon: I, l }) => (
                  <span key={l} className="bg-white/15 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 border border-white/10">
                    <I className="w-4 h-4" /> {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-pink-500 text-white rounded-[2rem] p-8 transition-transform hover:-translate-y-2">
              <div className="flex justify-between items-start mb-16">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                  <Heart className="w-3 h-3" /> QUAN TÂM
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Heart className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-snug">Bộ lọc sâu + lưu kèo quan tâm cực nhanh</h3>
              <p className="text-pink-100 mb-8">Lọc theo khu vực, trình độ, khung giờ. Nhấn ❤️ để lưu bài bạn quan tâm.</p>
              <div className="flex flex-wrap gap-2">
                {[{ icon: Pin, l: 'Khu vực' }, { icon: Zap, l: 'Trình độ' }, { icon: CalendarCheck, l: 'Khung giờ' }].map(({ icon: I, l }) => (
                  <span key={l} className="bg-white/15 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 border border-white/10">
                    <I className="w-4 h-4" /> {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div className="bg-violet-600 text-white rounded-[2rem] p-8 transition-transform hover:-translate-y-2">
              <div className="flex justify-between items-start mb-16">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                  <Bell className="w-3 h-3" /> NHẮC LỊCH
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Bell className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-snug">AI + nhắc lịch tự động, không bỏ lỡ kèo</h3>
              <p className="text-violet-100 mb-8">Nhập tiêu chí một lần, hệ thống tự so khớp và gửi nhắc lịch khi có kèo phù hợp.</p>
              <div className="flex flex-wrap gap-2">
                {[{ icon: Bot, l: 'AI hỗ trợ' }, { icon: Bell, l: 'Tự thông báo' }, { icon: CheckCircle, l: 'Đúng tiêu chí' }].map(({ icon: I, l }) => (
                  <span key={l} className="bg-white/15 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 border border-white/10">
                    <I className="w-4 h-4" /> {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── AI Section ─── */}
        <section className="max-w-6xl mx-auto px-4 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Sparkles className="h-4 w-4" /> TRỢ LÝ AI THÔNG MINH
            </div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Hỏi <span className="text-blue-500">SmashMate AI</span>,<br />tìm kèo trong tích tắc
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Không cần lướt feed. Chỉ cần nói cho AI biết bạn muốn gì — tìm kèo, sân trống, hay mua bán dụng cụ.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Search, t: 'Tìm kèo theo khu vực' },
                { icon: CalendarCheck, t: 'Gợi ý sân còn slot' },
                { icon: Bell, t: 'Đặt nhắc lịch tự động' },
                { icon: ShoppingCart, t: 'Tìm mua bán dụng cụ' },
              ].map(({ icon: I, t }) => (
                <span key={t} className="bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full font-medium flex items-center gap-2 text-sm">
                  <I className="w-4 h-4 text-slate-400" /> {t}
                </span>
              ))}
            </div>
            <button
              id="try-ai-btn"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Thử SmashMate AI ngay
            </button>
          </div>

          {/* AI Chat Mockup */}
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[450px]">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white flex items-center gap-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://ui-avatars.com/api/?name=Chau+Hoai&background=slate&color=fff"
                alt="Avatar"
              />
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  SmashMate AI
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">BETA</span>
                </div>
                <div className="text-xs text-blue-100">Trợ lý thông minh</div>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 self-start rounded-tl-sm text-sm shadow-sm max-w-[85%]">
                Xin chào! 👋 Mình là SmashMate AI. Bạn muốn tìm gì hôm nay?
              </div>
              <div className="bg-blue-500 text-white rounded-2xl p-4 self-end rounded-br-sm text-sm shadow-sm max-w-[85%]">
                Tìm kèo giao lưu ở Sài Gòn, trình TB
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 self-start rounded-tl-sm text-sm shadow-sm max-w-[85%] w-full">
                <div className="font-bold mb-3">Tuyệt! Mình tìm thấy kèo phù hợp 🏸</div>
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl font-medium flex items-center justify-between cursor-pointer border border-blue-100 hover:bg-blue-100">
                  <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Mở trang tìm kèo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="bg-slate-50 border border-slate-200 rounded-full p-1.5 flex gap-2">
                <input type="text" placeholder="Hỏi gì đi, vd: tìm kèo ở Sài Gòn..." className="flex-1 bg-transparent px-4 outline-none text-sm" />
                <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="bg-white rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center text-center shadow-sm border border-slate-100 gap-8">
            {[
              { value: '500+', label: 'Bài đăng mỗi tuần' },
              { value: '10+', label: 'Facebook Groups' },
              { value: '24/7', label: 'Cập nhật liên tục' },
              { value: '100%', label: 'Miễn phí hoàn toàn' },
            ].map(({ value, label }, i, arr) => (
              <React.Fragment key={label}>
                <div>
                  <div className="text-4xl font-extrabold text-blue-500 mb-2">{value}</div>
                  <div className="text-slate-500 font-medium tracking-wide text-sm">{label}</div>
                </div>
                {i < arr.length - 1 && <div className="hidden md:block w-px h-16 bg-slate-200" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ─── Support / Feedback ─── */}
        <section className="max-w-5xl mx-auto px-4 mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donate */}
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-sm">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ụng hộ SmashMate</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-xs">
              Nếu bạn thấy hữu ích, hãy mua mình một ly cà phê để duy trì nền tảng miễn phí!
            </p>
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-3">
              <div className="bg-slate-100 w-40 h-40 flex items-center justify-center rounded-lg text-slate-400 border-2 border-dashed border-slate-300">
                <span className="text-xs">[QR Donate]</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-2">SmashMate Sponsor</div>
            <div className="text-xs font-bold text-amber-600">🙏 Mọi đóng góp đều có ý nghĩa!</div>
          </div>

          {/* Feedback */}
          <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-6 shadow-sm">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Góp ý cho mình</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-sm">
              SmashMate luôn được cải thiện nhờ góp ý của cộng đồng.
            </p>
            <div className="flex gap-2 text-2xl text-amber-400 mb-6">★ ★ ★ ★ <span className="text-slate-300">★</span></div>
            <div className="flex gap-3 mb-6">
              <span className="bg-white border border-rose-100 text-rose-500 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                <Bug className="w-3 h-3" /> Lỗi / Bug
              </span>
              <span className="bg-white border border-blue-100 text-blue-500 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Ý tưởng
              </span>
              <span className="bg-white border border-purple-100 text-purple-500 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                <Puzzle className="w-3 h-3" /> UX
              </span>
            </div>
            <a href="#" className="font-semibold text-blue-500 hover:underline text-sm">
              Bấm nút &ldquo;Ụng hộ &amp; Góp ý&rdquo; trên header!
            </a>
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="bg-blue-600 text-white text-center py-20 px-4">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng lên sân?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Hàng nghìn người chơi đang tìm đối thủ. Tham gia ngay để không bỏ lỡ kèo hay.
          </p>
          <button
            id="bottom-cta"
            className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-slate-50 transition flex items-center gap-2 mx-auto"
          >
            Bắt Đầu Miễn Phí <ArrowRight className="w-5 h-5" />
          </button>
        </section>

      </main>
    </div>
  );
}
