"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with current scroll position
    const initialProgress = Math.min(window.scrollY / 100, 1);
    let targetProgress = initialProgress;
    let currentProgress = initialProgress;
    let rafId: number;
    let lastUpdateTime = 0;
    const updateInterval = 1000 / 60; // 60fps

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateProgress = (timestamp: number) => {
      if (!navbarRef.current) {
        rafId = requestAnimationFrame(updateProgress);
        return;
      }

      // Throttle to 60fps
      if (timestamp - lastUpdateTime < updateInterval) {
        rafId = requestAnimationFrame(updateProgress);
        return;
      }
      lastUpdateTime = timestamp;

      // Smoothly interpolate
      const diff = Math.abs(currentProgress - targetProgress);
      const lerpFactor = 0.12; // Consistent smooth speed

      if (diff > 0.0001) {
        currentProgress = lerp(currentProgress, targetProgress, lerpFactor);

        // Update CSS variable directly on the element (no React re-render!)
        navbarRef.current.style.setProperty('--scroll-progress', currentProgress.toString());

        // Only update React state occasionally for other logic
        if (Math.abs(currentProgress - scrollProgress) > 0.01) {
          setScrollProgress(currentProgress);
        }
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    const handleScroll = () => {
      targetProgress = Math.min(window.scrollY / 100, 1);

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

    // Set initial CSS variable
    if (navbarRef.current) {
      navbarRef.current.style.setProperty('--scroll-progress', initialProgress.toString());
    }
    setScrollProgress(initialProgress);

    // Start animation loop
    rafId = requestAnimationFrame(updateProgress);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
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
    
    return {
      container: {
        padding: `${4 + (1 - scrollProgress) * 1.5}px ${3 + 6 * (1 - scrollProgress)}px`, // Reduced padding
        maxWidth: `calc(100% - ${scrollProgress * 12}px)`, // Reduced side margins
        marginLeft: `${scrollProgress * 6}px`,
        marginRight: `${scrollProgress * 6}px`,
        marginTop: '0.1rem',
        marginBottom: '0',
      },
      navbar: {
        maxWidth: scrollProgress < 0.5 ? '100%' : '44rem', // Reduced from 48rem to 44rem
        marginLeft: scrollProgress < 0.5 ? '0' : 'auto',
        marginRight: scrollProgress < 0.5 ? '0' : 'auto',
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
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
      },
      logo: {
        fontSize: `${1.3 - scrollProgress * 0.2}rem`,
        transform: `translate3d(${(scrollProgress * 25).toFixed(2)}%, 0, 0)`, // Use translate3d for GPU acceleration
        marginRight: `${(scrollProgress * 1).toFixed(3)}rem`,
      },
      menuContainer: {
        transform: `translate3d(${(-scrollProgress * 25).toFixed(2)}%, 0, 0)`, // Use translate3d for GPU acceleration
        marginLeft: `${(scrollProgress * 1).toFixed(3)}rem`,
      },
      menuGap: {
        gap: `${0.3 + scrollProgress * 0.6}rem`, // Reduced base gap from 0.5 to 0.3
      },
      gradientOpacity: {
        opacity: 1, // Always visible - gradient effect in both states
      },
      glassHighlight: {
        opacity: isAtTop ? 0.2 : 1 - scrollProgress * 0.7,
      }
    };
  }, [scrollProgress]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none" ref={navbarRef} style={{ '--scroll-progress': scrollProgress } as React.CSSProperties}>
      <div
        className="w-full"
        style={{
          ...dynamicStyles.container,
          willChange: 'padding, max-width, margin',
        }}
      >
        <div
          className="pointer-events-auto rounded-full"
          style={dynamicStyles.navbar}
        >
          {/* Enhanced gradient effect - always visible in both states */}
          <div className="absolute inset-0 rounded-full overflow-hidden"
               style={{
                 opacity: dynamicStyles.gradientOpacity.opacity,
                 transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-teal-500/10 animate-pulse"
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-400/5" />
          </div>
          
          {/* Glass effect highlights - more visible when not scrolling */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/15 to-transparent"
                 style={{
                   opacity: dynamicStyles.glassHighlight.opacity,
                   transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                 }} />
            <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-white/5 to-transparent"
                 style={{
                   opacity: dynamicStyles.glassHighlight.opacity * 0.5,
                   transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                 }} />
          </div>

          {/* Content container */}
          <div className="relative z-10 flex items-center justify-between w-full px-3 md:px-4 py-1.5 md:py-2"
               style={{ transformStyle: 'preserve-3d' }}>
            <div
                style={{
                  transform: 'translate3d(calc(var(--scroll-progress) * 25%), 0, 0)',
                  marginRight: 'calc(var(--scroll-progress) * 1rem)',
                  willChange: 'transform, margin-right',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                } as React.CSSProperties}>
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
                className="font-bold text-white cursor-pointer"
                style={{
                  fontSize: `calc(1.3rem - var(--scroll-progress) * 0.2rem)`,
                  willChange: 'font-size',
                } as React.CSSProperties}
              >
                SAJMO
              </a>
            </div>

            <div
                style={{
                  transform: 'translate3d(calc(var(--scroll-progress) * -25%), 0, 0)',
                  marginLeft: 'calc(var(--scroll-progress) * 1rem)',
                  willChange: 'transform, margin-left',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                } as React.CSSProperties}>
              <ul className="flex items-center"
                  style={{
                    gap: 'calc(0.3rem + var(--scroll-progress) * 0.6rem)',
                    willChange: 'gap',
                  } as React.CSSProperties}>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={cn(
                        "relative px-1 md:px-2 py-1 text-xs sm:text-sm font-medium",
                        item.href === activeSection
                          ? "text-white"
                          : "text-white/70 hover:text-white",
                        "group"
                      )}
                      style={{
                        transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onClick={(e) => scrollToSection(e, item.href)}
                      onMouseEnter={() => setHoverItem(item.href)}
                      onMouseLeave={() => setHoverItem(null)}
                    >
                      {item.name}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                          item.href === activeSection || item.href === hoverItem
                            ? "scale-x-100"
                            : "scale-x-0"
                        )}
                        style={{
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
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