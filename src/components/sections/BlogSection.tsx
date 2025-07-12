"use client";

import { Card } from "@/components/ui/card";

export default function BlogSection() {
  const posts = [
    {
      title: "Building Modern Web Applications with Next.js",
      date: "October 15, 2023",
      excerpt: "Learn how to leverage Next.js features to create fast, SEO-friendly web applications.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "The Future of 3D on the Web",
      date: "September 22, 2023",
      excerpt: "Exploring WebGL, Three.js, and the evolving landscape of 3D web development.",
      imageUrl: "https://images.unsplash.com/photo-1544159893-c59178c95b31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Designing for Accessibility",
      date: "August 5, 2023",
      excerpt: "Best practices for creating inclusive web experiences that work for everyone.",
      imageUrl: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            From My Blog
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on web development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-pink-500/40 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400 mb-2">{post.date}</div>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <a href="#" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  Read More
                  <span className="ml-1">→</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 