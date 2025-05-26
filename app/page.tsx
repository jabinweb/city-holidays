import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
