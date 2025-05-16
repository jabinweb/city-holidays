import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-950 to-blue-800 text-white pt-24 md:pt-40 pb-16 md:pb-24">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center lg:text-left space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Experience <span className="text-orange-400">Incredible</span> India with Us
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl lg:max-w-xl mx-auto lg:mx-0">
            Your trusted travel partner in India. We offer comprehensive travel services including holiday packages, 
            flight bookings, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/booking">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Book Your Trip
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-semibold backdrop-blur-sm"
              >
                Explore Services
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 mt-8 md:mt-12">
            {[
              { value: '200+', label: 'Destinations' },
              { value: '10k+', label: 'Happy Travelers' },
              { value: '5★', label: 'Rated Service' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-white/20 transition-colors">
                <div className="font-bold text-2xl md:text-3xl bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent">
                  {value}
                </div>
                <div className="text-sm text-blue-100">{label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="relative bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20">
            <h3 className="text-white font-semibold text-lg md:text-xl mb-6">Quick Enquiry</h3>
            <form className="space-y-4">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-blue-200 backdrop-blur-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-blue-200 backdrop-blur-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-blue-200 backdrop-blur-sm"
                  />
                </div>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white backdrop-blur-sm">
                  <option value="" className="bg-blue-900">Select Service</option>
                  {['Holiday Packages', 'Railway Reservations', 'Flight Bookings', 'Bus Bookings', 'Taxi Services']
                    .map(service => (
                      <option key={service} value={service.toLowerCase()} className="bg-blue-900">
                        {service}
                      </option>
                    ))
                  }
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-blue-200 backdrop-blur-sm"
                ></textarea>
                <Button variant="secondary" fullWidth size="lg" className="mt-2">
                  Send Enquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Fixed CTA for mobile */}
      <div className="fixed bottom-0 z-20    left-0 right-0 p-4 bg-gradient-to-t from-blue-950 to-blue-900/95 border-t border-white/10 md:hidden">
        <Button variant="secondary" fullWidth size="lg">
          Make an Enquiry
        </Button>
      </div>
    </div>
  );
};

export default Hero;