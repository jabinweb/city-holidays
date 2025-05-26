'use client';

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Footer() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'City Holidays',
    email: 'info@cityholidays.in',
    phone: '+91 9528735541',
    address: 'Agra, Uttar Pradesh, India'
  });

  useEffect(() => {
    // Fetch company info from settings
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.businessSettings) {
          setCompanyInfo({
            name: data.businessSettings.companyName,
            email: data.businessSettings.email,
            phone: data.businessSettings.phone,
            address: data.businessSettings.address
          });
        }
      })
      .catch(error => {
        console.error('Failed to fetch company info:', error);
        // Keep default values
      });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{companyInfo.name}</h3>
            <p className="text-gray-300 mb-4">
              Your trusted travel partner for unforgettable journeys across India. 
              We specialize in Golden Triangle tours, customized packages, and comprehensive travel services.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-blue-400 transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-blue-400 transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/packages" className="text-gray-300 hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/enquiry" className="text-gray-300 hover:text-white transition-colors">Make Enquiry</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {companyInfo.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}