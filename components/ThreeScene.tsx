"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Torus, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const { mouse } = useThree();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.15 + mouse.y * 0.3;
    ref.current.rotation.y = t * 0.25 + mouse.x * 0.5;
  });
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={ref} args={[1.3, 128, 128]}>
        <MeshDistortMaterial
          color={theme === "dark" ? "#8b5cf6" : "#6366f1"}
          attach="material"
          distort={0.55}
          speed={2.5}
          roughness={0.15}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.4;
    ref.current.rotation.y = s.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <Torus ref={ref} args={[2.2, 0.025, 16, 200]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
      </Torus>
    </Float>
  );
}

function FloatingShard({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.3;
    ref.current.rotation.z = s.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={1.8} floatIntensity={2.5} rotationIntensity={1.5}>
      <Icosahedron ref={ref} args={[0.18, 0]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} wireframe />
      </Icosahedron>
    </Float>
  );
}

function MouseLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = (mouse.x * viewport.width) / 2;
    ref.current.position.y = (mouse.y * viewport.height) / 2;
  });
  return <pointLight ref={ref} position={[0, 0, 2]} intensity={2} color="#a855f7" distance={6} />;
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <pointLight position={[-3, -3, -2]} intensity={0.8} color="#22d3ee" />
      <MouseLight />
      <Stars radius={60} depth={60} count={2500} factor={4} fade speed={1.2} />
      <Ring />
      <Blob />
      <FloatingShard position={[2.2, 1.3, 0.5]} color="#22d3ee" />
      <FloatingShard position={[-2.4, -1.1, 0.8]} color="#a855f7" />
      <FloatingShard position={[1.8, -1.6, -0.3]} color="#f472b6" />
      <FloatingShard position={[-1.9, 1.7, 0.2]} color="#34d399" />
    </Canvas>
  );
}
