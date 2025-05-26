import React from 'react';
import Container from '@/components/ui/Container';
import { Car, Clock, MapPin, Phone, Shield, Star, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cars } from '@/data/cars';
import BookNowButton from '@/components/ui/BookNowButton';

export const dynamic = 'force-dynamic';

const TaxiServiceCard: React.FC<{
  car: typeof cars[0];
}> = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {car.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-gray-600">4.8</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{car.seats} Seats</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm">Insured</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            ₹{car.pricePerKm}/km
          </div>
          <div className="text-sm text-gray-500">
            Minimum {car.minKm} km
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <BookNowButton 
          fullWidth 
          serviceData={{
            type: 'taxi',
            name: car.name,
            id: car.id,
            price: car.pricePerKm
          }}
        />
      </div>
    </div>
  );
};

const TaxiServicesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Car className="h-4 w-4" />
              Professional Taxi Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Car
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                Rental Services
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Experience comfortable and reliable transportation with our well-maintained fleet 
              and professional chauffeurs for all your travel needs.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="h-5 w-5" />
                <span className="font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">GPS Tracking</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Services Section */}
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Fleet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse range of vehicles suitable for every occasion, 
            from airport transfers to outstation journeys.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {cars.map((car) => (
            <TaxiServiceCard key={car.id} car={car} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Quote?
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Contact our team for special requirements, group bookings, or long-term rentals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919528735541">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
            <a href="https://wa.me/919528735541" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TaxiServicesPage;
