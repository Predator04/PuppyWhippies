import { useLanguage } from '../i18n'
import styles from './Footer.module.css'

export default function Footer() {
  const { c, href } = useLanguage()
  const flavorLinks = ['/flavors/', '/flavors/', '/flavors/', '/request/'].map(href)
  const companyLinks = ['/about/', '/las-vegas-dog-treats/', '/ingredients/', '/request/', '/privacy/'].map(href)

  return (
    <footer className={styles.footer}>
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" focusable="false">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#2BB5C8" opacity="0.3" />
          <path d="M0,40 C480,10 960,60 1440,20 L1440,0 L0,0 Z" fill="#FF6FA8" opacity="0.2" />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/logo-web.png" alt="Puppy Whippies" className={styles.logo} />
            <div>
              <div className={styles.brandName}>
                <span className={styles.brandPink}>Puppy</span>{' '}
                <span className={styles.brandPurple}>Whippies</span>
              </div>
              <p className={styles.tagline}>{c.footer.tagline}</p>
              <p className={styles.domain}>puppywhippies.com</p>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkCol}>
              <h4>{c.footer.flavors}</h4>
              {c.footer.flavorLinks.map((label, index) => (
                <a href={flavorLinks[index]} key={label}>{label}</a>
              ))}
            </div>
            <div className={styles.linkCol}>
              <h4>{c.footer.company}</h4>
              {c.footer.companyLinks.map((label, index) => (
                <a href={companyLinks[index]} key={label}>{label}</a>
              ))}
            </div>
            <div className={styles.linkCol}>
              <h4>{c.footer.notes}</h4>
              {c.footer.noteItems.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{c.footer.copyright}</p>
          <p className={styles.legal}>
            {c.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  )
}
