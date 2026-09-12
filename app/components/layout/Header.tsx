"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "../../assets/logo.webp"
import Image from "next/image";
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Load-in sequence: logo, nav items and CTA settle into place.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-nav-logo]", { y: -16, opacity: 0, duration: 0.6 })
        .from(
          "[data-nav-link]",
          { y: -12, opacity: 0, duration: 0.5, stagger: 0.06 },
          "-=0.35"
        )
        .from("[data-nav-cta]", { y: -12, opacity: 0, duration: 0.5 }, "-=0.3");
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Hairline + backdrop appear once the page has scrolled a bit.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Image className="w-10 rounded-xl" src={Logo} alt="logo"/>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-link
              className="group relative py-1 text-sm text-muted hover:text-fg transition-colors duration-200"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          data-nav-cta
          className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          Let&apos;s talk
          <ArrowUpRight size={15} strokeWidth={2} />
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden text-fg"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-bg/80 backdrop-blur-md overflow-hidden transition-[max-height] duration-300 ease-out ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 bg-bg border-b border-border">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base text-muted hover:text-fg transition-colors duration-200 border-b border-border/60 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-fg hover:border-accent hover:text-accent"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </nav>
      </div>
    </header>
  );
}
