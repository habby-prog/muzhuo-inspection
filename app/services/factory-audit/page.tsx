import type { Metadata } from 'next'
import { pageMetadata } from '../../lib/meta'
import { SITE_URL } from '../../lib/site'

export const metadata: Metadata = pageMetadata(
  '/services/factory-audit',
  'Factory Audit in China: Supplier Verification | Muzhuo Inspection',
  'Factory audit in China: legal entity, capacity, equipment, quality system and working conditions verified on site, with a photo report in Chinese and English.',
)

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is a factory audit?',
    a: 'A factory audit is an on-site assessment of a supplier before you place an order, or of an existing supplier at intervals. An auditor visits the site, verifies the legal entity against its licence, walks the production lines, checks equipment, the quality system and the workforce, photographs the evidence, and reports what is actually there rather than what the sales office says is there.',
  },
  {
    q: 'How is a factory audit different from a supplier verification?',
    a: 'A supplier verification usually confirms identity and existence: the company is registered, the address is real, and someone answers. A factory audit goes further and judges capability: what the site can produce, on what equipment, with what quality controls and what capacity. Verification answers whether the supplier is real; an audit answers whether it can do your order.',
  },
  {
    q: 'Do you issue ISO certificates?',
    a: 'No. We observe and report whether a quality management system is in place and whether it is followed in practice, but we are not a certification body and do not issue ISO 9001 or any other certificate. If a supplier claims a certificate, we record the certificate number and issuer and note whether the scope matches what they actually produce.',
  },
  {
    q: 'Can you audit a trading company?',
    a: 'Yes, but the report has to be clear about what was audited. A trading company may have an office and no production line, in which case the audit covers its sourcing, supplier control and inspection arrangements, and states that no manufacturing was observed. If production is outsourced, tell us at booking so the audit can be scoped to the right site.',
  },
  {
    q: 'What does the report look like?',
    a: 'It contains the site details, the legal entity and licence evidence, photos of the premises, production lines and equipment, a section-by-section findings table with each finding classified, and a photo appendix with dated images. Reports can be issued in Chinese, English, or both in one document, so the buyer and the supplier can read the same evidence.',
  },
  {
    q: 'Do you audit outside China?',
    a: 'No. At present we only carry out factory audits inside mainland China. If your supplier is outside China, this service is not available.',
  },
]

