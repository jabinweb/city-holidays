import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

console.log('API route loaded - packages route.ts');

export async function GET(request: Request) {
  console.log('GET /api/packages called');
  console.log('Request URL:', request.url);
  
  try {
    // First try to use static data as fallback
    const { packages } = await import('@/data/packages');
    console.log('Using static packages data:', packages.length);
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');
    const destination = searchParams.get('destination');

    console.log('Search params:', { limit, type, destination });

    let filteredPackages = [...packages];

    // Apply filters
    if (type) {
      console.log('Filtering by type:', type);
      if (type === 'golden-triangle') {
        filteredPackages = filteredPackages.filter(pkg => 
          pkg.location.includes('Delhi') && 
          pkg.location.includes('Agra') && 
          pkg.location.includes('Jaipur')
        );
      } else {
        filteredPackages = filteredPackages.filter(pkg => pkg.type === type);
      }
      console.log('After type filter:', filteredPackages.length);
    }

    if (destination) {
      console.log('Filtering by destination:', destination);
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.location.toLowerCase().includes(destination.toLowerCase())
      );
      console.log('After destination filter:', filteredPackages.length);
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      console.log('Applying limit:', limitNum);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredPackages = filteredPackages.slice(0, limitNum);
      }
      console.log('After limit:', filteredPackages.length);
    }

    console.log('Returning packages:', filteredPackages.length);

    const response = new NextResponse(JSON.stringify(filteredPackages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    return response;

  } catch (error) {
    console.error('Packages API error:', error);
    
    return new NextResponse(JSON.stringify({
      error: 'Failed to fetch packages',
      message: error instanceof Error ? error.message : 'Unknown error',
      packages: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
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
