import { useRef, useState } from 'react';
import { Plane, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ArtworkProps } from '../../types/gallery';
import { useGalleryStore } from '../../store/galleryStore';

export function ArtworkFrame({ position, rotation, artwork }: ArtworkProps) {
  const frameRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const { camera } = useThree();
  const setSelectedArtwork = useGalleryStore((state) => state.setSelectedArtwork);

  useFrame(({ clock, camera }) => {
    if (frameRef.current && textRef.current) {
      // Subtle floating animation
      frameRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.05;
      textRef.current.position.y = position[1] - 1.2 + Math.sin(clock.getElapsedTime()) * 0.05;
      
      // Check distance to camera
      const distance = new THREE.Vector3(...position).distanceTo(camera.position);
      const nearThreshold = 3;
      const isNearNow = distance < nearThreshold;
      
      if (isNearNow !== isNear) {
        setIsNear(isNearNow);
        if (isNearNow) {
          setSelectedArtwork(artwork);
        } else if (!isNearNow) {
          setSelectedArtwork(null);
        }
      }
    }
  });

  return (
    <group 
      position={new THREE.Vector3(...position)} 
      rotation={rotation}
    >
      {/* Frame */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.2, 3.2, 0.1]} />
        <meshStandardMaterial 
          color={isNear ? "#4a4a4a" : "#2a2a2a"} 
          emissive={isNear ? "#222222" : "#000000"}
        />
      </mesh>

      {/* Artwork */}
      <Plane args={[2, 3]} position={[0, 0, 0.06]}>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(artwork.imageUrl)}
          toneMapped={false}
        />
      </Plane>

      {/* Title */}
      <Text
        ref={textRef}
        position={[0, -1.8, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {artwork.title}
      </Text>
    </group>
  );
}