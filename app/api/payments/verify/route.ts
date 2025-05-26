import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingId,
      paymentAmount 
    } = await request.json();

    // Get Razorpay settings from database
    const razorpaySettings = await prisma.setting.findMany({
      where: {
        key: {
          in: ['razorpay_enabled', 'razorpay_secret_key', 'razorpay_test_mode']
        }
      }
    });

    const getSettingValue = (key: string, defaultValue: string = '') => {
      const setting = razorpaySettings.find(s => s.key === key);
      return setting ? setting.value : defaultValue;
    };

    const isRazorpayEnabled = getSettingValue('razorpay_enabled', 'false') === 'true';
    const razorpaySecretKey = getSettingValue('razorpay_secret_key');
    const isTestMode = getSettingValue('razorpay_test_mode', 'true') === 'true';

    if (!isRazorpayEnabled) {
      return NextResponse.json(
        { message: 'Razorpay is not enabled' },
        { status: 400 }
      );
    }

    if (!razorpaySecretKey) {
      return NextResponse.json(
        { message: 'Razorpay secret key not configured' },
        { status: 500 }
      );
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecretKey)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get current booking to calculate new paid amount
    const currentBooking = await prisma.booking.findFirst({
      where: { 
        id: bookingId,
        userId: session.user.id,
      },
    });

    if (!currentBooking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Calculate new paid amount
    const newPaidAmount = currentBooking.paidAmount + (paymentAmount || currentBooking.totalAmount);
    
    // Update booking with payment details
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
        userId: session.user.id,
      },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAmount: newPaidAmount,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      booking,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { message: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
