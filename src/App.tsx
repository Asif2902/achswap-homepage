import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Layers, TrendingUp, Menu, X, Wallet } from 'lucide-react'

const tokens = [
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.01%', img: '/img/usdc.webp' },
  { symbol: 'wUSDC', name: 'Wrapped USDC', price: '$1.00', change: '+0.02%', img: '/img/logos/wusdc.png' },
  { symbol: 'ACHS', name: 'Achswap Token', price: '$0.42', change: '+12.5%', img: '/img/logos/achs-token.png' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second transactions on ARC Network' },
  { icon: Shield, title: 'Secure', desc: 'Battle-tested smart contracts' },
  { icon: Layers, title: 'V2 & V3', desc: 'Concentrated liquidity pools' },
  { icon: TrendingUp, title: 'Best Rates', desc: 'Smart routing for optimal swaps' },
]

const stats = [
  { value: '$24.5M', label: 'Total Value Locked' },
  { value: '156K+', label: 'Transactions' },
  { value: '12K+', label: 'Traders' },
  { value: '99.9%', label: 'Uptime' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-[hsl(220_25%_10%)]/90 backdrop-blur-md border-b border-[hsl(217_33%_18%)]' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <img src="/img/logos/achswap-logo.png" alt="Achswap" className="w-8 h-8" />
            <span className="font-semibold text-lg">Achswap</span>
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-[hsl(215_20%_70%)] hover:text-white transition-colors">Features</a>
            <a href="#" className="text-sm text-[hsl(215_20%_70%)] hover:text-white transition-colors">Docs</a>
            <a href="#" className="text-sm text-[hsl(215_20%_70%)] hover:text-white transition-colors">Analytics</a>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="https://app.achswapfi.xyz"
              className="hidden sm:flex px-4 py-2 bg-[hsl(217_91%_60%)] text-[hsl(220_25%_8%)] font-medium text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Launch App
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[hsl(215_20%_70%)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[hsl(217_33%_18%)] space-y-3">
            <a href="#features" className="block text-sm text-[hsl(215_20%_70%)]">Features</a>
            <a href="#" className="block text-sm text-[hsl(215_20%_70%)]">Docs</a>
            <a href="#" className="block text-sm text-[hsl(215_20%_70%)]">Analytics</a>
            <a
              href="https://app.achswapfi.xyz"
              className="flex w-full px-4 py-2 bg-[hsl(217_91%_60%)] text-[hsl(220_25%_8%)] font-medium text-sm rounded-lg justify-center"
            >
              Launch App
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_8%)] via-[hsl(220_25%_8%)] to-[hsl(220_25%_10%)]" />
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(217_91%_60%)/10] border border-[hsl(217_91%_60%)/20] mb-6">
            <span className="w-2 h-2 rounded-full bg-[hsl(217_91%_60%)] animate-pulse" />
            <span className="text-xs text-[hsl(217_91%_60%)]">Live on ARC Testnet</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Swap tokens at<br className="md:hidden" /> the best rates
          </h1>
          
          <p className="text-[hsl(215_20%_70%)] text-base md:text-lg max-w-xl mx-auto mb-8">
            The decentralized exchange built for speed, security, and optimal swap rates on ARC Network.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://app.achswapfi.xyz"
              className="flex items-center gap-2 px-6 py-3 bg-[hsl(217_91%_60%)] text-[hsl(220_25%_8%)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 px-6 py-3 border border-[hsl(217_33%_18%)] text-[hsl(215_20%_70%)] font-medium rounded-lg hover:border-[hsl(217_91%_60%)] hover:text-white transition-colors"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12 border-y border-[hsl(217_33%_18%)] bg-[hsl(220_25%_10%)]/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[hsl(217_91%_60%)]">{stat.value}</div>
              <div className="text-sm text-[hsl(215_20%_70%)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tokens() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trending Tokens</h2>
        
        <div className="grid gap-3">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-4 rounded-xl bg-[hsl(220_25%_10%)] border border-[hsl(217_33%_15%)] hover:border-[hsl(217_91%_60%)]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={token.img} alt={token.symbol} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-xs text-[hsl(215_20%_70%)]">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{token.price}</div>
                <div className="text-xs text-green-400">{token.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-16 bg-[hsl(220_25%_10%)]/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">Why Achswap?</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl bg-[hsl(220_25%_10%)] border border-[hsl(217_33%_15%)] hover:border-[hsl(217_91%_60%)]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[hsl(217_91%_60%)/10] flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-[hsl(217_91%_60%)]" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-[hsl(215_20%_70%)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to swap?</h2>
        <p className="text-[hsl(215_20%_70%)] mb-8">
          Connect your wallet and start trading on the fastest DEX on ARC Network.
        </p>
        <a
          href="https://app.achswapfi.xyz"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(217_91%_60%)] text-[hsl(220_25%_8%)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-[hsl(217_33%_18%)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/img/logos/achswap-logo.png" alt="Achswap" className="w-6 h-6" />
            <span className="font-medium">Achswap</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[hsl(215_20%_70%)]">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Telegram</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          
          <p className="text-sm text-[hsl(215_20%_70%)]">© 2026 Achswap</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(220_25%_8%)]">
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
