
import type { Metadata } from 'next';
import { Briefcase, ShieldCheck, Zap, Globe, Star, Users, ClipboardCheck, Clock } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Muzhuo Inspection - Your Trusted China Inspection Partner',
  description: 'Learn more about Muzhuo Inspection, our values, and our commitment to quality control in China.',
};

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string; label: string }) => (
  <div className="text-center text-white">
    <Icon className="h-10 w-10 mx-auto mb-3" />
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm opacity-80">{label}</p>
  </div>
);

const AdvantageCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="bg-slate-50 p-6 rounded-lg text-center">
    <Icon className="h-10 w-10 text-primary-600 mx-auto mb-4" />
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{children}</p>
  </div>
);



const TestimonialCard = ({ quote, author, company }: { quote: string; author: string; company: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 w-5 h-5" fill="currentColor" />
            ))}
        </div>
        <p className="text-slate-600 mb-4">"{quote}"</p>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-slate-500">{company}</p>
    </div>
);


export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="w-full bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Trusted Quality Inspections Across China</h1>
          <p className="text-xl mb-12">Your reliable partner for quality control and supply chain security.</p>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatCard icon={Users} value="500+" label="Clients Served" />
            <StatCard icon={ClipboardCheck} value="10,000+" label="Inspections Completed" />
            <StatCard icon={Clock} value="24h" label="Report Turnaround" />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Muzhuo Team" width={500} height={350} className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.7 }}>
                Our mission is to provide a comprehensive suite of services, including factory audits, inspections, and container loading supervision. Our factory audits protect your supply chain by preventing fraud at the source, while our loading supervision significantly shortens customs clearance times. We are committed to being your eyes and ears on the ground, ensuring your production standards are met with precision and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Muzhuo */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Muzhuo?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AdvantageCard icon={Briefcase} title="Deep Expertise">
              Our inspectors have over 10 years of experience in a wide range of industries.
            </AdvantageCard>
            <AdvantageCard icon={ShieldCheck} title="Unwavering Reliability">
              We pride ourselves on accuracy, integrity, and transparent communication.
            </AdvantageCard>
            <AdvantageCard icon={Zap} title="Speed and Efficiency">
              Receive comprehensive inspection reports within 24 hours of completion.
            </AdvantageCard>
            <AdvantageCard icon={Globe} title="Global Standards">
              We operate under the highest international quality standards, including ISO 9001.
            </AdvantageCard>
          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard 
                  quote="Muzhuo's team is professional, efficient, and their reports are incredibly detailed. They are our trusted partner in China."
                  author="Michael Johnson"
                  company="CEO, Global Imports Inc."
              />
              <TestimonialCard 
                  quote="We had an urgent shipment, and Muzhuo's local inspector was on-site within hours. Their ability to handle last-minute inspections is a lifesaver."
                  author="Jessica Miller"
                  company="Operations Head, Rapid Logistics"
              />
              <TestimonialCard 
                  quote="Working with Muzhuo has been a seamless experience. Their inspectors are knowledgeable and their platform is easy to use."
                  author="David Chen"
                  company="Owner, DC Electronics"
              />
              <TestimonialCard 
                  quote="Their container loading supervision in Mexico and Russia is top-notch. The detailed reports gave us complete peace of mind."
                  author="Alexey Volkov"
                  company="Logistics Manager, Global Cargo Solutions"
              />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
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
          <a href="/order" className="inline-block rounded-full bg-white text-primary-600 px-12 py-4 text-xl font-bold hover:bg-slate-100 transition-all shadow-lg">Free Consulation Now</a>
        </div>
      </section>
    </div>
  );
}
