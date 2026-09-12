import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Play,
} from "lucide-react";

import { getBlogs } from "@/lib/blog/getBlogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const blogs = await getBlogs();

  const post = blogs?.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const media = [...(post.blog_media ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
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

      {/* ================= ARTICLE ================= */}

      <article className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-28">
        {/* Top info */}

        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-8 bg-white/30" />

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
            Blog Article
          </span>
        </div>

        {/* Title */}

        <h1
          className="
            max-w-5xl
            text-4xl
            font-medium
            leading-[1.05]
            tracking-[-0.045em]

            sm:text-5xl

            md:text-6xl

            lg:text-7xl

            xl:text-[82px]
          "
        >
          {post.title}
        </h1>

        {/* Excerpt */}

        {post.excerpt && (
          <p
            className="
              mt-7
              max-w-3xl
              text-base
              leading-7
              text-white/45

              sm:text-lg
              sm:leading-8
            "
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-5
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          <span className="flex items-center gap-2">
            <CalendarDays size={14} />

            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center gap-2">
            <Clock3 size={14} />

            {Math.max(
              1,
              Math.ceil(post.content.trim().split(/\s+/).length / 200),
            )}{" "}
            min read
          </span>
        </div>

        {/* ================= COVER ================= */}

        <div
          className="
            relative
            mt-14
            aspect-[16/9]
            overflow-hidden
            border
            border-white/10
            bg-[#0a0a0a]

            sm:mt-16

            lg:mt-20
          "
        >
          <Image
            src={post.cover_image ?? "/images/blog-placeholder.jpg"}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* ================= CONTENT + MEDIA ================= */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-5xl
            grid-cols-1
            gap-14

            lg:mt-20
            lg:grid-cols-[minmax(0,1fr)_220px]
            lg:gap-20
          "
        >
          {/* Content */}

          <div>
            <div
              className="
                whitespace-pre-line
                text-[15px]
                leading-8
                text-white/60

                sm:text-base
                sm:leading-9
              "
            >
              {post.content}
            </div>

            {/* Media */}

            {media.length > 0 && (
              <div className="mt-14 space-y-10">
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
                            className="block h-auto max-h-[700px] w-full"
                          />

                          <div className="pointer-events-none absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur">
                            <Play size={13} />
                          </div>
                        </div>

                        {item.caption && (
                          <figcaption className="mt-3 text-center text-xs text-white/30">
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
                          className="
                            h-auto
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            hover:scale-[1.015]
                          "
                        />
                      </div>

                      {item.caption && (
                        <figcaption className="mt-3 text-center text-xs text-white/30">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}

          <aside
            className="
              hidden
              border-l
              border-white/10
              pl-7

              lg:block
            "
          >
            <div className="sticky top-10 space-y-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Article
                </p>

                <p className="mt-2 break-words text-xs leading-5 text-white/50">
                  {post.slug}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Published
                </p>

                <p className="mt-2 text-xs text-white/50">
                  {new Date(post.created_at).toLocaleDateString("en-US")}
                </p>
              </div>

              <Link
                href="/"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-white/40
                  transition-colors
                  hover:text-white
                "
              >
                More articles

                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </aside>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-20 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-sm
              text-white/40
              transition-colors
              hover:text-white
            "
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to all articles
          </Link>
        </div>
      </article>
    </main>
  );
}