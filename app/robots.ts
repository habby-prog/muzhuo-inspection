import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.DOMAIN || 'https://muzhuoinspection.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/order/success'],
    },
    sitemap: `${domain}/sitemap.xml`,
  }
}
