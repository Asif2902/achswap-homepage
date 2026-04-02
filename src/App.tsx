import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Copy, ExternalLink, Layers, Menu, Shield, TrendingUp, X, Zap } from 'lucide-react'

type NavLink = {
  label: string
  href: string
  external?: boolean
}

type Product = {
  name: string
  href: string
  badge: string
  description: string
  bullets: string[]
}

type Capability = {
  category: string
  items: string[]
}

type McpSnippet = {
  name: string
  path: string
  code: string
}

type McpCall = {
  title: string
  code: string
}

const navLinks: NavLink[] = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'MCP', href: '#mcp' },
  { label: 'Docs', href: 'https://docs.achswap.app', external: true },
  { label: 'Twitter', href: 'https://x.com/AchProtocol', external: true },
]

const ecosystemProducts: Product[] = [
  {
    name: 'AchSwap (DEX)',
    href: 'https://trade.achswap.app',
    badge: 'Core Trading',
    description: 'A performance-first exchange built for both first-time and advanced users.',
    bullets: [
      'AMM + CLMM architecture',
      'Beginner UI + Pro liquidity mode',
      'Gasless swaps for seamless trading',
    ],
  },
  {
    name: 'Token Launch',
    href: 'https://trade.achswap.app/launch',
    badge: 'Creator Tools',
    description: 'Launch and list community tokens without waiting on centralized gatekeepers.',
    bullets: [
      'Create and launch a token instantly',
      'Add $500 liquidity at launch',
      'Auto-listed under Community Tokens',
    ],
  },
  {
    name: 'Bridge (CCTP v2)',
    href: 'https://trade.achswap.app/bridge',
    badge: 'Cross-Chain',
    description: 'Move value across chains with production-grade infrastructure from Circle.',
    bullets: [
      'Cross-chain transfers across 9 chains',
      'Powered by Circle CCTP v2',
      'Built into the same AchSwap app flow',
    ],
  },
  {
    name: 'AchMarket (Prediction Market)',
    href: 'https://prediction.achswap.app',
    badge: 'Market Layer',
    description: 'A decentralized market engine for real-time sentiment and probability.',
    bullets: [
      'LMSR-based pricing model',
      'Fully decentralized prediction markets',
      'Designed for transparent market resolution',
    ],
  },
]

const infrastructureProducts: Product[] = [
  {
    name: 'Swap API & Smart Adaptor',
    href: 'https://docs.achswap.app/achswap/adapter',
    badge: 'Developer Infra',
    description: 'Routing and execution primitives for wallets, bots, and full-stack products.',
    bullets: [
      'Best execution price selection',
      'Split routes + multi-hop support',
      'Use via API or direct on-chain integration',
    ],
  },
  {
    name: 'MCP Server (AI-Native DEX Layer)',
    href: 'https://docs.achswap.app/technical/mcp',
    badge: 'AI Integration',
    description: 'A programmable DeFi interface that lets AI agents execute real actions.',
    bullets: [
      'Swap tokens, add and remove liquidity',
      'Launch tokens directly through AI workflows',
      'Designed for AI-first automation systems',
    ],
  },
]

const capabilities: Capability[] = [
  { category: 'Wallet', items: ['Generate wallet', 'Get wallet address', 'Check wallet info'] },
  { category: 'Balances', items: ['Get native USDC', 'Get token balances', 'Read portfolio balances'] },
  { category: 'Transfers', items: ['Transfer USDC', 'Transfer ERC-20 tokens'] },
  { category: 'Swaps', items: ['Get swap quote', 'Swap exact tokens', 'USDC pair swaps'] },
  { category: 'Liquidity', items: ['Add liquidity', 'Remove liquidity', 'Read pool reserves'] },
  { category: 'Approvals', items: ['Approve trading allowance', 'Check token approvals'] },
]

