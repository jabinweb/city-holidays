import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Card, { CardContent, CardImage, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    description: 'Experience the perfect beach holiday with pristine shores and vibrant nightlife.',
    price: 19999,
    duration: '4 Days / 3 Nights',
    imageUrl: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true
  },
  {
    id: '2',
    title: 'Kerala Backwaters',
    description: `Explore the serene backwaters and lush greenery of God's own country.`,
    price: 22999,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.pexels.com/photos/695761/pexels-photo-695761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }
];

function PackageCard({ packageItem }: { packageItem: Package }) {
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
          <span>India</span>
        </div>
        
        <CardDescription>{packageItem.description}</CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t">
        <Link href="/booking" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <Link href="/booking">
          <Button variant="primary" size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function PopularPackages() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-blue-600">Packages</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after holiday packages crafted to provide you with unforgettable experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((packageItem) => (
            <PackageCard key={packageItem.id} packageItem={packageItem} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}