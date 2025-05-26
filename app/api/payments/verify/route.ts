import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    const crypto = await import('crypto');
    
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      booking_id 
    } = await request.json();

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'mock_secret')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update booking with payment details
      if (booking_id) {
        await prisma.booking.update({
          where: { id: booking_id },
          data: {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: 'CONFIRMED',
            paidAmount: { increment: 0 } // Will be updated based on actual payment amount
          }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { message: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
