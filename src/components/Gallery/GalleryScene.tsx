import { Canvas } from '@react-three/fiber';
import { KeyboardControls, PerspectiveCamera } from '@react-three/drei';
import { Environment } from './Environment';
import { GallerySpace } from './GallerySpace';
import { Player } from './Player';
import { useGalleryStore } from '../../store/galleryStore';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
];

export function GalleryScene() {
  const artworks = useGalleryStore((state) => state.artworks);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.7, 8]} zoom={1} />
        <Environment />
        <GallerySpace artworks={artworks} />
        <Player />
      </Canvas>
    </KeyboardControls>
  );
}