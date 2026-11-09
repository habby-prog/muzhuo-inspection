import { client } from '../../lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site';

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    publishedAt,
    _updatedAt,
    description
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

async function getRelatedPosts(slug: string) {
  const query = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  }`;
  return await client.fetch(query, { slug });
}

export async function generateStaticParams() {
    const query = `*[_type == "post"]{"slug": slug.current}`;
    const slugs = await client.fetch(query);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found - Muzhuo Inspection' };
  return {
    title: `${post.title} | Muzhuo Inspection Blog`,
    description: post.description || `Read about ${post.title} - Insights from Muzhuo Inspection on quality control, pre-shipment inspection, and factory audit services in China.`,
    openGraph: {
      title: post.title,
      description: post.description || `Quality control insights for importers`,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${SITE_URL}/blog/${params.slug}`,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
  };
}

const BLUE = '#2B7FD8';
const YELLOW = '#F4D758';
const RED = '#E84A5F';

const getImageUrl = (source: any) => {
    if (!source) return '/placeholder.svg';
    const ref = source.asset._ref;
    const dimensions = ref.split('-')[2];
    const [width, height] = dimensions.split('x');
    const extension = ref.split('-')[3];
    return `https://cdn.sanity.io/images/57037go6/production/${ref.replace('image-', '').replace(`-${extension}`, '.'+extension)}?w=800&auto=format`;
};

// Sanity 自定义区块里的文字有时是富文本数组（span 对象），直接渲染会报
// "Objects are not valid as a React child"。这里统一拍平成纯文本。
const toText = (v: any): string => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) return v.map(toText).join('');
  if (typeof v === 'object') return toText(v.text ?? v.children ?? '');
  return '';
};

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative my-10 w-full h-96 rounded-xl overflow-hidden shadow-md">
          <Image src={getImageUrl(value)} alt={value.alt || 'Image in article'} layout="fill" objectFit="contain" />
        </div>
      );
    },

    table: ({ value }: { value: any }) => {
      if (!value?.rows?.length) return null;
      return (
        <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ background: `linear-gradient(135deg, ${BLUE}, #1a5fa8)` }}>
              <tr>
                {value.rows[0].cells.map((cell: any, i: number) => (
                  <th key={i} className="px-4 py-3.5 text-left text-sm font-semibold text-white">{toText(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {value.rows.slice(1).map((row: any, ri: number) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.cells.map((cell: any, ci: number) => (
                    <td key={ci} className="px-4 py-3 text-sm text-gray-700">{toText(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    highlight: ({ value }: { value: any }) => {
      const icon = value.icon || '💡';
      return (
        <div className="my-6 p-5 rounded-xl border-l-4 flex gap-3" style={{ borderLeftColor: YELLOW, backgroundColor: '#FFFDF0' }}>
          <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
          <div className="prose prose-sm max-w-none text-gray-800">
            {toText(value.text)}
          </div>
        </div>
      );
    },

    'tip-box': ({ value }: { value: any }) => {
      return (
        <div className="my-6 p-5 rounded-xl flex gap-3 shadow-sm" style={{ backgroundColor: '#F0F7FF', borderLeft: `4px solid ${BLUE}` }}>
          <span className="text-xl flex-shrink-0 mt-0.5">{value.icon || '💡'}</span>
          <div>
            {value.title && <h4 className="font-bold text-sm mb-1" style={{ color: BLUE }}>{toText(value.title)}</h4>}
            <p className="text-sm text-gray-700">{toText(value.text)}</p>
          </div>
        </div>
      );
    },

    divider: () => {
      return (
        <div className="my-10 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${BLUE}40, transparent)` }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: YELLOW }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${BLUE}40, transparent)` }} />
        </div>
      );
    },

    'stat-highlight': ({ value }: { value: any }) => {
      return (
        <div className="my-6 p-5 rounded-xl text-center shadow-sm" style={{ backgroundColor: '#F0F7FF', border: `1px solid ${BLUE}20` }}>
          <div className="text-3xl font-bold mb-1" style={{ color: BLUE }}>{value.number || ''}</div>
          <p className="text-sm text-gray-600">{value.text || ''}</p>
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#';
      return (
        <a href={href} style={{ color: BLUE }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => {
      return <strong style={{ color: BLUE }}>{children}</strong>;
    },
    'highlight-mark': ({ children }: any) => {
      return <mark style={{ backgroundColor: `${YELLOW}60`, padding: '0 4px', borderRadius: '3px' }}>{children}</mark>;
    },
    'cta-mark': ({ children }: any) => {
      return <span className="font-bold" style={{ color: RED }}>{children}</span>;
    },
  },

  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-12 mb-5 pb-3" style={{
        color: BLUE,
        borderBottom: `3px solid ${YELLOW}`,
        paddingLeft: '14px',
        borderLeft: `4px solid ${BLUE}`,
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: BLUE }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 py-4 px-5 italic rounded-r-xl" style={{
        borderLeft: `4px solid ${YELLOW}`,
        backgroundColor: '#FFFDF0',
      }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return <div>Post not found</div>;

  const related = await getRelatedPosts(params.slug);
  const pageUrl = `${SITE_URL}/blog/${params.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { '@type': 'Organization', name: 'Muzhuo Inspection', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Muzhuo Inspection', url: SITE_URL },
    description: post.description || 'Quality control insights for importers',
    image: post.mainImage ? [getImageUrl(post.mainImage)] : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <nav className="flex mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a href="/" style={{ color: BLUE }} className="hover:opacity-80">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/blog" style={{ color: BLUE }} className="hover:opacity-80">Blog</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-500 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="mb-6">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${YELLOW}40`, color: '#8B7A20' }}>
            Blog
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight" style={{ color: BLUE }}>
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="mt-3 text-sm text-gray-400">
              Published {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {post.authorName && ` by ${post.authorName}`}
            </p>
          )}
        </div>

        {post.mainImage && (
          <div className="relative my-8 w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-md">
            <Image src={getImageUrl(post.mainImage)} alt={post.title || 'Main blog image'} layout="fill" objectFit="cover" />
          </div>
        )}

        <div className="mx-auto" style={{ maxWidth: '720px' }}>
          {post.body && <PortableText value={post.body} components={ptComponents} />}
        </div>

        {related && related.length > 0 && (
          <section className="mx-auto mt-16 border-t border-gray-200 pt-10" style={{ maxWidth: '720px' }} aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold mb-6" style={{ color: BLUE }}>
              Related reading
            </h2>
            <ul className="space-y-4">
              {related.map((r: any) => (
                <li key={r.slug}>
                  <a href={`/blog/${r.slug}`} className="block rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                    <span className="block font-semibold text-gray-800">{r.title}</span>
                    {r.publishedAt && (
                      <span className="mt-1 block text-sm text-gray-400">
                        {new Date(r.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
