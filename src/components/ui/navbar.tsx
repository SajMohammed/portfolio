"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "About", href: "#about" },
  { name: "Stacks", href: "#stacks" },
  { name: "Work", href: "#work" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("#hero");
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1 over 100px of scrolling
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);

      // Determine which section is currently in view
      const sections = ["hero", ...menuItems.map(item => item.href.replace('#', ''))];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Check if we're on the homepage
    const isHomePage = pathname === '/';

    if (!isHomePage) {
      // If we're on a different page (like /blog/post), navigate to home with hash
      router.push(`/${href}`);
    } else {
      // If we're already on homepage, smooth scroll to section
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(href);
      }
    }
  };

  // Calculate dynamic styles based on scroll progress
  const dynamicStyles = useMemo(() => {
    const isAtTop = scrollProgress < 0.1;
    // Use fixed sizing (always minimized)
    const sizeProgress = 1;

    return {
      container: {
        padding: `${4 + (1 - sizeProgress) * 1.5}px ${3 + 6 * (1 - sizeProgress)}px`, // Fixed minimized padding
        maxWidth: `calc(100% - ${sizeProgress * 12}px)`, // Fixed minimized side margins
        marginLeft: `${sizeProgress * 6}px`,
        marginRight: `${sizeProgress * 6}px`,
        marginTop: '0.1rem',
        marginBottom: '0',
      },
      navbar: {
        maxWidth: '82rem', // Fixed minimized width
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0',
        marginBottom: '0',
        background: isAtTop
          ? 'rgba(255, 255, 255, 0.03)' // Almost invisible when not scrolling
          : `rgba(0, 0, 0, ${0.4 + scrollProgress * 0.2})`, // Darker when scrolling
        backdropFilter: `blur(${isAtTop ? 3 : 5 + scrollProgress * 7}px)`, // Minimal blur at top
        borderColor: isAtTop
          ? 'rgba(255, 255, 255, 0.08)' // Very subtle border when not scrolling
          : `rgba(255, 255, 255, ${0.1 + scrollProgress * 0.08})`,
        boxShadow: isAtTop
          ? '0 4px 20px rgba(0, 0, 0, 0.03)' // Almost invisible shadow at top
          : `0 4px 20px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`, // Stronger shadow when scrolling
        borderWidth: '1px',
        borderStyle: 'solid',
        transition: 'all 0.4s ease',
      },
      logo: {
        fontSize: `${1.3 - sizeProgress * 0.2}rem`, // Fixed minimized font size
        transform: `translateX(${sizeProgress * 25}%)`, // Fixed minimized position
        marginRight: `${sizeProgress * 1}rem`, // Fixed minimized margin
      },
      menuContainer: {
        transform: `translateX(${-sizeProgress * 25}%)`, // Fixed minimized position
        marginLeft: `${sizeProgress * 1}rem`, // Fixed minimized margin
      },
      menuGap: {
        gap: `${0.3 + sizeProgress * 0.6}rem`, // Fixed minimized gap
      },
      gradientOpacity: {
        opacity: scrollProgress * 0.8, // Gradient still responds to scroll
      },
      glassHighlight: {
        opacity: isAtTop ? 0.2 : 1 - scrollProgress * 0.7,
      }
    };
  }, [scrollProgress]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div 
        className="w-full transition-all duration-300 ease-in-out"
        style={dynamicStyles.container}
      >
        <div 
          className="pointer-events-auto rounded-full transition-all duration-500"
          style={dynamicStyles.navbar}
        >
          {/* Enhanced gradient effect - only visible when scrolling */}
          <div className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500"
               style={{ opacity: dynamicStyles.gradientOpacity.opacity }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-teal-500/10 animate-pulse" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-400/5" />
          </div>
          
          {/* Glass effect highlights - more visible when not scrolling */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/15 to-transparent" 
                 style={{ opacity: dynamicStyles.glassHighlight.opacity }} />
            <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-white/5 to-transparent"
                 style={{ opacity: dynamicStyles.glassHighlight.opacity * 0.5 }} />
          </div>
          
          {/* Content container */}
          <div className="relative z-10 flex items-center justify-between w-full px-3 md:px-4 py-1.5 md:py-2 transition-all duration-500">
            <div className="transition-all duration-500"
                style={{
                  transform: dynamicStyles.logo.transform,
                  marginRight: dynamicStyles.logo.marginRight
                }}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== '/') {
                    router.push('/');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="font-bold text-white transition-all duration-300 cursor-pointer"
                style={{ fontSize: dynamicStyles.logo.fontSize }}
              >
                SAJMO
              </a>
            </div>
            
            <div className="transition-all duration-500" 
                style={{ 
                  transform: dynamicStyles.menuContainer.transform,
                  marginLeft: dynamicStyles.menuContainer.marginLeft
                }}>
              <ul className="flex items-center transition-all duration-500" 
                  style={{ gap: dynamicStyles.menuGap.gap }}>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className={cn(
                        "relative px-1 md:px-2 py-1 text-xs sm:text-sm font-medium transition-colors duration-300", // Reduced padding and text size
                        item.href === activeSection 
                          ? "text-white" 
                          : "text-white/70 hover:text-white",
                        "group"
                      )}
                      onClick={(e) => scrollToSection(e, item.href)}
                      onMouseEnter={() => setHoverItem(item.href)}
                      onMouseLeave={() => setHoverItem(null)}
                    >
                      {item.name}
                      <span 
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-300", // Reduced height from 2px to 1.5px
                          item.href === activeSection || item.href === hoverItem
                            ? "scale-x-100"
                            : "scale-x-0"
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 