/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["media-hosting.imagekit.io", "images.unsplash.com"], // si nécessaire
  },
};

module.exports = nextConfig;
