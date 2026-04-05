import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useToast } from '../../hooks/useToast'
import { useFavorites } from '../../hooks/useFavorites'
import { Topbar } from './Topbar'
import { SiteFooter } from './Footer'
import { ToastContainer } from '../ui/Toast'

interface AppShellProps {
  children: React.ReactNode
  hideFooterOnMap?: boolean
}

export function AppShell({ children, hideFooterOnMap = false }: AppShellProps) {
  const location = useLocation()
  const { theme } = useTheme()
  const { toasts, addToast, removeToast } = useToast()
  const { favorites } = useFavorites()

  const isMapPage = hideFooterOnMap && location.pathname === '/map'

  return (
    <div className={`app-shell ${theme}`}>
      {/* Ambient background glows */}
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <Topbar favoriteCount={favorites.size} />

      <main
        id="main-content"
        className={`page-shell${isMapPage ? ' map-mode' : ''}`}
        tabIndex={-1}
      >
        {/* Pass addToast down via context would be ideal, but for now we export it */}
        {React.cloneElement(children as React.ReactElement, { addToast })}
      </main>

      {!isMapPage && <SiteFooter />}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
