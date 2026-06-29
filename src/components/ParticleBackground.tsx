import { useEffect, useRef } from 'react'

interface Leaf {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  fallSpeed: number
  swaySpeed: number
  swayAmplitude: number
  swayOffset: number
  opacity: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let leaves: Leaf[] = []
    let time = 0

    const colors = ['#22c55e', '#16a34a', '#65a30d', '#ca8a04', '#dc2626', '#ea580c']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createLeaf = (randomY = false): Leaf => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : -20 - Math.random() * 50,
      size: Math.random() * 12 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      fallSpeed: Math.random() * 0.8 + 0.3,
      swaySpeed: Math.random() * 0.015 + 0.005,
      swayAmplitude: Math.random() * 40 + 20,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    })

    const createLeaves = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 40)
      leaves = Array.from({ length: count }, () => createLeaf(true))
    }

    const drawLeaf = (leaf: Leaf) => {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotation)
      ctx.globalAlpha = leaf.opacity

      ctx.beginPath()
      ctx.moveTo(0, -leaf.size)
      ctx.bezierCurveTo(
        leaf.size * 0.6, -leaf.size * 0.6,
        leaf.size * 0.8, leaf.size * 0.2,
        0, leaf.size
      )
      ctx.bezierCurveTo(
        -leaf.size * 0.8, leaf.size * 0.2,
        -leaf.size * 0.6, -leaf.size * 0.6,
        0, -leaf.size
      )
      ctx.fillStyle = leaf.color
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, -leaf.size * 0.8)
      ctx.lineTo(0, leaf.size * 0.8)
      ctx.strokeStyle = leaf.color
      ctx.globalAlpha = leaf.opacity * 0.5
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      leaves.forEach((leaf) => {
        leaf.y += leaf.fallSpeed
        leaf.x += Math.sin(time * leaf.swaySpeed + leaf.swayOffset) * leaf.swayAmplitude * 0.02
        leaf.rotation += leaf.rotationSpeed

        if (leaf.y > canvas.height + 30) {
          Object.assign(leaf, createLeaf(false))
        }

        drawLeaf(leaf)
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }

    resize()
    createLeaves()
    animate()

    const handleResize = () => {
      resize()
      createLeaves()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
