import { useLanguage } from '../i18n'
import styles from './Hero.module.css'

export default function Hero() {
  const { c, href } = useLanguage()

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img src="/logo-web.png" alt="Puppy Whippies" className={styles.logoImg} />
        </div>

        <h1 className={styles.brandName}>
          <span className="bubble-pink">Pupp</span><span className="bubble-teal">y</span>
          {' '}
          <span className="bubble-purple">Whippies</span>
        </h1>

        <p className={styles.heroLine}>{c.hero.line}</p>

        <div className={styles.tagline}>
          <span>{c.hero.tags[0]}</span>
          <span className={styles.dot}>*</span>
          <span>{c.hero.tags[1]}</span>
          <span className={styles.dot}>*</span>
          <span>{c.hero.tags[2]}</span>
        </div>

        <p className={styles.sub}>
          {c.hero.sub}
        </p>

        <div className={styles.buttons}>
          <a href={href('/request/')} className={styles.btnPrimary}>{c.nav.request}</a>
          <a href={href('/flavors/')} className={styles.btnSecondary}>{c.hero.flavors}</a>
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
