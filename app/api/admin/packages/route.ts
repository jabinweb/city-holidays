import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Admin packages fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const newPackage = await prisma.package.create({
      data: packageData
    });

    return NextResponse.json(newPackage);
  } catch (error) {
    console.error('Package creation error:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
