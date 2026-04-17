const projects = [
  {
    index: "01",
    title: "Portfolio Redesign System",
    description:
      "A personal brand experience with immersive hero visuals, glassmorphism panels, and editorial project storytelling.",
    tags: ["Branding", "Portfolio", "Motion"],
  },
  {
    index: "02",
    title: "Interactive Landing Experience",
    description:
      "A launch page concept that uses layered gradients, kinetic typography, and focused CTAs to feel bold without becoming cluttered.",
    tags: ["UI Design", "GSAP", "Responsive"],
  },
  {
    index: "03",
    title: "Creative Studio Showcase",
    description:
      "A studio-facing web direction with modular sections, deeper case-study pacing, and 3D polish for the opening fold.",
    tags: ["Three.js", "Case Studies", "Premium UI"],
  },
];

export default function ProjectPanel() {
  return (
    <div className="project-panel">
      {projects.map((project) => (
        <article className="project-card reveal" key={project.index}>
          <span className="project-index">{project.index}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-meta">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
