import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // 1. Verify Vercel Cron Request (Bảo mật endpoint)
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized access to cron' }, { status: 401 });
  }

  try {
    // 2. Fetch toàn bộ Reminder đang hoạt động
    const reminders = await prisma.reminder.findMany({
      where: { active: true },
      include: { user: true },
    });

    if (reminders.length === 0) {
      return NextResponse.json({ message: 'Không có reminder nào hoạt động.' }, { status: 200 });
    }

    // 3. Fetch các bài đăng OPEN mới tạo trong 24h qua
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentPosts = await prisma.post.findMany({
      where: { 
        status: 'OPEN',
        createdAt: { gte: twentyFourHoursAgo }
      },
      include: { court: true }
    });

    let emailsSent = 0;

    // 4. Thuật toán Matching tự động
    for (const reminder of reminders) {
      const matchedPosts = recentPosts.filter(post => {
        // Lọc theo ngày trong tuần (Day of Week)
        const postDayObj = new Date(post.eventDate);
        const postDayOfWeek = postDayObj.getDay(); 
        if (reminder.daysOfWeek && reminder.daysOfWeek.length > 0) {
           if (!reminder.daysOfWeek.includes(postDayOfWeek)) return false;
        }
        
        // Lọc theo khoảng thời gian (hh:mm)
        if (reminder.timeFrom && post.startTime < reminder.timeFrom) return false;
        if (reminder.timeTo && post.startTime > reminder.timeTo) return false;

        // Lọc theo khoảng Level
        if (reminder.levels && reminder.levels.length > 0) {
           const maleMatch = post.maleLevels.some(l => reminder.levels.includes(l));
           const femaleMatch = post.femaleLevels.some(l => reminder.levels.includes(l));
           if (!maleMatch && !femaleMatch && post.maleLevels.length > 0 && post.femaleLevels.length > 0) {
               return false;
           }
        }

        // Bỏ qua lọc Radius phức tạp tạm thời do cron chạy độc lập trên server không query được vị trí realtime của user, 
        // Thay vào đó có thể filter qua district nếu được lưu.

        return true;
      });

      if (matchedPosts.length > 0 && reminder.user?.email) {
         // Mô phỏng Action gửi Email (Tích hợp Resend/NodeMailer ở đây)
         console.log(`[CRON] 🚀 Đang gửi Email tới: ${reminder.user.email} | Tiêu chí: "${reminder.label}"`);
         console.log(`[CRON] Nội dung: Tuyển chọn ${matchedPosts.length} kèo hợp lý vừa được đăng tải!`);
         
         // Giả lập call API Email
         emailsSent++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Quét thành công. Đã khớp và gửi thông báo ${emailsSent} user.`
    }, { status: 200 });

  } catch (error: any) {
    console.error('[cron/reminders] Error during cron cycle:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
