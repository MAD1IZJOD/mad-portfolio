
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create floating spheres with mystic jade and pale white colors
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    const jadeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x77A8A8, 
      roughness: 0.3,
      metalness: 0.6 
    });
    const jadeSphere = new THREE.Mesh(sphereGeometry, jadeMaterial);
    jadeSphere.position.set(-2, 0, 0);
    jadeSphere.scale.set(0.6, 0.6, 0.6);
    scene.add(jadeSphere);
    
    const whiteMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7E7CEE, 
      roughness: 0.2,
      metalness: 0.8 
    });
    const whiteSphere = new THREE.Mesh(sphereGeometry, whiteMaterial);
    whiteSphere.position.set(2, 0, 0);
    whiteSphere.scale.set(0.8, 0.8, 0.8);
    scene.add(whiteSphere);
    
    // Position camera
    camera.position.z = 6;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation of spheres
      jadeSphere.rotation.x += 0.003;
      jadeSphere.rotation.y += 0.005;
      
      whiteSphere.rotation.x += 0.005;
      whiteSphere.rotation.y += 0.003;
      
      // Subtle floating motion using sine waves
      const time = Date.now() * 0.001;
      jadeSphere.position.y = Math.sin(time * 0.8) * 0.3;
      whiteSphere.position.y = Math.sin(time * 0.6 + 1) * 0.5;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none opacity-30 md:opacity-50"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeScene;
