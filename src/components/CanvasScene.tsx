"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 42 }}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="w-full h-screen"
    >
      <Experience />
    </Canvas>
  );
}
