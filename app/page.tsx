import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Truck, Factory, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        <div className="container relative z-20 mx-auto px-4 text-white text-center md:text-left">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight animate-fade-in uppercase tracking-tighter">Your Eyes in China.<br /><span className="text-primary-500">Global Standards.</span></h1>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl text-slate-300 leading-relaxed">Protect your global supply chain with our elite inspection services, factory audits, and logistics supervision. Professionalism you can trust.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="/order" className="rounded-full bg-primary-600 px-10 py-5 text-xl font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-2xl hover:scale-105 active:scale-95">Book Now</a>
              <a href="/aql-calculator" className="rounded-full border-2 border-white/50 bg-white/5 px-10 py-5 text-xl font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">AQL Calculator</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary-600 font-black uppercase tracking-widest text-sm mb-4 block">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Elite Inspection Solutions for Global Importers</h2>
            </div>
            <a href="/services" className="text-lg font-bold border-b-2 border-primary-600 pb-2 hover:text-primary-600 transition-colors">See all services →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard 
              icon={<Factory className="w-16 h-16 text-primary-600 mb-4" />}
              title="Factory Audit (FA)"
              description="Full verification of supplier legitimacy, production capabilities, and ISO compliance. Know who you are dealing with."
              link="/services/factory-audit"
            />
            <ServiceCard 
              icon={<Search className="w-16 h-16 text-primary-600 mb-4" />}
              title="Pre-shipment (PSI)"
              description="The standard quality check before your products leave. 100% compliance guaranteed or refuse shipment."
              link="/services/psi"
            />
            <ServiceCard 
              icon={<Truck className="w-16 h-16 text-primary-600 mb-4" />}
              title="Loading Supervision"
              description="Final loading and container sealing. We ensure the quantity is right and the goods are packed for survival."
              link="/services/cls"
            />
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <span className="text-primary-600 font-black uppercase tracking-widest text-sm mb-4 block">The Muzhuo Advantage</span>
              <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight uppercase tracking-tighter">Uncompromising<br />Quality Control.</h2>
              <div className="space-y-10">
                <FeatureItem 
                  title="Unbiased & Independent" 
                  description="We act exclusively as your eyes and ears on the ground. No kickbacks, no compromises, only the truth about your production." 
                />
                <FeatureItem 
                  title="24H Report Turnaround" 
                  description="Time is money. Our comprehensive digital reports are delivered within 24 hours of inspection, featuring high-res photos and video." 
                />
                <FeatureItem 
                  title="Global Payment Standards" 
                  description="Seamlessly secure your orders with PayPal, Credit Cards, or Apple Pay. No more complex wire transfers for small inspection fees." 
                />
              </div>
            </div>
            <div className="flex-1 bg-white p-12 rounded-[2rem] shadow-2xl border-t-8 border-primary-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="w-40 h-40 text-slate-900" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <ShieldCheck className="w-12 h-12 text-green-500" />
                  <h3 className="text-2xl font-black uppercase tracking-tight">100% Integrity Guarantee</h3>
                </div>
                <p className="text-xl text-slate-600 mb-10 italic leading-relaxed">"Muzhuo saved us from a potential disaster by identifying critical functional defects in our electronics order before it left Shenzhen. Their attention to detail is the benchmark for QC in China."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-black text-primary-600">JT</div>
                  <div>
                    <p className="font-black uppercase tracking-tight">James T. Harrison</p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Director of Global Sourcing, TechNova UK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 text-white">
        <Image 
          src="/Banner_optimized.webp"
          alt="Inspection facility background"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div className="container relative mx-auto px-4 text-center z-20">
          <h2 className="text-3xl font-bold mb-8">Ready to secure your supply chain?</h2>
          <a href="/order" className="inline-block rounded-full bg-white text-primary-600 px-12 py-4 text-xl font-bold hover:bg-slate-100 transition-all shadow-lg">Book a Free Consultation</a>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon, title, description, link }: { icon: any, title: string, description: string, link: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-slate-100">
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      <a href={link} className="text-primary-600 font-semibold hover:underline">Learn More →</a>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
      <div>
        <h4 className="text-lg font-bold mb-1">{title}</h4>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  )
}
