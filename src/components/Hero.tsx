import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'

const roles = ['software developer', 'web developer', 'frontend explorer', 'creative builder']
const socials = [
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
]

export default function Hero({ isDark }: { isDark: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentRole = roles[roleIndex]
    if (!isDeleting) {
      setText(currentRole.slice(0, text.length + 1))
      if (text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1400)
      }
      return
    }

    setText(currentRole.slice(0, text.length - 1))
    if (text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }
  }, [isDeleting, roleIndex, text])

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? 45 : 85)
    return () => clearTimeout(timer)
  }, [isDeleting, tick])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh" />
      <motion.div className="absolute top-24 left-10 w-64 h-64 rounded-full animate-morph bg-primary/10" animate={{ rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute bottom-24 right-10 w-80 h-80 rounded-full animate-morph bg-secondary/10" animate={{ rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium ${isDark ? 'glass border border-primary/20 text-primary-light' : 'bg-white border border-primary/20 text-primary shadow-sm'}`}>
            <HiOutlineSparkles className="text-secondary" />
            Personal portfolio of Yaafi Yumana
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className={isDark ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-950 mb-6 leading-[1.1] tracking-tight'}>
          Hi, I&apos;m <span className="text-gradient glow-text">Yaafi</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className={isDark ? 'text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-8' : 'text-xl md:text-2xl lg:text-3xl text-slate-700 font-light mb-8'}>
          A curious <span className="font-mono font-semibold text-gradient-2 inline-block min-w-[1ch]">{text}</span><span className="font-mono text-primary animate-pulse">|</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className={isDark ? 'text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed' : 'text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed'}>
          I build clean, responsive web experiences with React, thoughtful interfaces, and a bias toward simple solutions that feel good to use.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="flex flex-wrap gap-4 justify-center mb-14">
          <motion.a href="#projects" className="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient" />
            <span className={isDark ? 'absolute inset-[2px] rounded-full bg-darker/80 group-hover:bg-transparent transition-all duration-300' : 'absolute inset-[2px] rounded-full bg-slate-950/80 group-hover:bg-transparent transition-all duration-300'} />
            <span className="relative z-10">View Projects &rarr;</span>
          </motion.a>
          <motion.a href="#contact" className={isDark ? 'px-8 py-3.5 rounded-full font-semibold text-gray-300 glass border border-white/10 hover:text-white transition-all' : 'px-8 py-3.5 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:text-primary transition-all shadow-sm'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex gap-5 justify-center mb-16">
          {socials.map((social) => (
            <motion.a key={social.label} href={social.href} aria-label={social.label} className={isDark ? 'w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-lg text-gray-400 hover:text-white hover:border-primary/40 transition-all' : 'w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg text-slate-500 hover:text-primary transition-all shadow-sm'} whileHover={{ scale: 1.15, y: -3 }}>
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <FaChevronDown />
      </motion.a>
    </section>
  )
}
