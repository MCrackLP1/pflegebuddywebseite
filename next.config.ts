import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Optimiere die Build-Ausgabe
  output: 'standalone',
};

export default nextConfig;
