import React from 'react'
import { Heart, HeartOff, ChevronRight, MapPinned, Swords, Clock3, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { feedPosts, defaultInterests } from '../data'
import { useFavorites } from '../hooks/useFavorites'

export function InterestsPage() {
  const { favorites, toggle } = useFavorites()
  const favoritePosts = feedPosts.filter((p) => favorites.has(p.id))

  return (
    <div className="container app-page">
      <section className="page-hero compact" aria-labelledby="interests-title">
        <div className="eyebrow">
          <Heart size={14} aria-hidden="true" />
          Danh sách quan tâm của bạn
        </div>
        <h1 id="interests-title" className="page-title">Yêu thích & Lưu trữ</h1>
        <p className="page-subtitle">
          Quản lý các bài đăng tìm kèo, pass sân và dụng cụ mà bạn đã lưu tâm.
        </p>
      </section>

      <div className="interests-tabs" role="tablist">
        <button className="interest-tab active" role="tab" aria-selected="true">
          Bài đăng đã lưu ({favoritePosts.length})
        </button>
        <button className="interest-tab" role="tab" aria-selected="false">
          Danh mục quan tâm ({defaultInterests.length})
        </button>
      </div>

      <div className="interests-grid">
        <div className="interests-main">
          {favoritePosts.length === 0 ? (
            <div className="empty-state glass">
              <span className="empty-emoji">❤️</span>
              <h3>Bạn chưa lưu bài đăng nào</h3>
              <p>Hãy khám phá các bài đăng và nhấn vào biểu tượng trái tim để lưu lại.</p>
              <Link to="/feed" className="cta-button primary small">Đi tới Feed ngay</Link>
            </div>
          ) : (
            <div className="feed-list" role="list">
              {favoritePosts.map((post) => (
                <article key={post.id} className={`post-card ${post.accent}`}>
                  <div className="post-topline">
                    <span className={`card-chip ${post.accent}`}>
                      {post.type === 'match' ? 'Tìm kèo' : post.type === 'court' ? 'Pass sân' : 'Mua bán'}
                    </span>
                    <button
                      className="fav-btn-active"
                      onClick={() => toggle(post.id)}
                      aria-label="Bỏ lưu bài đăng"
                    >
                      <HeartOff size={16} />
                    </button>
                  </div>
                  <h3>{post.title}</h3>
                  <div className="post-meta">
                    <span><MapPinned size={14} /> {post.area}</span>
                    <span><Swords size={14} /> {post.level}</span>
                    <span><Clock3 size={14} /> {post.time}</span>
                  </div>
                  <div className="post-footer">
                    <strong>{post.club}</strong>
                    <button type="button">
                      Xem chi tiết <ChevronRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="interests-sidebar">
          <h3>Danh mục gợi ý</h3>
          <div className="mini-grid-vertical">
            {defaultInterests.map((item) => (
              <Link
                key={item.id}
                className={`interest-card ${item.color} glass`}
                to={`/feed?q=${item.query}`}
              >
                <div className="interest-card-inner">
                  <strong>{item.title}</strong>
                  <div className="interest-meta">
                    <Search size={12} />
                    <span>{item.count} bài phù hợp tuần này</span>
                  </div>
                </div>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
          <div className="sidebar-promo glass">
            <p>Hệ thống AI sẽ gửi thông báo mỗi khi có bài đăng mới phù hợp với sở thích của bạn.</p>
            <button className="cta-button secondary small">Cài đặt thông báo</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
