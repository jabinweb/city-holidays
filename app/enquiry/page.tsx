'use client'
import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Phone, Mail, MapPin } from 'lucide-react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

interface FormErrors {
  [key: string]: string;
}

const EnquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const serviceOptions = [
    { value: 'holiday', label: 'Holiday Package' },
    { value: 'flight', label: 'Flight Booking' },
    { value: 'railway', label: 'Railway Reservation' },
    { value: 'bus', label: 'Bus Booking' },
    { value: 'taxi', label: 'Taxi Service' },
    { value: 'other', label: 'Other' }
  ];
  
  const subjectOptions = [
    { value: 'general', label: 'General Enquiry' },
    { value: 'booking', label: 'Booking Information' },
    { value: 'cancellation', label: 'Cancellation Policy' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'complaint', label: 'Complaint' }
  ];
  
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </div>

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Enquiry Type"
            name="subject"
            options={subjectOptions}
            value={formData.subject}
            onChange={(value) => setFormData({ ...formData, subject: value })}
            required
          />
          
          <Select
            label="Service Interested In"
            name="service"
            options={serviceOptions}
            value={formData.service}
            onChange={(value) => setFormData({ ...formData, service: value })}
            required
          />
        </div>

        <TextArea
          label="Your Message"
          name="message"
          placeholder="Please provide details about your enquiry"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
        />
        
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the processing of my personal data as per the privacy policy.
          </label>
        </div>
        
        <div className="mt-6">
          <Button 
            type="submit" 
            fullWidth 
            disabled={isLoading}
            className="relative"
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Submit Enquiry</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </span>
              </>
            ) : (
              'Submit Enquiry'
            )}
          </Button>
        </div>
      </form>
    );
  };
  
  const renderSuccess = () => {
    return (
      <div className="text-center py-8">
        <div className="mb-6 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Enquiry Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your enquiry. We have received your message and a member of our team will contact you shortly.
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
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10" />
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100">
              Have questions or need more information? Fill out the form below, and we'll get back to you as soon as possible.
            </p>
          </div>
        </Container>

      </div>
      
      <Container className="py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">
                Send us an Enquiry
              </h2>
              
              {submitted ? renderSuccess() : renderForm()}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <Phone size={20} className="mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">+91 1234567890</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail size={20} className="mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">info@cityholidays.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin size={20} className="mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">
                      123 Travel Street, Tourist Area, Agra, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Need Quick Assistance?</h3>
              <p className="text-gray-600 mb-4">
                Our team is ready to assist you with any queries or booking requirements.
              </p>
              <div className="flex justify-between">
                <a 
                  href="tel:+911234567890" 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Phone size={16} className="mr-1" />
                  <span>Call Now</span>
                </a>
                <a 
                  href="https://wa.me/911234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      <FloatingWhatsApp />
    </>
  );
};

export default EnquiryPage;