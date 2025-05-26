import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Dynamic imports to avoid build-time database connection
    const { auth } = await import('@/auth');
    const { prisma } = await import('@/lib/prisma');
    
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { amount, currency = 'INR', receipt, notes } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Invalid amount' },
        { status: 400 }
      );
    }

    // For now, return a mock order since we don't have Razorpay setup
    const mockOrder = {
      id: `order_${Date.now()}`,
      entity: 'order',
      amount: amount * 100, // Razorpay expects amount in paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: notes || {},
      created_at: Math.floor(Date.now() / 1000),
    };

    // In production, you would use Razorpay SDK:
    // const Razorpay = (await import('razorpay')).default;
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID!,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
    // });
    // const order = await razorpay.orders.create({
    //   amount: amount * 100,
    //   currency,
    //   receipt,
    //   notes,
    // });

    return NextResponse.json({
      success: true,
      order: mockOrder,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'mock_key'
    });

  } catch (error) {
    console.error('Payment order creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
