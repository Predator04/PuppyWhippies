import About from '../components/About'
import Contact from '../components/Contact'
import Products from '../components/Products'
import SEO from '../components/SEO'
import { flavors } from '../data/flavors'
import styles from './Pages.module.css'

const SITE_URL = 'https://puppywhippies.com'

const breadcrumbSchema = items => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path === '/' ? '/' : `${item.path}/`}`,
  })),
})

function Breadcrumbs({ current }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <a href="/">Home</a> {'>'} <span>{current}</span>
    </nav>
  )
}

function PageHero({ eyebrow, title, lede, children }) {
  return (
    <header className={styles.hero}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
      {children}
    </header>
  )
}

export function FlavorsPage() {
  const path = '/flavors'
  const schema = [
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Flavors', path }]),
    {
      '@type': 'ItemList',
      name: 'Puppy Whippies Flavor Lineup',
      itemListElement: flavors.map((flavor, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: flavor.name,
          description: flavor.desc,
          image: `${SITE_URL}/logo-web.png`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'Las Vegas, Nevada',
        },
      })),
    },
  ]

  return (
    <>
      <SEO
        title="Freeze-Dried Dog Treat Flavors in Las Vegas"
        description="Explore Puppy Whippies freeze-dried dog treat flavors made with all-natural ingredients for Las Vegas area dog families, including strawberry, blueberry, carrot, berry, cucumber, and sampler requests."
        path={path}
        schema={schema}
      />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current="Flavors" />
        <PageHero
          eyebrow="Flavor lineup"
          title="Freeze-Dried Dog Treat Flavors"
          lede="Puppy Whippies flavors are requested as Las Vegas area freeze-dried pilot batches. Each batch starts with all-natural ingredient confirmation, serving guidance, and pickup or delivery fit."
        />
        <Products />
      </main>
    </>
  )
}

export function LocalDogTreatsPage() {
  const path = '/las-vegas-dog-treats'
  const schema = [
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Las Vegas Dog Treats', path }]),
    {
      '@type': 'LocalBusiness',
      name: 'Puppy Whippies',
      url: SITE_URL,
      image: `${SITE_URL}/logo-web.png`,
      priceRange: 'Request-based',
      email: 'hello@puppywhippies.com',
      areaServed: {
        '@type': 'City',
        name: 'Las Vegas',
        containedInPlace: { '@type': 'State', name: 'Nevada' },
      },
      description: 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats made with all-natural ingredients.',
    },
  ]

  return (
    <>
      <SEO
        title="Las Vegas Dog Treats"
        description="Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats with all-natural ingredients, flavor, pickup, and delivery details confirmed by email."
        path={path}
        schema={schema}
      />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current="Las Vegas Dog Treats" />
        <PageHero
          eyebrow="Local pilot requests"
          title="Las Vegas Dog Treats"
          lede="Puppy Whippies is built for Las Vegas area dog families who want playful, small-batch freeze-dried treats with all-natural ingredients and serving notes confirmed before pickup or delivery."
        >
          <div className={styles.ctaRow}>
            <a className={styles.cta} href="/request/">Request Availability</a>
            <a className={styles.secondary} href="/flavors/">See Flavors</a>
          </div>
        </PageHero>
        <section className={`${styles.section} ${styles.band}`}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Small-batch requests</h3>
              <p>Each request starts as a pilot batch conversation, so the current flavor, treat count, and batch timing are clear before anything moves forward.</p>
            </article>
            <article className={styles.card}>
              <h3>Las Vegas area fit</h3>
              <p>Share your neighborhood, such as Summerlin, Henderson, Downtown, or nearby areas, and we will confirm whether pickup or delivery makes sense.</p>
            </article>
            <article className={styles.card}>
              <h3>No mystery treats</h3>
              <p>All-natural ingredients, serving size, and pet notes are confirmed by email before pickup, delivery, or payment.</p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Who Puppy Whippies is for</h2>
          <ul className={styles.list}>
            <li>Dog families in the Las Vegas area who want freeze-dried samples before choosing favorites.</li>
            <li>People who want all-natural ingredient notes before serving a new treat.</li>
            <li>Families planning a small pup celebration, birthday, or weekend treat pickup.</li>
          </ul>
        </section>
      </main>
    </>
  )
}

export function IngredientsPage() {
  const path = '/ingredients'
  const schema = [
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Ingredients', path }]),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are Puppy Whippies ingredients confirmed before pickup or delivery?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Current all-natural batch ingredients and serving guidance are confirmed by email before pickup, delivery, or payment.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are Puppy Whippies veterinary products?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Puppy Whippies are treat requests, not veterinary products. Pet families should supervise serving and share allergy or dietary notes before requesting a batch.',
          },
        },
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Dog Treat Ingredients and Serving Notes"
        description="See how Puppy Whippies confirms all-natural ingredients, serving notes, and pet notes for Las Vegas area freeze-dried dog treat requests."
        path={path}
        schema={schema}
      />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current="Ingredients" />
        <PageHero
          eyebrow="Ingredient clarity"
          title="Ingredients Before Pickup"
          lede="Puppy Whippies keeps the ingredient conversation clear. Every Las Vegas area freeze-dried treat request includes current all-natural batch notes before pickup, delivery, or payment."
        />
        <section className={styles.section}>
          <div className={styles.twoCol}>
            <article className={styles.card}>
              <h2>What gets confirmed</h2>
              <ul className={styles.list}>
                <li>Current all-natural fruit, veggie, or flavor ingredients used in the pilot batch.</li>
                <li>Freeze-dried texture, serving notes, and batch guidance.</li>
                <li>Any pet allergy, size, or preference notes you share.</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h2>Serving note</h2>
              <p>Puppy Whippies are freeze-dried treats, not veterinary products. Supervise pets while serving and check with your veterinarian if your pup has special dietary needs.</p>
              <div className={styles.ctaRow}>
                <a className={styles.cta} href="/request/">Ask About a Batch</a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}

export function AboutPage() {
  const path = '/about'
  const schema = [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path }])]

  return (
    <>
      <SEO
        title="About Puppy Whippies"
        description="Meet Puppy Whippies, a Las Vegas area pilot-batch freeze-dried dog treat brand built around playful flavors, all-natural ingredients, and dog-family joy."
        path={path}
        schema={schema}
      />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current="About" />
        <PageHero
          eyebrow="Our story"
          title="A Las Vegas Area Freeze-Dried Treat Brand"
          lede="Puppy Whippies is a playful pilot-batch project for dog-loving families who want joyful freeze-dried treats with clear all-natural ingredient notes."
        />
        <About />
      </main>
    </>
  )
}

export function RequestPage() {
  const path = '/request'
  const schema = [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Request Availability', path }])]

  return (
    <>
      <SEO
        title="Request Puppy Whippies Availability"
        description="Request Puppy Whippies Las Vegas area freeze-dried dog treat availability and confirm flavor, all-natural ingredients, serving notes, pickup, or delivery timing by email."
        path={path}
        schema={schema}
      />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current="Request Availability" />
        <PageHero
          eyebrow="Freeze-dried treat requests"
          title="Request Availability"
          lede="Start a Las Vegas area pilot request. No payment is collected on this site; we confirm batch details by email first."
        />
        <Contact />
      </main>
    </>
  )
}
