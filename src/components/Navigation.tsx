"use client";

import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const [liked, setLiked] = useState(false);
  const [showContactHint, setShowContactHint] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleContactClick = () => {
    setShowContactHint(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setShowContactHint(false);
    }, 2400);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-8 sm:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            Portfolio
          </p>
          <p className="mt-1 truncate text-sm font-semibold tracking-[0.18em] text-white drop-shadow-[0_10px_30px_rgba(3,8,14,0.55)] sm:text-base">
            SAINIKHIL MARKA
          </p>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setLiked((previous) => !previous)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition sm:px-5 ${
              liked
                ? "border-gold bg-maroon-soft text-gold"
                : "border-white/12 bg-white/5 text-white/80 hover:border-gold hover:text-gold"
            }`}
          >
            {liked ? "Liked ♥" : "Like ♡"}
          </button>

          <a
          href="https://wa.me/918688541373?text=Hi%20Sainikhil,%20I%20saw%20your%20portfolio."
  
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full border border-gold bg-[#d7b16a] px-4 py-2 text-sm font-semibold tracking-[0.2em] text-[#34161c] transition hover:bg-white sm:px-6"
>
  GET IN TOUCH
</a>

          {showContactHint ? (
            <div className="glass-panel absolute right-0 top-[calc(100%+0.75rem)] min-w-52 rounded-2xl px-4 py-3 text-sm text-white/75">
              Contact details will flow in next when you share them.
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
