import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Muzhuo Inspection',
  description: 'Understand the terms and conditions that govern our relationship with you.',
}

export default function TermsOfService() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By using the website (muzhuoinspection.com) or our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Services</h2>
          <p>Muzhuo Inspection provides professional quality control and factory audit services in China, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Factory Audits (FA)</li>
            <li>Pre-shipment Inspections (PSI)</li>
            <li>Container Loading Supervision (CLS)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Ordering and Payment</h2>
          <p>Orders for our services must be placed through our online booking system or via email. Payment is required in full before the service is provided, unless otherwise agreed upon in writing. We accept payments via PayPal, credit cards, and Apple Pay.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Cancellation and Refunds</h2>
          <p>Cancellations must be made at least 24 hours before the scheduled inspection date to receive a full refund. Cancellations made less than 24 hours in advance may be subject to a cancellation fee.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Disclaimer and Limitation of Liability</h2>
          <p>Our inspection reports reflect our findings at the time and place of inspection. We do not guarantee the overall quality of any batch beyond the sampled items. Muzhuo Inspection shall not be liable for any indirect, incidental, or consequential damages arising from our services.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
          <p>All content on our website, including logos, text, and images, is the property of Muzhuo Inspection and is protected by international copyright laws.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Governing Law</h2>
          <p>These terms are governed by and construed in accordance with the laws of the People's Republic of China, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to Terms</h2>
          <p>We reserve the right to revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms.</p>
        </div>
      </div>
    </div>
  )
}
