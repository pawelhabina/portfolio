import type { NextConfig } from 'next';

const nextConfig: NextConfig =
  process.env.PORTFOLIO_TARGET === 'static' ? { output: 'export' } : {};

export default nextConfig;
