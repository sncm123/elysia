/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'avatar.vercel.sh', 'assets.aceternity.com'],
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' ? { basePath: '/elysia' } : {})
}

module.exports = nextConfig 