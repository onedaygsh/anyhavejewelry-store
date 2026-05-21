'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Shield,
  Truck,
  RotateCcw,
  Award,
  Info,
  X,
  ChevronLeft,
  ShoppingBag,
  Star,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { getCustomizeContent, subscribeToAdminData, ADMIN_KEYS, defaultCustomizeContent, type CustomizeContent } from '@/lib/admin-data'
import { formatPrice } from '@/lib/currency/utils'
import { useCurrency } from '@/lib/currency/context'

/* ──────────────────────────────────────────────────────────────── */
/*  Types & Data                                                    */
/* ──────────────────────────────────────────────────────────────── */

interface DiamondSpec {
  cut: string
  color: string
  clarity: string
  carat: number
  price: number
}

const SHAPES = [
  { id: 'round', label: 'Round', labelZh: '圆形', icon: '⬡' },
  { id: 'oval', label: 'Oval', labelZh: '椭圆形', icon: '⬭' },
  { id: 'cushion', label: 'Cushion', labelZh: '垫形', icon: '⬒' },
  { id: 'emerald', label: 'Emerald', labelZh: '祖母绿', icon: '▭' },
  { id: 'princess', label: 'Princess', labelZh: '公主方', icon: '◈' },
  { id: 'pear', label: 'Pear', labelZh: '梨形', icon: '⬠' },
  { id: 'marquise', label: 'Marquise', labelZh: '马眼', icon: '⬬' },
  { id: 'radiant', label: 'Radiant', labelZh: '雷迪恩', icon: '◆' },
]

const CUTS = ['Ideal', 'Excellent', 'Very Good', 'Good']
const COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J']
const CLARITIES = ['FL', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2']
const CARATS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0]

const METALS = [
  { id: '14k-white', label: '14K White Gold', labelZh: '14K白金', price: 0 },
  { id: '14k-yellow', label: '14K Yellow Gold', labelZh: '14K黄金', price: 0 },
  { id: '14k-rose', label: '14K Rose Gold', labelZh: '14K玫瑰金', price: 0 },
  { id: '18k-white', label: '18K White Gold', labelZh: '18K白金', price: 200 },
  { id: 'platinum', label: 'Platinum', labelZh: '铂金', price: 400 },
]

const RING_SIZES = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']

/* ──────────────────────────────────────────────────────────────── */
/*  4C Educational Content                                         */
/* ──────────────────────────────────────────────────────────────── */

