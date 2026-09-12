import { notFound } from "next/navigation";

import { getProjects } from "@/lib/projects/getProjects";
import ProjectModal from "../../../components/sections/ProjectModal";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectModalPage({
  params,
}: Props) {
  const { slug } = await params;

   const projects = await getProjects()
     const project = projects?.find(
       (project) => project.slug === slug,
     );
  

  if (!project) {
    notFound();
  }

  return <ProjectModal project={project} />;
}