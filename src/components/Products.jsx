import styles from './Products.module.css'
import Reveal from './Reveal'

const flavors = [
  {
    id: 1,
    emoji: '🍓',
    name: 'Strawberry Dream Whip',
    desc: 'A pilot sample cup built around strawberry, plain yogurt-style whip, and batch-confirmed serving notes.',
    tag: 'Berry',
    tagColor: 'pink',
    notes: ['Strawberry', 'Whipped base', 'Sample cup'],
    detail: 'Example batch: strawberry puree, plain whipped base, chilled single-cup serving.',
    art: 'strawberry',
  },
  {
    id: 2,
    emoji: '🫐',
    name: 'Blueberry Bliss Puff',
    desc: 'A mellow blueberry sample cup with a soft whipped texture and current ingredient notes before pickup.',
    tag: 'Cool Berry',
    tagColor: 'teal',
    notes: ['Blueberry', 'Soft whip', 'Chilled storage'],
    detail: 'Example batch: blueberry puree, plain whipped base, chilled storage guidance.',
    art: 'blueberry',
  },
  {
    id: 3,
    emoji: '🥕',
    name: 'Carrot Patch Fluff',
    desc: 'A carrot-forward sample cup with a gentler profile, spoonable texture, and batch storage guidance.',
    tag: 'Veggie',
    tagColor: 'purple',
    notes: ['Carrot', 'Gentle profile', 'Storage notes'],
    detail: 'Example batch: carrot puree, plain whipped base, soft spoonable texture.',
    art: 'carrot',
  },
  {
    id: 4,
    emoji: '🍇',
    name: 'Berry Medley Mix',
    desc: 'A brighter mixed-berry sample cup when the pilot batch is leaning fruit-forward and colorful.',
    tag: 'Mixed',
    tagColor: 'pink',
    notes: ['Berry blend', 'Rotating mix', 'Pilot batch'],
    detail: 'Example batch: rotating berry puree blend with current ingredients confirmed first.',
    art: 'berry',
  },
  {
    id: 5,
    emoji: '🥒',
    name: 'Cucumber Cool Swirl',
    desc: 'A lighter cucumber sample cup for warm-weather pickup days, with serving guidance confirmed first.',
    tag: 'Fresh',
    tagColor: 'teal',
    notes: ['Cucumber', 'Light profile', 'Pickup note'],
    detail: 'Example batch: cucumber puree, plain whipped base, best served chilled.',
    art: 'cucumber',
  },
  {
    id: 6,
    emoji: '🎁',
    name: 'Sampler Pack',
    desc: 'A first-batch sampler request for families comparing cups before choosing a favorite flavor.',
    tag: 'Variety',
    tagColor: 'purple',
    notes: ['Rotating cups', 'Good intro', 'Batch date'],
    detail: 'Sampler requests depend on the next pilot batch and are quoted by email.',
    art: 'sampler',
  },
]

const tagColors = {
  pink: { bg: '#fde8f0', color: 'var(--pink)', border: 'var(--pink-light)' },
  purple: { bg: '#f0e8ff', color: 'var(--purple)', border: 'var(--purple-light)' },
  teal: { bg: '#e0f7fa', color: 'var(--teal)', border: 'var(--teal-light)' },
}

export default function Products() {
  const requestFlavor = flavorName => {
    window.dispatchEvent(new CustomEvent('puppywhippies:flavor-request', { detail: flavorName }))
    window.setTimeout(() => {
      document.getElementById('contact-name')?.focus()
    }, 120)
  }

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>🍓 Our Treats</span>
            <h2 className={styles.title}>
              <span className="bubble-pink">Flavor</span>{' '}
              <span className="bubble-purple">Lineup</span>
            </h2>
            <p className={styles.subtitle}>
              Choose a pilot sample cup. Each request starts with flavor fit, storage notes, serving guidance,
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
                  <span className={styles.cup} />
                  <span className={styles.whip} />
                  <span className={styles.fruitOne} />
                  <span className={styles.fruitTwo} />
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
                  <span className={styles.cardPrice}>Pilot sample cup</span>
                  <a
                    className={styles.addBtn}
                    href="#contact"
                    onClick={() => requestFlavor(flavor.name)}
                  >
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
