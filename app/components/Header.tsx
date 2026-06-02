'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/aql-calculator', label: 'AQL Calculator' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // close mobile menu on popstate (browser back/forward)
  useEffect(() => {
    const handleRoute = () => setMobileOpen(false)
    window.addEventListener('popstate', handleRoute)
    return () => window.removeEventListener('popstate', handleRoute)
  }, [])

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between mx-auto px-4">
        <a href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/order"
            className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-all shadow-md"
          >
            Book Online
          </a>

          {/* Hamburger button – mobile only */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-primary-600 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {/* hamburger icon */}
            <svg
              className={`h-6 w-6 transition-all duration-200 ${mobileOpen ? 'rotate-90 opacity-0 scale-75' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/* X icon */}
            <svg
              className={`absolute h-6 w-6 transition-all duration-200 ${mobileOpen ? '' : '-rotate-90 opacity-0 scale-75'}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col border-t bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
