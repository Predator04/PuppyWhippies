import { useLanguage } from '../i18n'
import styles from './About.module.css'

export default function About() {
  const { c, href } = useLanguage()
  const pillarIcons = ['PW', 'No', 'LV', '702']

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageSide}>
          <div className={styles.imgWrap}>
            <img src="/logo-web.png" alt="Puppy Whippies" className={styles.img} />
            <div className={styles.bubble1}>{c.about.bubble1}</div>
            <div className={styles.bubble2}>{c.about.bubble2}</div>
          </div>
        </div>

        <div className={styles.textSide}>
          <span className={styles.eyebrow}>{c.about.eyebrow}</span>
          <h2 className={styles.title}>
            <span className="bubble-purple">{c.about.titleA}</span>{' '}
            <span className="bubble-pink">{c.about.titleB}</span>
          </h2>
          <p className={styles.body}>{c.about.body1}</p>
          <p className={styles.body}>{c.about.body2}</p>

          <div className={styles.pillars}>
            {c.about.pillars.map((label, index) => (
              <div key={label} className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true">{pillarIcons[index]}</span>
                <span className={styles.pillarLabel}>{label}</span>
              </div>
            ))}
          </div>

          <a href={href('/request/')} className={styles.cta}>{c.about.cta}</a>
        </div>
      </div>
    </section>
  )
}
