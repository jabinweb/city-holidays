'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Package, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  FileText,
  Car,
  Plane,
  MessageSquare
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if user is admin
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin area.</p>
          <Button onClick={() => router.push('/')} variant="primary">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Packages', path: '/admin/packages', icon: Package },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Form Responses', path: '/admin/forms', icon: MessageSquare },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out xl:relative xl:translate-x-0 xl:flex xl:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-gray-200 flex-shrink-0">
          <Link href="/admin" className="flex items-center min-w-0">
            <span className="text-lg lg:text-xl font-bold text-blue-600">City</span>
            <span className="text-lg lg:text-xl font-bold text-orange-500">Holidays</span>
            <span className="ml-2 text-xs lg:text-sm text-gray-500">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="xl:hidden text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 lg:px-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 lg:py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm lg:text-base"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-3 lg:p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {session.user.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => router.push('/')}
            className="text-sm"
          >
            <LogOut size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">Back to Site</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 lg:h-16">
              <div className="flex items-center min-w-0 flex-1">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="xl:hidden text-gray-500 hover:text-gray-700 mr-3 p-1 flex-shrink-0"
                >
                  <Menu size={20} />
                </button>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 truncate">
                  {title}
                </h1>
              </div>
              <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
                <Link href="/" target="_blank">
                  <Button variant="outline" size="sm" className="text-sm">
                    <Plane size={14} className="mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">View Site</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[90vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
