'use client';

import { useState } from 'react';
import { BookingDetails } from '@/utils/booking';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface BookingFormProps {
  bookingDetails: BookingDetails | null;
  service: string | null;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function BookingForm({ 
  bookingDetails,
  service = '', 
  onSubmit, 
  isLoading 
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    adults: '2',  // Changed from passengers to separate adults/children
    children: '0',
    message: ''
  });

  // Create passenger options dynamically
  const adultOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} Adult${i !== 0 ? 's' : ''}`
  }));

  const childrenOptions = Array.from({ length: 6 }, (_, i) => ({
    value: String(i),
    label: i === 0 ? 'No Children' : `${i} Child${i !== 1 ? 'ren' : ''}`
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      ...formData, 
      type: service, 
      itemId: bookingDetails?.id,
      bookingType: bookingDetails?.type 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Common Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      {/* Service Specific Fields */}
      {service === 'taxi' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Pickup Location"
            value={formData.pickupLocation}
            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
            required
          />
          <Input
            label="Drop Location"
            value={formData.dropLocation}
            onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
            required
          />
        </div>
      ) : null}

      {/* Date and Time Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        {service === 'taxi' && (
          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        )}
      </div>

      {/* Passenger Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Number of Adults"
          value={formData.adults}
          onChange={(value) => setFormData({ ...formData, adults: value })}
          options={adultOptions}
        />
        <Select
          label="Number of Children"
          value={formData.children}
          onChange={(value) => setFormData({ ...formData, children: value })}
          options={childrenOptions}
        />
      </div>

      {/* Message/Requirements Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {service === 'taxi' ? 'Additional Requirements' : 'Special Requests'} (Optional)
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={service === 'taxi' 
            ? 'Any specific requirements for your journey...'
            : 'Any special requests or preferences...'
          }
        />
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </Button>
    </form>
  );
}
