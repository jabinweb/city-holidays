'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  Calendar,
  MapPin,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  totalPackages: number;
  totalUsers: number;
  bookingsTrend: number;
  revenueTrend: number;
  popularPackages: Array<{
    id: string;
    title: string;
    bookings: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    bookings: number;
  }>;
  bookingsByType: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  locationStats: Array<{
    location: string;
    bookings: number;
    revenue: number;
  }>;
  recentBookings: Array<{
    id: string;
    customerName: string;
    packageTitle: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon, 
  color = 'blue' 
}: {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  color?: string;
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    cyan: 'bg-cyan-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ 
  title, 
  children, 
  className = '' 
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      setError('Failed to load analytics data');
      
      // Fallback to mock data if real data fails
      setAnalyticsData({
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
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Analytics & Reports">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!analyticsData) {
    return (
      <AdminLayout title="Analytics & Reports">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load analytics data.</p>
          <button 
            onClick={fetchAnalyticsData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics & Reports">
      {/* Header with Time Range Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Overview</h2>
            <p className="text-gray-600 mt-1">Track your business performance and growth</p>
            {error && (
              <div className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded">
                ⚠️ Some data may be limited or unavailable
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bookings"
          value={analyticsData.totalBookings.toLocaleString()}
          trend={analyticsData.bookingsTrend}
          icon={<Calendar className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(analyticsData.totalRevenue / 100000).toFixed(1)}L`}
          trend={analyticsData.revenueTrend}
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Active Packages"
          value={analyticsData.totalPackages}
          icon={<Package className="h-6 w-6" />}
          color="purple"
        />
        <StatCard
          title="Total Users"
          value={analyticsData.totalUsers.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
          color="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Revenue Trend */}
        <ChartCard title="Revenue Trend" className="lg:col-span-2">
          {analyticsData.monthlyRevenue.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.monthlyRevenue.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ₹{(Number(item.revenue) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.bookings} bookings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No revenue data available for this period
            </div>
          )}
        </ChartCard>

        {/* Booking Types Distribution */}
        <ChartCard title="Booking Types">
          {analyticsData.bookingsByType.length > 0 ? (
            <div className="space-y-3">
              {analyticsData.bookingsByType.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.type}</span>
                    <span className="text-gray-600">{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.count} bookings
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No booking type data available
            </div>
          )}
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Packages */}
        <ChartCard title="Top Performing Packages">
          {analyticsData.popularPackages.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.popularPackages.map((pkg, index) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {pkg.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pkg.bookings} bookings
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      ₹{(pkg.revenue / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No package data available for this period
            </div>
          )}
        </ChartCard>

        {/* Location Performance */}
        <ChartCard title="Performance by Location">
          {analyticsData.locationStats.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.locationStats.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 text-sm">
                      {(location as any).location}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {(location as any).bookings}
                    </div>
                    <div className="text-xs text-gray-500">
                      ₹{(Number((location as any).revenue) / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No location data available
            </div>
          )}
        </ChartCard>
      </div>

      {/* Recent Bookings */}
      <ChartCard title="Recent Bookings" className="mb-6">
        {analyticsData.recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Package</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">
                      {booking.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4 text-gray-900">{booking.customerName}</td>
                    <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                      {booking.packageTitle}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ₹{booking.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent bookings available
          </div>
        )}
      </ChartCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Generate Report</h3>
              <p className="text-blue-100 text-sm mt-1">Export detailed analytics</p>
            </div>
            <Activity className="h-8 w-8 text-blue-200" />
          </div>
          <button 
            onClick={() => window.print()}
            className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Export Data
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Revenue Goal</h3>
              <p className="text-green-100 text-sm mt-1">
                {analyticsData.totalRevenue > 0 ? 
                  `₹${(analyticsData.totalRevenue / 100000).toFixed(1)}L achieved` : 
                  'Set your goals'
                }
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-4/5"></div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Data Status</h3>
              <p className="text-purple-100 text-sm mt-1">
                {error ? 'Limited data available' : 'Real-time data'}
              </p>
            </div>
            <Star className="h-8 w-8 text-purple-200" />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-2xl font-bold">
              {error ? '⚠️' : '✅'}
            </span>
            <div className="ml-2 text-sm">
              {error ? 'Check connection' : 'All systems online'}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
