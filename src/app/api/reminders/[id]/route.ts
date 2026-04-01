import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// PATCH /api/reminders/[id]  – toggle active or edit fields
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const reminder = await prisma.reminder.findUnique({ where: { id: params.id } });
    if (!reminder || reminder.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.reminder.update({
      where: { id: params.id },
      data: {
        ...(body.label      !== undefined && { label:      body.label }),
        ...(body.daysOfWeek !== undefined && { daysOfWeek: body.daysOfWeek }),
        ...(body.timeFrom   !== undefined && { timeFrom:   body.timeFrom }),
        ...(body.timeTo     !== undefined && { timeTo:     body.timeTo }),
        ...(body.levels     !== undefined && { levels:     body.levels }),
        ...(body.radius     !== undefined && { radius:     body.radius }),
        ...(body.active     !== undefined && { active:     body.active }),
      },
    });

    return NextResponse.json({ success: true, reminder: updated });
  } catch (error: any) {
    console.error('[reminders/[id]] PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/reminders/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const reminder = await prisma.reminder.findUnique({ where: { id: params.id } });
    if (!reminder || reminder.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.reminder.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Đã xóa nhắc lịch' });
  } catch (error: any) {
    console.error('[reminders/[id]] DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
