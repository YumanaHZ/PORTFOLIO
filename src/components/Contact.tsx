import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa'

const socials = [
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
]

export default function Contact({ isDark }: { isDark: boolean }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:hello@example.com?subject=Portfolio message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`${formData.message}\n\nFrom: ${formData.email}`)}`
  }

  const fieldClass = isDark
    ? 'w-full px-5 py-4 rounded-xl text-white placeholder:text-gray-500 bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-primary/50 focus:outline-none transition-all'
    : 'w-full px-5 py-4 rounded-xl text-slate-950 placeholder:text-slate-400 bg-white border border-slate-200 hover:border-slate-300 focus:border-primary/50 focus:outline-none transition-all shadow-sm'

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px line-glow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Contact</span>
          <h2 className={isDark ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-4' : 'text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mt-3 mb-4'}>Let&apos;s <span className="text-gradient">connect</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className={isDark ? 'text-gray-400 mt-6 max-w-lg mx-auto' : 'text-slate-600 mt-6 max-w-lg mx-auto'}>Want to chat about a project, collaboration, or idea? Send a quick message or find me online.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <h3 className={isDark ? 'text-2xl font-bold text-white mb-4' : 'text-2xl font-bold text-slate-950 mb-4'}>Say hello</h3>
            <a href="mailto:hello@example.com" className={isDark ? 'flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all mb-8' : 'flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-primary/20 transition-all mb-8'}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><FaEnvelope /></div>
              <div><p className="text-primary text-xs uppercase tracking-wider">Email</p><p className={isDark ? 'text-white font-medium' : 'text-slate-950 font-medium'}>hello@example.com</p></div>
            </a>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a key={social.label} href={social.href} aria-label={social.label} className={isDark ? 'w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white' : 'w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary shadow-sm'} whileHover={{ scale: 1.1, y: -2 }}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={fieldClass} placeholder="Your name" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldClass} placeholder="Your email" />
            </div>
            <textarea rows={6} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${fieldClass} resize-none`} placeholder="Your message" />
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
              <FaPaperPlane />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
