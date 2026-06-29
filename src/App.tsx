import { GitHubCalendar } from 'react-github-calendar'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaExternalLinkAlt, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaChevronDown, FaChevronUp, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiVite, SiFirebase, SiSupabase } from 'react-icons/si'

const projects = [
  { title: 'TemuKopi', desc: 'A coffee discovery platform to explore local coffee shops, menus, and community reviews.', tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'], github: 'https://github.com/YumanaHZ/TemuKopi-Project', live: 'https://temukopi.potydev.cloud', image: '/images/temukopi-dashboard.png' },
  { title: 'KEPOLISIAN HOPE DUTY BOT', desc: 'A Discord bot for managing police duty schedules and operations in a roleplay community.', tags: ['JavaScript', 'Discord.js'], github: 'https://github.com/YumanaHZ/KEPOLISIAN-HOPE-DUTY-BOT', live: 'https://github.com/YumanaHZ/KEPOLISIAN-HOPE-DUTY-BOT', image: '' },
]

const skills = {
  Languages: [
    { name: 'JavaScript', icon: <SiJavascript />, color: 'hover:text-[#F7DF1E]' },
    { name: 'TypeScript', icon: <SiTypescript />, color: 'hover:text-[#3178C6]' },
    { name: 'HTML', icon: <FaHtml5 />, color: 'hover:text-[#E34F26]' },
    { name: 'CSS', icon: <FaCss3Alt />, color: 'hover:text-[#1572B6]' },
  ],
  Frameworks: [
    { name: 'React', icon: <FaReact />, color: 'hover:text-[#61DAFB]' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'hover:text-[#06B6D4]' },
    { name: 'Node.js', icon: <FaNodeJs />, color: 'hover:text-[#339933]' },
  ],
  Tools: [
    { name: 'Git', icon: <FaGitAlt />, color: 'hover:text-[#F05032]' },
    { name: 'Vite', icon: <SiVite />, color: 'hover:text-[#646CFF]' },
    { name: 'Figma', icon: <FaFigma />, color: 'hover:text-[#F24E1E]' },
    { name: 'Firebase', icon: <SiFirebase />, color: 'hover:text-[#FFCA28]' },
    { name: 'Supabase', icon: <SiSupabase />, color: 'hover:text-[#3ECF8E]' },
  ],
}

const sectionReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.97, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30, transition: { duration: 0.3 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function Preloader({ dark, onDone }: { dark: boolean; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className={`preloader ${dark ? 'dark' : 'light'}`}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className={`preloader-ring ${dark ? 'dark' : 'light'}`} />
      <div className={`preloader-text ${dark ? 'dark' : 'light'}`}>Loading</div>
    </motion.div>
  )
}

function CursorGlow({ dark }: { dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      el.style.opacity = '1'
    }
    const onLeave = () => { el.style.opacity = '0' }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className={`cursor-glow ${dark ? 'dark' : 'light'}`} style={{ opacity: 0 }} />
}

function ScrollProgress({ dark }: { dark: boolean }) {
  const { scrollYProgress } = useScroll()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setWidth(v * 100))
  }, [scrollYProgress])

  return <div className={`scroll-progress ${dark ? 'dark' : 'light'}`} style={{ width: `${width}%` }} />
}

function NeonGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const max = 10
      const x = (e.clientX / window.innerWidth - 0.5) * max
      const y = (e.clientY / window.innerHeight - 0.5) * max
      el.style.setProperty('--px', x.toFixed(2) + 'px')
      el.style.setProperty('--py', y.toFixed(2) + 'px')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className="neon-bg fixed inset-0 z-0">
      <div className="neon-grid" />
      <div className="neon-glow" />
      <div className="neon-scanlines" />
      <div className="neon-noise" />
      <div className="neon-vignette" />
    </div>
  )
}

function LightBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const max = 8
      const x = (e.clientX / window.innerWidth - 0.5) * max
      const y = (e.clientY / window.innerHeight - 0.5) * max
      el.style.setProperty('--px', x.toFixed(2) + 'px')
      el.style.setProperty('--py', y.toFixed(2) + 'px')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className="light-bg fixed inset-0 z-0">
      <div className="light-grid" />
      <div className="light-glow" />
      <div className="light-scanlines" />
      <div className="light-noise" />
    </div>
  )
}

