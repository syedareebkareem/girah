import { z } from 'zod'

export const checkoutSchema = z.object({
  // Shipping Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 digits'),
  country: z.string().min(2, 'Country is required'),

  // Shipping Method
  shippingMethod: z.enum(['standard', 'express', 'overnight']),

  // Billing Address
  sameAsShipping: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  billingCountry: z.string().optional(),

  // Payment Info
  cardName: z.string().min(3, 'Name on card is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryMonth: z.string().min(1, 'Expiry month is required'),
  expiryYear: z.string().min(4, 'Expiry year is required'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3-4 digits'),
}).refine((data) => {
  if (!data.sameAsShipping) {
    return data.billingAddress && data.billingCity && data.billingState && data.billingZipCode
  }
  return true
}, {
  message: 'Billing address is required',
  path: ['billingAddress'],
})
