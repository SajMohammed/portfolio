'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the ContactShadows component with no SSR
const ContactShadowsComponent = dynamic(
  () => import('./contact-shadows').then(mod => mod.ContactShadows),
  { ssr: false }
)

interface ThreeSceneProps {
  className?: string
}

export function ThreeScene({ className = "" }: ThreeSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div className={className}>
        <ContactShadowsComponent />
      </div>
    </Suspense>
  )
} 