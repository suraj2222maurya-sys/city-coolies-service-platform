import path from "node:path";
import type { NextConfig } from "next";

const backendApiUrl = process.env.BACKEND_API_URL
  ?.trim()
  .replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["10.38.144.234"],

  turbopack: {
    root: path.resolve(__dirname),
  },

  // CITY_COOLIES_AUTH_SAME_ORIGIN
  async rewrites() {
    const authBackendUrl = (
      process.env.CITY_COOLIES_AUTH_API_URL ||
      "https://city-coolies-backend.vercel.app"
    )
      .trim()
      .replace(/\/+$/, "");

    const parsed = new URL(authBackendUrl);

    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      throw new Error(
        "CITY_COOLIES_AUTH_API_URL must be a backend URL without credentials, query or fragment."
      );
    }

    if (
      process.env.NODE_ENV === "production" &&
      (
        parsed.protocol !== "https:" ||
        ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname)
      )
    ) {
      throw new Error(
        "Production authentication requires a public HTTPS Python backend URL."
      );
    }

    return {
      beforeFiles: [
        {
          source: "/auth/:path*",
          destination: `${authBackendUrl}/auth/:path*`,
        },
        ...(backendApiUrl
          ? [
              {
                source: "/api/:path*",
                destination: `${backendApiUrl}/api/:path*`,
              },
            ]
          : []),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;