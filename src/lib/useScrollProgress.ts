"use client";

import { useEffect, useState } from "react";

type ScrollState = {
  progress: number;
  activeSection: string;
};

export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    activeSection: "hero",
  });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    const updateScrollState = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;

      let activeSection = "hero";
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight * 0.24);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          activeSection = section.id || activeSection;
        }
      });

      setScrollState({
        progress,
        activeSection,
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return scrollState;
}
