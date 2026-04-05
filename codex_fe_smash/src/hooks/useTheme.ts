import { useState, useEffect, useCallback } from 'react'
import type { ThemeName } from '../types'

const THEME_KEY = 'smashmate_theme'
const THEMES: ThemeName[] = ['light', 'dark', 'ocean', 'forest', 'sunset', 'rose']

const THEME_LABELS: Record<ThemeName, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
  ocean: '🌊 Ocean',
  forest: '🌿 Forest',
  sunset: '🌅 Sunset',
  rose: '🌸 Rose',
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved && THEMES.includes(saved as ThemeName)) return saved as ThemeName
    } catch {}
    return 'light'
  })

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {}
  }, [theme])

  const nextTheme = useCallback(() => {
    setThemeState((current) => {
      const nextIndex = (THEMES.indexOf(current) + 1) % THEMES.length
      return THEMES[nextIndex]
    })
  }, [])

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), [])

  return { theme, nextTheme, setTheme, themeLabel: THEME_LABELS[theme], themes: THEMES, themeLabels: THEME_LABELS }
}
