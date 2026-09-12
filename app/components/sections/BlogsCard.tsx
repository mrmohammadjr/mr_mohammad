"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Blog, BlogMedia } from "@/lib/blog/types";

gsap.registerPlugin(useGSAP);

export default function BlogsCard({ blogs }: { blogs: Blog[] | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-blog-heading]");

      const cards = sectionRef.current?.querySelectorAll("[data-blog-card]");

      if (!heading || !cards) return;

      gsap.set(heading, {
        opacity: 0,
        y: 35,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 45,
      });

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.4",
        );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeline.play();
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
        timeline.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="
        min-h-screen
        w-full
        shrink-0
        overflow-hidden
        border-t
        border-white/[0.08]
        bg-linear-to-r from-zinc-800 to-[#050505]
        px-6
        py-24
        text-white
        sm:px-10
        lg:px-16
        lg:py-28
      "
    >
      <div className="mx-auto">
        {/* Header */}
        <div data-blog-heading className="mb-14">
          <div>
            <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Latest Articles
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
              Thoughts, experiments and things I learn while building modern web
              applications.
            </p>
          </div>
        </div>

        {/* Cards */}
        {blogs?.length === 0 ? (
          <p className="text-3xl">No blog posts have been published yet.</p>
        ) : blogs === null ?(
        
          <p className="text-3xl">No blog posts have been published yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1  border-t  border-white/10 md:grid-cols-2 lg:grid-cols-5">
              {blogs?.map((blog:Blog) => (
        <article key={blog.id} className="">
          <Link href={`/blog/${blog?.slug}`} className="">
            {blog?.cover_image && (
              <Image
                src={blog?.cover_image}
                alt={blog.title}
                width={800}
                height={500}
                className="h-auto w-full object-cover"
              />
            )}

            <h2 className="mt-4 text-xl font-semibold">
              {blog.title}
            </h2>

            {blog?.excerpt && (
              <p className="mt-2 text-sm">
                {blog?.excerpt}
              </p>
            )}
          </Link>
        </article>
      ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
