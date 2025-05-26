import { prisma } from './prisma';

export interface PaymentConfig {
  razorpay: {
    enabled: boolean;
    apiKey: string;
    secretKey: string;
    testMode: boolean;
  };
  stripe: {
    enabled: boolean;
    apiKey: string;
    secretKey: string;
    testMode: boolean;
  };
  payu: {
    enabled: boolean;
    apiKey: string;
    secretKey: string;
    testMode: boolean;
  };
}

let cachedPaymentConfig: PaymentConfig | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getPaymentConfig(): Promise<PaymentConfig> {
  const now = Date.now();
  
  // Return cached config if still valid
  if (cachedPaymentConfig && (now - cacheTime) < CACHE_DURATION) {
    return cachedPaymentConfig;
  }

  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            'razorpay_enabled', 'razorpay_api_key', 'razorpay_secret_key', 'razorpay_test_mode',
            'stripe_enabled', 'stripe_api_key', 'stripe_secret_key', 'stripe_test_mode',
            'payu_enabled', 'payu_api_key', 'payu_secret_key', 'payu_test_mode'
          ]
        }
      }
    });

    const getSettingValue = (key: string, defaultValue: string = '') => {
      const setting = settings.find(s => s.key === key);
      return setting ? setting.value : defaultValue;
    };

    const config: PaymentConfig = {
      razorpay: {
        enabled: getSettingValue('razorpay_enabled', 'false') === 'true',
        apiKey: getSettingValue('razorpay_api_key'),
        secretKey: getSettingValue('razorpay_secret_key'),
        testMode: getSettingValue('razorpay_test_mode', 'true') === 'true'
      },
      stripe: {
        enabled: getSettingValue('stripe_enabled', 'false') === 'true',
        apiKey: getSettingValue('stripe_api_key'),
        secretKey: getSettingValue('stripe_secret_key'),
        testMode: getSettingValue('stripe_test_mode', 'true') === 'true'
      },
      payu: {
        enabled: getSettingValue('payu_enabled', 'false') === 'true',
        apiKey: getSettingValue('payu_api_key'),
        secretKey: getSettingValue('payu_secret_key'),
        testMode: getSettingValue('payu_test_mode', 'true') === 'true'
      }
    };

    // Cache the config
    cachedPaymentConfig = config;
    cacheTime = now;
    
    return config;
  } catch (error) {
    console.error('Failed to load payment config:', error);
    
    // Return default config with disabled gateways on error
    return {
      razorpay: { enabled: false, apiKey: '', secretKey: '', testMode: true },
      stripe: { enabled: false, apiKey: '', secretKey: '', testMode: true },
      payu: { enabled: false, apiKey: '', secretKey: '', testMode: true }
    };
  }
}

export function clearPaymentConfigCache() {
  cachedPaymentConfig = null;
  cacheTime = 0;
}

// Helper function to get enabled payment gateways
export async function getEnabledPaymentGateways(): Promise<string[]> {
  const config = await getPaymentConfig();
  const enabledGateways: string[] = [];
  
  if (config.razorpay.enabled && config.razorpay.apiKey && config.razorpay.secretKey) {
    enabledGateways.push('razorpay');
  }
  
  if (config.stripe.enabled && config.stripe.apiKey && config.stripe.secretKey) {
    enabledGateways.push('stripe');
  }
  
  if (config.payu.enabled && config.payu.apiKey && config.payu.secretKey) {
    enabledGateways.push('payu');
  }
  
  return enabledGateways;
}
