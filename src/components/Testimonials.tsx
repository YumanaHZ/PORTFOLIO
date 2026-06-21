import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'CEO, TechStart',
    avatar: 'AJ',
    text: 'Exceptional developer who delivered our project ahead of schedule. The attention to detail and code quality was outstanding. Highly recommended!',
    rating: 5,
    color: '#7c3aed',
  },
  {
    name: 'Sarah Chen',
    role: 'Product Manager, DigitalCo',
    avatar: 'SC',
    text: 'Working with Yuman was a fantastic experience. They understood our vision and translated it into a beautiful, functional application.',
    rating: 5,
    color: '#ec4899',
  },
  {
    name: 'Michael Park',
    role: 'Founder, AppWorks',
    avatar: 'MP',
    text: 'The most talented developer I\'ve worked with. Proactive, communicative, and delivers pixel-perfect results every single time.',
    rating: 5,
    color: '#06b6d4',
  },
  {
    name: 'Lisa Wang',
    role: 'CTO, DataFlow',
    avatar: 'LW',
    text: 'Incredible full-stack skills. They built our entire platform from scratch with clean, maintainable code. A true professional.',
    rating: 5,
    color: '#10b981',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="text-center px-4 md:px-12"
            >
              <FaQuoteLeft className="text-4xl text-primary/20 mx-auto mb-8" />
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 font-light italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: `linear-gradient(135deg, ${testimonials[current].color}, ${testimonials[current].color}80)` }}
                >
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{testimonials[current].name}</p>
                  <p className="text-gray-500 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <motion.button
              onClick={prev}
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/40 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-gradient-to-r from-primary to-secondary'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/40 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
