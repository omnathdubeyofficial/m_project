import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        unoptimized: true, // Important for static export

    domains: [
      "res.cloudinary.com",
      "images.pexels.com",
      "via.placeholder.com"
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
