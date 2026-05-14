import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageSide}>
          <div className={styles.imgWrap}>
            <img src="/logo-web.png" alt="Puppy Whippies" className={styles.img} />
            <div className={styles.bubble1}>Made with Love</div>
            <div className={styles.bubble2}>Ingredient Details</div>
          </div>
        </div>

        <div className={styles.textSide}>
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.title}>
            <span className="bubble-purple">Why We</span>{' '}
            <span className="bubble-pink">Started</span>
          </h2>
          <p className={styles.body}>
            Puppy Whippies was born out of pure love for dogs and the families who spoil them.
            We wanted a cheerful dog treat ritual that adults can supervise and everyone can enjoy watching,
            without pretending every pet or household needs the same thing.
          </p>
          <p className={styles.body}>
            Every Puppy Whippie request starts with the practical details: current ingredients, serving size,
            storage, availability, and whether the batch is a good fit for your pup. We are still refining the
            lineup, so we keep availability and serving guidance personal.
          </p>

          <div className={styles.pillars}>
            {[
              { icon: 'PW', label: 'Ingredient Details' },
              { icon: 'No', label: 'No Payment on Site' },
              { icon: 'LV', label: 'Dog-Loving Families' },
              { icon: '702', label: 'Las Vegas Area' },
            ].map(p => (
              <div key={p.label} className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true">{p.icon}</span>
                <span className={styles.pillarLabel}>{p.label}</span>
              </div>
            ))}
          </div>

          <a href="/request/" className={styles.cta}>Request Availability</a>
        </div>
      </div>
    </section>
  )
}
