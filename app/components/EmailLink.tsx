'use client'

import { useEffect, useState } from 'react'

// The address is assembled on the client so Cloudflare's Email Obfuscation
// never rewrites it into /cdn-cgi/l/email-protection links (those 404 and
// show up in Search Console as crawl errors).
const LOCAL = 'info'
const DOMAIN = 'muzhuoinspection.com'

export default function EmailLink({ className }: { className?: string }) {
  const [address, setAddress] = useState('')

  useEffect(() => {
    setAddress(LOCAL + String.fromCharCode(64) + DOMAIN)
  }, [])

  if (!address) return <span className={className}>Email us</span>

  return (
    <a className={className} href={'mailto:' + address}>
      {address}
    </a>
  )
}
