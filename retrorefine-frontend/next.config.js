/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    SCRAPER_URL: process.env.SCRAPER_URL,
  },
  images: {
    domains: [
      'i.ebayimg.com',
      'images-na.ssl-images-amazon.com',
      'target.scene7.com',
      'pisces.bbystatic.com',
      'media.gamestop.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
};