import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Package } from '@/data/packages';
import Card, { CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PackageCard({ packageItem }: { packageItem: Package }) {
  return (
    <Card hoverable className="h-full">
      <div className="relative aspect-video">
        <Image 
          src={packageItem.imageUrl} 
          alt={packageItem.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {packageItem.popular && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
          ₹{packageItem.price.toLocaleString('en-IN')}
        </div>
      </div>
      
      <CardContent>
        <CardTitle className="text-xl">{packageItem.title}</CardTitle>
        
        <div className="flex items-center mt-2 mb-3 text-gray-500 text-sm">
          <Clock className="mr-1 h-4 w-4" />
          <span>{packageItem.duration}</span>
          <span className="mx-2">•</span>
          <MapPin className="mr-1 h-4 w-4" />
          <span>{packageItem.location}</span>
        </div>
        
        <CardDescription>{packageItem.description}</CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t">
        <Link href={`/packages/${packageItem.id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <Link href={`/booking?package=${packageItem.id}`}>
          <Button variant="primary" size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
