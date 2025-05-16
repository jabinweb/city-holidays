import { packages } from '@/data/packages';
import { cars } from '@/data/cars';

export type BookingType = 'package' | 'taxi';

export interface TaxiInfo {
  category: string;
  seats: number;
  minKm: number;
}

export interface PackageInfo {
  duration: string;
  location: string;
}

export interface BookingDetails {
  type: 'package' | 'taxi';
  id: string;
  title: string;
  description?: string;
  price: number;
  features?: string[];
  additionalInfo?: TaxiInfo | PackageInfo;
}

export function isTaxiInfo(info: TaxiInfo | PackageInfo): info is TaxiInfo {
  return 'category' in info && 'seats' in info && 'minKm' in info;
}

export function isPackageInfo(info: TaxiInfo | PackageInfo): info is PackageInfo {
  return 'duration' in info && 'location' in info;
}

export function getBookingDetails(type: string | null, id: string | null): BookingDetails | null {
  console.log('Fetching booking details:', { type, id }); // Debug log

  if (!type || !id) {
    console.log('Missing type or id');
    return null;
  }

  switch (type) {
    case 'package': {
      const item = packages.find(p => p.id === id);
      console.log('Found package:', item); // Debug log
      if (!item) return null;
      
      return {
        type: 'package',
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        additionalInfo: {
          duration: item.duration,
          location: item.location
        } as PackageInfo
      };
    }
    
    case 'taxi': {
      const item = cars.find(c => c.id === id);
      console.log('Found taxi:', item); // Debug log
      if (!item) return null;
      
      return {
        type: 'taxi',
        id: item.id,
        title: item.name,
        price: item.pricePerKm,
        features: item.features,
        additionalInfo: {
          category: item.category,
          seats: item.seats,
          minKm: item.minKm
        }
      };
    }
    
    default:
      console.log('Unknown service type:', type); // Debug log
      return null;
  }
}
