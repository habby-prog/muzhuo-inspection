import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Container Loading Supervision (CLS) China - Muzhuo Inspection',
  description: 'Secure your goods and ensure correct loading with our CLS services. We supervise the loading process and check the container condition.',
}

export default function CLS() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Container Loading Supervision (CLS)</h1>
        <div className="prose max-w-none text-slate-700 space-y-6">
          <p className="text-xl">The final step before your products are shipped. Our CLS service ensures that the correct goods are loaded into the container and shipped securely.</p>
          
          <h2 className="text-2xl font-bold">Why you need it?</h2>
          <p>Supervision prevents damage during transportation and ensures that the factory doesn't swap your quality-checked goods for non-compliant ones.</p>
          
          <h3 className="text-xl font-bold">What we check:</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li>Container Condition (Cleanliness, dryness, no holes)</li>
            <li>Verification of Quantity (Correct counts loaded)</li>
            <li>Correct Loading and Securing of Goods</li>
            <li>Final Sealing of the Container with Official Seals</li>
            <li>Photo Documentation of the entire process</li>
          </ul>

          <div className="bg-primary-50 p-8 rounded-xl border-l-4 border-primary-600">
            <h4 className="font-bold mb-2">Service Details:</h4>
            <p className="mb-4">*Price: $149 USD (Standard CLS)</p>
            <a href="/order?service=cls" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">Book CLS Now</a>
          </div>
          <p className="text-sm text-slate-600 mt-4">For bulk orders or long-term cooperation, please <a href="/contact" className="underline hover:text-primary-600">Contact Us</a> for a custom quote.</p>
        </div>
      </div>
    </div>
  )
}
