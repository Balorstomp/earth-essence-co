'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// ── Small botanical illustration ──────────────────────────────────────────────
function BotanicalCheck() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      {/* Outer ring */}
      <svg className="absolute inset-0 w-full h-full text-terra opacity-15" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5"/>
      </svg>
      {/* Inner circle */}
      <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: '#F0DDD0' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9E4A28" strokeWidth="1.8" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      {/* Tiny leaf accents */}
      <svg className="absolute -top-1 -right-1 w-8 h-8 text-olive opacity-40" viewBox="0 0 120 180" fill="none">
        <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z" fill="currentColor"/>
      </svg>
    </div>
  )
}

export default function ThankYouPage() {
  const searchParams = useSearchParams()

  // Supports both Razorpay params and legacy Stripe session_id
  const paymentId   = searchParams.get('payment_id')   // Razorpay
  const orderId     = searchParams.get('order_id')     // Razorpay
  const sessionId   = searchParams.get('session_id')   // Stripe (legacy)

  const hasRazorpay = paymentId && orderId

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-xl mx-auto text-center">

        <BotanicalCheck />

        <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: '#9E4A28' }}>Order Confirmed</p>
        <h1 className="font-display font-bold text-forest text-3xl md:text-4xl mb-4">
          Thank you for your order!
        </h1>
        <p className="text-slate text-sm leading-relaxed mb-8">
          Your handcrafted Earth &amp; Essence products are being prepared with care.
          You'll receive an email confirmation shortly.
        </p>

        {/* Order reference */}
        {hasRazorpay && (
          <div className="bg-cream-light rounded-sm p-5 mb-8 text-left border-l-4" style={{ borderColor: '#9E4A28' }}>
            <p className="text-[9px] tracking-widest uppercase text-slate font-semibold mb-3">Payment Reference</p>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-slate">Payment ID</span>
                <span className="text-xs font-mono font-semibold text-forest">{paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate">Order ID</span>
                <span className="text-xs font-mono font-semibold text-forest">{orderId}</span>
              </div>
            </div>
            <p className="text-[9px] text-slate mt-3">Save this for your records. We'll also email you a receipt.</p>
          </div>
        )}

        {/* What's next */}
        <div className="rounded-sm p-6 mb-8 text-left" style={{ background: '#3B1F0F' }}>
          <p className="text-[9px] tracking-widest uppercase font-semibold mb-4" style={{ color: '#C08B68' }}>What Happens Next</p>
          <div className="space-y-4">
            {[
              { step: '1', text: 'You\'ll receive an email confirmation with your order number.' },
              { step: '2', text: 'We handcraft and pack your order within 2–3 business days.' },
              { step: '3', text: 'Your order ships with tracking. Delivery: 5–10 business days.' },
            ].map(s => (
              <div key={s.step} className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full text-forest text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#C08B68' }}>
                  {s.step}
                </span>
                <p className="text-sm" style={{ color: 'rgba(212,184,150,0.8)' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>

        {/* Botanical footer mark */}
        <div className="mt-12 flex items-center justify-center gap-3" style={{ color: '#D4B896' }}>
          <div className="h-px w-16" style={{ background: '#D4B896', opacity: 0.4 }} />
          <svg width="14" height="14" viewBox="0 0 120 180" fill="currentColor" opacity="0.4">
            <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z"/>
          </svg>
          <div className="h-px w-16" style={{ background: '#D4B896', opacity: 0.4 }} />
        </div>
        <p className="text-[9px] tracking-widest uppercase text-slate/40 mt-3">Earth &amp; Essence Co.</p>
      </div>
    </div>
  )
}
