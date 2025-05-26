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
  // Webpack configuration to handle auth modules properly
  webpack: (config, { isServer }) => {
    // Exclude problematic auth modules from external handling
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@auth/core': 'commonjs @auth/core',
        'next-auth': 'commonjs next-auth'
      });
    }
    
    // Handle WebAuthn utils that cause build issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'crypto': false,
      'stream': false,
      'util': false
    };
    
    return config;
  }
};

export default nextConfig;