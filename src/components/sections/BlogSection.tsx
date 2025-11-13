import { TextColor } from "@/components/ui/text-color";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogMetadata } from "@/utils/blog";

export default function BlogSection() {
  // Get all blog posts from MDX files
  const blogs = getBlogMetadata();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <TextColor
            firstLine="From My Blog."
            className="mb-6 flex justify-center"
          />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} id={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
} 