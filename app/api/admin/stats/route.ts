import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get basic stats with proper null handling
    const [totalBookings, totalUsers, totalRevenue, previousMonthRevenue] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.booking.aggregate({
        _sum: {
          paidAmount: true,
        },
      }),
      // Get previous month revenue for growth calculation
      prisma.booking.aggregate({
        _sum: {
          paidAmount: true,
        },
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    // Calculate revenue with null safety
    const currentRevenue = totalRevenue._sum.paidAmount || 0;
    const lastMonthRevenue = previousMonthRevenue._sum.paidAmount || 0;
    
    // Calculate growth percentage safely
    const revenueGrowth = lastMonthRevenue > 0 
      ? ((currentRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : currentRevenue > 0 ? 100 : 0;

    // Get bookings by status
    const bookingsByStatus = await prisma.booking.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Transform bookings by status into an object with proper mapping
    const statusCounts = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    bookingsByStatus.forEach((item) => {
      const status = item.status.toLowerCase();
      // Map database status values to our expected keys
      switch (status) {
        case 'pending':
          statusCounts.pending = item._count.status;
          break;
        case 'confirmed':
          statusCounts.confirmed = item._count.status;
          break;
        case 'completed':
          statusCounts.completed = item._count.status;
          break;
        case 'cancelled':
          statusCounts.cancelled = item._count.status;
          break;
        default:
          // Handle any other status as pending
          statusCounts.pending += item._count.status;
      }
    });

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Calculate additional metrics
    const averageBookingValue = totalBookings > 0 ? currentRevenue / totalBookings : 0;

    return NextResponse.json({
      totalBookings: totalBookings || 0,
      totalUsers: totalUsers || 0,
      totalRevenue: currentRevenue,
      revenueGrowth: Math.round(revenueGrowth * 100) / 100, // Round to 2 decimal places
      averageBookingValue: Math.round(averageBookingValue * 100) / 100,
      bookingsByStatus: statusCounts,
      recentBookings,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
