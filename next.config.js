/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
