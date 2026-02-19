import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mlstatic.com',
      },
      {
        protocol: 'http',
        hostname: '**.mlstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.mercadolibre.com',
      },
    ],
  },
};

export default nextConfig;
