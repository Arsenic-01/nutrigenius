import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // This allows any hostname, which is convenient for development
        // when image sources are unpredictable.
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