function TiltCard({ children, className, href, dark }: { children: React.ReactNode; className?: string; href?: string; dark: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.div
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      {...props}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`gradient-border card-shimmer ${dark ? 'dark' : 'light'} ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="h-full">
        {children}
      </div>
    </Tag>
  )
}

function TypingText({ texts, dark }: { texts: string[]; dark: boolean }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, texts])

  return (
    <span className={dark ? 'text-violet-400' : 'text-green-900'}>
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  )
}

function FallingLeaves({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0
    let time = 0

    const darkColors = ['#22c55e', '#16a34a', '#65a30d', '#ca8a04', '#dc2626', '#ea580c']
    const lightColors = ['#15803d', '#166534', '#4d7c0f', '#a16207', '#b91c1c', '#c2410c']

    interface Leaf {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      fallSpeed: number
      swaySpeed: number
      swayAmplitude: number
      swayOffset: number
      opacity: number
      color: string
    }

    const leaves: Leaf[] = []
    const COUNT = 35

    const createLeaf = (randomY: boolean): Leaf => {
      const colors = dark ? darkColors : lightColors
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : -20 - Math.random() * 50,
        size: Math.random() * 12 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        fallSpeed: Math.random() * 0.8 + 0.3,
        swaySpeed: Math.random() * 0.015 + 0.005,
        swayAmplitude: Math.random() * 40 + 20,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: dark ? Math.random() * 0.4 + 0.3 : Math.random() * 0.35 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = document.documentElement.scrollHeight
    }

    const init = () => {
      resize()
      leaves.length = 0
      for (let i = 0; i < COUNT; i++) {
        leaves.push(createLeaf(true))
      }
    }

    const drawLeaf = (leaf: Leaf) => {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotation)
      ctx.globalAlpha = leaf.opacity

      ctx.beginPath()
      ctx.moveTo(0, -leaf.size)
      ctx.bezierCurveTo(
        leaf.size * 0.6, -leaf.size * 0.6,
        leaf.size * 0.8, leaf.size * 0.2,
        0, leaf.size
      )
      ctx.bezierCurveTo(
        -leaf.size * 0.8, leaf.size * 0.2,
        -leaf.size * 0.6, -leaf.size * 0.6,
        0, -leaf.size
      )
      ctx.fillStyle = leaf.color
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, -leaf.size * 0.8)
      ctx.lineTo(0, leaf.size * 0.8)
      ctx.strokeStyle = leaf.color
      ctx.globalAlpha = leaf.opacity * 0.5
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      time += 1

      for (const leaf of leaves) {
        leaf.y += leaf.fallSpeed
        leaf.x += Math.sin(time * leaf.swaySpeed + leaf.swayOffset) * leaf.swayAmplitude * 0.02
        leaf.rotation += leaf.rotationSpeed

        if (leaf.y > h + 30) {
          Object.assign(leaf, createLeaf(false))
        }

        drawLeaf(leaf)
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)
    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(document.documentElement)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      resizeObs.disconnect()
    }
  }, [dark])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

function PirateFooter({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let time = 0
    let shipX = -160
    const H = 120

    const resize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = H
    }

    const silhouette = dark ? 'rgba(10,20,10,0.55)' : 'rgba(0,40,0,0.22)'
    const sailColor  = dark ? 'rgba(20,40,20,0.65)' : 'rgba(0,60,0,0.28)'
    const ropeColor  = dark ? 'rgba(15,30,15,0.5)'  : 'rgba(0,50,0,0.18)'

    const drawShip = (cx: number, baseY: number) => {
      const s = 0.35

      ctx.save()
      ctx.translate(cx, baseY)

      const bob  = Math.sin(time * 0.025) * 2
      const rock = Math.sin(time * 0.02) * 0.03
      ctx.translate(0, bob)
      ctx.rotate(rock)

      ctx.fillStyle   = silhouette
      ctx.strokeStyle = silhouette

      ctx.beginPath()
      ctx.moveTo(-130 * s, -10 * s)
      ctx.lineTo(-150 * s,  10 * s)
      ctx.lineTo(-140 * s,  30 * s)
      ctx.lineTo( 110 * s,  30 * s)
      ctx.lineTo( 150 * s,  10 * s)
      ctx.lineTo( 130 * s, -10 * s)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(-130 * s, -10 * s)
      ctx.lineTo( 130 * s, -10 * s)
      ctx.lineWidth = 3 * s
      ctx.stroke()

      ctx.beginPath()
      ctx.rect(60 * s, -50 * s, 60 * s, 40 * s)
      ctx.fill()

      ctx.fillStyle = dark ? 'rgba(40,80,40,0.6)' : 'rgba(120,220,80,0.25)'
      ctx.fillRect(68 * s, -44 * s, 8 * s, 8 * s)
      ctx.fillRect(82 * s, -44 * s, 8 * s, 8 * s)
      ctx.fillRect(96 * s, -44 * s, 8 * s, 8 * s)
      ctx.fillStyle = silhouette

      ctx.beginPath()
      ctx.moveTo(-90 * s, -15 * s)
      ctx.lineTo(-200 * s, -70 * s)
      ctx.lineWidth = 2 * s
      ctx.strokeStyle = silhouette
      ctx.stroke()

      const mastX = -10 * s
      ctx.beginPath()
      ctx.moveTo(mastX, -10 * s)
      ctx.lineTo(mastX, -220 * s)
      ctx.lineWidth = 4 * s
      ctx.stroke()

      const foremastX = -80 * s
      ctx.beginPath()
      ctx.moveTo(foremastX, -10 * s)
      ctx.lineTo(foremastX, -160 * s)
      ctx.lineWidth = 3 * s
      ctx.stroke()

      ctx.lineWidth = 2 * s
      ctx.beginPath(); ctx.moveTo(mastX - 60 * s, -190 * s); ctx.lineTo(mastX + 60 * s, -190 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mastX - 50 * s, -140 * s); ctx.lineTo(mastX + 50 * s, -140 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(foremastX - 45 * s, -138 * s); ctx.lineTo(foremastX + 40 * s, -138 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(foremastX - 35 * s, -100 * s); ctx.lineTo(foremastX + 30 * s, -100 * s); ctx.stroke()

      ctx.fillStyle = sailColor

      ctx.beginPath()
      ctx.moveTo(mastX - 55 * s, -188 * s)
      ctx.lineTo(mastX + 55 * s, -188 * s)
      ctx.lineTo(mastX + 45 * s, -148 * s)
      ctx.lineTo(mastX - 45 * s, -148 * s)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(mastX - 48 * s, -138 * s)
      ctx.lineTo(mastX + 48 * s, -138 * s)
      ctx.quadraticCurveTo(mastX + 65 * s, -75 * s, mastX + 38 * s, -14 * s)
      ctx.lineTo(mastX - 38 * s, -14 * s)
      ctx.quadraticCurveTo(mastX - 65 * s, -75 * s, mastX - 48 * s, -138 * s)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(foremastX - 42 * s, -136 * s)
      ctx.lineTo(foremastX + 38 * s, -136 * s)
      ctx.lineTo(foremastX + 28 * s, -104 * s)
      ctx.lineTo(foremastX - 32 * s, -104 * s)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(foremastX - 32 * s, -98 * s)
      ctx.lineTo(foremastX + 28 * s, -98 * s)
      ctx.quadraticCurveTo(foremastX + 40 * s, -55 * s, foremastX + 22 * s, -14 * s)
      ctx.lineTo(foremastX - 22 * s, -14 * s)
      ctx.quadraticCurveTo(foremastX - 40 * s, -55 * s, foremastX - 32 * s, -98 * s)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(-92 * s, -16 * s)
      ctx.lineTo(-195 * s, -68 * s)
      ctx.lineTo(-120 * s, -14 * s)
      ctx.closePath()
      ctx.fill()

      ctx.strokeStyle = ropeColor
      ctx.lineWidth = 1 * s
      ctx.beginPath(); ctx.moveTo(mastX, -218 * s); ctx.lineTo( 115 * s, -10 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mastX, -218 * s); ctx.lineTo(-115 * s, -10 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mastX, -218 * s); ctx.lineTo(-195 * s, -68 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(foremastX, -158 * s); ctx.lineTo(mastX, -140 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(foremastX, -158 * s); ctx.lineTo(-195 * s, -68 * s); ctx.stroke()

      const flagX2 = mastX + 2 * s
      const flagY2 = -220 * s
      ctx.fillStyle = silhouette
      ctx.fillRect(flagX2, flagY2, 24 * s, 18 * s)
      ctx.fillStyle = dark ? 'rgba(180,220,180,0.7)' : 'rgba(200,255,200,0.6)'
      ctx.beginPath()
      ctx.arc(flagX2 + 12 * s, flagY2 + 8 * s, 5 * s, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = dark ? 'rgba(180,220,180,0.7)' : 'rgba(200,255,200,0.6)'
      ctx.lineWidth = 1.5 * s
      ctx.beginPath(); ctx.moveTo(flagX2 + 5 * s, flagY2 + 14 * s); ctx.lineTo(flagX2 + 19 * s, flagY2 + 16 * s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(flagX2 + 19 * s, flagY2 + 14 * s); ctx.lineTo(flagX2 + 5 * s, flagY2 + 16 * s); ctx.stroke()

      ctx.restore()
    }

    const drawWaves = () => {
      const waterY = 85
      const waveColors = dark
        ? ['rgba(0,50,120,0.35)', 'rgba(0,35,90,0.28)', 'rgba(0,20,60,0.22)']
        : ['rgba(0,70,0,0.12)',   'rgba(0,90,0,0.09)',  'rgba(0,50,0,0.07)']

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath()
        const amp   = 3 - layer * 0.8
        const freq  = 0.02 + layer * 0.008
        const speed = 0.02 + layer * 0.008
        const yOff  = waterY + layer * 10

        ctx.moveTo(0, H)
        for (let x = 0; x <= w; x += 3) {
          const y = yOff
            + Math.sin(x * freq + time * speed) * amp
            + Math.sin(x * freq * 2.1 + time * speed * 1.5) * amp * 0.35
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, H)
        ctx.closePath()
        ctx.fillStyle = waveColors[layer]
        ctx.fill()
      }

      const foamColor = dark ? 'rgba(150,200,255,0.15)' : 'rgba(255,255,255,0.2)'
      for (let i = 0; i < 10; i++) {
        const fx = ((i * 131 + time * 0.35) % (w + 40)) - 20
        const fy = waterY + Math.sin(fx * 0.02 + time * 0.03) * 3 + 4
        ctx.beginPath()
        ctx.arc(fx, fy, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = foamColor
        ctx.fill()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, H)
      time += 1

      drawWaves()

      const waterY = 85
      drawShip(shipX, waterY)

      shipX += 0.35
      if (shipX > w + 160) shipX = -160

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  return <canvas ref={canvasRef} className="w-full pointer-events-none" style={{ height: 120 }} />
}


function App() {
  const [dark] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/backsound.mp3')
    audio.loop = true
    audio.volume = 0.02
    audioRef.current = audio
    const playPromise = audio.play()
    if (playPromise) {
      playPromise.then(() => setPlaying(true)).catch(() => {
        const resume = () => {
          audio.play().then(() => setPlaying(true))
          document.removeEventListener('click', resume)
        }
        document.addEventListener('click', resume)
      })
    }
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className={`${dark ? 'bg-[#060911] text-zinc-100 dark-mode' : 'bg-[#39ff14] text-gray-900 light-mode'} min-h-screen relative transition-colors duration-500`}>
      <AnimatePresence>
        {loading && <Preloader dark={dark} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress dark={dark} />
      <CursorGlow dark={dark} />
      {dark ? <NeonGrid /> : <LightBackground />}
      <FallingLeaves dark={dark} />

      <nav className={`sticky top-0 z-50 border-b ${dark ? 'bg-[#060911]/90 border-zinc-800' : 'bg-[#39ff14]/90 border-green-700'} backdrop-blur-sm`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-bold font-mono text-lg">Yumana</a>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-5 text-sm">
              <a href="#about" className={dark ? 'hover:text-violet-400' : 'hover:text-gray-900'}>About</a>
              <a href="#projects" className={dark ? 'hover:text-violet-400' : 'hover:text-gray-900'}>Projects</a>
              <a href="#contributions" className={dark ? 'hover:text-violet-400' : 'hover:text-gray-900'}>Contributions</a>
              <a href="#skills" className={dark ? 'hover:text-violet-400' : 'hover:text-gray-900'}>Skills</a>
              <a href="#contact" className={dark ? 'hover:text-violet-400' : 'hover:text-gray-900'}>Contact</a>
            </div>
            {/* <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg ${dark ? 'hover:bg-zinc-800' : 'hover:bg-green-500/30'}`}>
              Dark/Light Toggle
            </button> */}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 relative z-20 overflow-visible">
        <motion.section
          id="top"
          className="py-20 sm:py-28"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: loading ? 2.2 : 0 }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            <motion.img
              src="/images/profile.png"
              alt="Yaafi Yumana"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shrink-0 ring-4 ring-green-800/40"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: loading ? 2.4 : 0.2, type: 'spring', stiffness: 200 }}
            />
            <div className="text-center sm:text-left">
              <motion.h1
                className={`text-3xl sm:text-5xl font-bold mb-3 ${dark ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: loading ? 2.5 : 0.3 }}
              >
                Yaafi Yumana
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl mb-5 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: loading ? 2.7 : 0.5 }}
              >
                <TypingText texts={['Software Engineer', 'Junior Full-Stack Developer']} dark={dark} />
              </motion.p>
              <motion.p
                className={`max-w-2xl text-base sm:text-lg ${dark ? 'text-zinc-400 leading-relaxed' : 'text-green-950 leading-relaxed'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: loading ? 2.9 : 0.6 }}
              >
                I develop full-stack web applications as a junior developer, focusing on clean code, responsive interfaces, and practical solutions that are reliable and maintainable.
              </motion.p>
              <motion.div
                className="flex gap-4 mt-6 justify-center sm:justify-start items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: loading ? 3.1 : 0.7 }}
              >
                <a href="https://github.com/YumanaHZ" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={dark ? 'text-zinc-400 hover:text-white' : 'text-green-900 hover:text-gray-900'}><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/yaafi-yumana-47a26a218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={dark ? 'text-zinc-400 hover:text-white' : 'text-green-900 hover:text-gray-900'}><FaLinkedin size={20} /></a>
                <a href="https://www.instagram.com/yaafiymnaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={dark ? 'text-zinc-400 hover:text-white' : 'text-green-900 hover:text-gray-900'}><FaInstagram size={20} /></a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.div
          className="flex justify-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: loading ? 3.3 : 1, duration: 0.8 }}
        >
          <button
            onClick={() => {
              if (!showContent) {
                setShowContent(true)
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              } else {
                setShowContent(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className={`flex flex-col items-center gap-1 text-xs ${dark ? 'text-zinc-500 hover:text-violet-400' : 'text-green-900 hover:text-gray-900'} transition-colors cursor-pointer`}
          >
            <span>{showContent ? 'Show Less' : 'Show More'}</span>
            <motion.span
              animate={showContent ? { y: 0 } : { y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: showContent ? 0 : Infinity, ease: 'easeInOut' }}
            >
              {showContent ? <FaChevronUp /> : <FaChevronDown />}
            </motion.span>
          </button>
        </motion.div>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <hr className={dark ? 'border-zinc-800' : 'border-green-700'} />

              <motion.section
                id="about"
                className="py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
              >
                <h2 className={`text-2xl font-bold mb-6 ${dark ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>About Me</h2>
                <motion.div
                  className={`space-y-4 leading-relaxed ${dark ? 'text-zinc-400' : 'text-green-950'}`}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <motion.p variants={staggerItem}>
                    I am Yaafi Yumana, a junior full-stack developer based in Indonesia with an interest in building reliable, user-focused web applications. I work across both frontend and backend development, creating clean interfaces while also considering application structure, performance, and maintainability.
                  </motion.p>
                  <motion.p variants={staggerItem}>
                    My development approach focuses on writing readable code, learning modern technologies, and solving problems with practical solutions. I am currently studying Software Engineering at Politeknik Negeri Cilacap while continuing to improve my skills through real projects and independent learning.
                  </motion.p>
                </motion.div>

                <div className={`mt-8 space-y-6`}>
                  <h3 className="font-semibold mb-4 text-lg">Education</h3>
                  <div className="relative">
                    <div className={`absolute left-[88px] top-0 bottom-0 w-px ${dark ? 'bg-zinc-700' : 'bg-green-700'}`} />

                    <motion.div
                      className="space-y-6"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                    >
                      <motion.div className="flex gap-8 items-start" variants={staggerItem}>
                        <div className={`w-20 flex-shrink-0 text-right ${dark ? 'text-zinc-500' : 'text-green-900'}`}>
                          <p className="text-sm font-medium">2025</p>
                          <p className="text-xs">Present</p>
                        </div>
                        <div className={`relative flex-1 p-4 rounded-lg border ${dark ? 'bg-zinc-900/70 border-zinc-800' : 'bg-green-400/30 border-green-700 shadow-sm hover:shadow-md hover:shadow-green-600/20'} transition-all`}>
                          <div className={`absolute -left-[21px] top-5 w-2.5 h-2.5 rounded-full border-2 ${dark ? 'border-violet-400 bg-zinc-900' : 'border-green-800 bg-[#39ff14]'}`} />
                          <img src="/images/pnc.png" alt="Politeknik Negeri Cilacap" className="w-10 h-10 rounded-lg object-cover mb-2" />
                          <a href="https://pnc.ac.id/" target="_blank" rel="noopener noreferrer" className={`font-medium ${dark ? 'text-violet-400 hover:text-violet-300' : 'text-green-900 hover:text-gray-900'}`}>Politeknik Negeri Cilacap</a>
                          <p className={`text-sm mt-1 ${dark ? 'text-zinc-500' : 'text-green-950'}`}>Software Engineering</p>
                        </div>
                      </motion.div>

                      <motion.div className="flex gap-8 items-start" variants={staggerItem}>
                        <div className={`w-20 flex-shrink-0 text-right ${dark ? 'text-zinc-500' : 'text-green-900'}`}>
                          <p className="text-sm font-medium">2021</p>
                          <p className="text-xs">2024</p>
                        </div>
                        <div className={`relative flex-1 p-4 rounded-lg border ${dark ? 'bg-zinc-900/70 border-zinc-800' : 'bg-green-400/30 border-green-700 shadow-sm hover:shadow-md hover:shadow-green-600/20'} transition-all`}>
                          <div className={`absolute -left-[21px] top-5 w-2.5 h-2.5 rounded-full border-2 ${dark ? 'border-violet-400 bg-zinc-900' : 'border-green-800 bg-[#39ff14]'}`} />
                          <img src="/images/smkn1skw.png" alt="SMK Negeri 1 Singkawang" className="w-10 h-10 rounded-lg object-cover mb-2" />
                          <a href="https://smkn1singkawang.sch.id/" target="_blank" rel="noopener noreferrer" className={`font-medium ${dark ? 'text-violet-400 hover:text-violet-300' : 'text-green-900 hover:text-gray-900'}`}>SMK Negeri 1 Singkawang</a>
                          <p className={`text-sm mt-1 ${dark ? 'text-zinc-500' : 'text-green-950'}`}>Electrical Power Installation Engineering</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              <hr className={dark ? 'border-zinc-800' : 'border-green-700'} />

              <motion.section
                id="projects"
                className="py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
              >
                <h2 className={`text-2xl font-bold mb-6 ${dark ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>Projects</h2>
                <motion.div
                  className="grid sm:grid-cols-2 gap-4 perspective-1000"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  {projects.map((p) => (
                    <motion.div key={p.title} variants={staggerItem}>
                      <TiltCard
                        href={p.live}
                        dark={dark}
                        className={`block p-5 rounded-xl border transition-all duration-300 ${dark ? 'bg-zinc-900/70 border-zinc-800 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' : 'bg-green-400/30 border-green-700 hover:border-green-600 hover:shadow-[0_0_30px_rgba(0,100,0,0.15)]'}`}
                      >
                        {p.image && (
                          <img src={p.image} alt={`${p.title} dashboard`} className="mb-4 aspect-video w-full rounded-lg object-cover border border-green-700/30" />
                        )}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold">{p.title}</h3>
                          <div className="flex gap-2 shrink-0">
                            <span
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank') }}
                              className={`cursor-pointer ${dark ? 'text-zinc-500 hover:text-white' : 'text-green-900 hover:text-gray-900'}`}
                              role="link"
                              aria-label="GitHub"
                            >
                              <FaGithub />
                            </span>
                            <FaExternalLinkAlt className={`text-sm mt-0.5 ${dark ? 'text-zinc-500' : 'text-green-900'}`} />
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${dark ? 'text-zinc-400' : 'text-green-950'}`}>{p.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((tag) => (
                            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${dark ? 'bg-violet-600/10 text-violet-400' : 'bg-green-800/20 text-green-900 font-medium'}`}>{tag}</span>
                          ))}
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              <hr className={dark ? 'border-zinc-800' : 'border-green-700'} />

              <motion.section
                id="contributions"
                className="py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
              >
                <h2 className={`text-2xl font-bold mb-6 ${dark ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>Contributions</h2>
                <div className={`p-6 rounded-xl border gradient-border ${dark ? 'dark bg-zinc-900/70 border-zinc-800' : 'light bg-green-400/30 border-green-700'} flex justify-center overflow-x-auto`}>
                  <GitHubCalendar
                    username="YumanaHZ"
                    colorScheme={dark ? 'dark' : 'light'}
                  />
                </div>
              </motion.section>

              <hr className={dark ? 'border-zinc-800' : 'border-green-700'} />

              <motion.section
                id="skills"
                className="py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
              >
                <h2 className={`text-2xl font-bold mb-6 ${dark ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>Skills</h2>
                <div className="space-y-7">
                  {Object.entries(skills).map(([category, items]) => {
                    const direction = category === 'Frameworks' ? 'marquee-right' : 'marquee-left'
                    const repeated = [...items, ...items, ...items]

                    return (
                      <div key={category}>
                        <h3 className={`text-sm font-medium mb-3 ${dark ? 'text-zinc-500' : 'text-green-900'}`}>{category}</h3>
                        <div className="overflow-hidden py-2">
                          <div className={`flex w-max gap-4 ${direction}`}>
                            {repeated.map((skill, i) => (
                              <span key={`${skill.name}-${i}`} className={`skill-pill group inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg shrink-0 ${dark ? 'bg-zinc-900/70 border border-zinc-800' : 'bg-green-400/30 border border-green-700'}`}>
                                <span className={`text-lg transition-colors duration-300 ${dark ? 'text-violet-400' : 'text-green-900'} ${skill.color}`}>{skill.icon}</span>
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.section>

              <hr className={dark ? 'border-zinc-800' : 'border-green-700'} />

              <motion.section
                id="contact"
                className="py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
              >
                <h2 className={`text-2xl font-bold mb-4 ${dark ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>Contact</h2>
                <p className={`mb-6 ${dark ? 'text-zinc-400' : 'text-green-950'}`}>Feel free to reach out if you want to chat about a project or idea.</p>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <motion.a variants={staggerItem} href="mailto:yumanayaafi@gmail.com" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-green-900 text-green-100 hover:bg-green-800'}`}>
                    <FaEnvelope /> Email Me
                  </motion.a>
                  <motion.a variants={staggerItem} href="https://github.com/YumanaHZ" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-green-400/30 text-green-900 hover:bg-green-400/50 border border-green-700'}`}>
                    <FaGithub /> GitHub
                  </motion.a>
                  <motion.a variants={staggerItem} href="https://www.linkedin.com/in/yaafi-yumana-47a26a218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-green-400/30 text-green-900 hover:bg-green-400/50 border border-green-700'}`}>
                    <FaLinkedin /> LinkedIn
                  </motion.a>
                  <motion.a variants={staggerItem} href="https://www.instagram.com/yaafiymnaa/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-green-400/30 text-green-900 hover:bg-green-400/50 border border-green-700'}`}>
                    <FaInstagram /> Instagram
                  </motion.a>
                </motion.div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={`border-t relative z-20 overflow-hidden ${dark ? 'border-zinc-800 text-zinc-600' : 'border-green-700 text-green-900'}`}>
        {showContent && <PirateFooter dark={dark} />}
        <div className="max-w-5xl mx-auto px-6 pb-6 flex flex-col items-center justify-center text-sm">
          <p>&copy; {new Date().getFullYear()} Yaafi Yumana</p>
        </div>
      </footer>

      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-green-400/40 hover:bg-green-400/60 text-green-900 border border-green-700'}`}
        aria-label="Toggle Music"
      >
        {playing ? <FaVolumeUp className="text-lg" /> : <FaVolumeMute className="text-lg" />}
      </button>
    </div>
  )
}

export default App
