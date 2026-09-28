import path from "node:path";
import type { NextConfig } from "next";

const backendApiUrl =
  process.env.BACKEND_API_URL
    ?.trim()
    .replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  allowedDevOrigins: ["10.38.144.234"],

  turbopack: {
    root: path.resolve(__dirname),
  },

  async rewrites() {
    if (!backendApiUrl) {
      return [];
    }

    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendApiUrl}/api/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;