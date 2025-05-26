import { prisma } from './prisma';

export interface AppConfig {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    gstNumber: string;
    panNumber: string;
  };
  payment: {
    razorpay: {
      enabled: boolean;
      testMode: boolean;
      apiKey: string;
      secretKey: string;
    };
    stripe: {
      enabled: boolean;
      testMode: boolean;
      apiKey: string;
      secretKey: string;
    };
    payu: {
      enabled: boolean;
      testMode: boolean;
      apiKey: string;
      secretKey: string;
    };
  };
  app: {
    maintenanceMode: boolean;
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    defaultCurrency: string;
    timeZone: string;
    dateFormat: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    bookingAlerts: boolean;
    paymentAlerts: boolean;
    systemAlerts: boolean;
  };
}

let cachedConfig: AppConfig | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAppConfig(): Promise<AppConfig> {
  const now = Date.now();
  
  // Return cached config if still valid
  if (cachedConfig && (now - cacheTime) < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    const settings = await prisma.setting.findMany();
    
    const config: AppConfig = {
      company: {
        name: getSettingValue(settings, 'company_name', 'City Holidays'),
        email: getSettingValue(settings, 'company_email', 'info@cityholidays.in'),
        phone: getSettingValue(settings, 'company_phone', '+91 9528735541'),
        address: getSettingValue(settings, 'company_address', 'Agra, Uttar Pradesh, India'),
        website: getSettingValue(settings, 'company_website', 'https://cityholidays.in'),
        gstNumber: getSettingValue(settings, 'company_gst', ''),
        panNumber: getSettingValue(settings, 'company_pan', '')
      },
      payment: {
        razorpay: {
          enabled: getSettingValue(settings, 'razorpay_enabled', 'true') === 'true',
          testMode: getSettingValue(settings, 'razorpay_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'razorpay_api_key', ''),
          secretKey: getSettingValue(settings, 'razorpay_secret_key', '')
        },
        stripe: {
          enabled: getSettingValue(settings, 'stripe_enabled', 'false') === 'true',
          testMode: getSettingValue(settings, 'stripe_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'stripe_api_key', ''),
          secretKey: getSettingValue(settings, 'stripe_secret_key', '')
        },
        payu: {
          enabled: getSettingValue(settings, 'payu_enabled', 'false') === 'true',
          testMode: getSettingValue(settings, 'payu_test_mode', 'true') === 'true',
          apiKey: getSettingValue(settings, 'payu_api_key', ''),
          secretKey: getSettingValue(settings, 'payu_secret_key', '')
        }
      },
      app: {
        maintenanceMode: getSettingValue(settings, 'maintenance_mode', 'false') === 'true',
        allowRegistration: getSettingValue(settings, 'allow_registration', 'true') === 'true',
        requireEmailVerification: getSettingValue(settings, 'require_email_verification', 'true') === 'true',
        defaultCurrency: getSettingValue(settings, 'default_currency', 'INR'),
        timeZone: getSettingValue(settings, 'timezone', 'Asia/Kolkata'),
        dateFormat: getSettingValue(settings, 'date_format', 'DD/MM/YYYY')
      },
      notifications: {
        emailNotifications: getSettingValue(settings, 'email_notifications', 'true') === 'true',
        smsNotifications: getSettingValue(settings, 'sms_notifications', 'true') === 'true',
        bookingAlerts: getSettingValue(settings, 'booking_alerts', 'true') === 'true',
        paymentAlerts: getSettingValue(settings, 'payment_alerts', 'true') === 'true',
        systemAlerts: getSettingValue(settings, 'system_alerts', 'true') === 'true'
      }
    };

    // Cache the config
    cachedConfig = config;
    cacheTime = now;
    
    return config;
  } catch (error) {
    console.error('Failed to load app config:', error);
    
    // Return default config on error
    return getDefaultConfig();
  }
}

export function clearConfigCache() {
  cachedConfig = null;
  cacheTime = 0;
}

function getSettingValue(settings: any[], key: string, defaultValue: string): string {
  const setting = settings.find(s => s.key === key);
  return setting ? setting.value : defaultValue;
}

function getDefaultConfig(): AppConfig {
  return {
    company: {
      name: 'City Holidays',
      email: 'info@cityholidays.in',
      phone: '+91 9528735541',
      address: 'Agra, Uttar Pradesh, India',
      website: 'https://cityholidays.in',
      gstNumber: '',
      panNumber: ''
    },
    payment: {
      razorpay: {
        enabled: true,
        testMode: true,
        apiKey: '',
        secretKey: ''
      },
      stripe: {
        enabled: false,
        testMode: true,
        apiKey: '',
        secretKey: ''
      },
      payu: {
        enabled: false,
        testMode: true,
        apiKey: '',
        secretKey: ''
      }
    },
    app: {
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      defaultCurrency: 'INR',
      timeZone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      bookingAlerts: true,
      paymentAlerts: true,
      systemAlerts: true
    }
  };
}
