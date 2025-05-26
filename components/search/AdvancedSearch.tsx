'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SearchFilters {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: [number, number];
  packageType: string[];
  amenities: string[];
}

export default function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: [5000, 50000],
    packageType: [],
    amenities: []
  });

  const packageTypes = [
    'Golden Triangle',
    'Pilgrimage Tours',
    'Adventure Tours',
    'Honeymoon Packages',
    'Family Holidays',
    'Solo Travel'
  ];

  const amenities = [
    'Free WiFi',
    'Swimming Pool',
    'Spa & Wellness',
    'Restaurant',
    'Room Service',
    'Parking',
    'Gym/Fitness',
    'Business Center'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6">
        {/* Quick Search Bar */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.destination}
                onChange={(e) => setFilters({...filters, destination: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              />
            </div>
            
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                value={filters.travelers}
                onChange={(e) => setFilters({...filters, travelers: parseInt(e.target.value)})}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
          
          <Button variant="primary" className="flex items-center gap-2">
            <Search size={16} />
            Search
          </Button>
        </div>

        {/* Advanced Filters */}
        {isOpen && (
          <div className="border-t pt-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            
            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium mb-3">Budget Range (per person)</label>
              <div className="px-3">
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={filters.budget[1]}
                  onChange={(e) => setFilters({
                    ...filters, 
                    budget: [filters.budget[0], parseInt(e.target.value)]
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>₹{filters.budget[0].toLocaleString()}</span>
                  <span>₹{filters.budget[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Package Types */}
            <div>
              <label className="block text-sm font-medium mb-3">Package Types</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {packageTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={filters.packageType.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            packageType: [...filters.packageType, type]
                          });
                        } else {
                          setFilters({
                            ...filters,
                            packageType: filters.packageType.filter(t => t !== type)
                          });
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium mb-3">Preferred Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            amenities: [...filters.amenities, amenity]
                          });
                        } else {
                          setFilters({
                            ...filters,
                            amenities: filters.amenities.filter(a => a !== amenity)
                          });
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => {
                setFilters({
                  destination: '',
                  startDate: '',
                  endDate: '',
                  travelers: 1,
                  budget: [5000, 50000],
                  packageType: [],
                  amenities: []
                });
              }}>
                Clear All
              </Button>
              <Button variant="primary" className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
