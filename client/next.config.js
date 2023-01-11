/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "cdn2.thedogapi.com",
      "olondriz.com",
      "random.imagecdn.app",
      "gfycat.com",
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "images.unsplash.com",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
