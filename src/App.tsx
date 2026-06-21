import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaExternalLinkAlt, FaMoon, FaSun, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiVite, SiFirebase } from 'react-icons/si'

const projects = [
  { title: 'TemuKopi', desc: 'A coffee discovery platform to explore local coffee shops, menus, and community reviews.', tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'], github: 'https://github.com/YumanaHZ/TemuKopi-Project', live: 'https://temukopi.potydev.cloud', image: '/images/temukopi-dashboard.png' },
  { title: 'KEPOLISIAN HOPE DUTY BOT', desc: 'A Discord bot for managing police duty schedules and operations in a roleplay community.', tags: ['JavaScript', 'Discord.js'], github: 'https://github.com/YumanaHZ/KEPOLISIAN-HOPE-DUTY-BOT', live: 'https://github.com/YumanaHZ/KEPOLISIAN-HOPE-DUTY-BOT', image: '' },
]

const skills = {
  Languages: [
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
  ],
  Frameworks: [
    { name: 'React', icon: <FaReact /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
  ],
  Tools: [
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'Figma', icon: <FaFigma /> },
    { name: 'Firebase', icon: <SiFirebase /> },
  ],
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

function TiltCard({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
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
      className={className}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="h-full">
        {children}
      </div>
    </Tag>
  )
}

function Snow({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    const flakes: { x: number; y: number; r: number; speed: number; wind: number }[] = []
    const COUNT = 60

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = document.documentElement.scrollHeight
    }

    const init = () => {
      resize()
      flakes.length = 0
      for (let i = 0; i < COUNT; i++) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.5 + 1,
          speed: Math.random() * 0.6 + 0.2,
          wind: Math.random() * 0.4 - 0.2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const color = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.28)'
      for (const f of flakes) {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        f.y += f.speed
        f.x += f.wind
        if (f.y > h) { f.y = -5; f.x = Math.random() * w }
        if (f.x > w) f.x = 0
        if (f.x < 0) f.x = w
      }
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

function App() {
  const [dark, setDark] = useState(true)

  return (
    <div className={dark ? 'bg-[#060911] text-zinc-100 min-h-screen relative' : 'bg-[#f6f7fb] text-zinc-900 min-h-screen relative'}>
      {dark ? <NeonGrid /> : <LightBackground />}
      <Snow dark={dark} />

      <nav className={`sticky top-0 z-50 border-b ${dark ? 'bg-[#060911]/90 border-zinc-800' : 'bg-white/90 border-zinc-200'} backdrop-blur-sm`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-bold font-mono text-lg">Yumana</a>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-5 text-sm">
              <a href="#about" className={dark ? 'hover:text-violet-400' : 'hover:text-violet-600'}>About</a>
              <a href="#projects" className={dark ? 'hover:text-violet-400' : 'hover:text-violet-600'}>Projects</a>
              <a href="#skills" className={dark ? 'hover:text-violet-400' : 'hover:text-violet-600'}>Skills</a>
              <a href="#contact" className={dark ? 'hover:text-violet-400' : 'hover:text-violet-600'}>Contact</a>
            </div>
            <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg ${dark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
              {dark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 relative z-20 overflow-visible">
        <motion.section 
          id="top" 
          className="py-20 sm:py-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            <img src="/images/profile.png" alt="Yaafi Yumana" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shrink-0 ring-4 ring-violet-500/20" />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-bold mb-3">Yaafi Yumana</h1>
              <p className={`text-lg sm:text-xl mb-5 ${dark ? 'text-violet-400' : 'text-violet-600'}`}>Software Engineer</p>
              <p className={`max-w-2xl text-base sm:text-lg ${dark ? 'text-zinc-400 leading-relaxed' : 'text-zinc-600 leading-relaxed'}`}>
                I develop full-stack web applications as a junior developer, focusing on clean code, responsive interfaces, and practical solutions that are reliable and maintainable.
              </p>
              <div className="flex gap-4 mt-6 justify-center sm:justify-start items-center">
                <a href="https://github.com/YumanaHZ" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={dark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/yaafi-yumana-47a26a218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={dark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}><FaLinkedin size={20} /></a>
                <a href="https://www.instagram.com/yaafiymnaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={dark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}><FaInstagram size={20} /></a>
              </div>
            </div>
          </div>
        </motion.section>

        <hr className={dark ? 'border-zinc-800' : 'border-zinc-200'} />

        <motion.section 
          id="about" 
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <div className={`space-y-4 leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <p>
              I am Yaafi Yumana, a junior full-stack developer based in Indonesia with an interest in building reliable, user-focused web applications. I work across both frontend and backend development, creating clean interfaces while also considering application structure, performance, and maintainability.
            </p>
            <p>
              My development approach focuses on writing readable code, learning modern technologies, and solving problems with practical solutions. I am currently studying Software Engineering at Politeknik Negeri Cilacap while continuing to improve my skills through real projects and independent learning.
            </p>
          </div>

          <div className={`mt-8 p-5 rounded-xl ${dark ? 'bg-zinc-900/70 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
            <h3 className="font-semibold mb-4">Education</h3>
            <div className="relative pl-6">
              <div className={`absolute left-[7px] top-2 bottom-2 w-px ${dark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />

              <div className="relative mb-6">
                <div className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 ${dark ? 'border-violet-400 bg-zinc-900' : 'border-violet-600 bg-zinc-50'}`} />
                <div className="flex items-center gap-4">
                  <img src="/images/pnc.png" alt="Politeknik Negeri Cilacap" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div>
                    <a href="https://pnc.ac.id/" target="_blank" rel="noopener noreferrer" className={`font-medium ${dark ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>Politeknik Negeri Cilacap</a>
                    <p className={`text-sm ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>Software Engineering</p>
                    <p className={`text-xs ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>2025 – Now</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 ${dark ? 'border-violet-400 bg-zinc-900' : 'border-violet-600 bg-zinc-50'}`} />
                <div className="flex items-center gap-4">
                  <img src="/images/smkn1skw.png" alt="SMK Negeri 1 Singkawang" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div>
                    <a href="https://smkn1singkawang.sch.id/" target="_blank" rel="noopener noreferrer" className={`font-medium ${dark ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>SMK Negeri 1 Singkawang</a>
                    <p className={`text-sm ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>Electrical Power Installation Engineering</p>
                    <p className={`text-xs ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>2021 – 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <hr className={dark ? 'border-zinc-800' : 'border-zinc-200'} />

        <motion.section 
          id="projects" 
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid sm:grid-cols-2 gap-4 perspective-1000">
            {projects.map((p) => (
              <TiltCard
                key={p.title}
                href={p.live}
                className={`block p-5 rounded-xl border transition-colors ${dark ? 'bg-zinc-900/70 border-zinc-800 hover:border-violet-500/50' : 'bg-white border-zinc-200 hover:border-violet-400 shadow-sm'}`}
              >
                {p.image && (
                  <img src={p.image} alt={`${p.title} dashboard`} className="mb-4 aspect-video w-full rounded-lg object-cover border border-zinc-200/20" />
                )}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <span
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank') }}
                      className={`cursor-pointer ${dark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
                      role="link"
                      aria-label="GitHub"
                    >
                      <FaGithub />
                    </span>
                    <FaExternalLinkAlt className={`text-sm mt-0.5 ${dark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  </div>
                </div>
                <p className={`text-sm mb-3 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${dark ? 'bg-violet-600/10 text-violet-400' : 'bg-violet-100 text-violet-700'}`}>{tag}</span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        <hr className={dark ? 'border-zinc-800' : 'border-zinc-200'} />

        <motion.section 
          id="skills" 
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="space-y-7">
            {Object.entries(skills).map(([category, items]) => {
              const direction = category === 'Frameworks' ? 'marquee-right' : 'marquee-left'
              const repeated = [...items, ...items, ...items]

              return (
                <div key={category}>
                  <h3 className={`text-sm font-medium mb-3 ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>{category}</h3>
                  <div className="overflow-hidden py-2">
                    <div className={`flex w-max gap-4 ${direction}`}>
                      {repeated.map((skill, i) => (
                        <span key={`${skill.name}-${i}`} className={`skill-pill inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg shrink-0 ${dark ? 'bg-zinc-900/70 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
                          <span className={dark ? 'text-violet-400 text-lg' : 'text-violet-600 text-lg'}>{skill.icon}</span>
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

        <hr className={dark ? 'border-zinc-800' : 'border-zinc-200'} />

        <motion.section 
          id="contact" 
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className={`mb-6 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>Feel free to reach out if you want to chat about a project or idea.</p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:yumanayaafi@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700">
              <FaEnvelope /> Email Me
            </a>
            <a href="https://github.com/YumanaHZ" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/yaafi-yumana-47a26a218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://www.instagram.com/yaafiymnaa/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
              <FaInstagram /> Instagram
            </a>
          </div>
        </motion.section>
      </main>

      <footer className={`border-t py-8 relative z-20 ${dark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-200 text-zinc-500'}`}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-sm">
          <p>&copy; {new Date().getFullYear()} Yaafi Yumana</p>
        </div>
      </footer>
    </div>
  )
}

export default App
