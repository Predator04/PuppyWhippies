import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'
import styles from './Navbar.module.css'

const navItems = [
  ['home', '/'],
  ['flavors', '/flavors/'],
  ['lasVegas', '/las-vegas-dog-treats/'],
  ['ingredients', '/ingredients/'],
  ['about', '/about/'],
]

export default function Navbar() {
  const { c, language, toggleLanguage, href } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = 'primary-navigation'
  const navRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    let lastScrolled = window.scrollY > 30
    setScrolled(lastScrolled)

    const onScroll = () => {
      const nextScrolled = window.scrollY > 30
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled
        setScrolled(nextScrolled)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    firstLinkRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = e => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key === 'Tab') {
        const focusable = navRef.current?.querySelectorAll('a[href], button:not([disabled])')
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const onPointerDown = e => {
      if (!navRef.current?.contains(e.target)) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href={href('/')} className={styles.logo}>
        <img src="/logo-web.png" alt="Puppy Whippies" className={styles.logoImg} />
        <span className={styles.logoText}>
          <span className={styles.logoPink}>Pupp</span><span className={styles.logoTeal}>y</span>{' '}
          <span className={styles.logoPurple}>Whippies</span>
        </span>
      </a>

      <button
        ref={menuButtonRef}
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? c.nav.closeMenu : c.nav.openMenu}
        aria-expanded={menuOpen}
        aria-controls={menuId}
      >
        <span /><span /><span />
      </button>

      <ul id={menuId} className={`${styles.links} ${menuOpen ? styles.open : ''}`} data-open={menuOpen}>
        {navItems.map(([key, path], index) => (
          <li key={key}>
            <a ref={index === 0 ? firstLinkRef : undefined} href={href(path)} onClick={() => setMenuOpen(false)}>
              {c.nav[key]}
            </a>
          </li>
        ))}
        <li>
          <a href={href('/request/')} className={styles.cta} onClick={() => setMenuOpen(false)}>
            {c.nav.request}
          </a>
        </li>
        <li>
          <button
            type="button"
            className={styles.langToggle}
            onClick={() => {
              toggleLanguage()
              setMenuOpen(false)
            }}
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
            aria-pressed={language === 'es'}
            lang={language === 'es' ? 'en' : 'es'}
          >
            {c.nav.switchTo}
          </button>
        </li>
      </ul>
    </nav>
  )
}
