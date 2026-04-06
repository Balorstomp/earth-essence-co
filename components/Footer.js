import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <p className="font-display font-bold text-cream text-lg tracking-widest uppercase mb-1">
            Earth &amp; Essence
          </p>
          <p className="text-cream/50 text-[9px] tracking-widest uppercase mb-4">Co. — Organic Skincare</p>
          <p className="text-sm leading-relaxed text-cream/70 max-w-xs">
            Small-batch, handcrafted skincare made with love and botanical ingredients.
            No sulphates. No parabens. No compromise.
          </p>

          {/* Leaf divider */}
          <div className="mt-6 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-sage opacity-60">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.7 2 6.9 5 8.7V22l3-2 2 2 2-2 3 2v-1.3c3-1.8 5-5 5-8.7C22 6.5 17.5 2 12 2z" fill="currentColor"/>
            </svg>
            <span className="text-[9px] tracking-widest uppercase text-cream/40">Pure · Natural · Handmade</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[9px] tracking-widest uppercase text-sage mb-5 font-semibold">Explore</h4>
          <nav className="flex flex-col gap-3">
            {[
              { href: '/shop',               label: 'Shop All Products' },
              { href: '/shop?cat=hair-soap', label: 'Hair Soaps' },
              { href: '/shop?cat=skin-soap', label: 'Skin Soaps' },
              { href: '/shop?cat=face-cream',label: 'Face Creams' },
              { href: '/about',              label: 'Our Story' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact & trust */}
        <div>
          <h4 className="text-[9px] tracking-widest uppercase text-sage mb-5 font-semibold">Get in Touch</h4>
          <div className="flex flex-col gap-3 text-sm text-cream/60">
            <p>Questions? We'd love to hear from you.</p>
            <a href="mailto:hello@earthandessence.co" className="hover:text-cream transition-colors duration-200">
              hello@earthandessence.co
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors duration-200">
              WhatsApp Us
            </a>
          </div>

          <div className="mt-8">
            <h4 className="text-[9px] tracking-widest uppercase text-sage mb-3 font-semibold">We Accept</h4>
            <div className="flex flex-wrap gap-2">
              {['Visa', 'Mastercard', 'UPI', 'Google Pay', 'PhonePe', 'Amex'].map(m => (
                <span key={m} className="text-[9px] tracking-wide border border-cream/20 text-cream/50 px-2 py-1 rounded-sm">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-cream/30 tracking-wide">
            © {new Date().getFullYear()} Earth &amp; Essence Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms',   label: 'Terms' },
              { href: '/returns', label: 'Returns' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-[10px] tracking-wide text-cream/30 hover:text-cream/60 transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
