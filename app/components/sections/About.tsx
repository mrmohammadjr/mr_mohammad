"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import MyPhoto from "../../assets/myPhoto.webp";

gsap.registerPlugin(useGSAP);

const About = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.from(".hero-greeting", {
          opacity: 0,
          y: 30,
          duration: 0.7,
        })
          .from(
            ".hero-name",
            {
              opacity: 0,
              y: 30,
              duration: 0.7,
            },
            "-=0.4",
          )
          .from(
            ".hero-title",
            {
              opacity: 0,
              y: 50,
              duration: 0.9,
            },
            "-=0.4",
          )
          .from(
            ".hero-description",
            {
              opacity: 0,
              y: 25,
              duration: 0.7,
            },
            "-=0.5",
          )
          .from(
            ".hero-actions",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.4",
          )
          .from(
            ".hero-image",
            {
              opacity: 0,
              x: 120,
              scale: 0.9,
              duration: 1.2,
              ease: "power4.out",
            },
            "-=0.9",
          );
      });

      // Mobile / Tablet
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.from(".hero-image", {
          opacity: 0,
          y: -40,
          scale: 0.92,
          duration: 1,
          ease: "power4.out",
        })
          .from(
            ".hero-greeting",
            {
              opacity: 0,
              y: 25,
              duration: 0.6,
            },
            "-=0.4",
          )
          .from(
            ".hero-name",
            {
              opacity: 0,
              y: 25,
              duration: 0.6,
            },
            "-=0.35",
          )
          .from(
            ".hero-title",
            {
              opacity: 0,
              y: 30,
              duration: 0.7,
            },
            "-=0.35",
          )
          .from(
            ".hero-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.35",
          )
          .from(
            ".hero-actions",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.35",
          );
      });

      // Image breathing animation
      gsap.to(".hero-image img", {
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => mm.revert();
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      id="home"
      className="
        hero relative flex min-h-screen w-full
        flex-col overflow-hidden
        bg-linear-to-r from-zinc-800 to-[#050505]
        text-white

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          hero-image
          order-1
          relative z-10
          flex w-full
          justify-center

          pt-16

          sm:pt-20

          md:pt-16

          lg:order-2
          lg:w-[45%]
          lg:justify-end
          lg:pt-0
        "
      >
        <Image
          src={MyPhoto}
          alt="Mohammad Javad Rasooli"
          priority
          className="
            h-auto
            w-[70%]
            max-w-[300px]
            object-contain

            sm:w-[55%]
            sm:max-w-[340px]

            md:w-[45%]
            md:max-w-[360px]
            lg:rounded-b-0
            max-md:rounded-b-2xl
            max-sm:rounded-b-2xl
            lg:mt-16
            lg:w-[79.3%]
            lg:max-w-none
          "
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative z-10
          order-2
          flex w-full
          flex-col
          items-center
          gap-5
          px-6
          pb-16
          pt-8
          text-center

          sm:gap-6
          sm:px-10

          md:px-16

          lg:order-1
          lg:w-[55%]
          lg:items-start
          lg:gap-7
          lg:px-0
          lg:pb-0
          lg:pl-20
          lg:pt-0
          lg:text-left
        "
      >
        {/* Greeting */}
        <p
          className="
            hero-greeting
            text-base
            font-medium

            sm:text-lg

            md:text-xl
          "
        >
          Hello Everyone
        </p>

        {/* Name */}
        <p
          className="
            hero-name
            text-lg
            text-gray-400

            sm:text-xl

            md:text-2xl
          "
        >
          I&apos;m Mohammad Javad Rasooli
        </p>

        {/* Title */}
        <h1
          className="
            hero-title
            text-3xl
            font-extrabold
            leading-[1.08]
            tracking-[-0.03em]
            sm:text-4xl
            md:text-5xl
            lg:text-[48px]
            xl:text-[58px]
          "
        >
          Front-End Developer
        </h1>
        <p
          className="
            hero-description
            max-w-xl
            text-sm
            leading-6
            text-gray-500
            sm:text-base
            sm:leading-7"
        >
          I&apos;m <span className="text-white">Mohammad Javad</span>, a{" "}
          <span className="text-white">front-end developer</span> with two years
          of hands-on experience, passionate about creating engaging interfaces
          and seamless user experiences. I continuously improve my skills
          through learning, documentation, and practical experience to deliver
          technically strong and user-focused projects. Now, I&apos;m{" "}
          <span className="text-white">
            embarking on my freelancing journey
          </span>
          , looking for new opportunities to grow, challenge myself, and create
          high-quality digital experiences.
        </p>

        {/* Actions */}
        <div
          className="
            hero-actions
            flex
            flex-wrap
            items-center
            justify-center
            gap-4

            sm:gap-6

            lg:justify-start
          "
        >
          <a
            href="#projects"
            className="
              border
              border-white
              px-5
              py-3
              text-sm
              transition-all
              duration-300

              hover:bg-white
              hover:text-black
            "
          >
            View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1v32zIaOYuIBmxd62jtCzBRpuAIGRF36I/view?usp=drive_link"
            rel="noopener noreferrer"
            className="
              text-sm
              text-gray-300
              transition-colors
              duration-300
              hover:text-gray-500"
          >
            Download CV ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
