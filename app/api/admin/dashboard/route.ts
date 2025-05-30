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

    // Get current date for calculations
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    // Get basic stats with proper null handling
    const [
      totalBookings, 
      totalUsers, 
      currentMonthRevenue, 
      lastMonthRevenue,
      bookingsByStatus,
      recentBookings
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.booking.aggregate({
        _sum: { paidAmount: true },
        where: { createdAt: { gte: currentMonth } },
      }),
      prisma.booking.aggregate({
        _sum: { paidAmount: true },
        where: { 
          createdAt: { 
            gte: lastMonth,
            lt: currentMonth 
          } 
        },
      }),
      prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    // Calculate revenue with null safety
    const currentRevenue = currentMonthRevenue._sum.paidAmount || 0;
    const previousRevenue = lastMonthRevenue._sum.paidAmount || 0;
    
    // Calculate growth percentage safely
    const revenueGrowth = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
      : currentRevenue > 0 ? 100 : 0;

    // Transform bookings by status into an object with proper mapping
    const statusCounts = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    bookingsByStatus.forEach((item) => {
      const status = item.status.toLowerCase();
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
          statusCounts.pending += item._count.status;
      }
    });

    // Calculate additional metrics
    const averageBookingValue = totalBookings > 0 ? currentRevenue / totalBookings : 0;
    const monthlyGrowth = Math.round(revenueGrowth * 100) / 100;

    return NextResponse.json({
      totalBookings: totalBookings || 0,
      totalUsers: totalUsers || 0,
      totalRevenue: currentRevenue,
      revenueGrowth: monthlyGrowth,
      monthlyGrowth: monthlyGrowth,
      averageBookingValue: Math.round(averageBookingValue * 100) / 100,
      bookingsByStatus: statusCounts,
      recentBookings: recentBookings || [],
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
