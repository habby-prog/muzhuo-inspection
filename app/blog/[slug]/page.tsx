
import { client } from '../../lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    publishedAt
  }`;

  const post = await client.fetch(query, { slug });
  return post;
}

export async function generateStaticParams() {
    const query = `*[_type == "post"]{"slug": slug.current}`;
    const slugs = await client.fetch(query);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
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
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
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

