'use client'

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface BoxProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  color?: string;
}

// Simple mesh with animation
function Box(props: BoxProps) {
  const meshRef = useRef<Mesh>(null);
  const frameCount = useRef(0);
  const isDev = process.env.NODE_ENV === 'development';
  
  useFrame((state, delta) => {
    // Throttle animation in development
    if (isDev) {
      frameCount.current++;
      if (frameCount.current % 2 !== 0) return;
    }
    
    if (meshRef.current) {
      const speed = isDev ? 0.2 : 0.5;
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * (speed * 1.4);
    }
  });
  
  return (
    <mesh ref={meshRef} position={props.position} scale={props.scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || "white"} />
    </mesh>
  );
}

// Scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Box position={[-1.5, 0, 0]} color="#ff9999" />
      <Box position={[1.5, 0, 0]} scale={0.8} color="#9999ff" />
      
      <OrbitControls enableZoom={false} />
    </>
  );
}

export function SimpleScene() {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: !isDev,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={isDev ? 1 : undefined}
        frameloop={isDev ? 'demand' : 'always'}
      >
        <Scene />
      </Canvas>
    </div>
  );
} 