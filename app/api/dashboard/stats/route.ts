import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = (session.user as any).role === 'ADMIN';

    if (isAdmin) {
      // Admin stats
      const [totalBookings, totalUsers, totalRevenue] = await Promise.all([
        prisma.booking.count(),
        prisma.user.count(),
        prisma.booking.aggregate({
          _sum: {
            paidAmount: true,
          },
        }),
      ]);

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

      return NextResponse.json({
        totalBookings,
        totalUsers,
        totalRevenue: totalRevenue._sum.paidAmount || 0,
        recentBookings,
      });
    } else {
      // User stats
      const bookings = await prisma.booking.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: { createdAt: 'desc' },
      });

      const totalSpent = bookings.reduce((sum, booking) => sum + booking.paidAmount, 0);

      return NextResponse.json({
        bookings,
        totalSpent,
      });
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
