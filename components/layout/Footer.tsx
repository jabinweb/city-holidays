'use client';

import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Link from 'next/link';

const Footer: React.FC = () => {
  // Use static data instead of API calls to avoid authentication issues
  const footerData = {
    companyInfo: {
      name: 'City Holidays',
      description: 'Professional travel services in Agra. Golden Triangle tours, hotel bookings, flight reservations, taxi services. Trusted by 10,000+ travelers.',
      phone: '+91 9528735541',
      email: 'info@cityholidays.in',
      address: 'Agra, Uttar Pradesh, India'
    },
    services: [
      { name: 'Golden Triangle Tours', path: '/packages?type=golden-triangle' },
      { name: 'Holiday Packages', path: '/packages' },
      { name: 'Flight Bookings', path: '/services#flights' },
      { name: 'Railway Reservations', path: '/services#railways' },
      { name: 'Bus Bookings', path: '/services#buses' },
      { name: 'Taxi Services', path: '/services/taxi' }
    ],
    quickLinks: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Cancellation Policy', path: '/cancellation' },
      { name: 'FAQ', path: '/faq' }
    ],
    destinations: [
      { name: 'Delhi Tours', path: '/packages?destination=delhi' },
      { name: 'Agra Tours', path: '/packages?destination=agra' },
      { name: 'Jaipur Tours', path: '/packages?destination=jaipur' },
      { name: 'Rajasthan Tours', path: '/packages?destination=rajasthan' },
      { name: 'Same Day Tours', path: '/packages?type=day-trip' },
      { name: 'Overnight Tours', path: '/packages?type=overnight' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CH</span>
                </div>
                <div className="font-bold text-xl">
                  <span className="text-white">City</span>
                  <span className="text-orange-500">Holidays</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {footerData.companyInfo.description}
              </p>
              <div className="space-y-3">
                <a href={`tel:${footerData.companyInfo.phone}`} className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Phone size={16} className="mr-3 text-blue-400" />
                  {footerData.companyInfo.phone}
                </a>
                <a href={`mailto:${footerData.companyInfo.email}`} className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Mail size={16} className="mr-3 text-blue-400" />
                  {footerData.companyInfo.email}
                </a>
                <div className="flex items-start text-gray-300">
                  <MapPin size={16} className="mr-3 text-blue-400 mt-1 flex-shrink-0" />
                  {footerData.companyInfo.address}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Our Services</h3>
              <ul className="space-y-3">
                {footerData.services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.path} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Popular Destinations</h3>
              <ul className="space-y-3">
                {footerData.destinations.map((destination, index) => (
                  <li key={index}>
                    <Link href={destination.path} className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {destination.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-8">
            <div className="text-center max-w-md mx-auto">
              <h3 className="font-semibold text-lg mb-2 text-white">Stay Updated</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Get the latest travel deals and destination updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} City Holidays. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;