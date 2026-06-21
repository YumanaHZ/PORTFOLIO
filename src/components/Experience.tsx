import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'

const experiences = [
  {
    type: 'work',
    title: 'Senior Frontend Developer',
    company: 'Tech Startup',
    period: '2024 - Present',
    desc: 'Leading frontend architecture with React and Next.js. Building scalable design systems and mentoring junior developers.',
    skills: ['React', 'Next.js', 'TypeScript', 'Design Systems'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'Digital Agency',
    period: '2023 - 2024',
    desc: 'Developed full-stack web applications for diverse clients. Implemented RESTful APIs and optimized database performance.',
    skills: ['Node.js', 'PostgreSQL', 'React', 'AWS'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Freelance',
    period: '2022 - 2023',
    desc: 'Built responsive websites and web applications for small businesses. Focused on performance and accessibility.',
    skills: ['React', 'Tailwind CSS', 'Firebase', 'Figma'],
  },
  {
    type: 'education',
    title: 'Computer Science',
    company: 'University',
    period: '2019 - 2023',
    desc: 'Studied Computer Science with focus on software engineering, algorithms, and web development.',
    skills: ['Algorithms', 'Data Structures', 'Web Dev', 'Databases'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">My Journey</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4">
            <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                <div className={`hidden md:block flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`p-6 rounded-2xl glass border border-white/5 hover:border-primary/20 transition-all group ${isLeft ? 'ml-auto mr-6' : 'mr-auto ml-6'}`} style={{ maxWidth: '400px' }}>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full">{exp.period}</span>
                      <span className="text-xs text-gray-500">{exp.company}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">{exp.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-10 h-10 rounded-full bg-darker border-2 border-primary/50 flex items-center justify-center text-primary text-sm glow-primary">
                    {exp.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                  </div>
                </div>

                <div className="md:hidden flex-1 pl-14">
                  <div className="p-5 rounded-2xl glass border border-white/5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full">{exp.period}</span>
                      <span className="text-xs text-gray-500">{exp.company}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
