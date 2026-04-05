import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-forest overflow-hidden pt-32 pb-24 px-6 md:px-12 lg:px-20">
        {/* Botanical blobs */}
        <div className="absolute -left-32 top-0 w-80 h-80 bg-olive/20 blob-1 pointer-events-none" />
        <div className="absolute -right-24 bottom-0 w-64 h-64 bg-sage/10 blob-2 pointer-events-none" />

        {/* Leaf SVG decorations */}
        <svg className="leaf-deco" style={{ top: 40, right: 200, width: 120, height: 120 }}
          viewBox="0 0 120 120" fill="currentColor" style={{ color: '#8FA872', opacity: 0.08, position: 'absolute', top: 40, right: 200, width: 120, height: 120, pointerEvents: 'none' }}>
          <ellipse cx="60" cy="60" rx="45" ry="25" transform="rotate(-30 60 60)"/>
        </svg>

        <div className="max-w-3xl mx-auto relative text-center">
          <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-4">Our Story</p>
          <h1 className="font-display font-bold text-cream text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Made with hands.<br/>
            <span className="italic text-sage-light">Made with love.</span>
          </h1>
          <p className="text-cream/70 text-base leading-relaxed max-w-xl mx-auto">
            Earth & Essence Co. was born in a kitchen — from a mother's desire to know exactly
            what goes on her family's skin. No fillers, no shortcuts, no compromises.
          </p>
        </div>
      </section>

      {/* ── The story ───────────────────────────────────────────────────────── */}
      <section className="section max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual placeholder */}
          <div className="relative aspect-square max-w-lg rounded-sm overflow-hidden bg-sand/40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="font-display font-bold text-6xl text-forest/10">E&amp;E</p>
                <p className="text-[10px] tracking-widest uppercase text-forest/20 mt-2">Founder photo</p>
              </div>
            </div>
            {/* Accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-olive" />
            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-forest/80 backdrop-blur-sm px-5 py-4">
              <p className="font-display italic text-cream text-sm">"I wanted to know every ingredient touching my family's skin."</p>
              <p className="text-sage text-[10px] tracking-wide mt-1">— Founder, Earth &amp; Essence Co.</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-olive font-semibold mb-4">How it began</p>
            <h2 className="font-display font-bold text-forest text-3xl md:text-4xl leading-tight mb-6">
              A kitchen, a dream,<br/>and the right botanicals.
            </h2>

            <div className="space-y-5 text-slate text-sm leading-relaxed">
              <p>
                What started as experimenting with herbs and cold-pressed oils at home grew into something
                our friends and family couldn't stop asking about. The feedback was always the same:
                <em className="text-forest"> "What's in this? My skin has never felt this good."</em>
              </p>
              <p>
                Every Earth & Essence product is still made the same way — small batches, carefully sourced
                botanicals, and no ingredients we can't pronounce or wouldn't use ourselves.
              </p>
              <p>
                We source our herbs and plant oils from trusted organic farms across India. Our Ayurvedic
                actives — bhringraj, amla, neem, turmeric — have been used for thousands of years. We just
                believe they deserve better packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream-light px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-3">What We Stand For</p>
            <h2 className="font-display font-bold text-forest text-3xl md:text-4xl">Our Commitments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon:  '🌿',
                title: 'Certified Organic',
                body:  'Every botanical we use is certified organic. No pesticides, no GMOs. We pay more for it because we believe your skin deserves more.',
              },
              {
                icon:  '🤲',
                title: 'Handcrafted Always',
                body:  'We will never scale to the point of losing handcraft. Small-batch means we can control quality at every step.',
              },
              {
                icon:  '🧪',
                title: 'Ingredient Transparency',
                body:  'Every ingredient in every product is listed clearly. If we can\'t explain what it does, it\'s not in our formula.',
              },
              {
                icon:  '♻️',
                title: 'Low-Waste Packaging',
                body:  'Minimal, recyclable materials only. We\'re working toward fully compostable packaging — and getting close.',
              },
              {
                icon:  '🐰',
                title: 'Cruelty-Free',
                body:  'Never tested on animals. Not now, not ever. Our formulas are tested on willing human volunteers — us, our families, and trusted customers.',
              },
              {
                icon:  '🇮🇳',
                title: 'Proudly Indian',
                body:  'Our roots are Ayurvedic. Our herbs are Indian. Our team is Indian. We\'re proud of that heritage and it shows in every bar.',
              },
            ].map(item => (
              <div key={item.title} className="bg-cream p-6 rounded-sm border-t-2 border-sage-light">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-forest text-lg mb-2">{item.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────────── */}
      <section className="section max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-3">From Herb to Hand</p>
          <h2 className="font-display font-bold text-forest text-3xl md:text-4xl">How We Make Every Bar</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Source',  body: 'We select certified-organic herbs, roots, and plant oils from trusted Indian farms.' },
            { step: '02', title: 'Infuse',  body: 'Botanicals are cold-infused for 2–4 weeks to extract maximum nutrients and actives.' },
            { step: '03', title: 'Craft',   body: 'Each bar is hand-poured using the cold-process method that preserves all nutrients.' },
            { step: '04', title: 'Cure',    body: 'Bars cure for 6–8 weeks until they\'re hard, mild, and ready for your skin.' },
          ].map(item => (
            <div key={item.step} className="relative">
              <p className="font-display font-bold text-6xl text-forest/5 mb-2 leading-none">{item.step}</p>
              <div className="h-0.5 w-8 bg-olive mb-4" />
              <h3 className="font-display font-bold text-forest text-lg mb-2">{item.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-forest px-6 md:px-12 lg:px-20 py-20 text-center">
        <p className="text-[10px] tracking-widest uppercase text-sage font-semibold mb-4">Try It For Yourself</p>
        <h2 className="font-display font-bold text-cream text-3xl md:text-4xl mb-4">
          Feel the difference of <em className="italic text-sage-light">real</em> botanicals.
        </h2>
        <p className="text-cream/60 text-sm mb-8 max-w-md mx-auto">
          No synthetic fragrance. No padding. Just plants, oils, and care — exactly as nature made them.
        </p>
        <Link href="/shop" className="btn-sage inline-flex">
          Shop the Collection →
        </Link>
      </section>
    </div>
  )
}
