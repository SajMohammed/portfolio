import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { BlogMetadata } from '@/utils/blog';

interface BlogCardProps {
  id: string;
  blog: BlogMetadata;
}

export default function BlogCard({ id, blog }: BlogCardProps) {
  // Format the date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${id}`} className="block group">
      <Card className="bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden group-hover:border-pink-500/40 transition-all duration-300 h-full flex flex-col">
        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content section */}
        <div className="p-6 flex flex-col flex-1">
          {/* Date and read time */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <time dateTime={blog.date}>{formattedDate}</time>
            {blog.readTime && (
              <>
                <span>•</span>
                <span>{blog.readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 mb-4 flex-1 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read more link */}
          <div className="flex items-center text-purple-400 group-hover:text-purple-300 text-sm font-medium transition-colors">
            Read More
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
