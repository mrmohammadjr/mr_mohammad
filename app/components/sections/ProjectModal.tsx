"use client";

import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects/types";


export default function ProjectModal({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      {/* Close background */}
      <button
        aria-label="Close project"
        onClick={() => router.back()}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div
        className="
          relative
          z-10
          max-h-[90vh]
          w-full
          max-w-5xl
          overflow-y-auto
          border
          border-white/10
          bg-[#090909]
          shadow-2xl
        "
      >
        {/* Close */}
        <button
          onClick={() => router.back()}
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/50
            text-white/70
            backdrop-blur-md
            transition-all
            hover:border-white
            hover:bg-white
            hover:text-black
          "
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/8]">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
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
              {project.technologies.map((technology) => (
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

            <p className="mt-2 text-sm text-white/60">
              {project.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}