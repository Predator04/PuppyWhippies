import { useEffect } from 'react'
import { useLanguage } from '../i18n'

const SITE_URL = 'https://puppywhippies.com'
const LOGO_URL = `${SITE_URL}/logo-web.png`

const setMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }

  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
}

export default function SEO({ title, description, path = '/', schema = [] }) {
  const { language } = useLanguage()

  useEffect(() => {
    const prefix = language === 'es' && window.location.pathname.startsWith('/es') ? '/es' : ''
    const canonicalUrl = `${SITE_URL}${prefix}${path === '/' ? '/' : `${path}/`}`
    const fullTitle = title.includes('Puppy Whippies') ? title : `${title} | Puppy Whippies`
    const graph = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Puppy Whippies',
        url: SITE_URL,
        logo: LOGO_URL,
        areaServed: 'Las Vegas, Nevada',
        email: 'hello@puppywhippies.com',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Puppy Whippies',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      ...schema,
    ]

    document.title = fullTitle
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: LOGO_URL })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let jsonLd = document.getElementById('seo-jsonld')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.type = 'application/ld+json'
      jsonLd.id = 'seo-jsonld'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  }, [description, language, path, schema, title])

  return null
}
