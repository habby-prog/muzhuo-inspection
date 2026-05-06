import { MetadataRoute } from 'next'
import { client } from './lib/sanity'

async function getBlogSlugs(): Promise<string[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
    const slugs = await client.fetch(query)
    return slugs.map((s: { slug: string }) => s.slug)
  } catch (e) {
    console.error('Failed to fetch blog slugs for sitemap:', e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.DOMAIN || 'https://muzhuoinspection.com'
  
  // Static pages
  const staticPages = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${domain}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${domain}/services/factory-audit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${domain}/services/psi`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${domain}/services/cls`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${domain}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic blog posts
  const blogSlugs = await getBlogSlugs()
  const blogPages = blogSlugs.map(slug => ({
    url: `${domain}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
