import type { NextConfig } from "next";
import "./app/env";
import {createMDX} from 'fumadocs-mdx/next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};
const withMDX = createMDX();

export default withMDX(nextConfig);
