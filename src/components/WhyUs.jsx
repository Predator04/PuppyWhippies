import styles from './WhyUs.module.css'
import Reveal from './Reveal'

const features = [
  {
    icon: '🌿',
    color: 'teal',
    title: 'Ingredients Before Pickup',
    desc: 'Current batch ingredients are shared before pickup, delivery, or payment, so there are no mystery treats.',
  },
  {
    icon: '🐶',
    color: 'pink',
    title: 'Made for Dog Families',
    desc: 'Designed for pet parents who want a special treat moment and clear serving guidance before trying it.',
  },
  {
    icon: '👧',
    color: 'purple',
    title: 'Clear Fit Check',
    desc: 'Tell us about your pup, allergies, and preferences so we can help you decide whether a batch makes sense.',
  },
  {
    icon: '☁️',
    color: 'pink',
    title: 'Whipped-Style Texture',
    desc: 'Soft, spoonable treat cups with texture, serving size, and storage notes shared before pickup or delivery.',
  },
  {
    icon: '💝',
    color: 'purple',
    title: 'Made with Love',
    desc: 'Small-batch preparation keeps the brand personal while the flavor lineup is still growing.',
  },
  {
    icon: '🚚',
    color: 'teal',
    title: 'Las Vegas Area Requests',
    desc: 'Ask about current availability, pickup, delivery, and the best way to try the flavors around Las Vegas.',
  },
]

const colorMap = {
  pink: { bg: '#fde8f0', icon: '#F0527A', border: '#FFB3C6' },
  purple: { bg: '#f0e8ff', icon: '#8B4FC0', border: '#D4B0F0' },
  teal: { bg: '#e0f7fa', icon: '#2BB5C8', border: '#A0DDE8' },
}

export default function WhyUs() {
  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>🐾 Why Puppy Whippies?</span>
            <h2 className={styles.title}>
              <span className="bubble-pink">The</span>{' '}
              <span className="bubble-purple">Whippie</span>{' '}
              <span className="bubble-teal">Difference</span>
            </h2>
            <p className={styles.subtitle}>
              A playful treat concept for families who love their dogs deeply and want the details handled with care.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {features.map((f, i) => {
            const c = colorMap[f.color]
            return (
              <Reveal key={i} variant="up" delay={i * 80}>
              <div className={styles.card}>
                <div className={styles.iconWrap} style={{ background: c.bg, borderColor: c.border }}>
                  <span className={styles.icon}>{f.icon}</span>
                </div>
                <h3 className={styles.cardTitle} style={{ color: c.icon }}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
              </Reveal>
            )
          })}
        </div>

        {/* Stats banner */}
        <Reveal variant="scale">
        <div className={styles.stats}>
          {[
            { num: 'Pilot', label: 'Batch Status' },
            { num: '1:1', label: 'Request Help' },
            { num: 'Before', label: 'Ingredients Shared' },
            { num: 'No', label: 'Online Payment' },
          ].map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}
