import { useInView } from '../hooks/useInView'
import styles from './Reveal.module.css'

/**
 * Wraps children and animates them in when they enter the viewport.
 * @param {string} variant - 'up' | 'left' | 'right' | 'scale'
 * @param {number} delay - CSS animation-delay in ms
 */
export default function Reveal({ children, variant = 'up', delay = 0, className = '' }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${styles[variant]} ${inView ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
