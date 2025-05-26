'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  User, 
  Settings, 
  BookOpen,
  TrendingUp,
  Users,
  Package,
  Bell,
  Download,
  Star
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Booking {
  id: string;
  packageId: string | null;
  serviceType: string;
  status: string;
  travelers: number;
  rooms: number | null;
  date: string | null;
  totalAmount: number;
  paidAmount: number;
  specialRequests: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string | null;
  emergencyName: string | null;
  emergencyPhone: string | null;
  emergencyRelation: string | null;
  pickupLocation: string | null;
  dropLocation: string | null;
  pickupTime: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalSpent: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      if (!session) return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/bookings');
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
        
        // Calculate stats
        const totalBookings = data.length;
        const activeBookings = data.filter((b: Booking) => 
          b.status === 'PENDING' || b.status === 'CONFIRMED'
        ).length;
        const completedBookings = data.filter((b: Booking) => 
          b.status === 'COMPLETED'
        ).length;
        const totalSpent = data.reduce((sum: number, b: Booking) => sum + b.paidAmount, 0);
        
        setStats({
          totalBookings,
          activeBookings,
          completedBookings,
          totalSpent
        });
      } catch (err) {
        setError('Failed to load bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchBookings();
    }
  }, [session]);

  // Show loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // This shouldn't happen due to middleware, but just in case
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <Link href="/auth/signin">
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'bookings', name: 'My Bookings', icon: Calendar },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getServiceTypeDisplay = (serviceType: string) => {
    const serviceMap: { [key: string]: string } = {
      'HOLIDAY_PACKAGE': 'Holiday Package',
      'GOLDEN_TRIANGLE': 'Golden Triangle',
      'FLIGHT': 'Flight Booking',
      'RAILWAY': 'Railway Reservation',
      'BUS': 'Bus Booking',
      'TAXI': 'Taxi Service'
    };
    return serviceMap[serviceType] || serviceType;
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-xl text-blue-100">Manage your bookings and account</p>
            </div>
            
            {/* Stats Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{stats.activeBookings}</div>
                <div className="text-blue-100 text-sm">Active Bookings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">₹{(stats.totalSpent / 1000).toFixed(0)}K</div>
                <div className="text-blue-100 text-sm">Total Spent</div>
              </div>
            </div>
          </div>
          
          {/* Mobile Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 lg:hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">{stats.totalBookings}</div>
              <div className="text-blue-100 text-xs">Total</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">{stats.activeBookings}</div>
              <div className="text-blue-100 text-xs">Active</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">{stats.completedBookings}</div>
              <div className="text-blue-100 text-xs">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">₹{(stats.totalSpent / 1000).toFixed(0)}K</div>
              <div className="text-blue-100 text-xs">Spent</div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">My Bookings</h2>
                  <Link href="/packages">
                    <Button variant="primary">
                      Book New Trip
                    </Button>
                  </Link>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="grid gap-6">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {getServiceTypeDisplay(booking.serviceType)}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Package size={16} />
                                <span>Booking #{booking.id.slice(-8)}</span>
                              </div>
                              {booking.date && (
                                <div className="flex items-center gap-1">
                                  <Calendar size={16} />
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <User size={16} />
                                {booking.travelers} Travelers
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={16} />
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            {/* Special details for taxi bookings */}
                            {booking.serviceType === 'TAXI' && (booking.pickupLocation || booking.dropLocation) && (
                              <div className="text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <MapPin size={16} />
                                  <span>
                                    {booking.pickupLocation && booking.dropLocation 
                                      ? `${booking.pickupLocation} → ${booking.dropLocation}`
                                      : booking.pickupLocation || booking.dropLocation
                                    }
                                  </span>
                                </div>
                              </div>
                            )}

                            {booking.specialRequests && (
                              <div className="text-sm text-gray-600 italic">
                                "{booking.specialRequests}"
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 mb-1">
                              ₹{booking.totalAmount.toLocaleString('en-IN')}
                            </div>
                            {booking.paidAmount < booking.totalAmount && (
                              <div className="text-sm text-orange-600 mb-2">
                                Paid: ₹{booking.paidAmount.toLocaleString('en-IN')}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download size={16} className="mr-1" />
                                Invoice
                              </Button>
                              {booking.status === 'COMPLETED' && (
                                <Button variant="primary" size="sm">
                                  <Star size={16} className="mr-1" />
                                  Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="text-gray-400 mb-4">
                        <Package size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
                      <Link href="/packages">
                        <Button variant="primary">Browse Packages</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Profile Settings</h2>
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          defaultValue={session.user?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          defaultValue={session.user?.email || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <Button variant="primary">Update Profile</Button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Payment History</h2>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  {bookings.filter(b => b.paidAmount > 0).length > 0 ? (
                    <div className="space-y-4">
                      {bookings
                        .filter(b => b.paidAmount > 0)
                        .map((booking) => (
                          <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">{getServiceTypeDisplay(booking.serviceType)}</div>
                              <div className="text-sm text-gray-600">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">
                                ₹{booking.paidAmount.toLocaleString('en-IN')}
                              </div>
                              {booking.paidAmount < booking.totalAmount && (
                                <div className="text-sm text-orange-600">
                                  Partial Payment
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                      <p>No payment history available yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                  <Bell size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No notifications at this time.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
