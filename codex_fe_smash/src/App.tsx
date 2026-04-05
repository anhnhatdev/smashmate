import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { LandingPage } from './pages/Landing'
import { FeedPage } from './pages/Feed'
import { MapPage } from './pages/Map'
import { RankingPage } from './pages/Ranking'
import { PricingPage } from './pages/Pricing'
import { InterestsPage } from './pages/Interests'
import { RemindersPage } from './pages/Reminders'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <LandingPage />
          </AppShell>
        }
      />
      <Route
        path="/feed"
        element={
          <AppShell>
            <FeedPage />
          </AppShell>
        }
      />
      <Route
        path="/map"
        element={
          <AppShell hideFooterOnMap>
            <MapPage />
          </AppShell>
        }
      />
      <Route
        path="/ranking"
        element={
          <AppShell>
            <RankingPage />
          </AppShell>
        }
      />
      <Route
        path="/pricing"
        element={
          <AppShell>
            <PricingPage />
          </AppShell>
        }
      />
      <Route
        path="/interests"
        element={
          <AppShell>
            <InterestsPage />
          </AppShell>
        }
      />
      <Route
        path="/reminders"
        element={
          <AppShell>
            <RemindersPage />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
