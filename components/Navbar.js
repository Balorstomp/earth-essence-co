'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-cream-light/95 backdrop-blur-md shadow-sm border-b border-sand'
        : 'bg-cream'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-display font-bold text-forest text-sm md:text-base tracking-widest uppercase leading-none block">
              Earth &amp; Essence
            </span>
            <span className="text-slate text-[9px] tracking-widest uppercase block mt-0.5">
              Co. — Organic Skincare
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: '/shop',  label: 'Shop'  },
              { href: '/about', label: 'Our Story' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className={`text-[10px] tracking-widest uppercase font-semibold transition-colors duration-200 ${
                  pathname === href ? 'text-forest border-b border-forest pb-0.5' : 'text-slate hover:text-forest'
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart"
              className="relative flex items-center gap-2 text-forest hover:text-olive transition-colors duration-200"
              aria-label={`Cart (${itemCount} items)`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-forest text-cream-light text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
              <span className={`block h-px w-6 bg-forest transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-6 bg-forest transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-forest transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-48 border-t border-sand' : 'max-h-0'}`}>
        <nav className="bg-cream px-6 py-5 flex flex-col gap-5">
          {[
            { href: '/shop',  label: 'Shop' },
            { href: '/about', label: 'Our Story' },
            { href: '/cart',  label: `Cart (${itemCount})` },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-xs tracking-widest uppercase font-semibold text-forest">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
