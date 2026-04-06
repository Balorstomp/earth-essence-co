'use client'

import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SHIPPING_THRESHOLD_USD = 60
const SHIPPING_USD            = 8
const SHIPPING_THRESHOLD_INR = 999
const SHIPPING_INR            = 80

// ── Load Razorpay checkout script dynamically ─────────────────────────────────
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script   = document.createElement('script')
    script.src     = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ── Small leaf SVG for organic feel ──────────────────────────────────────────
function MiniLeaf() {
  return (
    <svg width="16" height="22" viewBox="0 0 120 180" fill="none" className="inline-block text-terra opacity-40" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z" fill="currentColor"/>
      <path d="M60 170 L60 5" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  )
}

export default function CartPage() {
  const { items, itemCount, subtotal, isEmpty, removeItem, updateQty, clearCart } = useCart()
  const router   = useRouter()
  const [currency, setCurrency] = useState('INR')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  // Auto-detect currency hint based on timezone / locale
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && tz.startsWith('Asia/')) {
        setCurrency('INR')
      } else {
        setCurrency('USD')
      }
    } catch {
      // stay with INR default
    }
  }, [])

  const isINR      = currency === 'INR'
  const threshold  = isINR ? SHIPPING_THRESHOLD_INR : SHIPPING_THRESHOLD_USD
  const shipCost   = isINR ? SHIPPING_INR : SHIPPING_USD

  const displaySub = isINR
    ? items.reduce((s, i) => s + (i.priceINR || i.price * 83) * i.quantity, 0)
    : subtotal

  const freeShip   = displaySub >= threshold
  const shipping   = freeShip ? 0 : shipCost
  const total      = displaySub + shipping
  const symbol     = isINR ? '₹' : '$'
  const fmt        = (n) => isINR ? Math.round(n).toLocaleString('en-IN') : n.toFixed(2)

  // ── Razorpay checkout handler ──────────────────────────────────────────────
  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    // 1. Load Razorpay script
    const loaded = await loadRazorpay()
    if (!loaded) {
      setError('Could not load payment gateway. Please check your connection.')
      setLoading(false)
      return
    }

    try {
      // 2. Create Razorpay order on the server
      const res  = await fetch('/api/razorpay', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items:    items.map(i => ({
            ...i,
            priceINR: i.priceINR || Math.round(i.price * 83),
          })),
          shipping: freeShip ? 0 : shipCost,
          currency,
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Could not create payment order. Please try again.')
        setLoading(false)
        return
      }

      // 3. Open Razorpay checkout modal
      const options = {
        key:         data.keyId,
        amount:      data.amount,        // in paise / cents
        currency:    data.currency,
        order_id:    data.orderId,
        name:        'Earth & Essence Co.',
        description: `${itemCount} item${itemCount !== 1 ? 's' : ''} · Organic Skincare`,
        image:       '/images/logo.png', // add your logo to /public/images/logo.png
        theme:       { color: '#9E4A28' },

        // ── Payment methods auto-detected by Razorpay ──────────────────────
        //   • INR → UPI (Google Pay, PhonePe, Paytm), Cards, Net Banking, Wallets
        //   • USD → International Cards (Visa, MC, Amex)
        // No extra config needed — Razorpay detects it from currency + location

        prefill: {
          // These come from the checkout form if you collect them before payment
          // name:  customerName,
          // email: customerEmail,
          // contact: customerPhone,
        },

        handler: async (response) => {
          // 4. Verify payment signature on the server
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              // 5. Payment confirmed → go to thank-you page
              clearCart()
              router.push(`/thank-you?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`)
            } else {
              setError(verifyData.error || 'Payment verification failed. Please contact support.')
            }
          } catch {
            setError('Could not verify payment. Please contact support with your payment ID: ' + response.razorpay_payment_id)
          }
          setLoading(false)
        },

        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error.description}. Please try again.`)
        setLoading(false)
      })

      rzp.open()

    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20 px-6">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: '#F0DDD0' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9E4A28" strokeWidth="1.2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-forest text-3xl mb-3">Your bag is empty</h1>
          <p className="text-slate text-sm mb-8">Looks like you haven't added anything yet. Discover our handcrafted range.</p>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <MiniLeaf />
          <h1 className="font-display font-bold text-forest text-3xl md:text-4xl">
            Your Bag <span className="text-slate font-normal text-xl">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Cart items ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const itemPrice = isINR ? (item.priceINR || Math.round(item.price * 83)) : item.price
              return (
                <div key={item.id} className="bg-cream-light flex gap-4 p-4 rounded-sm">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden"
                       style={{ backgroundColor: '#D4B896' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={() => {}}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-display font-bold text-xs" style={{ color: 'rgba(59,31,15,0.1)' }}>E&amp;E</p>
                    </div>
                    {/* Accent stripe */}
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: item.accentColor || '#9E4A28' }} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display font-bold text-forest text-sm leading-tight">{item.name}</p>
                        <p className="text-slate text-[10px] tracking-wide mt-0.5">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate hover:text-terra transition-colors text-xs flex-shrink-0 mt-0.5"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-sand">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-forest hover:bg-sage-light/30 transition-colors text-sm">
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-forest">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-forest hover:bg-sage-light/30 transition-colors text-sm">
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-forest text-sm">
                        {symbol}{fmt(itemPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="flex items-center justify-between pt-2">
              <Link href="/shop" className="text-[10px] tracking-widest uppercase text-slate hover:text-forest transition-colors">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-[10px] tracking-widest uppercase text-slate hover:text-terra transition-colors">
                Clear Bag
              </button>
            </div>
          </div>

          {/* ── Order summary ──────────────────────────────────────────────── */}
          <div className="bg-cream-light rounded-sm p-6 h-fit sticky top-28">
            <h2 className="font-display font-bold text-forest text-lg mb-5">Order Summary</h2>

            {/* Currency / payment method selector */}
            <div className="mb-5">
              <p className="text-[9px] tracking-widest uppercase text-slate mb-2 font-semibold">Pay in</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: 'INR', l: '₹ INR', sub: 'UPI · Cards · Net Banking' },
                  { v: 'USD', l: '$ USD', sub: 'International Cards' },
                ].map(c => (
                  <button
                    key={c.v}
                    onClick={() => setCurrency(c.v)}
                    className={`flex flex-col items-center py-2.5 px-2 text-center transition-all duration-200 rounded-sm border ${
                      currency === c.v
                        ? 'bg-forest text-cream-light border-forest'
                        : 'border-sand text-slate hover:border-terra hover:text-forest'
                    }`}
                  >
                    <span className="text-[11px] font-bold tracking-wide">{c.l}</span>
                    <span className={`text-[8px] mt-0.5 ${currency === c.v ? 'text-sand/70' : 'text-slate/60'}`}>{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment icons */}
            <div className="mb-5 p-3 rounded-sm border border-sand/60" style={{ background: '#F9F2E7' }}>
              {isINR ? (
                <div>
                  <p className="text-[8px] tracking-widest uppercase text-slate mb-2 font-semibold">Accepted payment methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['UPI', 'Google Pay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'].map(m => (
                      <span key={m} className="payment-badge">{m}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[8px] tracking-widest uppercase text-slate mb-2 font-semibold">Accepted payment methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Visa', 'Mastercard', 'Amex', 'Diners Club'].map(m => (
                      <span key={m} className="payment-badge">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Line items */}
            <div className="space-y-2 text-sm border-t border-sand pt-5">
              <div className="flex justify-between text-slate">
                <span>Subtotal</span>
                <span>{symbol}{fmt(displaySub)}</span>
              </div>
              <div className="flex justify-between text-slate">
                <span>Shipping</span>
                <span className={freeShip ? 'text-olive font-semibold' : ''}>
                  {freeShip ? 'Free 🎉' : `${symbol}${fmt(shipping)}`}
                </span>
              </div>
              {!freeShip && (
                <p className="text-[10px] text-terra">
                  Add {symbol}{fmt(threshold - displaySub)} more for free shipping
                </p>
              )}
            </div>

            <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-sand">
              <span className="font-display font-bold text-forest text-lg">Total</span>
              <span className="font-display font-bold text-forest text-xl">{symbol}{fmt(total)}</span>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-sm">
                {error}
              </div>
            )}

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full mt-5 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loading ? '#9E8070' : '#3B1F0F' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Processing…
                </span>
              ) : `Pay ${symbol}${fmt(total)} →`}
            </button>

            <p className="text-[9px] text-slate text-center mt-3 flex items-center justify-center gap-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure checkout powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
