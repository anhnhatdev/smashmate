import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/leaderboard?period=today|week&type=authors|courts
 *
 * Returns top-10 authors (most posts) or top-10 courts (most active posts)
 * within the requested time period.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') ?? 'today'; // 'today' | 'week'
    const type   = searchParams.get('type')   ?? 'authors'; // 'authors' | 'courts'

    const now = new Date();
    const dateFrom = new Date(now);
    if (period === 'week') {
      dateFrom.setDate(dateFrom.getDate() - 7);
    }
    dateFrom.setHours(0, 0, 0, 0);

    if (type === 'courts') {
      const raw = await prisma.post.groupBy({
        by: ['courtName'],
        where: {
          createdAt: { gte: dateFrom },
          status: 'OPEN',
          postType: 'tuyen-keo',
          NOT: [{ courtName: null }, { courtName: '' }],
        },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      });

      const courts = raw.map((item, idx) => ({
        rank:        idx + 1,
        name:        item.courtName!,
        activePosts: item._count.id,
        avatar:      `https://ui-avatars.com/api/?name=${encodeURIComponent(item.courtName ?? 'S')}&background=0ea5e9&color=fff&bold=true`,
        desc:        `${item._count.id} bài tuyển kèo ${period === 'today' ? 'hôm nay' : '7 ngày qua'}`,
      }));

      return NextResponse.json({ success: true, type: 'courts', period, data: courts });
    }

    // --- authors ---
    const raw = await prisma.post.groupBy({
      by: ['authorId'],
      where: { createdAt: { gte: dateFrom } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const users = await prisma.user.findMany({
      where: { id: { in: raw.map((r) => r.authorId) } },
      select: { id: true, name: true, image: true, level: true },
    });
    const byId = Object.fromEntries(users.map((u) => [u.id, u]));

    const MEDALS = ['Đầu bảng 🥇', 'Bám đuổi 🥈', 'Top nóng 🥉'];
    const authors = raw.map((item, idx) => {
      const user = byId[item.authorId];
      return {
        rank:   idx + 1,
        userId: item.authorId,
        name:   user?.name ?? 'Ẩn danh',
        posts:  item._count.id,
        level:  user?.level ?? null,
        avatar: user?.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? 'U')}&background=64748b&color=fff`,
        desc:   MEDALS[idx] ?? `Giữ nhịp đăng mạnh ${period === 'today' ? 'hôm nay' : '7 ngày qua'}`,
      };
    });

    return NextResponse.json({ success: true, type: 'authors', period, data: authors });
  } catch (error: any) {
    console.error('[leaderboard/route] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
