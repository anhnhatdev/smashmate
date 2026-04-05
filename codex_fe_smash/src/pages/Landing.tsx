import { Link } from 'react-router-dom'
import {
  Sparkles,
  UsersRound,
  ChartNoAxesColumn,
  MapPinned,
  Facebook,
  Globe,
  RotateCcw,
  Zap,
  Map,
  Route,
  Target,
  Bell,
  CheckCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react'

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1, minWidth: '150px' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'hsl(var(--primary))', marginBottom: '0.25rem' }}>{value}</div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="landing-page" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section className="hero-section container" style={{ 
        paddingTop: '8rem', 
        paddingBottom: '6rem', 
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'hsla(var(--primary), 0.08)', 
          color: 'hsl(var(--primary))', 
          padding: '0.5rem 1.25rem', 
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 800,
          marginBottom: '2rem'
        }}>
          <Sparkles size={14} /> NỀN TẢNG CẦU LÔNG SỐ 1 VIỆT NAM
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 1.1, 
          letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
          color: 'hsl(var(--foreground))'
        }}>
          Chơi Cầu Lông <br/>
          <span className="gradient-text">Thông Minh Hơn</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.6, 
          color: 'hsl(var(--muted-foreground))', 
          maxWidth: '700px', 
          margin: '0 auto 3rem' 
        }}>
          Tổng hợp bài đăng từ các group Facebook hàng đầu. Xem bản đồ, bài đăng theo sân, chỉ đường ngay và lọc kèo cực nhanh.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Link className="cta-button primary" to="/feed" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Tìm Kèo Ngay <ArrowRight size={20} />
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))' }}>
          <span style={{ width: '8px', height: '8px', background: 'hsl(var(--success))', borderRadius: '50%' }} />
          Dữ liệu cập nhật liên tục từ 10+ Facebook Groups
        </div>
      </section>

      {/* Facebook Groups Section */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div className="glass" style={{ 
          borderRadius: '2.5rem', 
          padding: '3rem', 
          background: 'white',
          borderWidth: '1.5px',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ 
              width: '5rem', 
              height: '5rem', 
              background: 'hsla(var(--primary), 0.1)', 
              borderRadius: '1.5rem',
              display: 'grid',
              placeItems: 'center',
              color: 'hsl(var(--primary))'
            }}>
              <Facebook size={32} fill="currentColor" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.25rem' }}>Tổng hợp từ các Group Facebook hàng đầu</h2>
              <p style={{ color: 'hsl(var(--muted-foreground))' }}>Bài đăng được thu thập tự động và cập nhật liên tục 24/7</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {[
              { name: 'CLB Cầu Lông Sài Gòn', members: '45K', initial: 'S', color: 'blue' },
              { name: 'Giao Lưu Cầu Lông HN', members: '38K', initial: 'H', color: 'orange' },
              { name: 'Badminton Đà Nẵng', members: '22K', initial: 'Đ', color: 'cyan' },
              { name: 'Cầu Lông Việt Nam', members: '120K', initial: 'VN', color: 'slate' },
            ].map(group => (
              <div key={group.name} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem', 
                borderRadius: '1.25rem', 
                border: '1.5px solid var(--border)',
                background: 'white'
              }}>
                <div style={{ 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  borderRadius: '0.75rem', 
                  background: 'hsla(var(--primary), 0.1)', 
                  display: 'grid', 
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  color: 'hsl(var(--primary))'
                }}>{group.initial}</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{group.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{group.members} thành viên</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '2rem', 
            paddingTop: '2rem', 
            borderTop: '1.5px solid var(--border)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'hsl(var(--muted-foreground))'
          }}>
            <span><span style={{ width: '8px', height: '8px', background: 'hsl(var(--success))', borderRadius: '50%', display: 'inline-block', marginRight: '0.5rem' }} /> Đang theo dõi <strong>10+ groups</strong></span>
            <span><strong>500+</strong> bài mới / tuần</span>
            <span>Cập nhật mỗi <strong>15 phút</strong></span>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="container" style={{ marginBottom: '8rem', textAlign: 'center' }}>
        <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'hsla(var(--primary), 0.08)', 
            color: 'hsl(var(--primary))', 
            padding: '0.5rem 1.25rem', 
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '1.5rem'
        }}>
          <Sparkles size={14} /> TÍNH NĂNG NỔI BẬT
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Tìm kèo chưa bao giờ dễ hơn</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4rem' }}>3 tính năng giúp bạn không bỏ lỡ trận đấu nào</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
          {/* Blue Card */}
          <div style={{ background: '#2563eb', color: 'white', borderRadius: '2.5rem', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>BẢN ĐỒ</span>
                <div style={{ width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                  <Globe size={20} />
                </div>
             </div>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '1rem' }}>Bản đồ sân thông minh + popup bài đăng theo sân</h3>
             <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.6 }}>Chạm vào sân để xem ngay số bài đăng, danh sách bài trong khung giờ hiện tại và chỉ đường trực tiếp.</p>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Map sân', 'Khoảng cách', 'Chỉ đường'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{tag}</span>
                ))}
             </div>
          </div>

          {/* Pink Card */}
          <div style={{ background: '#ec4899', color: 'white', borderRadius: '2.5rem', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>QUAN TÂM</span>
                <div style={{ width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                  <Zap size={20} />
                </div>
             </div>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '1rem' }}>Bộ lọc sâu + lưu kèo quan tâm cực nhanh</h3>
             <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.6 }}>Lọc theo khu vực, trình độ, khung giờ, loại bài. Nhấn ❤️ để lưu và quay lại đúng bài bạn quan tâm.</p>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Khu vực', 'Trình độ', 'Khung giờ'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{tag}</span>
                ))}
             </div>
          </div>

          {/* Violet Card */}
          <div style={{ background: '#7c3aed', color: 'white', borderRadius: '2.5rem', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>NHẮC LỊCH</span>
                <div style={{ width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                  <Bell size={20} />
                </div>
             </div>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.3, marginBottom: '1rem' }}>AI + nhắc lịch tự động, không bỏ lỡ kèo</h3>
             <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.6 }}>Đặt tiêu chí một lần, hệ thống tự so khớp và gửi nhắc lịch khi có kèo mới phù hợp với bạn.</p>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['AI hỗ trợ', 'Tự thông báo', 'Đúng tiêu chí'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{tag}</span>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* AI Mockup Section */}
      <section className="container" style={{ marginBottom: '8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
           <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'hsla(var(--primary), 0.08)', 
              color: 'hsl(var(--primary))', 
              padding: '0.5rem 1.25rem', 
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              marginBottom: '1.5rem'
           }}>
            <Sparkles size={14} /> TRỢ LÝ AI THÔNG MINH
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Hỏi <span style={{ color: 'hsl(var(--primary))' }}>SmashMate AI</span>,<br/>tìm kèo trong tích tắc
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>
            Không cần lướt feed. Chỉ cần nói cho AI biết bạn muốn gì — tìm kèo, sân trống, hay mua bán dụng cụ — SmashMate AI sẽ xử lý ngay.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {['Tìm kèo theo khu vực', 'Gợi ý sân còn slot', 'Đặt nhắc lịch tự động'].map(chip => (
              <span key={chip} style={{ background: 'white', border: '1.5px solid var(--border)', padding: '0.6rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, boxShadow: 'var(--shadow-soft)' }}>{chip}</span>
            ))}
          </div>
          <button className="cta-button primary" style={{ padding: '1rem 2.5rem', borderRadius: '999px', fontWeight: 800 }}>
            Thử SmashMate AI ngay <Sparkles size={18} />
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: '2.5rem', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', height: '480px', display: 'flex', flexDirection: 'column' }}>
           <div style={{ background: 'linear-gradient(to right, #3b82f6, #6366f1)', padding: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>SmashMate AI <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem' }}>BETA</span></div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Trợ lý thông minh</div>
              </div>
           </div>
           <div style={{ flex: 1, padding: '1.5rem', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              <div style={{ background: 'white', padding: '1rem 1.25rem', borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', maxWidth: '85%' }}>
                 Xin chào! 👋 Mình là SmashMate AI. Bạn muốn tìm gì hôm nay?
              </div>
              <div style={{ background: '#3b82f6', color: 'white', padding: '1rem 1.25rem', borderRadius: '1.25rem 1.25rem 0.25rem 1.25rem', fontSize: '0.9rem', alignSelf: 'end', maxWidth: '85%' }}>
                 Tìm kèo giao lưu ở Sài Gòn, trình TB
              </div>
              <div style={{ background: 'white', padding: '1rem 1.25rem', borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', maxWidth: '85%' }}>
                 <strong>Tuyệt! Mình tìm thấy kèo phù hợp 🏸</strong>
                 <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid #dbeafe', background: '#eff6ff', color: '#1d4ed8', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    Mở trang tìm kèo <ArrowRight size={14} />
                 </div>
              </div>
           </div>
           <div style={{ padding: '1.25rem', background: 'white', borderTop: '1px solid var(--border)' }}>
              <div style={{ background: '#f1f5f9', borderRadius: '999px', padding: '0.4rem', display: 'flex', gap: '0.5rem' }}>
                 <input placeholder="Hỏi gì đi, vd: tìm kèo tối nay..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', paddingLeft: '1rem', fontSize: '0.9rem' }} />
                 <button style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#3b82f6', color: 'white', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Search size={16} /></button>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ marginBottom: '8rem' }}>
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', padding: '4rem', background: 'white', borderRadius: '2.5rem', border: '1.5px solid var(--border)', textAlign: 'center' }}>
            <StatItem value="500+" label="Bài đăng mới / tuần" />
            <StatItem value="10+" label="Facebook Groups" />
            <StatItem value="24/7" label="Cập nhật liên tục" />
            <StatItem value="100%" label="Miễn phí hoàn toàn" />
         </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'hsl(var(--primary))', color: 'white', textAlign: 'center', padding: '6rem 0' }}>
         <div className="container">
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Sẵn sàng lên sân?</h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto 3rem' }}>Hàng nghìn người chơi đang tìm đối thủ. Tham gia ngay để không bỏ lỡ kèo hay.</p>
            <button className="cta-button secondary" style={{ background: 'white', color: 'hsl(var(--primary))', fontSize: '1.2rem', padding: '1.25rem 3.5rem', borderRadius: '999px' }}>
              Bắt Đầu Miễn Phí <ArrowRight size={22} />
            </button>
         </div>
      </section>
    </div>
  )
}
