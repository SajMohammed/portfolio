"use client";

import { GridScan } from "@/components/ui/grid-scan";
import { TextColor } from "@/components/ui/text-color";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const isDev = process.env.NODE_ENV === 'development';

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const textVariants = [
    "Dreams in cloud architectures",
    "Turns complex problems into elegant solutions",
    "Builds products that are user-friendly, scalable, and efficient",
    "Codes in components, thinks in microservices",
    "Dreams in algorithms, wakes up with solutions",
    "Architects systems that scale", 
    "Writes code that's modular, readable, and maintainable",
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Text rotation logic
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % textVariants.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isDev ? 0 : 0.3,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isDev ? 0 : 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textAnimationVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isDev ? 0 : 0.5
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: isDev ? 0 : 0.3
      }
    }
  };

  return (
    <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-8 relative flex items-center justify-center">
      {/* GridScan background - full viewport */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-screen h-screen z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#9c40ff"
          scanOpacity={0.2}
          enablePost
          bloomIntensity={0.3}
          chromaticAberration={0.001}
          noiseIntensity={0.01}
          scanDuration={4.0}
          scanDelay={3.0}
        />
      </div>

      {/* Content container centered on top */}
      <motion.div 
        className="w-full z-20 flex flex-col items-center justify-center text-center"
        initial={isDev ? "visible" : "hidden"}
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <TextColor 
            firstLine="Hi, I&apos;m SajMo."
            className="mb-6"
          />
        </motion.div>
        
        <motion.div 
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-white"
          variants={itemVariants}
        >
          I build beautiful and powerful products
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 text-center">
            {isClient ? (
              <span className="inline-block min-h-[1.5em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={textAnimationVariants}
                    className="inline-block"
                    transition={{ duration: 0.5 }}
                  >
                    {textVariants[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            ) : (
              "dreams in cloud architectures, and turns complex business problems into elegant, scalable solutions"
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 