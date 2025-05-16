'use client';

import { useState } from 'react';
import Button from './Button';
import { X } from 'lucide-react';

interface BookNowButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const services = [
  { id: 'holiday', name: 'Holiday Packages', icon: '🏖️' },
  { id: 'flight', name: 'Flight Bookings', icon: '✈️' },
  { id: 'hotel', name: 'Hotel Bookings', icon: '🏨' },
  { id: 'railway', name: 'Railway Reservations', icon: '🚂' },
  { id: 'bus', name: 'Bus Bookings', icon: '🚌' },
  { id: 'taxi', name: 'Taxi Services', icon: '🚕' }
];

export default function BookNowButton({ 
  variant = 'primary', 
  size = 'md',
  fullWidth 
}: BookNowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedService('');
  };

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        fullWidth={fullWidth}
        onClick={() => setIsOpen(true)}
      >
        Book Now
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold">
                {step === 1 ? 'Select Service' : 'Book Now'}
              </h2>
              <button onClick={resetAndClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {step === 1 ? (
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-3xl mb-2">{service.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <span className="text-2xl">
                      {services.find(s => s.id === selectedService)?.icon}
                    </span>
                    <span className="font-medium">
                      {services.find(s => s.id === selectedService)?.name}
                    </span>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      placeholder="Your Requirements"
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button variant="primary">
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
