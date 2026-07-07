import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
 
};

export default nextConfig;
