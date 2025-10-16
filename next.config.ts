import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //Required for GitHub Pages static deployment
  output: "export",

  // GitHub Pages serves your site under /the-qexai/, not root
  basePath: "/the-qexai",
  assetPrefix: "/the-qexai/",

  // Prevent Next.js image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  // Ensures pages end with /index.html for GitHub Pages routing
  trailingSlash: true,
};

export default nextConfig;
