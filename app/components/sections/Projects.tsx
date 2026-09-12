import { getProjects } from "@/lib/projects/getProjects";

import ProjectCard from "./ProjectCard";

async function Projects() {
  const projects = await getProjects();
  return (
    <div>
      <ProjectCard projects={projects} />
    </div>
  );
}

export default Projects;
