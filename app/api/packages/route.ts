import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const popular = searchParams.get('popular');
    const mixed = searchParams.get('mixed');
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');

    // Build filter conditions
    const where: any = {};
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }
    if (popular === 'true') {
      where.popular = true;
    }
    if (type) {
      where.type = type;
    }

    // Build query options
    const queryOptions: any = {
      where,
      orderBy: mixed === 'true' ? [
        { popular: 'desc' },
        { type: 'asc' },
        { createdAt: 'desc' }
      ] : popular === 'true' ? [
        { popular: 'desc' },
        { createdAt: 'desc' }
      ] : [
        { createdAt: 'desc' }
      ]
    };

    // For mixed packages, get more data to allow better selection
    if (mixed === 'true' && limit) {
      queryOptions.take = parseInt(limit) * 2; // Get more for better mixing
    } else if (limit) {
      queryOptions.take = parseInt(limit);
    }

    let packages;
    try {
      packages = await prisma.package.findMany(queryOptions);
      
      // Transform database packages to match frontend format
      const transformedPackages = packages.map(pkg => ({
        id: pkg.id,
        title: pkg.title,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        location: pkg.location,
        imageUrl: pkg.imageUrl,
        highlights: pkg.highlights ? JSON.parse(pkg.highlights) : [],
        itinerary: pkg.itinerary ? JSON.parse(pkg.itinerary) : [],
        type: pkg.type || 'package',
        transportation: pkg.transportation,
        pickupPoints: pkg.pickupPoints ? JSON.parse(pkg.pickupPoints) : [],
        popular: pkg.popular,
        createdAt: pkg.createdAt,
        updatedAt: pkg.updatedAt
      }));

      return NextResponse.json(transformedPackages);
    } catch (dbError) {
      console.log('Package table not found or empty, returning empty array');
      return NextResponse.json([]);
    }

  } catch (error) {
    console.error('Failed to fetch packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const packageData = await request.json();
    
    const newPackage = await prisma.package.create({
      data: {
        ...packageData,
        highlights: packageData.highlights ? JSON.stringify(packageData.highlights) : null,
        pickupPoints: packageData.pickupPoints ? JSON.stringify(packageData.pickupPoints) : null,
        itinerary: packageData.itinerary ? JSON.stringify(packageData.itinerary) : null,
      },
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error('Package creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create package' },
      { status: 500 }
    );
  }
}
