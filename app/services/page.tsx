import Image from 'next/image';
import type { Metadata } from 'next'
import { Factory, Search, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Inspection Services - Muzhuo Inspection',
  description: 'Comprehensive range of inspection services in China, including Factory Audit, Pre-shipment Inspection, and Container Loading Supervision.',
}

export default function ServicesPage() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-primary-600 font-black uppercase tracking-widest text-sm mb-4 block">What We Do</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Our Inspection Services</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">We provide the highest level of quality control to protect your brand and supply chain in China.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ServiceItem 
            icon={<Factory className="w-16 h-16 text-primary-600" />}
            title="Factory Audit (FA)"
            description="Verify your supplier's legitimacy, production capacity, quality management system, and social compliance before you place an order."
            features={['Supplier Verification', 'Quality System Audit', 'Production Capacity', 'Social Compliance']}
            link="/services/factory-audit"
            price="From $299"
          />
          <ServiceItem 
            icon={<Search className="w-16 h-16 text-primary-600" />}
            title="Pre-shipment Inspection (PSI)"
            description="Our most popular service. A comprehensive quality check when production is 100% finished and 80% packed."
            features={['AQL Sampling', 'Functionality Testing', 'Workmanship Check', 'Packaging Verification']}
            link="/services/psi"
            price="From $199"
          />
          <ServiceItem 
            icon={<Truck className="w-16 h-16 text-primary-600" />}
            title="Container Loading Supervision (CLS)"
            description="Ensure the correct products are loaded, the quantity is right, and the container is sealed securely in our presence."
            features={['Loading Process Monitoring', 'Quantity Verification', 'Container Condition Check', 'Seal Verification']}
            link="/services/cls"
            price="From $149"
          />
        </div>

        <div className="relative mt-20 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/Banner_optimized.webp"
              alt="Custom inspection plan background"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
          </div>
          <div className="relative z-10 bg-black bg-opacity-60 p-12 text-white text-center">
            <h2 className="text-3xl font-black uppercase mb-6">Need a custom inspection plan?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">We offer tailored solutions for complex products and unique requirements. Contact our experts today.</p>
            <a href="/contact" className="inline-block bg-primary-600 text-white font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-primary-700 transition-all">Get a Custom Quote</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceItem({ icon, title, description, features, link, price }: any) {
  return (
    <div className="border-2 border-slate-50 p-10 rounded-3xl hover:border-primary-100 hover:shadow-2xl transition-all group flex flex-col h-full">
      <div className="mb-8 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 mb-8 flex-grow">{description}</p>
      <ul className="space-y-3 mb-10">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xl font-black text-primary-600">{price}</span>
        <a href={link} className="font-black uppercase text-sm tracking-widest border-b-2 border-slate-900 hover:text-primary-600 hover:border-primary-600 transition-all pb-1">Details →</a>
      </div>
    </div>
  )
}
