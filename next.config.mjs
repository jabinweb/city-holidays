/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs', '@prisma/client']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vanrentalchennai.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'global.toyota',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;