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
  // Ensure Prisma is bundled correctly for Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't externalize @prisma/client on server side for Vercel
      config.externals = config.externals.filter(
        (external) => typeof external === 'string' && !external.includes('@prisma/client')
      );
    }
    return config;
  },
}

export default nextConfig;