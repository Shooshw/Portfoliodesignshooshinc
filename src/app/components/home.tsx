import { useState } from "react";
import { Hero } from "./hero";
import { AboutIntro } from "./about-intro";
import { EducationSection } from "./education-section";
import { ProjectsMain } from "./projects-main";
import { ProjectsSecondary } from "./projects-secondary";
import { ContactSection } from "./contact-section";
import { ProjectModal } from "./project-modal";
import type { Project } from "../data/projects";

export function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Hero />
      <AboutIntro />
      <ProjectsMain onProjectClick={setSelectedProject} />
      <ProjectsSecondary onProjectClick={setSelectedProject} />
      <ContactSection />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
