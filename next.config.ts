import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin({
  // Par défaut : './i18n/request.ts'
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },

  eslint: { ignoreDuringBuilds: true },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/lib/icons/{{member}}',
    },
  },

  // next.config.ts
  async headers() {
    const oneWeek = 'public,max-age=604800,stale-while-revalidate=86400';
  
    return [
      { source: '/:path*.png',  headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.jpg',  headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.jpeg', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.webp', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.avif', headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.svg',  headers: [{ key: 'Cache-Control', value: oneWeek }] },
      { source: '/:path*.gif',  headers: [{ key: 'Cache-Control', value: oneWeek }] },
    ];
  },
  

};

export default withNextIntl(nextConfig);
