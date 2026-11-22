/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // 旧版静态站遗留入口，仍有外链与抓取命中，统一永久跳到 /contact
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/contact_us.html', destination: '/contact', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // 旧版静态站首页/栏目页（.html），仍有外链与抓取命中
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.htm', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/blog.html', destination: '/blog', permanent: true },
      // CLS 两页关键词重叠，合并到长页，避免互相抢排名
      { source: '/services/cls', destination: '/container-loading-supervision', permanent: true },
      // 博客正文里指向的旧服务路径，现无对应页面，跳到质检服务主推页（PSI）
      { source: '/quality-inspection', destination: '/services/psi', permanent: true },
      { source: '/services/quality-inspection', destination: '/services/psi', permanent: true },
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
