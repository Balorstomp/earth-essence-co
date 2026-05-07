import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { getFeaturedProducts } from '@/data/products'

// ── Botanical SVG decorations ─────────────────────────────────────────────────

function LeafDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z" fill="currentColor" />
      <path d="M60 170 L60 5" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <path d="M60 80 C40 65 25 50 15 35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 80 C80 65 95 50 105 35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 110 C35 95 20 80 12 60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 110 C85 95 100 80 108 60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

function BranchDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 180 C20 180 60 140 80 100 C100 60 90 20 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M80 100 C80 100 110 85 130 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M65 130 C65 130 95 115 115 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 155 C50 155 80 140 95 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="135" cy="65" rx="14" ry="9" transform="rotate(-30 135 65)" fill="currentColor" opacity="0.6"/>
      <ellipse cx="120" cy="100" rx="12" ry="8" transform="rotate(-10 120 100)" fill="currentColor" opacity="0.6"/>
      <ellipse cx="100" cy="125" rx="12" ry="8" transform="rotate(10 100 125)" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

function CircleDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6"/>
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5"/>
    </svg>
  )
}

// NEW: Hibiscus / flower ornament
function FlowerDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={i}
          cx="80" cy="46" rx="13" ry="30"
          fill="currentColor" opacity="0.55"
          transform={`rotate(${angle} 80 80)`}
        />
      ))}
      <circle cx="80" cy="80" r="16" fill="currentColor" opacity="0.9"/>
      <circle cx="80" cy="80" r="8"  fill="currentColor" opacity="0.3"/>
    </svg>
  )
}

// NEW: Herb sprig (rosemary-style)
function HerbSprig({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 190 C40 190 40 20 40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {[30,55,80,105,130,155].map((y, i) => (
        <g key={i}>
          <path d={`M40 ${y} C${i%2===0 ? 15 : 65} ${y-10} ${i%2===0 ? 10 : 70} ${y-5} ${i%2===0 ? 8 : 72} ${y}`}
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <ellipse cx={i%2===0 ? 12 : 68} cy={y} rx="7" ry="4"
            transform={`rotate(${i%2===0 ? -20 : 20} ${i%2===0 ? 12 : 68} ${y})`}
            fill="currentColor" opacity="0.5"/>
        </g>
      ))}
    </svg>
  )
}

