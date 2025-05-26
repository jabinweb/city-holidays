import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma');
    const crypto = await import('crypto');
    
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { message: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_webhook_secret')
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle different payment events
    switch (event.event) {
      case 'payment.captured':
        // Update booking status when payment is captured
        const paymentData = event.payload.payment.entity;
        
        // Find booking by order ID
        const booking = await prisma.booking.findFirst({
          where: { razorpayOrderId: paymentData.order_id }
        });

        if (booking) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              status: 'CONFIRMED',
              paidAmount: paymentData.amount / 100, // Convert from paise to rupees
              razorpayPaymentId: paymentData.id
            }
          });
        }
        break;

      case 'payment.failed':
        // Handle failed payments
        const failedPaymentData = event.payload.payment.entity;
        
        const failedBooking = await prisma.booking.findFirst({
          where: { razorpayOrderId: failedPaymentData.order_id }
        });

        if (failedBooking) {
          await prisma.booking.update({
            where: { id: failedBooking.id },
            data: {
              status: 'CANCELLED'
            }
          });
        }
        break;

      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
