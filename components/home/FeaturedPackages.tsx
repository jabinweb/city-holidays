'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Link from 'next/link';
import PackageCard from '../packages/PackageCard';
import { packages } from '@/data/packages';
import { Package } from '@/data/packages';

const FeaturedPackages: React.FC = () => {
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use static data instead of API call during build
    const getStaticFeaturedPackages = () => {
      // Filter popular packages or take first 6
      const popularPackages = packages.filter(pkg => pkg.popular);
      const featured = popularPackages.length >= 6 
        ? popularPackages.slice(0, 6)
        : packages.slice(0, 6);
      
      setFeaturedPackages(featured);
      setLoading(false);
    };

    // For client-side, try API first, then fallback to static
    const fetchFeaturedPackages = async () => {
      try {
        const response = await fetch('/api/packages?limit=6');
        if (response.ok) {
          const data = await response.json();
          setFeaturedPackages(data.slice(0, 6));
        } else {
          throw new Error('API failed');
        }
      } catch (error) {
        console.log('Using static packages data');
        getStaticFeaturedPackages();
      } finally {
        setLoading(false);
      }
    };

    // Check if we're in build time or client-side
    if (typeof window === 'undefined') {
      getStaticFeaturedPackages();
    } else {
      fetchFeaturedPackages();
    }
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-1/2" />
      </div>
      
      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Featured Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular&nbsp;
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked travel experiences designed to create 
            unforgettable memories. From cultural tours to adventure expeditions.
          </p>
        </div>
        
        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {featuredPackages.map((packageItem) => (
            <PackageCard key={packageItem.id} packageItem={packageItem} />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Explore More?
            </h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Discover our complete collection of travel packages and find 
              your perfect adventure. From weekend getaways to grand expeditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg px-8 py-4 rounded-full font-semibold"
                >
                  View All Packages
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold"
                >
                  Custom Package
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedPackages;
