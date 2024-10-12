/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */

"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";

export const BoxCube = () => (
  <div className="w-full h-[55vh] flex justify-center items-center relative">
    <div className="absolute inset-0">
      <Canvas className="w-full h-full">
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]} />
        <OrbitControls enableZoom={false} />
        <Cube />
      </Canvas>
    </div>
  </div>
);

const Cube = () => {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Quay cube
      mesh.current.rotation.x += delta * 0.15;
      mesh.current.rotation.y += delta * 0.15;
      mesh.current.rotation.z += delta * 0.15;
    }
  });

  const texture1 = useLoader(TextureLoader, "/vietnam.jpg");
  const texture2 = useLoader(TextureLoader, "/cover.png");
  const texture3 = useLoader(TextureLoader, "/envi.png");
  const texture4 = useLoader(TextureLoader, "/FPT.jpg");
  const texture5 = useLoader(TextureLoader, "/semiconduct.jpg");
  const texture6 = useLoader(TextureLoader, "/25.png");

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3.5, 3.5, 3.5]} />
      <meshStandardMaterial map={texture1} attach="material-0" />
      <meshStandardMaterial map={texture2} attach="material-1" />
      <meshStandardMaterial map={texture3} attach="material-2" />
      <meshStandardMaterial map={texture4} attach="material-3" />
      <meshStandardMaterial map={texture5} attach="material-4" />
      <meshStandardMaterial map={texture6} attach="material-5" />
    </mesh>
  );
};
