import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'smashmate_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return new Set(JSON.parse(saved) as number[])
    } catch {}
    return new Set()
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
    } catch {}
  }, [favorites])

  const toggle = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites])

  return { favorites, toggle, isFavorite }
}
