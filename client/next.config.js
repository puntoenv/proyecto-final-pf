/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "olondriz.com",
      "cdn2.thedogapi.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
};

module.exports = nextConfig;
