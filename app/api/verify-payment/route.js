import crypto from 'crypto'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/verify-payment
// Verifies the Razorpay payment signature to confirm the payment is genuine.
//
// Called by the frontend after the Razorpay checkout modal closes with success.
// Returns { success: true } on valid signature, error otherwise.
//
// Razorpay docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/#12-verify-payment-signature
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json(
        { success: false, error: 'Missing payment details.' },
        { status: 400 }
      )
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return Response.json(
        { success: false, error: 'Server configuration error.' },
        { status: 500 }
      )
    }

    // ── HMAC-SHA256 verification ──────────────────────────────────────────────
    // The expected signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected  = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex')

    const isValid = expected === razorpay_signature

    if (!isValid) {
      console.warn('[Verify Payment] Signature mismatch', {
        razorpay_order_id,
        razorpay_payment_id,
      })
      return Response.json(
        { success: false, error: 'Payment verification failed. Please contact support.' },
        { status: 400 }
      )
    }

    // ── Payment is genuine ────────────────────────────────────────────────────
    // At this point you can:
    //   1. Save the order to your database
    //   2. Send an order confirmation email
    //   3. Trigger WhatsApp / SMS notifications
    console.log('[Verify Payment] ✓ Payment verified', {
      order_id:   razorpay_order_id,
      payment_id: razorpay_payment_id,
    })

    return Response.json({
      success:    true,
      orderId:    razorpay_order_id,
      paymentId:  razorpay_payment_id,
    })

  } catch (err) {
    console.error('[Verify Payment Error]', err)
    return Response.json(
      { success: false, error: err.message || 'Verification failed.' },
      { status: 500 }
    )
  }
}
