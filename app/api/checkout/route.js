import Stripe from 'stripe'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/checkout
// Supports:
//   • International customers → Credit / Debit card (Visa, Mastercard, Amex)
//   • Indian customers        → UPI (Google Pay, PhonePe, Paytm, etc.) + Cards
//
// SETUP:
//   1. Create Stripe account → https://stripe.com
//   2. Add to .env.local:
//        STRIPE_SECRET_KEY=sk_test_...
//        NEXT_PUBLIC_URL=http://localhost:3000
//   3. For UPI: Enable UPI in Stripe Dashboard
//        → Settings → Payment methods → UPI → Enable
//   4. Enable Adaptive Pricing (local currencies):
//        → Settings → Checkout → Local currencies → Enable
// ─────────────────────────────────────────────────────────────────────────────

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(request) {
  try {
    const { items, shipping, currency = 'usd' } = await request.json()

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items in cart.' }, { status: 400 })
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
          description: `${item.category} · ${item.weight || ''}`.trim(),
          // Uncomment when you have hosted product images:
          // images: [`${process.env.NEXT_PUBLIC_URL}${item.image}`],
        },
        unit_amount: Math.round(item.price * (currency === 'inr' ? 8300 : 100)),
        // ↑ If INR selected, convert USD price to paise (1 USD ≈ ₹83)
        // Replace with real INR prices in data/products.js when ready
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item if applicable
    if (shipping && shipping > 0) {
      lineItems.push({
        price_data: {
          currency,
          product_data: {
            name: 'Shipping',
            description: 'Standard international shipping',
          },
          unit_amount: Math.round(shipping * (currency === 'inr' ? 8300 : 100)),
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      // ── Payment methods ────────────────────────────────────────────────────
      // `automatic_payment_methods` lets Stripe automatically show the right
      // payment options based on the customer's location and currency:
      //   • India / INR  → UPI (Google Pay, PhonePe, Paytm) + Cards
      //   • International → Cards (Visa, Mastercard, Amex, Apple Pay, etc.)
      //   • UK / EU      → also shows local methods (iDEAL, Bancontact, etc.)
      automatic_payment_methods: {
        enabled: true,
      },

      line_items: lineItems,
      mode: 'payment',
      currency,

      // Collect shipping address
      shipping_address_collection: {
        allowed_countries: [
          'IN',  // India (UPI + cards)
          'US', 'GB', 'CA', 'AU', 'SG', 'AE', 'NZ', 'IE',
          'DE', 'FR', 'NL', 'SE', 'NO', 'DK', 'CH', 'AT',
          'BE', 'ES', 'IT', 'PT', 'HK', 'JP', 'MY', 'ZA',
        ],
      },

      customer_creation: 'always',

      // Phone number for order confirmation / WhatsApp follow-up
      phone_number_collection: { enabled: true },

      success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/cart`,

      metadata: {
        source:     'earth-essence-co',
        currency,
        item_count: String(items.reduce((s, i) => s + i.quantity, 0)),
      },
    })

    return Response.json({ url: session.url })

  } catch (err) {
    console.error('[Stripe Checkout Error]', err)

    if (!process.env.STRIPE_SECRET_KEY || err.message?.includes('No API key')) {
      return Response.json(
        { error: '⚠️ Stripe is not configured yet. Add STRIPE_SECRET_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    return Response.json(
      { error: err.message || 'Failed to create checkout session.' },
      { status: 500 }
    )
  }
}
