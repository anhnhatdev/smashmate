import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      select: {
        id: true, name: true, email: true, image: true,
        phone: true, fbLink: true, level: true, address: true,
        _count: { select: { posts: true, interests: true } },
      },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('[profile/route] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/profile
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { name, phone, fbLink, level, address } = await req.json();

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name    !== undefined && { name }),
        ...(phone   !== undefined && { phone }),
        ...(fbLink  !== undefined && { fbLink }),
        ...(level   !== undefined && { level }),
        ...(address !== undefined && { address }),
      },
      select: {
        id: true, name: true, email: true, image: true,
        phone: true, fbLink: true, level: true, address: true,
      },
    });

    return NextResponse.json({ success: true, user: updated, message: 'Đã lưu thay đổi thành công!' });
  } catch (error: any) {
    console.error('[profile/route] PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
