"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getHomepageSections, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

function getInitials(name: string) {
  if (/[一-龥]/.test(name)) return name[0];
  const parts = name.split(" ");
  return parts[parts.length - 1][0];
}

export default function Testimonials() {
  const { t, locale } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [reviews, setReviews] = useState<{ name: string; location: string; text: string; initials: string; color: string; rating: number }[]>(
    t.home.testimonials.reviews.map((r) => ({
      ...r,
      initials: getInitials(r.name),
      color: "bg-stone",
      rating: 5,
    }))
  );

  const loadReviews = () => {
    const sections = getHomepageSections();
    if (sections.testimonials && sections.testimonials.length > 0) {
      setReviews(
        sections.testimonials.map((r) => ({
          name: r.name,
          location: locale === "en" ? r.locationEn : r.locationZh,
          text: locale === "en" ? r.textEn : r.textZh,
          initials: getInitials(r.name),
          color: "bg-stone",
          rating: 5,
        }))
      );
    }
  };

  useEffect(() => {
    loadReviews();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.homepageSections) loadReviews();
    });
  }, [locale]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4"
        >
          {t.home.testimonials.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm text-charcoal/50 text-center mb-16 max-w-md mx-auto"
        >
          {t.home.testimonials.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white p-6 border border-black/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center text-xs font-medium text-charcoal/70">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{review.name}</p>
                  <p className="text-xs text-charcoal/40">{review.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-warm-gold text-warm-gold"
                  />
                ))}
              </div>
              <p className="text-sm text-charcoal/60 leading-relaxed italic">
                &quot;{review.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
