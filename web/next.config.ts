import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        port: "7777",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lp-api.fly0utwest.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "genqrcode.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
