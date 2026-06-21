import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

type NavbarProps = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'glass-strong shadow-2xl shadow-primary/5'
            : 'bg-white/85 backdrop-blur-2xl border-b border-slate-200 shadow-lg shadow-slate-200/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a href="#home" className="text-2xl font-bold font-mono text-gradient" whileHover={{ scale: 1.05 }}>
          {'<Yaafi />'}
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive ? (isDark ? 'text-white' : 'text-primary') : isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
                whileHover={{ y: -1 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </motion.a>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isDark ? 'glass border border-white/10 text-gray-300 hover:text-white' : 'bg-white border border-slate-200 text-slate-700 hover:text-primary shadow-sm'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <motion.a
            href="#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Say Hello
          </motion.a>
        </div>

        <button
          type="button"
          className={isDark ? 'md:hidden text-gray-300 text-xl p-2 rounded-lg hover:bg-white/5' : 'md:hidden text-slate-700 text-xl p-2 rounded-lg hover:bg-slate-100'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className={isDark ? 'md:hidden glass-strong overflow-hidden' : 'md:hidden bg-white/95 backdrop-blur-2xl overflow-hidden border-t border-slate-200'}>
            <div className="py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-6 py-3 text-sm font-medium ${activeSection === link.href.slice(1) ? 'text-primary bg-primary/5 border-l-2 border-primary' : isDark ? 'text-gray-400' : 'text-slate-600'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="px-6 pt-4 flex gap-3">
                <button type="button" onClick={onToggleTheme} className="flex-1 py-3 rounded-full border border-primary/30 text-primary font-semibold">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <a href="#contact" className="flex-1 text-center py-3 rounded-full text-white bg-gradient-to-r from-primary to-secondary" onClick={() => setMobileOpen(false)}>
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
