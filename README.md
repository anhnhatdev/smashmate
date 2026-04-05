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

---

## 📋 Kế Hoạch Hoàn Thiện (Development Plan)

Kế hoạch dưới đây liệt kê các checklist công việc để nâng cấp **SmashMate** (dự án chính) trở nên hoàn thiện, kết hợp các tính năng nền tảng từ dự án tham chiếu (`smashmate-app`) và chuẩn hóa lại giao diện & kiến trúc backend.

### 1. Giao Diện (Frontend & UX)
- [x] **Đồng bộ Design System Premium**: Áp dụng triệt để ngôn ngữ thiết kế mới (hiệu ứng Glassmorphism, bóng đổ Glow, màu sắc gradient hiện đại) từ Landing Page (`/page.tsx`) sang tất cả các trang phụ (`/feed`, `/san`, `/pricing`, `/profile`, `/xep-hang`).
- [ ] **Responsive & Micro-animations**: Tối ưu Navbar, Create Post Modal, và các thẻ bài đăng cho trải nghiệm mượt mà trên Mobile. Bổ sung các hiệu ứng chuyển cảnh (sử dụng Tailwind CSS animations hoặc Framer Motion).
- [ ] **Tối ưu Trải nghiệm Data Fetching**: Thêm các Component Skeleton/Loading states khi đang tải danh sách bài đăng (`/feed`), hiển thị điểm trên Map (`/san`), hoặc đang chờ AI trả lời, tránh tình trạng giật lag giao diện.

### 2. Backend & Business Logic
- [ ] **Xóa bỏ Mockup Data, Cập nhật Tọa Độ Thật**: Thay thế logic giả lập (hashing tọa độ theo tên sân trong `GET /api/posts`) bằng việc mapping thực tế. Yêu cầu tạo mới bảng `Court` (chứa lat, lng thật) và parse địa chỉ để tính khoảng cách bằng Haversine formula một cách chuẩn xác.
- [ ] **Hoàn thiện AI Chat (Google Gemini)**: Endpoint `app/api/chat/route.ts` cần được kết nối chính thức với API của Google Gemini SDK để phân tích ngôn ngữ tự nhiên (Vd: "Tìm kèo giao lưu Sài Gòn"), tự động chuyển thành JSON parameters fetch thẳng bài viết từ database.
- [ ] **Tích hợp Crawler Tự Động**: Tạo API Webhook (Vd: `POST /api/webhook/crawler`) để lắng nghe payload gửi lên từ Tool Crawler Python (Selenium fb crawler). Lọc dữ liệu thô thành định dạng chuẩn của `Post` schema.
- [ ] **Cơ chế Nhắc Lịch (Cron Jobs)**: Viết script/cron job chạy ngầm (Node-cron hoặc Vercel Cron) định kỳ map dữ liệu bài đăng mới với bảng tiêu chí `Reminder` của từng User, sau đó gửi thông báo qua Email hoặc Push Notification.

### 3. Database (Prisma)
- [ ] Tách bảng `Court` riêng biệt với `Post` để quản lý danh sách sân cầu và tọa độ chuẩn.
- [ ] Bổ sung các Indexes database trong `schema.prisma` cho các trường hay search như `postType`, `eventDate`, `level`, `status` để tối ưu Query Speed.

### 4. DevOps, SEO & Monitoring
- [ ] **Tích hợp Hệ thống Giám Sát**: Cài đặt **Sentry** để theo dõi lỗi phát sinh trên phía Client và API của người dùng.
- [ ] **Chuẩn hóa SEO**: Render `sitemap.xml`, `robots.txt`, tạo Meta Tags (OpenGraph) xịn xò cho từng trang (nhất là chi tiết trang `/feed/[id]`).
- [ ] Yêu cầu Lint code nghiêm ngặt & setup CD (Continuous Deployment) lên nền tảng Vercel để Live Môi Trường Production dễ dàng.
