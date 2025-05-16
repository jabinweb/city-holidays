'use client';

import { Package } from '@/data/packages';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface BookingFormProps {
  packageItem?: Package;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function BookingForm({ packageItem, onSubmit, isLoading }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    adults: '2',
    children: '0',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, packageId: packageItem?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Input
          label="Preferred Travel Date"
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Number of Adults"
          name="adults"
          value={formData.adults}
          onChange={(value) => setFormData({ ...formData, adults: value })}
          options={[
            { value: '1', label: '1 Adult' },
            { value: '2', label: '2 Adults' },
            { value: '3', label: '3 Adults' },
            { value: '4', label: '4 Adults' },
          ]}
        />
        <Select
          label="Number of Children"
          name="children"
          value={formData.children}
          onChange={(value) => setFormData({ ...formData, children: value })}
          options={[
            { value: '0', label: 'No Children' },
            { value: '1', label: '1 Child' },
            { value: '2', label: '2 Children' },
            { value: '3', label: '3 Children' },
          ]}
        />
      </div>

      <textarea
        placeholder="Special Requests (Optional)"
        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
        rows={4}
        value={formData.specialRequests}
        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
      />

      <Button type="submit" fullWidth size="lg" disabled={isLoading}>
        {isLoading ? 'Processing...' : `Book Now - ₹${packageItem?.price.toLocaleString('en-IN') || 'NA'}`}
      </Button>
    </form>
  );
}
