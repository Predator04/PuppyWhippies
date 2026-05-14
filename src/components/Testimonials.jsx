import styles from './Testimonials.module.css'
import Reveal from './Reveal'

const details = [
  {
    name: 'Current Batch',
    avatar: '🌿',
    text: 'Puppy Whippies is in Las Vegas area pilot-batch mode. Availability, flavor, serving size, and pickup or delivery fit are confirmed by email before anything moves forward.',
    tag: 'Pilot status',
  },
  {
    name: 'Ingredient Check',
    avatar: '🥄',
    text: 'Example batches may include fruit or veggie puree, a whipped base, and chilled storage. Current ingredients are confirmed before pickup or delivery.',
    tag: 'Details first',
  },
  {
    name: 'No Site Checkout',
    avatar: '📬',
    text: 'There is no cart or payment on this site yet. The form opens an email request so details can be confirmed personally.',
    tag: 'No payment here',
  },
  {
    name: 'Serving Note',
    avatar: '🍓',
    text: 'Treats are not a meal replacement or veterinary product. Ask your vet if your pet has dietary needs, and supervise pets while serving.',
    tag: 'Pet care',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>💬 Good to Know</span>
          <h2 className={styles.title}>
            <span className="bubble-pink">Before</span>{' '}
            <span className="bubble-purple">You</span>{' '}
            <span className="bubble-teal">Request</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {details.map((item, i) => (
            <Reveal key={i} variant="up" delay={i * 100}>
            <div className={styles.card}>
              <div className={styles.stars} aria-hidden="true">{item.avatar}</div>
              <p className={styles.text}>{item.text}</p>
              <div className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">{item.avatar}</span>
                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.tag}>{item.tag}</div>
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
