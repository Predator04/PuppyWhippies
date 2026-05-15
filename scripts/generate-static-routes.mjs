import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const siteUrl = 'https://puppywhippies.com'
const imageUrl = `${siteUrl}/logo-web.png`
const gscVerification = process.env.VITE_GSC_VERIFICATION

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
  {
    route: 'privacy',
    title: 'Privacy Policy | Puppy Whippies',
    description: 'Read how Puppy Whippies uses email request details for Las Vegas area freeze-dried dog treat availability, ingredient confirmation, and pickup or delivery replies.',
  },
]

const spanishPages = [
  {
    route: 'es',
    canonical: `${siteUrl}/es/`,
    title: 'Puppy Whippies - Premios liofilizados para perros',
    description: 'Puppy Whippies es una marca de lotes piloto en Las Vegas con sabores liofilizados, ingredientes totalmente naturales confirmados y opciones de pickup o entrega por correo electrónico.',
    locale: 'es_US',
  },
  {
    route: 'es/flavors',
    canonical: `${siteUrl}/es/flavors/`,
    title: 'Sabores liofilizados para perros en Las Vegas | Puppy Whippies',
    description: 'Explora los sabores liofilizados de Puppy Whippies, hechos con ingredientes totalmente naturales para familias con perros en el área de Las Vegas.',
    locale: 'es_US',
  },
  {
    route: 'es/las-vegas-dog-treats',
    canonical: `${siteUrl}/es/las-vegas-dog-treats/`,
    title: 'Premios para perros en Las Vegas | Puppy Whippies',
    description: 'Puppy Whippies ofrece solicitudes piloto en Las Vegas para premios liofilizados en lotes pequeños con ingredientes totalmente naturales y detalles confirmados por correo electrónico.',
    locale: 'es_US',
  },
  {
    route: 'es/ingredients',
    canonical: `${siteUrl}/es/ingredients/`,
    title: 'Ingredientes y recomendaciones de porción | Puppy Whippies',
    description: 'Mira cómo Puppy Whippies confirma ingredientes totalmente naturales, porción sugerida y notas sobre tu mascota para solicitudes de premios liofilizados en Las Vegas.',
    locale: 'es_US',
  },
  {
    route: 'es/about',
    canonical: `${siteUrl}/es/about/`,
    title: 'Acerca de Puppy Whippies',
    description: 'Conoce Puppy Whippies, una marca de premios liofilizados en lotes piloto en Las Vegas, creada con sabores divertidos e ingredientes totalmente naturales.',
    locale: 'es_US',
  },
  {
    route: 'es/request',
    canonical: `${siteUrl}/es/request/`,
    title: 'Consultar disponibilidad de Puppy Whippies',
    description: 'Solicita disponibilidad de premios liofilizados Puppy Whippies en Las Vegas y confirma sabor, ingredientes totalmente naturales, porción sugerida, pickup o entrega por correo electrónico.',
    locale: 'es_US',
  },
  {
    route: 'es/privacy',
    canonical: `${siteUrl}/es/privacy/`,
    title: 'Política de privacidad | Puppy Whippies',
    description: 'Lee cómo Puppy Whippies usa los detalles de solicitudes por correo para responder sobre disponibilidad, ingredientes y pickup o entrega en Las Vegas.',
    locale: 'es_US',
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

const breadcrumb = (name, route, isSpanish = false) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: isSpanish ? 'Inicio' : 'Home', item: `${siteUrl}${isSpanish ? '/es/' : '/'}` },
    { '@type': 'ListItem', position: 2, name, item: `${siteUrl}/${route}/` },
  ],
})

