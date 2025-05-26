import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, Train, Car, Users, Star } from 'lucide-react';
import { Package } from '@/data/packages';
import Card, { CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PackageCard({ packageItem }: { packageItem: Package }) {
  const isDayTrip = packageItem.type === 'day-trip';
  const isOvernight = packageItem.type === 'overnight';
  const isGoldenTriangle = packageItem.location.includes('Delhi') && 
                          packageItem.location.includes('Agra') && 
                          packageItem.location.includes('Jaipur');
  
  // Split locations for better display
  const locations = packageItem.location.split(',').map(loc => loc.trim());
  const displayLocation = locations.length > 2 
    ? `${locations.slice(0, 2).join(', ')} +${locations.length - 2}`
    : packageItem.location;
  
  return (
    <Card hoverable className="h-full flex flex-col group">
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <Image 
          src={packageItem.imageUrl} 
          alt={packageItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {packageItem.popular && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              Popular
            </div>
          )}
          {isDayTrip && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              Same Day
            </div>
          )}
          {isOvernight && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              Overnight
            </div>
          )}
          {isGoldenTriangle && !isDayTrip && !isOvernight && (
            <div className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              Golden Triangle
            </div>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-lg">
          ₹{(packageItem.price / 1000).toFixed(0)}K
        </div>

        {/* Rating (mock data for now) */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>4.5</span>
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1">
          <div style={{ minHeight: '3.5rem' }}>
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2 leading-tight">
              {packageItem.title}
            </CardTitle>
          </div>
          
          {/* Compact Info Row */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{packageItem.duration}</span>
            </div>
            {packageItem.transportation && (
              <div className="flex items-center gap-1">
                {packageItem.transportation.includes('Train') ? (
                  <Train className="h-3 w-3" />
                ) : (
                  <Car className="h-3 w-3" />
                )}
                <span className="truncate max-w-[80px]">{packageItem.transportation}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-1" title={packageItem.location}>
              {displayLocation}
            </span>
          </div>
          
          {/* Description */}
          <CardDescription className="text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
            {packageItem.description}
          </CardDescription>

          {/* Key Highlights - Compact */}
          {packageItem.highlights && packageItem.highlights.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {packageItem.highlights.slice(0, 2).map((highlight, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium truncate max-w-[140px]"
                    title={highlight}
                  >
                    {highlight.length > 20 ? `${highlight.substring(0, 20)}...` : highlight}
                  </span>
                ))}
              </div>
              {packageItem.highlights.length > 2 && (
                <span className="text-xs text-gray-500 mt-1 block">
                  +{packageItem.highlights.length - 2} more highlights
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price and Action Row */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xl font-bold text-gray-900">
                ₹{packageItem.price.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
            <Link href={`/booking?package=${packageItem.id}`}>
              <Button variant="primary" size="sm" className="text-sm px-4">
                Book Now
              </Button>
            </Link>
          </div>
          
          <Link 
            href={`/packages/${packageItem.id}`} 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center text-sm py-2 hover:bg-blue-50 rounded-md transition-colors"
          >
            View Details & Itinerary
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
