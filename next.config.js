/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.edigitalagency.com.au",
      "lh3.googleusercontent.com",
      "https://cdn.cms-twdigitalassets.com",
    ],
  },
};

module.exports = nextConfig;
