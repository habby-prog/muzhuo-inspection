import { MetadataRoute } from 'next'
import { client } from './lib/sanity'
import { SITE_URL } from './lib/site'

// 每小时重新生成，保证新发布的文章能及时进 sitemap
export const revalidate = 3600

async function getBlogEntries(): Promise<{ slug: string; updated: string }[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updated": coalesce(_updatedAt, publishedAt)
    }`
    const rows = await client.fetch(query)
    return rows.filter((r: any) => r.slug)
  } catch (e) {
    console.error('Failed to fetch blog slugs for sitemap:', e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = SITE_URL

  const staticPages: MetadataRoute.Sitemap = [
    { url: domain, changeFrequency: 'monthly', priority: 1 },
    { url: `${domain}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/services/factory-audit`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${domain}/services/psi`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${domain}/services/cls`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${domain}/aql-calculator`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${domain}/blog`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${domain}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${domain}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${domain}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${domain}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const posts = await getBlogEntries()
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${domain}/blog/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
