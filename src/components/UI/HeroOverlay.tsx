"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
const audioRef = useRef<HTMLAudioElement>(null);
const [selectedCert, setSelectedCert] = useState<string | null>(null);
  useGSAP(() => {
  const audio = new Audio("/music/Tum Ho Toh Saiyaara 320 Kbps.mp3");
  audio.loop = true;
  audio.volume = 0.35;

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
}, []);



  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  );

  return (
    <>
      <style jsx global>{`
        @keyframes dawnAura {
          0%,
          100% {
            filter: drop-shadow(0 0 18px rgba(255, 210, 140, 0.25));
            transform: translateY(0px);
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(255, 220, 160, 0.4));
            transform: translateY(-6px);
          }
        }

        @keyframes islandDrift {
          0%,
          100% {
            filter: drop-shadow(0 0 12px rgba(180, 220, 255, 0.18));
            transform: translateY(0px);
          }
          50% {
            filter: drop-shadow(0 0 22px rgba(180, 230, 255, 0.28));
            transform: translateY(-8px);
          }
        }

        @keyframes cliffWind {
          0%,
          100% {
            filter: drop-shadow(0 0 14px rgba(120, 180, 255, 0.18));
            transform: translateY(0px);
          }
          50% {
            filter: drop-shadow(0 0 28px rgba(140, 200, 255, 0.35));
            transform: translateY(-10px);
          }
        }

        @keyframes torchFlicker {
          0%,
          100% {
            filter: drop-shadow(0 0 18px rgba(255, 210, 120, 0.35));
          }
          50% {
            filter: drop-shadow(0 0 34px rgba(255, 220, 140, 0.6));
          }
        }

        @keyframes orbGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 22px rgba(120, 220, 255, 0.35));
          }
          50% {
            filter: drop-shadow(0 0 44px rgba(140, 240, 255, 0.75));
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-5 text-center sm:px-8"
style={{ paddingTop: "80px" }}
        
      >
        {/* 🎬 Scene 1 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: "calc(1 - (var(--scene-progress) * 4.2))",
            transform:
              "translateY(calc(var(--scene-progress) * -220px)) scale(calc(1 - (var(--scene-progress) * 0.22)))",
          }}
        >
          <img
            src="/traveler-scene1.png"
            alt="Adventure Traveler"
            className="absolute  hidden sm:block"
            style={{
              top: "0px",
              right: "600px",
              animation: "dawnAura 3.8s ease-in-out infinite",
            }}
          />

          <div className="max-w-6xl">
            <p className="hero-animate text-[11px] uppercase tracking-[0.55em] text-gold/80">
              B.TECH CSE · FRESHER 2025
            </p>

            <h1 className="hero-animate font-display glow-blue mt-5 text-[clamp(2.8rem,8vw,8.5rem)] font-semibold leading-[0.88] tracking-[0.14em] text-white">
              SAINIKHIL MARKA
            </h1>

            <p className="hero-animate mx-auto mt-6 max-w-4xl text-lg leading-8 text-white/85 sm:text-2xl sm:leading-10">
              Building scalable software, cloud systems & full-stack applications
            </p>

            <div className="hero-animate mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "JAVA DEVELOPER",
                "FULL STACK DEVELOPER",
                "DEVOPS ENGINEER",
                "AWS CLOUD",
                "SOFTWARE DEVELOPER",
                "DATA ANALYST",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs tracking-[0.22em] text-white/80 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero-animate mt-12 text-[11px] uppercase tracking-[0.45em] text-white/45">
              SCROLL TO GLIDE FORWARD
            </p>
          </div>
        </div>

        {/* 🏝️ Scene 2 */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
          style={{
            opacity: "calc(max(0, (var(--frame-island) - 0.62)) * 2.8)",
            transform: "translateY(calc((1 - var(--frame-island)) * 140px))",
          }}
        >
          
          <img
            src="/traveler-scene2.png"
            alt="Adventure Traveler"
            className="absolute "
            style={{
              top: "10px",
              right: "600px",
              animation: "islandDrift 4.4s ease-in-out infinite",
            }}
          />

         <div className="ml-0 sm:ml-[420px] max-w-4xl text-left">
  <p className="text-[11px] uppercase tracking-[0.55em] text-gold/80">
    THE FOUNDATION
  </p>

  <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] tracking-[0.04em] text-white">
    Turning curiosity into real software systems
  </h2>

  <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">
    I’m Sainikhil Marka, a Java full-stack developer and cloud enthusiast
    focused on building scalable applications, DevOps pipelines, and
    production-ready systems.
  </p>

  <div className="mt-8 flex flex-wrap gap-4">
    {[
      "💻 FULL STACK",
      "☁️ CLOUD",
      "⚙️ DEVOPS",
      "🚀 PROBLEM SOLVING",
    ].map((pill) => (
      <div
        key={pill}
        className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm tracking-[0.18em] text-white/85 backdrop-blur-xl"
      >
        {pill}
      </div>
    ))}
  </div>
</div>
        </div>

       {/* 🪨 Scene 3 */}
<div
  className="absolute inset-0 flex items-center justify-center px-6 text-center"
  style={{
    opacity: "calc(max(0, (var(--frame-cliff) - 0.18)) * 2.2)",
    transform: "translateY(calc((1 - var(--frame-cliff)) * 40px))",
  }}
>
  <img
    src="/traveler-scene3.png"
    alt="Adventure Traveler"
    className="absolute  hidden sm:block"
    style={{
      top: "70px",
      right: "700px",
      rotate: "20deg",
      animation: "cliffWind 3.2s ease-in-out infinite",
    }}
  />

  <div className="max-w-5xl">
    <p className="text-[11px] uppercase tracking-[0.55em] text-gold/80">
      CORE SKILLS
    </p>

    <h2 className="mt-6 font-display text-[clamp(2rem,6vw,5.6rem)] leading-[1.02] tracking-[0.06em] text-white">
      Java systems, cloud automation & full-stack engineering
    </h2>
      
       
    <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
      {[
        "☕ CORE JAVA",
        "🌱 SPRING BOOT",
        "🗄️ HIBERNATE",
        "🐳 DOCKER",
        "☁️ AWS",
        "⚙️ JENKINS",
        "☸️ KUBERNETES",
      ].map((skill) => (
        <div key={skill} className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(120,220,255,0.7)]" />
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-6 py-2 text-sm tracking-[0.18em] text-cyan-100 backdrop-blur-xl shadow-[0_0_24px_rgba(120,220,255,0.08)]">
            {skill}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* 🕳️ Scene 4 */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
          style={{
            opacity: "calc(max(0, (var(--frame-mouth) - 0.55)) * 4.0)",
            transform: "translateY(calc((1 - var(--frame-mouth)) * 20px))",
          }}
        >
          <img
            src="/traveler-scene4.png"
            alt="Adventure Traveler"
            className="absolute  hidden sm:block"
            style={{
              top: "30px",
              right: "750px",
              animation: "torchFlicker 1.6s ease-in-out infinite",
            }}
          />

          <div className="max-w-5xl">
            <p className="text-[11px] uppercase tracking-[0.55em] text-gold/80">
              FEATURED PROJECTS
            </p>
            <h2 className="mt-6 font-display text-[1.3rem] sm:text-[clamp(3rem,8vw,5.6rem)] leading-[1.1] tracking-[0.06em] text-white">
              Where real problems become deployed solutions
              
            </h2>
            
            <div className="mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-4">
  {[
    "E-Learning Platform",
    "AWS CI/CD Pipeline",
    "Spring Commerce App",
    "Spri Commerce App",
  ].map((project) => (
    <div
      key={project}
      className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-left backdrop-blur-xl shadow-[0_0_30px_rgba(255,210,120,0.08)]"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-gold/70">
        DISCOVERED RELIC
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white/90">
        {project}
      </h3>
      <p className="mt-2 text-sm leading-6 text-white/60">
        Production-ready solution deployed with scalable engineering practices.
      </p>
    </div>
  ))}
</div> 
          </div>
        </div>


             {/* 💎 Scene 5 */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        style={{
          opacity: "calc(max(0, (var(--frame-core) - 0.35)) * 2.6)",
          transform:
            "translateY(calc((1 - var(--frame-core)) * 220px)) scale(calc(0.9 + (var(--frame-core) * 0.1)))",
        }}
      >
        <img
          src="/traveler-scene5.png"
          alt="Adventure Traveler"
          className="absolute  hidden sm:block"
          style={{
            top: "0px",
            right: "650px",
            animation: "orbGlow 2.2s ease-in-out infinite",
          }}
        />

        <div className="max-w-5xl">
          <p className="text-[11px] uppercase tracking-[0.55em] text-gold/80">
            LET'S CONNECT
          </p>

          <h2 className="mt-6 font-display text-[1.3rem] sm:text-[clamp(3rem,8vw,5.6rem)] leading-[1.1] tracking-[0.06em] text-white">
            Let's build something great together
          </h2>

          {/* ✅ Clickable Certificate Buttons */}
          <div className="mt-4 sm:mt-14 flex flex-wrap justify-center gap-3">
            {[
              { label: "☕ Java", file: "/certificates/E213117 Java.pdf" },
              { label: "🐍 Python", file: "/certificates/E213117 Python.pdf" },
              { label: "🗄️ RDBMS", file: "/certificates/E213117 RDBMS.pdf" },
              { label: "📊 Big Data", file: "/certificates/E213117 Bigdata.pdf" },
              {
                label: "🤖 AI Analyst",
                file: "/certificates/Artifical intellengence.pdf",
              },
              {
                label: "☁️ DevOps AWS",
                file: "/certificates/devops completed certificate.pdf",
              },
            ].map((cert, index) => (
              <button
                key={cert.label}
                onClick={() => setSelectedCert(cert.file)}
                className="pointer-events-auto rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[10px] sm:px-5 sm:py-3 sm:text-sm tracking-[0.12em] text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-cyan-300/30
                style={{
                  boxShadow:
                    index === 5
                      ? "0 0 35px rgba(120,220,255,0.22)"
                      : "0 0 20px rgba(255,255,255,0.06)",
                }}
              >
                {cert.label}
              </button>
            ))}
          </div>

          <p className="mx-auto mt-10 sm:mt-6 max-w-3xl text-base sm:text-lg leading-8 text-white/80">
            I’m a Java full-stack developer & DevOps engineer open to
            full-time roles across India. Let’s talk about how I can
            contribute from day one.
          </p>

          {/* 🏅 Featured Certificates */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              "IBM JAVA FUNDAMENTALS",
              "IBM RDBMS Fundamentals",
              "IBM ARTFICAL INELLIGENCE Foundations",
            ].map((cert) => (
              <div
                key={cert}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-6 py-3 text-sm tracking-[0.18em] text-cyan-100 shadow-[0_0_30px_rgba(120,220,255,0.12)] backdrop-blur-xl"
              >
                🏅 {cert}
              </div>
            ))}
          </div>

          {/* 🤝 CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
 <a
  href="mailto:sainikhilmarka@gmail.com"
  className="pointer-events-auto rounded-full border border-white/15 bg-white/[0.04] px-8 py-3 text-sm tracking-[0.18em] text-white/85 backdrop-blur-md"
>
  CONTACT
</a>

 <a
  href="/resume/Sainikhil_Marka_Portfolio_Resume.docx"
  target="_blank"
  rel="noopener noreferrer"
  className="pointer-events-auto rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-8 py-3 text-sm tracking-[0.18em] text-cyan-100 backdrop-blur-md shadow-[0_0_30px_rgba(120,220,255,0.12)]"
>
  RESUME
</a>

  <a
    href="https://github.com/sainikhilmarka"
    target="_blank"
    className="pointer-events-auto rounded-full border border-white/15 bg-white/[0.04] px-8 py-3 text-sm tracking-[0.18em] text-white/85 backdrop-blur-md"
  >
    GITHUB
  </a>

  <a
    href="https://linkedin.com/in/sainikhilmarka"
    target="_blank"
    className="pointer-events-auto rounded-full border border-white/15 bg-white/[0.04] px-8 py-3 text-sm tracking-[0.18em] text-white/85 backdrop-blur-md"
  >
    LINKEDIN
  </a>
</div>
        </div>
      </div>
            {/* ✅ Certificate Preview Modal */}
      {selectedCert && (
        <div
          className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="h-[85vh] w-[85vw] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedCert}
              className="h-full w-full"
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </div>
  </>
);
}
