import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Products from './components/Products'
import SEO from './components/SEO'
import Testimonials from './components/Testimonials'
import WhyUs from './components/WhyUs'
import { useLanguage } from './i18n'
import {
  AboutPage,
  FlavorsPage,
  IngredientsPage,
  LocalDogTreatsPage,
  RequestPage,
} from './pages/SeoPages'

const routes = {
  '/flavors': <FlavorsPage />,
  '/las-vegas-dog-treats': <LocalDogTreatsPage />,
  '/ingredients': <IngredientsPage />,
  '/about': <AboutPage />,
  '/request': <RequestPage />,
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onNavigate = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onNavigate)
    window.addEventListener('puppywhippies:navigate', onNavigate)
    return () => {
      window.removeEventListener('popstate', onNavigate)
      window.removeEventListener('puppywhippies:navigate', onNavigate)
    }
  }, [])

  return path
}

function HomePage() {
  const { c } = useLanguage()

  return (
    <>
      <SEO
        title={c.pages.homeTitle}
        description={c.pages.homeDescription}
        path="/"
      />
      <main id="main" tabIndex="-1">
        <Hero />
        <Marquee />
        <Products />
        <About />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  const { c } = useLanguage()
  const rawPath = usePath()
  const languagePath = rawPath.replace(/^\/es(?=\/|$)/, '') || '/'
  const path = languagePath.length > 1 ? languagePath.replace(/\/$/, '') : languagePath
  const page = routes[path] || <HomePage />

  return (
    <>
      <a className="skip-link" href="#main">{c.pages.skipLink}</a>
      <Navbar />
      {page}
      <Footer />
    </>
  )
}
