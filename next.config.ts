import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.38.144.234"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
