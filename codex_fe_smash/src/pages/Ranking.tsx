import { Trophy, Medal, MapPinned, TrendingUp, UserRound, ArrowUpRight } from 'lucide-react'
import { ranking } from '../data'

function PodiumCard({ rank, player }: { rank: number; player: typeof ranking[0] }) {
  const isTop1 = rank === 1
  return (
    <article className={`podium-card rank-${rank} glass${isTop1 ? ' featured' : ''}`} style={{ 
      borderRadius: 'var(--radius-2xl)', 
      padding: isTop1 ? '3rem 2.5rem' : '2rem',
      textAlign: 'center',
      position: 'relative',
      borderWidth: isTop1 ? '3px' : '1.5px',
      borderColor: isTop1 ? 'hsla(var(--primary), 0.5)' : 'var(--border)',
      transform: isTop1 ? 'scale(1.1)' : 'scale(1)',
      zIndex: isTop1 ? 10 : 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.25rem',
      background: isTop1 ? 'var(--card)' : 'hsla(var(--card), 0.7)',
      boxShadow: isTop1 ? 'var(--shadow-lg)' : 'var(--shadow-soft)'
    }}>
      <div className="medal-wrap" style={{ 
        width: '4rem', 
        height: '4rem', 
        borderRadius: '50%', 
        background: `hsla(var(${isTop1 ? '--primary' : '--muted'}), 0.1)`,
        color: `hsl(var(${isTop1 ? '--primary' : '--foreground'}))`,
        display: 'grid',
        placeItems: 'center'
      }}>
        <Medal size={isTop1 ? 32 : 24} />
      </div>
      
      <div style={{ position: 'relative' }}>
        <div className={`player-avatar-${isTop1 ? 'lg' : 'md'}`} style={{ 
          width: isTop1 ? '6rem' : '4.5rem', 
          height: isTop1 ? '6rem' : '4.5rem', 
          borderRadius: '50%', 
          background: 'hsla(var(--foreground), 0.05)',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: 'var(--shadow-soft)'
        }}>
          {player.avatar ? (
            <img src={player.avatar} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><UserRound size={isTop1 ? 32 : 24} /></div>
          )}
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-0.5rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'hsl(var(--foreground))',
          color: 'white',
          padding: '0.2rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>#{rank}</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: isTop1 ? '1.5rem' : '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{player.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <MapPinned size={12} /> {player.district}
        </p>
      </div>

      <div style={{ 
        background: 'hsla(var(--foreground), 0.04)', 
        padding: '0.75rem 1.5rem', 
        borderRadius: '1.25rem',
        width: '100%'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'hsl(var(--primary))' }}>{player.score.toLocaleString()}</div>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.6 }}>Điểm ELO</div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))' }}>
        <span>{player.games} trận</span>
        <span>•</span>
        <span style={{ color: 'hsl(var(--success))' }}>{player.winRate}% thắng</span>
      </div>
    </article>
  )
}

export function RankingPage() {
  const podium = ranking.slice(0, 3)

  return (
    <div className="container app-page" style={{ paddingBottom: '8rem' }}>
      <section className="page-hero compact centered" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
         <div className="eyebrow" style={{ 
          background: 'hsla(var(--primary), 0.1)', 
          color: 'hsl(var(--primary))',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          width: 'fit-content',
          margin: '0 auto 1.5rem',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          <Trophy size={14} style={{ marginRight: '0.5rem' }} />
          Hall of Fame
        </div>
        <h1 className="page-title" style={{ fontSize: '3.5rem', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Người chơi nổi bật</h1>
        <p className="page-subtitle" style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.6, 
          color: 'hsl(var(--muted-foreground))',
          maxWidth: '600px',
          margin: '0 auto' 
        }}>
          Hệ thống tính điểm ELO dựa trên hàng nghìn trận đấu giao lưu thực tế trong cộng đồng.
        </p>
      </section>

      {/* Podium Top 3 */}
      <div className="podium-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2.5rem', 
        alignItems: 'end',
        marginBottom: '8rem',
        padding: '0 2rem'
      }}>
        {podium.length >= 2 && <PodiumCard rank={2} player={podium[1]} />}
        {podium.length >= 1 && <PodiumCard rank={1} player={podium[0]} />}
        {podium.length >= 3 && <PodiumCard rank={3} player={podium[2]} />}
      </div>

      {/* Leaderboard */}
      <div className="leaderboard-container container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Tất cả người chơi <ArrowUpRight size={24} style={{ color: 'hsl(var(--primary))' }} />
        </h2>

        <div className="leaderboard glass" style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
          {ranking.map((player) => (
            <div key={player.rank} style={{ 
              display: 'grid', 
              gridTemplateColumns: '80px 1fr 120px 120px', 
              alignItems: 'center', 
              padding: '1.5rem 2.5rem',
              borderBottom: '1px solid hsla(var(--foreground), 0.04)',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = 'hsla(var(--foreground), 0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: player.rank <= 3 ? 'hsl(var(--primary))' : 'inherit' }}>#{player.rank}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'hsla(var(--foreground), 0.04)', display: 'grid', placeItems: 'center' }}>
                  <UserRound size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{player.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{player.district}</div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{player.games}</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5, fontWeight: 800 }}>Trận</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'hsl(var(--primary))' }}>{player.score}</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5, fontWeight: 800 }}>ELO</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ranking-info-card glass" style={{ 
        marginTop: '6rem', 
        padding: '3rem', 
        borderRadius: 'var(--radius-xl)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2.5rem',
        background: 'linear-gradient(to right, hsla(var(--primary), 0.06), hsla(var(--violet), 0.06))',
        borderWidth: '2px',
        maxWidth: '900px',
        margin: '6rem auto 0'
      }}>
        <div style={{ 
          width: '4rem', 
          height: '4rem', 
          borderRadius: '1.25rem', 
          background: 'white', 
          color: 'hsl(var(--primary))',
          display: 'grid',
          placeItems: 'center',
          boxShadow: 'var(--shadow-lg)',
          flexShrink: 0
        }}><TrendingUp size={24} /></div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Quy tắc tính điểm ELO</h4>
          <p style={{ fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>
            Điểm ELO được cập nhật mỗi khi kết quả trận đấu được ghi nhận trên SmashMate. 
            Điểm cộng phụ thuộc vào trình độ đối thủ và xác suất thắng của bạn.
          </p>
        </div>
        <button className="cta-button secondary small" style={{ flexShrink: 0 }}>Xem chi tiết</button>
      </div>
    </div>
  )
}