// NEW: Seed pod / botanical ornament
function SeedPod({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 150 L50 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 80 C50 80 20 55 20 35 C20 15 35 5 50 5 C65 5 80 15 80 35 C80 55 50 80 50 80Z"
        fill="currentColor" opacity="0.7"/>
      <path d="M50 80 L50 5" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <path d="M50 45 C35 40 25 30 22 18" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      <path d="M50 45 C65 40 75 30 78 18" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
    </svg>
  )
}

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-cream flex items-center pt-20 overflow-hidden relative texture">
        {/* Botanical BG decorations */}
        <LeafDeco  className="absolute right-0 top-20 text-terra w-48 h-72 opacity-5 pointer-events-none" />
        <BranchDeco className="absolute left-0 bottom-20 text-olive w-48 h-48 opacity-5 pointer-events-none" />
        <HerbSprig className="absolute right-16 bottom-0 text-terra w-10 h-32 opacity-8 pointer-events-none sway" style={{ opacity: 0.08 }} />
        <FlowerDeco className="absolute left-8 top-32 text-sage w-20 h-20 opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center py-16">

          {/* Text */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: '#F0DDD0' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-terra" />
              <span className="text-[10px] tracking-widest uppercase font-semibold text-forest">Organic · Handcrafted · Pure</span>
            </div>
            <h1 className="font-display font-bold text-forest leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Skincare<br />
              <span className="italic font-normal text-terra">rooted in</span><br />
              nature.
            </h1>
            <p className="text-ink-light text-base md:text-lg leading-relaxed max-w-md mb-10">
              Every bar and jar handmade in small batches — no sulphates, no parabens, no compromises. Just plants that work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">Shop Now</Link>
              <Link href="/about" className="btn-outline">Our Story</Link>
            </div>

            {/* Reviews social proof */}
            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-sand">
              <div className="flex -space-x-2">
                {['#F0DDD0', '#D4B896', '#C08B68', '#9E4A28'].map((bg, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-cream-light" style={{ backgroundColor: bg }} />
                ))}
              </div>
              <div>
                <div className="stars text-xs">★★★★★</div>
                <p className="text-xs text-slate mt-0.5">4.9 · 200+ happy customers</p>
              </div>
            </div>
          </div>

          {/* Hero image + floating cards */}
          <div className="relative fade-up" style={{ animationDelay: '0.15s' }}>
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm" style={{ backgroundColor: '#D4B896' }}>
              <Image
                src="/images/hero.jpg"
                alt="Earth & Essence Co. natural skincare"
                fill
                className="object-cover"
                priority
              />
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4B896 0%, #EFE5D5 60%, #C08B68 100%)' }}>
                <div className="text-center">
                  <FlowerDeco className="w-24 h-24 mx-auto text-forest opacity-20" />
                  <p className="font-display font-bold text-4xl text-forest/20 mt-2">E&amp;E</p>
                  <p className="text-[9px] tracking-widest uppercase text-forest/20 mt-1">Add /public/images/hero.jpg</p>
                </div>
              </div>
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-terra" />

              {/* Proven effectiveness card */}
              <div className="floating-card absolute bottom-6 left-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F0DDD0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E4A28" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest">Proven <em className="font-normal">Effectiveness</em></p>
                  <p className="text-[9px] text-slate leading-tight mt-0.5 max-w-[140px]">Every product crafted to the highest quality standards.</p>
                </div>
              </div>
            </div>

            {/* Eco-friendly floating card */}
            <div className="floating-card absolute -right-4 top-12 max-w-[160px]">
              <div>
                <HerbSprig className="w-4 h-6 text-olive mb-1" />
                <p className="text-xs font-semibold text-forest">Eco-Friendly</p>
                <p className="text-[9px] text-terra italic">Packaging</p>
                <p className="text-[9px] text-slate mt-1 leading-tight">Eco-friendly materials designed to care for the planet.</p>
              </div>
            </div>

            {/* 100% Natural floating card */}
            <div className="absolute -left-4 top-1/3 text-cream-light px-4 py-3 rounded-sm max-w-[170px] shadow-lg" style={{ background: '#3B1F0F' }}>
              <div className="flex items-start gap-2 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(160,82,45,0.3)' }}>
                  <LeafDeco className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <p className="text-xs font-bold">100% Natural</p>
                  <p className="text-[10px] text-sage italic">100% You</p>
                </div>
              </div>
              {['No Harsh Chemicals', 'Plant-Based Goodness', 'Ethically Sourced'].map(t => (
                <div key={t} className="flex items-center gap-1.5 mb-1">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#C08B68" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-[9px] text-sand/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ORGANIC DIVIDER ───────────────────────────────────────────────── */}
      <div className="relative h-16 overflow-hidden bg-cream">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,32 C180,64 360,0 540,32 C720,64 900,0 1080,32 C1260,64 1380,16 1440,32 L1440,64 L0,64 Z"
            fill="#F9F2E7"/>
        </svg>
      </div>

      {/* ── CATEGORY BANDS ────────────────────────────────────────────────── */}
      <section className="bg-cream-light py-16 px-6 md:px-12 relative overflow-hidden">
        <SeedPod className="absolute right-8 top-8 text-olive w-8 h-16 opacity-10 pointer-events-none" />
        <FlowerDeco className="absolute left-4 bottom-4 text-terra w-16 h-16 opacity-8 pointer-events-none" style={{ opacity: 0.08 }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { cat: 'hair-soap',  accent: '#9E4A28', bg: '#F5EDE7', label: 'Hair Soaps',  desc: 'Ayurvedic herbs for strong, healthy hair',     count: 3 },
            { cat: 'skin-soap',  accent: '#8C6239', bg: '#F5EAE0', label: 'Skin Soaps',  desc: 'Nature\'s most effective cleansers',            count: 3 },
            { cat: 'face-cream', accent: '#7A4030', bg: '#F4E8E0', label: 'Face Creams', desc: 'Targeted care for radiant, glowing skin',       count: 2 },
          ].map(({ cat, accent, bg, label, desc, count }) => (
            <Link key={cat} href={`/shop?cat=${cat}`}
              className="group relative overflow-hidden p-8 flex flex-col justify-between min-h-[200px] rounded-sm transition-all duration-300 hover:shadow-md texture"
              style={{ backgroundColor: bg, borderTop: `4px solid ${accent}` }}>
              <div>
                <p className="text-[9px] tracking-widest uppercase font-semibold mb-2" style={{ color: accent }}>{count} products</p>
                <h2 className="font-display font-bold text-forest text-2xl mb-2">{label}</h2>
                <p className="text-slate text-sm leading-relaxed">{desc}</p>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-semibold mt-4 group-hover:translate-x-1 transition-transform duration-200" style={{ color: accent }}>
                Explore →
              </p>
              {/* Decorative leaf */}
              <LeafDeco className="absolute right-4 bottom-4 w-16 h-24 opacity-10" style={{ color: accent }} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────────────────── */}
      <section className="section bg-cream relative overflow-hidden">
        <HerbSprig className="absolute left-6 top-16 text-terra w-6 h-20 opacity-8 pointer-events-none" style={{ opacity: 0.08 }} />
        <SeedPod className="absolute right-12 bottom-16 text-olive w-7 h-14 opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-slate mb-2 font-semibold">Bestsellers</p>
              <h2 className="font-display font-bold text-forest text-4xl md:text-5xl">Our Favourites</h2>
            </div>
            <Link href="/shop" className="hidden md:block text-[10px] tracking-widest uppercase font-semibold text-forest hover:text-olive transition-colors duration-200 border-b border-forest pb-0.5">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HANDMADE ───────────────────────────────────────────────────── */}
      <section className="section bg-cream-light relative overflow-hidden texture">
        <BranchDeco className="absolute right-0 top-0 text-olive w-64 h-64 opacity-5 pointer-events-none" />
        <FlowerDeco className="absolute left-0 bottom-8 text-terra w-24 h-24 opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-widest uppercase text-slate mb-3 font-semibold">Why it matters</p>
            <h2 className="font-display font-bold text-forest text-4xl">The Handmade Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { accent: '#9E4A28', title: 'Small Batch Integrity',      icon: <SeedPod className="w-8 h-12 text-terra opacity-60" />, body: 'We make in batches of under 50 units. No shortcuts, no bulk manufacturing. You get a product made with full attention.' },
              { accent: '#8C6239', title: 'Ingredients You Can Read',   icon: <LeafDeco className="w-8 h-12 text-olive opacity-60" />, body: 'No fillers, no synthetic fragrance, no mystery chemicals. Every ingredient earns its place and is listed clearly.' },
              { accent: '#7A4030', title: 'Skin That Responds',         icon: <HerbSprig className="w-6 h-12 text-teal opacity-60" />, body: 'Without stripping sulphates and artificial additives, your skin has space to breathe, balance, and genuinely heal.' },
            ].map(({ accent, title, icon, body }) => (
              <div key={title} className="flex flex-col gap-4">
                <div className="mb-2">{icon}</div>
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: accent }} />
                <h3 className="font-display font-bold text-forest text-xl">{title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORGANIC WAVE DIVIDER ──────────────────────────────────────────── */}
      <div className="relative h-12 overflow-hidden bg-cream-light">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
            fill="#EFE5D5"/>
        </svg>
      </div>

      {/* ── REVIEW TESTIMONIAL ─────────────────────────────────────────────── */}
      <section className="section bg-cream text-center relative overflow-hidden">
        <CircleDeco className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 text-terra opacity-5 pointer-events-none" />
        <FlowerDeco className="absolute right-16 top-16 text-sage w-16 h-16 opacity-5 pointer-events-none" />
        <HerbSprig className="absolute left-12 bottom-12 text-olive w-8 h-20 opacity-8 pointer-events-none" style={{ opacity: 0.08 }} />
        <div className="max-w-2xl mx-auto relative">
          {/* Product icons */}
          <div className="flex justify-center gap-2 mb-8">
            {['#F0DDD0', '#D4B896'].map((bg, i) => (
              <div key={i} className={`w-12 h-14 rounded-sm shadow-md flex items-end justify-center pb-1 ${i === 1 ? 'mb-3' : ''}`} style={{ backgroundColor: bg }}>
                <div className="w-1 h-8 rounded-full" style={{ background: '#9E4A28', opacity: 0.3 }} />
              </div>
            ))}
          </div>
          <blockquote className="font-display text-2xl md:text-3xl text-forest leading-relaxed mb-6">
            "It feels <em className="text-terra">healthier, smoother &</em><br />
            <em className="text-olive">more radiant</em> than ever. I love knowing I'm<br />
            using something natural and effective!"
          </blockquote>
          <div className="stars text-sm mb-1">★★★★★</div>
          <p className="font-semibold text-forest text-sm">Priya S.</p>
          <p className="text-slate text-xs mt-0.5">Verified Buyer</p>
        </div>
      </section>

      {/* ── BRAND STORY ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden texture" style={{ background: '#3B1F0F' }}>
        <LeafDeco className="absolute right-12 top-12 text-olive w-32 h-48 opacity-10 pointer-events-none" />
        <BranchDeco className="absolute left-0 bottom-0 text-sage w-48 h-48 opacity-10 pointer-events-none" />
        <SeedPod className="absolute right-1/3 bottom-8 text-terra w-6 h-12 opacity-15 pointer-events-none" style={{ opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-4" style={{ color: '#C08B68' }}>Meet the maker</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6 text-cream-light">
              Made by hand.<br />
              <span className="italic font-normal text-sand">With love.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(212,184,150,0.75)' }}>
              Earth & Essence Co. started in a home kitchen with one question: why is it so hard to find skincare that's both honest and effective? Every product you see here is still made by hand, in small batches, with ingredients that earn their place.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-cream-light border-b pb-0.5 hover:border-cream-light transition-colors duration-200" style={{ borderColor: 'rgba(239,229,213,0.4)' }}>
              Read Our Story →
            </Link>
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Image src="/images/founder.jpg" alt="Earth & Essence Co. founder" fill className="object-cover" />
            {/* Fallback placeholder */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(160,82,45,0.2) 0%, rgba(59,31,15,0.4) 100%)' }}>
              <div className="text-center">
                <FlowerDeco className="w-20 h-20 mx-auto text-cream-light opacity-10" />
                <p className="font-display font-bold text-6xl text-cream-light/10 mt-2">E&amp;E</p>
                <p className="text-[9px] tracking-widest uppercase text-cream-light/20 mt-2">Add /public/images/founder.jpg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT TRUST BAR ──────────────────────────────────────────────── */}
      <section className="bg-cream-light py-6 px-6 md:px-12 border-y border-sand">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <p className="text-[10px] tracking-widest uppercase text-slate font-semibold">Secure checkout via</p>
          {[
            { label: 'UPI',                 icon: '📱', note: 'Google Pay · PhonePe · Paytm' },
            { label: 'Indian Cards',        icon: '💳', note: 'Visa · Mastercard · RuPay' },
            { label: 'International Cards', icon: '🌍', note: 'Visa · Mastercard · Amex' },
            { label: 'Net Banking',         icon: '🏦', note: 'All major banks' },
          ].map(({ label, icon, note }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-lg">{icon}</span>
              <span className="text-[9px] font-semibold text-forest tracking-wide">{label}</span>
              <span className="text-[8px] text-slate">{note}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[9px] text-slate">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Powered by Razorpay
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="section text-center relative overflow-hidden" style={{ background: '#F0DDD0' }}>
        <CircleDeco className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 text-terra opacity-10 pointer-events-none" />
        <FlowerDeco className="absolute left-8 top-8 text-olive w-16 h-16 opacity-8 pointer-events-none" style={{ opacity: 0.08 }} />
        <HerbSprig className="absolute right-8 bottom-4 text-terra w-8 h-20 opacity-10 pointer-events-none sway" />
        <p className="text-[10px] tracking-widest uppercase text-terra font-semibold mb-4">Free shipping on orders over ₹999 / $40</p>
        <h2 className="font-display font-bold text-forest text-4xl md:text-5xl mb-6 relative">
          Ready to switch to clean?
        </h2>
        <Link href="/shop" className="btn-primary">Explore All Products</Link>
      </section>
    </>
  )
}
