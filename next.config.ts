const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  // Par défaut, cela pointe vers './i18n/request.ts'
});

module.exports = withNextIntl({
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['media-hosting.imagekit.io', 'images.unsplash.com'],
  },
});