'use client';

import { useState } from 'react';
import { Package } from '@/data/packages';
import Button from '@/components/ui/Button';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';

interface BookingWizardProps {
  packageItem: Package;
}

export default function BookingWizard({ packageItem }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    travelers: 1,
    rooms: 1,
    travelDate: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequests: ''
  });

  const steps = [
    { number: 1, title: 'Travel Details', icon: Calendar },
    { number: 2, title: 'Contact Info', icon: Users },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return packageItem.price * formData.travelers;
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Handle booking submission
    console.log('Booking data:', { packageItem, formData });
    // Redirect to payment or success page
    window.location.href = '/booking/success';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.number} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${step >= stepItem.number 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'}
              `}>
                <stepItem.icon size={20} />
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${step >= stepItem.number ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step {stepItem.number}
                </p>
                <p className={`text-xs ${step >= stepItem.number ? 'text-gray-900' : 'text-gray-400'}`}>
                  {stepItem.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-4 transition-colors
                  ${step > stepItem.number ? 'bg-blue-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Travel Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Travelers
                    </label>
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rooms Required
                    </label>
                    <select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" onClick={nextStep}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={nextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Payment</h2>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Payment Summary</h3>
                  <div className="space-y-2 text-blue-800">
                    <div className="flex justify-between">
                      <span>Package Price (per person)</span>
                      <span>₹{packageItem.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Travelers</span>
                      <span>{formData.travelers}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-medium">{packageItem.title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{packageItem.duration}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Travelers</span>
                <span className="font-medium">{formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}</span>
              </div>
              
              {formData.travelDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(formData.travelDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{calculateTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
