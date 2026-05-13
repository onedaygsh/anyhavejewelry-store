"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { getPageContent } from "@/lib/admin-data";
import { useI18n } from "@/lib/i18n/context";

const images = [
  "/images/jewelry/ring-120.png",
  "/images/jewelry/ring-105.png",
  "/images/jewelry/ring-148.png",
];

export default function InspireMoments() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const basePosts = t.home.inspireMoments.posts.map((p, i) => ({
    ...p,
    image: images[i],
    href: "/blog/",
  }));

  const [posts, setPosts] = useState<{ title: string; desc: string; image: string; href: string }[]>(basePosts);

  useEffect(() => {
    const content = getPageContent({
      heroTitle: "",
      heroSubtitle: "",
      heroCta: "",
      heroImage: "",
      heroCta2En: "",
      heroCta2Zh: "",
      collections: [],
      inspirePosts: basePosts,
    });
    if (content.inspirePosts && content.inspirePosts.length > 0) {
      setPosts(content.inspirePosts);
    }
  }, [t]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal tracking-[0.1em] mb-2">
            {t.home.inspireMoments.title}
          </h2>
          <p className="text-sm text-charcoal/50 italic">
            {t.home.inspireMoments.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title + i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={post.href} className="group block">
                <div className="aspect-[4/3] bg-white rounded-sm overflow-hidden mb-4 border border-black/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1 group-hover:text-champagne transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-charcoal/50 mb-3 line-clamp-2">
                  {post.desc}
                </p>
                <span className="text-xs text-champagne underline underline-offset-2">
                  {t.home.inspireMoments.readMore}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
