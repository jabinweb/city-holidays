import React from 'react';
import { Plane, Train, Bus, Car, Package, ArrowRight, CheckCircle } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Link from 'next/link';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  features: string[];
  gradient: string;
}> = ({ title, description, icon, link, features, gradient }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative p-8">
        {/* Icon and Title */}
        <div className="flex items-center mb-6">
          <div className={`p-4 rounded-xl ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Action Button */}
        <Link href={link}>
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: 'Golden Triangle Tours',
      description: 'Expertly crafted packages covering Delhi, Agra, and Jaipur with extensions to Rajasthan\'s royal destinations.',
      icon: <Package size={28} />,
      link: '/packages?type=golden-triangle', // Routes to (frontend) group
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
      features: [
        'UNESCO World Heritage Sites',
        'Professional Local Guides',
        'Luxury Transportation',
        'Cultural Experiences'
      ]
    },
    {
      title: 'Holiday Packages',
      description: 'Comprehensive travel solutions for families, couples, and solo travelers across India and international destinations.',
      icon: <Package size={28} />,
      link: '/packages', // Routes to (frontend) group
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      features: [
        'Customized Itineraries',
        'All-Inclusive Packages',
        'Expert Travel Consultancy',
        '24/7 Support'
      ]
    },
    {
      title: 'Flight Bookings',
      description: 'Seamless domestic and international flight reservations with competitive pricing and exclusive deals.',
      icon: <Plane size={28} />,
      link: '/services',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      features: [
        'Best Price Guarantee',
        'Instant Confirmation',
        'Group Discounts',
        'Flexible Booking Options'
      ]
    },
    {
      title: 'Railway Reservations',
      description: 'Hassle-free train ticket bookings across India\'s extensive railway network with expert assistance.',
      icon: <Train size={28} />,
      link: '/services',
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
      features: [
        'All Class Reservations',
        'Tatkal Booking Service',
        'PNR Status Tracking',
        'Concession Assistance'
      ]
    },
    {
      title: 'Bus Bookings',
      description: 'Comfortable intercity travel with our network of premium bus operators covering major routes.',
      icon: <Bus size={28} />,
      link: '/services',
      gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
      features: [
        'AC & Non-AC Options',
        'Premium & Budget Fleet',
        'Online Seat Selection',
        'Real-time Tracking'
      ]
    },
    {
      title: 'Taxi Services',
      description: 'Professional chauffeur services for local sightseeing, airport transfers, and outstation journeys.',
      icon: <Car size={28} />,
      link: '/services/taxi',
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      features: [
        'Professional Drivers',
        'Well-maintained Fleet',
        'Hourly & Daily Rentals',
        'GPS Tracking'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      
      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Package className="h-4 w-4" />
            Professional Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Travel&nbsp;
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solutions 
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From planning to execution, we provide end-to-end travel services with 
            professional expertise and personalized attention to every detail.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              features={service.features}
              gradient={service.gradient}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Our travel experts are here to help you plan the perfect trip. 
              Get personalized recommendations and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore All Services
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Get Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;