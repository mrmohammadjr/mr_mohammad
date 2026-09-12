"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/projects/types";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ projects }: { projects: Project[] | null }) {
  const sectionRef = useRef<HTMLElement>(null);
    console.log("projects data",projects)
  useGSAP(
    () => {
      gsap.from("[data-project-card]", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        min-h-screen
        w-full
        shrink-0
        overflow-hidden
        bg-linear-to-r from-zinc-800 to-[#050505]
        px-6
        py-24
        text-white
        sm:px-10
        lg:px-16
        lg:py-28
      "
    >
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-14">
          <div>
            <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              My Projects
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
              A selection of projects where design, technology and interaction
              come together.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {projects?.length === 0 ? (
            <p className="text-3xl">No Projects have been published yet.</p>
          ) : (
            <>
              {projects?.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  data-project-card
                  className="group block"
                >
                  <article className="relative overflow-hidden border border-white/10 bg-white/[0.02]">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                      />

                      {/* Overlay */}
                      <div
                        className="
                        absolute
                        inset-0
                        bg-black/0
                        transition-colors
                        duration-500
                        group-hover:bg-black/30
                      "
                      />

                      {/* Arrow */}
                      <div
                        className="
                        absolute
                        right-5
                        top-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/30
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover:border-white
                        group-hover:bg-white
                        group-hover:text-black
                      "
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex items-start justify-between gap-6 p-6">
                      <div>
                        <div className="mb-3 flex items-center gap-3">
                          <span className="font-mono text-[10px] text-white/25">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-[10px] uppercase tracking-widest text-white/30">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-medium tracking-tight">
                          {project.title}
                        </h3>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                          {project.description}
                        </p>
                      </div>

                      <span className="shrink-0 font-mono text-[10px] text-white/25">
                        {project.year}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
