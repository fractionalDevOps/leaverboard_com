import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: "/public",
  },
};

export default nextConfig;
