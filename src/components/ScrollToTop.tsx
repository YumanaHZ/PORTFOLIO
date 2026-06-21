import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollTop > 400)
      setScrollPercent(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const circumference = 2 * Math.PI * 20

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center cursor-pointer group"
        >
          <svg className="absolute w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="2" />
            <circle
              cx="24" cy="24" r="20" fill="none" stroke="url(#progress-gradient)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (scrollPercent / 100) * circumference}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-9 h-9 rounded-full bg-darker/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <FaArrowUp className="text-sm text-primary group-hover:text-white transition-colors" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
