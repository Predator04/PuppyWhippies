import { useEffect } from 'react'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const GSC_TOKEN = import.meta.env.VITE_GSC_VERIFICATION

export default function Analytics() {
  useEffect(() => {
    if (GSC_TOKEN && !document.head.querySelector('meta[name="google-site-verification"]')) {
      const meta = document.createElement('meta')
      meta.name = 'google-site-verification'
      meta.content = GSC_TOKEN
      document.head.appendChild(meta)
    }

    if (!GA_ID || document.getElementById('puppywhippies-gtag')) return

    const script = document.createElement('script')
    script.id = 'puppywhippies-gtag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }, [])

  return null
}
