import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pre-shipment Inspection (PSI) China - Muzhuo Inspection',
  description: 'Thorough quality control before your products leave the factory. PSI ensures 100% compliance with your requirements.',
}

export default function PSI() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Pre-shipment Inspection (PSI)</h1>
        <div className="prose max-w-none text-slate-700 space-y-6">
          <p className="text-xl">Protect your brand and reduce returns. Our PSI service is performed when 100% of the production is finished and at least 80% is packed.</p>
          
          <h2 className="text-2xl font-bold">Why you need it?</h2>
          <p>The cost of correcting quality issues in the destination country is significantly higher. Detect issues early and refuse shipment of non-compliant products.</p>
          
          <h3 className="text-xl font-bold">What we check:</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li>Quantity Check (Final counts)</li>
            <li>Workmanship and Aesthetics (Defects)</li>
            <li>Product Functionality and Performance</li>
            <li>Packaging and Labeling Compliance</li>
            <li>Safety Testing (Basic field tests)</li>
          </ul>

          <div className="bg-primary-50 p-8 rounded-xl border-l-4 border-primary-600">
            <h4 className="font-bold mb-2">Service Details:</h4>
            <p className="mb-4">*Price: $199 USD (Standard PSI)</p>
            <a href="/order?service=psi" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">Book PSI Now</a>
          </div>
          <p className="text-sm text-slate-600 mt-4">For bulk orders or long-term cooperation, please <a href="/contact" className="underline hover:text-primary-600">Contact Us</a> for a custom quote.</p>
        </div>
      </div>
    </div>
  )
}
