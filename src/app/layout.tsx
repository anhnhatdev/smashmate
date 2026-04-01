import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIBtn from '@/components/FloatingAIBtn';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmashMate – Tìm Kèo Cầu Lông Miễn Phí | Nền Tảng Cầu Lông Số 1 Việt Nam',
  description:
    'Tổng hợp bài đăng tìm kèo cầu lông từ 10+ Facebook Groups. Lọc theo trình độ, khu vực, khung giờ. AI hỗ trợ tìm kèo thông minh.',
  openGraph: {
    title: 'SmashMate – Nền Tảng Tìm Kèo Cầu Lông',
    description: 'Tìm kèo cầu lông nhanh hơn với AI. Miễn phí, cập nhật 24/7.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50`}
      >
        <Providers>
          <Navbar />
          {children}
          <FloatingAIBtn />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
