/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'global.toyota',
      },
      {
        protocol: 'https',
        hostname: 'az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net',
      },
      {
        protocol: 'https',
        hostname: 'www.vanrentalchennai.in',
      }
    ]
  },
  // Ensure proper build output
  output: 'standalone'
}

export default nextConfig