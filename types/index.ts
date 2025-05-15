export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  popular: boolean;
}

export interface BookingFormData {
  service: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  message: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}