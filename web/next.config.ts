import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        port: "7777",
        hostname: "localhost",
        pathname: "/static/items/**",
      },
    ],
  },
};

export default nextConfig;
