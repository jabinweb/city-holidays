import { PrismaClient } from '@prisma/client';
import { packages } from '../data/packages';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing packages
  console.log('Clearing existing packages...');
  await prisma.package.deleteMany();

  // Insert packages from packages.ts
  console.log('Inserting packages...');
  
  for (const pkg of packages) {
    await prisma.package.create({
      data: {
        id: pkg.id,
        title: pkg.title,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        imageUrl: pkg.imageUrl,
        popular: pkg.popular || false,
        location: pkg.location,
        type: pkg.type || 'package',
        highlights: pkg.highlights ? JSON.stringify(pkg.highlights) : null,
        transportation: pkg.transportation || null,
        pickupPoints: pkg.pickupPoints ? JSON.stringify(pkg.pickupPoints) : null,
        itinerary: pkg.itinerary ? JSON.stringify(pkg.itinerary) : null,
      },
    });
    console.log(`✅ Created package: ${pkg.title}`);
  }

  console.log(`🎉 Successfully seeded ${packages.length} packages!`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
