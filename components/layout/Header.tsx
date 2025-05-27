'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Mail, User, LogOut, ChevronDown } from 'lucide-react';
import Container from '../ui/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Button from '../ui/Button';
import BookNowButton from '../ui/BookNowButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
    setShowServicesDropdown(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
      setShowServicesDropdown(false);
    };
    
    if (showUserMenu || showServicesDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu, showServicesDropdown]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Services', path: '/services' },
        { name: 'Golden Triangle Tours', path: '/packages?type=golden-triangle' },
        { name: 'Holiday Packages', path: '/packages' },
        { name: 'Flight Bookings', path: '/services#flights' },
        { name: 'Railway Reservations', path: '/services#railways' },
        { name: 'Bus Bookings', path: '/services#buses' },
        { name: 'Taxi Services', path: '/services/taxi' },
      ]
    },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback: redirect manually if signOut fails
      window.location.href = '/';
    }
  };

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'py-4'
    }`}>
      {/* Top Bar */}
      <div className="bg-blue-950 text-white py-2 hidden lg:block">
        <Container>
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <a href="tel:+919528735541" className="flex items-center hover:text-blue-200 transition-colors">
                <Phone size={16} className="mr-2" />
                <span>+91 9528735541</span>
              </a>
              <a href="mailto:info@cityholidays.in" className="flex items-center hover:text-blue-200 transition-colors">
                <Mail size={16} className="mr-2" />
                <span>info@cityholidays.in</span>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center hover:text-blue-200">
                <MapPin size={16} className="mr-2" />
                <span>Agra, India</span>
              </div>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
      
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl md:text-2xl flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <div>
                <span className={isScrolled ? 'text-blue-600' : 'text-white'}>City</span>
                <span className="text-orange-500">Holidays</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowServicesDropdown(!showServicesDropdown);
                      }}
                      className={`
                        font-medium transition-colors duration-200 flex items-center gap-1
                        ${isScrolled 
                          ? pathname.startsWith('/services') || pathname.includes('packages')
                            ? 'text-blue-600' 
                            : 'text-gray-700 hover:text-blue-600'
                          : pathname.startsWith('/services') || pathname.includes('packages')
                            ? 'text-orange-400' 
                            : 'text-white hover:text-orange-300'}
                      `}
                    >
                      {link.name}
                      <ChevronDown size={16} className={`transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showServicesDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
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
                )}
              </div>
            ))}
            
            {/* Authentication Section */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="font-medium hidden md:block">{session.user?.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Bookings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin">
                  <Button 
                    variant={isScrolled ? "outline" : "ghost"} 
                    size="sm"
                    className={isScrolled ? "border-gray-300 hover:border-blue-500" : "text-white border-white hover:bg-white/10"}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm" className="shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* <BookNowButton variant={isScrolled ? "primary" : "secondary"} size="sm" /> */}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden focus:outline-none p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      <div 
        className={`
          lg:hidden bg-white fixed top-[80px] left-0 right-0 min-h-screen transition-transform duration-300 transform z-40 shadow-xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="px-4 py-6 space-y-2 max-h-screen overflow-y-auto">
          {/* Mobile Contact Info */}
          <div className="pb-4 border-b border-gray-200 space-y-2 lg:hidden">
            <a href="tel:+919528735541" className="flex items-center py-2 text-gray-700">
              <Phone size={18} className="mr-3 text-blue-600" />
              <span>+91 9528735541</span>
            </a>
            <a href="mailto:info@cityholidays.in" className="flex items-center py-2 text-gray-700">
              <Mail size={18} className="mr-3 text-blue-600" />
              <span>info@cityholidays.in</span>
            </a>
            <div className="flex items-center py-2 text-gray-700">
              <MapPin size={18} className="mr-3 text-blue-600" />
              <span>Agra, India</span>
            </div>
          </div>

          {/* Navigation Links */}
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                    className={`
                      w-full flex items-center justify-between py-3 px-4 font-medium text-lg rounded-lg transition-colors duration-200
                      ${pathname.startsWith('/services') || pathname.includes('packages')
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {link.name}
                    <ChevronDown size={18} className={`transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showServicesDropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`
                    block py-3 px-4 font-medium text-lg rounded-lg transition-colors duration-200
                    ${pathname === link.path 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          {/* Authentication Section */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            {session ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{session.user?.name}</p>
                    <p className="text-sm text-gray-500">{session.user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="block py-2 px-4 font-medium text-lg rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/bookings"
                  className="block py-2 px-4 font-medium text-lg rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  My Bookings
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block py-2 px-4 font-medium text-lg rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 px-4 font-medium text-lg rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" fullWidth className="mb-2 text-lg py-3">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" fullWidth className="mb-4 text-lg py-3">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            
            {/* <BookNowButton variant="primary" fullWidth /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;