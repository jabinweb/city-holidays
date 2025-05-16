import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/data/cars';
import { Users, Gauge } from 'lucide-react';
import Button from '../ui/Button';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={car.imageUrl}
          alt={car.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {car.type}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <Users size={18} className="mr-1" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center">
            <Gauge size={18} className="mr-1" />
            <span>Min {car.minKm}km</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-blue-600">₹{car.pricePerKm}</span>
              <span className="text-gray-600">/km</span>
            </div>
          </div>
          
          <Link 
            href={`/booking?service=taxi&id=${car.id}`}
            className="w-full"
          >
            <Button variant="primary" fullWidth>
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
