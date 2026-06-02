import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Muzhuo Inspection - Professional Quality Control & Factory Audit Services',
  description: 'Expert quality inspection services in China, including Factory Audit, Pre-shipment Inspection (PSI), and Container Loading Supervision (CLS). Reliable, fast, and secure payment.',
  keywords: ['Factory Audit', 'Pre-shipment Inspection', 'PSI', 'Container Loading Supervision', 'CLS', 'Quality Control China', 'Inspection Service'],
  openGraph: {
    title: 'Muzhuo Inspection - Professional Quality Control',
    description: 'Expert inspection services in China. Protecting your global supply chain.',
    url: 'https://muzhuoinspection.com',
    siteName: 'Muzhuo Inspection',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Muzhuo Inspection",
    "description": "Professional quality control and factory audit services in China.",
    "url": "https://muzhuoinspection.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R522, Building 2, Jiading Innovation Harbor, No. 568 Antuo Road, Anting Town, Jiading District",
      "addressLocality": "Shanghai",
      "addressRegion": "Shanghai",
      "postalCode": "201805",
      "addressCountry": "China"
    },
    "serviceType": ["Factory Audit", "Pre-shipment Inspection", "Container Loading Supervision"],
    "paymentAccepted": "Credit Card, PayPal, Apple Pay",
    "priceRange": "$$$"
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">Muzhuo Inspection</h3>
            <p className="text-sm text-slate-500">Your trusted partner for quality control and inspection services in China.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/services/factory-audit">Factory Audit</a></li>
              <li><a href="/services/psi">Pre-shipment Inspection</a></li>
              <li><a href="/services/cls">Container Loading Supervision</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>info@muzhuoinspection.com</li>
              <li>+86 166 2170 4642 (WhatsApp & WeChat)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Muzhuo Inspection. All rights reserved.</p>
          <p className="mt-2">muzhuoinspection.com is a leading service brand under Yiwu Muzhuo E-commerce Firm.</p>
        </div>
      </div>
    </footer>
  )
}
