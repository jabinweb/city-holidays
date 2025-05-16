import React from 'react';
import { Plane, Train, Bus, Car, Package, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Card, { CardContent, CardImage, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Link from 'next/link';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  imageUrl: string;
}> = ({ title, description, icon, link, imageUrl }) => {
  return (
    <Card hoverable className="h-full">
      <CardImage 
        src={imageUrl} 
        alt={title} 
        className="h-48"
      />
      <CardContent>
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t">
        <Link href={link} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Learn More
          <ArrowRight size={16} className="ml-1" />
        </Link>
        <Link href="/booking">
          <Button variant="primary" size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: 'Holiday Packages',
      description: 'Customized holiday packages for families, couples, and solo travelers to destinations across India and abroad.',
      icon: <Package size={24} />,
      link: '/services',
      imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Flight Bookings',
      description: 'Domestic and international flight bookings at competitive prices with special deals and discounts.',
      icon: <Plane size={24} />,
      link: '/services',
      imageUrl: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Railway Reservations',
      description: 'Hassle-free railway ticket bookings for all classes across Indian Railways network.',
      icon: <Train size={24} />,
      link: '/services',
      imageUrl: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?q=80&w=2720&auto=format&fit=crop'
    },
    {
      title: 'Bus Bookings',
      description: 'Book bus tickets for various operators covering routes across all major cities and tourist destinations.',
      icon: <Bus size={24} />,
      link: '/services',
      imageUrl: 'https://images.unsplash.com/photo-1525962898597-a4ae6402826e?q=80&w=2669&auto=format&fit=crop'
    },
    {
      title: 'Taxi Services',
      description: 'Reliable taxi services for local sightseeing, airport transfers, and outstation travel.',
      icon: <Car size={24} />,
      link: '/services/taxi',
      imageUrl: 'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=2670&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of travel services to make your journey smooth and memorable. 
            From planning to execution, we take care of all your travel needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Services;