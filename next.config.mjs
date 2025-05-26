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
  // Remove conflicting webpack config that was causing module issues
}

export default nextConfig