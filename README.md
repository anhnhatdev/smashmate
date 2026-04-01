# 🏸 SmashMate

> **Nền tảng tìm kèo cầu lông số 1 Việt Nam**  
> Tổng hợp bài đăng từ 10+ Facebook Groups • AI Search • Map View • Reminders

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: Private](https://img.shields.io/badge/License-Private-red)](#)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📍 **Map View** | Leaflet-powered court map with live post popups and directions |
| ❤️ **Interests** | Bookmark posts; filter by skill level, area, and time slot |
| 🔔 **Reminders** | AI-matched recurring schedule alerts |
| 🤖 **SmashMate AI** | Natural-language search powered by Google Gemini |
| 🔐 **Auth** | Google & Facebook OAuth via NextAuth.js |
| 📊 **Multi-type Posts** | tuyen-keo • pass-san • lop-day • mua-ban • CLB |

---

## 🛠️ Tech Stack

```
Framework    Next.js 14 (App Router)
Language     TypeScript 5 (strict)
Database     PostgreSQL via Supabase + Prisma ORM
Auth         NextAuth.js v4 (Google, Facebook)
Map          Leaflet + react-leaflet
AI           Google Gemini (@google/generative-ai)
Styling      Tailwind CSS v3 + custom utilities
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/anhnhatdev/smashmate.git
cd smashmate
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in your values (see `.env.example` for all required keys):

| Variable | Where to get it |
|---|---|
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID/SECRET` | [Google Cloud Console](https://console.cloud.google.com) |
| `FACEBOOK_CLIENT_ID/SECRET` | [Facebook Developers](https://developers.facebook.com) |
| `DATABASE_URL` | [Supabase](https://supabase.com) → Settings → Database |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# (Optional) Seed demo data
npm run seed
```

### 4. Run Dev Server

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
smashmate/
├── prisma/
│   ├── schema.prisma      # DB models: User, Post, Interest, Reminder
│   └── seed.ts            # Demo seed data (15 posts, 3 users)
├── src/
│   ├── app/
│   │   ├── api/            # Route handlers (posts, chat, auth, interests)
│   │   ├── feed/           # Post feed page with filters
│   │   ├── san/            # Court map page
│   │   ├── interests/      # Saved posts page
│   │   ├── reminders/      # Schedule reminder page
│   │   ├── profile/        # User profile page
│   │   ├── layout.tsx      # Root layout (Navbar, Footer, FloatingAI)
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky nav + modals (location, theme, login, profile)
│   │   ├── Footer.tsx         # Site footer
│   │   ├── CreatePostModal.tsx # Post creation form (7 types)
│   │   ├── FloatingAIBtn.tsx  # Gemini AI chat widget
│   │   ├── MapComponent.tsx   # Leaflet dynamic map
│   │   └── Providers.tsx      # NextAuth SessionProvider
│   └── lib/
│       └── prisma.ts          # PrismaClient singleton
├── .env.example           # ← Copy to .env and fill secrets
└── .gitignore             # Excludes .env, node_modules, .next, etc.
```

---

## 🖲️ Database Models

```
User       ─ NextAuth core + phone, fbLink, level, address, role
Post       ─ postType | courtName | eventDate | slots | levels | status
Interest   ─ userId × postId bookmark (unique constraint)
Reminder   ─ daysOfWeek[] | timeFrom | timeTo | levels[] | radius
```

---

## 🔒 Security

- **Never commit `.env`** — it is listed in `.gitignore`
- All secrets are injected at runtime via environment variables
- Use `.env.example` as a safe template for onboarding teammates
- NextAuth JWT signing uses `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)

---

## 📄 License

Private — All rights reserved © 2026 SmashMate
