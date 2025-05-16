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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % (testimonials.length - 2));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

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
        
        <div className="relative">
          {/* Mobile scroll view */}
          <div className="block lg:hidden -mx-4">
            <div className="overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4">
              <div className="flex gap-6">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="flex-none w-[85%] snap-center"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop slider */}
          <div className="hidden lg:block relative">
            {mounted && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </button>

                <div className="overflow-hidden mx-4">
                  <div 
                    className="flex gap-6 transition-transform duration-300"
                    style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
                  >
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="flex-none w-1/3">
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;