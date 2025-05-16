'use client';

import { useSearchParams } from 'next/navigation';
import { packages } from '@/data/packages';
import Container from '@/components/ui/Container';
import BookingForm from '@/components/booking/BookingForm';
import { useState } from 'react';

export default function BookingContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');
  const packageItem = packageId ? packages.find(p => p.id === packageId) : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {packageItem ? `Book ${packageItem.title}` : 'Book Your Trip'}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Fill in your details below and we'll get back to you with the best options for your journey.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Received!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for choosing City Holidays. We'll contact you shortly to confirm your booking details.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Make Another Booking
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Return Home
                </button>
              </div>
            </div>
          ) : (
            <>
              {packageItem && (
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h2 className="font-semibold text-xl mb-2">{packageItem.title}</h2>
                  <p className="text-gray-600 mb-4">{packageItem.description}</p>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{packageItem.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500"> / person</span>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-lg p-8">
                <BookingForm 
                  packageItem={packageItem}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
