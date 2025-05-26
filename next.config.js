/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'plus.unsplash.com',
      'global.toyota',
      'az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net',
      'www.vanrentalchennai.in'
    ]
  },
  // Ensure Prisma is bundled correctly
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Disable static optimization for API routes
  generateStaticParams: false,
}

module.exports = nextConfig;
