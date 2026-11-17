import type { Metadata } from 'next'
import { pageMetadata } from '../../lib/meta'
import { SITE_URL } from '../../lib/site'

export const metadata: Metadata = pageMetadata(
  '/services/psi',
  'Pre-Shipment Inspection in China (PSI) | Muzhuo Inspection',
  'Pre-shipment inspection in China: AQL sampling, on-site quality checks and a photo report in Chinese and English, before your goods are packed and shipped.',
)

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is a pre-shipment inspection?',
    a: 'A pre-shipment inspection is an on-site check of finished goods at the factory, carried out after production is complete and before the shipment is packed or loaded. An inspector draws a sample using an AQL plan, checks quantity, workmanship, function, dimensions, packaging and marks, photographs what was found, and issues a report you can use to release, rework or reject the lot.',
  },
  {
    q: 'When should I book a PSI?',
    a: 'Book when production is finished and at least 80% of the goods are packed. Inspecting earlier means you are judging a partial lot; inspecting later means the goods may already be in a container and corrections become expensive. The practical rule is to book two to three days before the planned loading date so there is still time to rework if the lot fails.',
  },
  {
    q: 'Do you check every single piece?',
    a: 'Normally no. PSI is a sampling inspection: the sample size and accept/reject numbers come from the lot size and the inspection level you choose, following ISO 2859-1 / ANSI/ASQ Z1.4. For some defects, or for high-value or safety-critical products, a 100% check of specific characteristics can be agreed at booking and is quoted separately.',
  },
  {
    q: 'Can you inspect against my own checklist?',
    a: 'Yes. Send your specification, approved sample photos, packing list and any customer checklist before the inspection date. We build the inspection plan around your requirements and your defect classification, rather than applying a generic checklist. If your document is only in Chinese or only in English, we work from that version and translate the findings in the report.',
  },
  {
    q: 'Is the report in Chinese or English?',
    a: 'The report is issued with photo evidence and can be produced in Chinese, English, or both in the same document. Bilingual reports are the normal choice when the buyer and the factory need to read the same findings, and they avoid arguments caused by a translated summary that says something different from the original.',
  },
  {
    q: 'Do you inspect outside China?',
    a: 'No. At present we only carry out inspections inside mainland China. If your supplier is in China, we can attend the factory; if the goods are already outside China, we are not able to help with this service.',
  },
]

