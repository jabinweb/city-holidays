'use client';

import { useSearchParams } from 'next/navigation';
import { packages } from '@/data/packages';
import Container from '@/components/ui/Container';
import BookingForm from '@/components/booking/BookingForm';
import { useState } from 'react';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');
  const packageItem = packageId ? packages.find(p => p.id === packageId) : undefined;
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async (formData: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Booking submitted:', formData);
    setIsLoading(false);
    // Handle success/error states
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {packageItem ? `Book ${packageItem.title}` : 'Book Your Trip'}
          </h1>
          <p className="text-xl text-blue-100">
            Fill in the details below to secure your booking.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {packageItem && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-xl mb-2">{packageItem.title}</h2>
              <div className="text-gray-600 mb-4">{packageItem.description}</div>
              <div className="text-2xl font-bold text-blue-600">
                ₹{packageItem.price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-500"> / person</span>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
            <BookingForm 
              packageItem={packageItem}
              onSubmit={handleBooking}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Container>
    </>
  );
}