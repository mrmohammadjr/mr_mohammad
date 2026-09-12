"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LuArrowUp } from "react-icons/lu";
import { RiNextjsFill,RiSupabaseFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiGsap } from "react-icons/si";
import Logo from "../../assets/logo.webp";
import Image from "next/image";
gsap.registerPlugin(useGSAP);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        overflow-hidden
        border-t
        border-white/10
        bg-linear-to-r from-zinc-800 to-[#050505]
        text-white
      "
    >
      <div
        className="
          footer-content
          mx-auto
          flex
          w-full
          max-w-[1600px]
          flex-col
          px-6
          py-10

          sm:px-8
          sm:py-12

          md:px-12

          lg:px-16
          lg:py-14

          xl:px-20
        "
      >
        <div className="flex justify-between items-center">
          <Image className="w-10 rounded-xl" src={Logo} alt="logo" />
          <div className="flex justify-between items-center gap-5">
            <p>Made By</p>
            <span className="flex justify-between items-center gap-1">
                <RiNextjsFill className="text-2xl "/>
                <BiLogoTypescript className="text-2xl text-blue-500"/>
                <RiSupabaseFill className="text-2xl text-green-500"/>
                <SiGsap className="text-2xl text-lime-500"/>
            </span>
          </div>
        </div>
        <div className="my-8 h-px w-full bg-white/10 sm:my-10" />

        {/* ================= BOTTOM ================= */}

        <div
          className="
            flex
            flex-col
            gap-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-gray-600 sm:text-sm">
            © {new Date().getFullYear()} Mohammad Javad Rasooli. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={goToTop}
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              text-xs
              text-gray-400
              transition-colors
              duration-300
              hover:text-white

              sm:text-sm
            "
          >
            Back to top
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:border-white/30
              "
            >
              <LuArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