const graphForPage = page => {
  const graph = [...baseGraph]
  const routeKey = page.route?.replace(/^es\/?/, '') || ''
  const isSpanish = page.locale === 'es_US'

  if (routeKey === 'flavors') {
    graph.push(
      breadcrumb(isSpanish ? 'Sabores' : 'Flavors', page.route, isSpanish),
      {
        '@type': 'ItemList',
        name: isSpanish ? 'Línea de sabores Puppy Whippies' : 'Puppy Whippies Flavor Lineup',
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
            name: isSpanish ? ['Sueño de Fresa', 'Delicia de Arándano', 'Zanahoria Suavecita', 'Mezcla de Frutos Rojos', 'Pepino Fresco', 'Paquete de Prueba'][index] : name,
            image: imageUrl,
            provider: { '@id': `${siteUrl}/#organization` },
            areaServed: 'Las Vegas, Nevada',
          },
        })),
      }
    )
  } else if (routeKey === 'las-vegas-dog-treats') {
    graph.push(
      breadcrumb(isSpanish ? 'Premios para perros en Las Vegas' : 'Las Vegas Dog Treats', page.route, isSpanish),
      {
        '@type': 'LocalBusiness',
        name: 'Puppy Whippies',
        url: siteUrl,
        image: imageUrl,
        email: 'hello@puppywhippies.com',
        priceRange: isSpanish ? 'Por solicitud' : 'Request-based',
        areaServed: {
          '@type': 'City',
          name: 'Las Vegas',
          containedInPlace: { '@type': 'State', name: 'Nevada' },
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          description: isSpanish ? 'Solicitudes piloto solo por correo; no hay tienda abierta al publico ni horario para visitas sin cita.' : 'Pilot requests by email only; no public storefront or walk-in hours.',
        },
        description: isSpanish ? 'Puppy Whippies ofrece solicitudes piloto en el área de Las Vegas para premios liofilizados en lotes pequeños hechos con ingredientes totalmente naturales.' : 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats made with all-natural ingredients.',
      }
    )
  } else if (routeKey === 'ingredients') {
    graph.push(
      breadcrumb(isSpanish ? 'Ingredientes' : 'Ingredients', page.route, isSpanish),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isSpanish ? '¿Se confirman los ingredientes de Puppy Whippies antes del pickup o la entrega?' : 'Are Puppy Whippies ingredients confirmed before pickup or delivery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSpanish ? 'Sí. Los ingredientes totalmente naturales del lote actual y las recomendaciones de porción se confirman por correo electrónico antes del pickup, la entrega o el pago.' : 'Yes. Current all-natural batch ingredients and serving guidance are confirmed by email before pickup, delivery, or payment.',
            },
          },
          {
            '@type': 'Question',
            name: isSpanish ? '¿Puppy Whippies son productos veterinarios?' : 'Are Puppy Whippies veterinary products?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSpanish ? 'No. Puppy Whippies son premios para perros, no productos veterinarios. Las familias deben supervisar al servirlos y compartir alergias o necesidades alimentarias antes de pedir un lote.' : 'No. Puppy Whippies are treat requests, not veterinary products. Pet families should supervise serving and share allergy or dietary notes before requesting a batch.',
            },
          },
        ],
      }
    )
  } else if (page.route) {
    const names = {
      about: 'About',
      request: 'Request Availability',
      privacy: 'Privacy Policy',
      'es/about': 'Acerca de Puppy Whippies',
      'es/request': 'Consultar disponibilidad',
      'es/privacy': 'Política de privacidad',
      es: 'Inicio',
    }
    graph.push(breadcrumb(names[page.route] || page.title, page.route, isSpanish))
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const fallbackContent = page => {
  const isSpanish = page.locale === 'es_US'
  const routeKey = page.route?.replace(/^es\/?/, '') || ''
  const blocks = {
    '': isSpanish
      ? ['Premios para perros liofilizados en lotes pequeños, hechos con ingredientes totalmente naturales.', 'Elige un sabor piloto en el área de Las Vegas y confirmaremos ingredientes, porción sugerida, pickup o entrega y fecha del próximo lote.']
      : ['Small-batch freeze-dried dog treats made with all-natural ingredients.', 'Pick a pilot flavor in the Las Vegas area, and we will confirm ingredients, serving notes, pickup or delivery fit, and next batch timing.'],
    flavors: isSpanish
      ? ['Sabores liofilizados para perros', 'Strawberry Dream Whip, Blueberry Bliss Puff, Carrot Patch Fluff, Berry Medley Mix, Cucumber Cool Swirl y Sampler Pack están disponibles por solicitud piloto en Las Vegas.']
      : ['Freeze-Dried Dog Treat Flavors', 'Strawberry Dream Whip, Blueberry Bliss Puff, Carrot Patch Fluff, Berry Medley Mix, Cucumber Cool Swirl, and Sampler Pack are available as Las Vegas pilot requests.'],
    'las-vegas-dog-treats': isSpanish
      ? ['Premios para perros en Las Vegas', 'Puppy Whippies atiende solicitudes piloto en Summerlin, Henderson, Downtown, North Las Vegas y vecindarios cercanos. Confirmamos ingredientes totalmente naturales, porción sugerida y pickup o entrega antes del pago.']
      : ['Las Vegas Dog Treats', 'Puppy Whippies serves pilot requests around Summerlin, Henderson, Downtown, North Las Vegas, and nearby neighborhoods. We confirm all-natural ingredients, serving guidance, and pickup or delivery fit before payment.'],
    ingredients: isSpanish
      ? ['Ingredientes antes de recoger', 'Cada solicitud incluye confirmación de ingredientes totalmente naturales, textura liofilizada, recomendación de porción y notas de alergias o preferencias de tu mascota.']
      : ['Ingredients Before Pickup', 'Every request includes confirmation of all-natural ingredients, freeze-dried texture, serving guidance, and allergy or preference notes for your pup.'],
    about: isSpanish
      ? ['Una marca de premios liofilizados en Las Vegas', 'Puppy Whippies es un proyecto piloto para familias con perros que quieren premios alegres con notas claras de ingredientes totalmente naturales.']
      : ['A Las Vegas Area Freeze-Dried Treat Brand', 'Puppy Whippies is a playful pilot-batch project for dog-loving families who want joyful freeze-dried treats with clear all-natural ingredient notes.'],
    request: isSpanish
      ? ['Consultar disponibilidad', 'Inicia una solicitud piloto por correo o formulario. Confirmamos sabor, ingredientes, porción sugerida, disponibilidad en Las Vegas y si el lote actual es muestra o pickup con precio.']
      : ['Request Availability', 'Start a pilot request by form or email. We confirm flavor, ingredients, serving notes, Las Vegas availability, and whether the current batch is a sample or priced pickup.'],
    privacy: isSpanish
      ? ['Política de privacidad', 'Usamos los detalles de solicitud solo para responder sobre disponibilidad, ingredientes, porción sugerida y opciones de pickup o entrega en Las Vegas.']
      : ['Privacy Policy', 'We use request details only to reply about availability, ingredients, serving notes, and Las Vegas area pickup or delivery fit.'],
  }
  const [heading, body] = blocks[routeKey] || blocks['']

  return `<main class="static-fallback" aria-label="${escapeHtml(heading)}"><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(page.description)}</p><p>${escapeHtml(body)}</p><p>${isSpanish ? 'Contacto' : 'Contact'}: hello@puppywhippies.com</p></main>`
}

const htmlForPage = (baseHtml, page) => {
  const canonical = page.canonical || (page.route ? `${siteUrl}/${page.route}/` : `${siteUrl}/`)
  const locale = page.locale || 'en_US'
  const alternateLocale = locale === 'es_US' ? 'en_US' : 'es_US'
  const alternateHref = locale === 'es_US'
    ? canonical.replace(`${siteUrl}/es`, siteUrl)
    : canonical.replace(siteUrl, `${siteUrl}/es`).replace('/es//', '/es/')

  let html = baseHtml
  html = html.replace('<html lang="en">', `<html lang="${locale === 'es_US' ? 'es' : 'en'}">`)
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.description}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.description}" />`)
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)

  if (gscVerification && !html.includes('google-site-verification')) {
    html = html.replace('</head>', `    <meta name="google-site-verification" content="${escapeHtml(gscVerification)}" />\n  </head>`)
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackContent(page)}</div>`)

  if (!html.includes('property="og:url"')) {
    html = html.replace(
      '<meta property="og:type" content="website" />',
      `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${canonical}" />`
    )
  }
  html = html.replace(
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />\n    <meta property="og:locale" content="${locale}" />\n    <meta property="og:locale:alternate" content="${alternateLocale}" />`
  )
  html = html.replace(
    '</head>',
    `    <link rel="alternate" hreflang="${locale === 'es_US' ? 'es-US' : 'en-US'}" href="${canonical}" />\n    <link rel="alternate" hreflang="${locale === 'es_US' ? 'en-US' : 'es-US'}" href="${alternateHref}" />\n    <link rel="alternate" hreflang="x-default" href="${locale === 'es_US' ? alternateHref : canonical}" />\n  </head>`
  )

  const jsonLd = JSON.stringify(graphForPage(page))
  html = html.replace(
    '</head>',
    `    <script id="seo-jsonld" type="application/ld+json">${jsonLd}</script>\n  </head>`
  )

  return html
}

const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

await Promise.all(
  [...pages.filter(page => page.route), ...spanishPages].map(async page => {
    const outDir = path.join(distDir, page.route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), htmlForPage(baseHtml, page))
  })
)

await writeFile(path.join(distDir, 'index.html'), htmlForPage(baseHtml, pages[0]))
