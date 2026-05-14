import styles from './Footer.module.css'

export default function Footer() {
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
              <p className={styles.tagline}>Fruity * Freeze-Dried * All Natural</p>
              <p className={styles.domain}>puppywhippies.com</p>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkCol}>
              <h4>Flavors</h4>
              <a href="/flavors/">Flavor Lineup</a>
              <a href="/flavors/">Berry Flavors</a>
              <a href="/flavors/">Veggie Flavors</a>
              <a href="/request/">Request Info</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Company</h4>
              <a href="/about/">Our Story</a>
              <a href="/las-vegas-dog-treats/">Las Vegas Dog Treats</a>
              <a href="/ingredients/">Ingredients</a>
              <a href="/request/">Contact</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Request Notes</h4>
              <span>No payment is collected on this site.</span>
              <span>All-natural ingredients are confirmed by email.</span>
              <span>Las Vegas area pickup or delivery is arranged per freeze-dried batch.</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Copyright 2026 Puppy Whippies. Made with love in the Las Vegas area. All rights reserved.</p>
          <p className={styles.legal}>
            Email requests are used only to reply about Puppy Whippies availability. Treats are not a veterinary
            product; supervise pets while serving.
          </p>
        </div>
      </div>
    </footer>
  )
}
