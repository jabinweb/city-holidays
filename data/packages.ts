export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  popular?: boolean;
  location: string;
}

export const packages: Package[] = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    description: 'Experience the perfect beach holiday with pristine shores and vibrant nightlife.',
    price: 19999,
    duration: '4 Days / 3 Nights',
    imageUrl: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Goa'
  },
  {
    id: '2',
    title: 'Kerala Backwaters',
    description: `Explore the serene backwaters and lush greenery of God's own country.`,
    price: 22999,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.pexels.com/photos/695761/pexels-photo-695761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Kerala'
  },
  {
    id: '3',
    title: 'Rajasthan Heritage Tour',
    description: 'Discover the royal palaces, mighty fortresses, and rich culture of Rajasthan.',
    price: 27999,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Rajasthan'
  },
  {
    id: '4',
    title: 'Taj Mahal & Agra Tour',
    description: 'Visit the iconic symbol of love and explore the rich Mughal heritage of Agra.',
    price: 12999,
    duration: '3 Days / 2 Nights',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Agra'
  },
  {
    id: '5',
    title: 'Himachal Adventure',
    description: 'Experience thrilling adventures in the snow-capped mountains of Himachal Pradesh.',
    price: 24999,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.pexels.com/photos/2686558/pexels-photo-2686558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Himachal Pradesh'
  },
  {
    id: '6',
    title: 'Andaman Island Escape',
    description: 'Relax on pristine beaches and explore marine life in the Andaman Islands.',
    price: 32999,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Andaman'
  },
  {
    id: '7',
    title: 'Varanasi Spiritual Journey',
    description: 'Experience the spiritual essence of India along the holy Ganges River.',
    price: 15999,
    duration: '4 Days / 3 Nights',
    imageUrl: 'https://images.pexels.com/photos/5069133/pexels-photo-5069133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Varanasi'
  },
  {
    id: '8',
    title: 'Kashmir Paradise',
    description: 'Visit the heaven on earth with its stunning lakes, gardens and mountains.',
    price: 29999,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Kashmir'
  }
];
