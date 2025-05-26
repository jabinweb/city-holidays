'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { User, Mail, Phone, Calendar, Settings, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [userData, setUserData] = useState<{ id: string; role: string; email: string; name: string; phone?: string; createdAt?: string } | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUserData(session.user);
    }
  }, [session]);

  const handleEdit = () => {
    // Navigate to edit profile page
    router.push('/profile/edit');
  };

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <Container className="py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {userData.name}
        </h1>
        <p className="text-gray-600">
          Manage your profile information and settings.
        </p>
      </div>
      
      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="text-gray-900">{userData.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="text-gray-900">{userData.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="text-gray-900">{userData.phone || 'N/A'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Joined
            </label>
            <div className="text-gray-900">
              {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">Profile Settings</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="whitespace-nowrap"
            >
              Edit Profile
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">Change Password</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push('/profile/change-password')}
              className="whitespace-nowrap"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;