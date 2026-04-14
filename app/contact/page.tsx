import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Muzhuo Inspection - Get in Touch',
  description: 'Have questions about our inspection services in China? Contact our team for support.',
}

export default function Contact() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose max-w-none text-slate-700 space-y-6">
            <h2 className="text-2xl font-bold">How can we help?</h2>
                          <p className="text-lg text-slate-600 mb-6">
                If you have any questions, ask for report samples, or request a custom quote, please feel free to contact us. Our team is <strong>available 24/7</strong> to support you.
              </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <span className="font-bold w-24 shrink-0">Email:</span>
                <a href="mailto:info@muzhuoinspection.com" className="text-primary-600 hover:underline">info@muzhuoinspection.com</a>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold w-24 shrink-0">Phone:</span>
                <span>+86 166 2170 4642 (WhatsApp & WeChat)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold w-24 shrink-0">Address:</span>
                <span>R522, Building 2, Jiading Innovation Harbor, No. 568 Antuo Road, Anting Town, Jiading District, Shanghai, China, 201805</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Name</label>
                  <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-primary-600" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Email</label>
                  <input type="email" className="w-full border p-2 rounded focus:ring-2 focus:ring-primary-600" placeholder="Your Email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Company Name</label>
                <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-primary-600" placeholder="Your Company Name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Message</label>
                <textarea rows={4} className="w-full border p-2 rounded focus:ring-2 focus:ring-primary-600" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white font-bold py-2 rounded hover:bg-primary-700">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
