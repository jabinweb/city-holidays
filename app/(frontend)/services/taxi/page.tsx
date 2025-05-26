'use client';

import { useState } from 'react';
import { cars, VehicleCategory } from '@/data/cars';
import Container from '@/components/ui/Container';
import CarCard from '@/components/services/CarCard';
import { taxiFAQs } from '@/data/taxiFAQ';
import FAQ from '@/components/ui/FAQ';

export default function TaxiServicesPage() {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('Sedan');

  const categories: VehicleCategory[] = ['Sedan', 'SUV', 'Tempo Traveller'];
  const filteredCars = cars.filter(car => car.category === activeCategory);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Taxi Services</h1>
            <p className="text-xl text-blue-100">
              Choose from our fleet of well-maintained vehicles with professional drivers for your travel needs.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className="mt-20">
          <FAQ items={taxiFAQs} />
        </div>
      </Container>
    </>
  );
}
