'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  CreditCard, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Bell, 
  Palette, 
  Database,
  Save,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';


interface PaymentGateway {
  id: string;
  name: string;
  enabled: boolean;
  testMode: boolean;
  apiKey: string;
  secretKey: string;
  webhookUrl: string;
}

interface BusinessSettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  gstNumber: string;
  panNumber: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  systemAlerts: boolean;
}

interface AppSettings {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultCurrency: string;
  timeZone: string;
  dateFormat: string;
}

const SettingsCard = ({ 
  title, 
  description, 
  icon, 
  children 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  disabled = false
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        disabled ? 'bg-gray-50 text-gray-500' : ''
      }`}
    />
  </div>
);

const ToggleSwitch = ({ 
  label, 
  description, 
  enabled, 
  onChange 
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex-1">
      <div className="font-medium text-gray-900">{label}</div>
      {description && <div className="text-sm text-gray-500">{description}</div>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Payment Gateway Settings
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    {
      id: 'razorpay',
      name: 'Razorpay',
      enabled: true,
      testMode: true,
      apiKey: '',
      secretKey: '',
      webhookUrl: ''
    },
    {
      id: 'stripe',
      name: 'Stripe',
      enabled: false,
      testMode: true,
      apiKey: '',
      secretKey: '',
      webhookUrl: ''
    },
    {
      id: 'payu',
      name: 'PayU',
      enabled: false,
      testMode: true,
      apiKey: '',
      secretKey: '',
      webhookUrl: ''
    }
  ]);

  // Business Settings
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    companyName: 'City Holidays',
    email: 'info@cityholidays.in',
    phone: '+91 9528735541',
    address: 'Agra, Uttar Pradesh, India',
    website: 'https://cityholidays.in',
    gstNumber: '',
    panNumber: ''
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    systemAlerts: true
  });

  // App Settings
  const [appSettings, setAppSettings] = useState<AppSettings>({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    defaultCurrency: 'INR',
    timeZone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      
      const response = await fetch('/api/admin/settings');
      
      if (response.ok) {
        const data = await response.json();
        
        // Update payment gateways
        setPaymentGateways([
          {
            id: 'razorpay',
            name: 'Razorpay',
            enabled: data.paymentGateways.razorpay.enabled,
            testMode: data.paymentGateways.razorpay.testMode,
            apiKey: data.paymentGateways.razorpay.apiKey,
            secretKey: data.paymentGateways.razorpay.secretKey,
            webhookUrl: data.paymentGateways.razorpay.webhookUrl
          },
          {
            id: 'stripe',
            name: 'Stripe',
            enabled: data.paymentGateways.stripe.enabled,
            testMode: data.paymentGateways.stripe.testMode,
            apiKey: data.paymentGateways.stripe.apiKey,
            secretKey: data.paymentGateways.stripe.secretKey,
            webhookUrl: data.paymentGateways.stripe.webhookUrl
          },
          {
            id: 'payu',
            name: 'PayU',
            enabled: data.paymentGateways.payu.enabled,
            testMode: data.paymentGateways.payu.testMode,
            apiKey: data.paymentGateways.payu.apiKey,
            secretKey: data.paymentGateways.payu.secretKey,
            webhookUrl: data.paymentGateways.payu.webhookUrl
          }
        ]);
        
        // Update other settings
        setBusinessSettings(data.businessSettings);
        setNotificationSettings(data.notificationSettings);
        setAppSettings(data.appSettings);
      } else {
        throw new Error('Failed to fetch settings');
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setErrorMessage('Failed to load settings. Using default values.');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      
      // Convert paymentGateways array to object format for API
      const paymentGatewaysObj = {
        razorpay: paymentGateways.find(g => g.id === 'razorpay')!,
        stripe: paymentGateways.find(g => g.id === 'stripe')!,
        payu: paymentGateways.find(g => g.id === 'payu')!
      };
      
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentGateways: paymentGatewaysObj,
          businessSettings,
          notificationSettings,
          appSettings
        })
      });

      if (response.ok) {
        setSuccessMessage('Settings saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setErrorMessage('Failed to save settings. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const updatePaymentGateway = (id: string, updates: Partial<PaymentGateway>) => {
    setPaymentGateways(prev => 
      prev.map(gateway => 
        gateway.id === id ? { ...gateway, ...updates } : gateway
      )
    );
  };

  const toggleSecretVisibility = (gatewayId: string, field: string) => {
    const key = `${gatewayId}_${field}`;
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <div className="animate-pulse space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800 font-medium">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Payment Gateway Settings */}
        <SettingsCard
          title="Payment Gateways"
          description="Configure payment processing options"
          icon={<CreditCard className="h-5 w-5" />}
        >
          <div className="space-y-6">
            {paymentGateways.map((gateway) => (
              <div key={gateway.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">{gateway.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      gateway.enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gateway.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <ToggleSwitch
                    label=""
                    enabled={gateway.enabled}
                    onChange={(enabled) => updatePaymentGateway(gateway.id, { enabled })}
                  />
                </div>

                {gateway.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="API Key"
                      value={gateway.apiKey}
                      onChange={(value) => updatePaymentGateway(gateway.id, { apiKey: value })}
                      placeholder="Enter API key"
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Secret Key</label>
                      <div className="relative">
                        <input
                          type={showSecrets[`${gateway.id}_secret`] ? 'text' : 'password'}
                          value={gateway.secretKey}
                          onChange={(e) => updatePaymentGateway(gateway.id, { secretKey: e.target.value })}
                          placeholder="Enter secret key"
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => toggleSecretVisibility(gateway.id, 'secret')}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showSecrets[`${gateway.id}_secret`] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <InputField
                      label="Webhook URL"
                      value={gateway.webhookUrl}
                      onChange={(value) => updatePaymentGateway(gateway.id, { webhookUrl: value })}
                      placeholder="Enter webhook URL"
                      disabled
                    />
                    <div className="flex items-center">
                      <ToggleSwitch
                        label="Test Mode"
                        description="Enable for testing payments"
                        enabled={gateway.testMode}
                        onChange={(testMode) => updatePaymentGateway(gateway.id, { testMode })}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* Business Information */}
        <SettingsCard
          title="Business Information"
          description="Update your company details"
          icon={<Globe className="h-5 w-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Company Name"
              value={businessSettings.companyName}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, companyName: value }))}
              required
            />
            <InputField
              label="Email"
              type="email"
              value={businessSettings.email}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, email: value }))}
              required
            />
            <InputField
              label="Phone"
              value={businessSettings.phone}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, phone: value }))}
              required
            />
            <InputField
              label="Website"
              value={businessSettings.website}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, website: value }))}
            />
            <div className="md:col-span-2">
              <InputField
                label="Address"
                value={businessSettings.address}
                onChange={(value) => setBusinessSettings(prev => ({ ...prev, address: value }))}
                required
              />
            </div>
            <InputField
              label="GST Number"
              value={businessSettings.gstNumber}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, gstNumber: value }))}
              placeholder="Enter GST number"
            />
            <InputField
              label="PAN Number"
              value={businessSettings.panNumber}
              onChange={(value) => setBusinessSettings(prev => ({ ...prev, panNumber: value }))}
              placeholder="Enter PAN number"
            />
          </div>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard
          title="Notifications"
          description="Configure notification preferences"
          icon={<Bell className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <ToggleSwitch
              label="Email Notifications"
              description="Receive notifications via email"
              enabled={notificationSettings.emailNotifications}
              onChange={(value) => setNotificationSettings(prev => ({ ...prev, emailNotifications: value }))}
            />
            <ToggleSwitch
              label="SMS Notifications"
              description="Receive notifications via SMS"
              enabled={notificationSettings.smsNotifications}
              onChange={(value) => setNotificationSettings(prev => ({ ...prev, smsNotifications: value }))}
            />
            <ToggleSwitch
              label="Booking Alerts"
              description="Get notified for new bookings"
              enabled={notificationSettings.bookingAlerts}
              onChange={(value) => setNotificationSettings(prev => ({ ...prev, bookingAlerts: value }))}
            />
            <ToggleSwitch
              label="Payment Alerts"
              description="Get notified for payment activities"
              enabled={notificationSettings.paymentAlerts}
              onChange={(value) => setNotificationSettings(prev => ({ ...prev, paymentAlerts: value }))}
            />
            <ToggleSwitch
              label="System Alerts"
              description="Get notified for system events"
              enabled={notificationSettings.systemAlerts}
              onChange={(value) => setNotificationSettings(prev => ({ ...prev, systemAlerts: value }))}
            />
          </div>
        </SettingsCard>

        {/* Application Settings */}
        <SettingsCard
          title="Application Settings"
          description="Configure application behavior"
          icon={<SettingsIcon className="h-5 w-5" />}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                <select
                  value={appSettings.defaultCurrency}
                  onChange={(e) => setAppSettings(prev => ({ ...prev, defaultCurrency: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select
                  value={appSettings.timeZone}
                  onChange={(e) => setAppSettings(prev => ({ ...prev, timeZone: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date Format</label>
                <select
                  value={appSettings.dateFormat}
                  onChange={(e) => setAppSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Maintenance Mode</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      When enabled, your website will show a maintenance page to visitors
                    </p>
                  </div>
                  <ToggleSwitch
                    label=""
                    enabled={appSettings.maintenanceMode}
                    onChange={(value) => setAppSettings(prev => ({ ...prev, maintenanceMode: value }))}
                  />
                </div>
              </div>

              <ToggleSwitch
                label="Allow User Registration"
                description="Allow new users to register on the platform"
                enabled={appSettings.allowRegistration}
                onChange={(value) => setAppSettings(prev => ({ ...prev, allowRegistration: value }))}
              />
              <ToggleSwitch
                label="Require Email Verification"
                description="Users must verify their email before accessing the platform"
                enabled={appSettings.requireEmailVerification}
                onChange={(value) => setAppSettings(prev => ({ ...prev, requireEmailVerification: value }))}
              />
            </div>
          </div>
        </SettingsCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={saveSettings}
            disabled={saving}
            className="px-8"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
