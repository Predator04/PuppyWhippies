import { flavors, tagColors } from '../data/flavors'
import { useLanguage } from '../i18n'
import styles from './Products.module.css'
import Reveal from './Reveal'

export default function Products() {
  const { c, language, href } = useLanguage()
  const localized = (flavor, field) => language === 'es' ? flavor[`${field}Es`] || flavor[field] : flavor[field]

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>{c.products.eyebrow}</span>
            <h2 className={styles.title}>
              <span className="bubble-pink">{c.products.titleA}</span>{' '}
              <span className="bubble-purple">{c.products.titleB}</span>
            </h2>
            <p className={styles.subtitle}>
              {c.products.subtitle}
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
                    {localized(flavor, 'tag')}
                  </span>

                  <h3 className={styles.cardName}>{localized(flavor, 'name')}</h3>
                  <p className={styles.cardDesc}>{localized(flavor, 'desc')}</p>

                  <div className={styles.cardFor}>
                    {localized(flavor, 'notes').map(note => (
                      <span key={note} className={styles.forBadge}>{note}</span>
                    ))}
                  </div>

                  <p className={styles.cardDetail}>{localized(flavor, 'detail')}</p>

                  <div className={styles.cardBottom}>
                    <span className={styles.cardPrice}>{c.products.batch}</span>
                    <a className={styles.addBtn} href={`${href('/request/')}?flavor=${encodeURIComponent(flavor.name)}`}>
                      {c.products.cta}
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
