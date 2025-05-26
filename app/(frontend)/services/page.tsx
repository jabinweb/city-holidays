import React from 'react';
import Container from '@/components/ui/Container';
import { Plane, Train, Bus, Car, Package, CheckCircle, Star, Shield, Clock, Users } from 'lucide-react';
import CallToAction from '@/components/home/CallToAction';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const ServiceSection: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  features: string[];
  benefits: string[];
  gradient: string;
  reversed?: boolean;
}> = ({ title, description, icon, imageUrl, features, benefits, gradient, reversed = false }) => {
  const contentOrder = reversed ? 'lg:order-2' : '';
  const imageOrder = reversed ? 'lg:order-1' : '';
  
  return (
    <div className="py-16 border-b border-gray-100 last:border-b-0">
      <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
        <div className={`${contentOrder} space-y-8`}>
          {/* Header */}
          <div>
            <div className="inline-flex items-center mb-6">
              <div className={`p-3 rounded-xl ${gradient} text-white shadow-lg mr-4`}>
                {icon}
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
                <div className="flex items-center mt-2 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`${imageOrder} relative`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Stats Overlay */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-xs text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Golden Triangle Tours',
      description: 'Experience the magnificent Golden Triangle circuit covering Delhi, Agra, and Jaipur. Our expertly crafted packages showcase India\'s rich heritage, architectural marvels, and cultural diversity with professional guides and luxury accommodations.',
      icon: <Package size={28} />,
      imageUrl: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
      features: [
        'Multiple duration options (2 days to 15 days)',
        'Extensions to Ranthambore, Pushkar, Varanasi',
        'Professional multilingual guides',
        'UNESCO World Heritage site visits',
        'Cultural performances and local cuisine',
        'Luxury and budget accommodation options'
      ],
      benefits: [
        'Expert local knowledge and insights',
        'Skip-the-line access to monuments',
        'Personalized itinerary customization',
        'Quality assured accommodations'
      ]
    },
    {
      title: 'Holiday Packages',
      description: 'Discover perfectly curated holiday experiences designed for every type of traveler. From romantic getaways to family adventures and solo expeditions, our packages ensure memorable journeys with comprehensive planning and seamless execution.',
      icon: <Package size={28} />,
      imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      features: [
        'Customized packages for all traveler types',
        'Domestic and international destinations',
        'Adventure, pilgrimage, and honeymoon tours',
        'All-inclusive packages with accommodation',
        'Expert tour guides and local experiences',
        'Flexible booking and payment options'
      ],
      benefits: [
        'Tailored experiences based on preferences',
        'Best value for money packages',
        'Stress-free travel planning',
        'Emergency assistance during travel'
      ]
    },
    {
      title: 'Flight Bookings',
      description: 'Secure the best flight deals with our comprehensive booking service. We partner with leading airlines to offer competitive prices, flexible options, and seamless booking experience for both domestic and international travel.',
      icon: <Plane size={28} />,
      imageUrl: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      features: [
        'Domestic and international flight bookings',
        'Competitive prices and exclusive deals',
        'Group booking discounts available',
        'Web check-in assistance provided',
        'Flight cancellation and rescheduling support',
        'Real-time fare comparison'
      ],
      benefits: [
        'Best price guarantee on bookings',
        'Instant booking confirmation',
        'Dedicated customer support',
        'Flexible cancellation policies'
      ]
    },
    {
      title: 'Railway Reservations',
      description: 'Navigate India\'s extensive railway network with ease through our professional reservation services. From regular bookings to last-minute Tatkal reservations, we ensure your train travel is comfortable and confirmed.',
      icon: <Train size={28} />,
      imageUrl: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?q=80&w=2720&auto=format&fit=crop',
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
      features: [
        'Reservations for all classes in Indian Railways',
        'Expert Tatkal booking service',
        'IRCTC account setup and assistance',
        'Real-time PNR status tracking',
        'Senior citizen and concession bookings',
        'Waitlist confirmation assistance'
      ],
      benefits: [
        'High success rate in reservations',
        'Expert knowledge of train schedules',
        'Priority booking for special occasions',
        'Complete documentation support'
      ]
    },
    {
      title: 'Bus Bookings',
      description: 'Travel comfortably across India with our extensive bus booking network. Choose from luxury coaches to budget-friendly options, all vetted for safety and comfort standards.',
      icon: <Bus size={28} />,
      imageUrl: 'https://images.unsplash.com/photo-1525962898597-a4ae6402826e?q=80&w=2669&auto=format&fit=crop',
      gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
      features: [
        'AC and non-AC bus options',
        'Sleeper, semi-sleeper, and seater buses',
        'Extensive city-to-city route coverage',
        'Luxury and budget fleet options',
        'Group booking discounts',
        'Live tracking and updates'
      ],
      benefits: [
        'Verified operator partnerships',
        'Flexible booking modifications',
        'Comfortable seating options',
        'Punctual and reliable services'
      ]
    },
    {
      title: 'Professional Taxi Services',
      description: 'Experience premium ground transportation with our fleet of well-maintained vehicles and professional chauffeurs. Perfect for airport transfers, city tours, and outstation journeys.',
      icon: <Car size={28} />,
      imageUrl: 'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=2670&auto=format&fit=crop',
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      features: [
        'Comprehensive local sightseeing packages',
        'Airport and railway station transfers',
        'Outstation travel with experienced drivers',
        'Hourly and daily rental options',
        'Well-maintained fleet with regular servicing',
        'GPS tracking and route optimization'
      ],
      benefits: [
        'Professional uniformed chauffeurs',
        'Transparent pricing with no hidden costs',
        'Clean and sanitized vehicles',
        'Insurance coverage for peace of mind'
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ Travelers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Travel
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                Services
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Comprehensive travel solutions designed to exceed expectations.
              From planning to execution, we handle every detail with professional expertise.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="h-5 w-5" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="h-5 w-5" />
                <span className="font-medium">Expert Team</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Services Sections */}
      <Container className="py-16">
        {services.map((service, index) => (
          <ServiceSection
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            imageUrl={service.imageUrl}
            features={service.features}
            benefits={service.benefits}
            gradient={service.gradient}
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