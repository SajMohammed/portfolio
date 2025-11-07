import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    // Disable ESLint during builds in Docker
    ignoreDuringBuilds: process.env.NODE_ENV === 'production' && process.env.DOCKER_BUILD === 'true',
  },
  typescript: {
    // Disable TypeScript type checking during builds in Docker
    ignoreBuildErrors: process.env.NODE_ENV === 'production' && process.env.DOCKER_BUILD === 'true',
  },
};

export default nextConfig;
