import { motion } from 'framer-motion'
import { FaCode, FaPalette, FaServer, FaTools } from 'react-icons/fa'

const highlights = [
  { icon: <FaCode />, title: 'Frontend', desc: 'React, TypeScript, Tailwind CSS, responsive UI', color: '#7c3aed' },
  { icon: <FaServer />, title: 'Backend Basics', desc: 'REST APIs, Node.js, Firebase, data modeling', color: '#ec4899' },
  { icon: <FaPalette />, title: 'Design Sense', desc: 'Clean layouts, interaction details, visual polish', color: '#06b6d4' },
  { icon: <FaTools />, title: 'Developer Tools', desc: 'Git, Vite, deployment workflows, debugging', color: '#10b981' },
]

export default function About({ isDark }: { isDark: boolean }) {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">About Me</span>
          <h2 className={isDark ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4' : 'text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mt-3 mb-4'}>
            Developer with a <span className="text-gradient">personal touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] animate-spin-slow">
                <div className={isDark ? 'w-full h-full rounded-3xl bg-darker' : 'w-full h-full rounded-3xl bg-slate-50'} />
              </div>
              <div className={isDark ? 'absolute inset-4 rounded-2xl overflow-hidden glass border border-white/10' : 'absolute inset-4 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl'}>
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-center">
                    <div className="text-7xl mb-3">YM</div>
                    <p className={isDark ? 'text-gray-400 font-mono text-sm' : 'text-slate-600 font-mono text-sm'}>build.small.things()</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className={isDark ? 'text-2xl md:text-3xl font-bold text-white mb-6' : 'text-2xl md:text-3xl font-bold text-slate-950 mb-6'}>
              I like building interfaces that are clear, useful, and a little bit playful.
            </h3>
            <div className={isDark ? 'space-y-5 text-gray-400 leading-relaxed' : 'space-y-5 text-slate-600 leading-relaxed'}>
              <p>I'm Yaafi Yumana, a software and web developer who enjoys turning ideas into polished browser experiences. I care about readable code, thoughtful details, and sites that feel fast from the first click.</p>
              <p>This portfolio is a compact showcase of the projects, tools, and design instincts I keep sharpening. It is not meant to be huge or over-engineered, just a clean place to share what I build.</p>
              <p>When I'm not coding, I am usually exploring new tools, learning from other developers, or sketching out small experiments that may become the next project.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -8 }} className={isDark ? 'group relative p-6 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all card-spotlight' : 'group relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all'}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all group-hover:scale-110" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <h4 className={isDark ? 'text-white font-bold text-lg mb-2' : 'text-slate-950 font-bold text-lg mb-2'}>{item.title}</h4>
              <p className={isDark ? 'text-gray-500 text-sm leading-relaxed' : 'text-slate-500 text-sm leading-relaxed'}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
