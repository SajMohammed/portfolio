"use client";

import { Card } from "@/components/ui/card";
import { TextColor } from "@/components/ui/text-color";

export default function WorkSection() {
  // Mock project data
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online shopping platform with cart, payments, and admin panel.",
      imageUrl: "https://source.unsplash.com/random/800x600/?ecommerce",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"]
    },
    {
      title: "Finance Dashboard",
      description: "Interactive dashboard for tracking investments and financial metrics.",
      imageUrl: "https://source.unsplash.com/random/800x600/?finance",
      tags: ["React", "D3.js", "Firebase", "MaterialUI"]
    },
    {
      title: "Social Media App",
      description: "A mobile-first social platform with real-time messaging and content sharing.",
      imageUrl: "https://source.unsplash.com/random/800x600/?social",
      tags: ["React Native", "Socket.io", "Node.js", "AWS"]
    }
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <TextColor 
            firstLine="Curated Works."
            className="mb-6 flex justify-center"
          />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Check out some of my recent projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-blue-500/40 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 