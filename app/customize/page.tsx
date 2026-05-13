'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Diamond,
  Box,
  Palette,
  Sparkles,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  ImageIcon,
  Gem,
  Wand2,
  Heart,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { getCustomizeContent, subscribeToAdminData, ADMIN_KEYS, defaultCustomizeContent, type CustomizeContent } from '@/lib/admin-data'

export default function CustomizePage() {
  const { t, locale } = useI18n()
  const [config, setConfig] = useState<CustomizeContent>(defaultCustomizeContent)
  const [style, setStyle] = useState('solitaire')
  const [stone, setStone] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const loadConfig = () => {
    setConfig(getCustomizeContent())
  }

  useEffect(() => {
    loadConfig()
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.customizeContent) loadConfig()
    })
  }, [])

  const ringStyles = config.ringStyles.map((s) => ({
    id: s.id,
    label: locale === 'en' ? s.labelEn : s.labelZh,
    image: s.image,
  }))

  const stones = config.stones.map((s) => ({
    name: locale === 'en' ? s.nameEn : s.nameZh,
    desc: s.type === 'lab'
      ? (locale === 'en' ? 'Lab-Grown Diamond' : '培育钻石')
      : (locale === 'en' ? 'Moissanite' : '莫桑石'),
    color: s.color,
    price: s.price,
  }))

  const whyCustom = [
    {
      icon: Wand2,
      title: t.customize.modularDesign,
      desc: t.customize.modularDesc,
    },
    {
      icon: Heart,
      title: t.customize.ecoFriendly,
      desc: t.customize.ecoDesc,
    },
    {
      icon: Gem,
      title: t.customize.qualityPrice,
      desc: t.customize.qualityPriceDesc,
    },
  ]

  const processSteps = [
    { icon: Diamond, title: t.customize.step1, desc: t.customize.step1Desc },
    { icon: Box, title: t.customize.step2, desc: t.customize.step2Desc },
    { icon: Palette, title: t.customize.step3, desc: t.customize.step3Desc },
    { icon: Sparkles, title: t.customize.step4, desc: t.customize.step4Desc },
  ]

  const faqs = [
    { q: t.customize.faq1Q, a: t.customize.faq1A },
    { q: t.customize.faq2Q, a: t.customize.faq2A },
    { q: t.customize.faq3Q, a: t.customize.faq3A },
    { q: t.customize.faq4Q, a: t.customize.faq4A },
    { q: t.customize.faq5Q, a: t.customize.faq5A },
  ]

  const selectedStyle = ringStyles.find((s) => s.id === style)
  const selectedStone = stones.find((s) => s.name === stone)

  return (
    <div className='bg-cream min-h-screen'>
      {/* Hero */}
      <section className='relative pt-28 pb-20 md:pb-28 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center'
          >
            <div>
              <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>
                {t.customize.heroLabel}
              </p>
              <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight'>
                {t.customize.heroTitle}
              </h1>
              <p className='text-charcoal/60 max-w-md leading-relaxed mb-8'>
                {t.customize.heroDesc}
              </p>
              <div className='flex flex-wrap gap-4'>
                <Link
                  href='/rta-configurator/'
                  className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                >
                  <Wand2 className='w-4 h-4' />
                  {t.customize.start3D}
                </Link>
                <Link
                  href='/products/'
                  className='inline-block px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors'
                >
                  {t.customize.browseProducts}
                </Link>
              </div>
            </div>
            <div className='aspect-[4/3] bg-stone overflow-hidden rounded-sm relative'>
              <img
                src={config.heroImage}
                alt='Custom Jewelry Design'
                className='absolute inset-0 w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-6 right-6'>
                <div className='bg-white/90 backdrop-blur px-4 py-3 border border-white/20 inline-flex items-center gap-2'>
                  <Sparkles className='w-4 h-4 text-champagne' />
                  <span className='text-xs tracking-widest uppercase text-charcoal/70'>
                    {locale === 'en' ? config.heroBadgeEn : config.heroBadgeZh}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Custom */}
      <section className='bg-white py-20 md:py-28 border-y border-black/5'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.whyRTALabel}</p>
            <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-4'>{t.customize.whyRTATitle}</h2>
            <p className='text-charcoal/50 max-w-xl mx-auto'>{t.customize.whyRTADesc}</p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {whyCustom.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='text-center'
              >
                <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream-dark mb-5'>
                  <item.icon className='w-6 h-6 text-charcoal/70' />
                </div>
                <h3 className='text-base font-medium text-charcoal mb-2'>{item.title}</h3>
                <p className='text-sm text-charcoal/50 leading-relaxed'>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.processLabel}</p>
            <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-4'>{t.customize.processTitle}</h2>
            <p className='text-charcoal/50 max-w-xl mx-auto'>{t.customize.processDesc}</p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className='bg-white p-8 border border-black/5 relative group hover:border-champagne/30 transition-all duration-300'
              >
                <div className='absolute top-4 right-4 text-[10px] text-charcoal/20 font-mono tracking-wider'>0{i + 1}</div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center group-hover:bg-champagne/10 transition-colors'>
                    <step.icon className='w-4 h-4 text-charcoal/70' />
                  </div>
                </div>
                <h3 className='text-base font-medium text-charcoal mb-2'>{step.title}</h3>
                <p className='text-sm text-charcoal/50 leading-relaxed'>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator CTA */}
      <section className='bg-charcoal py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className='text-xs tracking-[0.3em] uppercase text-white/40 mb-4'>{t.customize.configuratorLabel}</p>
              <h2 className='font-serif text-3xl md:text-4xl text-white mb-6 leading-tight'>
                {t.customize.configuratorTitle}
              </h2>
              <p className='text-white/60 max-w-md leading-relaxed mb-8'>
                {t.customize.configuratorDesc}
              </p>
              <ul className='space-y-3 mb-8'>
                {[t.customize.feature1, t.customize.feature2, t.customize.feature3].map((f) => (
                  <li key={f} className='flex items-center gap-2 text-sm text-white/70'>
                    <Check className='w-4 h-4 text-champagne' />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href='/rta-configurator/'
                className='inline-flex items-center gap-2 px-8 py-3.5 bg-white text-charcoal text-sm tracking-widest font-medium hover:bg-cream transition-colors'
              >
                {t.customize.tryNow}
                <ArrowRight className='w-4 h-4' />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='aspect-square bg-white/5 rounded-sm overflow-hidden relative'
            >
              <img
                src={config.configuratorImage}
                alt='3D Configurator Preview'
                className='absolute inset-0 w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='bg-white/10 backdrop-blur px-6 py-3 border border-white/20 text-white text-sm tracking-widest flex items-center gap-2'>
                  <Wand2 className='w-4 h-4' />
                  {locale === 'en' ? config.livePreviewBadgeEn : config.livePreviewBadgeZh}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Style & Stone Selector */}
      <section className='bg-white py-20 md:py-28 border-y border-black/5'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.productSeriesLabel}</p>
            <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-4'>{t.customize.productSeriesTitle}</h2>
            <p className='text-charcoal/50 max-w-xl mx-auto'>{t.customize.productSeriesDesc}</p>
          </motion.div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'>
            {ringStyles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`group relative aspect-square border transition-all duration-300 overflow-hidden ${
                  style === s.id ? 'border-champagne' : 'border-black/5 hover:border-champagne/50'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.label}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    style === s.id ? 'scale-105 opacity-100' : 'scale-100 opacity-70 group-hover:opacity-90'
                  }`}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
                <div className='absolute bottom-0 inset-x-0 p-4 text-center'>
                  <span className={`text-sm font-medium ${style === s.id ? 'text-white' : 'text-white/90'}`}>{s.label}</span>
                </div>
                {style === s.id && (
                  <div className='absolute top-3 right-3 w-6 h-6 bg-champagne rounded-full flex items-center justify-center'>
                    <Check className='w-3.5 h-3.5 text-white' />
                  </div>
                )}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-10'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.materialLabel}</p>
            <h3 className='font-serif text-2xl text-charcoal mb-4'>{t.customize.materialTitle}</h3>
          </motion.div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {stones.map((s) => (
              <button
                key={s.name}
                onClick={() => setStone(s.name)}
                className={`p-6 border text-left transition-all ${
                  stone === s.name ? 'border-champagne bg-cream/50' : 'border-black/5 hover:border-champagne/50'
                }`}
              >
                <div className='flex items-center gap-2 mb-3'>
                  <span className='w-6 h-6 rounded-full border border-black/10' style={{ backgroundColor: s.color }} />
                  {stone === s.name && <Check className='w-3.5 h-3.5 text-champagne ml-auto' />}
                </div>
                <p className='text-sm font-medium text-charcoal mb-1'>{s.name}</p>
                <p className='text-xs text-charcoal/40 mb-2'>{s.desc}</p>
                <p className='text-xs text-charcoal/60'>{t.customize.materialUnit.replace('{price}', String(s.price))}</p>
              </button>
            ))}
          </div>

          {/* Selection Summary */}
          <AnimatePresence>
            {(selectedStyle || selectedStone) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='mt-10 p-6 bg-cream border border-champagne/30'
              >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div>
                    <p className='text-xs tracking-widest uppercase text-charcoal/40 mb-2'>
                      {locale === 'en' ? 'Your Selection' : '您的选择'}
                    </p>
                    <p className='text-sm text-charcoal'>
                      {selectedStyle ? `${selectedStyle.label}` : ''}
                      {selectedStyle && selectedStone ? ' + ' : ''}
                      {selectedStone ? `${selectedStone.name}` : ''}
                    </p>
                  </div>
                  <Link
                    href='/contact/'
                    className='inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-xs tracking-widest font-medium hover:bg-graphite transition-colors'
                  >
                    {t.customize.contactDesigner}
                    <ArrowRight className='w-3 h-3' />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Virtual Preview Teaser */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='aspect-[4/3] bg-stone overflow-hidden rounded-sm relative'
            >
              <img
                src={config.virtualPreviewImage}
                alt='Virtual Preview'
                className='absolute inset-0 w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/20' />
              <div className='absolute bottom-6 left-6 right-6'>
                <div className='bg-white/90 backdrop-blur p-4 border border-white/20'>
                  <div className='flex items-center gap-2 mb-1'>
                    <ImageIcon className='w-4 h-4 text-champagne' />
                    <span className='text-xs tracking-widest uppercase text-charcoal/60'>{t.customize.virtualSpaceOverlayLabel}</span>
                  </div>
                  <p className='text-sm text-charcoal'>{t.customize.virtualSpaceOverlayDesc}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.virtualSpaceLabel}</p>
              <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight'>{t.customize.virtualSpaceTitle}</h2>
              <p className='text-charcoal/60 max-w-md leading-relaxed mb-6'>
                {t.customize.virtualSpaceDesc}
              </p>
              <ul className='space-y-3 mb-8'>
                {[t.customize.aiFeature1, t.customize.aiFeature2, t.customize.aiFeature3].map((f) => (
                  <li key={f} className='flex items-center gap-2 text-sm text-charcoal/60'>
                    <Check className='w-4 h-4 text-champagne' />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href='/contact/'
                className='inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors'
              >
                {t.customize.bookExperience}
                <ArrowRight className='w-4 h-4' />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='bg-white py-20 md:py-28 border-y border-black/5'>
        <div className='max-w-3xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{t.customize.faqLabel}</p>
            <h2 className='font-serif text-3xl text-charcoal'>{t.customize.faqTitle}</h2>
          </motion.div>
          <div className='space-y-3'>
            {faqs.map((faq, i) => (
              <div key={i} className='bg-cream border border-black/5'>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className='w-full flex items-center justify-between p-5 text-left'
                >
                  <span className='text-sm font-medium text-charcoal pr-4'>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal/40 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='overflow-hidden'
                    >
                      <p className='px-5 pb-5 text-sm text-charcoal/60 leading-relaxed'>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-24'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className='w-8 h-8 text-champagne mx-auto mb-4' />
            <h2 className='font-serif text-2xl text-charcoal mb-3'>{t.customize.stillQuestions}</h2>
            <p className='text-charcoal/60 max-w-lg mx-auto mb-8'>
              {t.customize.stillQuestionsDesc}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/contact/'
                className='inline-block px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
              >
                {t.customize.contactDesigner}
              </Link>
              <Link
                href='/rta-configurator/'
                className='inline-block px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors'
              >
                {t.customize.tryItYourself}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
