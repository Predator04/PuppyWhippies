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
  return (
    <>
      <SEO
        title="Puppy Whippies - Small-Batch Dog Treat Cups"
        description="Puppy Whippies is a playful Las Vegas area pilot-batch dog treat brand with glossy whipped sample cups, flavor requests, ingredient confirmation, and pickup or delivery fit by email."
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
  const rawPath = usePath()
  const path = rawPath.length > 1 ? rawPath.replace(/\/$/, '') : rawPath
  const page = routes[path] || <HomePage />

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      {page}
      <Footer />
    </>
  )
}
