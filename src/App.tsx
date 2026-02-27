import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Shield, Layers, TrendingUp, Menu, X, Wallet, Copy, Check, ExternalLink } from 'lucide-react'

/* ── palette (original blue, kept exactly) ── */
const C = {
  blue:       'hsl(217 91% 60%)',
  blueDim:    'hsla(217,91%,60%,0.1)',
  blueBorder: 'hsla(217,91%,60%,0.22)',
  blueGlow:   'hsla(217,91%,60%,0.35)',
  bg:         'hsl(220 25% 8%)',
  surface:    'hsl(220 25% 10%)',
  surface2:   'hsl(220 25% 12%)',
  border:     'hsl(217 33% 15%)',
  muted:      'hsl(215 20% 60%)',
}

const tokens = [
  { symbol: 'USDC',  name: 'USD Coin',      price: '$1.00',  change: '+0.01%', img: '/img/usdc.webp' },
  { symbol: 'wUSDC', name: 'Wrapped USDC',  price: '$1.00',  change: '+0.02%', img: '/img/logos/wusdc.png' },
  { symbol: 'ACHS',  name: 'Achswap Token', price: '$0.014', change: '+12.5%', img: '/img/logos/achs-token.png' },
]

const features = [
  { icon: Zap,        title: 'Lightning Fast', desc: 'Sub-second transactions on ARC Network' },
  { icon: Shield,     title: 'Secure',         desc: 'Battle-tested smart contracts' },
  { icon: Layers,     title: 'V2 & V3',        desc: 'Concentrated liquidity pools' },
  { icon: TrendingUp, title: 'Best Rates',      desc: 'Smart routing for optimal swaps' },
]

const stats = [
  { value: '$192K',  label: 'Total Value Locked' },
  { value: '2.5K',   label: 'Transactions' },
  { value: '100+',   label: 'Active Users' },
  { value: '$0.014', label: 'ACHS Price' },
]

