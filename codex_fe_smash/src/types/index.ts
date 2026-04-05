export type ThemeName = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'rose'
export type FeedType = 'match' | 'court' | 'sell'
export type AccentColor = 'sky' | 'emerald' | 'orange'
export type BadgeTone = 'sky' | 'emerald' | 'rose' | 'violet'

export interface Post {
  id: number
  type: FeedType
  title: string
  club: string
  area: string
  level: string
  time: string
  distance: string
  distanceKm: number
  excerpt: string
  tags: string[]
  accent: AccentColor
  postedAt: string
  views: number
}

export interface Court {
  id: number
  name: string
  area: string
  courts: number
  open: string
  price: string
  priceMin: number
  top: string
  left: string
  rating: number
  amenities: string[]
  phone: string
}

export interface Player {
  id: number
  name: string
  score: number
  district: string
  streak: string
  rank: number
  games: number
  winRate: number
  avatar?: string
}

export interface Plan {
  name: string
  price: string
  priceNum: number
  description: string
  features: string[]
  tone: 'slate' | 'sky' | 'emerald'
  featured?: boolean
  cta: string
}

export interface ReminderItem {
  id: number
  title: string
  time: string
  note: string
  type: 'match' | 'court' | 'sell'
}

export interface InterestItem {
  id: number
  title: string
  count: number
  color: 'rose' | 'emerald' | 'amber'
  query: string
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'info' | 'warning'
}
