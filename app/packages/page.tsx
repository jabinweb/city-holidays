'use client';

import { useState } from 'react';
import { Package, packages } from '@/data/packages';
import Container from '@/components/ui/Container';
import PackageCard from '@/components/packages/PackageCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    duration: 'all',
    location: 'all'
  });

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriceRange = filters.priceRange === 'all' ||
      (filters.priceRange === 'under20k' && pkg.price < 20000) ||
      (filters.priceRange === '20k-30k' && pkg.price >= 20000 && pkg.price <= 30000) ||
      (filters.priceRange === 'above30k' && pkg.price > 30000);

    const matchesDuration = filters.duration === 'all' ||
      (filters.duration === 'short' && parseInt(pkg.duration) <= 3) ||
      (filters.duration === 'medium' && parseInt(pkg.duration) > 3 && parseInt(pkg.duration) <= 5) ||
      (filters.duration === 'long' && parseInt(pkg.duration) > 5);

    const matchesLocation = filters.location === 'all' || filters.location === pkg.location;

    return matchesSearch && matchesPriceRange && matchesDuration && matchesLocation;
  });

  const locations = Array.from(new Set(packages.map(pkg => pkg.location)));

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tour Packages</h1>
            <p className="text-xl text-blue-100">
              Explore our carefully curated collection of travel packages across India.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search packages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="font-semibold flex items-center gap-2">
                <SlidersHorizontal size={20} />
                Filters
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="all">All Prices</option>
                  <option value="under20k">Under ₹20,000</option>
                  <option value="20k-30k">₹20,000 - ₹30,000</option>
                  <option value="above30k">Above ₹30,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.duration}
                  onChange={(e) => setFilters({...filters, duration: e.target.value})}
                >
                  <option value="all">All Durations</option>
                  <option value="short">1-3 Days</option>
                  <option value="medium">4-5 Days</option>
                  <option value="long">6+ Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  className="w-full border rounded-md p-2"
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

          {/* Packages Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} packageItem={pkg} />
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No packages found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