const mcpSnippets: McpSnippet[] = [
  {
    name: 'Claude Code',
    path: '~/.claude.json',
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
    name: 'Cline',
    path: '.cline/mcp.json',
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
    name: 'OpenCode',
    path: '~/.opencode/mcp.json',
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "achswap": {
      "type": "remote",
      "url": "https://api.achswapfi.xyz/mcp/message",
      "headers": {
        "X-Private-Key": "0xYOUR_PRIVATE_KEY"
      },
      "enabled": true
    }
  }
}`,
  },
  {
    name: 'cURL',
    path: 'Terminal',
    code: `curl -X POST https://api.achswapfi.xyz/mcp/message \\
  -H "Content-Type: application/json" \\
  -H "X-Private-Key: 0xYOUR_PRIVATE_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{"name":"get_swap_quote",
      "arguments":{"amount_in":"1000000",
        "token_in":"USDC","token_out":"ACHS"}}}'`,
  },
]

const mcpCalls: McpCall[] = [
  {
    title: 'Quote a swap',
    code: `{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_swap_quote",
    "arguments": {
      "amount_in": "1000000",
      "token_in": "USDC",
      "token_out": "ACHS"
    }
  }
}`,
  },
  {
    title: 'Add liquidity',
    code: `{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "add_liquidity",
    "arguments": {
      "token_a": "USDC",
      "token_b": "ACHS",
      "amount_a": "500000000",
      "amount_b": "30000000000"
    }
  }
}`,
  },
  {
    title: 'Launch token',
    code: `{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "launch_token",
    "arguments": {
      "name": "Example Token",
      "symbol": "EXM",
      "supply": "1000000000",
      "liquidity_usdc": "500000000"
    }
  }
}`,
  },
]

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <motion.div className="section-head" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  )
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <motion.article
      className="panel-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="panel-top">
        <span className="chip">{product.badge}</span>
        <a href={product.href} target="_blank" rel="noreferrer" className="panel-link">
          Visit <ExternalLink size={14} />
        </a>
      </div>
      <h3>{product.name}</h3>
      <p className="panel-description">{product.description}</p>
      <ul>
        {product.bullets.map((itemText) => (
          <li key={itemText}>{itemText}</li>
        ))}
      </ul>
    </motion.article>
  )
}

