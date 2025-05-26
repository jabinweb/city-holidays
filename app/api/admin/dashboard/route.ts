import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalBookings,
      totalRevenue,
      totalUsers,
      totalPackages,
      monthlyBookings,
      lastMonthBookings,
      monthlyRevenue,
      lastMonthRevenue,
      recentBookings,
      popularPackages
    ] = await Promise.all([
      // Total counts
      prisma.booking.count(),
      prisma.booking.aggregate({
        where: { status: { not: 'CANCELLED' } },
        _sum: { totalAmount: true }
      }),
      prisma.user.count(),
      prisma.package.count(),

      // This month stats
      prisma.booking.count({
        where: { createdAt: { gte: startOfMonth } }
      }),
      prisma.booking.count({
        where: { 
          createdAt: { 
            gte: startOfLastMonth,
            lte: endOfLastMonth
          }
        }
      }),
      prisma.booking.aggregate({
        where: { 
          createdAt: { gte: startOfMonth },
          status: { not: 'CANCELLED' }
        },
        _sum: { totalAmount: true }
      }),
      prisma.booking.aggregate({
        where: { 
          createdAt: { 
            gte: startOfLastMonth,
            lte: endOfLastMonth
          },
          status: { not: 'CANCELLED' }
        },
        _sum: { totalAmount: true }
      }),

      // Recent bookings
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }),

      // Popular packages (mock data for now)
      prisma.booking.groupBy({
        by: ['packageId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5
      })
    ]);

    // Calculate trends
    const bookingsTrend = lastMonthBookings > 0 
      ? ((monthlyBookings - lastMonthBookings) / lastMonthBookings) * 100 
      : 0;

    const currentRevenue = monthlyRevenue._sum.totalAmount || 0;
    const previousRevenue = lastMonthRevenue._sum.totalAmount || 0;
    const revenueTrend = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;

    return NextResponse.json({
      overview: {
        totalBookings,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        totalUsers,
        totalPackages,
        monthlyBookings,
        monthlyRevenue: currentRevenue,
        bookingsTrend: Math.round(bookingsTrend * 100) / 100,
        revenueTrend: Math.round(revenueTrend * 100) / 100
      },
      recentBookings: recentBookings.map(booking => ({
        id: booking.id,
        customerName: booking.user?.name || 'Guest',
        amount: booking.totalAmount,
        status: booking.status,
        createdAt: booking.createdAt
      })),
      popularPackages: popularPackages.map(pkg => ({
        packageId: pkg.packageId,
        bookings: pkg._count.id
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
