import styles from './Marquee.module.css'

const items = [
  '🍓 Fruity', '🐾 Pup-Loving', '☁️ Fluffy', '📍 Local Requests',
  '🫐 Blueberry', '💝 Made with Love', '🥕 Veggie Ideas', '🐶 Pup-Ready',
  '🌿 Ingredient Details', '🐶 Dog Families', '🍇 Berry Good', '✨ Small Batch',
]

export default function Marquee() {
  // Double the items so the loop is seamless
  const doubled = [...items, ...items]

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.skew}>
        <div className={styles.track}>
          {doubled.map((item, i) => (
            <span key={i} className={styles.item}>
              {item}
              <span className={styles.sep}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
