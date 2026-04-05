'use client'

import { useParams } from 'next/navigation'
import { getBySlug, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

export default function ProductPage() {
  const { slug } = useParams()
  const product  = getBySlug(slug)
  const { addItem } = useCart()
  const [added, setAdded]   = useState(false)
  const [qty, setQty]       = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-4xl text-forest/30 mb-4">Product not found</p>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const accent    = product.accentColor
  const related   = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem({
      id:          product.id,
      slug:        product.slug,
      name:        product.name,
      category:    product.categoryLabel,
      price:       product.price,
      image:       product.image,
      weight:      product.weight,
      accentColor: accent,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="pt-24 pb-0 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-slate">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-forest">{product.name}</span>
        </nav>
      </div>

      {/* ── Product detail ────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image */}
          <div className="relative aspect-square rounded-sm overflow-hidden"
               style={{ backgroundColor: product.imagePlaceholderBg }}>
            <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: accent }} />
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => {}}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0">
              <p className="font-display font-bold text-8xl text-ink/10">E&amp;E</p>
            </div>
            {/* Category badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="badge" style={{ backgroundColor: `${accent}18`, color: accent }}>
                {product.categoryLabel}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="py-4">
            {/* Key ingredient */}
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: accent }}>
              {product.keyIngredient}
            </p>

            <h1 className="font-display font-bold text-forest text-3xl md:text-4xl leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-slate text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-slate font-semibold mb-3">Key Benefits</p>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map(b => (
                  <span key={b} className="badge badge-green text-xs">{b}</span>
                ))}
              </div>
            </div>

            {/* Price & weight */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-sand">
              <div>
                <p className="font-display font-bold text-forest text-3xl">${product.price}</p>
                <p className="text-slate text-xs mt-0.5">USD · {product.weight}</p>
              </div>
              <div className="text-slate text-xs">
                <p>~₹{product.priceINR?.toLocaleString('en-IN')} INR</p>
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-5">
              {/* Qty stepper */}
              <div className="flex items-center border border-sand">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-forest hover:bg-sage-light/30 transition-colors text-lg">
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold text-forest">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-forest hover:bg-sage-light/30 transition-colors text-lg">
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 text-xs tracking-widest uppercase font-semibold transition-all duration-200 ${
                  added
                    ? 'bg-olive text-cream-light'
                    : 'bg-forest text-cream-light hover:bg-olive active:scale-95'
                }`}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            {/* View cart */}
            {added && (
              <Link href="/cart" className="btn-outline w-full text-center block">
                View Cart
              </Link>
            )}

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: '🌿', text: 'Organic' },
                { icon: '🤲', text: 'Handmade' },
                { icon: '🚚', text: 'Free ship ₹999+' },
              ].map(item => (
                <div key={item.text} className="bg-cream-light rounded-sm p-3">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-[9px] tracking-wide uppercase text-slate">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredients note ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pb-16 max-w-7xl mx-auto">
        <div className="bg-sage-light/20 border border-sage-light rounded-sm px-8 py-7">
          <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-2">Crafted With Care</p>
          <p className="text-sm text-slate leading-relaxed">
            All Earth &amp; Essence products are made with certified organic botanicals, cold-pressed oils, and no synthetic additives.
            Ingredients are sourced from trusted Indian and international suppliers. Patch-test recommended for sensitive skin.
          </p>
        </div>
      </section>

      {/* ── Related products ──────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-cream-light px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-forest text-2xl mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
