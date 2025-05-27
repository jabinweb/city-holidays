'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/data/packages';
import { packages as fallbackPackages } from '@/data/packages';
import Container from '@/components/ui/Container';
import PackageCard from '@/components/packages/PackageCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    duration: 'all',
    location: 'all',
    type: 'all'
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = '/api/packages';
      console.log('Fetching from URL:', apiUrl);
      console.log('Current pathname:', window.location.pathname);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
        credentials: 'omit' // Don't send authentication cookies
      });
      
      console.log('Response status:', response.status);
      console.log('Response URL:', response.url);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Check if we're being redirected to auth page
      if (response.url.includes('/auth/signin')) {
        console.error('API route is being redirected to sign-in page');
        throw new Error('API authentication error - route is protected');
      }
      
      // Check response status first
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      console.log('Content-Type header:', contentType);
      
      if (!contentType?.includes('application/json')) {
        console.error('Invalid content type received:', contentType);
        // Log the response body for debugging
        const text = await response.text();
        console.error('Response body sample:', text.substring(0, 200));
        throw new Error('Invalid response format - expected JSON');
      }
      
      const data = await response.json();
      console.log('API data received successfully, count:', data.length);
      
      // Handle API error responses
      if (data.error) {
        console.error('API returned error:', data.error);
        throw new Error(data.error);
      }
      
      if (data && Array.isArray(data)) {
        console.log('Setting packages:', data.length);
        setPackages(data);
        if (data.length === 0) {
          setError('No packages available at the moment');
        }
      } else {
        console.error('Invalid data format:', typeof data, data);
        throw new Error('Invalid data format received from server');
      }
      
    } catch (error) {
      console.error('Error fetching packages:', error);
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error instanceof Error) {
        if (error.message.includes('authentication error')) {
          setError('Service configuration error. Please contact support.');
        } else if (error.message.includes('Server returned')) {
          setError('Server error. Please try again later.');
        } else {
          setError(error.message || 'Unable to load packages. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriceRange = filters.priceRange === 'all' ||
      (filters.priceRange === 'under10k' && pkg.price < 10000) ||
      (filters.priceRange === '10k-20k' && pkg.price >= 10000 && pkg.price <= 20000) ||
      (filters.priceRange === '20k-30k' && pkg.price >= 20000 && pkg.price <= 30000) ||
      (filters.priceRange === 'above30k' && pkg.price > 30000);

    const matchesDuration = filters.duration === 'all' ||
      (filters.duration === 'same-day' && pkg.duration === 'Same Day') ||
      (filters.duration === 'short' && parseInt(pkg.duration) <= 3 && pkg.duration !== 'Same Day') ||
      (filters.duration === 'medium' && parseInt(pkg.duration) > 3 && parseInt(pkg.duration) <= 5) ||
      (filters.duration === 'long' && parseInt(pkg.duration) > 5);

    const matchesLocation = filters.location === 'all' || pkg.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesType = filters.type === 'all' || 
      (filters.type === 'day-trips' && pkg.type === 'day-trip') ||
      (filters.type === 'overnight' && pkg.type === 'overnight') ||
      (filters.type === 'golden-triangle' && pkg.location.includes('Delhi') && pkg.location.includes('Agra') && pkg.location.includes('Jaipur')) ||
      (filters.type === 'packages' && (!pkg.type || pkg.type === 'package'));

    return matchesSearch && matchesPriceRange && matchesDuration && matchesLocation && matchesType;
  });

  const locations = Array.from(new Set(packages.map(pkg => pkg.location)));

  if (loading) {
    return (
      <>
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tour Packages & Day Trips</h1>
              <p className="text-xl text-blue-100">
                Explore our carefully curated collection of travel packages, overnight tours, and same-day trips across India.
              </p>
            </div>
          </Container>
        </div>
        <Container className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </Container>
      </>
    );
  }

  // Handle error state
  if (error && packages.length === 0) {
    return (
      <>
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tour Packages & Day Trips</h1>
              <p className="text-xl text-blue-100">
                Explore our carefully curated collection of travel packages, overnight tours, and same-day trips across India.
              </p>
            </div>
          </Container>
        </div>
        <Container className="py-12">
          <div className="text-center py-16">
            <div className="text-red-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{error}</h3>
            <p className="text-gray-600 mb-6">We're experiencing technical difficulties. Please try again in a few moments.</p>
            <button
              onClick={fetchPackages}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tour Packages & Day Trips</h1>
            <p className="text-xl text-blue-100">
              Explore our carefully curated collection of travel packages, overnight tours, and same-day trips across India.
            </p>
            {error && packages.length > 0 && (
              <div className="mt-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-100 px-4 py-2 rounded-lg text-sm">
                Some packages may not be available due to technical issues.
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="xl:w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-4 lg:space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search packages..."
                  className="w-full pl-10 pr-4 py-2 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 lg:top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 lg:space-y-6">
                <div className="font-semibold flex items-center gap-2 text-gray-900">
                  <SlidersHorizontal size={20} />
                  Filters
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Package Type</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 lg:p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                      <option value="all">All Types</option>
                      <option value="golden-triangle">Golden Triangle Tours</option>
                      <option value="day-trips">Same Day Tours</option>
                      <option value="overnight">Overnight Tours</option>
                      <option value="packages">Multi-Day Packages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Price Range</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 lg:p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    >
                      <option value="all">All Prices</option>
                      <option value="under10k">Under ₹10,000</option>
                      <option value="10k-20k">₹10,000 - ₹20,000</option>
                      <option value="20k-30k">₹20,000 - ₹30,000</option>
                      <option value="above30k">Above ₹30,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Duration</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 lg:p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.duration}
                      onChange={(e) => setFilters({...filters, duration: e.target.value})}
                    >
                      <option value="all">All Durations</option>
                      <option value="same-day">Same Day</option>
                      <option value="short">1-3 Days</option>
                      <option value="medium">4-5 Days</option>
                      <option value="long">6+ Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 lg:p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <option value="all">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="flex-1 min-w-0">
            {/* Quick Filter Tabs */}
            <div className="flex gap-2 lg:gap-4 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setFilters({...filters, type: 'all'})}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors ${
                  filters.type === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Tours
              </button>
              <button
                onClick={() => setFilters({...filters, type: 'golden-triangle'})}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors ${
                  filters.type === 'golden-triangle' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Golden Triangle
              </button>
              <button
                onClick={() => setFilters({...filters, type: 'day-trips'})}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors ${
                  filters.type === 'day-trips' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Same Day Tours
              </button>
              <button
                onClick={() => setFilters({...filters, type: 'overnight'})}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors ${
                  filters.type === 'overnight' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overnight Tours
              </button>
              <button
                onClick={() => setFilters({...filters, type: 'packages'})}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0 transition-colors ${
                  filters.type === 'packages' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Multi-Day Packages
              </button>
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredPackages.length} of {packages.length} packages
                {error && packages.length > 0 && <span className="text-yellow-600"> (some packages unavailable)</span>}
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredPackages.map(pkg => (
                <div key={pkg.id} className="h-full">
                  <PackageCard packageItem={pkg} />
                </div>
              ))}
            </div>

            {filteredPackages.length === 0 && packages.length > 0 && (
              <div className="text-center py-12 lg:py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
