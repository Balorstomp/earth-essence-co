import Razorpay from 'razorpay'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/razorpay
// Creates a Razorpay Order. The frontend then opens the Razorpay checkout modal
// and — after payment — calls /api/verify-payment to confirm.
//
// Razorpay handles everything:
//   • Indian customers  → UPI (Google Pay, PhonePe, Paytm), Cards, Net Banking
//   • International     → Visa, Mastercard, Amex (enable in Razorpay dashboard)
//   • Auto-detection    → Razorpay shows the right payment methods based on
//                         currency + customer location automatically.
//
// SETUP:
//   1. Create Razorpay account → https://dashboard.razorpay.com/
//   2. Get API keys from Settings → API Keys
//   3. Add to .env.local:
//        RAZORPAY_KEY_ID=rzp_test_...
//        RAZORPAY_KEY_SECRET=...
//        NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
//        NEXT_PUBLIC_URL=http://localhost:3000
//   4. For international cards (USD): Enable in Razorpay Dashboard →
//        Settings → International Payments → Enable
// ─────────────────────────────────────────────────────────────────────────────

function getRazorpayInstance() {
  const keyId     = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local')
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

export async function POST(request) {
  try {
    const { items, shipping, currency = 'INR' } = await request.json()

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items in cart.' }, { status: 400 })
    }

    // ── Calculate total ───────────────────────────────────────────────────────
    // Razorpay amounts are in the smallest currency unit (paise for INR, cents for USD)
    const PAISE_MULTIPLIER = currency === 'INR' ? 100 : 100

    const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const subtotalINR = items.reduce((sum, item) => sum + (item.priceINR || item.price * 83) * item.quantity, 0)

    const baseAmount  = currency === 'INR' ? subtotalINR : subtotalUSD
    const totalAmount = baseAmount + (shipping || 0)
    const amountInSmallestUnit = Math.round(totalAmount * PAISE_MULTIPLIER)

    // Razorpay minimum is ₹1 (100 paise)
    if (amountInSmallestUnit < 100) {
      return Response.json({ error: 'Order amount is too low.' }, { status: 400 })
    }

    const razorpay = getRazorpayInstance()

    const order = await razorpay.orders.create({
      amount:   amountInSmallestUnit,
      currency: currency.toUpperCase(),  // 'INR' or 'USD'
      receipt:  `eec_${Date.now()}`,

      notes: {
        source:     'earth-essence-co',
        item_count: String(items.reduce((s, i) => s + i.quantity, 0)),
        items:      items.map(i => `${i.name} x${i.quantity}`).join(', ').slice(0, 250),
      },
    })

    return Response.json({
      orderId:   order.id,
      amount:    order.amount,       // in paise/cents
      currency:  order.currency,
      keyId:     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    })

  } catch (err) {
    console.error('[Razorpay Order Error]', err)

    if (err.message?.includes('not configured')) {
      return Response.json(
        { error: '⚠️ Razorpay is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file.' },
        { status: 500 }
      )
    }

    return Response.json(
      { error: err.error?.description || err.message || 'Failed to create payment order.' },
      { status: 500 }
    )
  }
}
