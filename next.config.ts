import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 7, // Cache 1 semaine
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '**',
      },
    ],
    qualities: [50, 75, 85, 90, 95, 100],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/lib/icons/{{member}}',
    },
  },

  async headers() {
    const oneWeek = 'public,max-age=604800,stale-while-revalidate=86400';
    const securityHeaders = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      { source: '/:path*.png', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.jpg', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.jpeg', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.webp', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.avif', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.svg', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.gif', headers: [{ key: 'Cache-Control', value: oneWeek }] },
    ];
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default config;
