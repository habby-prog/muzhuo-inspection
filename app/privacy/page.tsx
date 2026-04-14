import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Muzhuo Inspection',
  description: 'Your privacy is important to us. Learn how we handle your information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p>Muzhuo Inspection ("we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website (muzhuoinspection.com) and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect information you provide directly to us when you request an inspection, use our contact forms, or create an account. This may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details (name, email address, phone number).</li>
            <li>Business information (company name, address, product details).</li>
            <li>Payment information (processed securely through third-party providers like PayPal).</li>
            <li>Files and attachments related to your inspection orders.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send related information.</li>
            <li>Communicate with you about orders, services, and support.</li>
            <li>Ensure compliance with legal requirements and our terms.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
          <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are encrypted and processed through secure third-party gateways.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
          <p>Our website uses third-party services for payments (PayPal) and analytics. These third parties have their own privacy policies, and we recommend you review them.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
          <p className="font-bold">Email: info@muzhuoinspection.com</p>
          <p className="font-bold">Phone: +86 166 2170 4642</p>
        </div>
      </div>
    </div>
  )
}
