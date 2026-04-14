import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const services = [
  { id: 'factory-audit', name: 'Factory Audit', price: 299 },
  { id: 'psi', name: 'Pre-shipment Inspection', price: 199 },
  { id: 'cls', name: 'Container Loading Supervision', price: 149 },
]

export async function POST(req: Request) {
  try {
    const { serviceId, email, inspectionDate, factoryName, factoryAddress, productDescription } = await req.json()
    
    const service = services.find(s => s.id === serviceId)
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const domain = process.env.DOMAIN || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'apple_pay'],
      payment_method_options: {
        apple_pay: {
          // Stripe automatically handles Apple Pay for checkout sessions
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Muzhuo Inspection - ${service.name}`,
              description: `Inspection for ${productDescription} at ${factoryName}. Date: ${inspectionDate}`,
            },
            unit_amount: service.price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/order`,
      customer_email: email,
      metadata: {
        serviceId,
        inspectionDate,
        factoryName,
        factoryAddress,
        productDescription,
      },
    })

    return NextResponse.json({ id: session.id })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
