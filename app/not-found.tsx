import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <Container className="pt-12 pb-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </div>
            <div className="text-xl text-gray-600 mt-2">Page Not Found</div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! We can't find that page
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track to plan your perfect trip!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                <Home size={20} />
                Go Home
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Search size={20} />
                Browse Packages
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Destinations
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/packages?type=golden-triangle"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-sm">GT</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Golden Triangle</div>
                  <div className="text-sm text-gray-500">Delhi • Agra • Jaipur</div>
                </div>
              </Link>
              
              <Link 
                href="/packages"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">HP</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Holiday Packages</div>
                  <div className="text-sm text-gray-500">All Destinations</div>
                </div>
              </Link>
              
              <Link 
                href="/services/taxi"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">TX</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Taxi Services</div>
                  <div className="text-sm text-gray-500">Car Rentals</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-blue-100 mb-4">
              Our travel experts are here to assist you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919528735541">
                <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-50">
                  Call: +91 9528735541
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
