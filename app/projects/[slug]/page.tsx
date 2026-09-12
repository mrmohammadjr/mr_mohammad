import Image from "next/image";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/projects/getProjects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Project({ params }: Props) {
  const { slug } = await params;

 
   const projects = await getProjects()
   const project = projects?.find(
     (project) => project.slug === slug,
   );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
         {/* ================= HEADER ================= */}

      <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="
            group
            inline-flex
            items-center
            gap-2
            border
            border-white/10
            px-4
            py-2.5
            text-xs
            text-white/60
            transition-all
            duration-300
            hover:border-white/30
            hover:bg-white
            hover:text-black
          "
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Home
        </Link>
      </div>

        <div className="relative mt-12 aspect-[16/8] overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
              {project.category}
            </p>

            <h1 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45">
              {project.long_description}
            </p>
 
            {/* Links */}
            <div className="mt-8 flex gap-6">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white transition-opacity hover:opacity-60"
                >
                  Live Website
                  <ArrowUpRight size={15} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white transition-opacity hover:opacity-60"
                >
                  GitHub
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
              Technologies
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology: string) => (
                <span
                  key={technology}
                  className="
                    rounded-full
                    border
                    border-white/10
                    px-3
                    py-2
                    text-[10px]
                    text-white/50
                  "
                >
                  {technology}
                </span>
              ))}
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/25">
              Year
            </p>

            <p className="mt-2 text-sm text-white/60">{project.year}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


