import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap, Shield, Layers, TrendingUp, Menu, X, Wallet, Copy, Check, ChevronDown } from 'lucide-react'

/* ─── Google Fonts injected via style tag ─── */
const fontStyle = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
`

const tokens = [
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.01%', color: '#2775CA' },
  { symbol: 'wUSDC', name: 'Wrapped USDC', price: '$1.00', change: '+0.02%', color: '#5AC8FA' },
  { symbol: 'ACHS', name: 'Achswap Token', price: '$0.014', change: '+12.5%', color: '#4FFFB0' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second transactions on ARC Network', accent: '#4FFFB0' },
  { icon: Shield, title: 'Secure', desc: 'Battle-tested smart contracts audited end-to-end', accent: '#38BDF8' },
  { icon: Layers, title: 'V2 & V3', desc: 'Concentrated liquidity pools for capital efficiency', accent: '#A78BFA' },
  { icon: TrendingUp, title: 'Best Rates', desc: 'Smart routing finds the optimal path for every swap', accent: '#FB923C' },
]

const stats = [
  { value: '$192K', label: 'Total Value Locked' },
  { value: '2.5K', label: 'Transactions' },
  { value: '100+', label: 'Active Users' },
  { value: '$0.014', label: 'ACHS Price' },
]

/* ─── Animated counter ─── */
function Counter({ value }: { value: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    </span>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(8,10,18,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#080A12', fontFamily: 'Syne, sans-serif',
            }}>A</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: -0.3 }}>
              Achswap
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            {['Features', 'MCP', 'Docs'].map(l => (
              <a key={l} href={l === 'Docs' ? '#' : `#${l.toLowerCase()}`}
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', letterSpacing: 0.1, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="https://app.achswapfi.xyz"
              style={{
                padding: '9px 20px', borderRadius: 10,
                background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
                color: '#080A12', fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                fontSize: 13, textDecoration: 'none', letterSpacing: 0.2,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              className="desktop-nav"
            >
              Launch App
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="mobile-nav-btn"
              style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8, padding: 8, color: '#fff', cursor: 'pointer', display: 'none' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '16px 0 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {['Features', 'MCP', 'Docs'].map(l => (
              <a key={l} href={l === 'Docs' ? '#' : `#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ padding: '10px 4px', fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
              >{l}</a>
            ))}
            <a href="https://app.achswapfi.xyz"
              style={{
                marginTop: 8, padding: '12px 0', borderRadius: 10, textAlign: 'center',
                background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
                color: '#080A12', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none',
              }}
            >Launch App</a>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: 80, overflow: 'hidden' }}>
      {/* Background mesh */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Gradient orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,255,176,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 99,
              border: '1px solid rgba(79,255,176,0.25)',
              background: 'rgba(79,255,176,0.06)',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4FFFB0', boxShadow: '0 0 8px #4FFFB0' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#4FFFB0', letterSpacing: 0.8 }}>
                LIVE ON ARC TESTNET
              </span>
            </div>
          </motion.div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(38px, 8vw, 72px)', lineHeight: 1.05,
            letterSpacing: -2, color: '#fff', marginBottom: 20,
          }}>
            Swap tokens at<br />
            <span style={{ background: 'linear-gradient(120deg, #4FFFB0, #38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              the best rates
            </span>
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
            fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto 36px',
          }}>
            The decentralized exchange built for speed, security, and optimal swap rates on ARC Network.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="https://app.achswapfi.xyz" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12,
              background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
              color: '#080A12', fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
              fontSize: 15, textDecoration: 'none', letterSpacing: 0.1,
              boxShadow: '0 0 40px rgba(79,255,176,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(79,255,176,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(79,255,176,0.2)' }}
            >
              Launch App <ArrowRight size={16} />
            </a>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              fontSize: 15, textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={18} color="rgba(255,255,255,0.25)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Stats ─── */
function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '60px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 24px' }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: -1,
                background: 'linear-gradient(120deg, #fff 40%, rgba(255,255,255,0.5))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                <Counter value={s.value} />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: 0.3 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Tokens ─── */
function Tokens() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 28px)', textAlign: 'center', marginBottom: 32, letterSpacing: -0.5 }}
        >
          Trending Tokens
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tokens.map((t, i) => (
            <motion.div
              key={t.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                cursor: 'default', transition: 'background 0.2s, border-color 0.2s',
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Token avatar */}
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${t.color}, ${t.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12,
                  color: '#fff', flexShrink: 0,
                  boxShadow: `0 0 20px ${t.color}33`,
                }}>
                  {t.symbol.slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 15, color: '#fff' }}>{t.symbol}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{t.name}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 15, color: '#fff', fontWeight: 500 }}>{t.price}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#4FFFB0', marginTop: 2 }}>{t.change}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Features ─── */
function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" ref={ref} style={{ padding: '80px 20px', background: 'rgba(255,255,255,0.015)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#38BDF8', letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>
            Why Achswap
          </p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 32px)', letterSpacing: -0.5 }}>
            Built different
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '24px 22px', borderRadius: 16,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, marginBottom: 14,
                background: `${f.accent}15`,
                border: `1px solid ${f.accent}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon size={18} color={f.accent} />
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 15, marginBottom: 6, color: '#fff' }}>{f.title}</h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── MCP Section ─── */
function MCPSection() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('Claude Code')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const capabilities = [
    { category: 'Wallet', items: ['Generate wallet', 'Get address', 'Check info'] },
    { category: 'Balances', items: ['USDC balance', 'Any token balance', 'All balances'] },
    { category: 'Transfers', items: ['Transfer USDC', 'Transfer ERC-20'] },
    { category: 'Wrapping', items: ['Wrap USDC ↔ wUSDC', 'Unwrap wUSDC'] },
    { category: 'Swaps', items: ['Exact swaps', 'USDC swaps', 'Swap quotes'] },
    { category: 'Liquidity', items: ['Add/remove LP', 'Pool reserves', 'LP positions'] },
    { category: 'Approvals', items: ['Token approvals'] },
  ]

  const configs: Record<string, { file: string; code: string }> = {
    'Claude Code': {
      file: '~/.claude.json',
      code: `{
  "mcpServers": {
    "achswap": {
      "url": "https://api.achswapfi.xyz/mcp/message",
      "headers": {
        "X-Private-Key": "0xYOUR_PRIVATE_KEY"
      }
    }
  }
}`,
    },
    'Cline': {
      file: '.cline/mcp.json',
      code: `{
  "mcpServers": {
    "achswap": {
      "url": "https://api.achswapfi.xyz/mcp/message",
      "headers": {
        "X-Private-Key": "0xYOUR_PRIVATE_KEY"
      }
    }
  }
}`,
    },
    'OpenCode': {
      file: '~/.opencode/mcp.json',
      code: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "achswap": {
      "type": "remote",
      "url": "https://api.achswapfi.xyz/mcp",
      "headers": {
        "X-Private-Key": "0xYOUR_PRIVATE_KEY"
      },
      "enabled": true
    }
  }
}`,
    },
    'cURL': {
      file: 'Terminal',
      code: `curl -X POST https://api.achswapfi.xyz/mcp/message \\
  -H "Content-Type: application/json" \\
  -H "X-Private-Key: 0xYOUR_PRIVATE_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,
    "method":"tools/call",
    "params":{"name":"get_swap_quote",
      "arguments":{"amount_in":"1000000000000000000",
        "token_in":"USDC","token_out":"ACHS"}}}'`,
    },
  }

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(configs[name].code)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="mcp" ref={ref} style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A78BFA', letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>
            MCP Server
          </p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 32px)', letterSpacing: -0.5, marginBottom: 12 }}>
            Connect any AI agent
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto' }}>
            Swap tokens, add liquidity, check pools — all through natural language.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10, marginBottom: 40 }}
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                padding: '14px 14px', borderRadius: 12,
                background: 'rgba(167,139,250,0.05)',
                border: '1px solid rgba(167,139,250,0.15)',
              }}
            >
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, color: '#A78BFA', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {cap.category}
              </div>
              {cap.items.map(item => (
                <div key={item} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                  {item}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Tabbed code block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}
        >
          {/* Tab bar */}
          <div style={{
            display: 'flex', overflowX: 'auto',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {Object.keys(configs).map(name => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                style={{
                  padding: '12px 18px', border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, whiteSpace: 'nowrap',
                  background: activeTab === name ? 'rgba(167,139,250,0.12)' : 'transparent',
                  color: activeTab === name ? '#A78BFA' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeTab === name ? '2px solid #A78BFA' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Code area */}
          <div style={{ position: 'relative', background: 'rgba(8,10,18,0.8)' }}>
            <div style={{ padding: '6px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                {configs[activeTab].file}
              </span>
              <button
                onClick={() => handleCopy(activeTab)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                  color: copied === activeTab ? '#4FFFB0' : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                }}
              >
                {copied === activeTab ? <Check size={12} /> : <Copy size={12} />}
                {copied === activeTab ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre style={{
              padding: '20px 22px', margin: 0, overflowX: 'auto',
              fontFamily: 'DM Mono, monospace', fontSize: 12, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
            }}>
              <code>{configs[activeTab].code}</code>
            </pre>
          </div>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <a
            href="https://community.arc.network/home/forum/boards/ecosystem-showcase-and-launches-pdq/posts/achswap-v2-mcp-server-connect-any-ai-agent-to-a-dex-on-arc-testnet-qp5nh6abph"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 10,
              border: '1px solid rgba(167,139,250,0.3)',
              background: 'rgba(167,139,250,0.07)',
              color: '#A78BFA', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              fontSize: 13, textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.07)')}
          >
            Full Documentation <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            padding: 'clamp(36px, 6vw, 60px) clamp(24px, 5vw, 60px)',
            borderRadius: 24, textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(79,255,176,0.08) 0%, rgba(56,189,248,0.06) 100%)',
            border: '1px solid rgba(79,255,176,0.15)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,255,176,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: -0.8, marginBottom: 12, position: 'relative' }}>
            Ready to swap?
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28, position: 'relative' }}>
            Connect your wallet and start trading on the fastest DEX on ARC Network.
          </p>
          <a href="https://app.achswapfi.xyz" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px', borderRadius: 12,
            background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
            color: '#080A12', fontFamily: 'DM Sans, sans-serif', fontWeight: 700,
            fontSize: 15, textDecoration: 'none',
            boxShadow: '0 0 40px rgba(79,255,176,0.25)',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(79,255,176,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(79,255,176,0.25)' }}
          >
            <Wallet size={18} /> Connect Wallet
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: '28px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: 'linear-gradient(135deg, #4FFFB0 0%, #38BDF8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#080A12', fontFamily: 'Syne, sans-serif',
          }}>A</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Achswap</span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {['Twitter', 'Discord', 'Telegram', 'GitHub'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >{l}</a>
          ))}
        </div>

        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.3 }}>
          © 2026 Achswap
        </p>
      </div>
    </footer>
  )
}

/* ─── Root ─── */
export default function App() {
  return (
    <>
      <style>{fontStyle}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080A12; color: #fff; min-height: 100vh; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #080A12; }
        ::-webkit-scrollbar-thumb { background: #4FFFB0; border-radius: 3px; }

        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .features-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .desktop-nav { display: flex !important; }
          .mobile-nav-btn { display: none !important; }
        }

        @media (max-width: 639px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#080A12', color: '#fff' }}>
        <Navbar />
        <Hero />
        <Stats />
        <Tokens />
        <Features />
        <MCPSection />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
