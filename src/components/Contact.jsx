import { useEffect, useRef, useState } from 'react'
import styles from './Contact.module.css'

const initialForm = {
  name: '',
  email: '',
  flavor: 'Strawberry Dream Whip',
  quantity: '1 cup',
  area: '',
  date: '',
  notes: '',
  message: '',
}

const flavorMessage = flavor => `I would like to request availability for ${flavor}.`
const isAutoMessage = message => !message || message.startsWith('I would like to request availability for ')

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [draftAttempted, setDraftAttempted] = useState(false)
  const statusRef = useRef(null)

  const handleChange = e => {
    const { name, value } = e.target

    setForm(current => {
      if (name === 'flavor' && isAutoMessage(current.message)) {
        return { ...current, flavor: value, message: flavorMessage(value) }
      }

      return { ...current, [name]: value }
    })
  }

  useEffect(() => {
    const handleFlavorRequest = e => {
      const nextFlavor = e.detail || initialForm.flavor

      setForm(current => ({
        ...current,
        flavor: nextFlavor,
        message: isAutoMessage(current.message) ? flavorMessage(nextFlavor) : current.message,
      }))
    }

    window.addEventListener('puppywhippies:flavor-request', handleFlavorRequest)
    return () => window.removeEventListener('puppywhippies:flavor-request', handleFlavorRequest)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Puppy Whippies request from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nFlavor: ${form.flavor}\n\nMessage:\n${form.message}`
      + `\n\nQuantity: ${form.quantity}\nPickup/delivery area: ${form.area || 'Not provided'}`
      + `\nDesired date: ${form.date || 'Flexible'}\nPet notes: ${form.notes || 'None provided'}`
    )

    window.location.href = `mailto:hello@puppywhippies.com?subject=${subject}&body=${body}`
    setDraftAttempted(true)
  }

  useEffect(() => {
    if (draftAttempted) {
      statusRef.current?.focus()
    }
  }, [draftAttempted])

  const resetForm = () => {
    setDraftAttempted(false)
    setForm(initialForm)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>📬 Get in Touch</span>
          <h2 className={styles.title}>
            <span className="bubble-pink">Request</span>{' '}
            <span className="bubble-purple">a</span>{' '}
            <span className="bubble-teal">Flavor</span>
          </h2>
          <p className={styles.body}>
            Request a pilot sample cup for your pup in the Las Vegas area. Add your neighborhood so we can confirm
            whether pickup or delivery is in range. No payment is collected here.
          </p>

          <div className={styles.contactInfo}>
            {[
              { icon: '🌐', label: 'Las Vegas area pilot batches by request' },
              { icon: '📧', label: 'hello@puppywhippies.com', href: 'mailto:hello@puppywhippies.com' },
              { icon: '📍', label: 'Pickup or delivery fit confirmed around Las Vegas' },
            ].map(c => (
              <div key={c.label} className={styles.contactItem}>
                <span className={styles.contactIcon}>{c.icon}</span>
                {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Request Availability 🍓</h3>

            {draftAttempted && (
              <div className={styles.success} role="status" aria-live="polite" tabIndex="-1" ref={statusRef}>
                <div className={styles.successEmoji}>🐾</div>
                <h3>Email draft opened?</h3>
                <p>
                  Please send the draft from your mail app. If it did not open, email{' '}
                  <a href="mailto:hello@puppywhippies.com">hello@puppywhippies.com</a> and include the details below.
                </p>
                <button className={styles.resetBtn} type="button" onClick={resetForm}>
                  Clear Form
                </button>
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane & Biscuit"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-flavor">Flavor Interest</label>
              <select
                id="contact-flavor"
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
              >
                <option>Strawberry Dream Whip</option>
                <option>Blueberry Bliss Puff</option>
                <option>Carrot Patch Fluff</option>
                <option>Berry Medley Mix</option>
                <option>Cucumber Cool Swirl</option>
                <option>Sampler Pack</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-quantity">Quantity Interest</label>
              <input
                id="contact-quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="1 cup"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-area">Your Las Vegas Neighborhood</label>
              <input
                id="contact-area"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Summerlin, Henderson, Downtown, etc."
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-date">Desired Date</label>
              <input
                id="contact-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-notes">Pet Notes</label>
              <textarea
                id="contact-notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Allergies, size, preferences, or anything we should know"
                rows={3}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Message or Request</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="I would like to request availability for a pilot batch..."
                rows={5}
                required
              />
            </div>

            <p className={styles.formNote}>
              This starts an email request only. We confirm ingredients, serving notes, Las Vegas area fit, and timing before
              any pickup, delivery, or payment. Your details are only used to reply about Puppy Whippies availability.
            </p>

            <button type="submit" className={styles.submitBtn}>
              Start Email Request 🐾
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
