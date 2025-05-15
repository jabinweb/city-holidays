import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import PopularPackages from '../components/home/PopularPackages';
import Testimonials from '../components/home/Testimonials';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CallToAction from '../components/home/CallToAction';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  return (
    <>  
      <Hero />
      <Services />
      <PopularPackages />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <FloatingWhatsApp />
    </>
  );
};

