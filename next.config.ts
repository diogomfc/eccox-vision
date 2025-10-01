import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: ".",
  basePath: "",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  trailingSlash: false,
  distDir: 'out'
};

export default nextConfig;
