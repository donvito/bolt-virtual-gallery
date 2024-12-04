import { Environment as DreiEnvironment, Lightformer } from '@react-three/drei';

export function Environment() {
  return (
    <>
      <DreiEnvironment preset="studio" background blur={0.6} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 5, 5]} intensity={0.8} castShadow />
      
      {/* Spotlights for each wall */}
      <spotLight
        position={[0, 8, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.8}
        castShadow
      />
      
      <Lightformer
        position={[-10, 8, 0]}
        scale={[5, 1, 1]}
        intensity={2}
        color="#ffffff"
        form="rect"
      />
      <Lightformer
        position={[10, 8, 0]}
        scale={[5, 1, 1]}
        intensity={2}
        color="#ffffff"
        form="rect"
      />
    </>
  );
}