import About from '../components/About'
import Contact from '../components/Contact'
import Products from '../components/Products'
import SEO from '../components/SEO'
import { flavors } from '../data/flavors'
import { useLanguage } from '../i18n'
import styles from './Pages.module.css'

const SITE_URL = 'https://puppywhippies.com'

const breadcrumbSchema = (items, language = 'en') => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${language === 'es' ? '/es' : ''}${item.path === '/' ? '/' : `${item.path}/`}`,
  })),
})

function Breadcrumbs({ current }) {
  const { c, href } = useLanguage()

  return (
    <nav className={styles.breadcrumbs} aria-label={c.pages.breadcrumbLabel}>
      <a href={href('/')}>{c.pages.breadcrumbsHome}</a> {'>'} <span>{current}</span>
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
  const { c, language } = useLanguage()
  const path = '/flavors'
  const schema = [
    breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.nav.flavors, path }], language),
    {
      '@type': 'ItemList',
      name: c.pages.flavorLineupSchema,
      itemListElement: flavors.map((flavor, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: language === 'es' ? flavor.nameEs : flavor.name,
          description: language === 'es' ? flavor.descEs : flavor.desc,
          image: `${SITE_URL}/logo-web.png`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: 'Las Vegas, Nevada',
        },
      })),
    },
  ]

  return (
    <>
      <SEO title={c.pages.flavorsTitle} description={c.pages.flavorsDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.nav.flavors} />
        <PageHero eyebrow={c.pages.flavorsEyebrow} title={c.pages.flavorsH1} lede={c.pages.flavorsLede} />
        <Products />
      </main>
    </>
  )
}

export function LocalDogTreatsPage() {
  const { c, href, language } = useLanguage()
  const path = '/las-vegas-dog-treats'
  const schema = [
    breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.pages.localTitle, path }], language),
    {
      '@type': 'LocalBusiness',
      name: 'Puppy Whippies',
      url: SITE_URL,
      image: `${SITE_URL}/logo-web.png`,
      priceRange: c.pages.requestBased,
      email: 'hello@puppywhippies.com',
      areaServed: {
        '@type': 'City',
        name: 'Las Vegas',
        containedInPlace: { '@type': 'State', name: 'Nevada' },
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        description: c.pages.requestOnlyHours,
      },
      description: c.pages.localBusinessDescription,
    },
  ]

  return (
    <>
      <SEO title={c.pages.localTitle} description={c.pages.localDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.pages.localTitle} />
        <PageHero eyebrow={c.pages.localEyebrow} title={c.pages.localTitle} lede={c.pages.localLede}>
          <div className={styles.ctaRow}>
            <a className={styles.cta} href={href('/request/')}>{c.pages.requestAvailability}</a>
            <a className={styles.secondary} href={href('/flavors/')}>{c.pages.seeFlavors}</a>
          </div>
        </PageHero>
        <section className={`${styles.section} ${styles.band}`}>
          <div className={styles.grid}>
            {c.pages.localCards.map(([title, body]) => (
              <article className={styles.card} key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.twoCol}>
            <article className={styles.card}>
              <h2>{c.pages.localProcessTitle}</h2>
              <ul className={styles.list}>
                {c.pages.localProcessItems.map(item => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className={styles.card}>
              <h2>{c.pages.localTrustTitle}</h2>
              <p>{c.pages.localTrustText}</p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <h2>{c.pages.whoTitle}</h2>
          <ul className={styles.list}>
            {c.pages.whoItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </main>
    </>
  )
}

export function IngredientsPage() {
  const { c, href, language } = useLanguage()
  const path = '/ingredients'
  const schema = [
    breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.nav.ingredients, path }], language),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: c.pages.faqIngredientQuestion,
          acceptedAnswer: { '@type': 'Answer', text: c.pages.faqIngredientAnswer },
        },
        {
          '@type': 'Question',
          name: c.pages.faqVetQuestion,
          acceptedAnswer: { '@type': 'Answer', text: c.pages.faqVetAnswer },
        },
      ],
    },
  ]

  return (
    <>
      <SEO title={c.pages.ingredientsTitle} description={c.pages.ingredientsDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.nav.ingredients} />
        <PageHero eyebrow={c.pages.ingredientsEyebrow} title={c.pages.ingredientsH1} lede={c.pages.ingredientsLede} />
        <section className={styles.section}>
          <div className={styles.twoCol}>
            <article className={styles.card}>
              <h2>{c.pages.confirmedTitle}</h2>
              <ul className={styles.list}>
                {c.pages.confirmedItems.map(item => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className={styles.card}>
              <h2>{c.pages.servingTitle}</h2>
              <p>{c.pages.servingText}</p>
              <div className={styles.ctaRow}>
                <a className={styles.cta} href={href('/request/')}>{c.pages.askBatch}</a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}

export function AboutPage() {
  const { c, language } = useLanguage()
  const path = '/about'
  const schema = [breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.nav.about, path }], language)]

  return (
    <>
      <SEO title={c.pages.aboutTitle} description={c.pages.aboutDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.nav.about} />
        <PageHero eyebrow={c.pages.aboutEyebrow} title={c.pages.aboutH1} lede={c.pages.aboutLede} />
        <About />
      </main>
    </>
  )
}

export function RequestPage() {
  const { c, language } = useLanguage()
  const path = '/request'
  const schema = [breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.pages.requestAvailability, path }], language)]

  return (
    <>
      <SEO title={c.pages.requestTitle} description={c.pages.requestDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.pages.requestAvailability} />
        <PageHero eyebrow={c.pages.requestEyebrow} title={c.pages.requestAvailability} lede={c.pages.requestLede} />
        <Contact />
      </main>
    </>
  )
}

export function PrivacyPage() {
  const { c, language } = useLanguage()
  const path = '/privacy'
  const schema = [breadcrumbSchema([{ name: c.pages.breadcrumbsHome, path: '/' }, { name: c.pages.privacyTitle, path }], language)]

  return (
    <>
      <SEO title={c.pages.privacyTitle} description={c.pages.privacyDescription} path={path} schema={schema} />
      <main id="main" tabIndex="-1" className={styles.page}>
        <Breadcrumbs current={c.pages.privacyTitle} />
        <PageHero eyebrow={c.pages.privacyEyebrow} title={c.pages.privacyH1} lede={c.pages.privacyLede} />
        <section className={styles.section}>
          <div className={styles.grid}>
            {c.pages.privacySections.map(([title, body]) => (
              <article className={styles.card} key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
