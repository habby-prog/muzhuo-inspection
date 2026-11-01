import { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

export default function robots(): MetadataRoute.Robots {
  const domain = SITE_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/order/success'],
    },
    sitemap: `${domain}/sitemap.xml`,
  }
}
