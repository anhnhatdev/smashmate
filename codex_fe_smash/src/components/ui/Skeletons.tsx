export function PostCardSkeleton() {
  return (
    <div className="post-card skeleton-card" aria-hidden="true">
      <div className="skeleton-line w-24 h-6 mb-3" />
      <div className="skeleton-line w-full h-5 mb-2" />
      <div className="skeleton-line w-3/4 h-5 mb-4" />
      <div className="skeleton-line w-full h-16 mb-3" />
      <div className="skeleton-meta">
        <div className="skeleton-line w-20 h-4" />
        <div className="skeleton-line w-20 h-4" />
        <div className="skeleton-line w-20 h-4" />
      </div>
    </div>
  )
}

export function CourtCardSkeleton() {
  return (
    <div className="map-court-card skeleton-card" aria-hidden="true">
      <div className="skeleton-line w-3/4 h-5 mb-2" />
      <div className="skeleton-line w-1/2 h-4 mb-3" />
      <div className="skeleton-meta">
        <div className="skeleton-line w-16 h-4" />
        <div className="skeleton-line w-24 h-4" />
      </div>
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="stat-card glass skeleton-card" aria-hidden="true">
      <div className="skeleton-circle" />
      <div>
        <div className="skeleton-line w-12 h-5 mb-1" />
        <div className="skeleton-line w-20 h-4" />
      </div>
    </div>
  )
}
