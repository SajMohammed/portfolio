"use client";

import React from 'react';
import Link from 'next/link';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="w-full border-t border-white/10 mt-auto backdrop-blur-sm bg-gradient-to-b from-black/90 to-[#673ab7]/10 relative">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <h3 className="text-white font-semibold mb-3">SAJMO.</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Creating digital experiences with a focus on performance, accessibility, and beautiful design.
            </p>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold">Links</h3>
              <button 
                onClick={scrollToTop}
                className="bg-purple-500/20 hover:bg-purple-500/40 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 cursor-pointer"
                aria-label="Scroll to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
            <ul className="space-y-1">
              <li>
                <Link href="/#about" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5">
          <p className="text-sm text-gray-400">
            © {currentYear} Saj Mohammed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 