import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const siteUrl = 'https://puppywhippies.com'
const imageUrl = `${siteUrl}/logo-web.png`

const pages = [
  {
    route: '',
    title: 'Puppy Whippies - Freeze-Dried Dog Treats',
    description: 'Puppy Whippies is a playful Las Vegas area pilot-batch dog treat brand with freeze-dried flavors, all-natural ingredient confirmation, and pickup or delivery fit by email.',
  },
  {
    route: 'flavors',
    title: 'Freeze-Dried Dog Treat Flavors in Las Vegas | Puppy Whippies',
    description: 'Explore Puppy Whippies freeze-dried dog treat flavors made with all-natural ingredients for Las Vegas area dog families, including strawberry, blueberry, carrot, berry, cucumber, and sampler requests.',
  },
  {
    route: 'las-vegas-dog-treats',
    title: 'Las Vegas Dog Treats | Puppy Whippies',
    description: 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats with all-natural ingredients, flavor, pickup, and delivery details confirmed by email.',
  },
  {
    route: 'ingredients',
    title: 'Dog Treat Ingredients and Serving Notes | Puppy Whippies',
    description: 'See how Puppy Whippies confirms all-natural ingredients, serving notes, and pet notes for Las Vegas area freeze-dried dog treat requests.',
  },
  {
    route: 'about',
    title: 'About Puppy Whippies',
    description: 'Meet Puppy Whippies, a Las Vegas area pilot-batch freeze-dried dog treat brand built around playful flavors, all-natural ingredients, and dog-family joy.',
  },
  {
    route: 'request',
    title: 'Request Puppy Whippies Availability',
    description: 'Request Puppy Whippies Las Vegas area freeze-dried dog treat availability and confirm flavor, all-natural ingredients, serving notes, pickup, or delivery timing by email.',
  },
]

const baseGraph = [
  {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Puppy Whippies',
    url: siteUrl,
    logo: imageUrl,
    areaServed: 'Las Vegas, Nevada',
    email: 'hello@puppywhippies.com',
  },
  {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Puppy Whippies',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
  },
]

const breadcrumb = (name, route) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name, item: `${siteUrl}/${route}/` },
  ],
})

const graphForPage = page => {
  const graph = [...baseGraph]

  if (page.route === 'flavors') {
    graph.push(
      breadcrumb('Flavors', page.route),
      {
        '@type': 'ItemList',
        name: 'Puppy Whippies Flavor Lineup',
        itemListElement: [
          'Strawberry Dream Whip',
          'Blueberry Bliss Puff',
          'Carrot Patch Fluff',
          'Berry Medley Mix',
          'Cucumber Cool Swirl',
          'Sampler Pack',
        ].map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Thing',
            name,
            image: imageUrl,
            provider: { '@id': `${siteUrl}/#organization` },
            areaServed: 'Las Vegas, Nevada',
          },
        })),
      }
    )
  } else if (page.route === 'las-vegas-dog-treats') {
    graph.push(
      breadcrumb('Las Vegas Dog Treats', page.route),
      {
        '@type': 'LocalBusiness',
        name: 'Puppy Whippies',
        url: siteUrl,
        image: imageUrl,
        email: 'hello@puppywhippies.com',
        priceRange: 'Request-based',
        areaServed: {
          '@type': 'City',
          name: 'Las Vegas',
          containedInPlace: { '@type': 'State', name: 'Nevada' },
        },
        description: 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats made with all-natural ingredients.',
      }
    )
  } else if (page.route === 'ingredients') {
    graph.push(
      breadcrumb('Ingredients', page.route),
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
      }
    )
  } else if (page.route) {
    const names = {
      about: 'About',
      request: 'Request Availability',
    }
    graph.push(breadcrumb(names[page.route] || page.title, page.route))
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

const htmlForPage = (baseHtml, page) => {
  const canonical = page.route ? `${siteUrl}/${page.route}/` : `${siteUrl}/`

  let html = baseHtml
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.description}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.description}" />`)
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)

  if (!html.includes('property="og:url"')) {
    html = html.replace(
      '<meta property="og:type" content="website" />',
      `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${canonical}" />`
    )
  }

  const jsonLd = JSON.stringify(graphForPage(page))
  html = html.replace(
    '</head>',
    `    <script id="seo-jsonld" type="application/ld+json">${jsonLd}</script>\n  </head>`
  )

  return html
}

const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

await Promise.all(
  pages.filter(page => page.route).map(async page => {
    const outDir = path.join(distDir, page.route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), htmlForPage(baseHtml, page))
  })
)

await writeFile(path.join(distDir, 'index.html'), htmlForPage(baseHtml, pages[0]))
