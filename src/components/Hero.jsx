import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img src="/logo.jpeg" alt="Puppy Whippies" className={styles.logoImg} />
        </div>

        <h1 className={styles.brandName}>
          <span className="bubble-pink">Pupp</span><span className="bubble-teal">y</span>
          {' '}
          <span className="bubble-purple">Whippies</span>
        </h1>

        <p className={styles.heroLine}>Small-batch whipped treat cups for dog-loving families.</p>

        <div className={styles.tagline}>
          <span>Fruity</span>
          <span className={styles.dot}>*</span>
          <span>Fluffy</span>
          <span className={styles.dot}>*</span>
          <span>Delicious</span>
        </div>

        <p className={styles.sub}>
          Pick a pilot sample cup, tell us your city, and we will confirm flavor, serving notes,
          pickup or delivery fit, and next batch timing.
        </p>

        <div className={styles.buttons}>
          <a href="#products" className={styles.btnPrimary}>Explore Flavors</a>
          <a href="#about" className={styles.btnSecondary}>Our Story</a>
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
