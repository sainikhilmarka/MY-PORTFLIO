document.body.classList.add("motion-ready");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initHeroScene() {
  if (prefersReducedMotion || !window.THREE) {
    return null;
  }

  const stage = document.querySelector("[data-stage]");
  const canvas = document.getElementById("hero-canvas");

  if (!stage || !canvas) {
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6.8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const particleCount = 1800;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    const phi = Math.acos(1 - 2 * Math.random());
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.95 + (Math.random() - 0.5) * 0.12;

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.cos(phi);
    positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  const globeGeometry = new THREE.BufferGeometry();
  globeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const globeMaterial = new THREE.PointsMaterial({
    color: 0x78c4ff,
    size: 0.03,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });

  const globe = new THREE.Points(globeGeometry, globeMaterial);
  globeGroup.add(globe);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, 5),
    new THREE.MeshBasicMaterial({
      color: 0x3e8fff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
  );
  globeGroup.add(shell);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x8dcaff,
    transparent: true,
    opacity: 0.18,
  });

  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.012, 16, 200), ringMaterial);
  ringA.rotation.x = Math.PI / 2.4;
  ringA.rotation.y = Math.PI / 5;
  globeGroup.add(ringA);

  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.01, 16, 160), ringMaterial.clone());
  ringB.material.opacity = 0.12;
  ringB.rotation.x = Math.PI / 3.2;
  ringB.rotation.z = Math.PI / 2.8;
  globeGroup.add(ringB);

  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 500;
  const starPositions = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount; i += 1) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 18;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 12;
    starPositions[i3 + 2] = -6 - Math.random() * 10;
  }

  starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

  const stars = new THREE.Points(
    starsGeometry,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.018,
      transparent: true,
      opacity: 0.55,
    })
  );
  scene.add(stars);

  const pointer = { x: 0, y: 0 };
  const targetRotation = { x: 0.28, y: 0.42 };

  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function handlePointerMove(event) {
    const rect = stage.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    pointer.x = relativeX;
    pointer.y = relativeY;
    targetRotation.y = 0.42 + pointer.x * 0.7;
    targetRotation.x = 0.28 + pointer.y * 0.5;
  }

  function handlePointerLeave() {
    targetRotation.x = 0.28;
    targetRotation.y = 0.42;
  }

  let rafId = 0;

  function render() {
    globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.04;
    globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.04;
    globeGroup.rotation.z += 0.0015;
    stars.rotation.y += 0.0008;
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(render);
  }

  resize();
  render();

  window.addEventListener("resize", resize);
  stage.addEventListener("pointermove", handlePointerMove);
  stage.addEventListener("pointerleave", handlePointerLeave);

  return {
    globeGroup,
    destroy() {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      globeGeometry.dispose();
      globeMaterial.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      ringA.geometry.dispose();
      ringA.material.dispose();
      ringB.geometry.dispose();
      ringB.material.dispose();
      starsGeometry.dispose();
      stars.material.dispose();
      renderer.dispose();
    },
  };
}

function initMotion(heroScene) {
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    document.body.classList.remove("motion-ready");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroElements = document.querySelectorAll("[data-hero]");
  const revealElements = document.querySelectorAll("[data-reveal]");
  const projectCards = document.querySelectorAll(".project-card");
  const featureCards = document.querySelectorAll(".feature-card");

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .fromTo(
      heroElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.95, stagger: 0.12 }
    )
    .fromTo(
      ".site-header",
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.05
    );
   

gsap.to("[data-hero]", {
  opacity: 0,
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.4,
  },
});
gsap.to(".hero h1, .hero p, .hero .hero-tags, .hero .scroll-text", {
  opacity: 0,
  y: -120,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.4,
  },
});
  revealElements.forEach((element, index) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 34,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        delay: index % 3 === 0 ? 0 : 0.02,
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      }
    );
  });

  gsap.to(".ambient-one", {
    yPercent: -18,
    xPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  gsap.to(".ambient-two", {
    yPercent: 14,
    xPercent: -6,
    ease: "none",
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
    },
  });

  projectCards.forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 === 0 ? -8 : -14,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  });

  featureCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { filter: "blur(8px)" },
      {
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "top 55%",
          scrub: 0.8,
        },
      }
    );
  });

  if (heroScene?.globeGroup) {
    gsap.to(heroScene.globeGroup.rotation, {
      y: heroScene.globeGroup.rotation.y + 1.1,
      x: heroScene.globeGroup.rotation.x - 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.3,
      },
    });
  }

  ScrollTrigger.refresh();
  document.body.classList.remove("motion-ready");
}

const heroScene = initHeroScene();
initMotion(heroScene);
gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero h1, .hero .hero-text, .hero .hero-actions, .hero .hero-meta", {
  opacity: 0,
  y: -120,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.2,
  },
});

gsap.from("#about .section-head, #about .section-copy", {
  opacity: 0,
  y: 120,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 70%",
    end: "top 30%",
    scrub: true,
  },
});