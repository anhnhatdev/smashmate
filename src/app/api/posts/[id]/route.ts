import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// DELETE /api/posts/[id] – owner-only
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const post = await prisma.post.findUnique({ where: { id: params.id } });

    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    if (post.authorId !== userId) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Xóa bài đăng thành công.' });
  } catch (error: any) {
    console.error('[posts/[id]] DELETE error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống.' }, { status: 500 });
  }
}
