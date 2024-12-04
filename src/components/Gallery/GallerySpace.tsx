import { ArtworkFrame } from './ArtworkFrame';
import { Artwork } from '../../types/gallery';

interface GallerySpaceProps {
  artworks: Artwork[];
}

export function GallerySpace({ artworks }: GallerySpaceProps) {
  return (
    <group>
      {/* Floor and Walls */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 3, -10]} receiveShadow>
        <boxGeometry args={[30, 10, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-15, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[15, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Artwork Frames - Back Wall */}
      {artworks.slice(0, 4).map((artwork, index) => {
        const spacing = 6;
        const startX = -9;
        const position: [number, number, number] = [
          startX + index * spacing,
          1,
          -9.7,
        ];
        const rotation: [number, number, number] = [0, 0, 0];
        return (
          <ArtworkFrame
            key={artwork.id}
            position={position}
            rotation={rotation}
            artwork={artwork}
          />
        );
      })}

      {/* Artwork Frames - Left Wall */}
      {artworks.slice(4, 6).map((artwork, index) => {
        const spacing = 6;
        const startZ = -4;
        const position: [number, number, number] = [
          -14.7,
          1,
          startZ + index * spacing,
        ];
        const rotation: [number, number, number] = [0, Math.PI / 2, 0];
        return (
          <ArtworkFrame
            key={artwork.id}
            position={position}
            rotation={rotation}
            artwork={artwork}
          />
        );
      })}
      {/* Artwork Frames - Right Wall */}
      {artworks.slice(6).map((artwork, index) => {
        const spacing = 6;
        const startZ = -4;
        const position: [number, number, number] = [
          14.7,
          1,
          startZ + index * spacing,
        ];
        const rotation: [number, number, number] = [0, -Math.PI / 2, 0];

        return (
          <ArtworkFrame
            key={artwork.id}
            position={position}
            rotation={rotation}
            artwork={artwork}
          />
        );
      })}
    </group>
  );
}