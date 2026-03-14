import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactCompiler: true,
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Console Ninja during development
      config.externals = config.externals || [];
      config.externals.push('wallabyjs.console-ninja');
    }
    return config;
  },
};

export default nextConfig;
