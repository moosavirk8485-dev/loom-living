import type { NextConfig } from "next";

// Set by the GitHub Pages workflow, e.g. "/loom-and-living". Empty for local dev.
const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages.
  // (Cache Components / partial prerendering are not supported in export mode.)
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // GitHub Pages has no image optimization server; Unsplash URLs are already sized.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
