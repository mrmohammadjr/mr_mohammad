"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock3, Play, X } from "lucide-react";
import { Blog } from "@/lib/blog/types";


export default function BlogModal({ post }: { post: Blog }) {
  const router = useRouter();

  const media = [...(post.blog_media ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  // Lock body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md">
      {/* ================= BACKDROP ================= */}

      <button
        type="button"
        aria-label="Close article"
        onClick={() => router.back()}
        className="absolute inset-0 cursor-default"
      />

      {/* ================= MODAL ================= */}

      <article
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          bg-[#070707]

          lg:my-6
          lg:h-[calc(100vh-48px)]
          lg:max-w-5xl
          lg:border
          lg:border-white/10
          lg:shadow-2xl
        "
      >
        {/* ================= TOP BAR ================= */}

        <header
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#070707]/90
            px-5
            py-4
            backdrop-blur-xl

            sm:px-7
          "
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
              Blog Article
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Open full page */}

            <a
              href={`/blog/${post.slug}`}
              className="
                hidden
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-white/35
                transition-colors
                hover:text-white

                sm:flex
              "
            >
              Open page
              <ArrowUpRight size={13} />
            </a>

            {/* Close */}

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Close article"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-white/10
                text-white/50
                transition-all
                duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
              "
            >
              <X size={17} />
            </button>
          </div>
        </header>

        {/* ================= SCROLL CONTENT ================= */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
            {/* Label */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-7 bg-white/30" />

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                Article
              </span>
            </div>

            {/* Title */}

            <h1
              className="
                max-w-3xl
                text-3xl
                font-medium
                leading-[1.08]
                tracking-[-0.04em]

                sm:text-4xl

                md:text-5xl
              "
            >
              {post.title}
            </h1>

            {/* Meta */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-5
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-white/25
              "
            >
              <span className="flex items-center gap-2">
                <CalendarDays size={13} />

                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 size={13} />
                {Math.max(
                  1,
                  Math.ceil((post.content ?? "").trim().split(/\s+/).length / 200),
                )}{" "}
                min read
              </span>
            </div>

            {/* ================= COVER ================= */}

            <div
              className="
                relative
                mt-10
                aspect-[16/8]
                overflow-hidden
                border
                border-white/10
                bg-[#0b0b0b]

                sm:mt-12
              "
            >
              <Image
                src={post.cover_image ?? "/images/blog-placeholder.jpg"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            {/* ================= EXCERPT ================= */}

            {post.excerpt && (
              <div className="mt-10 border-l border-white/20 pl-5 sm:mt-12">
                <p className="text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* ================= CONTENT ================= */}

            <div
              className="
                mt-10
                whitespace-pre-line
                text-[15px]
                leading-8
                text-white/60

                sm:mt-12
                sm:text-base
                sm:leading-9
              "
            >
              {post.content}
            </div>

            {/* ================= MEDIA ================= */}

            {media.length > 0 && (
              <div className="mt-12 space-y-10 sm:mt-16">
                {media.map((item) => {
                  if (item.type === "video") {
                    return (
                      <figure key={item.id}>
                        <div className="relative overflow-hidden border border-white/10 bg-black">
                          <video
                            src={item.url}
                            controls
                            playsInline
                            preload="metadata"
                            className="block h-auto max-h-[600px] w-full"
                          />

                          <div className="pointer-events-none absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur">
                            <Play size={12} />
                          </div>
                        </div>

                        {item.caption && (
                          <figcaption className="mt-3 text-center text-[11px] text-white/25">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  return (
                    <figure key={item.id}>
                      <div className="relative overflow-hidden border border-white/10 bg-[#0a0a0a]">
                        <Image
                          src={item.url}
                          alt={item.alt ?? post.title}
                          width={1600}
                          height={1000}
                          className="h-auto w-full object-cover"
                        />
                      </div>

                      {item.caption && (
                        <figcaption className="mt-3 text-center text-[11px] text-white/25">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}

            {/* ================= END ================= */}

            <div className="mt-14 border-t border-white/10 pt-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                End of article
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
