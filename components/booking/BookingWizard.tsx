'use client';

import { useState } from 'react';
import { Check, ChevronRight, Calendar, Users, CreditCard, MapPin } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import RazorpayPayment from '@/components/payments/RazorpayPayment';
import { Package } from '@/data/packages';

interface BookingWizardProps {
  packageItem?: Package;
}

export default function BookingWizard({ packageItem }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    date: '',
    rooms: 1,
    specialRequests: '',
    personalInfo: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      address: ''
    },
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const steps = [
    { id: 1, name: 'Travel Details', icon: Calendar },
    { id: 2, name: 'Personal Info', icon: Users },
    { id: 3, name: 'Emergency Contact', icon: MapPin },
    { id: 4, name: 'Payment', icon: CreditCard }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateBooking = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: packageItem?.id,
          serviceType: 'HOLIDAY_PACKAGE',
          travelers: bookingData.travelers,
          rooms: bookingData.rooms,
          date: bookingData.date,
          totalAmount: packageItem ? packageItem.price * bookingData.travelers : 0,
          specialRequests: bookingData.specialRequests,
          contactName: bookingData.personalInfo.name,
          contactEmail: bookingData.personalInfo.email,
          contactPhone: bookingData.personalInfo.phone,
          contactAddress: bookingData.personalInfo.address,
          emergencyName: bookingData.emergencyContact.name,
          emergencyPhone: bookingData.emergencyContact.phone,
          emergencyRelation: bookingData.emergencyContact.relation,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setCreatedBookingId(result.id);
        nextStep(); // Move to payment step
      } else {
        setSubmitError(result.message || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to login if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
        <p className="text-gray-600 mb-6">Please sign in to continue with your booking.</p>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            fullWidth
            onClick={() => router.push('/auth/signin')}
          >
            Sign In
          </Button>
          <Button 
            variant="primary" 
            fullWidth
            onClick={() => router.push('/auth/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Travel Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Travel Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.travelers}
                  onChange={(e) => setBookingData({...bookingData, travelers: parseInt(e.target.value)})}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rooms Required</label>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.rooms}
                  onChange={(e) => setBookingData({...bookingData, rooms: parseInt(e.target.value)})}
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} Room{i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Special Requests</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements, dietary restrictions, accessibility needs..."
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.personalInfo.name}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    personalInfo: {...bookingData.personalInfo, name: e.target.value}
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.personalInfo.email}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    personalInfo: {...bookingData.personalInfo, email: e.target.value}
                  })}
                  required
                  readOnly={!!session?.user?.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.personalInfo.phone}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    personalInfo: {...bookingData.personalInfo, phone: e.target.value}
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.personalInfo.address}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    personalInfo: {...bookingData.personalInfo, address: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.emergencyContact.name}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    emergencyContact: {...bookingData.emergencyContact, name: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.emergencyContact.phone}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    emergencyContact: {...bookingData.emergencyContact, phone: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Relationship</label>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={bookingData.emergencyContact.relation}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    emergencyContact: {...bookingData.emergencyContact, relation: e.target.value}
                  })}
                >
                  <option value="">Select Relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payment</h3>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Booking Summary</h4>
              {packageItem && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span>{packageItem.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travelers:</span>
                    <span>{bookingData.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>₹{(packageItem.price * bookingData.travelers).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Component */}
            {createdBookingId && packageItem ? (
              <RazorpayPayment
                bookingId={createdBookingId}
                amount={packageItem.price * bookingData.travelers}
                title={packageItem.title}
                description={`Booking for ${bookingData.travelers} travelers`}
                onSuccess={(paymentData) => {
                  console.log('Payment successful:', paymentData);
                }}
                onError={(error) => {
                  console.error('Payment error:', error);
                }}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Please create your booking to proceed with payment
                </p>
                <Button
                  variant="primary"
                  onClick={handleCreateBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Booking...' : 'Create Booking & Proceed to Payment'}
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep > step.id 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : currentStep === step.id
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <Check size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="mx-4 text-gray-400" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {submitError}
          </div>
        )}
        
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
        >
          Previous
        </Button>
        {currentStep < 4 && (
          <Button 
            variant="primary" 
            onClick={currentStep === 3 ? handleCreateBooking : nextStep}
            disabled={isSubmitting}
          >
            {currentStep === 3 
              ? (isSubmitting ? 'Creating Booking...' : 'Create Booking') 
              : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
}
