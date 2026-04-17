"use client";

import { useEffect } from "react";
import CanvasScene from "@/components/CanvasScene";
import Navigation from "@/components/Navigation";
import HeroOverlay from "@/components/UI/HeroOverlay";

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;
    let ticking = false;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const fadeIn = (value: number, start: number, end: number) => {
      if (end <= start) return value >= end ? 1 : 0;
      return clamp01((value - start) / (end - start));
    };

    const fadeOut = (value: number, start: number, end: number) =>
      1 - fadeIn(value, start, end);

    const holdFrame = (
      value: number,
      enterStart: number,
      enterEnd: number,
      exitStart: number,
      exitEnd: number
    ) => {
      if (value < enterStart) return 0;
      if (value < enterEnd) return fadeIn(value, enterStart, enterEnd);
      if (value <= exitStart) return 1;
      if (value < exitEnd) return fadeOut(value, exitStart, exitEnd);
      return 0;
    };

    const setFrameVar = (name: string, value: number) => {
      root.style.setProperty(name, value.toFixed(4));
    };

    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;

      root.style.setProperty("--scene-progress", progress.toFixed(4));

      setFrameVar(
        "--frame-sky",
        progress <= 0.14 ? 1 : fadeOut(progress, 0.14, 0.3)
      );

      setFrameVar(
        "--frame-island",
        holdFrame(progress, 0.12, 0.26, 0.38, 0.54)
      );

      setFrameVar(
        "--frame-cliff",
        holdFrame(progress, 0.46, 0.6, 0.7, 0.82)
      );

      setFrameVar(
        "--frame-mouth",
        holdFrame(progress, 0.72, 0.84, 0.9, 0.98)
      );

      setFrameVar(
        "--frame-core",
        progress < 0.9 ? 0 : fadeIn(progress, 0.9, 1)
      );

      ticking = false;
    };

    const requestProgressUpdate = () => {
      if (ticking) return;
      ticking = true;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    requestProgressUpdate();

    window.addEventListener("scroll", requestProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);

      root.style.setProperty("--scene-progress", "0");
      root.style.setProperty("--frame-sky", "1");
      root.style.setProperty("--frame-island", "0");
      root.style.setProperty("--frame-cliff", "0");
      root.style.setProperty("--frame-mouth", "0");
      root.style.setProperty("--frame-core", "0");
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050c15] text-white">
      <div className="hero-bg-shell fixed inset-0 z-0">
        <div className="hero-bg-scroll">
          <div
            className="hero-bg-parallax animate-[worldBreath_8s_ease-in-out_infinite]"
            style={{
              transform:
                "scale(calc(1.02 + (var(--scene-progress) * 0.22))) translateY(calc(var(--scene-progress) * 6vh)) translateX(calc(var(--frame-island) * 8px))",
              transformOrigin: "center center",
            }}
          >
            <div className="hero-bg-image hero-bg-image-sky" />
            <div className="hero-bg-image hero-bg-image-island" />
            <div className="hero-bg-image hero-bg-image-cliff" />
            <div className="hero-bg-image hero-bg-image-mouth" />
            <div className="hero-bg-image hero-bg-image-core" />
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(8,18,31,0.12),rgba(4,10,18,0.46)_55%,rgba(3,8,14,0.72)_100%)]" />

      <div className="fixed inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,12,21,0.34)_0%,rgba(7,17,29,0.18)_32%,rgba(5,12,21,0.42)_100%)]" />

      <Navigation />

      <div className="fixed inset-0 z-[3]">
        <CanvasScene />
      </div>

      <HeroOverlay />

      <div className="relative z-[4] h-[520vh]" aria-hidden="true" />
    </main>
  );
}