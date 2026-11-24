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
      // PSI 页的真实路径是 /services/psi，下面两个是同义写法，均 404
      { source: '/services/pre-shipment-inspection', destination: '/services/psi', permanent: true },
      { source: '/pre-shipment-inspection', destination: '/services/psi', permanent: true },
      // 2026-11-24 D9 复核 Cloudflare 近 26 天 404：以下为真实旧入口，非扫描路径
      { source: '/contactus.html', destination: '/contact', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/case-study', destination: '/case-studies', permanent: true },
      { source: '/inspections', destination: '/services', permanent: true },
      { source: '/report', destination: '/sample-report', permanent: true },
      { source: '/container-loading', destination: '/container-loading-supervision', permanent: true },
      { source: '/certification', destination: '/services', permanent: true },
      { source: '/es/inspeccion-de-fabrica', destination: '/es', permanent: true },
      // 旧站图标资源（浏览器/收藏夹仍在请求），统一回落到现有 favicon
      { source: '/favicon-32x32.png', destination: '/favicon.ico', permanent: true },
      { source: '/favicon.png', destination: '/favicon.ico', permanent: true },
      { source: '/apple-touch-icon.png', destination: '/icon.png', permanent: true },
      { source: '/assets/favicon.ico', destination: '/favicon.ico', permanent: true },
      { source: '/static/favicon.ico', destination: '/favicon.ico', permanent: true },
      { source: '/img/favicon.ico', destination: '/favicon.ico', permanent: true },
      { source: '/images/favicon.ico', destination: '/favicon.ico', permanent: true },
      { source: '/icon/favicon.ico', destination: '/favicon.ico', permanent: true },
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
