'use client'

import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const CATEGORIES = [
  { value: 'all',        label: 'All Products' },
  { value: 'hair-soap',  label: 'Hair Soaps'   },
  { value: 'skin-soap',  label: 'Skin Soaps'   },
  { value: 'face-cream', label: 'Face Creams'  },
]

const SORTS = [
  { value: 'default',     label: 'Featured'     },
  { value: 'price-asc',   label: 'Price: Low–High' },
  { value: 'price-desc',  label: 'Price: High–Low' },
  { value: 'name',        label: 'Name A–Z'     },
]

export default function ShopPage() {
  const [activeCat, setActiveCat] = useState('all')
  const [sort, setSort]           = useState('default')

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? products : products.filter(p => p.category === activeCat)
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCat, sort])

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section className="bg-cream pt-32 pb-12 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-sage-light/20 blob-1 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-3">
            Earth &amp; Essence Co.
          </p>
          <h1 className="font-display font-bold text-forest text-4xl md:text-5xl mb-4">
            Our Collection
          </h1>
          <p className="text-slate text-sm leading-relaxed max-w-md">
            Every bar and jar is small-batch, handcrafted with certified-organic botanicals. No sulphates. No parabens. No synthetic fragrance.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                onClick={() => setActiveCat(c.value)}
                className={`text-[10px] tracking-widest uppercase font-semibold px-5 py-2.5 transition-all duration-200 ${
                  activeCat === c.value
                    ? 'bg-forest text-cream-light'
                    : 'border border-sand text-slate hover:border-forest hover:text-forest'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product grid ────────────────────────────────────────────────────── */}
      <section className="bg-cream px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Sort row */}
          <div className="flex items-center justify-between py-6 border-b border-sand mb-8">
            <p className="text-xs text-slate">
              Showing <span className="text-forest font-semibold">{filtered.length}</span> products
            </p>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-xs border border-sand bg-cream-light text-forest px-3 py-2 outline-none focus:border-forest cursor-pointer"
            >
              {SORTS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div key={product.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-forest/40">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Ingredients promise ──────────────────────────────────────────────── */}
      <section className="bg-sage-light/30 px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🌿', label: 'Certified Organic',     sub: '100% of botanicals' },
            { icon: '🧪', label: 'No Nasties',            sub: 'Sulphate & paraben free' },
            { icon: '🤲', label: 'Handcrafted',           sub: 'Small-batch only' },
            { icon: '♻️', label: 'Eco Packaging',         sub: 'Recyclable & minimal' },
          ].map(item => (
            <div key={item.label}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-display font-bold text-forest text-sm mb-1">{item.label}</p>
              <p className="text-slate text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
