export type VehicleCategory = 'Sedan' | 'SUV' | 'Tempo Traveller';
export type VehicleType = 'Sedan' | 'SUV' | 'Premium';

export interface Car {
  id: string;
  name: string;
  type: VehicleType;
  seats: number;
  pricePerKm: number;
  minKm: number;
  imageUrl: string;
  features: string[];
  category: VehicleCategory;
}

export const cars: Car[] = [
  {
    id: 'dzire',
    name: 'Dzire',
    type: 'Sedan',
    category: 'Sedan',
    seats: 4,
    pricePerKm: 12,
    minKm: 80,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    features: ['AC', 'Music System', 'Comfortable Seating', 'First Aid Kit']
  },
  {
    id: 'etios',
    name: 'Etios',
    type: 'Sedan',
    category: 'Sedan',
    seats: 4,
    pricePerKm: 13,
    minKm: 80,
    imageUrl: 'https://global.toyota/images/sc/en/130169/130170/0918_01_L_1.jpg',
    features: ['AC', 'Music System', 'Comfortable Seating', 'First Aid Kit']
  },
  {
    id: 'innova',
    name: 'Innova Crysta',
    type: 'SUV',
    category: 'SUV',
    seats: 7,
    pricePerKm: 16,
    minKm: 80,
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
    features: ['AC', 'Music System', 'Spacious', 'Luggage Space', 'First Aid Kit']
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    type: 'SUV',
    category: 'SUV',
    seats: 7,
    pricePerKm: 14,
    minKm: 80,
    imageUrl: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/new-ertiga-car-image/ertiga_red.webp',
    features: ['AC', 'Music System', 'Spacious', 'Luggage Space']
  },
  {
    id: 'tempo12',
    name: 'Tempo Traveller 12 Seater',
    type: 'Premium',
    category: 'Tempo Traveller',
    seats: 12,
    pricePerKm: 22,
    minKm: 100,
    imageUrl: 'https://www.vanrentalchennai.in/wp-content/uploads/2018/01/12-seater-tempo-traveller-rental-chennai.jpg',
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Huge Luggage Space']
  },
  {
    id: 'tempo17',
    name: 'Tempo Traveller 17 Seater',
    type: 'Premium',
    category: 'Tempo Traveller',
    seats: 17,
    pricePerKm: 25,
    minKm: 100,
    imageUrl: 'https://www.vanrentalchennai.in/wp-content/uploads/2018/01/12-seater-tempo-traveller-rental-chennai.jpg',
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Huge Luggage Space']
  }
];
