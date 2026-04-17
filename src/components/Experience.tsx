"use client";

import { Sparkles } from "@react-three/drei";
export default function Experience() {
  return (
    <>
      <Sparkles
        count={12}
        scale={[14, 6, 10]}
        size={1.6}
        speed={0.035}
        opacity={0.14}
        color="#f4fbff"
      />
      <Sparkles
        count={5}
        scale={[10, 4, 8]}
        size={2.3}
        speed={0.02}
        opacity={0.08}
        color="#d7b16a"
        position={[1.6, -0.8, -2]}
      />
    </>
  );
}