const EDUCATION = {
  cut: {
    title: 'Cut',
    titleZh: '切工',
    desc: 'Cut determines how brilliantly a diamond sparkles. Excellent and Ideal cuts maximize light return.',
    descZh: '切工决定钻石的闪耀程度。Excellent 和 Ideal 切工能最大化光线反射。',
    scale: ['Good', 'Very Good', 'Excellent', 'Ideal'],
  },
  color: {
    title: 'Color',
    titleZh: '颜色',
    desc: 'Colorless diamonds (D-F) are rarest. G-H appears colorless to the naked eye at better value.',
    descZh: '无色钻石（D-F）最为稀有。G-H 肉眼看起来无色，性价比更高。',
    scale: ['J', 'I', 'H', 'G', 'F', 'E', 'D'],
  },
  clarity: {
    title: 'Clarity',
    titleZh: '净度',
    desc: 'VS1-VS2 offers the best balance — inclusions are microscopic and invisible without magnification.',
    descZh: 'VS1-VS2 净度是最佳平衡点 — 内含物在显微镜下才能看到。',
    scale: ['SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'FL'],
  },
  carat: {
    title: 'Carat',
    titleZh: '克拉',
    desc: 'Carat measures weight, not size. A well-cut 0.9ct can appear nearly as large as 1.0ct.',
    descZh: '克拉衡量重量而非大小。切工良好的 0.9 克拉看起来几乎和 1.0 克拉一样大。',
    scale: ['0.5ct', '0.75ct', '1.0ct', '1.25ct', '1.5ct', '2.0ct', '2.5ct', '3.0ct'],
  },
}

/* ──────────────────────────────────────────────────────────────── */
/*  Component                                                       */
/* ──────────────────────────────────────────────────────────────── */

export default function CustomizePage() {
  const { t, locale } = useI18n()
  const { currency } = useCurrency()
  const isZh = locale === 'zh'

  const [config, setConfig] = useState<CustomizeContent>(defaultCustomizeContent)
  const [step, setStep] = useState(1)
  const [stoneType, setStoneType] = useState<'moissanite' | 'lab'>('moissanite')
  const [shape, setShape] = useState('round')
  const [cut, setCut] = useState('Ideal')
  const [color, setColor] = useState('D')
  const [clarity, setClarity] = useState('VVS1')
  const [carat, setCarat] = useState(1.0)
  const [style, setStyle] = useState('solitaire')
  const [metal, setMetal] = useState('14k-white')
  const [ringSize, setRingSize] = useState('6.5')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showEducation, setShowEducation] = useState<string | null>(null)

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
    label: isZh ? s.labelZh : s.labelEn,
    image: s.image,
  }))

  const stones = config.stones.map((s) => ({
    name: isZh ? s.nameZh : s.nameEn,
    desc: s.type === 'lab'
      ? (isZh ? '培育钻石' : 'Lab-Grown Diamond')
      : (isZh ? '莫桑石' : 'Moissanite'),
    color: s.color,
    price: s.price,
    type: s.type as 'moissanite' | 'lab',
  }))

  /* ── Price Calculation ── */
  const basePrice = useMemo(() => {
    const stone = stones.find((s) => s.type === stoneType)
    const stonePrice = stone?.price || 0
    const caratMultiplier = carat * (stoneType === 'lab' ? 800 : 200)
    const cutMultiplier = { Ideal: 1.3, Excellent: 1.15, 'Very Good': 1.0, Good: 0.85 }[cut] || 1
    const colorMultiplier = { D: 1.3, E: 1.2, F: 1.1, G: 1.0, H: 0.9, I: 0.8, J: 0.7 }[color] || 1
    const clarityMultiplier = { FL: 1.4, VVS1: 1.25, VVS2: 1.15, VS1: 1.05, VS2: 1.0, SI1: 0.85, SI2: 0.7 }[clarity] || 1
    const metalPrice = METALS.find((m) => m.id === metal)?.price || 0
    const stylePrice = { solitaire: 0, halo: 300, pavé: 400, 'three-stone': 500, vintage: 350 }[style] || 0

    return Math.round((stonePrice + caratMultiplier) * cutMultiplier * colorMultiplier * clarityMultiplier + metalPrice + stylePrice)
  }, [stoneType, carat, cut, color, clarity, metal, style, stones])

  const selectedStone = stones.find((s) => s.type === stoneType)
  const selectedShape = SHAPES.find((s) => s.id === shape)
  const selectedStyleObj = ringStyles.find((s) => s.id === style)
  const selectedMetal = METALS.find((m) => m.id === metal)

  const steps = [
    { num: 1, label: isZh ? '选择宝石' : 'Choose Gemstone', labelEn: 'Gemstone' },
    { num: 2, label: isZh ? '4C 定制' : 'Customize 4Cs', labelEn: '4Cs' },
    { num: 3, label: isZh ? '选择戒托' : 'Choose Setting', labelEn: 'Setting' },
    { num: 4, label: isZh ? '完成定制' : 'Complete Ring', labelEn: 'Complete' },
  ]

  const whyCustom = [
    { icon: Wand2, title: isZh ? '模块化设计' : 'Modular Design', desc: isZh ? '自由组合宝石、金属和款式' : 'Freely combine gemstone, metal, and style' },
    { icon: Heart, title: isZh ? '环保可持续' : 'Eco-Friendly', desc: isZh ? '实验室培育，零开采污染' : 'Lab-grown, zero mining pollution' },
    { icon: Gem, title: isZh ? '品质与价格' : 'Quality & Price', desc: isZh ? '同等品质，价格仅为天然钻石的20%' : 'Same quality at 20% of natural diamond price' },
  ]

  const processSteps = [
    { icon: Diamond, title: isZh ? '选择宝石' : 'Select Gemstone', desc: isZh ? '从莫桑石和培育钻石中选择' : 'Choose from moissanite and lab-grown diamonds' },
    { icon: Sparkles, title: isZh ? '定制4C' : 'Customize 4Cs', desc: isZh ? '调整切工、颜色、净度和克拉' : 'Adjust cut, color, clarity, and carat' },
    { icon: Palette, title: isZh ? '挑选款式' : 'Pick Style', desc: isZh ? '选择戒托设计和金属材质' : 'Choose setting design and metal type' },
    { icon: Box, title: isZh ? '完成订单' : 'Complete Order', desc: isZh ? '确认尺寸并提交定制需求' : 'Confirm size and submit customization request' },
  ]

  const faqs = [
    { q: isZh ? '定制需要多长时间？' : 'How long does customization take?', a: isZh ? '通常需要 2-3 周完成制作和交付。复杂设计可能需要额外时间。' : 'Typically 2-3 weeks for production and delivery. Complex designs may require additional time.' },
    { q: isZh ? '可以退换吗？' : 'Can I return or exchange?', a: isZh ? '我们提供 60 天无理由退换服务。定制产品支持一次免费修改。' : 'We offer 60-day hassle-free returns. Custom products include one free modification.' },
    { q: isZh ? '如何确定戒指尺寸？' : 'How do I determine ring size?', a: isZh ? '您可以使用我们的免费戒指尺寸测量工具，或到当地珠宝店测量。我们提供首次免费改尺寸服务。' : 'Use our free ring sizer tool, or get measured at a local jeweler. First resize is complimentary.' },
    { q: isZh ? '培育钻石和莫桑石有什么区别？' : 'What is the difference between lab-grown diamonds and moissanite?', a: isZh ? '培育钻石是100%真正的钻石，化学结构与天然钻石完全相同。莫桑石是另一种宝石，折射率更高，火彩更绚丽，价格更亲民。' : 'Lab-grown diamonds are 100% real diamonds with identical chemical structure to natural diamonds. Moissanite is a different gemstone with higher refractive index, more colorful fire, and more affordable pricing.' },
    { q: isZh ? '有证书吗？' : 'Do you provide certification?', a: isZh ? '所有培育钻石均配有 IGI 国际宝石学院证书。莫桑石配有品牌品质保证卡。' : 'All lab-grown diamonds come with IGI certification. Moissanite includes brand quality guarantee card.' },
  ]

  const trustSignals = [
    { icon: Award, title: isZh ? 'IGI 国际认证' : 'IGI Certified', desc: isZh ? '每颗培育钻石均附带权威证书' : 'Every lab-grown diamond includes authoritative certificate' },
    { icon: Shield, title: isZh ? '终身保修' : 'Lifetime Warranty', desc: isZh ? '免费清洗、检查和维护' : 'Complimentary cleaning, inspection, and maintenance' },
    { icon: Truck, title: isZh ? '免费配送' : 'Free Shipping', desc: isZh ? '全球订单满 $75 免运费' : 'Free worldwide shipping on orders over $75' },
    { icon: RotateCcw, title: isZh ? '60天退换' : '60-Day Returns', desc: isZh ? '无理由退换，让您安心购买' : 'Hassle-free returns for peace of mind' },
  ]

  return (
    <div className='bg-cream min-h-screen'>
      {/* ─── Hero ─── */}
      <section className='relative pt-28 pb-16 md:pb-20 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center'
          >
            <div>
              <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>
                {isZh ? '设计专属于您的珠宝' : 'Design Your Own Jewelry'}
              </p>
              <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight'>
                {isZh ? '定制您的\n永恒戒指' : 'Create Your\nForever Ring'}
              </h1>
              <p className='text-charcoal/60 max-w-md leading-relaxed mb-8'>
                {isZh
                  ? '从宝石到戒托，每一步都由您掌控。选择莫桑石或培育钻石，调整4C参数，打造独一无二的订婚戒指。'
                  : 'From gemstone to setting, every step is in your control. Choose moissanite or lab-grown diamonds, adjust the 4Cs, and create a one-of-a-kind engagement ring.'}
              </p>
              <div className='flex flex-wrap gap-4'>
                <button
                  onClick={() => { setStep(1); document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                >
                  <Wand2 className='w-4 h-4' />
                  {isZh ? '开始定制' : 'Start Customizing'}
                </button>
                <Link
                  href='/rta-configurator/'
                  className='inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors'
                >
                  <Sparkles className='w-4 h-4' />
                  {isZh ? '3D 体验' : '3D Experience'}
                </Link>
              </div>
            </div>
            <div className='aspect-[4/3] bg-stone overflow-hidden relative'>
              <img
                src={config.heroImage}
                alt='Custom Jewelry Design'
                className='absolute inset-0 w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-6 right-6 flex gap-3'>
                <div className='bg-white/90 backdrop-blur px-4 py-3 border border-white/20 inline-flex items-center gap-2'>
                  <Award className='w-4 h-4 text-champagne' />
                  <span className='text-xs tracking-widest uppercase text-charcoal/70'>
                    {isZh ? 'IGI 认证' : 'IGI Certified'}
                  </span>
                </div>
                <div className='bg-white/90 backdrop-blur px-4 py-3 border border-white/20 inline-flex items-center gap-2'>
                  <Shield className='w-4 h-4 text-champagne' />
                  <span className='text-xs tracking-widest uppercase text-charcoal/70'>
                    {isZh ? '终身保修' : 'Lifetime Warranty'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Step Wizard ─── */}
      <section id='wizard' className='bg-white border-y border-black/5 sticky top-0 z-40 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex items-center justify-between py-4 overflow-x-auto'>
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-3 px-4 py-2 transition-all flex-shrink-0 ${
                  step === s.num
                    ? 'text-charcoal'
                    : step > s.num
                    ? 'text-champagne'
                    : 'text-charcoal/30'
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center text-xs font-medium border ${
                  step === s.num
                    ? 'border-charcoal bg-charcoal text-white'
                    : step > s.num
                    ? 'border-champagne bg-champagne text-white'
                    : 'border-charcoal/20 text-charcoal/40'
                }`}>
                  {step > s.num ? <Check className='w-4 h-4' /> : s.num}
                </div>
                <div className='text-left hidden sm:block'>
                  <p className='text-[10px] tracking-widest uppercase text-charcoal/40'>
                    {isZh ? `步骤 ${s.num}` : `Step ${s.num}`}
                  </p>
                  <p className='text-sm font-medium whitespace-nowrap'>{s.label}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-[1px] hidden lg:block ml-2 ${step > s.num ? 'bg-champagne' : 'bg-black/10'}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Step 1: Gemstone ─── */}
      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.section
            key='step1'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='py-16 md:py-24'
          >
            <div className='max-w-7xl mx-auto px-6'>
              <div className='text-center mb-12'>
                <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3'>{isZh ? '步骤 1' : 'Step 1'}</p>
                <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-3'>{isZh ? '选择您的宝石' : 'Choose Your Gemstone'}</h2>
                <p className='text-charcoal/50 max-w-xl mx-auto'>{isZh ? '莫桑石还是培育钻石？两种选择同样璀璨，各有特色。' : 'Moissanite or lab-grown diamond? Both brilliant, each unique.'}</p>
              </div>

              <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
                {stones.map((s) => (
                  <button
                    key={s.type}
                    onClick={() => setStoneType(s.type)}
                    className={`relative p-8 border text-left transition-all ${
                      stoneType === s.type
                        ? 'border-champagne bg-cream/50'
                        : 'border-black/5 bg-white hover:border-champagne/30'
                    }`}
                  >
                    {stoneType === s.type && (
                      <div className='absolute top-4 right-4 w-6 h-6 bg-champagne flex items-center justify-center'>
                        <Check className='w-4 h-4 text-white' />
                      </div>
                    )}
                    <div className='flex items-center gap-3 mb-4'>
                      <span className='w-10 h-10 rounded-full border border-black/10' style={{ backgroundColor: s.color }} />
                      <div>
                        <p className='text-lg font-medium text-charcoal'>{s.name}</p>
                        <p className='text-xs text-charcoal/40'>{s.desc}</p>
                      </div>
                    </div>
                    <p className='text-sm text-charcoal/60 leading-relaxed mb-4'>
                      {s.type === 'lab'
                        ? (isZh ? '与天然钻石完全相同的化学结构，经 IGI 认证，环保可持续。' : 'Identical chemical structure to natural diamonds, IGI certified, eco-friendly.')
                        : (isZh ? '折射率高于钻石，火彩更绚丽，硬度 9.25，极具性价比。' : 'Higher refractive index than diamonds, more colorful fire, hardness 9.25, exceptional value.')}
                    </p>
                    <p className='text-xs text-charcoal/40'>
                      {isZh ? '起价 ' : 'From '}{formatPrice(s.price, currency)}
                    </p>
                  </button>
                ))}
              </div>

              <div className='text-center mt-10'>
                <button
                  onClick={() => setStep(2)}
                  className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                >
                  {isZh ? '下一步：定制 4C' : 'Next: Customize 4Cs'}
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── Step 2: 4Cs ─── */}
        {step === 2 && (
          <motion.section
            key='step2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='py-16 md:py-24'
          >
            <div className='max-w-7xl mx-auto px-6'>
              <div className='text-center mb-12'>
                <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3'>{isZh ? '步骤 2' : 'Step 2'}</p>
                <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-3'>{isZh ? '定制 4C 参数' : 'Customize the 4Cs'}</h2>
                <p className='text-charcoal/50 max-w-xl mx-auto'>{isZh ? '切工、颜色、净度、克拉 — 调整每一项参数，找到您的完美平衡点。' : 'Cut, Color, Clarity, Carat — adjust each parameter to find your perfect balance.'}</p>
              </div>

              {/* Shape */}
              <div className='mb-12'>
                <h3 className='text-sm font-medium tracking-wide text-charcoal mb-4'>{isZh ? '宝石形状' : 'Shape'}</h3>
                <div className='grid grid-cols-4 md:grid-cols-8 gap-3'>
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`p-4 border text-center transition-all ${
                        shape === s.id
                          ? 'border-champagne bg-cream/50'
                          : 'border-black/5 bg-white hover:border-champagne/30'
                      }`}
                    >
                      <span className='text-2xl mb-2 block'>{s.icon}</span>
                      <span className='text-xs text-charcoal/70'>{isZh ? s.labelZh : s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4C Filters */}
              <div className='grid md:grid-cols-2 gap-6 mb-10'>
                {/* Cut */}
                <div className='bg-white border border-black/5 p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-sm font-medium tracking-wide text-charcoal'>{isZh ? '切工' : 'Cut'}</h3>
                    <button
                      onClick={() => setShowEducation(showEducation === 'cut' ? null : 'cut')}
                      className='text-charcoal/30 hover:text-champagne transition-colors'
                    >
                      <Info className='w-4 h-4' />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showEducation === 'cut' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='overflow-hidden mb-4'
                      >
                        <p className='text-xs text-charcoal/50 bg-cream p-3'>{isZh ? EDUCATION.cut.descZh : EDUCATION.cut.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className='flex gap-2'>
                    {CUTS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCut(c)}
                        className={`flex-1 py-2.5 text-xs border transition-all ${
                          cut === c
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-black/5 text-charcoal/60 hover:border-charcoal/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className='bg-white border border-black/5 p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-sm font-medium tracking-wide text-charcoal'>{isZh ? '颜色' : 'Color'}</h3>
                    <button
                      onClick={() => setShowEducation(showEducation === 'color' ? null : 'color')}
                      className='text-charcoal/30 hover:text-champagne transition-colors'
                    >
                      <Info className='w-4 h-4' />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showEducation === 'color' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='overflow-hidden mb-4'
                      >
                        <p className='text-xs text-charcoal/50 bg-cream p-3'>{isZh ? EDUCATION.color.descZh : EDUCATION.color.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className='flex gap-1'>
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`flex-1 py-2.5 text-xs border transition-all ${
                          color === c
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-black/5 text-charcoal/60 hover:border-charcoal/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clarity */}
                <div className='bg-white border border-black/5 p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-sm font-medium tracking-wide text-charcoal'>{isZh ? '净度' : 'Clarity'}</h3>
                    <button
                      onClick={() => setShowEducation(showEducation === 'clarity' ? null : 'clarity')}
                      className='text-charcoal/30 hover:text-champagne transition-colors'
                    >
                      <Info className='w-4 h-4' />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showEducation === 'clarity' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='overflow-hidden mb-4'
                      >
                        <p className='text-xs text-charcoal/50 bg-cream p-3'>{isZh ? EDUCATION.clarity.descZh : EDUCATION.clarity.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className='flex gap-1 flex-wrap'>
                    {CLARITIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setClarity(c)}
                        className={`flex-1 py-2.5 text-xs border transition-all min-w-[60px] ${
                          clarity === c
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-black/5 text-charcoal/60 hover:border-charcoal/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Carat */}
                <div className='bg-white border border-black/5 p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-sm font-medium tracking-wide text-charcoal'>{isZh ? '克拉' : 'Carat'}</h3>
                    <button
                      onClick={() => setShowEducation(showEducation === 'carat' ? null : 'carat')}
                      className='text-charcoal/30 hover:text-champagne transition-colors'
                    >
                      <Info className='w-4 h-4' />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showEducation === 'carat' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='overflow-hidden mb-4'
                      >
                        <p className='text-xs text-charcoal/50 bg-cream p-3'>{isZh ? EDUCATION.carat.descZh : EDUCATION.carat.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className='flex gap-1 flex-wrap'>
                    {CARATS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCarat(c)}
                        className={`py-2.5 px-3 text-xs border transition-all ${
                          carat === c
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-black/5 text-charcoal/60 hover:border-charcoal/30'
                        }`}
                      >
                        {c}ct
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => setStep(1)}
                  className='inline-flex items-center gap-2 px-6 py-3 border border-black/10 text-charcoal text-sm tracking-widest hover:border-charcoal transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                  {isZh ? '上一步' : 'Back'}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                >
                  {isZh ? '下一步：选择戒托' : 'Next: Choose Setting'}
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── Step 3: Setting ─── */}
        {step === 3 && (
          <motion.section
            key='step3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='py-16 md:py-24'
          >
            <div className='max-w-7xl mx-auto px-6'>
              <div className='text-center mb-12'>
                <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3'>{isZh ? '步骤 3' : 'Step 3'}</p>
                <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-3'>{isZh ? '选择戒托与金属' : 'Choose Setting & Metal'}</h2>
                <p className='text-charcoal/50 max-w-xl mx-auto'>{isZh ? '经典款式还是独特设计？白金还是玫瑰金？找到最适合您的风格。' : 'Classic or unique? White gold or rose gold? Find the style that suits you best.'}</p>
              </div>

              {/* Ring Styles */}
              <div className='mb-12'>
                <h3 className='text-sm font-medium tracking-wide text-charcoal mb-4'>{isZh ? '戒托款式' : 'Setting Style'}</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
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
                        <div className='absolute top-3 right-3 w-6 h-6 bg-champagne flex items-center justify-center'>
                          <Check className='w-3.5 h-3.5 text-white' />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal */}
              <div className='mb-12'>
                <h3 className='text-sm font-medium tracking-wide text-charcoal mb-4'>{isZh ? '金属材质' : 'Metal'}</h3>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                  {METALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMetal(m.id)}
                      className={`p-5 border text-left transition-all ${
                        metal === m.id
                          ? 'border-champagne bg-cream/50'
                          : 'border-black/5 bg-white hover:border-champagne/30'
                      }`}
                    >
                      <div className='flex items-center gap-2 mb-2'>
                        <span className={`w-5 h-5 rounded-full border border-black/10 ${
                          m.id.includes('white') ? 'bg-gray-100' : m.id.includes('yellow') ? 'bg-amber-200' : m.id.includes('rose') ? 'bg-rose-200' : 'bg-gray-300'
                        }`} />
                        {metal === m.id && <Check className='w-3.5 h-3.5 text-champagne ml-auto' />}
                      </div>
                      <p className='text-xs font-medium text-charcoal'>{isZh ? m.labelZh : m.label}</p>
                      {m.price > 0 && (
                        <p className='text-[10px] text-charcoal/40 mt-1'>+{formatPrice(m.price, currency)}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size */}
              <div className='mb-10'>
                <h3 className='text-sm font-medium tracking-wide text-charcoal mb-4'>{isZh ? '戒指尺寸' : 'Ring Size'}</h3>
                <div className='flex flex-wrap gap-2'>
                  {RING_SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setRingSize(s)}
                      className={`w-14 py-2.5 text-xs border transition-all ${
                        ringSize === s
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-black/5 text-charcoal/60 hover:border-charcoal/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className='text-xs text-charcoal/30 mt-3'>
                  {isZh ? '不确定尺寸？我们提供首次免费改尺寸服务。' : 'Not sure? First resize is complimentary.'}
                </p>
              </div>

              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => setStep(2)}
                  className='inline-flex items-center gap-2 px-6 py-3 border border-black/10 text-charcoal text-sm tracking-widest hover:border-charcoal transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                  {isZh ? '上一步' : 'Back'}
                </button>
                <button
                  onClick={() => setStep(4)}
                  className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                >
                  {isZh ? '下一步：完成定制' : 'Next: Complete Ring'}
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── Step 4: Complete ─── */}
        {step === 4 && (
          <motion.section
            key='step4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='py-16 md:py-24'
          >
            <div className='max-w-4xl mx-auto px-6'>
              <div className='text-center mb-12'>
                <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3'>{isZh ? '步骤 4' : 'Step 4'}</p>
                <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-3'>{isZh ? '您的专属戒指' : 'Your Custom Ring'}</h2>
                <p className='text-charcoal/50 max-w-xl mx-auto'>{isZh ? '确认所有参数，提交定制需求。我们的设计师将与您联系确认细节。' : 'Confirm all parameters and submit your customization request. Our designer will contact you to confirm details.'}</p>
              </div>

              {/* Summary Card */}
              <div className='bg-white border border-black/5 p-8 md:p-12 mb-10'>
                <div className='grid md:grid-cols-2 gap-10'>
                  <div>
                    <h3 className='font-serif text-xl text-charcoal mb-6'>{isZh ? '定制详情' : 'Customization Details'}</h3>
                    <div className='space-y-4'>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '宝石类型' : 'Gemstone'}</span>
                        <span className='text-sm font-medium text-charcoal'>{selectedStone?.name}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '形状' : 'Shape'}</span>
                        <span className='text-sm font-medium text-charcoal'>{isZh ? selectedShape?.labelZh : selectedShape?.label}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '切工' : 'Cut'}</span>
                        <span className='text-sm font-medium text-charcoal'>{cut}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '颜色' : 'Color'}</span>
                        <span className='text-sm font-medium text-charcoal'>{color}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '净度' : 'Clarity'}</span>
                        <span className='text-sm font-medium text-charcoal'>{clarity}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '克拉' : 'Carat'}</span>
                        <span className='text-sm font-medium text-charcoal'>{carat}ct</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '戒托款式' : 'Setting'}</span>
                        <span className='text-sm font-medium text-charcoal'>{selectedStyleObj?.label}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '金属材质' : 'Metal'}</span>
                        <span className='text-sm font-medium text-charcoal'>{isZh ? selectedMetal?.labelZh : selectedMetal?.label}</span>
                      </div>
                      <div className='flex justify-between py-3 border-b border-black/5'>
                        <span className='text-sm text-charcoal/50'>{isZh ? '戒指尺寸' : 'Ring Size'}</span>
                        <span className='text-sm font-medium text-charcoal'>{ringSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col justify-between'>
                    <div>
                      <h3 className='font-serif text-xl text-charcoal mb-6'>{isZh ? '价格预估' : 'Price Estimate'}</h3>
                      <div className='bg-cream p-6 border border-champagne/20 mb-6'>
                        <p className='text-xs tracking-widest uppercase text-charcoal/40 mb-2'>{isZh ? '预估总价' : 'Estimated Total'}</p>
                        <p className='text-3xl font-light text-charcoal'>{formatPrice(basePrice, currency)}</p>
                        <p className='text-xs text-charcoal/30 mt-2'>
                          {isZh ? '*最终价格以设计师确认为准' : '*Final price subject to designer confirmation'}
                        </p>
                      </div>

                      {/* Trust Signals */}
                      <div className='grid grid-cols-2 gap-3'>
                        {trustSignals.map((ts) => (
                          <div key={ts.title} className='flex items-start gap-2 p-3 bg-white border border-black/5'>
                            <ts.icon className='w-4 h-4 text-champagne flex-shrink-0 mt-0.5' />
                            <div>
                              <p className='text-xs font-medium text-charcoal'>{ts.title}</p>
                              <p className='text-[10px] text-charcoal/40'>{ts.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-10 pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-4 justify-center'>
                  <button
                    onClick={() => setStep(3)}
                    className='inline-flex items-center gap-2 px-6 py-3 border border-black/10 text-charcoal text-sm tracking-widest hover:border-charcoal transition-colors'
                  >
                    <ChevronLeft className='w-4 h-4' />
                    {isZh ? '修改选择' : 'Edit Selection'}
                  </button>
                  <Link
                    href={`/contact/?subject=custom-ring&stone=${stoneType}&shape=${shape}&cut=${cut}&color=${color}&clarity=${clarity}&carat=${carat}&style=${style}&metal=${metal}&size=${ringSize}&price=${basePrice}`}
                    className='inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
                  >
                    <ShoppingBag className='w-4 h-4' />
                    {isZh ? '提交定制需求' : 'Submit Custom Request'}
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── Sticky Summary Bar ─── */}
      <AnimatePresence>
        {step < 4 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className='fixed bottom-0 inset-x-0 z-50 bg-white border-t border-black/5 shadow-lg'
          >
            <div className='max-w-7xl mx-auto px-6 py-4'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4 overflow-x-auto'>
                  {selectedStone && (
                    <div className='flex items-center gap-2 flex-shrink-0'>
                      <span className='w-3 h-3 rounded-full' style={{ backgroundColor: selectedStone.color }} />
                      <span className='text-xs text-charcoal/60'>{selectedStone.name}</span>
                    </div>
                  )}
                  {selectedShape && (
                    <div className='flex items-center gap-1 flex-shrink-0'>
                      <Diamond className='w-3 h-3 text-charcoal/30' />
                      <span className='text-xs text-charcoal/60'>{isZh ? selectedShape.labelZh : selectedShape.label}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-1 flex-shrink-0'>
                    <Star className='w-3 h-3 text-charcoal/30' />
                    <span className='text-xs text-charcoal/60'>{cut} · {color} · {clarity} · {carat}ct</span>
                  </div>
                  {selectedStyleObj && (
                    <div className='flex items-center gap-1 flex-shrink-0'>
                      <Heart className='w-3 h-3 text-charcoal/30' />
                      <span className='text-xs text-charcoal/60'>{selectedStyleObj.label}</span>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-4 flex-shrink-0'>
                  <div className='text-right'>
                    <p className='text-[10px] text-charcoal/40 tracking-widest uppercase'>{isZh ? '预估' : 'Est.'}</p>
                    <p className='text-lg font-light text-charcoal'>{formatPrice(basePrice, currency)}</p>
                  </div>
                  <button
                    onClick={() => setStep(Math.min(step + 1, 4))}
                    className='px-6 py-2.5 bg-charcoal text-white text-xs tracking-widest font-medium hover:bg-graphite transition-colors'
                  >
                    {step === 3 ? (isZh ? '完成' : 'Complete') : (isZh ? '下一步' : 'Next')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Why Custom ─── */}
      <section className='bg-white py-20 md:py-28 border-y border-black/5'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{isZh ? '为什么选择定制' : 'Why Choose Custom'}</p>
            <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-4'>{isZh ? '专属于您的珠宝' : 'Jewelry Made for You'}</h2>
            <p className='text-charcoal/50 max-w-xl mx-auto'>{isZh ? '每一件定制珠宝都承载着独特的故事和情感。' : 'Every custom piece carries a unique story and emotion.'}</p>
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

      {/* ─── Process ─── */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{isZh ? '定制流程' : 'The Process'}</p>
            <h2 className='font-serif text-3xl md:text-4xl text-charcoal mb-4'>{isZh ? '四步打造永恒' : 'Four Steps to Forever'}</h2>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {processSteps.map((stepItem, i) => (
              <motion.div
                key={stepItem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className='bg-white p-8 border border-black/5 relative group hover:border-champagne/30 transition-all duration-300'
              >
                <div className='absolute top-4 right-4 text-[10px] text-charcoal/20 font-mono tracking-wider'>0{i + 1}</div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center group-hover:bg-champagne/10 transition-colors'>
                    <stepItem.icon className='w-4 h-4 text-charcoal/70' />
                  </div>
                </div>
                <h3 className='text-base font-medium text-charcoal mb-2'>{stepItem.title}</h3>
                <p className='text-sm text-charcoal/50 leading-relaxed'>{stepItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className='bg-white py-20 md:py-28 border-y border-black/5'>
        <div className='max-w-3xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <p className='text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4'>{isZh ? '常见问题' : 'FAQ'}</p>
            <h2 className='font-serif text-3xl text-charcoal'>{isZh ? '您可能想知道' : 'You Might Wonder'}</h2>
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

      {/* ─── CTA ─── */}
      <section className='py-16 md:py-24'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className='w-8 h-8 text-champagne mx-auto mb-4' />
            <h2 className='font-serif text-2xl text-charcoal mb-3'>{isZh ? '还有疑问？' : 'Still Have Questions?'}</h2>
            <p className='text-charcoal/60 max-w-lg mx-auto mb-8'>
              {isZh ? '我们的珠宝设计师随时为您解答。无论是款式建议还是预算规划，我们都很乐意帮助。' : 'Our jewelry designers are here to help. Whether it is style advice or budget planning, we are happy to assist.'}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/contact/'
                className='inline-block px-8 py-3.5 bg-charcoal text-white text-sm tracking-widest font-medium hover:bg-graphite transition-colors'
              >
                {isZh ? '联系设计师' : 'Contact Designer'}
              </Link>
              <Link
                href='/rta-configurator/'
                className='inline-block px-8 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors'
              >
                {isZh ? '3D 试戴体验' : 'Try 3D Experience'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom padding for sticky bar */}
      {step < 4 && <div className='h-20' />}
    </div>
  )
}
