/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com']
  }
}

module.exports = nextConfig

const withFonts = require('next-fonts');
module.exports = withFonts(nextConfig);