function SnippetCard({
  snippet,
  copied,
  onCopy,
}: {
  snippet: McpSnippet
  copied: boolean
  onCopy: (text: string, id: string) => void
}) {
  return (
    <article className="snippet-card">
      <div className="snippet-header">
        <div>
          <h4>{snippet.name}</h4>
          <p>{snippet.path}</p>
        </div>
        <button type="button" onClick={() => onCopy(snippet.code, snippet.name)} className="copy-button">
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      window.setTimeout(() => setCopiedId(null), 1800)
    } catch {
      setCopiedId(null)
    }
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="shell nav-inner">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <img src="/img/logos/achswap-logo.png" alt="AchSwap" />
            <span>AchSwap</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="https://trade.achswap.app" target="_blank" rel="noreferrer" className="btn btn-primary">
              Launch App <ArrowRight size={15} />
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((state) => !state)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="shell mobile-menu-inner">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://trade.achswap.app"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-launch"
                >
                  Launch App
                </a>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="shell hero-grid">
            <motion.div variants={rise} initial="hidden" animate="show" className="hero-copy">
              <p className="eyebrow">Introducing the Ach Ecosystem</p>
              <h1>Everything we have been building is now live.</h1>
              <p className="hero-text">
                This is more than a DEX. Ach is infrastructure for users, developers, and AI systems operating across
                trading, launching, bridging, and prediction markets.
              </p>
              <div className="hero-actions">
                <a href="https://trade.achswap.app" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Explore AchSwap <ArrowRight size={15} />
                </a>
                <a href="https://docs.achswap.app" target="_blank" rel="noreferrer" className="btn btn-muted">
                  Read Docs
                </a>
              </div>
              <div className="hero-social">
                <span>Follow updates on</span>
                <a href="https://x.com/AchPredict" target="_blank" rel="noreferrer">
                  @AchPredict <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-facts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <div className="fact-card">
                <Zap size={16} />
                <div>
                  <h4>AMM + CLMM</h4>
                  <p>Dual architecture for flexible and concentrated liquidity flows.</p>
                </div>
              </div>
              <div className="fact-card">
                <Shield size={16} />
                <div>
                  <h4>Gasless Experience</h4>
                  <p>Lower friction execution for traders and first-time users.</p>
                </div>
              </div>
              <div className="fact-card">
                <Layers size={16} />
                <div>
                  <h4>9-Chain Transfers</h4>
                  <p>Bridge powered by Circle CCTP v2 inside the same app stack.</p>
                </div>
              </div>
              <div className="fact-card">
                <TrendingUp size={16} />
                <div>
                  <h4>LMSR Prediction Markets</h4>
                  <p>Fully decentralized market pricing via AchMarket.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="ecosystem" className="section">
          <div className="shell">
            <SectionHeader
              eyebrow="Ecosystem"
              title="Products built to work as one stack"
              description="Each product can stand alone, but the full value is in how they connect across trading, launch, bridge, and markets."
            />
            <div className="panel-grid">
              {ecosystemProducts.map((product, index) => (
                <ProductCard key={product.name} product={product} delay={index * 0.06} />
              ))}
            </div>
          </div>
        </section>

        <section id="infrastructure" className="section section-alt">
          <div className="shell">
            <SectionHeader
              eyebrow="Developer Infrastructure"
              title="Integration primitives for apps, bots, and agent systems"
              description="Ach infrastructure is designed for direct product integration, from pricing routes to fully programmable execution."
            />
            <div className="panel-grid panel-grid-two">
              {infrastructureProducts.map((product, index) => (
                <ProductCard key={product.name} product={product} delay={index * 0.08} />
              ))}
            </div>
          </div>
        </section>

        <section id="mcp" className="section">
          <div className="shell">
            <SectionHeader
              eyebrow="MCP Server"
              title="Example MCP setup and request payloads"
              description="Keep these examples as a quick start for Claude Code, Cline, OpenCode, and direct JSON-RPC calls."
            />

            <motion.div
              className="capability-grid"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {capabilities.map((capability) => (
                <article key={capability.category} className="capability-card">
                  <h4>{capability.category}</h4>
                  <ul>
                    {capability.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </motion.div>

            <div className="snippet-grid">
              {mcpSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.name}
                  snippet={snippet}
                  copied={copiedId === snippet.name}
                  onCopy={copyText}
                />
              ))}
            </div>

            <div className="example-grid">
              {mcpCalls.map((call) => (
                <article key={call.title} className="example-card">
                  <div className="example-head">{call.title}</div>
                  <pre>
                    <code>{call.code}</code>
                  </pre>
                </article>
              ))}
            </div>

            <div className="mcp-footer">
              <a href="https://docs.achswap.app/technical/mcp" target="_blank" rel="noreferrer" className="btn btn-muted">
                Full MCP Documentation <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="section section-compact">
          <div className="shell">
            <motion.div
              className="closing-panel"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <p className="eyebrow">Ready to build or trade?</p>
                <h3>Start with AchSwap, then scale with infrastructure.</h3>
              </div>
              <div className="closing-actions">
                <a href="https://trade.achswap.app" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Open Trade App <ArrowRight size={15} />
                </a>
                <a href="https://docs.achswap.app" target="_blank" rel="noreferrer" className="btn btn-muted">
                  Learn More <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a href="#top" className="brand">
            <img src="/img/logos/achswap-logo.png" alt="AchSwap" />
            <span>AchSwap Ecosystem</span>
          </a>
          <div className="footer-links">
            <a href="https://trade.achswap.app" target="_blank" rel="noreferrer">
              Trade
            </a>
            <a href="https://prediction.achswap.app" target="_blank" rel="noreferrer">
              AchMarket
            </a>
            <a href="https://docs.achswap.app" target="_blank" rel="noreferrer">
              Docs
            </a>
            <a href="https://x.com/AchPredict" target="_blank" rel="noreferrer">
              @AchPredict
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
