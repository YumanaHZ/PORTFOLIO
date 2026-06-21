import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const categories = ['All', 'Frontend', 'Backend', 'Design']

const projects = [
  { title: 'Kabar Lestari', desc: 'A clean news-style website focused on environmental stories and readable content layouts.', tags: ['React', 'Tailwind', 'Frontend'], category: 'Frontend', github: '#', live: '#' },
  { title: 'Siakad Database', desc: 'Academic information system data model exploring students, courses, grades, and relational structure.', tags: ['SQL', 'Database', 'Backend'], category: 'Backend', github: '#', live: '#' },
  { title: 'Yumana Studio', desc: 'A studio landing page concept with bold hero copy, responsive sections, and polished visual rhythm.', tags: ['React', 'Design', 'Tailwind'], category: 'Design', github: '#', live: '#' },
  { title: 'Portfolio Website', desc: 'This personal showcase with theme switching, project filtering, and subtle scroll animations.', tags: ['React', 'TypeScript', 'Tailwind'], category: 'Frontend', github: '#', live: '#' },
  { title: 'Task Board Concept', desc: 'A lightweight Kanban-style interface for organizing ideas, priorities, and progress states.', tags: ['React', 'UI', 'Frontend'], category: 'Frontend', github: '#', live: '#' },
  { title: 'Contact Form Demo', desc: 'A static contact experience designed to plug into Formspree, EmailJS, or a mailto fallback.', tags: ['Forms', 'UX', 'Design'], category: 'Design', github: '#', live: '#' },
]

function ProjectCard({ project, isDark }: { project: typeof projects[0]; isDark: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3 }}>
      <div ref={cardRef} onMouseMove={handleMouseMove} className={isDark ? 'group h-full rounded-2xl overflow-hidden glass border border-white/5 hover:border-primary/30 transition-all duration-300 card-spotlight' : 'group h-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300'}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-primary font-mono text-xs mb-2">{project.category}</p>
              <h3 className={isDark ? 'text-xl font-bold text-white group-hover:text-primary-light transition-colors' : 'text-xl font-bold text-slate-950 group-hover:text-primary transition-colors'}>{project.title}</h3>
            </div>
            <div className="flex gap-2">
              <a href={project.github} aria-label={`${project.title} GitHub`} className={isDark ? 'w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white' : 'w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary'}>
                <FaGithub />
              </a>
              <a href={project.live} aria-label={`${project.title} live demo`} className={isDark ? 'w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white' : 'w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary'}>
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
          <p className={isDark ? 'text-gray-400 text-sm mb-6 leading-relaxed flex-1' : 'text-slate-600 text-sm mb-6 leading-relaxed flex-1'}>{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/10 font-mono">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ isDark }: { isDark: boolean }) {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((project) => project.category === active)

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Projects</span>
          <h2 className={isDark ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4' : 'text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mt-3 mb-4'}>Selected <span className="text-gradient">Work</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setActive(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${active === cat ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20' : isDark ? 'glass border border-white/5 text-gray-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-primary shadow-sm'}`}>{cat}</button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => <ProjectCard key={project.title} project={project} isDark={isDark} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
