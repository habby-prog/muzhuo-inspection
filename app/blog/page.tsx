
import { client } from '../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "currentSlug": slug.current,
    mainImage,
    publishedAt
  }`;

  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts;
}

// Helper function to format date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default async function BlogPage() {
  const posts = await getPosts();

  // Helper function to get image URL from Sanity asset reference
  const getImageUrl = (source: any) => {
      if (!source) return '/placeholder.svg';
      // A simplified URL builder. For production, you'd use @sanity/image-url
      const ref = source.asset._ref;
      const dimensions = ref.split('-')[2];
      const [width, height] = dimensions.split('x');
      const extension = ref.split('-')[3];
      return `https://cdn.sanity.io/images/57037go6/production/${ref.replace('image-', '').replace(`-${extension}`, '.'+extension)}?w=400&h=${Math.round(400 * (Number(height) / Number(width)))}&auto=format&fit=crop`;
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay up to date with the latest industry news and insights from our team.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: any) => (
            <article key={post.currentSlug} className="flex max-w-xl flex-col items-start justify-between">
                <Link href={`/blog/${post.currentSlug}`} className="block w-full">
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={getImageUrl(post.mainImage)}
                            alt={post.title || 'Blog post image'}
                            layout="fill"
                            objectFit="cover"
                            className="hover:opacity-90 transition-opacity duration-300"
                        />
                    </div>
                </Link>
              <div className="flex items-center gap-x-4 text-xs mt-4">
                <time dateTime={post.publishedAt} className="text-gray-500">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link href={`/blog/${post.currentSlug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
