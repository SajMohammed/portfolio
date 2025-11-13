import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types for our blog posts
export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
  readTime: string;
}

export interface BlogPost extends BlogMetadata {
  id: string; // filename without extension (URL slug)
  content: string; // MDX content
}

// Path to the blogs directory
const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

/**
 * Get all blog posts with their metadata
 * Returns sorted by date (newest first)
 */
export function getAllBlogs(): BlogPost[] {
  // Get all .mdx files from the blogs directory
  const fileNames = fs.readdirSync(blogsDirectory);

  const allBlogs = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Get the blog id (filename without .mdx extension)
      const id = fileName.replace(/\.mdx$/, '');

      // Read the MDX file
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter and content using gray-matter
      const { data, content } = matter(fileContents);

      return {
        id,
        content,
        ...(data as BlogMetadata),
      };
    });

  // Sort by date (newest first)
  return allBlogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single blog post by its ID (slug)
 */
export function getBlogById(id: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      id,
      content,
      ...(data as BlogMetadata),
    };
  } catch (error) {
    // File doesn't exist
    return null;
  }
}

/**
 * Get all blog IDs for static generation
 * Used by Next.js generateStaticParams
 */
export function getAllBlogIds(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get blog metadata only (without content)
 * Useful for listing pages where you don't need full content
 */
export function getBlogMetadata(): Array<BlogMetadata & { id: string }> {
  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Only parse frontmatter, not content
      const { data } = matter(fileContents);

      return {
        id,
        ...(data as BlogMetadata),
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
