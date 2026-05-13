"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Check, MapPin, Mail, Phone, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getContactContent, subscribeToAdminData, ADMIN_KEYS } from "@/lib/admin-data";

export default function ContactPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState([
    { icon: MapPin, title: "Studio", desc: "Shenzhen, China" },
    { icon: Mail, title: "Email", desc: "hello@anyhavejewelry.com" },
    { icon: Phone, title: "Phone", desc: "+86 755 8888 9999" },
    { icon: Clock, title: "Hours", desc: "Mon-Fri 9:00-18:00 CST" },
  ]);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop");

  const loadContent = () => {
    const content = getContactContent();
    setContactInfo([
      { icon: MapPin, title: "Studio", desc: content.studio },
      { icon: Mail, title: "Email", desc: content.email },
      { icon: Phone, title: "Phone", desc: content.phone },
      { icon: Clock, title: "Hours", desc: content.hours },
    ]);
    setImage(content.image);
  };

  useEffect(() => {
    loadContent();
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.contactContent) loadContent();
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {t.contact.getInTouch}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            {t.contact.title}
          </h1>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              {t.contact.reachOut}
            </h2>
            <div className="space-y-6 mb-10">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-4 h-4 text-charcoal/60" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{info.title}</p>
                    <p className="text-sm text-charcoal/50">{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-[4/3] bg-stone rounded-sm overflow-hidden">
              <img
                src={image}
                alt="Anyhave Jewelry studio"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 border border-black/5 space-y-5">
              <h3 className="font-medium text-charcoal mb-2">{t.contact.sendMessage}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">{t.contact.firstName}</label>
                  <input required type="text" className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors" placeholder={t.contact.firstNamePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">{t.contact.lastName}</label>
                  <input required type="text" className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors" placeholder={t.contact.lastNamePlaceholder} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-charcoal/60 mb-1.5">{t.contact.email}</label>
                <input required type="email" className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors" placeholder={t.contact.emailPlaceholder} />
              </div>

              <div>
                <label className="block text-xs text-charcoal/60 mb-1.5">{t.contact.subject}</label>
                <select required className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors">
                  <option value="">{t.contact.selectTopic}</option>
                  <option value="custom">{t.contact.topicCustom}</option>
                  <option value="order">{t.contact.topicOrder}</option>
                  <option value="product">{t.contact.topicProduct}</option>
                  <option value="returns">{t.contact.topicReturns}</option>
                  <option value="other">{t.contact.topicOther}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-charcoal/60 mb-1.5">{t.contact.message}</label>
                <textarea required rows={5} className="w-full px-3 py-2.5 bg-cream border border-black/5 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors resize-none" placeholder={t.contact.messagePlaceholder} />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.contact.messageSent}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
