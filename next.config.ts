import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "172.19.240.1"],
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
