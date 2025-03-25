/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5555",
        pathname: "/items/**",
      },
    ],
  },
};

module.exports = nextConfig;
