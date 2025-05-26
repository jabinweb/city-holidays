import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '3m':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Calculate start date for monthly stats (last 6 months)
    const monthlyStartDate = new Date();
    monthlyStartDate.setMonth(monthlyStartDate.getMonth() - 6);

    // First, let's get basic counts without problematic joins
    const [
      totalBookings,
      totalRevenue,
      totalPackages,
      totalUsers,
      previousPeriodBookings,
      previousPeriodRevenue,
      bookingsByPackage,
      recentBookings
    ] = await Promise.all([
      // Total bookings in period
      prisma.booking.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),

      // Total revenue in period
      prisma.booking.aggregate({
        where: {
          createdAt: { gte: startDate },
          status: { not: 'CANCELLED' }
        },
        _sum: { totalAmount: true }
      }),

      // Total active packages
      prisma.package.count(),

      // Total users
      prisma.user.count(),

      // Previous period bookings for trend calculation
      prisma.booking.count({
        where: {
          createdAt: {
            gte: new Date(startDate.getTime() - (now.getTime() - startDate.getTime())),
            lt: startDate
          }
        }
      }),

      // Previous period revenue for trend calculation
      prisma.booking.aggregate({
        where: {
          createdAt: {
            gte: new Date(startDate.getTime() - (now.getTime() - startDate.getTime())),
            lt: startDate
          },
          status: { not: 'CANCELLED' }
        },
        _sum: { totalAmount: true }
      }),

      // Bookings by package (popular packages)
      prisma.booking.groupBy({
        by: ['packageId'],
        where: {
          createdAt: { gte: startDate },
          status: { not: 'CANCELLED' }
        },
        _count: { id: true },
        _sum: { totalAmount: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5
      }),

      // Recent bookings - simplified without includes for now
      prisma.booking.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        select: {
          id: true,
          totalAmount: true,
          createdAt: true,
          status: true,
          packageId: true,
          userId: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    // Get package details for popular packages
    // Add interfaces at the top of the file
    interface BookingsByPackage {
        packageId: string | null;
        _count: { id: number };
        _sum: { totalAmount: number | null };
    }

    interface PackageInfo {
        id: string;
        title: string;
        type: string;
        location: string | null;
    }

    interface UserInfo {
        id: string;
        name: string | null;
    }

    interface RecentBooking {
        id: string;
        totalAmount: number;
        createdAt: Date;
        status: string;
        packageId: string | null;
        userId: string | null;
    }

    interface MonthlyStats {
        createdAt: Date;
        totalAmount: number;
    }

    interface BookingWithPackage {
        id: string;
        packageId: string | null;
    }

    interface LocationBooking {
        packageId: string | null;
        totalAmount: number;
    }

    interface PopularPackage {
        id: string | null;
        title: string;
        bookings: number;
        revenue: number;
    }

    interface MonthlyRevenue {
        month: string;
        bookings: number;
        revenue: number;
    }

    interface BookingType {
        type: string;
        count: number;
        percentage: number;
    }

    interface LocationStat {
        location: string;
        bookings: number;
        revenue: number;
    }

    interface FormattedRecentBooking {
        id: string;
        customerName: string;
        packageTitle: string;
        amount: number;
        date: string;
        status: string;
    }

    interface AnalyticsData {
        totalBookings: number;
        totalRevenue: number;
        totalPackages: number;
        totalUsers: number;
        bookingsTrend: number;
        revenueTrend: number;
        popularPackages: PopularPackage[];
        monthlyRevenue: MonthlyRevenue[];
        bookingsByType: BookingType[];
        locationStats: LocationStat[];
        recentBookings: FormattedRecentBooking[];
    }

            const packageIds: (string)[] = bookingsByPackage.map((b: BookingsByPackage) => b.packageId).filter((id): id is string => id !== null);
    const packages = await prisma.package.findMany({
      where: { id: { in: packageIds } },
      select: { id: true, title: true, type: true, location: true }
    });

    // Get user and package details for recent bookings
    const recentBookingUserIds = recentBookings.map(b => b.userId).filter((id): id is string => id !== null);
    const recentBookingPackageIds = recentBookings.map(b => b.packageId).filter((id): id is string => id !== null);

    const [users, recentPackages] = await Promise.all([
      prisma.user.findMany({
        where: { id: { in: recentBookingUserIds } },
        select: { id: true, name: true }
      }),
      prisma.package.findMany({
        where: { id: { in: recentBookingPackageIds } },
        select: { id: true, title: true }
      })
    ]);

    // Get statistics using simpler queries
    const monthlyStats = await prisma.booking.findMany({
      where: {
        createdAt: { gte: monthlyStartDate },
        status: { not: 'CANCELLED' }
      },
      select: {
        createdAt: true,
        totalAmount: true
      }
    });

    // Group monthly stats manually
    const monthlyRevenue = monthlyStats.reduce((acc: any[], booking) => {
      const month = booking.createdAt.getMonth();
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
      
      const existing = acc.find(item => item.month === monthName);
      if (existing) {
        existing.bookings += 1;
        existing.revenue += booking.totalAmount;
      } else {
        acc.push({
          month: monthName,
          bookings: 1,
          revenue: booking.totalAmount
        });
      }
      return acc;
    }, []);

    // Get booking types manually
    const allBookingsWithPackages = await prisma.booking.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { not: 'CANCELLED' }
      },
      select: {
        id: true,
        packageId: true
      }
    });

    // Get package types for categorization
    const allPackageIds = allBookingsWithPackages.map(b => b.packageId).filter((id): id is string => id !== null);
    const allPackages = await prisma.package.findMany({
      where: { id: { in: allPackageIds } },
      select: { id: true, type: true, location: true }
    });

    // Categorize bookings by type
    const bookingTypeMap = new Map();
    allBookingsWithPackages.forEach(booking => {
      const pkg = allPackages.find(p => p.id === booking.packageId);
      if (pkg) {
        let type = 'Multi-Day Packages';
        if (pkg.type === 'day-trip') {
          type = 'Day Trips';
        } else if (pkg.type === 'overnight') {
          type = 'Overnight Tours';
        } else if (pkg.location?.includes('Delhi') && pkg.location?.includes('Agra') && pkg.location?.includes('Jaipur')) {
          type = 'Golden Triangle';
        }
        
        bookingTypeMap.set(type, (bookingTypeMap.get(type) || 0) + 1);
      }
    });

    const totalTypeBookings = Array.from(bookingTypeMap.values()).reduce((sum, count) => sum + count, 0);
    const bookingsByType = Array.from(bookingTypeMap.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: totalTypeBookings > 0 ? (count / totalTypeBookings) * 100 : 0
    }));

    // Get location stats
    const locationMap = new Map();
    allBookingsWithPackages.forEach(booking => {
      const pkg = allPackages.find(p => p.id === booking.packageId);
      if (pkg?.location) {
        const existing = locationMap.get(pkg.location) || { bookings: 0, revenue: 0 };
        existing.bookings += 1;
        locationMap.set(pkg.location, existing);
      }
    });

    // Get revenue by location
    const locationBookings = await prisma.booking.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { not: 'CANCELLED' }
      },
      select: {
        packageId: true,
        totalAmount: true
      }
    });

    locationBookings.forEach(booking => {
      const pkg = allPackages.find(p => p.id === booking.packageId);
      if (pkg?.location) {
        const existing = locationMap.get(pkg.location) || { bookings: 0, revenue: 0 };
        existing.revenue += booking.totalAmount;
        locationMap.set(pkg.location, existing);
      }
    });

    const locationStats = Array.from(locationMap.entries()).map(([location, stats]) => ({
      location,
      bookings: stats.bookings,
      revenue: stats.revenue
    })).sort((a, b) => b.bookings - a.bookings).slice(0, 5);

    // Calculate trends
    const bookingsTrend = previousPeriodBookings > 0 
      ? ((totalBookings - previousPeriodBookings) / previousPeriodBookings) * 100 
      : 0;

    const currentRevenue = totalRevenue._sum.totalAmount || 0;
    const previousRevenue = previousPeriodRevenue._sum.totalAmount || 0;
    const revenueTrend = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;

    // Format popular packages
    const popularPackages = bookingsByPackage.map(booking => {
      const packageInfo = packages.find(p => p.id === booking.packageId);
      return {
        id: booking.packageId,
        title: packageInfo?.title || 'Unknown Package',
        bookings: booking._count.id,
        revenue: booking._sum.totalAmount || 0
      };
    });

    // Format recent bookings
    const formattedRecentBookings = recentBookings.map(booking => {
      const user: UserInfo | undefined = users.find((u: UserInfo) => u.id === booking.userId);
      const pkg = recentPackages.find((p) => p.id === booking.packageId);
      
      return {
        id: booking.id,
        customerName: user?.name || 'Guest',
        packageTitle: pkg?.title || 'Unknown Package',
        amount: booking.totalAmount,
        date: booking.createdAt.toISOString().split('T')[0],
        status: booking.status.charAt(0) + booking.status.slice(1).toLowerCase().replace('_', ' ')
      };
    });

    const analyticsData = {
      totalBookings,
      totalRevenue: currentRevenue,
      totalPackages,
      totalUsers,
      bookingsTrend: Math.round(bookingsTrend * 100) / 100,
      revenueTrend: Math.round(revenueTrend * 100) / 100,
      popularPackages,
      monthlyRevenue,
      bookingsByType,
      locationStats,
      recentBookings: formattedRecentBookings
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    
    // Return fallback data structure on error
    const fallbackData = {
      totalBookings: 0,
      totalRevenue: 0,
      totalPackages: 0,
      totalUsers: 0,
      bookingsTrend: 0,
      revenueTrend: 0,
      popularPackages: [],
      monthlyRevenue: [],
      bookingsByType: [],
      locationStats: [],
      recentBookings: []
    };
    
    return NextResponse.json(fallbackData);
  }
}
