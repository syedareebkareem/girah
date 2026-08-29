import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '../context/CartContext'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { showToastMessage } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    reset()
    showToastMessage('Message sent! We will get back to you soon.', 'success')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D', textAlign: 'center' }}>
            Get in Touch
          </h1>

          <p style={{ fontSize: '18px', color: '#999999', textAlign: 'center', marginBottom: '64px' }}>
            Have questions or special requests? We'd love to hear from you.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '64px' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Email
                  </h3>
                  <a href="mailto:hello@crochetshop.com" style={{ fontSize: '16px', color: '#B8C5B5', textDecoration: 'none' }}>
                    hello@crochetshop.com
                  </a>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Phone
                  </h3>
                  <a href="tel:+923001234567" style={{ fontSize: '16px', color: '#B8C5B5', textDecoration: 'none' }}>
                    +92 300 123 4567
                  </a>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Address
                  </h3>
                  <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.6' }}>
                    123 Craft Street<br />
                    Karachi, Sindh<br />
                    Pakistan
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Hours
                  </h3>
                  <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.6' }}>
                    Monday - Friday: 9 AM - 6 PM<br />
                    Saturday: 10 AM - 4 PM<br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Follow Us
                  </h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>f</a>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>ig</a>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>π</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.name ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.name && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.email ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.email && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    placeholder="How can we help?"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.subject ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.subject && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us more..."
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.message ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                  {errors.message && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: '#B8C5B5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Send Message
                </button>

                {submitted && (
                  <p style={{ marginTop: '16px', fontSize: '14px', color: '#27AE60', textAlign: 'center' }}>
                    ✓ Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ backgroundColor: '#F8F8F7', padding: '48px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                {
                  q: 'How long does it take to receive my order?',
                  a: 'In-stock items ship within 1-2 business days. Made-to-order items take 7-14 days. International shipping may take 2-3 weeks.',
                },
                {
                  q: 'Do you offer customizations?',
                  a: 'Yes! We offer custom orders for most items. Contact us with your specific requirements and we\'ll provide a quote.',
                },
                {
                  q: 'What is your return policy?',
                  a: 'We accept returns within 30 days of purchase if items are unused and in original condition. Custom items are non-refundable.',
                },
                {
                  q: 'Are your products eco-friendly?',
                  a: 'Yes! We use sustainable materials and eco-conscious packaging practices whenever possible.',
                },
              ].map((faq, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #D9D9D9', paddingBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
