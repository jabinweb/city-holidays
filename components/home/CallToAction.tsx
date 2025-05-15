import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="relative text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Book your dream vacation with City Holidays today and get exclusive offers. Our travel experts will help you 
            plan the perfect trip based on your preferences and budget.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-semibold"
              >
                Book Your Trip
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
          
          <div className="mt-8">
            <p className="text-blue-100">
              Have questions? Call us at <span className="font-semibold">+91 9528735541</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;