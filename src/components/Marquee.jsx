import { useLanguage } from '../i18n'
import styles from './Marquee.module.css'

export default function Marquee() {
  const { c } = useLanguage()
  const doubled = [...c.marquee, ...c.marquee]

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.skew}>
        <div className={styles.track}>
          {doubled.map((item, i) => (
            <span key={i} className={styles.item}>
              {item}
              <span className={styles.sep}>*</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