export default function FactoryAudit() {
  const pageUrl = `${SITE_URL}/services/factory-audit`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Factory Audit',
    name: 'Factory Audit in China',
    description:
      'On-site factory audit in China covering legal entity, production capacity, equipment, quality system and working conditions, with a photo report in Chinese and English.',
    provider: { '@type': 'Organization', name: 'Muzhuo Inspection', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'China' },
    url: pageUrl,
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Factory Audit', item: pageUrl },
    ],
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex mb-8 text-sm text-slate-400" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-slate-300">Factory Audit</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            Factory Audit in China
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            Before you wire a deposit, you want to know what is actually behind the quotation. We
            visit the site, verify the entity, walk the line, check the quality system and photograph
            the evidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="/order?service=factory-audit" className="rounded-full bg-primary-600 px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-primary-700 transition-colors text-center">
              Book an Audit
            </a>
            <a href="/contact" className="rounded-full border border-white/40 px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-colors text-center">
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose max-w-none text-slate-700 space-y-6">
            <p className="text-lg leading-8">
              A factory audit is a decision tool, not a certificate. It tells you whether the company
              exists as described, whether the site can produce your product at the volume you need,
              whether the quality controls are real or only written down, and what you would be
              relying on if you placed the order. The output is evidence: licence details, photographs,
              observations and findings you can act on.
            </p>

            <h2 className="text-2xl font-bold pt-4">When an audit makes sense</h2>
            <h3 className="text-xl font-bold pt-2">A new supplier</h3>
            <p>
              The most common case. A quotation, a website and a few product photos are not evidence
              of a factory. An audit before the first deposit separates a real manufacturer from a
              trading company with a rented office, and gives you a baseline to compare later.
            </p>
            <h3 className="text-xl font-bold pt-2">An existing supplier</h3>
            <p>
              Suppliers change: equipment is sold, key staff leave, a second workshop opens, volume is
              pushed onto a line that was never designed for it. A periodic audit is a check that the
              supplier you qualified is still the supplier you are buying from.
            </p>
            <h3 className="text-xl font-bold pt-2">A triggered audit</h3>
            <p>
              Repeated quality failures, a sudden price drop, a change of address, a new subcontractor,
              or a certificate that does not match the product are all reasons to look rather than
              argue. An audit turns a suspicion into a documented finding.
            </p>

            <h2 className="text-2xl font-bold pt-4">What we check</h2>

            <h3 className="text-xl font-bold pt-2">1. Legal entity and ownership</h3>
            <p>
              Business licence, registered name, address, legal representative, registered capital,
              scope of business and operating status. The licence is photographed, and the name on the
              licence is compared with the name on the quotation and the bank account. Mismatches are
              recorded, because paying a company that is not the company you contracted is a common
              and expensive mistake.
            </p>

            <h3 className="text-xl font-bold pt-2">2. Premises and production capacity</h3>
            <p>
              The site is inspected for size, layout, ownership or lease, warehouse space, loading
              access and the number of production lines. Capacity is assessed from the equipment and
              the shift pattern, not from a number in a brochure. Where a supplier claims a capacity
              that the site cannot support, the report says so and shows the basis.
            </p>

            <h3 className="text-xl font-bold pt-2">3. Equipment and maintenance</h3>
            <p>
              Machines are listed by type and condition; key equipment is checked for maintenance
              records, calibration where relevant, and whether it is actually in use. Idle or
              dismantled equipment is noted, since a factory that once had a line is not a factory
              that currently runs it.
            </p>

            <h3 className="text-xl font-bold pt-2">4. Quality system and incoming inspection</h3>
            <p>
              We look for a documented quality system and, more importantly, for evidence that it is
              followed: incoming material checks, in-process checks, final inspection records, defect
              logs, calibration records, corrective actions and traceability. A folder of procedures
              with no records behind it is reported as exactly that.
            </p>

            <h3 className="text-xl font-bold pt-2">5. Workforce and key processes</h3>
            <p>
              Staff numbers by function, whether production is in-house or subcontracted, and how the
              key processes for your product are actually performed. For products where a process
              cannot be verified by looking at the finished item — welding, heat treatment, plating,
              assembly torque — the audit records who does it and how it is controlled.
            </p>

            <h3 className="text-xl font-bold pt-2">6. Working conditions and environment</h3>
            <p>
              Observable conditions are recorded: safety exits, protective equipment, chemical storage,
              waste handling, lighting and housekeeping. This is an observation, not a social compliance
              certification. It matters because poor conditions tend to correlate with poor process
              control, and because your own customers may ask you about them.
            </p>

            <h2 className="text-2xl font-bold pt-4">What audits usually turn up</h2>
            <p>
              The findings are rarely fraud. More often they are gaps between what a supplier believes
              about its own operation and what the site shows:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>A licence that does not cover the activity.</strong> The company is registered, but the scope does not include the process being sold.</li>
              <li><strong>No incoming inspection records.</strong> Materials are accepted on the supplier's word, so a material change is invisible until the finished goods fail.</li>
              <li><strong>Calibration expired or absent.</strong> Measuring equipment is in use but cannot be shown to be accurate.</li>
              <li><strong>Capacity sold beyond the line.</strong> The order book assumes a second shift or a subcontractor that does not exist.</li>
              <li><strong>Undisclosed subcontracting.</strong> A key process leaves the site and comes back, with no incoming check when it returns.</li>
            </ul>

            <h2 className="text-2xl font-bold pt-4">How findings are reported</h2>
            <p>
              Each finding is classified as critical, major or minor, with a photograph and a factual
              description of what was seen. Critical findings are the ones that would stop you placing
              an order — a different legal entity, no production line for the product, a licence that
              does not cover the activity. Major findings affect capability or control and need a
              corrective action before or during production. Minor findings are improvements. The
              classification is agreed at booking so the report matches your risk appetite.
            </p>

            <h2 className="text-2xl font-bold pt-4">The report</h2>
            <p>
              The report contains site and entity details, a company profile, the audit findings by
              section, the photo appendix with dated images, and a summary that states the auditor's
              conclusion and the limits of what was verified. It can be issued in Chinese, English, or
              both in one document. Photos are part of the report, not decoration: they are the
              evidence behind each finding.
            </p>

            <h2 className="text-2xl font-bold pt-4">What a factory audit is not</h2>
            <p>
              It is not an ISO certification, not a financial or credit report, and not a product test.
              It does not guarantee future quality, and it does not replace a pre-shipment inspection
              of the actual order. It also does not verify the supplier's customers or export history
              beyond what the site can show. If you need those, they are separate checks.
            </p>

            <h2 className="text-2xl font-bold pt-4">Where we audit</h2>
            <p>
              Inside mainland China only. We do not currently provide audits outside China. If your
              supplier is in China, we can visit the site; if production is split across several
              factories, each site is scoped and quoted separately.
            </p>

            <h2 className="text-2xl font-bold pt-4">What to send when you book</h2>
            <ul className="list-disc pl-8 space-y-2">
              <li>The supplier's registered name, address and contact</li>
              <li>The product and process you intend to buy, and the expected order volume</li>
              <li>Any specific concern you want the auditor to test</li>
              <li>Whether the supplier is a manufacturer, a trading company or both</li>
              <li>Any checklist or customer requirement the audit must follow</li>
            </ul>

            <div className="bg-primary-50 p-8 rounded-xl border-l-4 border-primary-600 mt-8">
              <h4 className="font-bold mb-2">Service details</h4>
              <p className="mb-4">Standard factory audit: $299 USD. Multi-site, follow-up or programme audits are quoted separately.</p>
              <a href="/order?service=factory-audit" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">Book Audit Now</a>
            </div>

            <h2 className="text-2xl font-bold pt-8">Frequently asked questions</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-bold">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>

            <p className="pt-6">
              Related reading: <a href="/blog/factory-audit-china-importers-guide" className="underline hover:text-primary-600">factory audit guide for importers</a>,{' '}
              <a href="/blog/how-to-choose-quality-inspection-company-china-red-flags" className="underline hover:text-primary-600">how to choose an inspection company</a>, and{' '}
              <a href="/blog/quality-control-vs-quality-assurance-importers" className="underline hover:text-primary-600">quality control vs quality assurance</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
