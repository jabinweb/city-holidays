import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');

    const packageItem = await prisma.package.findUnique({
      where: { id: params.id }
    });

    if (!packageItem) {
      return NextResponse.json(
        { message: 'Package not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields if they exist
    const formattedPackage = {
      ...packageItem,
      highlights: packageItem.highlights ? JSON.parse(packageItem.highlights) : null,
      itinerary: packageItem.itinerary ? JSON.parse(packageItem.itinerary) : null,
      pickupPoints: packageItem.pickupPoints ? JSON.parse(packageItem.pickupPoints) : null,
    };

    return NextResponse.json(formattedPackage);
  } catch (error) {
    console.error('Package fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');

    const session = await auth();

    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const packageData = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      duration: data.duration,
      location: data.location,
      imageUrl: data.imageUrl,
      highlights: data.highlights ? JSON.stringify(data.highlights) : null,
      itinerary: data.itinerary ? JSON.stringify(data.itinerary) : null,
      type: data.type || 'package',
      transportation: data.transportation,
      pickupPoints: data.pickupPoints ? JSON.stringify(data.pickupPoints) : null,
      popular: data.popular || false
    };

    const updatedPackage = await prisma.package.update({
      where: { id: params.id },
      data: packageData
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Package update error:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');

    const session = await auth();

    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.package.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Package deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
