import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factory Audit China - Muzhuo Inspection',
  description: 'Thorough factory audit services in China. Evaluate your suppliers legitimacy, reliability, and quality standards.',
}

export default function FactoryAudit() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Factory Audit (FA)</h1>
        <div className="prose max-w-none text-slate-700 space-y-6">
          <p className="text-xl">Selecting the right supplier is the first step to a successful business. Our Factory Audit (FA) service provides a comprehensive assessment of your potential or current suppliers in China.</p>
          
          <h2 className="text-2xl font-bold">Why you need it?</h2>
          <p>Don't just take their word for it. Our auditors physically visit the factory to verify that they are who they say they are and can perform at the level you require.</p>
          
          <h3 className="text-xl font-bold">Key Checkpoints:</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li>Factory Profile and Legitimacy (Licenses, ownership)</li>
            <li>Production Capacity and Equipment Maintenance</li>
            <li>Quality Control Systems (ISO 9001 compliance)</li>
            <li>Working Conditions and Social Responsibility</li>
            <li>Environmental Compliance</li>
          </ul>

          <div className="bg-primary-50 p-8 rounded-xl border-l-4 border-primary-600">
            <h4 className="font-bold mb-2">Service Details:</h4>
            <p className="mb-4">*Price: $299 USD (Standard Factory Audit)</p>
            <a href="/order?service=factory-audit" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">Book Audit Now</a>
          </div>
          <p className="text-sm text-slate-600 mt-4">For bulk orders or long-term cooperation, please <a href="/contact" className="underline hover:text-primary-600">Contact Us</a> for a custom quote.</p>
        </div>
      </div>
    </div>
  )
}