export default function PSI() {
  const pageUrl = `${SITE_URL}/services/psi`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Pre-Shipment Inspection',
    name: 'Pre-Shipment Inspection in China (PSI)',
    description:
      'On-site pre-shipment inspection in China with AQL sampling, photo evidence and a bilingual Chinese/English report.',
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
      { '@type': 'ListItem', position: 3, name: 'Pre-Shipment Inspection', item: pageUrl },
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
              <li className="text-slate-300">Pre-Shipment Inspection</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            Pre-Shipment Inspection in China
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            PSI is the last point where a bad lot is still a factory problem instead of a freight
            claim. We inspect at the factory, against your specification and an AQL sampling plan,
            and hand you a photo report before the goods are packed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="/order?service=psi" className="rounded-full bg-primary-600 px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-primary-700 transition-colors text-center">
              Book an Inspection
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
              A pre-shipment inspection answers one commercial question: should this lot be paid for
              and shipped? Everything else — the sample size, the defect classification, the photos,
              the report — exists to support that decision. It is not a laboratory test and it is not
              a certificate; it is a documented, independent look at the goods while they are still in
              the factory, where a problem can still be fixed.
            </p>

            <h2 className="text-2xl font-bold pt-4">When the inspection happens</h2>
            <p>
              The right moment is after production is complete and at least 80% of the goods are
              packed. At that point the lot is finished, the packing method is visible, and there is
              still time to rework, replace or re-pack before the container is booked. Inspecting too
              early means judging unfinished goods; inspecting after loading means the only remedies
              left are claims and discounts.
            </p>

            <h2 className="text-2xl font-bold pt-4">What we check on site</h2>

            <h3 className="text-xl font-bold pt-2">1. Quantity and carton count</h3>
            <p>
              Finished quantity is counted against the PO and the packing list, including the inner
              pack ratio. Cartons are counted, not estimated, and any short pack, over-pack or mixed
              model is recorded with the carton numbers so the factory can trace it. Quantity errors
              are the cheapest problems to fix at the factory and the most expensive to discover at
              destination.
            </p>

            <h3 className="text-xl font-bold pt-2">2. Workmanship and cosmetic defects</h3>
            <p>
              The sample is checked against your approved sample and specification for the defects
              that matter in your category: scratches, colour variation, mould marks, weld quality,
              stitching, plating, printing registration, assembly gaps. Defects are classified as
              critical, major or minor according to the plan agreed at booking, because a scratch on a
              hidden internal part and a scratch on a visible front panel are not the same defect.
            </p>

            <h3 className="text-xl font-bold pt-2">3. Function and performance</h3>
            <p>
              Where the product has a function, it is tested: switches, motors, pumps, valves, hinges,
              zips, electronics, battery charging, sealing. Tests are field tests performed with the
              equipment available at the factory, and the method and result are written into the
              report. If a test needs a laboratory — electrical safety, food contact, material
              composition — it is flagged as out of scope rather than implied.
            </p>

            <h3 className="text-xl font-bold pt-2">4. Dimensions, weight and packaging</h3>
            <p>
              Key dimensions are measured against the specification, and carton dimensions and weight
              are checked against the packing list, because both feed directly into container
              planning and freight cost. Packaging is checked for the correct carton grade, inner
              protection, accessories, manuals and any agreed drop or compression requirement.
            </p>

            <h3 className="text-xl font-bold pt-2">5. Labels, barcodes and shipping marks</h3>
            <p>
              Labels are checked for the correct model, voltage, warnings and language; barcodes and
              FNSKU labels are scanned and verified rather than assumed; shipping marks are compared
              with the marks on your documents. A correct product with a wrong label is still a
              rejected shipment at the border, and relabelling at destination is rarely cheap.
            </p>

            <h3 className="text-xl font-bold pt-2">6. Basic safety and field checks</h3>
            <p>
              Where relevant, we check sharp edges, small parts, accessible live parts, earth
              continuity, insulation resistance and similar field-observable items. These checks
              support your risk assessment; they do not replace a certified safety test or a
              compliance certificate.
            </p>

            <h2 className="text-2xl font-bold pt-4">The failures we see most often</h2>
            <p>
              Most rejected lots are not rejected for a dramatic defect. They fail on things that were
              visible at the factory and invisible on the paperwork:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Label and model mismatch.</strong> The right product carries the wrong label, voltage or language version, which becomes a border problem rather than a factory problem.</li>
              <li><strong>Short pack and inner-ratio errors.</strong> The carton count is right but the inner pack is short, so the declared quantity is wrong at the unit level.</li>
              <li><strong>Cosmetic drift from the approved sample.</strong> Colour, gloss or finish moves gradually across the run, and nobody notices until the buyer compares batches.</li>
              <li><strong>Function failures under real conditions.</strong> A unit that works on the bench fails at full load, after warm-up, or with the actual accessory supplied.</li>
              <li><strong>Packing that does not match the agreed protection.</strong> The carton grade or inner protection is downgraded to save cost, and the damage only appears after the sea voyage.</li>
            </ul>

            <h2 className="text-2xl font-bold pt-4">How the sample is chosen</h2>
            <p>
              Sampling follows ISO 2859-1 / ANSI/ASQ Z1.4, which is technically equivalent to
              GB/T 2828.1. The lot size and the inspection level determine the sample size, and each
              defect class has its own accept and reject numbers. This is what makes the result
              defensible: the factory cannot argue that you happened to pick the only three bad
              pieces, and you cannot be accused of applying an arbitrary standard. For the numbers
              behind the plan, see the <a href="/aql-calculator-guide" className="underline hover:text-primary-600">AQL sampling guide</a>{' '}
              or run a lot through the <a href="/aql-calculator" className="underline hover:text-primary-600">AQL calculator</a>.
            </p>

            <h2 className="text-2xl font-bold pt-4">What the report contains</h2>
            <p>
              The report records what was inspected, how many pieces were drawn, which defects were
              found and how they were classified, with dated photographs of the actual goods, the
              defect close-ups, the packing, the labels and the shipping marks. Findings are written
              as observations with evidence, not as adjectives. Reports can be issued in Chinese,
              English, or both in one document, so the buyer and the factory read the same thing.
            </p>

            <h2 className="text-2xl font-bold pt-4">Where we inspect</h2>
            <p>
              We inspect inside mainland China only. That covers the main manufacturing provinces and
              the industrial belts around them. If your supplier is outside China, this service is not
              available; if the goods are in China but the supplier is a trading company, we inspect at
              the site where the goods actually are and record whose premises it is.
            </p>

            <h2 className="text-2xl font-bold pt-4">What PSI does not cover</h2>
            <p>
              A PSI is a field inspection of a lot. It does not certify the product, does not replace
              laboratory testing, does not audit the factory, and does not verify the supplier's legal
              status. It also does not guarantee that the goods loaded later are the goods inspected —
              that gap is covered by <a href="/container-loading-supervision" className="underline hover:text-primary-600">container loading supervision</a>.
              Being clear about the boundary is part of doing the job properly.
            </p>

            <h2 className="text-2xl font-bold pt-4">What to send when you book</h2>
            <ul className="list-disc pl-8 space-y-2">
              <li>Product specification, approved sample photos and your defect requirements</li>
              <li>Purchase order and packing list, including carton dimensions and weight</li>
              <li>Factory name, address and a contact who can admit the inspector</li>
              <li>Production status and the date the goods will be ready and packed</li>
              <li>Any customer checklist or labelling requirement that must be verified</li>
            </ul>

            <div className="bg-primary-50 p-8 rounded-xl border-l-4 border-primary-600 mt-8">
              <h4 className="font-bold mb-2">Service details</h4>
              <p className="mb-4">Standard PSI: $199 USD. Final scope depends on product, site and sample size; multi-site or long-term programmes are quoted separately.</p>
              <a href="/order?service=psi" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">Book PSI Now</a>
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
              <a href="/blog/product-safety-testing-china-standards" className="underline hover:text-primary-600">product safety testing standards</a>, and{' '}
              <a href="/blog/how-to-choose-quality-inspection-company-china-red-flags" className="underline hover:text-primary-600">how to choose an inspection company</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
