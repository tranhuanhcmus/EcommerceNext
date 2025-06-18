import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,
  
  // External packages for server components
  serverExternalPackages: ['@prisma/client'],

  // Image optimization
  images: {
    domains: ['localhost'],
  },

  // Environment variables
  env: {
  },

  // Enable source maps in production for error tracking
  productionBrowserSourceMaps: true,

  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
