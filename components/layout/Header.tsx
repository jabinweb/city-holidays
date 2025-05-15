'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Mail } from 'lucide-react';
import Container from '../ui/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Booking', path: '/booking' },
    { name: 'Enquiry', path: '/enquiry' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'py-4'
    }`}>
      <div className="bg-blue-950 text-white py-2 hidden md:block">
        <Container>
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <div className="flex items-center hover:text-blue-200">
                <Phone size={16} className="mr-2" />
                <span>+91 9528735541</span>
              </div>
              <div className="flex items-center hover:text-blue-200">
                <Mail size={16} className="mr-2" />
                <span>info@cityholidays.in</span>
              </div>
            </div>
            <div className="flex items-center hover:text-blue-200">
              <MapPin size={16} className="mr-2" />
              <span>Agra, India</span>
            </div>
          </div>
        </Container>
      </div>
      
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              <span className={isScrolled ? 'text-blue-600' : 'text-white'}>City</span>
              <span className="text-orange-500">Holidays</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`
                  font-medium transition-colors duration-200
                  ${isScrolled 
                    ? pathname === link.path 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                    : pathname === link.path 
                      ? 'text-orange-400' 
                      : 'text-white hover:text-orange-300'}
                `}
              >
                {link.name}
              </Link>
            ))}
            <Button variant={isScrolled ? "primary" : "secondary"} size="sm">
              Book Now
            </Button>
          </nav>
          
          <button
            className={`md:hidden focus:outline-none ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      <div 
        className={`
          md:hidden bg-white fixed top-[60px] left-0 right-0 min-h-screen transition-transform duration-300 transform z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`
                block py-2 px-4 font-medium text-lg rounded-lg transition-colors duration-200
                ${pathname === link.path 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="primary" fullWidth>
              Book Now
            </Button>
          </div>
          
          <div className="pt-6 border-t border-gray-200 space-y-2">
            <div className="flex items-center py-2">
              <Phone size={18} className="mr-2 text-blue-600" />
              <span>+91 1234567890</span>
            </div>
            <div className="flex items-center py-2">
              <Mail size={18} className="mr-2 text-blue-600" />
              <span>info@cityholidays.com</span>
            </div>
            <div className="flex items-center py-2">
              <MapPin size={18} className="mr-2 text-blue-600" />
              <span>Agra, India</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;