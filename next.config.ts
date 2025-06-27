import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  output: "export",
  images: {
    domains: ["res.cloudinary.com"],
  },

  // // ✅ Ignore ESLint build errors temporarily on Vercel
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // // ✅ Ignore TypeScript build errors temporarily
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
