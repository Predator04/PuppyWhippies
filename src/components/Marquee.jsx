import styles from './Marquee.module.css'

const items = [
  'Fruity', 'Pup-Loving', 'Freeze-Dried', 'Las Vegas Area',
  'Blueberry', 'Made with Love', 'Veggie Ideas', 'Pup-Ready',
  'All-Natural Ingredients', 'Dog Families', 'Berry Good', 'Small Batch',
]

export default function Marquee() {
  const doubled = [...items, ...items]

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
