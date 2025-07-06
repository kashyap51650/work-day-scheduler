import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
};

/* Comment Out this code to see the visual data of bundle size */

// Enable bundle analysis for production builds
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
