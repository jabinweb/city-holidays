'use client';

import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle, Download, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment');

  return (
    <>
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white pt-32 pb-20">
        <Container>
          <div className="text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl text-green-100">
              Your booking has been confirmed successfully
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Thank you for choosing City Holidays!
              </h2>
              <p className="text-gray-600">
                Your payment has been processed successfully and your booking is now confirmed.
              </p>
            </div>

            {paymentId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Payment ID:</span>
                  <span className="text-sm font-mono text-gray-900">{paymentId}</span>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Email Confirmation</h3>
                  <p className="text-sm text-gray-600">
                    A confirmation email with your booking details has been sent to your registered email address.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">What's Next?</h3>
                  <p className="text-sm text-gray-600">
                    Our travel expert will contact you within 24 hours to finalize your itinerary and provide detailed travel information.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button variant="primary" fullWidth>
                  <Calendar className="h-4 w-4 mr-2" />
                  View My Bookings
                </Button>
              </Link>
              
              <Button variant="outline" fullWidth>
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Need help or have questions?
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a href="tel:+919528735541" className="text-blue-600 hover:text-blue-700">
                  Call: +91 9528735541
                </a>
                <span className="text-gray-300">|</span>
                <a href="mailto:info@cityholidays.in" className="text-blue-600 hover:text-blue-700">
                  Email: info@cityholidays.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
