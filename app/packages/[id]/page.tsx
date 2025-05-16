'use client';

import { useParams } from 'next/navigation';
import { packages } from '@/data/packages';
import Container from '@/components/ui/Container';
import Image from 'next/image';
import { Clock, MapPin, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import PackageCard from '@/components/packages/PackageCard';
import ShareButton from '@/components/ui/ShareButton';

export default function PackagePage() {
  const { id } = useParams();
  const packageItem = packages.find(p => p.id === id);
  const relatedPackages = packages
    .filter(p => p.id !== id)
    .slice(0, 3);

  if (!packageItem) {
    return (
      <Container className="pt-40 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Package not found</h1>
        </div>
      </Container>
    );
  }

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

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">What&apos;s Included</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Hotel accommodation</li>
                <li>Daily breakfast and dinner</li>
                <li>All transfers and sightseeing</li>
                <li>Professional tour guide</li>
                <li>All applicable taxes</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ₹{packageItem.price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-500"> / person</span>
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

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Similar Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPackages.map(pkg => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
