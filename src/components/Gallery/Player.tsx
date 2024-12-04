import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { Vector3, Group, Mesh } from 'three';
import { useMemo, useCallback } from 'react';

const MOVEMENT_SPEED = 5;
const COLLISION_DISTANCE = 2;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_SPEED = 0.1;

export function Player() {
  const playerRef = useRef<Group>(null);
  const velocity = useRef(new Vector3());
  const zoom = useRef(1);
  const moveDirection = useMemo(() => new Vector3(), []);
  const sideDirection = useMemo(() => new Vector3(), []);
  const [isLocked, setIsLocked] = useState(false);
  const { camera } = useThree();

  // Setup keyboard controls
  const [, getKeys] = useKeyboardControls();

  // Collision detection
  const checkCollision = useCallback((newPosition: Vector3) => {
    // Simple boundary checks
    const bounds = {
      minX: -13,
      maxX: 13,
      minZ: -8,
      maxZ: 8,
    };

    return (
      newPosition.x > bounds.minX &&
      newPosition.x < bounds.maxX &&
      newPosition.z > bounds.minZ &&
      newPosition.z < bounds.maxZ
    );
  }, []);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const { forward, backward, left, right } = getKeys();

    // Calculate movement direction
    const moveZ = Number(forward) - Number(backward);
    const moveX = Number(right) - Number(left);

    // Get forward direction from camera
    camera.getWorldDirection(moveDirection);
    moveDirection.y = 0;
    moveDirection.normalize();

    // Get side direction
    sideDirection.copy(moveDirection).cross(camera.up).normalize();

    // Calculate movement
    velocity.current
      .set(0, 0, 0)
      .addScaledVector(moveDirection, moveZ)
      .addScaledVector(sideDirection, moveX)
      .multiplyScalar(MOVEMENT_SPEED * delta);

    // Calculate new position
    const newPosition = new Vector3().copy(playerRef.current.position).add(
      velocity.current
    );

    // Only update if no collision
    if (checkCollision(newPosition)) {
      playerRef.current.position.copy(newPosition);
    }

    // Update camera position to follow player
    state.camera.position.x = playerRef.current.position.x;
    state.camera.position.z = playerRef.current.position.z;
  });

  useEffect(() => {
    // Initialize player position
    if (playerRef.current) {
      playerRef.current.position.y = 0;
    }
  }, []);

  // Handle zoom
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      zoom.current = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, 
        zoom.current + Math.sign(event.deltaY) * -ZOOM_SPEED));
      camera.zoom = zoom.current;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera]);

  const handleLock = () => setIsLocked(true);
  const handleUnlock = () => setIsLocked(false);

  return (
    <>
      <PointerLockControls
        onLock={handleLock}
        onUnlock={handleUnlock}
      />
      <group ref={playerRef}>
        <mesh visible={false}>
          <capsuleGeometry args={[0.3, 1, 1, 4]} />
          <meshBasicMaterial wireframe />
        </mesh>
      </group>
    </>
  );
}