/* ── stagger children helper ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Fade-up used on sections ── */
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.25s',
      background: scrolled ? 'hsla(220,25%,8%,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px) saturate(150%)' : 'none',
      borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <img src="/img/logos/achswap-logo.png" alt="Achswap" style={{ width: 30, height: 30, borderRadius: 8 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#fff' }}>Achswap</span>
          </a>

          {/* Desktop nav */}
          <div className="dn-links" style={{ display: 'flex', gap: 26 }}>
            {[['Features', '#features'], ['MCP', '#mcp'], ['Docs', '#']].map(([l, h]) => (
              <a key={l} href={h} style={{ fontFamily: 'Inter', fontSize: 13.5, color: C.muted, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="https://app.achswapfi.xyz" className="dn-links" style={{
              padding: '8px 16px', borderRadius: 8,
              background: C.blue, color: C.bg,
              fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
              textDecoration: 'none', transition: 'opacity .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '.88'; e.currentTarget.style.boxShadow = `0 0 20px ${C.blueGlow}` }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none' }}
            >Launch App</a>

            <button className="mn-btn" onClick={() => setOpen(o => !o)} style={{
              display: 'none', background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 8, padding: 7, color: C.muted, cursor: 'pointer', lineHeight: 0,
            }}>
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', borderTop: `1px solid ${C.border}` }}
            >
              <div style={{ padding: '12px 0 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[['Features', '#features'], ['MCP', '#mcp'], ['Docs', '#']].map(([l, h]) => (
                  <a key={l} href={h} onClick={() => setOpen(false)}
                    style={{ padding: '10px 2px', fontFamily: 'Inter', fontSize: 14, color: C.muted, textDecoration: 'none' }}
                  >{l}</a>
                ))}
                <a href="https://app.achswapfi.xyz" style={{
                  marginTop: 8, padding: '12px', borderRadius: 9, textAlign: 'center',
                  background: C.blue, color: C.bg,
                  fontFamily: 'Inter', fontWeight: 600, fontSize: 14, textDecoration: 'none',
                }}>Launch App</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgO = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100svh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: 62,
    }}>
      {/* Background: parallax glow + dot grid */}
      <motion.div style={{ position: 'absolute', inset: 0, y: bgY, opacity: bgO, pointerEvents: 'none', zIndex: 0 }}>
        {/* central glow */}
        <div style={{
          position: 'absolute', top: '38%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 680, height: 680, borderRadius: '50%',
          background: `radial-gradient(circle, hsla(217,91%,60%,0.13) 0%, transparent 68%)`,
        }} />
        {/* dot grid with vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, hsla(215,20%,65%,0.18) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 100%)',
        }} />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto' }}>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-flex', marginBottom: 22 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 13px 5px 9px', borderRadius: 99,
              background: C.blueDim, border: `1px solid ${C.blueBorder}`,
              fontFamily: 'Inter', fontSize: 12, color: C.blue, fontWeight: 500,
            }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, display: 'block', flexShrink: 0 }}
              />
              Live on ARC Testnet
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 800,
              fontSize: 'clamp(34px, 7.5vw, 66px)', lineHeight: 1.08,
              letterSpacing: -1.5, color: '#fff', marginBottom: 16,
            }}
          >
            Swap tokens at<br />
            <span style={{ color: C.blue }}>the best rates</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{
              fontFamily: 'Inter', fontSize: 'clamp(14px, 2.2vw, 16.5px)',
              color: C.muted, lineHeight: 1.7,
              maxWidth: 420, margin: '0 auto 30px',
            }}
          >
            The decentralized exchange built for speed, security, and optimal swap rates on ARC Network.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="https://app.achswapfi.xyz" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 24px', borderRadius: 9,
              background: C.blue, color: C.bg,
              fontFamily: 'Inter', fontWeight: 600, fontSize: 14,
              textDecoration: 'none',
              boxShadow: `0 4px 22px ${C.blueGlow}`,
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 34px hsla(217,91%,60%,0.5)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 22px ${C.blueGlow}` }}
            >
              Launch App <ArrowRight size={14} />
            </a>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 24px', borderRadius: 9,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.muted, fontFamily: 'Inter', fontWeight: 500, fontSize: 14,
              textDecoration: 'none', transition: 'border-color .2s, color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blueBorder; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   STATS
══════════════════════════════════════════ */
function Stats() {
  return (
    <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '44px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '32px 16px' }}
          className="stats-grid"
        >
          {stats.map(s => (
            <motion.div key={s.label} variants={item} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Inter', fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 32px)', letterSpacing: -0.8,
                color: C.blue,
              }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   TOKENS
══════════════════════════════════════════ */
function Tokens() {
  return (
    <section style={{ padding: '76px 20px' }}>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 26 }}>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 'clamp(19px, 3vw, 24px)', letterSpacing: -0.4 }}>
            Trending Tokens
          </h2>
        </FadeUp>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {tokens.map(t => (
            <motion.div
              key={t.symbol}
              variants={item}
              whileHover={{ x: 5, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 17px', borderRadius: 12,
                background: C.surface, border: `1px solid ${C.border}`,
                cursor: 'default', transition: 'border-color .2s, box-shadow .2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = C.blueBorder
                ;(e.currentTarget as HTMLElement).style.boxShadow = `inset 0 0 0 1px ${C.blueBorder}`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = C.border
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <img src={t.img} alt={t.symbol} style={{ width: 38, height: 38, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#fff' }}>{t.symbol}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11.5, color: C.muted, marginTop: 1 }}>{t.name}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#fff' }}>{t.price}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11.5, color: '#4ade80', marginTop: 1 }}>{t.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   FEATURES
══════════════════════════════════════════ */
function Features() {
  return (
    <section id="features" style={{ padding: '76px 20px', background: `${C.surface}44` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 38 }}>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 'clamp(19px, 3vw, 24px)', letterSpacing: -0.4 }}>
            Why Achswap?
          </h2>
        </FadeUp>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}
          className="feat-grid"
        >
          {features.map(f => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
              style={{
                padding: '20px 18px', borderRadius: 13,
                background: C.surface, border: `1px solid ${C.border}`,
                cursor: 'default', transition: 'border-color .2s, box-shadow .2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = C.blueBorder
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px hsla(217,91%,60%,0.07)`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = C.border
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8, marginBottom: 12,
                background: C.blueDim, border: `1px solid ${C.blueBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon size={16} color={C.blue} />
              </div>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 5 }}>{f.title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   MCP
══════════════════════════════════════════ */
function MCPSection() {
  const [copied, setCopied] = useState<string | null>(null)

  const capabilities = [
    { cat: 'Wallet',    items: ['Generate new wallet', 'Get address', 'Check wallet info'] },
    { cat: 'Balances',  items: ['Get native USDC balance', 'Get any token balance', 'Get all token balances'] },
    { cat: 'Transfers', items: ['Transfer USDC (native)', 'Transfer any ERC-20 token'] },
    { cat: 'Wrapping',  items: ['Wrap native USDC ↔ wUSDC', 'Unwrap wUSDC'] },
    { cat: 'Swaps',     items: ['Swap exact tokens for tokens', 'Swap USDC for tokens', 'Swap tokens for USDC', 'Get swap quotes'] },
    { cat: 'Liquidity', items: ['Add liquidity', 'Remove liquidity', 'Get pool reserves', 'Check pair exists', 'Get LP position'] },
    { cat: 'Approvals', items: ['Approve tokens for trading'] },
  ]

  const configs = [
    {
      name: 'Claude Code', file: '~/.claude.json',
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
    {
      name: 'Cline', file: '.cline/mcp.json',
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
    {
      name: 'OpenCode', file: '~/.opencode/mcp.json',
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
    {
      name: 'cURL', file: 'Terminal',
      code: `curl -X POST https://api.achswapfi.xyz/mcp/message \\
  -H "Content-Type: application/json" \\
  -H "X-Private-Key: 0xYOUR_PRIVATE_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{"name":"get_swap_quote",
      "arguments":{"amount_in":"1000000000000000000",
        "token_in":"USDC","token_out":"ACHS"}}}'`,
    },
  ]

  const copy = (code: string, name: string) => {
    navigator.clipboard.writeText(code)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="mcp" style={{ padding: '76px 20px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>

        <FadeUp style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 'clamp(19px, 3vw, 24px)', letterSpacing: -0.4, marginBottom: 9 }}>
            MCP Server
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: C.muted, maxWidth: 380, margin: '0 auto' }}>
            Connect any AI agent to Achswap. Swap tokens, add liquidity, check pools — all through natural language.
          </p>
        </FadeUp>

        {/* Capabilities */}
        <FadeUp delay={0.05}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(126px,1fr))', gap: 8, marginBottom: 30 }}>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.cat}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                style={{
                  padding: '11px 13px', borderRadius: 10,
                  background: C.surface, border: `1px solid ${C.border}`,
                  transition: 'border-color .2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = C.blueBorder)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}
              >
                <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10.5, color: C.blue, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  {cap.cat}
                </div>
                {cap.items.map(it => (
                  <div key={it} style={{ fontFamily: 'Inter', fontSize: 11, color: C.muted, lineHeight: 1.85 }}>• {it}</div>
                ))}
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Doc button */}
        <FadeUp delay={0.08} style={{ textAlign: 'center', marginBottom: 24 }}>
          <a
            href="https://community.arc.network/home/forum/boards/ecosystem-showcase-and-launches-pdq/posts/achswap-v2-mcp-server-connect-any-ai-agent-to-a-dex-on-arc-testnet-qp5nh6abph"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 20px', borderRadius: 8,
              background: C.blue, color: C.bg,
              fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
              textDecoration: 'none',
              boxShadow: `0 4px 16px hsla(217,91%,60%,0.3)`,
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.86')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Full Documentation <ExternalLink size={12} />
          </a>
        </FadeUp>

        {/* Config cards */}
        <FadeUp delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }} className="cfg-grid">
            {configs.map(cfg => (
              <div key={cfg.name} style={{
                borderRadius: 12, background: C.surface,
                border: `1px solid ${C.border}`, overflow: 'hidden',
              }}>
                {/* card header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 13px', borderBottom: `1px solid ${C.border}`,
                  background: C.surface2,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12.5, color: '#fff' }}>{cfg.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 10.5, color: C.muted, marginTop: 1 }}>{cfg.file}</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => copy(cfg.code, cfg.name)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '4px 9px', borderRadius: 5,
                      border: `1px solid ${C.border}`, background: C.bg,
                      cursor: 'pointer', fontFamily: 'Inter', fontSize: 11, fontWeight: 500,
                      color: copied === cfg.name ? '#4ade80' : C.muted,
                      transition: 'color .2s',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {copied === cfg.name
                        ? <motion.span key="y" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}><Check size={10} /></motion.span>
                        : <motion.span key="n" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}><Copy size={10} /></motion.span>
                      }
                    </AnimatePresence>
                    {copied === cfg.name ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
                {/* code */}
                <pre style={{
                  padding: '13px', margin: 0, overflowX: 'auto', maxHeight: 138,
                  fontFamily: '"Fira Code","Cascadia Code","Courier New",monospace',
                  fontSize: 10.5, lineHeight: 1.72,
                  color: C.muted, background: `${C.bg}cc`,
                }}>
                  <code>{cfg.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
function CTA() {
  return (
    <section style={{ padding: '76px 20px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <FadeUp>
          <div style={{
            padding: 'clamp(34px, 5vw, 52px) clamp(22px, 5vw, 52px)',
            borderRadius: 18, textAlign: 'center',
            background: C.surface,
            border: `1px solid ${C.blueBorder}`,
            boxShadow: `0 0 60px hsla(217,91%,60%,0.07)`,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* top glow */}
            <div style={{
              position: 'absolute', top: -90, left: '50%', transform: 'translateX(-50%)',
              width: 360, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, hsla(217,91%,60%,0.11) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            <h2 style={{
              fontFamily: 'Inter', fontWeight: 800,
              fontSize: 'clamp(21px, 4vw, 30px)', letterSpacing: -0.6,
              marginBottom: 9, position: 'relative',
            }}>Ready to swap?</h2>
            <p style={{
              fontFamily: 'Inter', fontSize: 14, color: C.muted,
              marginBottom: 26, lineHeight: 1.65, position: 'relative',
            }}>
              Connect your wallet and start trading on the fastest DEX on ARC Network.
            </p>
            <a href="https://app.achswapfi.xyz" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 9,
              background: C.blue, color: C.bg,
              fontFamily: 'Inter', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', position: 'relative',
              boxShadow: `0 4px 22px ${C.blueGlow}`,
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 34px hsla(217,91%,60%,0.5)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 22px ${C.blueGlow}` }}
            >
              <Wallet size={16} /> Connect Wallet
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ padding: '22px 20px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <img src="/img/logos/achswap-logo.png" alt="Achswap" style={{ width: 22, height: 22, borderRadius: 6 }} />
          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13.5, color: C.muted }}>Achswap</span>
        </a>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Twitter', 'Discord', 'Telegram', 'GitHub'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: 13, color: C.muted, textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >{l}</a>
          ))}
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'hsl(215 20% 38%)' }}>© 2026 Achswap</p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: #fff; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }

        @media (min-width: 640px) {
          .dn-links { display: flex !important; }
          .mn-btn   { display: none !important; }
          .stats-grid { grid-template-columns: repeat(4,1fr) !important; }
          .feat-grid  { grid-template-columns: repeat(4,1fr) !important; }
          .cfg-grid   { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 639px) {
          .dn-links { display: none !important; }
          .mn-btn   { display: flex !important; }
          .cfg-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: C.bg, color: '#fff' }}>
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
