import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        package: {
          select: {
            title: true,
            duration: true,
            location: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if user owns this booking or is admin
    const isAdmin = (session.user as any).role === 'ADMIN';
    if (booking.userId !== session.user.id && !isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(booking);

  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { status, ...updateData } = data;

    // Check if user owns this booking or is admin
    const existingBooking = await prisma.booking.findUnique({
      where: { id: params.id }
    });

    if (!existingBooking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    const isAdmin = (session.user as any).role === 'ADMIN';
    if (existingBooking.userId !== session.user.id && !isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        ...updateData,
        ...(status && { status }),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        package: {
          select: {
            title: true,
            duration: true,
            location: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(updatedBooking);

  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json(
      { message: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
