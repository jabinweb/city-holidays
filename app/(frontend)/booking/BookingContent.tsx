'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { packages } from '@/data/packages';
import Container from '@/components/ui/Container';
import BookingWizard from '@/components/booking/BookingWizard';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function BookingContent() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const packageId = searchParams.get('package');
  
  const packageItem = packageId ? packages.find(p => p.id === packageId) : null;

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!session) {
    return (
      <>
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking</h1>
            <p className="text-xl text-blue-100">
              Complete your booking in just a few simple steps
            </p>
          </Container>
        </div>

        <Container className="py-12">
          <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
              <p className="text-gray-600">
                Please sign in to your account to continue with the booking process.
              </p>
            </div>
            
            {packageItem && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Selected Package:</h4>
                <p className="text-sm text-gray-600">{packageItem.title}</p>
                <p className="text-sm font-semibold text-blue-600">
                  ₹{packageItem.price.toLocaleString('en-IN')} per person
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <Link href={`/auth/signin?callbackUrl=/booking${packageId ? `?package=${packageId}` : ''}`}>
                <Button variant="primary" fullWidth>
                  Sign In to Continue
                </Button>
              </Link>
              <Link href={`/auth/signup?callbackUrl=/booking${packageId ? `?package=${packageId}` : ''}`}>
                <Button variant="outline" fullWidth>
                  Create New Account
                </Button>
              </Link>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Your booking details will be saved and you can continue after signing in.
            </p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking</h1>
              <p className="text-xl text-blue-100">
                Complete your booking in just a few simple steps
              </p>
            </div>
            {packageItem && (
              <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">{packageItem.title}</h3>
                <p className="text-blue-100 text-sm mb-2">{packageItem.duration}</p>
                <p className="text-2xl font-bold">
                  ₹{packageItem.price.toLocaleString('en-IN')}
                  <span className="text-sm font-normal"> per person</span>
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {packageItem ? (
          <BookingWizard packageItem={packageItem} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No Package Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select a package to continue with the booking process.
            </p>
            <Link href="/packages">
              <Button variant="primary">
                Browse Packages
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
}
