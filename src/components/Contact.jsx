import { useEffect, useRef, useState } from 'react'
import { flavors } from '../data/flavors'
import { useLanguage } from '../i18n'
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

const isAutoMessage = message => (
  !message
  || message.startsWith('I would like to request availability for ')
  || message.startsWith('Quisiera consultar disponibilidad para ')
)

export default function Contact() {
  const { c, language } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [draftAttempted, setDraftAttempted] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const statusRef = useRef(null)

  const localizedFlavorName = flavor => (language === 'es' ? flavor.nameEs || flavor.name : flavor.name)
  const flavorLabelFromValue = value => localizedFlavorName(flavors.find(flavor => flavor.name === value) || { name: value })

  const handleChange = e => {
    const { name, value } = e.target

    setForm(current => {
      if (name === 'flavor' && isAutoMessage(current.message)) {
        return { ...current, flavor: value, message: c.contact.autoMessage(flavorLabelFromValue(value)) }
      }

      return { ...current, [name]: value }
    })
  }

  useEffect(() => {
    const requestedFlavor = new URLSearchParams(window.location.search).get('flavor')
    const validFlavor = flavors.some(flavor => flavor.name === requestedFlavor) ? requestedFlavor : ''

    if (validFlavor) {
      setForm(current => ({
        ...current,
        flavor: validFlavor,
        message: isAutoMessage(current.message) ? c.contact.autoMessage(flavorLabelFromValue(validFlavor)) : current.message,
      }))
    }
  }, [c.contact])

  useEffect(() => {
    const handleFlavorRequest = e => {
      const nextFlavor = e.detail || initialForm.flavor

      setForm(current => ({
        ...current,
        flavor: nextFlavor,
        message: isAutoMessage(current.message) ? c.contact.autoMessage(flavorLabelFromValue(nextFlavor)) : current.message,
      }))
    }

    window.addEventListener('puppywhippies:flavor-request', handleFlavorRequest)
    return () => window.removeEventListener('puppywhippies:flavor-request', handleFlavorRequest)
  }, [c.contact])

  const requestBody = () => {
    const fields = c.contact.emailFields
    return (
      `${fields.name}: ${form.name}\n${fields.email}: ${form.email}\n${fields.flavor}: ${flavorLabelFromValue(form.flavor)}\n\n${fields.message}:\n${form.message}`
      + `\n\n${fields.quantity}: ${form.quantity}\n${fields.area}: ${form.area || fields.missing}`
      + `\n${fields.date}: ${form.date || fields.flexible}\n${fields.notes}: ${form.notes || fields.none}`
    )
  }

  const copyRequest = async () => {
    const text = `${c.contact.subject(form.name)}\n\n${requestBody()}`

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.top = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    setCopied(true)
  }

  const openEmailDraft = () => {
    const subject = encodeURIComponent(c.contact.subject(form.name))
    const body = encodeURIComponent(requestBody())

    window.location.href = `mailto:hello@puppywhippies.com?subject=${subject}&body=${body}`
    setDraftAttempted(true)
    setSent(false)
    setCopied(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setCopied(false)

    const payload = {
      name: form.name,
      email: form.email,
      flavor: flavorLabelFromValue(form.flavor),
      quantity: form.quantity,
      area: form.area,
      date: form.date,
      notes: form.notes,
      message: form.message,
      language,
      source: window.location.href,
    }

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Request endpoint unavailable')
      setSent(true)
      setDraftAttempted(false)
    } catch {
      openEmailDraft()
    }
  }

  useEffect(() => {
    if (draftAttempted || sent) {
      statusRef.current?.focus()
    }
  }, [draftAttempted, sent])

  useEffect(() => {
    setForm(current => {
      const defaultQuantities = ['1 cup', '1 bag', '1 bolsa']
      const next = { ...current }
      if (defaultQuantities.includes(current.quantity)) next.quantity = c.contact.placeholders[2]
      if (isAutoMessage(current.message)) next.message = c.contact.autoMessage(flavorLabelFromValue(current.flavor))
      return next
    })
  }, [c.contact, language])

  const resetForm = () => {
    setDraftAttempted(false)
    setSent(false)
    setCopied(false)
    setForm(initialForm)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>{c.contact.eyebrow}</span>
          <h2 className={styles.title}>
            <span className="bubble-pink">{c.contact.title[0]}</span>{' '}
            <span className="bubble-purple">{c.contact.title[1]}</span>{' '}
            <span className="bubble-teal">{c.contact.title[2]}</span>
          </h2>
          <p className={styles.body}>{c.contact.body}</p>

          <div className={styles.contactInfo}>
            {[
              { icon: 'LV', label: c.contact.info[0] },
              { icon: '@', label: c.contact.info[1], href: 'mailto:hello@puppywhippies.com' },
              { icon: '702', label: c.contact.info[2] },
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
            <h3 className={styles.formTitle}>{c.contact.formTitle}</h3>

            {(draftAttempted || sent) && (
              <div className={styles.success} role="status" aria-live="polite" tabIndex="-1" ref={statusRef}>
                <div className={styles.successEmoji}>PW</div>
                <h3>{sent ? c.contact.sentTitle : c.contact.successTitle}</h3>
                {sent ? (
                  <p>{c.contact.sentBody}</p>
                ) : (
                  <p>
                    {c.contact.successBody}{' '}
                    <a href="mailto:hello@puppywhippies.com">hello@puppywhippies.com</a> {c.contact.successTail}
                  </p>
                )}
                <button className={styles.resetBtn} type="button" onClick={resetForm}>
                  {c.contact.clear}
                </button>
                {!sent && (
                  <button className={styles.copyBtn} type="button" onClick={copyRequest}>
                    {copied ? c.contact.copiedDetails : c.contact.copyDetails}
                  </button>
                )}
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="contact-name">{c.contact.labels[0]}</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={c.contact.placeholders[0]}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email">{c.contact.labels[1]}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={c.contact.placeholders[1]}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-flavor">{c.contact.labels[2]}</label>
              <select
                id="contact-flavor"
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
              >
                {flavors.map(flavor => (
                  <option key={flavor.name} value={flavor.name}>{localizedFlavorName(flavor)}</option>
                ))}
                <option>{c.contact.unsure}</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-quantity">{c.contact.labels[3]}</label>
              <input
                id="contact-quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder={c.contact.placeholders[2]}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-area">{c.contact.labels[4]}</label>
              <input
                id="contact-area"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder={c.contact.placeholders[3]}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-date">{c.contact.labels[5]}</label>
              <input
                id="contact-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-notes">{c.contact.labels[6]}</label>
              <textarea
                id="contact-notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder={c.contact.placeholders[4]}
                rows={3}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">{c.contact.labels[7]}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={c.contact.placeholders[5]}
                rows={5}
                required
              />
            </div>

            <p className={styles.formNote}>
              {c.contact.note}
            </p>

            <button type="submit" className={styles.submitBtn}>
              {c.contact.submit}
            </button>
            <button type="button" className={styles.copyBtn} onClick={copyRequest}>
              {copied ? c.contact.copiedDetails : c.contact.copyDetails}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
