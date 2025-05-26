import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const isAdmin = (session.user as any).role === 'ADMIN';

    if (isAdmin) {
      // Admin dashboard stats
      const [
        totalBookings,
        totalRevenue,
        totalUsers,
        recentBookings
      ] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.aggregate({
          where: { status: { not: 'CANCELLED' } },
          _sum: { totalAmount: true }
        }),
        prisma.user.count(),
        prisma.booking.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        })
      ]);

      return NextResponse.json({
        totalBookings,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        totalUsers,
        recentBookings
      });
    } else {
      // User dashboard stats
      const [
        userBookings,
        userSpent
      ] = await Promise.all([
        prisma.booking.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 10
        }),
        prisma.booking.aggregate({
          where: { 
            userId,
            status: { not: 'CANCELLED' }
          },
          _sum: { totalAmount: true }
        })
      ]);

      return NextResponse.json({
        bookings: userBookings,
        totalSpent: userSpent._sum.totalAmount || 0
      });
    }
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
