'use client'

import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    location: 'Delhi',
    content: 'City Holidays made our family trip to Rajasthan absolutely incredible. The attention to detail, from hotel bookings to sightseeing tours, was exceptional. Highly recommended!',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Priya Patel',
    location: 'Mumbai',
    content: 'We booked our flight and hotel through City Holidays and got a fantastic deal. The process was smooth, and the team was very responsive to our queries.',
    rating: 4,
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Anil Kumar',
    location: 'Bangalore',
    content: 'The taxi service arranged by City Holidays for our Agra tour was excellent. The driver was knowledgeable and professional. Will definitely use their services again.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Sunita Reddy',
    location: 'Hyderabad',
    content: 'Our bus booking through City Holidays was seamless. They secured great seats for us, and the reminder service was really helpful. Great service overall!',
    rating: 4,
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.imageUrl} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-gray-600 flex-grow">{testimonial.content}</p>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = testimonials.length - slidesPerView;
  
  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
    setAutoplay(false);
  };
  
  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
    setAutoplay(false);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, maxIndex]);

  return (
    <section className="py-16 bg-blue-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what travelers who have used our services have to say about their experiences.
          </p>
        </div>
        
        <div className="relative px-4 md:px-8">
          <button 
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`absolute -left-4 md:-left-8 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 transition-all
              ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'}`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${(activeIndex * 100) / slidesPerView}%)`,
                gap: '1.5rem',
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="flex-none w-full pb-2 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextSlide}
            disabled={activeIndex === maxIndex}
            className={`absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 transition-all
              ${activeIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'}`}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setAutoplay(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === i 
                  ? 'bg-blue-600 w-4' 
                  : 'bg-gray-300 hover:bg-blue-400'
              }`}
              aria-label={`Go to testimonial set ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;