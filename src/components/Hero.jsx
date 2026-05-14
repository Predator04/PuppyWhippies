import styles from './Hero.module.css'

const floaties = ['🍓','🫐','🥕','🍇','🥒','💜','🩷','🐾','❤️','🍓','🐾','🫐','🥕','🍇','🩷']

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Floating background elements */}
      <div className={styles.floatContainer} aria-hidden="true">
        {floaties.map((emoji, i) => (
          <span key={i} className={styles.floatie} style={{
            left: `${(i * 7) % 100}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${4 + (i % 5)}s`,
            fontSize: `${1.1 + (i % 3) * 0.6}rem`
          }}>{emoji}</span>
        ))}
      </div>

      <div className={styles.inner}>
        {/* Badge */}
        <div className={styles.badge}>🐾 Small-Batch Treats</div>

        {/* Logo image centered */}
        <div className={styles.logoWrap}>
          <img src="/logo.jpeg" alt="Puppy Whippies" className={styles.logoImg} />
          <div className={styles.ring1} />
          <div className={styles.ring2} />
        </div>

        {/* Brand name — BIG centered 3D */}
        <h1 className={styles.brandName}>
          <span className="bubble-pink">Pupp</span><span className="bubble-teal">y</span>
          {' '}
          <span className="bubble-purple">Whippies</span>
        </h1>

        <p className={styles.heroLine}>Small-batch whipped treat cups for dog-loving families.</p>

        {/* Tagline */}
        <div className={styles.tagline}>
          <span>🍓 Fruity</span>
          <span className={styles.dot}>•</span>
          <span>☁️ Fluffy</span>
          <span className={styles.dot}>•</span>
          <span>😋 Delicious</span>
        </div>

        {/* Sub headline */}
        <p className={styles.sub}>
          Pick a pilot sample cup, tell us your city, and we will confirm flavor, serving notes,
          pickup or delivery fit, and next batch timing.
        </p>

        {/* CTAs */}
        <div className={styles.buttons}>
          <a href="#products" className={styles.btnPrimary}>Explore Flavors 🐾</a>
          <a href="#about" className={styles.btnSecondary}>Our Story</a>
        </div>

        {/* Trust badges */}
        <div className={styles.trust}>
          {['🐶 Dog-Family Treats','🌿 Ingredients Shared','📍 Local Requests','💝 Small Batch'].map(t => (
            <span key={t} className={styles.trustBadge}>{t}</span>
          ))}
        </div>
      </div>

      <div className={styles.wave}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F2"/>
        </svg>
      </div>
    </section>
  )
}
