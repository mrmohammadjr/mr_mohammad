"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { LuMail, LuPhone, LuArrowUpRight } from "react-icons/lu";

gsap.registerPlugin(useGSAP);

const CONTACTS = [
  {
    icon: LuMail,
    label: "Email",
    value: "mr.mohammadjavadrasooli@gmail.com",
    href: "mailto:mr.mohammadjavadrasooli@gmail.com",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    value: "@mr_mohammadjr",
    href: "https://instagram.com/mr_mohammadjr",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mohammad-javad-rasooli",
    href: "https://www.linkedin.com/in/mohammad-javad-rasooli-282505260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    icon: LuPhone,
    label: "Phone",
    value: "+98 921 1770 145",
    href: "tel:+989211770145",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector(
        "[data-contact-heading]",
      );

      const description = sectionRef.current?.querySelector(
        "[data-contact-text]",
      );

      const items = sectionRef.current?.querySelectorAll(
        "[data-contact-item]",
      );

      if (!heading || !description || !items) return;

      gsap.set(heading, {
        opacity: 0,
        y: 50,
      });

      gsap.set(description, {
        opacity: 0,
        y: 30,
      });

      gsap.set(items, {
        opacity: 0,
        y: 35,
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
          duration: 0.9,
        })
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.35",
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
      id="contact"
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
      <div className="mx-auto flex min-h-[calc(100vh-12rem)]  flex-col justify-center">

        {/* Header */}
        <div className="">

          {/* Section Number */}
          

          {/* Heading */}
          <div>
            <div data-contact-heading>
              <h2 className=" text-3xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl ">
                Let&apos;s work
                <br />
                <span className="text-white/25">
                  together.
                </span>
              </h2>
            </div>

            <p
              data-contact-text
              className="mt-8 max-w-xl text-sm leading-7 text-white/40"
            >
              Have a project in mind, want to collaborate, or simply
              want to say hello? Feel free to reach out.
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="mt-20 border-t border-white/10">
          {CONTACTS.map((contact) => {
            const Icon = contact.icon;

            const isExternal =
              contact.label === "Instagram" ||
              contact.label === "LinkedIn";

            return (
              <a
                key={contact.label}
                href={contact.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                data-contact-item
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  gap-6
                  border-b
                  border-white/10
                  py-6
                  transition-all
                  duration-500
                  hover:px-3
                "
              >
                {/* Left */}
                <div className="flex items-center gap-5">

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
                      bg-white/[0.03]
                      text-white/50
                      transition-all
                      duration-500
                      group-hover:border-white/30
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <Icon size={18} />
                  </div>

                  {/* Information */}
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      {contact.label}
                    </p>

                    <p className="mt-1 text-sm text-white/60 transition-colors duration-300 group-hover:text-white">
                      {contact.value}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <LuArrowUpRight
                  size={19}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    text-white/20
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-white
                  "
                />

                {/* Hover Line */}
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}