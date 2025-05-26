import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
        { message: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        packageId: validatedData.packageId,
        serviceType: validatedData.serviceType,
        travelers: validatedData.travelers,
        rooms: validatedData.rooms,
        date: validatedData.date ? new Date(validatedData.date) : null,
        totalAmount: validatedData.totalAmount,
        paidAmount: 0, // Initially no payment made
        specialRequests: validatedData.specialRequests,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone,
        contactAddress: validatedData.contactAddress,
        emergencyName: validatedData.emergencyName,
        emergencyPhone: validatedData.emergencyPhone,
        emergencyRelation: validatedData.emergencyRelation,
        pickupLocation: validatedData.pickupLocation,
        dropLocation: validatedData.dropLocation,
        pickupTime: validatedData.pickupTime ? new Date(validatedData.pickupTime) : null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Booking creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
