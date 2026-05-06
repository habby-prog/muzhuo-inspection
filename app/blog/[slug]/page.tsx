
import { client } from '../../lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    publishedAt,
    description
  }`;

  const post = await client.fetch(query, { slug });
  return post;
}

export async function generateStaticParams() {
    const query = `*[_type == "post"]{"slug": slug.current}`;
    const slugs = await client.fetch(query);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Post Not Found - Muzhuo Inspection' };
  }
  return {
    title: `${post.title} | Muzhuo Inspection Blog`,
    description: post.description || `Read about ${post.title} - Insights from Muzhuo Inspection on quality control, pre-shipment inspection, and factory audit services in China.`,
    openGraph: {
      title: post.title,
      description: post.description || `Quality control insights for importers`,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://muzhuoinspection.com/blog/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://muzhuoinspection.com/blog/${params.slug}`,
    },
  };
}

// Helper function to get image URL
const getImageUrl = (source: any) => {
    if (!source) return '/placeholder.svg';
    const ref = source.asset._ref;
    const dimensions = ref.split('-')[2];
    const [width, height] = dimensions.split('x');
    const extension = ref.split('-')[3];
    return `https://cdn.sanity.io/images/57037go6/production/${ref.replace('image-', '').replace(`-${extension}`, '.'+extension)}?w=800&auto=format`;
};

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-8 w-full h-96">
            <Image
                src={getImageUrl(value)}
                alt={value.alt || 'Image in article'}
                layout="fill"
                objectFit="contain"
            />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#';
      return (
        <a href={href} className="text-primary-600 underline hover:text-primary-800" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Article JSON-LD structured data for SEO
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName || 'Muzhuo Inspection',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Muzhuo Inspection',
      url: 'https://muzhuoinspection.com',
    },
    description: post.description || `Quality control insights for importers`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://muzhuoinspection.com/blog/${params.slug}`,
    },
  };

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/blog" className="hover:text-primary-600">Blog</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-700 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        {/* Article Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-4 text-sm text-gray-500">
            Published {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {post.authorName && ` by ${post.authorName}`}
          </p>
        )}
        {post.mainImage && (
            <div className="relative my-8 w-full h-96">
                <Image
                    src={getImageUrl(post.mainImage)}
                    alt={post.title || 'Main blog image'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
        )}
        <div className="prose prose-lg max-w-none mx-auto">
            {post.body && <PortableText value={post.body} components={ptComponents} />}
        </div>
      </div>
    </div>
  );
}

