"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Code2, Palette, Zap, ArrowUpRight } from "lucide-react";

import {
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiReact,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiGithub,
  SiTailwindcss,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "High-quality websites and web applications built with modern technologies.",
  },
  {
    number: "02",
    icon: Palette,
    title: "UI / UX Implementation",
    description:
      "Turning designs into clean, responsive and intuitive digital experiences.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Performance",
    description:
      "Optimized applications focused on speed, SEO and excellent user experience.",
  },
];

const SKILLS = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiReact, label: "React" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiCss, label: "CSS" },
  { icon: SiHtml5, label: "HTML" },
  { icon: SiGithub, label: "GitHub" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
];

export default function ServicesTwo() {
  const sectionRef = useRef<HTMLElement>(null);

 useGSAP(
  () => {
    const heading = sectionRef.current?.querySelector(
      "[data-services-heading]",
    );

    const serviceCards = sectionRef.current?.querySelectorAll(
      "[data-service-card]",
    );

    const skillsColumn = sectionRef.current?.querySelector(
      "[data-skills-col]",
    );

    const skillBadges = sectionRef.current?.querySelectorAll(
      "[data-skill-badge]",
    );

    if (!heading || !serviceCards || !skillsColumn || !skillBadges) return;

    // حالت اولیه
    gsap.set(heading, {
      opacity: 0,
      y: 35,
    });

    gsap.set(serviceCards, {
      opacity: 0,
      y: 40,
    });

    gsap.set(skillsColumn, {
      opacity: 0,
      y: 30,
    });

    gsap.set(skillBadges, {
      opacity: 0,
      y: 20,
      scale: 0.94,
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
      },
    });

    tl.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        serviceCards,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.4",
      )
      .to(
        skillsColumn,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4",
      )
      .to(
        skillBadges,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
        },
        "-=0.4",
      );

    /*
     * فعلاً برای تست، با IntersectionObserver
     * انیمیشن را اجرا می‌کنیم.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(sectionRef.current!);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  },
  {
    scope: sectionRef,
  },
);
  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        services
        min-h-screen
        w-full
        shrink-0
        overflow-hidden
        border-t
        border-white/[0.08]
        bg-linear-to-r from-zinc-800 to-[#050505]
        py-24
        text-white
        lg:py-28
      "
    >
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 ">
        {/* Header */}
        <div
          data-services-heading
          className="mb-14 "
        >
          

          {/* Heading */}
          <div>
            <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Services <span className="text-white/30">&amp;</span> Skills
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
              I create modern digital experiences with a strong focus on clean
              interfaces, performance and scalable frontend architecture.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Services */}
          <div
            data-services-col
            className="flex flex-col border-t border-white/10"
          >
            {SERVICES.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  data-service-card
                  className="
                    group
                    relative
                    flex
                    min-h-[190px]
                    items-start
                    gap-5
                    border-b
                    border-white/10
                    py-7
                    transition-all
                    duration-500
                    hover:px-3
                  "
                >
                  {/* Number */}
                  <span className="pt-1 font-mono text-[10px] text-white/25">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-white/80
                      transition-all
                      duration-500
                      group-hover:border-white/30
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <Icon size={19} strokeWidth={1.6} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/35 transition-colors duration-500 group-hover:text-white/55">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                 

                  {/* Hover line */}
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-0
                      bg-white
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />
                </article>
              );
            })}
          </div>

          {/* Skills */}
          <div data-skills-col>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Technologies
              </p>

              <span className="font-mono text-[10px] text-white/20">09</span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {SKILLS.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={skill.label}
                    data-skill-badge
                    className="
                      group
                      flex
                      aspect-square
                      flex-col
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:border-white/25
                      hover:bg-white/[0.06]
                    "
                  >
                    <Icon
                      size={23}
                      className="
                        text-white/55
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:text-white
                      "
                    />

                    <span className="text-[10px] text-white/35 transition-colors duration-500 group-hover:text-white/70">
                      {skill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
