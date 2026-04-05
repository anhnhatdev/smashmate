import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  MapPinned,
  Swords,
  Clock3,
  ChevronRight,
  Heart,
  HeartOff,
  Eye,
  Sparkles,
  X,
  Filter,
  ArrowUpDown,
} from 'lucide-react'
import { feedPosts } from '../data'
import { useFavorites } from '../hooks/useFavorites'
import { useDebounce } from '../hooks/useUtils'
import { PostCardSkeleton } from '../components/ui/Skeletons'
import type { FeedType } from '../types'

const AREAS = ['TP.HCM', 'Hà Nội', 'Đà Nẵng']
const LEVELS = ['3.5 - 5.5', '5.5 - 7.0', 'Open']
const TIMES = ['Sáng', 'Chiều', 'Tối', 'Cuối tuần']
const SORTS = ['Gần tôi', 'Mới nhất', 'Nhiều tương tác'] as const

type SortMode = typeof SORTS[number]

interface FeedPageProps {
  addToast?: (msg: string, type?: 'success' | 'info' | 'warning') => void
}

export function FeedPage({ addToast }: FeedPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const currentType = (params.get('type') as FeedType | null) ?? 'match'

  const [rawSearch, setRawSearch] = useState(params.get('q') ?? '')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('Gần tôi')
  const [loading] = useState(false)

  const search = useDebounce(rawSearch, 280)
  const { toggle, isFavorite } = useFavorites()

  const tabs: { label: string; type: FeedType }[] = [
    { label: '🏸 Tìm kèo', type: 'match' },
    { label: '🏟️ Pass sân', type: 'court' },
    { label: '🛒 Mua bán', type: 'sell' },
  ]

  const filtered = useMemo(() => {
    let posts = feedPosts.filter((p) => p.type === currentType)

    if (search.trim()) {
      const q = search.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    if (selectedArea) {
      posts = posts.filter((p) => p.area.includes(selectedArea))
    }

    if (sortMode === 'Gần tôi') {
      posts = [...posts].sort((a, b) => a.distanceKm - b.distanceKm)
    } else if (sortMode === 'Nhiều tương tác') {
      posts = [...posts].sort((a, b) => b.views - a.views)
    }

    return posts
  }, [currentType, search, selectedArea, sortMode])

  function handleFavorite(id: number, title: string) {
    toggle(id)
    const isNowFav = !isFavorite(id)
    addToast?.(
      isNowFav ? `Đã lưu "${title}" vào quan tâm` : `Đã xoá khỏi danh sách quan tâm`,
      isNowFav ? 'success' : 'info',
    )
  }

  function handleTabChange(type: FeedType) {
    const next = new URLSearchParams(location.search)
    next.set('type', type)
    if (rawSearch) next.set('q', rawSearch)
    navigate(`/feed?${next.toString()}`, { replace: true })
  }

  const hasActiveFilters = selectedArea || selectedLevel || selectedTime

  return (
    <div className="container app-page" style={{ paddingBottom: '6rem' }}>
      {/* Page header */}
      <section className="page-hero compact container" style={{ paddingBottom: '3.5rem', paddingTop: '4rem' }}>
        <h1 className="page-title" style={{ fontSize: '3rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Khám phá feed <span className="gradient-text">cộng đồng</span>
        </h1>
        <p className="page-subtitle" style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))', maxWidth: '600px' }}>
          Hệ thống tổng hợp bài đăng từ 10+ cộng đồng cầu lông lớn nhất Việt Nam, giúp bạn tìm kèo nhanh hơn bao giờ hết.
        </p>
      </section>

      <div className="feed-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2.5rem' }}>
        {/* Sidebar */}
        <aside className="sidebar-card glass" style={{ 
          borderRadius: 'var(--radius-2xl)', 
          padding: '2.25rem',
          height: 'fit-content',
          position: 'sticky',
          top: '6rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
            <Filter size={18} /> Bộ lọc thông minh
          </div>

          {/* Search */}
          <div className="filter-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'hsl(var(--muted-foreground))' }}>Từ khóa</label>
            <div className="search-box" style={{ 
              background: 'hsla(var(--foreground), 0.05)', 
              borderRadius: 'var(--radius-full)', 
              padding: '0.35rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1.5px solid transparent',
              transition: 'all 0.3s'
            }}>
              <Search size={16} style={{ opacity: 0.5 }} />
              <input
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Tìm kèo, sân, vợt..."
                style={{ background: 'none', border: 'none', width: '100%', outline: 'none', fontSize: '0.9rem', color: 'inherit' }}
              />
              {rawSearch && (
                <button onClick={() => setRawSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Area filter */}
          <div className="filter-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Khu vực</label>
            <div className="chip-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {AREAS.map((area) => (
                <button
                  key={area}
                  className={`filter-chip${selectedArea === area ? ' active' : ''}`}
                  onClick={() => setSelectedArea(selectedArea === area ? null : area)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedArea === area ? 'hsl(var(--primary))' : 'hsla(var(--foreground), 0.04)',
                    color: selectedArea === area ? 'white' : 'inherit',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div className="filter-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Trình độ</label>
            <div className="chip-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  className={`filter-chip${selectedLevel === lvl ? ' active' : ''}`}
                  onClick={() => setSelectedLevel(selectedLevel === lvl ? null : lvl)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedLevel === lvl ? 'hsl(var(--primary))' : 'hsla(var(--foreground), 0.04)',
                    color: selectedLevel === lvl ? 'white' : 'inherit',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              className="cta-button secondary small"
              onClick={() => {
                setSelectedArea(null)
                setSelectedLevel(null)
                setSelectedTime(null)
              }}
              style={{ width: '100%', marginTop: '1rem', fontSize: '0.85rem', borderRadius: '1rem' }}
            >
              <X size={13} style={{ marginRight: '0.5rem' }} /> Xoá tất cả bộ lọc
            </button>
          )}

          <div style={{ marginTop: '2.5rem', padding: '1.25rem', borderRadius: '1.5rem', background: 'hsla(var(--primary), 0.06)', display: 'flex', gap: '1rem' }}>
            <Sparkles size={20} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
              Hệ thống AI tự động gợi ý bài đăng phù hợp với trình độ của bạn.
            </p>
          </div>
        </aside>

        {/* Main feed content */}
        <div className="feed-content">
          {/* Toolbar */}
          <div className="feed-toolbar glass" style={{ 
            borderRadius: 'var(--radius-xl)', 
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--glass-bg)',
            borderWidth: '1.5px'
          }}>
            <div className="tab-row" style={{ display: 'flex', gap: '0.5rem' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.type}
                  className={`tab-pill${currentType === tab.type ? ' active' : ''}`}
                  onClick={() => handleTabChange(tab.type)}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    fontSize: '0.9rem', 
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: currentType === tab.type ? 'hsl(var(--card))' : 'transparent',
                    color: currentType === tab.type ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    boxShadow: currentType === tab.type ? 'var(--shadow-soft)' : 'none',
                    transition: 'all 0.3s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>
                  <ArrowUpDown size={14} /> Sắp xếp: 
                  <select 
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    style={{ border: 'none', background: 'none', fontWeight: 700, color: 'hsl(var(--foreground))', cursor: 'pointer' }}
                  >
                    {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
               <span style={{ fontSize: '0.85rem', fontWeight: 700, background: 'hsla(var(--foreground), 0.05)', padding: '0.35rem 0.85rem', borderRadius: '1rem' }}>
                {filtered.length} bài đăng
              </span>
            </div>
          </div>

          {/* Post list */}
          <div className="feed-list" style={{ display: 'grid', gap: '1.5rem' }}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <EmptyState search={rawSearch} onClear={() => setRawSearch('')} />
            ) : (
              filtered.map((post) => (
                <article
                  key={post.id}
                  className="post-card"
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr auto', 
                    gap: '2rem',
                    alignItems: 'start'
                  }}
                >
                  <div style={{ width: '8rem', height: '8rem', borderRadius: '1.25rem', overflow: 'hidden' }}>
                    <img src={post.image || "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=200"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        background: 'hsla(var(--primary), 0.1)', 
                        color: 'hsl(var(--primary))',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '0.5rem'
                      }}>{post.type === 'match' ? '🏸 KÈO ĐẤU' : post.type === 'court' ? '🏟️ PASS SÂN' : '🛒 MUA BÁN'}</span>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>• {post.postedAt}</span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 850, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{post.title}</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.5, marginBottom: '1.25rem', fontSize: '0.95rem' }}>{post.excerpt}</p>

                    <div className="post-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <MapPinned size={14} style={{ color: 'hsl(var(--primary))' }} /> {post.area}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Swords size={14} style={{ color: 'hsl(var(--rose))' }} /> {post.level}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Clock3 size={14} style={{ color: 'hsl(var(--violet))' }} /> {post.time}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'end' }}>
                    <button
                      className={`fav-button${isFavorite(post.id) ? ' active' : ''}`}
                      onClick={() => handleFavorite(post.id, post.title)}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        border: 'none', 
                        background: isFavorite(post.id) ? 'hsla(var(--rose), 0.1)' : 'hsla(var(--foreground), 0.05)',
                        color: isFavorite(post.id) ? 'hsl(var(--rose))' : 'inherit',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isFavorite(post.id) ? <HeartOff size={18} fill="currentColor" /> : <Heart size={18} />}
                    </button>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>
                         <Eye size={12} style={{ verticalAlign: 'middle', marginRight: '0.2rem' }} /> {post.views} xem
                      </div>
                      <button className="cta-button primary small" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', borderRadius: '1rem' }}>
                        Chi tiết <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ search, onClear }: { search: string; onClear: () => void }) {
  return (
    <div style={{ padding: '6rem 3rem', textAlign: 'center', borderRadius: '2rem', background: 'hsla(var(--foreground), 0.02)', border: '2px dashed var(--border)' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Không tìm thấy bài đăng</h3>
      <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        {search
          ? `Không có kết quả nào phù hợp với từ khóa "${search}". Hãy thử từ khóa khác hoặc xóa bộ lọc.`
          : 'Hiện tại chưa có bài đăng nào trong mục này.'}
      </p>
      {search && (
        <button className="cta-button secondary" onClick={onClear} style={{ borderRadius: '1rem' }}>
          Xoá tìm kiếm
        </button>
      )}
    </div>
  )
}
