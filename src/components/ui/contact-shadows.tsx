'use client'

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Constants for the plane and camera
const PLANE_WIDTH = 2.8;    // Reduced from 3.0 but still larger than original
const PLANE_HEIGHT = 2.8;   // Reduced from 3.0 but still larger than original
const CAMERA_HEIGHT = 0.4;  // Keep the same

// The main Scene component that implements the contact shadows example
function Scene() {
  // References for various elements
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const sceneGroupRef = useRef<THREE.Group>(null);
  const shadowGroupRef = useRef<THREE.Group>(null);
  const renderTargetRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const renderTargetBlurRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const shadowCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const blurPlaneRef = useRef<THREE.Mesh | null>(null);
  const fillPlaneRef = useRef<THREE.Mesh | null>(null);
  const depthMaterialRef = useRef<THREE.MeshDepthMaterial | null>(null);
  const horizontalBlurMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const verticalBlurMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const cameraHelperRef = useRef<THREE.CameraHelper | null>(null);

  // Shadow state
  const shadowState = useRef({
    blur: 4.0,               // Increased from 3.5 for softer shadows
    darkness: 1.2,           // Increased from 1.0 for stronger shadows
    opacity: 1,
    planeColor: '#000000',   // Dark theme
    planeOpacity: 0.6,       // Semi transparent 
  });

  // Get access to the THREE renderer and scene
  const { gl, scene } = useThree();

  // Setup the scene on component mount
  useEffect(() => {
    // Create a group for the entire scene that will rotate
    const sceneGroup = new THREE.Group();
    sceneGroupRef.current = sceneGroup;
    scene.add(sceneGroup);
    
    // Create the shadow group
    const shadowGroup = new THREE.Group();
    shadowGroup.position.y = -0.3;
    shadowGroupRef.current = shadowGroup;
    scene.add(shadowGroup);

    // Create render targets
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    renderTarget.texture.generateMipmaps = false;
    renderTargetRef.current = renderTarget;

    const renderTargetBlur = new THREE.WebGLRenderTarget(512, 512);
    renderTargetBlur.texture.generateMipmaps = false;
    renderTargetBlurRef.current = renderTargetBlur;

    // Create the shadow camera
    const shadowCamera = new THREE.OrthographicCamera(
      -PLANE_WIDTH / 2, PLANE_WIDTH / 2, 
      PLANE_HEIGHT / 2, -PLANE_HEIGHT / 2, 
      0, CAMERA_HEIGHT
    );
    shadowCamera.rotation.x = Math.PI / 2; // look up
    shadowCameraRef.current = shadowCamera;
    shadowGroup.add(shadowCamera);

    // Create camera helper for debugging
    const cameraHelper = new THREE.CameraHelper(shadowCamera);
    cameraHelper.visible = false;
    cameraHelperRef.current = cameraHelper;

    // Create plane geometries
    const planeGeometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT).rotateX(Math.PI / 2);

    // Create plane with shadow texture
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: renderTarget.texture,
      transparent: true,
      opacity: shadowState.current.opacity,
      depthWrite: false
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.renderOrder = 1;
    plane.scale.y = -1; // flip the y
    planeRef.current = plane;
    shadowGroup.add(plane);

    // Create the blur plane
    const blurPlane = new THREE.Mesh(planeGeometry);
    blurPlane.visible = false;
    blurPlaneRef.current = blurPlane;
    shadowGroup.add(blurPlane);

    // Create fill plane
    const fillPlaneMaterial = new THREE.MeshBasicMaterial({
      color: shadowState.current.planeColor,
      opacity: shadowState.current.planeOpacity,
      transparent: true,
      depthWrite: false
    });
    const fillPlane = new THREE.Mesh(planeGeometry, fillPlaneMaterial);
    fillPlane.rotateX(Math.PI);
    fillPlaneRef.current = fillPlane;
    shadowGroup.add(fillPlane);

    // Create depth material
    const depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.userData.darkness = { value: shadowState.current.darkness };
    depthMaterial.onBeforeCompile = function(shader) {
      shader.uniforms.darkness = depthMaterial.userData.darkness;
      shader.fragmentShader = /* glsl */`
        uniform float darkness;
        ${shader.fragmentShader.replace(
          'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
          'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );'
        )}
      `;
    };
    depthMaterial.depthTest = false;
    depthMaterial.depthWrite = false;
    depthMaterialRef.current = depthMaterial;

    // Create horizontal blur material
    const horizontalBlurMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        h: { value: 1.0 / 512.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float h;
        varying vec2 vUv;
        void main() {
          vec4 sum = vec4(0.0);
          sum += texture2D(tDiffuse, vec2(vUv.x - 4.0 * h, vUv.y)) * 0.051;
          sum += texture2D(tDiffuse, vec2(vUv.x - 3.0 * h, vUv.y)) * 0.0918;
          sum += texture2D(tDiffuse, vec2(vUv.x - 2.0 * h, vUv.y)) * 0.12245;
          sum += texture2D(tDiffuse, vec2(vUv.x - 1.0 * h, vUv.y)) * 0.1531;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.1633;
          sum += texture2D(tDiffuse, vec2(vUv.x + 1.0 * h, vUv.y)) * 0.1531;
          sum += texture2D(tDiffuse, vec2(vUv.x + 2.0 * h, vUv.y)) * 0.12245;
          sum += texture2D(tDiffuse, vec2(vUv.x + 3.0 * h, vUv.y)) * 0.0918;
          sum += texture2D(tDiffuse, vec2(vUv.x + 4.0 * h, vUv.y)) * 0.051;
          gl_FragColor = sum;
        }
      `
    });
    horizontalBlurMaterial.depthTest = false;
    horizontalBlurMaterialRef.current = horizontalBlurMaterial;

    // Create vertical blur material
    const verticalBlurMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        v: { value: 1.0 / 512.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float v;
        varying vec2 vUv;
        void main() {
          vec4 sum = vec4(0.0);
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 4.0 * v)) * 0.051;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 3.0 * v)) * 0.0918;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 2.0 * v)) * 0.12245;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 1.0 * v)) * 0.1531;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.1633;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 1.0 * v)) * 0.1531;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 2.0 * v)) * 0.12245;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 3.0 * v)) * 0.0918;
          sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 4.0 * v)) * 0.051;
          gl_FragColor = sum;
        }
      `
    });
    verticalBlurMaterial.depthTest = false;
    verticalBlurMaterialRef.current = verticalBlurMaterial;

    // Add the example meshes
    const geometries = [
      new THREE.BoxGeometry(0.4, 0.4, 0.4),           // Reduced from 0.5
      new THREE.IcosahedronGeometry(0.3),             // Reduced from 0.4
      new THREE.TorusKnotGeometry(0.4, 0.06, 256, 24, 1, 3)  // Reduced from 0.5, 0.07
    ];

    const material = new THREE.MeshNormalMaterial();
    const meshes: THREE.Mesh[] = [];
    
    const spacingFactor = 0.6;  // Reduced from 0.7 to bring objects slightly closer to center

    for (let i = 0, l = geometries.length; i < l; i++) {
      const angle = (i / l) * Math.PI * 2;
      const geometry = geometries[i];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0.15;  // Raised slightly
      mesh.position.x = Math.cos(angle) * spacingFactor;  // Increased spacing
      mesh.position.z = Math.sin(angle) * spacingFactor;  // Increased spacing
      mesh.castShadow = true;
      sceneGroup.add(mesh);
      meshes.push(mesh);
    }
    meshesRef.current = meshes;

    // Clean up
    return () => {
      if (renderTargetRef.current) renderTargetRef.current.dispose();
      if (renderTargetBlurRef.current) renderTargetBlurRef.current.dispose();
      scene.remove(sceneGroup);
      scene.remove(shadowGroup);
    };
  }, [scene]);

  // Blur shadow function
  const blurShadow = (amount: number) => {
    if (!blurPlaneRef.current || !renderTargetRef.current || !renderTargetBlurRef.current || 
        !shadowCameraRef.current || !horizontalBlurMaterialRef.current || !verticalBlurMaterialRef.current) {
      return;
    }

    const blurPlane = blurPlaneRef.current;
    const renderTarget = renderTargetRef.current;
    const renderTargetBlur = renderTargetBlurRef.current;
    const shadowCamera = shadowCameraRef.current;
    const horizontalBlurMaterial = horizontalBlurMaterialRef.current;
    const verticalBlurMaterial = verticalBlurMaterialRef.current;

    blurPlane.visible = true;

    // Horizontal blur
    blurPlane.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = amount * 1 / 256;

    gl.setRenderTarget(renderTargetBlur);
    gl.render(blurPlane, shadowCamera);

    // Vertical blur
    blurPlane.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = amount * 1 / 256;

    gl.setRenderTarget(renderTarget);
    gl.render(blurPlane, shadowCamera);

    blurPlane.visible = false;
  };

  // Animation loop with frame throttling
  const frameCount = useRef(0);
  const isDev = process.env.NODE_ENV === 'development';
  
  useFrame((state, delta) => {
    if (!meshesRef.current.length || !shadowCameraRef.current || !renderTargetRef.current || 
        !depthMaterialRef.current || !cameraHelperRef.current) {
      return;
    }
    
    // Throttle frames in development
    if (isDev) {
      frameCount.current++;
      if (frameCount.current % 3 !== 0) return;
    }
    
    // Slowly rotate the whole scene group
    if (sceneGroupRef.current) {
      const speed = isDev ? 0.02 : 0.05;
      sceneGroupRef.current.rotation.y += delta * speed;
    }

    // Animate individual meshes with slower rotation
    const rotSpeed = isDev ? 0.002 : 0.005;
    meshesRef.current.forEach(mesh => {
      mesh.rotation.x += rotSpeed;
      mesh.rotation.y += rotSpeed * 1.6;
    });

    // Shadow rendering process
    const initialBackground = scene.background;
    scene.background = null;

    // Force the depthMaterial to everything
    cameraHelperRef.current.visible = false;
    const overrideMaterialBackup = scene.overrideMaterial;
    scene.overrideMaterial = depthMaterialRef.current;

    // Set renderer clear alpha
    const initialClearAlpha = gl.getClearAlpha();
    gl.setClearAlpha(0);

    // Render to the render target to get the depths
    gl.setRenderTarget(renderTargetRef.current);
    gl.render(scene, shadowCameraRef.current);

    // Reset the override material
    scene.overrideMaterial = overrideMaterialBackup;
    cameraHelperRef.current.visible = false;

    // Blur passes
    blurShadow(shadowState.current.blur);
    blurShadow(shadowState.current.blur * 0.4);

    // Reset and render the normal scene
    gl.setRenderTarget(null);
    gl.setClearAlpha(initialClearAlpha);
    scene.background = initialBackground;
  });

  return (
    <>
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI/4}
        maxPolarAngle={Math.PI/2}
      />
    </>
  );
}

export function ContactShadows() {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0.7, 1.2, 2.5], fov: 42 }}
        gl={{ 
          antialias: !isDev,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={isDev ? 1 : undefined}
        frameloop={isDev ? 'demand' : 'always'}
      >
        <color attach="background" args={['black']} />
        <Scene />
      </Canvas>
    </div>
  );
} 