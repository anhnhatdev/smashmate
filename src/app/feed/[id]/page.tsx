import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MapPin, Clock, CalendarDays, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true, court: true }
  });

  if (!post) {
    return { title: 'Bài đăng không tồn tại | SmashMate' };
  }

  const courtName = post.court?.name || post.courtName || 'sân chưa rõ';
  const postAction = post.postType === 'tuyen-keo' ? 'Tuyển thành viên' : 
                     post.postType === 'pass-san' ? 'Pass Sân' : 'Giao lưu cầu lông';
                     
  const title = `${postAction} tại ${courtName} - SmashMate`;
  const description = `${post.author.name || 'Người dùng'} đang ${postAction} lúc ${post.startTime} - ${post.endTime} ngày ${new Date(post.eventDate).toLocaleDateString('vi-VN')}. Bấm để xem chi tiết, chi phí và tham gia ngay!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://smashmate.test/feed/${post.id}`,
      siteName: 'SmashMate',
      images: [
        {
          url: 'https://smashmate.test/og-default.png', // Should be dynamically generated with @vercel/og in a real app
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SinglePostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true, court: true }
  });

  if (!post) return notFound();

  return (
    <div className="flex flex-col flex-1 bg-[#f8fafc] relative">
      <div className="absolute top-0 left-0 w-full h-[300px] hero-gradient pointer-events-none" />
      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 py-20 relative z-10 font-sans">
        
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-3">
              <span className="text-xs bg-blue-100 text-[#0ea5e9] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{post.postType}</span>
           </div>

           <div className="w-20 h-20 bg-gradient-to-br from-[#0ea5e9] to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-xl">
             <span className="text-white font-extrabold text-2xl">{post.author.name?.charAt(0).toUpperCase() || 'U'}</span>
           </div>
           
           <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
             {post.postType === 'tuyen-keo' ? 'TÌM ĐỒNG ĐỘI' : 'TÌM NGƯỜI GIAO LƯU'}
           </h1>
           <p className="text-slate-500 font-medium mb-8">Đăng bởi <strong className="text-slate-700">{post.author.name}</strong></p>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-rose-500 mt-0.5"/>
                 <div>
                    <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Địa điểm</p>
                    <p className="font-bold text-slate-800 mt-0.5">{post.court?.name || post.courtName || 'Chưa rõ'}</p>
                 </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
                 <CalendarDays className="w-5 h-5 text-emerald-500 mt-0.5"/>
                 <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Ngày đăng</p>
                    <p className="font-bold text-slate-800 mt-0.5">{new Date(post.eventDate).toLocaleDateString('vi-VN')}</p>
                 </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                 <Clock className="w-5 h-5 text-amber-500 mt-0.5"/>
                 <div>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Khung giờ</p>
                    <p className="font-bold text-slate-800 mt-0.5">{post.startTime} - {post.endTime}</p>
                 </div>
              </div>
           </div>

           <Link href="/feed" className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-500/30 transition hover:-translate-y-1">
             Vào App SmashMate Tham Gia Ngay <ExternalLink className="w-4 h-4"/>
           </Link>

        </div>
      </main>
    </div>
  )
}
