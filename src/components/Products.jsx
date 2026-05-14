import { flavors, tagColors } from '../data/flavors'
import styles from './Products.module.css'
import Reveal from './Reveal'

export default function Products() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Our Treats</span>
            <h2 className={styles.title}>
              <span className="bubble-pink">Flavor</span>{' '}
              <span className="bubble-purple">Lineup</span>
            </h2>
            <p className={styles.subtitle}>
              Choose a freeze-dried pilot flavor. Each request starts with flavor fit, all-natural ingredient notes, serving guidance,
              and Las Vegas area pickup or delivery timing.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {flavors.map((flavor, i) => {
            const tc = tagColors[flavor.tagColor]
            return (
              <Reveal key={flavor.id} variant="up" delay={i * 80}>
                <div className={styles.card}>
                  <div className={`${styles.flavorArt} ${styles[flavor.art]}`} aria-hidden="true">
                    <img src="/logo-web.png" alt="" className={styles.puppyImg} />
                    <span className={styles.toneWash} />
                    <span className={styles.sparkle} />
                  </div>

                  <span className={styles.cardTag} style={{
                    background: tc.bg,
                    color: tc.color,
                    borderColor: tc.border,
                  }}>
                    {flavor.tag}
                  </span>

                  <h3 className={styles.cardName}>{flavor.name}</h3>
                  <p className={styles.cardDesc}>{flavor.desc}</p>

                  <div className={styles.cardFor}>
                    {flavor.notes.map(note => (
                      <span key={note} className={styles.forBadge}>{note}</span>
                    ))}
                  </div>

                  <p className={styles.cardDetail}>{flavor.detail}</p>

                  <div className={styles.cardBottom}>
                    <span className={styles.cardPrice}>Freeze-dried pilot batch</span>
                    <a className={styles.addBtn} href={`/request/?flavor=${encodeURIComponent(flavor.name)}`}>
                      Request Availability
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
