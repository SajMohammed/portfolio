"use client";

import { SplineSceneBasic } from "@/components/ui/demo";
import { ThreeScene } from "@/components/ui/three-scene";
import { TextColor } from "@/components/ui/text-color";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const textVariants = [
    "dreams in cloud architectures",
    "turns complex problems into elegant solutions"
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
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textAnimationVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col md:flex-row items-center overflow-visible">
      {/* Text container on the left */}
      <motion.div 
        className="w-full mt-60 md:w-2/5 z-20 py-12 flex flex-col items-start justify-center"
        initial="hidden"
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
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-left text-white"
          variants={itemVariants}
        >
          I build beautiful 
          <br className="hidden sm:block" />
          and powerful products
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 text-left">
            speaks fluent MERN, {" "}
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

        {/* Three.js Scene below text */}
        <motion.div
          className="w-full h-[400px] mt-6 bg-black/30 rounded-lg overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ThreeScene className="w-full h-full" />
        </motion.div>
      </motion.div>
      
      {/* 3D scene container on the right with extended width */}
      <motion.div 
        className="w-full md:w-3/5 md:absolute md:right-[-5%] h-[500px] md:h-full z-10 mt-[-50px] md:mt-0 overflow-visible"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <SplineSceneBasic />
      </motion.div>
    </div>
  );
} 