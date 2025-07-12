"use client";

import { SplineSceneBasic } from "@/components/ui/demo";
import { TextColor } from "@/components/ui/text-color";
// import { LavaLamp } from "@/components/ui/fluidBlob";


export default function HeroSection() {
  return (
    <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col md:flex-row items-center overflow-visible">
      {/* Text container on the left */}
      <div className="w-full md:w-2/5 z-20 py-12 flex flex-col items-start justify-center">
        <TextColor 
          firstLine="Hi, I&apos;m SajMo,"
          className="mb-6"
        />
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-left text-white">
          I build beautiful 
          <br className="hidden sm:block" />
          and powerful products
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mt-4 text-left">
          using cutting edge technologies
        </p>
      </div>
      
      {/* 3D scene container on the right with extended width */}
      <div className="w-full md:w-3/5 md:absolute md:right-[-5%] h-[500px] md:h-full z-10 mt-[-50px] md:mt-0 overflow-visible">
        <SplineSceneBasic />
      </div>
    </div>
  );
} 