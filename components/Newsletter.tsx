"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="bg-obsidian text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-warm-gold/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">
          {t.newsletter.label}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl mb-6">
          {t.newsletter.title}
        </h2>
        <p className="text-white/50 leading-relaxed mb-10 max-w-lg mx-auto">
          {t.newsletter.desc}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder}
            className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm tracking-wide focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            type="submit"
            disabled={submitted}
            className="px-6 py-4 bg-white text-obsidian text-sm tracking-widest font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4" />
                {t.newsletter.submitted}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.newsletter.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
