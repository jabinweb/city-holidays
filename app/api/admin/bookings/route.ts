import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    // Type assertion to ensure TypeScript recognizes the role property
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }
    
    if (search) {
      where.OR = [
        { contactName: { contains: search, mode: 'insensitive' } },
        { contactEmail: { contains: search, mode: 'insensitive' } },
        { contactPhone: { contains: search } },
      ];
    }

    // Get bookings with pagination
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin bookings fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    
    // Type assertion to ensure TypeScript recognizes the role property
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookingId, status } = await request.json();

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Admin booking update error:', error);
    return NextResponse.json(
      { message: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
