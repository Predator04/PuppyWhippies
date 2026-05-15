import { useLanguage } from '../i18n'
import styles from './WhyUs.module.css'
import Reveal from './Reveal'

const features = [
  { icon: 'IN', color: 'teal' },
  { icon: 'PW', color: 'pink' },
  { icon: 'OK', color: 'purple' },
  { icon: 'FD', color: 'pink' },
  { icon: 'LV', color: 'purple' },
  { icon: '702', color: 'teal' },
]

const colorMap = {
  pink: { bg: '#fde8f0', icon: '#F0527A', border: '#FFB3C6' },
  purple: { bg: '#f0e8ff', icon: '#8B4FC0', border: '#D4B0F0' },
  teal: { bg: '#e0f7fa', icon: '#2BB5C8', border: '#A0DDE8' },
}

export default function WhyUs() {
  const { c } = useLanguage()

  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>{c.why.eyebrow}</span>
            <h2 className={styles.title}>
              <span className="bubble-pink">{c.why.title[0]}</span>{' '}
              <span className="bubble-purple">{c.why.title[1]}</span>{' '}
              <span className="bubble-teal">{c.why.title[2]}</span>
            </h2>
            <p className={styles.subtitle}>{c.why.subtitle}</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {features.map((f, i) => {
            const color = colorMap[f.color]
            const [title, desc] = c.why.features[i]
            return (
              <Reveal key={i} variant="up" delay={i * 80}>
                <div className={styles.card}>
                  <div className={styles.iconWrap} style={{ background: color.bg, borderColor: color.border }}>
                    <span className={styles.icon}>{f.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle} style={{ color: color.icon }}>{title}</h3>
                  <p className={styles.cardDesc}>{desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal variant="scale">
          <div className={styles.stats}>
            {c.why.stats.map(([num, label], i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
