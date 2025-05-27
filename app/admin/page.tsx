'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AdminStats {
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
  revenueGrowth: number;
  monthlyGrowth: number;
  averageBookingValue: number;
  bookingsByStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  recentBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
    monthlyGrowth: 0,
    averageBookingValue: 0,
    bookingsByStatus: {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    },
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard data:', data); // Debug log
        setStats(data);
      } else {
        console.error('Failed to fetch dashboard stats - Status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      positive: true
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-green-500',
      change: '+5%',
      positive: true
    },
    {
      title: 'Revenue',
      value: stats?.totalRevenue ? 
        stats.totalRevenue >= 100000 
          ? `₹${(stats.totalRevenue / 100000).toFixed(1)}L`
          : stats.totalRevenue >= 1000
            ? `₹${(stats.totalRevenue / 1000).toFixed(0)}K`
            : `₹${stats.totalRevenue.toLocaleString('en-IN')}`
        : '₹0',
      icon: DollarSign,
      color: 'bg-purple-500',
      change: stats?.revenueGrowth !== undefined ? `${stats.revenueGrowth >= 0 ? '+' : ''}${stats.revenueGrowth.toFixed(1)}%` : '+0%',
      positive: (stats?.revenueGrowth || 0) >= 0
    },
    {
      title: 'Growth',
      value: stats?.monthlyGrowth !== undefined ? `${stats.monthlyGrowth.toFixed(1)}%` : '0%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: stats?.monthlyGrowth !== undefined ? `${stats.monthlyGrowth >= 0 ? '+' : ''}${stats.monthlyGrowth.toFixed(1)}%` : '+0%',
      positive: (stats?.monthlyGrowth || 0) >= 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 lg:p-3 rounded-full ${stat.color} flex-shrink-0 ml-4`}>
                <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
            <div className="mt-3 lg:mt-4 flex items-center">
              {stat.positive ? (
                <ArrowUpRight className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
              ) : (
                <ArrowDownRight className="h-3 w-3 lg:h-4 lg:w-4 text-red-500 flex-shrink-0" />
              )}
              <span className={`text-xs lg:text-sm font-medium ml-1 ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Bookings */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
            </div>
            <div className="p-4 lg:p-6">
              {stats.recentBookings.length > 0 ? (
                <div className="space-y-3 lg:space-y-4">
                  {stats.recentBookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusIcon(booking.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{booking.contactName}</p>
                          <p className="text-sm text-gray-500 truncate">{booking.serviceType}</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                        <p className="font-medium text-gray-900">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 lg:py-12">
                  <Calendar className="h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No recent bookings</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Status Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Booking Status</h3>
            </div>
            <div className="p-4 lg:p-6">
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700">Pending</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {stats?.bookingsByStatus?.pending || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700">Confirmed</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {stats?.bookingsByStatus?.confirmed || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {stats?.bookingsByStatus?.completed || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700">Cancelled</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {stats?.bookingsByStatus?.cancelled || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 lg:p-6 space-y-2 lg:space-y-3">
              <button className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 flex-shrink-0" />
                  <span className="font-medium text-sm lg:text-base">Add New Package</span>
                </div>
              </button>
              <button className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium text-sm lg:text-base">Manage Users</span>
                </div>
              </button>
              <button className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500 flex-shrink-0" />
                  <span className="font-medium text-sm lg:text-base">View All Bookings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
