"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const primary = new THREE.Color("#6366f1");
    const cyan = new THREE.Color("#22d3ee");
    const purple = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const r = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;

      // Color variation
      const t = Math.random();
      const c = t < 0.4 ? primary : t < 0.7 ? cyan : purple;
      col[i * 3] = c.r + (Math.random() - 0.5) * 0.2;
      col[i * 3 + 1] = c.g + (Math.random() - 0.5) * 0.2;
      col[i * 3 + 2] = c.b + (Math.random() - 0.5) * 0.2;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;

    // Slow rotation
    mesh.current.rotation.y = t * 0.04;
    mesh.current.rotation.x = Math.sin(t * 0.02) * 0.2;

    // Mouse influence
    mesh.current.rotation.y += mouse.x * 0.02;
    mesh.current.rotation.x += mouse.y * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometry() {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.2;
      ref.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.1;
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group position={[2.5, 0, -2]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.21, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
        <Particles count={1800} />
        <FloatingGeometry />
        <GridPlane />
      </Canvas>
    </div>
  );
}
