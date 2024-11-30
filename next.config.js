/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com', 'avatar.vercel.sh', 'assets.aceternity.com'],
    unoptimized: true,
  },
  basePath: '/elysia',
}

module.exports = nextConfig 