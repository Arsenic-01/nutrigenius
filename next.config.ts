import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable optimization to allow images from any domain
    unoptimized: true,
  },
};

export default nextConfig;
