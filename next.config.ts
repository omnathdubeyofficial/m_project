import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // ✅ Cloudinary से इमेज लोड करने की अनुमति
  },
};

export default nextConfig;
