'use client'
import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    destination: '',
    duration: '',
    accommodation: '',
    transportation: '',
    budget: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    setStep(4); // Move to success step
    window.scrollTo(0, 0);
  };
  
  const serviceOptions = [
    { value: 'holiday', label: 'Holiday Package' },
    { value: 'flight', label: 'Flight Booking' },
    { value: 'railway', label: 'Railway Reservation' },
    { value: 'bus', label: 'Bus Booking' },
    { value: 'taxi', label: 'Taxi Service' }
  ];
  
  const accommodationOptions = [
    { value: 'budget', label: 'Budget' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'luxury', label: 'Luxury' }
  ];
  
  const transportationOptions = [
    { value: 'flight', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'car', label: 'Private Car' }
  ];
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div 
                className={`w-12 h-1 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderStep1 = () => {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
        <div className="space-y-4">
          <Select
            label="Service Type"
            name="service"
            options={serviceOptions}
            value={formData.service}
            onChange={(value) => setFormData({ ...formData, service: value })}
            required
          />
          
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <div className="flex justify-end mt-6">
            <Button onClick={nextStep}>
              Next Step
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  const renderStep2 = () => {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-6">Travel Details</h2>
        <div className="space-y-4">
          <Input
            label="Travel Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Number of Travelers"
            name="guests"
            type="number"
            placeholder="Enter number of travelers"
            value={formData.guests}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Destination"
            name="destination"
            type="text"
            placeholder="Where do you want to go?"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Duration (in days)"
            name="duration"
            type="number"
            placeholder="Enter trip duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Next Step
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  const renderStep3 = () => {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-6">Preferences & Payment</h2>
        <div className="space-y-4">
          <Select
            label="Accommodation Type"
            name="accommodation"
            options={accommodationOptions}
            value={formData.accommodation}
            onChange={(value) => setFormData({ ...formData, accommodation: value })}
          />
          
          <Select
            label="Preferred Transportation"
            name="transportation"
            options={transportationOptions}
            value={formData.transportation}
            onChange={(value) => setFormData({ ...formData, transportation: value })}
          />
          
          <Input
            label="Budget (in INR)"
            name="budget"
            type="number"
            placeholder="Enter your budget"
            value={formData.budget}
            onChange={handleChange}
          />
          
          <TextArea
            label="Additional Requirements"
            name="message"
            placeholder="Tell us about any special requirements or preferences"
            value={formData.message}
            onChange={handleChange}
          />
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Options</h3>
            <p className="text-gray-600 text-sm mb-4">
              Choose your preferred payment method. A 20% advance payment is required to confirm your booking.
            </p>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="mr-2" defaultChecked />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="mr-2" />
                <span>Net Banking</span>
              </label>
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="mr-2" />
                <span>UPI</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  const renderSuccessStep = () => {
    return (
      <div className="text-center py-8">
        <div className="mb-6 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for booking with City Holidays. Your booking request has been received and is being processed.
          One of our travel experts will contact you within 24 hours to discuss the details.
        </p>
        <p className="font-medium mb-8">
          Reference ID: <span className="text-blue-600">CH{Math.floor(Math.random() * 1000000)}</span>
        </p>
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Journey</h1>
            <p className="text-xl text-blue-100">
              Fill out the booking form below and embark on your next adventure with us.
              We'll handle all the details so you can focus on creating memories.
            </p>
          </div>
        </Container>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,69.3C840,85,960,107,1080,106.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      <Container className="py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          {step < 4 && renderStepIndicator()}
          
          <form>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderSuccessStep()}
          </form>
        </div>
      </Container>
      
      <FloatingWhatsApp />
    </>
  );
};

export default BookingPage;