import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { amount, currency = 'INR', bookingId } = await request.json();

    // Get Razorpay settings from database
    const razorpaySettings = await prisma.setting.findMany({
      where: {
        key: {
          in: ['razorpay_enabled', 'razorpay_api_key', 'razorpay_secret_key', 'razorpay_test_mode']
        }
      }
    });

    const getSettingValue = (key: string, defaultValue: string = '') => {
      const setting = razorpaySettings.find(s => s.key === key);
      return setting ? setting.value : defaultValue;
    };

    const isRazorpayEnabled = getSettingValue('razorpay_enabled', 'false') === 'true';
    const razorpayApiKey = getSettingValue('razorpay_api_key');
    const razorpaySecretKey = getSettingValue('razorpay_secret_key');
    const isTestMode = getSettingValue('razorpay_test_mode', 'true') === 'true';

    if (!isRazorpayEnabled) {
      return NextResponse.json(
        { message: 'Razorpay is not enabled' },
        { status: 400 }
      );
    }

    if (!razorpayApiKey || !razorpaySecretKey) {
      return NextResponse.json(
        { message: 'Razorpay credentials not configured' },
        { status: 500 }
      );
    }

    // Initialize Razorpay with settings from database
    const razorpay = new Razorpay({
      key_id: razorpayApiKey,
      key_secret: razorpaySecretKey,
    });

    // Create order
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `booking_${bookingId}_${Date.now()}`,
      notes: {
        bookingId,
        userId: session.user.id,
        testMode: isTestMode.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: razorpayApiKey,
      testMode: isTestMode,
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
