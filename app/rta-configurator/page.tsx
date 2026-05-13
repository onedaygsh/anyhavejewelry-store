'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  Diamond,
  Gem,
  CircleDot,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { getCustomizeContent, subscribeToAdminData, ADMIN_KEYS, defaultCustomizeContent, type CustomizeContent } from '@/lib/admin-data'

interface RingConfig {
  style: string
  stone: string
  metal: string
  size: number
}

export default function JewelryConfiguratorPage() {
  const { t, locale } = useI18n()
  const [customConfig, setCustomConfig] = useState<CustomizeContent>(defaultCustomizeContent)
  const [config, setConfig] = useState<RingConfig>({
    style: 'solitaire',
    stone: 'round-moissanite',
    metal: '14k-white',
    size: 6,
  })

  const loadConfig = () => {
    setCustomConfig(getCustomizeContent())
  }

  useEffect(() => {
    loadConfig()
    return subscribeToAdminData((key) => {
      if (key === ADMIN_KEYS.customizeContent) loadConfig()
    })
  }, [])

  const ringStyles = customConfig.ringStyles.map((s) => ({
    id: s.id,
    label: s.labelEn,
    labelZh: s.labelZh,
    price: s.price,
    image: s.image,
  }))

  const stones = customConfig.stones.map((s) => ({
    id: s.id,
    label: s.nameEn,
    labelZh: s.nameZh,
    price: s.price,
    color: s.color,
  }))

  const metals = customConfig.metals.map((m) => ({
    id: m.id,
    label: m.nameEn,
    labelZh: m.nameZh,
    price: m.price,
  }))

  const selectedStyle = ringStyles.find((s) => s.id === config.style)
  const selectedStone = stones.find((s) => s.id === config.stone)
  const selectedMetal = metals.find((m) => m.id === config.metal)

  const totalPrice = useMemo(() => {
    const stylePrice = selectedStyle?.price || 0
    const stonePrice = selectedStone?.price || 0
    const metalPrice = selectedMetal?.price || 0
    return stylePrice + stonePrice + metalPrice
  }, [selectedStyle, selectedStone, selectedMetal])

  const updateConfig = (field: keyof RingConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const resetConfig = () => {
    setConfig({
      style: 'solitaire',
      stone: 'round-moissanite',
      metal: '14k-white',
      size: 6,
    })
  }

  const previewImage = selectedStyle?.image || ringStyles[0].image

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">
            {locale === 'en' ? 'Design Studio' : '设计工作室'}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {locale === 'en' ? 'Custom Ring Configurator' : '定制戒指配置器'}
          </h1>
          <p className="text-charcoal/60 max-w-xl">
            {locale === 'en'
              ? 'Design your perfect ring in real time. Mix and match styles, stones, and metals to see your creation come to life.'
              : '实时设计您的完美戒指。混合搭配风格、宝石和金属，见证您的创作栩栩如生。'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="sticky top-28">
              <div className="aspect-square bg-stone relative overflow-hidden mb-6">
                <img
                  src={previewImage}
                  alt={selectedStyle?.label || 'Ring preview'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur px-4 py-3 border border-white/20 inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-champagne" />
                    <span className="text-xs tracking-widest uppercase text-charcoal/70">
                      {locale === 'en' ? 'Live Preview' : '实时预览'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-white border border-black/5 p-6">
                <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-2">
                  {locale === 'en' ? 'Estimated Total' : '预估总价'}
                </p>
                <p className="font-serif text-3xl text-charcoal mb-4">
                  ¥{totalPrice.toLocaleString()}
                </p>
                <div className="space-y-2 text-sm text-charcoal/60 mb-6">
                  <div className="flex justify-between">
                    <span>{locale === 'en' ? 'Style' : '风格'}</span>
                    <span>{selectedStyle?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'en' ? 'Stone' : '宝石'}</span>
                    <span>{selectedStone?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'en' ? 'Metal' : '金属'}</span>
                    <span>{selectedMetal?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'en' ? 'Size' : '尺寸'}</span>
                    <span>US {config.size}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/contact/?style=${config.style}&stone=${config.stone}&metal=${config.metal}&size=${config.size}`}
                    className="flex-1 px-6 py-3 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors text-center flex items-center justify-center gap-2"
                  >
                    {locale === 'en' ? 'Request Quote' : '获取报价'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={resetConfig}
                    className="px-4 py-3 border border-black/10 text-charcoal/60 hover:border-charcoal/30 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Style Selector */}
            <section>
              <h3 className="text-sm font-medium tracking-wide text-charcoal mb-4">
                {locale === 'en' ? '1. Choose Your Style' : '1. 选择您的风格'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {ringStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => updateConfig('style', style.id)}
                    className={`group relative aspect-square border transition-all duration-300 overflow-hidden ${
                      config.style === style.id
                        ? 'border-champagne'
                        : 'border-black/5 hover:border-champagne/50'
                    }`}
                  >
                    <img
                      src={style.image}
                      alt={style.label}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        config.style === style.id ? 'scale-105 opacity-100' : 'scale-100 opacity-70 group-hover:opacity-90'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                      <span className={`text-sm font-medium ${config.style === style.id ? 'text-white' : 'text-white/90'}`}>
                        {locale === 'en' ? style.label : style.labelZh}
                      </span>
                    </div>
                    {config.style === style.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-champagne rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Stone Selector */}
            <section>
              <h3 className="text-sm font-medium tracking-wide text-charcoal mb-4">
                {locale === 'en' ? '2. Choose Your Stone' : '2. 选择您的宝石'}
              </h3>
              <div className="space-y-3">
                {stones.map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => updateConfig('stone', stone.id)}
                    className={`w-full flex items-center gap-4 p-4 border text-left transition-all ${
                      config.stone === stone.id
                        ? 'border-champagne bg-cream/50'
                        : 'border-black/5 hover:border-champagne/50'
                    }`}
                  >
                    <span
                      className="w-10 h-10 rounded-full border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: stone.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">
                        {locale === 'en' ? stone.label : stone.labelZh}
                      </p>
                      <p className="text-xs text-charcoal/40">
                        {locale === 'en' ? 'From' : '起价'} ¥{stone.price.toLocaleString()}
                      </p>
                    </div>
                    {config.stone === stone.id && (
                      <Check className="w-4 h-4 text-champagne" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Metal Selector */}
            <section>
              <h3 className="text-sm font-medium tracking-wide text-charcoal mb-4">
                {locale === 'en' ? '3. Choose Your Metal' : '3. 选择您的金属'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {metals.map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => updateConfig('metal', metal.id)}
                    className={`px-5 py-3 text-sm border transition-all ${
                      config.metal === metal.id
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-black/10 text-charcoal/70 hover:border-charcoal/30'
                    }`}
                  >
                    {locale === 'en' ? metal.label : metal.labelZh}
                    {metal.price > 0 && (
                      <span className="text-xs opacity-60 ml-1">+¥{metal.price}</span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Size Selector */}
            <section>
              <h3 className="text-sm font-medium tracking-wide text-charcoal mb-4">
                {locale === 'en' ? '4. Ring Size (US)' : '4. 戒指尺寸（美标）'}
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={3}
                  max={13}
                  step={0.5}
                  value={config.size}
                  onChange={(e) => updateConfig('size', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-charcoal w-16 text-right">
                  {config.size}
                </span>
              </div>
              <p className="text-xs text-charcoal/40 mt-2">
                {locale === 'en'
                  ? 'Not sure? We offer complimentary resizing within 30 days.'
                  : '不确定？我们提供30天内免费调整尺寸服务。'}
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
