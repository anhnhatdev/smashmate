import { Link } from 'react-router-dom'
import { Bell, Bot, Heart, MapPinned, Sparkles } from 'lucide-react'

interface FooterColumnItem {
  label: string
  to: string
}

interface FooterColumnProps {
  title: string
  items: FooterColumnItem[]
}

function FooterCol({ title, items }: FooterColumnProps) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark">🏸</span>
            <span className="logo-text">
              SmashMate <span>Badminton</span>
            </span>
          </div>
          <p>
            Tổng hợp bài đăng cầu lông từ nhiều Facebook groups, tìm kèo nhanh hơn với AI,
            lọc theo khoảng cách, và theo dõi lịch chơi trong một ứng dụng.
          </p>
          <div className="badge-row footer-badges">
            <span className="badge sky"><Bot size={13} />AI Search</span>
            <span className="badge emerald"><MapPinned size={13} />Distance Filter</span>
            <span className="badge rose"><Heart size={13} />Interests</span>
            <span className="badge violet"><Bell size={13} />Reminders</span>
          </div>
        </div>

        <FooterCol
          title="Tính năng"
          items={[
            { label: 'Tìm kèo', to: '/feed?type=match' },
            { label: 'Tìm sân / pass sân', to: '/feed?type=court' },
            { label: 'Bản đồ sân', to: '/map' },
            { label: 'Mua bán dụng cụ', to: '/feed?type=sell' },
          ]}
        />

        <FooterCol
          title="Cá nhân"
          items={[
            { label: 'Danh sách quan tâm', to: '/interests' },
            { label: 'Nhắc lịch của tôi', to: '/reminders' },
            { label: 'Xếp hạng cộng đồng', to: '/ranking' },
          ]}
        />

        <div className="footer-column footer-note">
          <h3>Thông tin</h3>
          <ul>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>Hỗ trợ</a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>Chính sách quyền riêng tư</a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản sử dụng</a>
            </li>
          </ul>
          <div className="footer-tip">
            <p>
              <Sparkles size={14} /> Dữ liệu cập nhật liên tục
            </p>
            <span>
              Nguồn bài đăng từ cộng đồng, hệ thống lọc và gợi ý theo tiêu chí bạn đã chọn.
            </span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 SmashMate. All rights reserved.</p>
        <p>Dành cho cộng đồng cầu lông Việt Nam 🇻🇳</p>
      </div>
    </footer>
  )
}
