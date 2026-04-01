import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/interests?postType=tuyen-keo
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(req.url);
    const postType = searchParams.get('postType') ?? undefined;

    const interests = await prisma.interest.findMany({
      where: {
        userId,
        ...(postType ? { post: { postType } } : {}),
      },
      include: {
        post: { include: { author: { select: { id: true, name: true, image: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: interests.length,
      interests: interests.map((i) => ({ ...i.post, savedAt: i.createdAt, interestId: i.id })),
    });
  } catch (error: any) {
    console.error('[interests/route] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/interests  – toggle bookmark
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const existing = await prisma.interest.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      await prisma.interest.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true, saved: false, message: 'Đã bỏ lưu bài viết' });
    }

    const interest = await prisma.interest.create({ data: { userId, postId } });
    return NextResponse.json({ success: true, saved: true, interest, message: 'Đã lưu bài viết' });
  } catch (error: any) {
    console.error('[interests/route] POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
