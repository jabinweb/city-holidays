'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Package } from '@/data/packages';
import { packages as fallbackPackages } from '@/data/packages';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { Clock, MapPin, Train, Car } from 'lucide-react';
import Button from '@/components/ui/Button';
import PackageCard from '@/components/packages/PackageCard';
import ShareButton from '@/components/ui/ShareButton';

export default function PackagePage() {
  const { id } = useParams();
  const [packageItem, setPackageItem] = useState<Package | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPackage();
    }
  }, [id]);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/packages/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setPackageItem(data);
        fetchRelatedPackages(data.location);
      } else {
        // Fallback to static data
        console.log('Package not found in database, using fallback data');
        const fallbackPackage = fallbackPackages.find(pkg => pkg.id === id);
        if (fallbackPackage) {
          setPackageItem(fallbackPackage);
          setUsingFallback(true);
          fetchRelatedPackagesFromFallback(fallbackPackage.location);
        }
      }
    } catch (error) {
      console.error('Failed to fetch package:', error);
      // Fallback to static data
      const fallbackPackage = fallbackPackages.find(pkg => pkg.id === id);
      if (fallbackPackage) {
        setPackageItem(fallbackPackage);
        setUsingFallback(true);
        fetchRelatedPackagesFromFallback(fallbackPackage.location);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPackages = async (location: string) => {
    try {
      const response = await fetch(`/api/packages?location=${encodeURIComponent(location)}`);
      if (response.ok) {
        const data = await response.json();
        setRelatedPackages(data.filter((pkg: Package) => pkg.id !== id).slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch related packages:', error);
      fetchRelatedPackagesFromFallback(location);
    }
  };

  const fetchRelatedPackagesFromFallback = (location: string) => {
    const related = fallbackPackages
      .filter(pkg => pkg.id !== id && pkg.location.toLowerCase().includes(location.toLowerCase()))
      .slice(0, 3);
    setRelatedPackages(related);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
          <Container>
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-white/20 rounded w-3/4"></div>
              <div className="h-6 bg-white/20 rounded w-1/2"></div>
            </div>
          </Container>
        </div>
        <Container className="py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!packageItem) {
    return (
      <Container className="pt-40 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Package not found</h1>
          <p className="text-gray-600 mt-2">The package you're looking for doesn't exist.</p>
        </div>
      </Container>
    );
  }

  const isDayTrip = packageItem.type === 'day-trip';
  const isOvernight = packageItem.type === 'overnight';

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{packageItem.title}</h1>
          <div className="flex items-center gap-6 text-blue-100">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {packageItem.duration}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              {packageItem.location}
            </div>
            {packageItem.transportation && (
              <div className="flex items-center">
                {packageItem.transportation.includes('Train') ? (
                  <Train className="mr-2 h-5 w-5" />
                ) : (
                  <Car className="mr-2 h-5 w-5" />
                )}
                {packageItem.transportation}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={packageItem.imageUrl}
                alt={packageItem.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600">{packageItem.description}</p>
            </div>

            {packageItem.highlights && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {isDayTrip ? 'Tour Highlights' : 'What\'s Included'}
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {packageItem.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {packageItem.pickupPoints && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Pickup Points</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {packageItem.pickupPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {packageItem.itinerary && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {packageItem.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Day {day.day}: {day.title}
                      </h3>
                      <ul className="space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-600 flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ₹{packageItem.price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-500">
                  {isDayTrip ? ' / person' : ' / person'}
                </span>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                className="mb-4"
                onClick={() => window.location.href = `/booking?package=${packageItem.id}`}
              >
                Book Now
              </Button>

              <ShareButton
                title={packageItem.title}
                text={packageItem.description}
                url={typeof window !== 'undefined' ? window.location.href : ''}
                fullWidth
              />
            </div>

            <div className="bg-orange-50 rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our travel experts for any queries or customization requests.
              </p>
              <Button variant="secondary" fullWidth>
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">
              {isDayTrip ? 'More Day Trips' : isOvernight ? 'More Overnight Tours' : 'Similar Packages'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPackages.map(pkg => (
                <PackageCard key={pkg.id} packageItem={pkg} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
