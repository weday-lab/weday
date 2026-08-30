import { useEffect, useRef, useState } from 'react'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d={diagonal ? 'M6 18 18 6M8 6h10v10' : 'M5 12h14m-5-5 5 5-5 5'} />
  </svg>
)

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`wordmark ${inverse ? 'wordmark--inverse' : ''}`} href="#top" aria-label="WEDAY 首页">
      <svg className="wordmark__mark" viewBox="0 0 52 42" aria-hidden="true">
        <path d="M2 10h9l7 20 4-15h8l4 15 7-20h9L40 39H30l-4-13-4 13H12z" />
      </svg>
      <span className="wordmark__name">WEDAY</span>
      <span className="wordmark__cn">维岱科技</span>
    </a>
  )
}

function IntelligenceCore() {
  const coreRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    coreRef.current?.style.setProperty('--rx', `${-y * 8}deg`)
    coreRef.current?.style.setProperty('--ry', `${x * 8}deg`)
  }

  const reset = () => {
    coreRef.current?.style.setProperty('--rx', '0deg')
    coreRef.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <div className="core-stage" onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <div className="core-axis core-axis--x" />
      <div className="core-axis core-axis--y" />
      <div className="core" ref={coreRef}>
        <div className="core__ring core__ring--one" />
        <div className="core__ring core__ring--two" />
        <div className="core__ring core__ring--three" />
        <div className="core__center">
          <span className="core__eyebrow">W/01</span>
          <span className="core__label">NATIVE<br />CORE</span>
          <span className="core__status"><i /> ONLINE</span>
        </div>
        <i className="core__node core__node--a" />
        <i className="core__node core__node--b" />
        <i className="core__node core__node--c" />
      </div>
      <span className="core-coordinate core-coordinate--left">31.2304° N</span>
      <span className="core-coordinate core-coordinate--right">121.4737° E</span>
    </div>
  )
}

