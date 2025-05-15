import React from 'react';
import Container from '../ui/Container';
import { Award, Clock, CreditCard, HeartHandshake, ShieldCheck, Headphones } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="p-3 rounded-full bg-blue-50 text-blue-600 inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award size={24} />,
      title: 'Experienced Team',
      description: 'Our team has over 15 years of experience in the travel industry, providing expert guidance for your trips.'
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Secure Payments',
      description: 'Multiple secure payment options available with instant confirmations and digital receipts.'
    },
    {
      icon: <Clock size={24} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you at any time during your journey.'
    },
    {
      icon: <HeartHandshake size={24} />,
      title: 'Best Price Guarantee',
      description: 'We offer the best rates and will match any price for identical services found elsewhere.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Safe & Reliable',
      description: 'All our packages and services are vetted for safety, quality, and reliability.'
    },
    {
      icon: <Headphones size={24} />,
      title: 'Personalized Service',
      description: 'Tailored travel experiences designed to meet your specific requirements and preferences.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At City Holidays, we strive to provide exceptional travel services that make your journey memorable.
            Here's why travelers choose us for their travel needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;