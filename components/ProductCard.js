'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

// Warm earthy accent colour map
const ACCENTS = {
  'hair-soap':  '#9E4A28',  // terracotta
  'skin-soap':  '#8C6239',  // warm ochre
  'face-cream': '#7A4030',  // warm rust
}

// Simple inline botanical placeholder per category
function PlaceholderArt({ category, accent }) {
  if (category === 'hair-soap') {
    // Rosemary sprig
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 90 L50 15" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
        {[20,35,50,65,78].map((y, i) => (
          <g key={i}>
            <path d={`M50 ${y} C${i%2===0?30:70} ${y-8} ${i%2===0?22:78} ${y-4} ${i%2===0?20:80} ${y}`}
              stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
            <ellipse cx={i%2===0?23:77} cy={y} rx="6" ry="3.5"
              transform={`rotate(${i%2===0?-20:20} ${i%2===0?23:77} ${y})`}
              fill={accent} opacity="0.45"/>
          </g>
        ))}
      </svg>
    )
  }
  if (category === 'skin-soap') {
    // Flower / rose
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx="50" cy="28" rx="9" ry="20"
            fill={accent} opacity="0.5"
            transform={`rotate(${angle} 50 50)`}/>
        ))}
        <circle cx="50" cy="50" r="12" fill={accent} opacity="0.8"/>
        <circle cx="50" cy="50" r="6"  fill={accent} opacity="0.3"/>
      </svg>
    )
  }
  // face-cream → seed pod / leaf
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-16 opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 90 C50 90 15 65 15 42 C15 22 32 10 50 10 C68 10 85 22 85 42 C85 65 50 90 50 90Z"
        fill={accent} opacity="0.65"/>
      <path d="M50 90 L50 10" stroke={accent} strokeWidth="1.2" opacity="0.4"/>
      <path d="M50 52 C35 44 24 34 18 20" stroke={accent} strokeWidth="0.9" opacity="0.4"/>
      <path d="M50 52 C65 44 76 34 82 20" stroke={accent} strokeWidth="0.9" opacity="0.4"/>
    </svg>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded]     = useState(false)
  const [imgError, setImgError] = useState(false)
  const accent = ACCENTS[product.category] || product.accentColor

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({
      id:          product.id,
      slug:        product.slug,
      name:        product.name,
      category:    product.categoryLabel,
      price:       product.price,
      image:       product.image,
      accentColor: accent,
      weight:      product.weight,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/product/${product.slug}`} className="product-card group block rounded-sm overflow-hidden">

      {/* ── Image ────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden aspect-square"
        style={{ backgroundColor: product.imagePlaceholderBg || '#D4B896' }}
      >
        {/* Accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: accent }} />

        {/* Real product image */}
        {!imgError && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Beautiful placeholder — shown when image is missing */}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(145deg, ${product.imagePlaceholderBg || '#D4B896'} 0%, #F9F2E7 100%)` }}>
            <PlaceholderArt category={product.category} accent={accent} />
            <p className="text-[8px] tracking-widest uppercase text-slate/50 mt-1">Add photo</p>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge" style={{ backgroundColor: `${accent}18`, color: accent }}>
            {product.categoryLabel}
          </span>
        </div>

        {/* Hover add-to-cart */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 right-0 py-3 text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10 ${
            added
              ? 'text-cream-light'
              : 'text-cream-light'
          }`}
          style={{ background: added ? '#8C6239' : accent }}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>

      {/* ── Info ─────────────────────────────────────────────────────────── */}
      <div className="p-4 bg-cream-light">
        <h3 className="font-display font-bold text-forest text-lg leading-tight mb-1 group-hover:text-terra transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-slate text-xs leading-relaxed mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-forest text-sm">${product.price}</span>
            <span className="text-slate font-normal text-xs">/ ₹{product.priceINR}</span>
          </div>
          <span className="text-slate text-xs">{product.weight}</span>
        </div>
      </div>
    </Link>
  )
}
