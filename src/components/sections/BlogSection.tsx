"use client";

import { Card } from "@/components/ui/card";
import { TextColor } from "@/components/ui/text-color";

export default function BlogSection() {
  // Mock blog posts
  const posts = [
    {
      title: "Building a Real-time Dashboard with Next.js",
      excerpt: "Learn how to create a real-time dashboard using Next.js, WebSockets, and Redis",
      date: "May 15, 2023",
      imageUrl: "https://source.unsplash.com/random/800x600/?code",
    },
    {
      title: "Authentication Patterns in Modern Web Apps",
      excerpt: "Explore different authentication strategies and when to use them in your applications",
      date: "April 22, 2023",
      imageUrl: "https://source.unsplash.com/random/800x600/?security",
    },
    {
      title: "Optimizing Performance in React Applications",
      excerpt: "Tips and techniques for making your React apps blazingly fast",
      date: "March 10, 2023",
      imageUrl: "https://source.unsplash.com/random/800x600/?fast",
    }
  ];

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