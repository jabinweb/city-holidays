import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { clearPaymentConfigCache } from '@/lib/payment-config';
import { clearConfigCache } from '@/lib/settings';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all settings from database
    const settings = await prisma.setting.findMany();
    
    // Convert array to structured object
    const settingsData = {
      paymentGateways: {
        razorpay: {
          enabled: getSettingValue(settings, 'razorpay_enabled', 'true') === 'true',
          testMode: getSettingValue(settings, 'razorpay_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'razorpay_api_key', ''),
          secretKey: getSettingValue(settings, 'razorpay_secret_key', ''),
          webhookUrl: getSettingValue(settings, 'razorpay_webhook_url', process.env.NEXTAUTH_URL + '/api/webhooks/razorpay')
        },
        stripe: {
          enabled: getSettingValue(settings, 'stripe_enabled', 'false') === 'true',
          testMode: getSettingValue(settings, 'stripe_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'stripe_api_key', ''),
          secretKey: getSettingValue(settings, 'stripe_secret_key', ''),
          webhookUrl: getSettingValue(settings, 'stripe_webhook_url', process.env.NEXTAUTH_URL + '/api/webhooks/stripe')
        },
        payu: {
          enabled: getSettingValue(settings, 'payu_enabled', 'false') === 'true',
          testMode: getSettingValue(settings, 'payu_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'payu_api_key', ''),
          secretKey: getSettingValue(settings, 'payu_secret_key', ''),
          webhookUrl: getSettingValue(settings, 'payu_webhook_url', process.env.NEXTAUTH_URL + '/api/webhooks/payu')
        }
      },
      businessSettings: {
        companyName: getSettingValue(settings, 'company_name', 'City Holidays'),
        email: getSettingValue(settings, 'company_email', 'info@cityholidays.in'),
        phone: getSettingValue(settings, 'company_phone', '+91 9528735541'),
        address: getSettingValue(settings, 'company_address', 'Agra, Uttar Pradesh, India'),
        website: getSettingValue(settings, 'company_website', 'https://cityholidays.in'),
        gstNumber: getSettingValue(settings, 'company_gst', ''),
        panNumber: getSettingValue(settings, 'company_pan', '')
      },
      notificationSettings: {
        emailNotifications: getSettingValue(settings, 'email_notifications', 'true') === 'true',
        smsNotifications: getSettingValue(settings, 'sms_notifications', 'true') === 'true',
        bookingAlerts: getSettingValue(settings, 'booking_alerts', 'true') === 'true',
        paymentAlerts: getSettingValue(settings, 'payment_alerts', 'true') === 'true',
        systemAlerts: getSettingValue(settings, 'system_alerts', 'true') === 'true'
      },
      appSettings: {
        maintenanceMode: getSettingValue(settings, 'maintenance_mode', 'false') === 'true',
        allowRegistration: getSettingValue(settings, 'allow_registration', 'true') === 'true',
        requireEmailVerification: getSettingValue(settings, 'require_email_verification', 'true') === 'true',
        defaultCurrency: getSettingValue(settings, 'default_currency', 'INR'),
        timeZone: getSettingValue(settings, 'timezone', 'Asia/Kolkata'),
        dateFormat: getSettingValue(settings, 'date_format', 'DD/MM/YYYY')
      }
    };

    return NextResponse.json(settingsData);
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { paymentGateways, businessSettings, notificationSettings, appSettings } = data;

    // Prepare settings array for upsert
    const settingsToUpdate = [
      // Payment Gateway Settings
      { key: 'razorpay_enabled', value: String(paymentGateways.razorpay.enabled) },
      { key: 'razorpay_test_mode', value: String(paymentGateways.razorpay.testMode) },
      { key: 'razorpay_api_key', value: paymentGateways.razorpay.apiKey },
      { key: 'razorpay_secret_key', value: paymentGateways.razorpay.secretKey },
      { key: 'razorpay_webhook_url', value: paymentGateways.razorpay.webhookUrl },
      
      { key: 'stripe_enabled', value: String(paymentGateways.stripe.enabled) },
      { key: 'stripe_test_mode', value: String(paymentGateways.stripe.testMode) },
      { key: 'stripe_api_key', value: paymentGateways.stripe.apiKey },
      { key: 'stripe_secret_key', value: paymentGateways.stripe.secretKey },
      { key: 'stripe_webhook_url', value: paymentGateways.stripe.webhookUrl },
      
      { key: 'payu_enabled', value: String(paymentGateways.payu.enabled) },
      { key: 'payu_test_mode', value: String(paymentGateways.payu.testMode) },
      { key: 'payu_api_key', value: paymentGateways.payu.apiKey },
      { key: 'payu_secret_key', value: paymentGateways.payu.secretKey },
      { key: 'payu_webhook_url', value: paymentGateways.payu.webhookUrl },

      // Business Settings
      { key: 'company_name', value: businessSettings.companyName },
      { key: 'company_email', value: businessSettings.email },
      { key: 'company_phone', value: businessSettings.phone },
      { key: 'company_address', value: businessSettings.address },
      { key: 'company_website', value: businessSettings.website },
      { key: 'company_gst', value: businessSettings.gstNumber },
      { key: 'company_pan', value: businessSettings.panNumber },

      // Notification Settings
      { key: 'email_notifications', value: String(notificationSettings.emailNotifications) },
      { key: 'sms_notifications', value: String(notificationSettings.smsNotifications) },
      { key: 'booking_alerts', value: String(notificationSettings.bookingAlerts) },
      { key: 'payment_alerts', value: String(notificationSettings.paymentAlerts) },
      { key: 'system_alerts', value: String(notificationSettings.systemAlerts) },

      // App Settings
      { key: 'maintenance_mode', value: String(appSettings.maintenanceMode) },
      { key: 'allow_registration', value: String(appSettings.allowRegistration) },
      { key: 'require_email_verification', value: String(appSettings.requireEmailVerification) },
      { key: 'default_currency', value: appSettings.defaultCurrency },
      { key: 'timezone', value: appSettings.timeZone },
      { key: 'date_format', value: appSettings.dateFormat }
    ];

    // Use transaction to update all settings
    await prisma.$transaction(async (tx) => {
      for (const setting of settingsToUpdate) {
        await tx.setting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value }
        });
      }
    });

    // Clear caches after updating settings
    clearPaymentConfigCache();
    clearConfigCache();

    return NextResponse.json({ message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}

function getSettingValue(settings: any[], key: string, defaultValue: string): string {
  const setting = settings.find(s => s.key === key);
  return setting ? setting.value : defaultValue;
}
