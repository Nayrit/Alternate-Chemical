"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

function letterTexture(letter: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.clearRect(0, 0, 256, 256);
  context.beginPath();
  context.arc(128, 128, 112, 0, Math.PI * 2);
  context.fillStyle = "#e8f7d6";
  context.fill();
  context.lineWidth = 10;
  context.strokeStyle = "#006837";
  context.stroke();
  context.fillStyle = "#006837";
  context.font = "700 132px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(letter, 128, 136);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Electron({
  letter,
  radius,
  speed,
  tilt,
  still,
  boost,
}: {
  letter: string;
  radius: number;
  speed: number;
  tilt: [number, number, number];
  still: boolean;
  boost: { current: number };
}) {
  const spin = useRef<THREE.Group>(null);
  const texture = useMemo(() => letterTexture(letter), [letter]);

  useFrame((_, delta) => {
    if (!spin.current || still) return;
    spin.current.rotation.z += delta * speed * (boost.current ?? 1);
  });

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.014, 12, 160]} />
        <meshStandardMaterial
          color="#8ed24a"
          emissive="#6BB634"
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.08}
        />
      </mesh>
      <group ref={spin}>
        <sprite position={[radius, 0, 0]} scale={[0.48, 0.48, 1]}>
          <spriteMaterial map={texture ?? undefined} transparent />
        </sprite>
      </group>
    </group>
  );
}

function Flow({ still }: { still: boolean }) {
  const geometry = useMemo(() => {
    const count = 168;
    const positions = new Float32Array(count * 3);
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame((state) => {
    const time = still ? 0.6 : state.clock.elapsedTime;
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const radii = [1.55, 2.2, 2.85];
    const speeds = [0.42, -0.3, 0.24];
    for (let index = 0; index < attribute.count; index += 1) {
      const ring = index % 3;
      const angle = (index / attribute.count) * Math.PI * 2 + time * speeds[ring];
      const radius = radii[ring];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (ring === 0) attribute.setXYZ(index, x, y * 0.2, y);
      else if (ring === 1) attribute.setXYZ(index, x * 0.58, y, x * 0.78);
      else attribute.setXYZ(index, y * 0.32, x, y * 0.92);
    }
    attribute.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#d8f7b0"
        size={0.055}
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function Atom({
  pointer,
  still,
  boost,
}: {
  pointer: { current: { x: number; y: number } };
  still: boolean;
  boost: { current: number };
}) {
  const group = useRef<THREE.Group>(null);
  const nucleus = useRef<THREE.Mesh>(null);
  const spin = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetX = still ? 0.15 : pointer.current.y * 0.28;
    const influence = still ? 0 : pointer.current.x * 0.4;
    spin.current += delta * (still ? 0.04 : 0.09 * (boost.current ?? 1));
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    group.current.rotation.y = spin.current + influence;
    if (nucleus.current && !still) {
      const pulse = 1 + Math.sin(spin.current * 6) * 0.035;
      nucleus.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={nucleus}>
        <sphereGeometry args={[0.4, 48, 48]} />
        <meshStandardMaterial
          color="#2f8f32"
          emissive="#6BB634"
          emissiveIntensity={0.85}
          roughness={0.28}
          metalness={0.06}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshBasicMaterial color="#6BB634" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <Electron letter="A" radius={1.55} speed={0.7} tilt={[1.15, 0.15, 0.25]} still={still} boost={boost} />
      <Electron letter="C" radius={2.2} speed={-0.48} tilt={[0.35, 1.05, 0.45]} still={still} boost={boost} />
      <Electron letter="I" radius={2.85} speed={0.34} tilt={[1.05, 0.5, 1.2]} still={still} boost={boost} />
      <Flow still={still} />
    </group>
  );
}

export default function AtomCanvas() {
  const reduce = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const boost = useRef(1);

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      boost.current = 1 + Math.min(0.45, Math.hypot(pointer.current.x, pointer.current.y) * 0.28);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <Canvas
      camera={{ position: [0, 0.05, 7.1], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMappingExposure = 1.12;
      }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={28} color="#b6e86a" distance={14} />
      <Atom pointer={pointer} still={Boolean(reduce)} boost={boost} />
    </Canvas>
  );
}
