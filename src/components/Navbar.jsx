import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
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
        const focusable = navRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        )
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
      if (!navRef.current?.contains(e.target)) {
        setMenuOpen(false)
      }
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
      <a href="#home" className={styles.logo}>
        <img src="/logo-transparent.png" alt="Puppy Whippies" className={styles.logoImg} />
        <span className={styles.logoText}>
          <span className={styles.logoPink}>Pupp</span><span className={styles.logoTeal}>y</span>{' '}
          <span className={styles.logoPurple}>Whippies</span>
        </span>
      </a>

      <button
        ref={menuButtonRef}
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls={menuId}
      >
        <span /><span /><span />
      </button>

      <ul id={menuId} className={`${styles.links} ${menuOpen ? styles.open : ''}`} data-open={menuOpen}>
        {['Home','Flavors','About','Why Us','Contact'].map((item, index) => (
          <li key={item}>
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              href={`#${item === 'Flavors' ? 'products' : item.toLowerCase().replace(' ','-')}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className={styles.cta} onClick={() => setMenuOpen(false)}>
            Request Availability 🐾
          </a>
        </li>
      </ul>
    </nav>
  )
}
