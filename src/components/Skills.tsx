import { motion } from 'framer-motion'
import { FaFigma, FaGitAlt, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiFirebase, SiJavascript, SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si'

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
      { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { icon: <FaReact />, name: 'React', color: '#61DAFB' },
      { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
      { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
      { icon: <SiFirebase />, name: 'Firebase', color: '#FFCA28' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { icon: <FaGitAlt />, name: 'Git', color: '#F05032' },
      { icon: <SiVite />, name: 'Vite', color: '#646CFF' },
      { icon: <FaFigma />, name: 'Figma', color: '#F24E1E' },
    ],
  },
]

export default function Skills({ isDark }: { isDark: boolean }) {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Tech Stack</span>
          <h2 className={isDark ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4' : 'text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mt-3 mb-4'}>
            Tools I <span className="text-gradient">use</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className={isDark ? 'text-gray-400 mt-6 max-w-lg mx-auto' : 'text-slate-600 mt-6 max-w-lg mx-auto'}>
            A lightweight set of languages, frameworks, and tools for building fast, maintainable web projects.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, ci) => (
            <motion.div key={category.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }}>
              <h3 className={isDark ? 'text-xl font-bold text-white mb-6 flex items-center gap-3' : 'text-xl font-bold text-slate-950 mb-6 flex items-center gap-3'}>
                <span className="w-8 h-[2px] bg-gradient-to-r from-primary to-secondary" />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} whileHover={{ y: -5, scale: 1.02 }} className={isDark ? 'group p-5 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all' : 'group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all'}>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl transition-all group-hover:scale-110" style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}40)` }}>
                        {skill.icon}
                      </div>
                      <h4 className={isDark ? 'text-white font-semibold text-sm' : 'text-slate-950 font-semibold text-sm'}>{skill.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
