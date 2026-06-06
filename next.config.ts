import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // 複数 lockfile 環境で workspace root を本プロジェクトに固定
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
