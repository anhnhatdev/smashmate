import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/reminders?matchPosts=true
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const matchPosts = new URL(req.url).searchParams.get('matchPosts') === 'true';

    const reminders = await prisma.reminder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    let matchedPosts: any[] = [];

    if (matchPosts) {
      const active = reminders.filter((r) => r.active);

      if (active.length > 0) {
        const today = new Date();
        const allLevels: string[] = [];
        const timeRanges: { from: string; to: string }[] = [];

        active.forEach((r) => {
          allLevels.push(...r.levels);
          timeRanges.push({ from: r.timeFrom, to: r.timeTo });
        });

        const uniqueLevels = [...new Set(allLevels)];
        const timeConditions = timeRanges.map((t) => ({
          AND: [{ startTime: { gte: t.from } }, { startTime: { lte: t.to } }],
        }));

        matchedPosts = await prisma.post.findMany({
          where: {
            status: 'OPEN',
            eventDate: { gte: today },
            AND: [
              timeConditions.length > 0 ? { OR: timeConditions } : {},
              uniqueLevels.length > 0
                ? { OR: [{ maleLevels: { hasSome: uniqueLevels } }, { femaleLevels: { hasSome: uniqueLevels } }] }
                : {},
            ],
          },
          include: { author: { select: { name: true, image: true } } },
          orderBy: { eventDate: 'asc' },
          take: 20,
        });
      }
    }

    return NextResponse.json({
      success: true,
      reminders,
      matchedPosts,
      activeCount: reminders.filter((r) => r.active).length,
    });
  } catch (error: any) {
    console.error('[reminders/route] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/reminders
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { label, daysOfWeek, timeFrom, timeTo, levels, radius } = await req.json();

    if (!label || !daysOfWeek || !timeFrom || !timeTo) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const reminder = await prisma.reminder.create({
      data: {
        userId,
        label,
        daysOfWeek: daysOfWeek ?? [],
        timeFrom,
        timeTo,
        levels: levels ?? [],
        radius: radius != null ? Number(radius) : null,
      },
    });

    return NextResponse.json({ success: true, reminder }, { status: 201 });
  } catch (error: any) {
    console.error('[reminders/route] POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
