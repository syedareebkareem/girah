import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { cartItems, getTotalPrice } = useCart()
  const { createOrder } = useOrder()
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zipCode: '', country: 'Pakistan',
    shippingMethod: 'standard',
    cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '',
  })

  const shippingCost = form.shippingMethod === 'express' ? 15 : form.shippingMethod === 'overnight' ? 30 : 0
  const tax = parseFloat((getTotalPrice() * 0.1).toFixed(2))
  const total = getTotalPrice() + shippingCost + tax

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const validateStep1 = () => {
    const e = {}
    if (form.firstName.trim().length < 2) e.firstName = 'Required'
    if (form.lastName.trim().length < 2) e.lastName = 'Required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email'
    if (form.phone.trim().length < 10) e.phone = 'Invalid phone'
    if (form.address.trim().length < 5) e.address = 'Required'
    if (form.city.trim().length < 2) e.city = 'Required'
    if (form.state.trim().length < 2) e.state = 'Required'
    if (form.zipCode.trim().length < 4) e.zipCode = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (form.cardName.trim().length < 3) e.cardName = 'Required'
    if (!/^\d{16}$/.test(form.cardNumber)) e.cardNumber = 'Must be 16 digits'
    if (!form.expiryMonth) e.expiryMonth = 'Required'
    if (!form.expiryYear) e.expiryYear = 'Required'
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3-4 digits'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinue = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
    else if (step === 3) {
      const order = createOrder({
        items: cartItems,
        subtotal: getTotalPrice(),
        shipping: shippingCost,
        tax,
        total,
        shippingInfo: form,
      })
      navigate(`/order-confirmation/${order.id}`)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="not-found-block">
        <h1 style={{ fontFamily: "'Fraunces', serif", color: 'var(--ink)' }}>Your cart is empty</h1>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">Continue Shopping</button>
      </div>
    )
  }

  return (
    <div className="section" style={{ paddingTop: '40px' }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 600, color: 'var(--ink)', marginBottom: '36px' }}>
        Checkout
      </h1>

      <div className="checkout-steps">
        {STEPS.map((label, idx) => (
          <div key={label} className="checkout-step">
            <div className={`checkout-step-circle ${idx + 1 <= step ? 'active' : ''}`}>{idx + 1}</div>
            <span className={idx + 1 <= step ? 'active-label' : ''}>{label}</span>
            {idx < STEPS.length - 1 && <span className="checkout-step-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="checkout-grid">
        <div className="checkout-form-card">
          {step === 1 && (
            <div>
              <h2 className="checkout-section-title">Shipping Information</h2>
              <div className="form-row-2">
                <div>
                  <label>First Name</label>
                  <input value={form.firstName} onChange={e => update('firstName', e.target.value)} className={errors.firstName ? 'field-error' : ''} />
                  {errors.firstName && <p className="field-error-msg">{errors.firstName}</p>}
                </div>
                <div>
                  <label>Last Name</label>
                  <input value={form.lastName} onChange={e => update('lastName', e.target.value)} className={errors.lastName ? 'field-error' : ''} />
                  {errors.lastName && <p className="field-error-msg">{errors.lastName}</p>}
                </div>
              </div>

              <label>Email</label>
              <input value={form.email} onChange={e => update('email', e.target.value)} className={errors.email ? 'field-error' : ''} />
              {errors.email && <p className="field-error-msg">{errors.email}</p>}

              <label>Phone</label>
              <input value={form.phone} onChange={e => update('phone', e.target.value)} className={errors.phone ? 'field-error' : ''} />
              {errors.phone && <p className="field-error-msg">{errors.phone}</p>}

              <label>Address</label>
              <input value={form.address} onChange={e => update('address', e.target.value)} className={errors.address ? 'field-error' : ''} />
              {errors.address && <p className="field-error-msg">{errors.address}</p>}

              <div className="form-row-2">
                <div>
                  <label>City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)} className={errors.city ? 'field-error' : ''} />
                  {errors.city && <p className="field-error-msg">{errors.city}</p>}
                </div>
                <div>
                  <label>State</label>
                  <input value={form.state} onChange={e => update('state', e.target.value)} className={errors.state ? 'field-error' : ''} />
                  {errors.state && <p className="field-error-msg">{errors.state}</p>}
                </div>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Zip Code</label>
                  <input value={form.zipCode} onChange={e => update('zipCode', e.target.value)} className={errors.zipCode ? 'field-error' : ''} />
                  {errors.zipCode && <p className="field-error-msg">{errors.zipCode}</p>}
                </div>
                <div>
                  <label>Country</label>
                  <input value={form.country} onChange={e => update('country', e.target.value)} />
                </div>
              </div>

              <h3 className="checkout-subheading">Shipping Method</h3>
              {[
                { value: 'standard', label: 'Standard Shipping', price: 'Free (3-5 days)' },
                { value: 'express', label: 'Express Shipping', price: '$15 (1-2 days)' },
                { value: 'overnight', label: 'Overnight Shipping', price: '$30 (Next day)' },
              ].map(m => (
                <label key={m.value} className={`shipping-option ${form.shippingMethod === m.value ? 'active' : ''}`}>
                  <input type="radio" checked={form.shippingMethod === m.value} onChange={() => update('shippingMethod', m.value)} />
                  <div>
                    <div className="shipping-option-label">{m.label}</div>
                    <div className="shipping-option-price">{m.price}</div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="checkout-section-title">Payment Information</h2>
              <label>Name on Card</label>
              <input value={form.cardName} onChange={e => update('cardName', e.target.value)} className={errors.cardName ? 'field-error' : ''} />
              {errors.cardName && <p className="field-error-msg">{errors.cardName}</p>}

              <label>Card Number</label>
              <input value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} placeholder="4111111111111111" maxLength="16" className={errors.cardNumber ? 'field-error' : ''} />
              {errors.cardNumber && <p className="field-error-msg">{errors.cardNumber}</p>}

              <div className="form-row-3">
                <div>
                  <label>Month</label>
                  <select value={form.expiryMonth} onChange={e => update('expiryMonth', e.target.value)} className={errors.expiryMonth ? 'field-error' : ''}>
                    <option value="">MM</option>
                    {[...Array(12)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>)}
                  </select>
                </div>
                <div>
                  <label>Year</label>
                  <select value={form.expiryYear} onChange={e => update('expiryYear', e.target.value)} className={errors.expiryYear ? 'field-error' : ''}>
                    <option value="">YYYY</option>
                    {[...Array(10)].map((_, i) => { const y = new Date().getFullYear() + i; return <option key={y} value={y}>{y}</option> })}
                  </select>
                </div>
                <div>
                  <label>CVV</label>
                  <input value={form.cvv} onChange={e => update('cvv', e.target.value)} placeholder="123" maxLength="4" className={errors.cvv ? 'field-error' : ''} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="checkout-section-title">Order Review</h2>
              <h3 className="checkout-subheading" style={{ marginTop: 0 }}>Shipping Address</h3>
              <p className="review-text">
                {form.firstName} {form.lastName}<br />
                {form.address}<br />
                {form.city}, {form.state} {form.zipCode}<br />
                {form.country}
              </p>

              <h3 className="checkout-subheading">Items</h3>
              {cartItems.map(item => (
                <div key={item.id} className="review-item-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="checkout-summary-card">
          <h3>Order Summary</h3>
          <div className="cart-subtotal-row"><span>Subtotal</span><span>${getTotalPrice().toFixed(2)}</span></div>
          <div className="cart-subtotal-row"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
          <div className="cart-subtotal-row"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="cart-total-row"><span>Total</span><span>${total.toFixed(2)}</span></div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {step > 1 && (
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</button>
            )}
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleContinue}>
              {step === 3 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
