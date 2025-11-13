import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogById, getAllBlogIds } from '@/utils/blog';
import Link from 'next/link';
import type { Metadata } from 'next';

// This is KEY for performance: Pre-render all blog pages at build time
// Next.js will call this function to get all possible [blogId] values
export async function generateStaticParams() {
  const blogIds = getAllBlogIds();

  return blogIds.map((blogId) => ({
    blogId: blogId,
  }));
}

// Generate dynamic SEO metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> {
  const { blogId } = await params;
  const blog = getBlogById(blogId);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl],
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl],
    },
  };
}

// The actual page component
export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const blog = getBlogById(blogId);

  // If blog doesn't exist, show 404
  if (!blog) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Back button */}
        <Link
          href="/#blog"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to blogs
        </Link>

        {/* Blog header */}
        <article>
          <header className="mb-8">
            {/* Featured image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {blog.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{blog.author}</span>
              <span>•</span>
              <time dateTime={blog.date}>{formattedDate}</time>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </header>

          {/* Blog content - MDX rendered with Tailwind Typography */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:bg-gradient-to-r prose-headings:from-pink-500 prose-headings:via-purple-500 prose-headings:to-cyan-500 prose-headings:bg-clip-text prose-headings:text-transparent
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-pink-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-400
            prose-img:rounded-lg
            prose-table:text-gray-300
            prose-th:text-white
            prose-td:border-white/10
          ">
            <MDXRemote source={blog.content} />
          </div>
        </article>

        {/* Footer navigation could go here */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/#blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to all blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
