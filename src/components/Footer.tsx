import { motion } from 'framer-motion'
import { FaArrowUp, FaGithub, FaHeart, FaInstagram, FaLinkedin } from 'react-icons/fa'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
]

export default function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px line-glow" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <a href="#home" className="text-2xl font-bold font-mono text-gradient inline-block mb-4">{'<Yaafi />'}</a>
            <p className={isDark ? 'text-gray-500 text-sm leading-relaxed max-w-xs' : 'text-slate-500 text-sm leading-relaxed max-w-xs'}>Personal portfolio of Yaafi Yumana — clean code, clear design, honest work.</p>
          </div>

          <div>
            <h4 className={isDark ? 'text-white font-semibold mb-4 text-sm uppercase tracking-wider' : 'text-slate-950 font-semibold mb-4 text-sm uppercase tracking-wider'}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={isDark ? 'text-gray-500 text-sm hover:text-primary transition-colors' : 'text-slate-500 text-sm hover:text-primary transition-colors'}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={isDark ? 'text-white font-semibold mb-4 text-sm uppercase tracking-wider' : 'text-slate-950 font-semibold mb-4 text-sm uppercase tracking-wider'}>Connect</h4>
            <div className="flex gap-3 mb-6">
              {socials.map((social) => (
                <motion.a key={social.label} href={social.href} aria-label={social.label} className={isDark ? 'w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/40' : 'w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary shadow-sm'} whileHover={{ scale: 1.1, y: -2 }}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className={isDark ? 'text-gray-500 text-sm' : 'text-slate-500 text-sm'}>hello@example.com</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={isDark ? 'text-gray-600 text-sm flex items-center gap-1.5' : 'text-slate-500 text-sm flex items-center gap-1.5'}>
            &copy; {new Date().getFullYear()} Yaafi Yumana &mdash; built with <FaHeart className="text-red-500 text-xs" />
          </p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={isDark ? 'flex items-center gap-2 text-gray-500 text-sm hover:text-primary transition-colors' : 'flex items-center gap-2 text-slate-500 text-sm hover:text-primary transition-colors'} whileHover={{ y: -2 }}>
            Back to top <FaArrowUp className="text-xs" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
