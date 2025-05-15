import React from 'react';
import Container from '@/components/ui/Container';
import { Plane, Train, Bus, Car, Package } from 'lucide-react';
import CallToAction from '@/components/home/CallToAction';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const ServiceSection: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  features: string[];
  reversed?: boolean;
}> = ({ title, description, icon, imageUrl, features, reversed = false }) => {
  const contentOrder = reversed ? 'md:order-2' : '';
  const imageOrder = reversed ? 'md:order-1' : '';
  
  return (
    <div className="py-12 border-b border-gray-200 last:border-b-0">
      <div className={`grid md:grid-cols-2 gap-10 items-center`}>
        <div className={`${contentOrder}`}>
          <div className="inline-flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
              {icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          
          <p className="text-gray-600 mb-6">{description}</p>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`${imageOrder}`}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="rounded-lg shadow-md w-full h-auto object-cover"
            style={{ maxHeight: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Holiday Packages',
      description: 'Discover our curated holiday packages designed to provide you with unforgettable experiences. Whether you\'re looking for a family vacation, a romantic getaway, or an adventure trip, we have the perfect package for you.',
      icon: <Package size={24} />,
      imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      features: [
        'Customized packages for individuals, couples, and families',
        'Domestic and international tour packages',
        'Adventure tours, pilgrimage tours, and honeymoon packages',
        'All-inclusive packages with accommodation, transportation, and sightseeing',
        'Expert tour guides for an enriching experience'
      ]
    },
    {
      title: 'Flight Bookings',
      description: 'Book domestic and international flights at competitive prices through our user-friendly platform. We partner with all major airlines to offer you the best deals and a seamless booking experience.',
      icon: <Plane size={24} />,
      imageUrl: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      features: [
        'Domestic and international flight bookings',
        'Competitive prices and special deals',
        'Group booking discounts',
        'Web check-in assistance',
        'Flight cancellation and rescheduling support'
      ]
    },
    {
      title: 'Railway Reservations',
      description: 'Skip the long queues and book your train tickets through us. We provide hassle-free railway reservation services for all classes across the Indian Railways network.',
      icon: <Train size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?q=80&w=2720&auto=format&fit=crop',
      features: [
        'Reservations for all classes in Indian Railways',
        'Tatkal booking service',
        'IRCTC account assistance',
        'PNR status tracking',
        'Senior citizen and concession booking assistance'
      ]
    },
    {
      title: 'Bus Bookings',
      description: 'Travel comfortably by bus to your desired destination. We offer online bus ticket booking services for various operators covering routes across all major cities and tourist destinations.',
      icon: <Bus size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1525962898597-a4ae6402826e?q=80&w=2669&auto=format&fit=crop',
      features: [
        'Online bookings for AC and non-AC buses',
        'Options for sleeper, semi-sleeper, and seater buses',
        'City-to-city routes across India',
        'Luxury and budget options available',
        'Group booking discounts'
      ]
    },
    {
      title: 'Taxi Services',
      description: 'Explore cities and tourist attractions at your own pace with our reliable taxi services. We offer local sightseeing, airport transfers, and outstation travel options to make your journey comfortable.',
      icon: <Car size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=2670&auto=format&fit=crop',
      features: [
        'Local sightseeing packages',
        'Airport and railway station transfers',
        'Outstation travel options',
        'Hourly and daily rental options',
        'Well-maintained fleet with professional drivers'
      ]
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100">
              Comprehensive travel solutions designed to meet all your needs,
              from planning to execution, we've got you covered.
            </p>
          </div>
        </Container>
        
      </div>
      
      <Container className="py-12">
        {services.map((service, index) => (
          <ServiceSection
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            imageUrl={service.imageUrl}
            features={service.features}
            reversed={index % 2 !== 0}
          />
        ))}
      </Container>
      
      <CallToAction />
      <FloatingWhatsApp />
    </>
  );
};

export default ServicesPage;