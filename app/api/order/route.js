import Stripe from 'stripe'

// GET /api/order?session_id=cs_xxx
// Called by the thank-you page to display order details after successful payment.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sessionId        = searchParams.get('session_id')

  if (!sessionId) {
    return Response.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'Payment not completed' }, { status: 402 })
    }

    return Response.json({
      id:               session.id,
      amount_total:     session.amount_total,
      currency:         session.currency,
      customer_email:   session.customer_details?.email,
      shipping_details: session.shipping_details,
      lineItems:        session.line_items,
    })

  } catch (err) {
    console.error('[Order Fetch Error]', err)
    return Response.json({ error: err.message || 'Failed to retrieve order.' }, { status: 500 })
  }
}
