import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Bell,
  Search,
  MapPinned,
  Trophy,
  History,
  CreditCard,
  Palette,
  Sun,
  Moon,
  Wind,
  Trees,
  Sunset as SunsetIcon,
  Flower2,
  Sparkles,
} from 'lucide-react'

const THEMES = [
  { id: 'light', name: 'Sáng', icon: <Sun size={14} /> },
  { id: 'dark', name: 'Tối', icon: <Moon size={14} /> },
  { id: 'ocean', name: 'Đại dương', icon: <Wind size={14} /> },
  { id: 'forest', name: 'Rừng xanh', icon: <Trees size={14} /> },
  { id: 'sunset', name: 'Hoàng hôn', icon: <SunsetIcon size={14} /> },
  { id: 'rose', name: 'Hoa hồng', icon: <Flower2 size={14} /> },
]

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const location = useLocation()

  function changeTheme(theme: string) {
    const root = document.documentElement
    THEMES.forEach((t) => root.classList.remove(t.id))
    root.classList.add(theme)
    localStorage.setItem('smash-theme', theme)
    setThemeOpen(false)
  }

  const navLinks = [
    { path: '/feed', label: 'Tìm kèo', icon: <Search size={18} /> },
    { path: '/map', label: 'Sân cầu', icon: <MapPinned size={18} /> },
    { path: '/ranking', label: 'Xếp hạng', icon: <Trophy size={18} /> },
    { path: '/pricing', label: 'Gói dùng', icon: <CreditCard size={18} /> },
  ]

  const rightLinks = [
    { path: '/interests', label: 'Quan tâm', icon: <History size={18} /> },
    { path: '/reminders', label: 'Nhắc lịch', icon: <Bell size={18} /> },
  ]

  return (
    <header className="topbar" style={{ padding: '1rem 0', background: 'transparent' }}>
      <div className="container topbar-inner" style={{ 
        background: 'white',
        borderRadius: '999px',
        padding: '0.6rem 1.75rem',
        border: '1.5px solid var(--border)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}>
        <div className="brand-row" style={{ gap: '1.5rem' }}>
          <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              background: 'hsl(var(--primary))', 
              borderRadius: '0.75rem', 
              display: 'grid', 
              placeItems: 'center',
              boxShadow: '0 8px 15px hsla(var(--primary), 0.25)' 
            }}>
              <span style={{ fontSize: '1.4rem' }}>🏸</span>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'hsl(var(--foreground))' }}>
              SmashMate<span style={{ color: 'hsl(var(--primary))' }}>.</span>
            </span>
          </Link>

          <nav className="desktop-only" style={{ display: 'flex', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ 
                  padding: '0.6rem 1.25rem', 
                  borderRadius: '999px', 
                  fontSize: '0.92rem', 
                  fontWeight: 700,
                  color: location.pathname === link.path ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  background: location.pathname === link.path ? 'hsla(var(--primary), 0.08)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="topbar-actions" style={{ gap: '1rem' }}>
          <div className="desktop-only" style={{ display: 'flex', gap: '0.5rem' }}>
            {rightLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: location.pathname === link.path ? 'hsla(var(--primary), 0.08)' : 'hsla(var(--foreground), 0.05)',
                  color: location.pathname === link.path ? 'hsl(var(--primary))' : 'inherit',
                  transition: 'all 0.2s'
                }}
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: 'hsla(var(--foreground), 0.05)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Palette size={20} />
            </button>

            {themeOpen && (
              <div
                className="glass"
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '120%', 
                  width: '180px', 
                  borderRadius: '1.5rem',
                  padding: '0.75rem',
                  zIndex: 100,
                  background: 'white',
                  border: '1.5px solid var(--border)'
                }}
              >
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'hsl(var(--foreground))',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'hsla(var(--foreground), 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ color: 'hsl(var(--primary))' }}>{theme.icon}</span>
                    {theme.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="cta-button primary small desktop-only" style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', fontSize: '0.9rem' }}>
            Mở App <Sparkles size={16} />
          </button>

          <button
            className="mobile-only"
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'hsla(var(--foreground), 0.05)',
              border: 'none'
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu container" style={{ 
          marginTop: '0.5rem', 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '1.5rem',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[...navLinks, ...rightLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: location.pathname === link.path ? 'hsl(var(--primary))' : 'inherit',
                  background: location.pathname === link.path ? 'hsla(var(--primary), 0.08)' : 'transparent'
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
