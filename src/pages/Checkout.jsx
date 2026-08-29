import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'
import { checkoutSchema } from '../utils/validation'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { cartItems, getTotalPrice } = useCart()
  const { createOrder } = useOrder()
  const [sameAddress, setSameAddress] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const shippingCost = watch('shippingMethod') === 'express' ? 15 : watch('shippingMethod') === 'overnight' ? 30 : 0

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      const order = createOrder({
        items: cartItems,
        subtotal: getTotalPrice(),
        shipping: shippingCost,
        tax: parseFloat((getTotalPrice() * 0.1).toFixed(2)),
        total: getTotalPrice() + shippingCost + parseFloat((getTotalPrice() * 0.1).toFixed(2)),
        shippingInfo: data,
      })
      navigate(`/order-confirmation/${order.id}`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>Checkout</h1>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', justifyContent: 'center' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: s <= step ? '#B8C5B5' : '#D9D9D9',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                {s}
              </div>
              <span style={{ color: s <= step ? '#2D2D2D' : '#999999', fontWeight: 600 }}>
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
              {s < 3 && <span style={{ color: '#D9D9D9', marginLeft: '8px' }}>→</span>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
            {/* Form Section */}
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px' }}>
              {/* STEP 1: SHIPPING */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Shipping Information
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register('firstName')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.firstName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.firstName && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register('lastName')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.lastName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.lastName && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email')}
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
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.phone ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.phone && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      {...register('address')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.address ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.address && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        City
                      </label>
                      <input
                        type="text"
                        {...register('city')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.city ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.city && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        State
                      </label>
                      <input
                        type="text"
                        {...register('state')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.state ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.state && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Zip Code
                      </label>
                      <input
                        type="text"
                        {...register('zipCode')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.zipCode ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.zipCode && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Country
                      </label>
                      <input
                        type="text"
                        {...register('country')}
                        defaultValue="Pakistan"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.country ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.country && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                    Shipping Method
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {[
                      { value: 'standard', label: 'Standard Shipping', price: '$0 (3-5 business days)' },
                      { value: 'express', label: 'Express Shipping', price: '$15 (1-2 business days)' },
                      { value: 'overnight', label: 'Overnight Shipping', price: '$30 (Next day)' },
                    ].map(method => (
                      <label
                        key={method.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          {...register('shippingMethod')}
                          value={method.value}
                          defaultChecked={method.value === 'standard'}
                          style={{ marginRight: '12px', cursor: 'pointer' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: '#2D2D2D' }}>{method.label}</div>
                          <div style={{ fontSize: '12px', color: '#999999' }}>{method.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Payment Information
                  </h2>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Name on Card
                    </label>
                    <input
                      type="text"
                      {...register('cardName')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.cardName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.cardName && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.cardName.message}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Card Number (16 digits)
                    </label>
                    <input
                      type="text"
                      {...register('cardNumber')}
                      placeholder="4111111111111111"
                      maxLength="16"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.cardNumber ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        letterSpacing: '2px',
                      }}
                    />
                    {errors.cardNumber && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Month
                      </label>
                      <select
                        {...register('expiryMonth')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.expiryMonth ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">Select</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      {errors.expiryMonth && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          Required
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Year
                      </label>
                      <select
                        {...register('expiryYear')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.expiryYear ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, i) => {
                          const year = new Date().getFullYear() + i
                          return (
                            <option key={year} value={String(year)}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                      {errors.expiryYear && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          Required
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        {...register('cvv')}
                        placeholder="123"
                        maxLength="4"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.cvv ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          letterSpacing: '2px',
                        }}
                      />
                      {errors.cvv && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#F8F8F7', borderRadius: '6px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={sameAddress}
                        onChange={(e) => {
                          setSameAddress(e.target.checked)
                        }}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 600, color: '#2D2D2D' }}>
                        Billing address same as shipping
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Order Review
                  </h2>

                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                      Shipping Address
                    </h3>
                    <div style={{ fontSize: '14px', color: '#999999', lineHeight: '1.8' }}>
                      <p>{getValues('firstName')} {getValues('lastName')}</p>
                      <p>{getValues('address')}</p>
                      <p>{getValues('city')}, {getValues('state')} {getValues('zipCode')}</p>
                      <p>{getValues('country')}</p>
                      <p style={{ marginTop: '8px' }}>{getValues('email')}</p>
                      <p>{getValues('phone')}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', borderTop: '1px solid #D9D9D9', paddingTop: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                      Items
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                          <span style={{ color: '#2D2D2D' }}>
                            {item.name} × {item.quantity}
                          </span>
                          <span style={{ fontWeight: 600, color: '#2D2D2D' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Subtotal</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Shipping</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Tax (10%)</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #D9D9D9',
                    paddingTop: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D' }}>
                    ${(getTotalPrice() + shippingCost + getTotalPrice() * 0.1).toFixed(2)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      style={{
                        flex: 1,
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        color: '#B8C5B5',
                        border: '2px solid #B8C5B5',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px 24px',
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
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
