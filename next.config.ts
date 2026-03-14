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
  // Disable caching for dynamic routes
  async headers() {
    return [
      {
        source: "/products/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
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
