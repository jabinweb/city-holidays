import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const bookingSchema = z.object({
  packageId: z.string().optional(),
  serviceType: z.enum(['HOLIDAY_PACKAGE', 'GOLDEN_TRIANGLE', 'FLIGHT', 'RAILWAY', 'BUS', 'TAXI']),
  travelers: z.number().min(1),
  rooms: z.number().optional(),
  date: z.string().optional(),
  totalAmount: z.number(),
  specialRequests: z.string().optional(),
  contactName: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  contactAddress: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  emergencyRelation: z.string().optional(),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  pickupTime: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');

    const data = await request.json();
    
    // Validate required fields
    if (!data.serviceType || !data.totalAmount) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking data object
    const bookingData: any = {
      userId: session.user.id,
      totalAmount: parseFloat(data.totalAmount),
      paidAmount: 0,
      status: 'PENDING',
      numberOfPeople: data.travelers || 1,
      travelDate: data.travelDate ? new Date(data.travelDate) : new Date(),
      specialRequests: data.specialRequests || null,
    };

    // Only add packageId if it exists and is not undefined
    if (data.packageId && data.packageId !== 'undefined') {
      bookingData.packageId = data.packageId;
    } else {
      // For services without packageId, we'll need to handle this differently
      // For now, let's skip packageId and it will be null in the database
      return NextResponse.json(
        { message: 'Package ID is required for bookings' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: bookingData,
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
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      booking: booking,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        package: {
          select: {
            title: true,
            duration: true,
            location: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(bookings);

  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
