'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { CreditCard, Shield, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface RazorpayPaymentProps {
  bookingId: string;
  amount: number;
  title: string;
  description?: string;
  onSuccess?: (paymentData: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayPayment({
  bookingId,
  amount,
  title,
  description,
  onSuccess,
  onError
}: RazorpayPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentType: 'full' | 'partial') => {
    try {
      setIsProcessing(true);
      setError('');

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      const paymentAmount = paymentType === 'partial' ? amount / 2 : amount;

      // Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          amount: paymentAmount,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // Configure Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'City Holidays',
        description: description || title,
        order_id: orderData.orderId,
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
        },
        theme: {
          color: '#2563eb',
        },
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
                paymentAmount, // Pass the actual payment amount
              }),
            });

            if (verifyResponse.ok) {
              const verifyData = await verifyResponse.json();
              onSuccess?.(verifyData);
              router.push(`/booking/success?payment=${response.razorpay_payment_id}`);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support.');
            onError?.(error);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          Payment Options
        </h3>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Pay Full Amount</span>
              <span className="text-xl font-bold text-green-600">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Complete payment and confirm your booking instantly
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => handlePayment('full')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Full Amount'}
            </Button>
          </div>

          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Pay 50% Now</span>
              <span className="text-xl font-bold text-blue-600">
                ₹{(amount / 2).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Secure your booking with partial payment
            </p>
            <Button
              variant="outline"
              fullWidth
              onClick={() => handlePayment('partial')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay 50% Now'}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Security Features */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-600" />
          Secure Payment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>PCI DSS compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-green-600" />
            <span>Multiple payment options</span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Powered by Razorpay | Your payment information is secure and encrypted</p>
      </div>
    </div>
  );
}
