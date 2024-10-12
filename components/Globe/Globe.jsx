/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unknown-property */
/* eslint-disable lines-around-directive */
/* eslint-disable import/no-extraneous-dependencies */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { TextureLoader } from "three";
import { motion } from "framer-motion-3d";

const Scene = () => {
  const [textures, setTextures] = useState(null);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const loader = new TextureLoader();
    Promise.all([
      loader.loadAsync("/assets/traidatmau.jpg"),
      loader.loadAsync("/assets/normal.png"),
      loader.loadAsync("/assets/occlusion.jpg"),
    ]).then(([color, normal, aoMap]) => {
      setTextures({ color, normal, aoMap });
    });

    const animate = () => {
      setRotationY((prev) => prev + 0.002);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  if (!textures) return null;

  return (
    <motion.mesh
      scale={2.5}
      rotation-y={rotationY}
      rotation={[0, rotationY, 0]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={textures.color}
        normalMap={textures.normal}
        aoMap={textures.aoMap}
      />
    </motion.mesh>
  );
};

export default function Globe() {
  const scene = useRef(null);

  return (
    <Canvas ref={scene} style={{ width: "100%", height: "100vh" }}>
      <ambientLight intensity={1} />
      <directionalLight intensity={3.5} position={[1, 0, 0.7]} />
      <Scene />
    </Canvas>
  );
}
