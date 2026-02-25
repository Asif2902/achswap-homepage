import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Zap, Shield, Layers, TrendingUp, ChevronDown, Menu, X, Wallet, Activity, Coins, Globe, Rocket, Star } from 'lucide-react'

const tokens = [
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.01%', volume: '$12.4M' },
  { symbol: 'wUSDC', name: 'Wrapped USDC', price: '$1.00', change: '+0.02%', volume: '$8.2M' },
  { symbol: 'ACHS', name: 'Achswap Token', price: '$0.42', change: '+12.5%', volume: '$3.1M' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second transaction finality on ARC Network' },
  { icon: Shield, title: 'Secure & Audited', desc: 'Battle-tested smart contracts with proven safety' },
  { icon: Layers, title: 'V2 & V3 Pools', desc: 'Concentrated liquidity for maximum efficiency' },
  { icon: TrendingUp, title: 'Best Rates', desc: 'Smart routing finds optimal swap paths' },
]

const stats = [
  { value: '$24.5M', label: 'Total Value Locked' },
  { value: '156K+', label: 'Total Transactions' },
  { value: '12K+', label: 'Active Traders' },
  { value: '99.9%', label: 'Uptime' },
]

function AnimatedNumber({ value }: { value: string }) {
  return (
    <span className="text-gradient font-display font-bold">
      {value}
    </span>
  )
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []
    const colors = ['#00f0ff', '#ff00aa', '#8b5cf6', '#3b82f6']
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

function FloatingToken({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute text-4xl font-display font-bold text-gradient"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center glow-cyan">
        ★
      </div>
    </motion.div>
  )
}

function Hero() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-black to-cyber-black" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating tokens */}
      <FloatingToken delay={0} x={10} y={20} />
      <FloatingToken delay={1} x={85} y={15} />
      <FloatingToken delay={2} x={75} y={70} />
      <FloatingToken delay={3} x={15} y={65} />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-sm text-cyber-cyan font-body">Now Live on ARC Testnet</span>
          </motion.div>
          
          {/* Main title with glitch effect */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">SWAP</span>
              <motion.span
                className="absolute inset-0 text-cyber-magenta"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                style={{ clipPath: 'inset(0 0 0 0)' }}
              >
                SWAP
              </motion.span>
            </span>
            <br />
            <span className="text-gradient">LIKE A PRO</span>
          </h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-body"
          >
            The next-generation decentralized exchange built for speed, 
            security, and the best rates in the multiverse.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://achswap.com"
              className="btn-cyber group relative px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-black font-display font-bold text-lg rounded-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-magenta to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="#features"
              className="px-8 py-4 border border-cyber-cyan/30 text-cyber-cyan font-display font-bold text-lg rounded-lg hover:bg-cyber-cyan/10 transition-all hover:border-cyber-cyan"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyber-cyan"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="relative py-20 border-y border-cyber-cyan/10">
      <div className="absolute inset-0 bg-cyber-dark/50" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} />
              <p className="text-gray-500 mt-2 font-body text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tokens() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">TRENDING</span> TOKENS
          </h2>
          <p className="text-gray-400 font-body">Hot tokens on Achswap</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tokens.map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-xl p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center font-bold text-cyber-black">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{token.symbol}</h3>
                    <p className="text-xs text-gray-500">{token.name}</p>
                  </div>
                </div>
                <span className="text-cyber-cyan text-sm font-body">{token.change}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-display text-2xl font-bold">{token.price}</span>
                <span className="text-gray-500 text-sm font-body">Vol: {token.volume}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="relative py-24 bg-cyber-dark/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            WHY <span className="text-gradient">ACHSWAP</span>?
          </h2>
          <p className="text-gray-400 font-body max-w-2xl mx-auto">
            Built for the future of DeFi with cutting-edge technology
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-xl p-6 group hover:glow-cyan transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-cyber-cyan" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm font-body">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyber-purple/20 via-cyber-magenta/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            READY TO <span className="text-gradient">SWAP</span>?
          </h2>
          <p className="text-gray-400 font-body text-lg mb-10 max-w-xl mx-auto">
            Join thousands of traders already using Achswap for the best rates and fastest transactions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://achswap.com"
              className="btn-cyber px-10 py-5 bg-gradient-to-r from-cyber-cyan to-cyber-magenta text-cyber-black font-display font-bold text-xl rounded-lg flex items-center gap-3 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
            >
              <Wallet className="w-6 h-6" />
              Connect Wallet
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative py-12 border-t border-cyber-cyan/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center">
              <Star className="w-6 h-6 text-cyber-black" />
            </div>
            <span className="font-display font-bold text-xl">Achswap</span>
          </div>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm font-body">
            <a href="#" className="hover:text-cyber-cyan transition-colors">Twitter</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Discord</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Telegram</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">GitHub</a>
          </div>
          
          <p className="text-gray-600 text-sm font-body">© 2026 Achswap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-dark/90 backdrop-blur-xl border-b border-cyber-cyan/10' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Star className="w-6 h-6 text-cyber-black" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">Achswap</span>
          </a>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#tokens" className="font-body text-sm text-gray-400 hover:text-cyber-cyan transition-colors">Tokens</a>
            <a href="#features" className="font-body text-sm text-gray-400 hover:text-cyber-cyan transition-colors">Features</a>
            <a href="#" className="font-body text-sm text-gray-400 hover:text-cyber-cyan transition-colors">Docs</a>
            <a href="#" className="font-body text-sm text-gray-400 hover:text-cyber-cyan transition-colors">Analytics</a>
          </div>
          
          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="https://achswap.com"
              className="hidden sm:flex px-5 py-2.5 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-display font-bold text-sm rounded-lg hover:bg-cyber-cyan/20 transition-all"
            >
              Launch App
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-cyber-cyan"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-cyber-cyan/10"
          >
            <div className="flex flex-col gap-4">
              <a href="#tokens" className="font-body text-sm text-gray-400 hover:text-cyber-cyan">Tokens</a>
              <a href="#features" className="font-body text-sm text-gray-400 hover:text-cyber-cyan">Features</a>
              <a href="#" className="font-body text-sm text-gray-400 hover:text-cyber-cyan">Docs</a>
              <a href="#" className="font-body text-sm text-gray-400 hover:text-cyber-cyan">Analytics</a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <ParticleBackground />
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Stats />
      <Tokens />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
