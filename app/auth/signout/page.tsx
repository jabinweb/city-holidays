'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Container from '@/components/ui/Container';
import { LogOut } from 'lucide-react';

export default function SignOutPage() {
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ 
          callbackUrl: '/',
          redirect: true 
        });
      } catch (error) {
        console.error('Sign out error:', error);
        window.location.href = '/';
      }
    };

    handleSignOut();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <LogOut className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Signing Out...
            </h1>
            <p className="text-gray-600">
              Please wait while we sign you out securely.
            </p>
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
