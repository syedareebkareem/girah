import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Contact() {
  const { showToastMessage } = useCart()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const faqs = [
    { q: 'How long does it take to receive my order?', a: 'In-stock items ship within 1-2 business days. Made-to-order items take 7-14 days.' },
    { q: 'Do you offer customizations?', a: 'Yes! Contact us with your specific requirements and we\'ll provide a quote.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days if items are unused. Custom items are non-refundable.' },
    { q: 'Are your products eco-friendly?', a: 'Yes! We use sustainable materials and eco-conscious packaging whenever possible.' },
  ]
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = {}
    if (form.name.trim().length < 2) e2.name = 'Required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e2.email = 'Invalid email'
    if (form.subject.trim().length < 5) e2.subject = 'Too short'
    if (form.message.trim().length < 10) e2.message = 'Too short'
    setErrors(e2)
    if (Object.keys(e2).length === 0) {
      showToastMessage('Message sent! We\'ll get back to you soon.', 'success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <div className="section" style={{ maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '42px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-light)' }}>
          Questions or special requests? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-grid">
        <div>
          <h3 className="checkout-subheading" style={{ marginTop: 0 }}>Contact Information</h3>
          <div className="contact-info-item">
            <p className="label">Email</p>
            <a href="mailto:hello@crochetshop.com">hello@crochetshop.com</a>
          </div>
          <div className="contact-info-item">
            <p className="label">Phone</p>
            <a href="tel:+923001234567">+92 300 123 4567</a>
          </div>
          <div className="contact-info-item">
            <p className="label">Hours</p>
            <p className="value">Mon–Fri: 9 AM – 6 PM<br/>Sat: 10 AM – 4 PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-card">
          <label>Name</label>
          <input value={form.name} onChange={e => update('name', e.target.value)} className={errors.name ? 'field-error' : ''} />
          {errors.name && <p className="field-error-msg">{errors.name}</p>}

          <label>Email</label>
          <input value={form.email} onChange={e => update('email', e.target.value)} className={errors.email ? 'field-error' : ''} />
          {errors.email && <p className="field-error-msg">{errors.email}</p>}

          <label>Subject</label>
          <input value={form.subject} onChange={e => update('subject', e.target.value)} className={errors.subject ? 'field-error' : ''} />
          {errors.subject && <p className="field-error-msg">{errors.subject}</p>}

          <label>Message</label>
          <textarea rows="5" value={form.message} onChange={e => update('message', e.target.value)} className={`review-textarea ${errors.message ? 'field-error' : ''}`} style={{ marginTop: '4px' }} />
          {errors.message && <p className="field-error-msg">{errors.message}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Send Message
          </button>
        </form>
      </div>

      <div className="faq-block">
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <span>{faq.q}</span>
              <span>{openFaq === idx ? '−' : '+'}</span>
            </button>
            {openFaq === idx && <p className="faq-answer">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
