  "use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroOverlay() {
const containerRef = useRef<HTMLDivElement>(null);
const [selectedCert, setSelectedCert] = useState<string | null>(null);
const [isMobile, setIsMobile] = useState(false);

// ✅ Detect mobile
useEffect(() => {
const check = () => setIsMobile(window.innerWidth < 640);
check();
window.addEventListener("resize", check);
return () => window.removeEventListener("resize", check);
}, []);

// 🎵 Music
useGSAP(() => {
const audio = new Audio("/music/Tum Ho Toh Saiyaara 320 Kbps.mp3");
audio.loop = true;
audio.volume = 0.35;

```
const startMusic = () => {
  audio.play().catch(() => {});
  window.removeEventListener("click", startMusic);
  window.removeEventListener("scroll", startMusic);
};

window.addEventListener("click", startMusic);
window.addEventListener("scroll", startMusic, { once: true });

return () => {
  audio.pause();
  audio.currentTime = 0;
};
```

}, []);

// 🎬 Animations
useGSAP(() => {
gsap.fromTo(
".hero-animate",
{ opacity: 0, y: 24 },
{
opacity: 1,
y: 0,
duration: 1,
stagger: 0.12,
ease: "power3.out",
}
);
}, { scope: containerRef });

return (
<>
{/* ================= MOBILE VERSION ================= */}
{isMobile && ( <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-black text-white">

```
      <h1 className="text-2xl font-bold">
        Hi, I'm Sainikhil
      </h1>

      <p className="mt-3 text-gray-400 text-sm">
        Full Stack Developer | AWS Learner
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Java", "Spring Boot", "AWS", "Docker"].map(skill => (
          <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <a href="/resume/Sainikhil_Marka_Portfolio_Resume.docx"
           className="px-4 py-2 bg-cyan-500 rounded-full text-sm">
          Resume
        </a>

        <a href="mailto:sainikhilmarka@gmail.com"
           className="px-4 py-2 border rounded-full text-sm">
          Contact
        </a>
      </div>

    </div>
  )}

  {/* ================= DESKTOP VERSION ================= */}
  {!isMobile && (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-5 text-center sm:px-8"
    >
      {/* Scene 1 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/traveler-scene1.png"
          className="absolute hidden sm:block top-0 right-10 md:right-32 lg:right-48"
        />

        <div className="max-w-6xl">
          <p className="hero-animate text-[11px] uppercase tracking-[0.55em] text-white/60">
            B.TECH CSE · FRESHER 2025
          </p>

          <h1 className="hero-animate mt-5 text-[clamp(2.8rem,8vw,8.5rem)] text-white">
            SAINIKHIL MARKA
          </h1>

          <p className="hero-animate mt-6 text-white/80">
            Building scalable software & cloud systems
          </p>
        </div>
      </div>

      {/* Scene 3 (Skills) */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <img
          src="/traveler-scene3.png"
          className="absolute hidden sm:block 
                     top-10 sm:top-16 
                     right-2 sm:right-20 md:right-40 lg:right-60"
        />

        <div className="max-w-5xl">
          <h2 className="mt-6 text-[clamp(2rem,6vw,5rem)] text-white">
            Java, Cloud & Full Stack Engineering
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              "Java",
              "Spring Boot",
              "AWS",
              "Docker",
              "Kubernetes",
            ].map((skill) => (
              <div key={skill} className="px-4 py-2 border rounded-full text-white">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="absolute bottom-20 flex gap-4">
        <a href="mailto:sainikhilmarka@gmail.com"
           className="pointer-events-auto px-6 py-2 border rounded-full text-white">
          Contact
        </a>

        <a href="https://github.com/sainikhilmarka"
           className="pointer-events-auto px-6 py-2 border rounded-full text-white">
          GitHub
        </a>
      </div>
    </div>
  )}

  {/* Certificate Modal */}
  {selectedCert && (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80"
      onClick={() => setSelectedCert(null)}
    >
      <iframe src={selectedCert} className="w-[90%] h-[90%]" />
    </div>
  )}
</>
```

);
}