const capabilities = [
  { id: '01', title: '端侧智能', en: 'EDGE INTELLIGENCE', text: '让模型在设备上实时思考，以低延迟、高隐私完成感知、决策与行动。' },
  { id: '02', title: '软硬一体', en: 'SYSTEM CO-DESIGN', text: '从芯片、传感器到模型和交互，围绕真实场景进行系统级协同设计。' },
  { id: '03', title: '持续进化', en: 'LIVING SYSTEMS', text: '通过反馈闭环让产品持续理解用户，在每一次使用中变得更自然、更可靠。' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pendingSectionRef = useRef<string | null>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.right = '0'
    style.left = '0'
    style.width = '100%'
    document.documentElement.classList.add('menu-open')

    return () => {
      document.documentElement.classList.remove('menu-open')
      style.position = ''
      style.top = ''
      style.right = ''
      style.left = ''
      style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen || !pendingSectionRef.current) return

    const targetSelector = pendingSectionRef.current
    pendingSectionRef.current = null
    const frame = window.requestAnimationFrame(() => {
      document.querySelector(targetSelector)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', targetSelector)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [menuOpen])

  const navigateFromMenu = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    pendingSectionRef.current = target
    setMenuOpen(false)
  }

  return (
    <div className="site-shell" id="top">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <header className="site-header">
        <Wordmark />
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#vision">愿景</a>
          <a href="#work">产品</a>
          <a href="#capability">能力</a>
          <a className="nav-contact" href="#contact">与我们同行 <Arrow diagonal /></a>
        </nav>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="切换导航" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <a href="#vision" onClick={(event) => navigateFromMenu(event, '#vision')}>愿景 <span>01</span></a>
        <a href="#work" onClick={(event) => navigateFromMenu(event, '#work')}>产品 <span>02</span></a>
        <a href="#capability" onClick={(event) => navigateFromMenu(event, '#capability')}>能力 <span>03</span></a>
        <a href="#contact" onClick={(event) => navigateFromMenu(event, '#contact')}>联系我们 <span>04</span></a>
      </div>

      <main>
        <section className="hero section-grid">
          <div className="hero__meta reveal reveal--one">
            <span>AI NATIVE COMPANY</span>
            <span>SHANGHAI / CHINA</span>
          </div>
          <div className="hero__copy">
            <p className="kicker reveal reveal--two"><span>●</span> BUILT FOR THE REAL WORLD</p>
            <h1 className="reveal reveal--three">
              <span className="headline-desktop">智能，不止存在于<br /></span>
              <span className="headline-mobile">智能，不止<br />存在于<br /></span>
              <em>屏幕之内。</em>
            </h1>
            <p className="hero__intro reveal reveal--four">维岱科技是一家 AI Native 软硬件公司。我们让智能拥有感知世界、理解意图并自主行动的能力。</p>
            <a className="text-link reveal reveal--four" href="#vision">探索维岱 <Arrow /></a>
          </div>
          <div className="hero__visual reveal reveal--three">
            <IntelligenceCore />
          </div>
          <div className="hero__index">W / 2026</div>
        </section>

        <section className="statement" id="vision">
          <div className="statement__rail"><span>OUR BELIEF</span><span>01 — 04</span></div>
          <div className="statement__body">
            <p>我们相信，下一代计算不再始于点击和输入，而是始于对人的理解。</p>
            <h2>让科技主动靠近人，<br />而不是让人适应科技。</h2>
            <div className="statement__note">
              <span>WE BUILD</span>
              <p>有温度的机器<br />有判断的系统<br />有生命力的产品</p>
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-heading">
            <p className="kicker"><span>●</span> WHAT WE BUILD</p>
            <h2>同一个智能内核，<br />两种产品形态。</h2>
            <span className="section-heading__count">02</span>
          </div>

          <article className="product product--dark">
            <div className="product__top"><span>WEDAY / SOFTWARE</span><span>01</span></div>
            <div className="software-visual" aria-hidden="true">
              <div className="software-visual__window">
                <div className="software-visual__bar"><i /><i /><i /><span>AI SOFTWARE / ACTIVE</span></div>
                <div className="software-visual__field">
                  <span className="data data--a">INTENT 0.982</span>
                  <span className="data data--b">MODEL READY</span>
                  <div className="pulse"><i /><i /><i /></div>
                  <div className="prompt">今天，可以为你做什么？<b>_</b></div>
                </div>
              </div>
            </div>
            <div className="product__copy">
              <div><span className="product__number">01</span><h3>AI SOFTWARE</h3></div>
              <p>面向真实场景的 AI Native 软件。理解上下文、编排能力，让复杂任务以更自然的方式发生。</p>
              <a href="#contact">了解软件方向 <Arrow diagonal /></a>
            </div>
          </article>

          <article className="product product--light">
            <div className="product__top"><span>WEDAY / HARDWARE</span><span>02</span></div>
            <div className="hardware-visual" aria-hidden="true">
              <div className="module-axis module-axis--x" />
              <div className="module-axis module-axis--y" />
              <div className="module-shadow" />
              <div className="hardware-module">
                <div className="hardware-module__top"><span>W/01</span><i /></div>
                <div className="hardware-module__sensor"><i /><b>VISION<br />ARRAY</b></div>
                <div className="hardware-module__ports"><i /><i /><i /><i /></div>
                <span className="hardware-module__id">AI NATIVE<br />COMPUTE UNIT</span>
              </div>
              <div className="module-part module-part--a"><span>01</span></div>
              <div className="module-part module-part--b"><span>02</span></div>
              <span className="hardware-visual__label hardware-visual__label--a">MODULAR / EDGE</span>
              <span className="hardware-visual__label hardware-visual__label--b">LOCAL / PRIVATE</span>
            </div>
            <div className="product__copy">
              <div><span className="product__number">02</span><h3>AI DEVICE</h3></div>
              <p>围绕端侧智能探索新一代硬件形态。感知环境、保护隐私，并在恰当的时刻自然响应。</p>
              <a href="#contact">了解硬件方向 <Arrow diagonal /></a>
            </div>
          </article>
        </section>

        <section className="capability" id="capability">
          <div className="capability__intro">
            <p className="kicker kicker--light"><span>●</span> NATIVE BY DESIGN</p>
            <h2>AI 不是一个功能，<br />而是产品的起点。</h2>
            <p>从最底层重新思考软硬件关系，让智能自然生长在产品的每一层。</p>
          </div>
          <div className="capability__list">
            {capabilities.map((item) => (
              <article key={item.id}>
                <span>{item.id}</span>
                <div><p>{item.en}</p><h3>{item.title}</h3></div>
                <p>{item.text}</p>
                <i><Arrow diagonal /></i>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto">
          <p className="manifesto__eyebrow">WEDAY MANIFESTO / 2026</p>
          <p className="manifesto__line manifesto__line--ghost">WE DON'T PREDICT</p>
          <p className="manifesto__line">THE FUTURE.</p>
          <p className="manifesto__line manifesto__line--accent">WE PROTOTYPE IT.</p>
          <div className="manifesto__footer">
            <span>不预测未来</span>
            <span>亲手把它造出来</span>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__meta">
            <p className="kicker"><span>●</span> OPEN CHANNEL</p>
            <span>04 — 04</span>
          </div>
          <div className="contact__main">
            <h2>一起创造<br /><em>智能的新维度。</em></h2>
            <a className="contact__button" href="mailto:hello@weday.io">
              <span>HELLO@WEDAY.IO</span><i><Arrow diagonal /></i>
            </a>
          </div>
          <div className="contact__aside">
            <p>寻找同样相信 AI 将重塑现实世界的伙伴、创造者与长期主义者。</p>
            <span>JOIN US / PARTNERSHIP / PRESS</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Wordmark inverse />
        <div className="site-footer__links">
          <a href="#top">小红书</a><a href="#top">微信公众号</a><a href="#top">LinkedIn</a>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 维岱科技</span><span>AI NATIVE / BUILT IN SHANGHAI</span><a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
