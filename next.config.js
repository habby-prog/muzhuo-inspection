/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // 旧版静态站遗留入口，仍有外链与抓取命中，统一永久跳到 /contact
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/contact_us.html', destination: '/contact', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    ]
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
