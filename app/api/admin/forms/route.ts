import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;
    const where: any = {};

    if (type && type !== 'all') {
      where.type = type;
    }
    if (status && status !== 'all') {
      where.status = status;
    }

    const [forms, total] = await Promise.all([
      prisma.formResponse.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.formResponse.count({ where })
    ]);

    return NextResponse.json({
      forms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch form responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form responses' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, status, priority, assignedTo } = await request.json();

    const formResponse = await prisma.formResponse.update({
      where: { id },
      data: {
        status,
        priority,
        assignedTo
      }
    });

    return NextResponse.json(formResponse);
  } catch (error) {
    console.error('Failed to update form response:', error);
    return NextResponse.json(
      { error: 'Failed to update form response' },
      { status: 500 }
    );
  }
}
