'use client';

import React, { useState, useEffect } from 'react';
import { packages } from '@/data/packages';
import Container from '../ui/Container';
import PackageCard from '../packages/PackageCard';
import Button from '../ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Package } from '@/data/packages';

const PopularPackages: React.FC = () => {
  const [popularPackages, setPopularPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularPackages();
  }, []);

  const fetchPopularPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch packages with mixed categories
      const response = await fetch('/api/packages?limit=20', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          // Create a mixed selection of packages
          const mixedPackages = getMixedPackages(data);
          setPopularPackages(mixedPackages);
        } else {
          // Fallback to static data if no packages in database
          console.log('No packages found in database, using fallback data');
          const fallbackMixed = getMixedPackages(packages);
          setPopularPackages(fallbackMixed);
        }
      } else {
        console.error('Failed to fetch packages, using fallback data');
        const fallbackMixed = getMixedPackages(packages);
        setPopularPackages(fallbackMixed);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to load packages');
      // Use fallback data on error
      const fallbackMixed = getMixedPackages(packages);
      setPopularPackages(fallbackMixed);
    } finally {
      setLoading(false);
    }
  };

  const getMixedPackages = (allPackages: Package[]) => {
    // Categorize packages
    const goldenTriangle = allPackages.filter(pkg => 
      pkg.location.includes('Delhi') && pkg.location.includes('Agra') && pkg.location.includes('Jaipur')
    );
    const dayTrips = allPackages.filter(pkg => pkg.type === 'day-trip');
    const overnightTours = allPackages.filter(pkg => pkg.type === 'overnight');
    const popularMarked = allPackages.filter(pkg => pkg.popular);
    const otherPackages = allPackages.filter(pkg => 
      !pkg.popular && pkg.type !== 'day-trip' && pkg.type !== 'overnight' &&
      !(pkg.location.includes('Delhi') && pkg.location.includes('Agra') && pkg.location.includes('Jaipur'))
    );

    const mixed: Package[] = [];
    
    // Add 1-2 Golden Triangle packages
    if (goldenTriangle.length > 0) {
      mixed.push(...goldenTriangle.slice(0, 2));
    }
    
    // Add 1-2 day trips
    if (dayTrips.length > 0) {
      mixed.push(...dayTrips.slice(0, 2));
    }
    
    // Add 1 overnight tour
    if (overnightTours.length > 0) {
      mixed.push(overnightTours[0]);
    }
    
    // Add popular packages to fill remaining slots
    if (popularMarked.length > 0) {
      const remainingSlots = 6 - mixed.length;
      const popularToAdd = popularMarked.filter(pkg => !mixed.find(m => m.id === pkg.id));
      mixed.push(...popularToAdd.slice(0, remainingSlots));
    }
    
    // If still need more, add other packages
    if (mixed.length < 6 && otherPackages.length > 0) {
      const remainingSlots = 6 - mixed.length;
      const othersToAdd = otherPackages.filter(pkg => !mixed.find(m => m.id === pkg.id));
      mixed.push(...othersToAdd.slice(0, remainingSlots));
    }
    
    // Shuffle the array to make it more diverse
    return shuffleArray(mixed).slice(0, 6);
  };

  const shuffleArray = (array: Package[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-blue-600">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved travel packages, curated for
              unforgettable experiences across India's beautiful destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (popularPackages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-blue-600">Packages</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of travel packages including Golden Triangle tours,
            same-day trips, overnight experiences, and multi-day adventures across India.
          </p>
          {error && (
            <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg text-sm max-w-md mx-auto">
              Using offline data. Some features may be limited.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPackages.map(pkg => (
            <div key={pkg.id} className="h-full">
              <PackageCard packageItem={pkg} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/packages">
            <Button variant="primary" size="lg">
              View All Packages
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PopularPackages;