import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const priceRange = searchParams.get('priceRange');

    // Build where clause
    const where: any = {};
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }
    
    if (type) {
      where.type = type;
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (min && max) {
        where.price = {
          gte: min,
          lte: max
        };
      } else if (min) {
        where.price = { gte: min };
      } else if (max) {
        where.price = { lte: max };
      }
    }

    const packages = await prisma.package.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    // Parse JSON fields for each package
    const formattedPackages = packages.map(pkg => ({
      ...pkg,
      highlights: pkg.highlights ? JSON.parse(pkg.highlights) : null,
      itinerary: pkg.itinerary ? JSON.parse(pkg.itinerary) : null,
      pickupPoints: pkg.pickupPoints ? JSON.parse(pkg.pickupPoints) : null,
    }));

    return NextResponse.json(formattedPackages);
  } catch (error) {
    console.error('Failed to fetch packages:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
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
    console.error('Failed to create package:', error);
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}
