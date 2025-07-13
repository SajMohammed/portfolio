'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-[110%] md:w-[120%] h-full bg-black border-0 shadow-none relative overflow-visible">
      <Spotlight
        className="md:-top-40 md:left-0"
        fill="white"
      />
      
      {/* Make the 3D scene container take up more than full width to avoid clipping */}
      <div className="absolute inset-0 w-full md:w-full h-full pointer-events-none overflow-visible">
        <div className="w-[120%] h-[120%] md:ml-[-10%] overflow-visible relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full pointer-events-auto"
          />
          
          {/* Gradient overlay at the bottom of the 3D model */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)'
            }}
          />
          
          {/* Gradient overlay on the left side of the 3D model */}
          <div 
            className="absolute top-0 left-0 w-[220px] h-full pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>
      </div>
    </Card>
  )
} 