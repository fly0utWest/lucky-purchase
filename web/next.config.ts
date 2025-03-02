import { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        port: "5555",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
