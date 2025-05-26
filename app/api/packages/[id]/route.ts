import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const packageItem = await prisma.package.findUnique({
      where: { id }
    });

    if (!packageItem) {
      return NextResponse.json(
        { message: 'Package not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const formattedPackage = {
      ...packageItem,
      highlights: packageItem.highlights ? JSON.parse(packageItem.highlights) : null,
      pickupPoints: packageItem.pickupPoints ? JSON.parse(packageItem.pickupPoints) : null,
      itinerary: packageItem.itinerary ? JSON.parse(packageItem.itinerary) : null,
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
    const { id } = params;
    const packageData = await request.json();

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...packageData,
        highlights: packageData.highlights ? JSON.stringify(packageData.highlights) : null,
        pickupPoints: packageData.pickupPoints ? JSON.stringify(packageData.pickupPoints) : null,
        itinerary: packageData.itinerary ? JSON.stringify(packageData.itinerary) : null,
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Package update error:', error);
    return NextResponse.json(
      { message: 'Failed to update package' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.package.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Package deletion error:', error);
    return NextResponse.json(
      { message: 'Failed to delete package' },
      { status: 500 }
    );
  }
}
