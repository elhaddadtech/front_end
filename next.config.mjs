/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Optional for creating a standalone application
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
