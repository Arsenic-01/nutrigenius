import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable optimization to allow images from any domain
    unoptimized: true,
  },
  allowedDevOrigins: ["http://192.168.1.39:3000"],
};

export default nextConfig;
