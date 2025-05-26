export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  popular?: boolean;
  location: string;
  type?: 'package' | 'day-trip' | 'overnight';
  highlights?: string[];
  transportation?: string;
  pickupPoints?: string[];
  itinerary?: {
    day: number;
    title: string;
    activities: string[];
  }[];
}

export const packages: Package[] = [
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

  // New Taj Mahal Day Trip Packages
  {
    id: 'taj-sunrise',
    title: 'Sunrise Taj Mahal Tour From Delhi',
    description: 'Experience the magnificent grandeur of Taj Mahal at sunrise with this early morning tour by car from Delhi.',
    price: 4999,
    duration: 'Same Day',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Agra',
    type: 'day-trip',
    transportation: 'Private AC Car',
    highlights: [
      'Sunrise view of Taj Mahal',
      'Agra Fort visit',
      'Itmad-Ud-Daulah (Baby Taj)',
      'Breakfast at 5-star hotel',
      'Private guide included'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'taj-gatiman',
    title: 'Taj Mahal Tour by Gatiman Express',
    description: 'Travel on India\'s fastest train, the Gatiman Express, for a convenient and time-saving visit to the Taj Mahal.',
    price: 5999,
    duration: 'Same Day',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Agra',
    type: 'day-trip',
    transportation: 'Gatiman Express Train',
    highlights: [
      'Journey on India\'s fastest train',
      'Taj Mahal guided tour',
      'Agra Fort exploration',
      'Baby Taj visit',
      'Lunch at 5-star hotel'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Railway Station']
  },
  {
    id: 'taj-shatabdi',
    title: 'Taj Mahal Tour by Shatabdi Express',
    description: 'Quick and efficient journey to Taj Mahal aboard the comfortable Shatabdi Express train service.',
    price: 5499,
    duration: 'Same Day',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Agra',
    type: 'day-trip',
    transportation: 'Shatabdi Express Train',
    highlights: [
      'Comfortable train journey',
      'Taj Mahal detailed tour',
      'Agra Fort visit',
      'Fatehpur Sikri exploration',
      'Local market shopping'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Railway Station']
  },
  {
    id: 'taj-car',
    title: 'Same Day Taj Mahal Tour by Car',
    description: 'Flexible and comfortable car journey to Taj Mahal allowing you to explore at your own pace.',
    price: 4499,
    duration: 'Same Day',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Agra',
    type: 'day-trip',
    transportation: 'Private AC Car',
    highlights: [
      'Flexible timing',
      'Taj Mahal guided tour',
      'Agra Fort visit',
      'Itmad-Ud-Daulah',
      'Lunch at 5-star hotel'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport', 'Jaipur Hotels']
  },
  {
    id: 'agra-fatehpur',
    title: 'Agra Day Tour with Fatehpur Sikri',
    description: 'Comprehensive tour covering Taj Mahal, Agra Fort, and the perfectly preserved medieval city of Fatehpur Sikri.',
    price: 6499,
    duration: 'Same Day',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Agra',
    type: 'day-trip',
    transportation: 'Private AC Car',
    highlights: [
      'Taj Mahal exploration',
      'Agra Fort tour',
      'Fatehpur Sikri visit',
      'UNESCO World Heritage sites',
      'Professional guide'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  
  // New Overnight Tour Packages
  {
    id: 'delhi-agra-overnight',
    title: 'Delhi to Agra Overnight Tour',
    description: 'Experience the essence of Mughal heritage with an overnight stay in Agra. Visit Taj Mahal at sunrise and explore Agra Fort.',
    price: 8999,
    duration: '2 Days / 1 Night',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Agra',
    type: 'overnight',
    transportation: 'Private AC Car',
    highlights: [
      'Sunrise visit to Taj Mahal',
      'Agra Fort exploration',
      'Comfortable hotel accommodation',
      'Traditional Mughlai dinner',
      'Professional guide included'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra',
        activities: [
          'Pick-up from Delhi hotel/airport',
          'Drive to Agra (3-4 hours)',
          'Check-in at hotel',
          'Visit Agra Fort',
          'Evening at leisure',
          'Dinner at hotel'
        ]
      },
      {
        day: 2,
        title: 'Taj Mahal & Return',
        activities: [
          'Early morning Taj Mahal visit',
          'Breakfast at hotel',
          'Check-out and shopping',
          'Drive back to Delhi',
          'Drop at hotel/airport'
        ]
      }
    ]
  },
  {
    id: 'delhi-jaipur-overnight',
    title: 'Delhi to Jaipur Pink City Overnight Tour',
    description: 'Discover the royal heritage of Rajasthan with an overnight stay in the Pink City. Explore magnificent palaces and forts.',
    price: 9999,
    duration: '2 Days / 1 Night',
    imageUrl: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Jaipur',
    type: 'overnight',
    transportation: 'Private AC Car',
    highlights: [
      'Hawa Mahal (Palace of Winds)',
      'City Palace exploration',
      'Jantar Mantar observatory',
      'Traditional Rajasthani dinner',
      'Local market shopping'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Jaipur',
        activities: [
          'Pick-up from Delhi hotel/airport',
          'Drive to Jaipur (5-6 hours)',
          'Check-in at hotel',
          'Visit City Palace',
          'Explore Jantar Mantar',
          'Traditional Rajasthani dinner'
        ]
      },
      {
        day: 2,
        title: 'Jaipur Sightseeing & Return',
        activities: [
          'Visit Hawa Mahal',
          'Breakfast at hotel',
          'Local market shopping',
          'Check-out from hotel',
          'Drive back to Delhi',
          'Drop at hotel/airport'
        ]
      }
    ]
  },
  {
    id: 'golden-triangle-overnight',
    title: 'Golden Triangle Overnight Package',
    description: 'Experience the perfect blend of adventure, history, and culture covering Delhi, Agra, and Jaipur in this comprehensive overnight tour.',
    price: 15999,
    duration: '3 Days / 2 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Jaipur',
    type: 'overnight',
    transportation: 'Private AC Car',
    highlights: [
      'Complete Golden Triangle circuit',
      'Taj Mahal sunrise visit',
      'Rajputana architecture exploration',
      'Comfortable hotel stays',
      'Cultural experiences and local cuisine'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra',
        activities: [
          'Pick-up from Delhi',
          'Drive to Agra',
          'Visit Agra Fort',
          'Check-in at hotel',
          'Evening at leisure'
        ]
      },
      {
        day: 2,
        title: 'Agra to Jaipur',
        activities: [
          'Sunrise Taj Mahal visit',
          'Breakfast and check-out',
          'Drive to Jaipur via Fatehpur Sikri',
          'Check-in at Jaipur hotel',
          'Evening cultural show'
        ]
      },
      {
        day: 3,
        title: 'Jaipur Sightseeing & Return',
        activities: [
          'Visit Hawa Mahal and City Palace',
          'Explore local markets',
          'Lunch and check-out',
          'Drive back to Delhi',
          'Drop at hotel/airport'
        ]
      }
    ]
  },
  {
    id: 'agra-mathura-overnight',
    title: 'Agra Mathura Vrindavan Overnight Tour',
    description: 'Combine the beauty of Taj Mahal with the spiritual experience of Krishna\'s birthplace in this unique overnight package.',
    price: 10999,
    duration: '2 Days / 1 Night',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Agra, Mathura',
    type: 'overnight',
    transportation: 'Private AC Car',
    highlights: [
      'Taj Mahal and Agra Fort',
      'Krishna Janmabhoomi Temple',
      'Vrindavan temple visits',
      'Spiritual and cultural experience',
      'Traditional vegetarian meals'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra via Mathura',
        activities: [
          'Pick-up from Delhi',
          'Drive to Mathura',
          'Visit Krishna Janmabhoomi',
          'Proceed to Agra',
          'Check-in and evening at leisure'
        ]
      },
      {
        day: 2,
        title: 'Agra Sightseeing & Return',
        activities: [
          'Early morning Taj Mahal visit',
          'Breakfast at hotel',
          'Visit Agra Fort',
          'Drive back to Delhi',
          'Drop at hotel/airport'
        ]
      }
    ]
  },

  // Golden Triangle Tour Packages
  {
    id: 'golden-triangle-1n2d',
    title: 'Golden Triangle Tour 1 Night 2 Days',
    description: 'Experience the essence of North India with this quick Golden Triangle tour covering Delhi, Agra, and Jaipur in just 2 days.',
    price: 9999,
    duration: '2 Days / 1 Night',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Jaipur',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Taj Mahal sunrise visit',
      'Agra Fort exploration',
      'Hawa Mahal and City Palace',
      'Express Golden Triangle experience',
      'Professional guide included'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra to Jaipur',
        activities: [
          'Early morning departure from Delhi',
          'Visit Taj Mahal and Agra Fort',
          'Drive to Jaipur',
          'Check-in at hotel',
          'Evening at leisure'
        ]
      },
      {
        day: 2,
        title: 'Jaipur Sightseeing & Return',
        activities: [
          'Visit Hawa Mahal and City Palace',
          'Explore local markets',
          'Drive back to Delhi',
          'Drop at hotel/airport'
        ]
      }
    ]
  },
  {
    id: 'golden-triangle-2n3d',
    title: 'Golden Triangle Tour 2 Nights 3 Days',
    description: 'Classic Golden Triangle tour with comfortable pacing, covering Delhi, Agra, and Jaipur with quality time at each destination.',
    price: 14999,
    duration: '3 Days / 2 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Jaipur',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Complete Golden Triangle circuit',
      'Taj Mahal and Agra Fort',
      'Amber Fort and City Palace',
      'Comfortable hotel accommodation',
      'Cultural experiences'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra',
        activities: [
          'Pick-up from Delhi',
          'Drive to Agra',
          'Visit Taj Mahal',
          'Visit Agra Fort',
          'Check-in at hotel'
        ]
      },
      {
        day: 2,
        title: 'Agra to Jaipur',
        activities: [
          'Check-out from hotel',
          'Drive to Jaipur via Fatehpur Sikri',
          'Check-in at Jaipur hotel',
          'Evening city tour'
        ]
      },
      {
        day: 3,
        title: 'Jaipur Sightseeing & Return',
        activities: [
          'Visit Amber Fort',
          'Explore Hawa Mahal and City Palace',
          'Shopping at local markets',
          'Drive back to Delhi'
        ]
      }
    ]
  },
  {
    id: 'golden-triangle-3n4d',
    title: 'Golden Triangle Tour 3 Nights 4 Days',
    description: 'Leisurely Golden Triangle tour with extended sightseeing and cultural experiences in Delhi, Agra, and Jaipur.',
    price: 19999,
    duration: '4 Days / 3 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi, Agra, Jaipur',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Extended sightseeing in each city',
      'Delhi city tour included',
      'Sunrise Taj Mahal visit',
      'Amber Fort elephant ride',
      'Cultural performances'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi Sightseeing',
        activities: [
          'Pick-up from hotel/airport',
          'Visit Red Fort and Jama Masjid',
          'Explore Chandni Chowk',
          'Visit India Gate and Lotus Temple',
          'Overnight in Delhi'
        ]
      },
      {
        day: 2,
        title: 'Delhi to Agra',
        activities: [
          'Drive to Agra',
          'Visit Taj Mahal',
          'Explore Agra Fort',
          'Visit Mehtab Bagh',
          'Overnight in Agra'
        ]
      },
      {
        day: 3,
        title: 'Agra to Jaipur',
        activities: [
          'Visit Itmad-Ud-Daulah',
          'Drive to Jaipur via Fatehpur Sikri',
          'Check-in at hotel',
          'Evening at leisure'
        ]
      },
      {
        day: 4,
        title: 'Jaipur Sightseeing & Return',
        activities: [
          'Visit Amber Fort',
          'Explore City Palace and Jantar Mantar',
          'Visit Hawa Mahal',
          'Shopping and drive back to Delhi'
        ]
      }
    ]
  },
  {
    id: 'golden-triangle-4n5d',
    title: 'Golden Triangle Tour 4 Nights 5 Days',
    description: 'Comprehensive Golden Triangle tour with detailed exploration of Delhi, Agra, and Jaipur, perfect for first-time visitors.',
    price: 24999,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Jaipur',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Comprehensive city tours',
      'Multiple UNESCO World Heritage sites',
      'Cultural performances and local cuisine',
      'Photography sessions at iconic locations',
      'Shopping assistance'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-mandawa',
    title: 'Golden Triangle Tour with Mandawa',
    description: 'Extended Golden Triangle tour including the painted havelis of Mandawa, showcasing Rajasthani art and culture.',
    price: 34999,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi, Agra, Jaipur, Mandawa',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Complete Golden Triangle circuit',
      'Mandawa painted havelis',
      'Shekhawati region exploration',
      'Traditional Rajasthani culture',
      'Heritage hotel stays'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-amritsar',
    title: 'Golden Triangle Tour With Amritsar',
    description: 'Combine the Golden Triangle with the spiritual experience of Amritsar, including the Golden Temple.',
    price: 32999,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi, Jaipur, Agra, Amritsar',
    type: 'package',
    transportation: 'Private AC Car + Train',
    highlights: [
      'Golden Triangle circuit',
      'Golden Temple visit',
      'Wagah Border ceremony',
      'Spiritual experiences',
      'Punjabi culture and cuisine'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-pushkar',
    title: 'Golden Triangle Tour With Pushkar',
    description: 'Experience the Golden Triangle with the holy city of Pushkar, known for its sacred lake and Brahma temple.',
    price: 29999,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi, Agra, Jaipur, Pushkar',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Golden Triangle tour',
      'Pushkar Lake and Brahma Temple',
      'Camel safari experience',
      'Rajasthani folk culture',
      'Desert camping option'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-ranthambore',
    title: 'Golden Triangle Tour with Ranthambore',
    description: 'Combine cultural heritage with wildlife adventure including tiger safari at Ranthambore National Park.',
    price: 35999,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Ranthambore, Jaipur',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Golden Triangle monuments',
      'Tiger safari at Ranthambore',
      'Wildlife photography',
      'Nature and heritage combination',
      'Luxury jungle resort stay'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-varanasi',
    title: 'Golden Triangle Tour With Varanasi',
    description: 'Complete North India experience combining Golden Triangle with the spiritual capital Varanasi.',
    price: 42999,
    duration: '9 Days / 8 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi, Agra, Jaipur, Varanasi',
    type: 'package',
    transportation: 'Private AC Car + Flight',
    highlights: [
      'Complete Golden Triangle',
      'Varanasi Ganga Aarti',
      'Spiritual experiences',
      'Cultural diversity of North India',
      'Heritage and spirituality combination'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  },
  {
    id: 'golden-triangle-rajasthan',
    title: 'Golden Triangle Tour With Rajasthan',
    description: 'Ultimate Rajasthan experience covering Golden Triangle plus Udaipur, Jodhpur, Jaisalmer, and Bikaner.',
    price: 69999,
    duration: '15 Days / 14 Nights',
    imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    popular: true,
    location: 'Delhi, Agra, Jaipur, Udaipur, Jodhpur, Jaisalmer, Bikaner',
    type: 'package',
    transportation: 'Private AC Car',
    highlights: [
      'Complete Rajasthan circuit',
      'Golden Triangle monuments',
      'Desert safari in Jaisalmer',
      'Palace hotels experience',
      'Comprehensive cultural immersion'
    ],
    pickupPoints: ['Delhi Hotels', 'Delhi Airport']
  }
];
