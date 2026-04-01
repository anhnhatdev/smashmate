import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// ── Haversine formula ──
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── GET /api/posts ──
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postType = searchParams.get('type') ?? 'tuyen-keo';
    const query = searchParams.get('q') ?? '';
    const date = searchParams.get('date') ?? '';
    const timeFrom = searchParams.get('timeFrom') ?? '';
    const timeTo = searchParams.get('timeTo') ?? '';
    const levelsStr = searchParams.get('levels') ?? '';
    const slots = searchParams.get('slots') ?? '';
    const isMyPosts = searchParams.get('isMyPosts') === 'true';
    const userLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
    const userLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;
    const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : null;

    const where: any = { postType, status: 'OPEN' };

    if (isMyPosts) {
      const session = await getServerSession(authOptions);
      if (!session?.user || !(session.user as any).id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      where.authorId = (session.user as any).id;
      delete where.status;
      delete where.postType;
    }

    where.AND = [];

    if (query) {
      where.AND.push({
        OR: [
          { courtName: { contains: query, mode: 'insensitive' } },
          { notes: { contains: query, mode: 'insensitive' } },
        ],
      });
    }

    if (date) {
      const d = new Date(date);
      const start = new Date(d); start.setHours(0, 0, 0, 0);
      const end = new Date(d); end.setHours(23, 59, 59, 999);
      where.eventDate = { gte: start, lte: end };
    }

    if (timeFrom) where.startTime = { ...(where.startTime ?? {}), gte: timeFrom };
    if (timeTo)   where.startTime = { ...(where.startTime ?? {}), lte: timeTo };

    if (levelsStr) {
      const levelArr = levelsStr.split(',');
      where.AND.push({
        OR: [
          { maleLevels: { hasSome: levelArr } },
          { femaleLevels: { hasSome: levelArr } },
        ],
      });
    }

    if (slots) {
      const slotsMap: Record<string, any> = {
        '1-2': { in: [1, 2] },
        '3-4': { in: [3, 4] },
        '5+':  { gte: 5 },
      };
      if (slotsMap[slots]) {
        where.AND.push({
          OR: [
            { maleSlots: slotsMap[slots] },
            { femaleSlots: slotsMap[slots] },
          ],
        });
      }
    }

    if (where.AND.length === 0) delete where.AND;

    const posts = await prisma.post.findMany({
      where,
      include: { author: { select: { name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });

    let result = posts as any[];

    // Optional geo-filter using Haversine
    if (userLat !== null && userLng !== null && radius !== null && radius > 0) {
      result = result
        .map((post) => {
          const offset = ((post.courtName?.length ?? 5) % 15) * 0.01;
          const mockLat = userLat + offset * 0.8;
          const mockLng = userLng + offset * 0.8;
          const dist = getDistanceKm(userLat, userLng, mockLat, mockLng);
          return { ...post, distance: parseFloat(dist.toFixed(1)) };
        })
        .filter((post) => post.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    }

    return NextResponse.json({ success: true, posts: result });
  } catch (error: any) {
    console.error('[posts/route] GET error:', error);
    return NextResponse.json({ error: 'Lỗi khi tải danh sách bài viết.' }, { status: 500 });
  }
}

// ── POST /api/posts ──
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized. Vui lòng đăng nhập.' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const {
      postType, courtName, eventDate, startTime, endTime,
      targetGender, maleSlots, maleFee, maleLevels,
      femaleSlots, femaleFee, femaleLevels,
      contactPhone, contactFb, notes,
    } = body;

    const post = await prisma.post.create({
      data: {
        postType:     postType ?? 'tuyen-keo',
        courtName:    courtName ?? '',
        eventDate:    new Date(eventDate),
        startTime:    startTime ?? '',
        endTime:      endTime ?? '',
        targetGender: targetGender ?? 'all',
        maleSlots:    Number(maleSlots) || 0,
        maleFee:      Number(maleFee) || 0,
        maleLevels:   maleLevels ?? [],
        femaleSlots:  Number(femaleSlots) || 0,
        femaleFee:    Number(femaleFee) || 0,
        femaleLevels: femaleLevels ?? [],
        contactPhone: contactPhone ?? '',
        contactFb:    contactFb ?? '',
        notes:        notes ?? '',
        authorId:     userId,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('[posts/route] POST error:', error);
    return NextResponse.json({ error: error.message ?? 'Lỗi hệ thống.' }, { status: 500 });
  }
}
