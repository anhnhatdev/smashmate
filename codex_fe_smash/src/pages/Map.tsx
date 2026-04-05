import React, { useState, useMemo } from 'react'
import {
  MapPinned,
  Search,
  Store,
  Clock3,
  Star,
  Phone,
  Navigation,
  X,
  Plus,
  Minimize2,
} from 'lucide-react'
import { courts } from '../data'
import { CourtCardSkeleton } from '../components/ui/Skeletons'
import type { Court } from '../types'

export function MapPage() {
  const [search, setSearch] = useState('')
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null)
  const [filter, setFilter] = useState<'all' | 'open' | 'price'>('all')
  const [loading] = useState(false)

  const filteredCourts = useMemo(() => {
    let result = courts
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q)
      )
    }
    if (filter === 'open') {
      // Giả lập check đang mở (trong mock data luôn mở hoặc check theo khung giờ)
      result = result.filter((c) => c.open.includes('06:00') || c.open.includes('05:30'))
    }
    if (filter === 'price') {
      result = [...result].sort((a,b) => a.priceMin - b.priceMin)
    }
    return result
  }, [search, filter])

  return (
    <div className="map-page">
      <aside className="map-sidebar glass" aria-label="Danh sách sân">
        <div className="map-sidebar-head">
          <div>
            <div className="eyebrow subtle">
              <MapPinned size={14} aria-hidden="true" />
              Bản đồ sân cầu lông
            </div>
            <h2>Tìm sân gần bạn</h2>
          </div>
          <span className="count-badge">{filteredCourts.length} sân nổi bật</span>
        </div>

        <div className="search-box">
          <Search size={16} aria-hidden="true" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo khu vực, tên sân..."
            aria-label="Tìm kiếm sân"
          />
        </div>

        <div className="map-filter-row">
          <button
            className={`filter-chip${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            className={`filter-chip${filter === 'open' ? ' active' : ''}`}
            onClick={() => setFilter('open')}
          >
            Đang mở
          </button>
          <button
            className={`filter-chip${filter === 'price' ? ' active' : ''}`}
            onClick={() => setFilter('price')}
          >
            Giá tốt
          </button>
        </div>

        <div className="map-court-list" role="list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <CourtCardSkeleton key={i} />)
          ) : filteredCourts.length === 0 ? (
            <div className="empty-map-state">Không tìm thấy sân phù hợp</div>
          ) : (
            filteredCourts.map((court) => (
              <article
                key={court.id}
                className={`map-court-card${selectedCourt?.id === court.id ? ' active' : ''}`}
                onClick={() => setSelectedCourt(court)}
                aria-current={selectedCourt?.id === court.id}
              >
                <div className="map-court-top">
                  <strong>{court.name}</strong>
                  <span>{court.area}</span>
                </div>
                <div className="map-court-meta">
                  <span><Store size={14} aria-hidden="true" /> {court.courts} sân</span>
                  <span><Clock3 size={14} aria-hidden="true" /> {court.open}</span>
                </div>
                <div className="map-court-bottom">
                  <span>{court.price}</span>
                  <div className="card-rating">
                    <Star size={12} fill="currentColor" />
                    {court.rating}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </aside>

      <section className="map-canvas" aria-label="Bản đồ tương tác">
        <div className="map-grid" />
        <div className="map-watermark">SmashMate Maps</div>

        {/* Map Markers */}
        {filteredCourts.map((court) => (
          <button
            key={court.id}
            className={`map-marker${selectedCourt?.id === court.id ? ' active' : ''}`}
            style={{ top: court.top, left: court.left }}
            onClick={() => setSelectedCourt(court)}
            aria-label={`Sân: ${court.name}`}
          >
            <MapPinned size={18} aria-hidden="true" />
            <span>{court.name}</span>
          </button>
        ))}

        {/* Court Detail Panel (Floating) */}
        {selectedCourt && (
          <div className="map-detail-panel glass slide-in-top">
            <button
              className="panel-close"
              onClick={() => setSelectedCourt(null)}
              aria-label="Đóng chi tiết"
            >
              <X size={16} />
            </button>

            <div className="panel-header">
              <h3>{selectedCourt.name}</h3>
              <div className="panel-rating">
                <Star size={14} fill="currentColor" />
                {selectedCourt.rating}
              </div>
            </div>
            <p className="panel-area">{selectedCourt.area}</p>

            <div className="panel-meta-grid">
              <div className="panel-meta-item">
                <Store size={16} />
                <div>
                  <strong>{selectedCourt.courts}</strong>
                  <span>Sân thảm</span>
                </div>
              </div>
              <div className="panel-meta-item">
                <Clock3 size={16} />
                <div>
                  <strong>{selectedCourt.open}</strong>
                  <span>Giờ mở cửa</span>
                </div>
              </div>
            </div>

            <div className="amenities-list">
              {selectedCourt.amenities.map((item) => (
                <span key={item} className="amenity-tag">{item}</span>
              ))}
            </div>

            <div className="panel-footer">
              <div className="panel-price">
                <span>Giá từ</span>
                <strong>{selectedCourt.price}</strong>
              </div>
              <div className="panel-actions">
                <button className="icon-btn-circle" title="Gọi điện">
                  <Phone size={18} />
                </button>
                <button className="cta-button primary small">
                  <Navigation size={14} /> Chỉ đường
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="map-controls">
          <button className="map-control-btn" aria-label="Phóng to"><Plus size={18} /></button>
          <button className="map-control-btn" aria-label="Thu nhỏ"><Minimize2 size={18} /></button>
        </div>
      </section>
    </div>
  )
}
