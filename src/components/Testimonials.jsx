import { useLanguage } from '../i18n'
import styles from './Testimonials.module.css'
import Reveal from './Reveal'

const avatars = ['IN', 'FD', '@', 'OK']

export default function Testimonials() {
  const { c } = useLanguage()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{c.details.eyebrow}</span>
          <h2 className={styles.title}>
            <span className="bubble-pink">{c.details.title[0]}</span>{' '}
            <span className="bubble-purple">{c.details.title[1]}</span>{' '}
            <span className="bubble-teal">{c.details.title[2]}</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {c.details.items.map(([name, text, tag], i) => (
            <Reveal key={name} variant="up" delay={i * 100}>
              <div className={styles.card}>
                <div className={styles.stars} aria-hidden="true">{avatars[i]}</div>
                <p className={styles.text}>{text}</p>
                <div className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">{avatars[i]}</span>
                  <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.tag}>{tag}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
