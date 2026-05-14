import styles from './Footer.module.css'

const floaties = ['🍓','🐾','🫐','💜','🥕','🩷','🍇','⭐','🥒','🐶']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Floating emojis */}
      <div className={styles.floatContainer} aria-hidden="true">
        {floaties.map((emoji, i) => (
          <span key={i} className={styles.floatie} style={{
            left: `${(i * 10) % 100}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${6 + (i % 4)}s`,
            fontSize: `${0.9 + (i % 3) * 0.4}rem`,
            opacity: 0.12,
          }}>{emoji}</span>
        ))}
      </div>

      {/* Wave top */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" focusable="false">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#2BB5C8" opacity="0.3"/>
          <path d="M0,40 C480,10 960,60 1440,20 L1440,0 L0,0 Z" fill="#FF6FA8" opacity="0.2"/>
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/logo-transparent.png" alt="Puppy Whippies" className={styles.logo} />
            <div>
              <div className={styles.brandName}>
                <span className={styles.brandPink}>Puppy</span>{' '}
                <span className={styles.brandPurple}>Whippies</span>
              </div>
              <p className={styles.tagline}>🍓 Fruity • ☁️ Fluffy • 😋 Delicious</p>
              <p className={styles.domain}>puppywhippies.com</p>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkCol}>
              <h4>Flavors</h4>
              <a href="#products">Flavor Lineup</a>
              <a href="#products">Berry Flavors</a>
              <a href="#products">Veggie Flavors</a>
              <a href="#contact">Request Info</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Company</h4>
              <a href="#about">Our Story</a>
              <a href="#why-us">Why Whippies?</a>
              <a href="#contact">Contact</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Request Notes</h4>
              <span>No payment is collected on this site.</span>
              <span>Ingredients are confirmed by email.</span>
              <span>Las Vegas area pickup or delivery is arranged per batch.</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Puppy Whippies. Made with 🐾 love. All rights reserved.</p>
          <p className={styles.legal}>
            Email requests are used only to reply about Puppy Whippies availability. Treats are not a veterinary product; supervise pets while serving.
          </p>
        </div>
      </div>
    </footer>
  )
}
