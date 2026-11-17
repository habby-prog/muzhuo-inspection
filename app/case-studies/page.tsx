import type { Metadata } from 'next'
import { pageMetadata } from '../lib/meta'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = pageMetadata(
  '/case-studies',
  'Case Studies: Inspection and Loading Supervision in China | Muzhuo',
  'Two anonymised cases: an importer who found us through search and placed a first order, and a steel coil loading supervision where the container was rejected before loading.',
)

export default function CaseStudies() {
  const pageUrl = SITE_URL + '/case-studies'
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: pageUrl },
    ],
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex mb-8 text-sm text-slate-400" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-slate-300">Case Studies</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            Case Studies
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            What the work actually looks like when it goes well, and what it looks like when a
            problem is caught before the container sails. Client names are removed.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Case 01 · Search inquiry</p>
            <h2 className="text-3xl font-bold mb-6">From a Google search to a first order</h2>
            <div className="prose max-w-none text-slate-700 space-y-4">
              <p>
                An importer found the site through a Google search, sent an enquiry through the
                contact form, and asked for a pre-shipment inspection on a first order from a Chinese
                supplier. There was no prior relationship and no introduction.
              </p>
              <p>
                The inspection was booked one to three days ahead. Before the visit we asked for the
                purchase order, the packing list and the specification, and agreed which defects would
                be treated as critical. The inspector attended the factory, drew the sample using an
                AQL plan, checked quantity, workmanship, function and packaging, and photographed what
                was found.
              </p>
              <p>
                The report was issued with dated photos and a clear conclusion, in time for the buyer
                to decide whether to release the balance. The first order went ahead.
              </p>
              <p>
                What made the difference was not a clever sales argument. It was a page that answered
                the buyer's question, a form that worked, and a report that arrived while the decision
                was still open.
              </p>
            </div>
          </article>

          <article className="mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Case 02 · Loading supervision</p>
            <h2 className="text-3xl font-bold mb-6">A container rejected before loading started</h2>
            <div className="prose max-w-none text-slate-700 space-y-4">
              <p>
                A shipment of cold-rolled stainless steel coils was booked for loading supervision at
                a warehouse in Tianjin. The goods had already passed a pre-shipment inspection; this
                visit was about the container and the loading, not the product.
              </p>
              <p>
                The supervisor arrived before the loading window, checked the container number and
                seal against the booking, and inspected the container before anything went in. The
                floor was wet and the roof had a repair that had not been declared. Loading was
                stopped on the spot.
              </p>
              <p>
                The forwarder was asked for a replacement container. The wet floor and the roof repair
                were photographed, the booking reference was recorded, and the delay was documented
                before the first coil was lifted. Had the container been loaded and sealed, the same
                findings would have become a claim at destination, with the cargo already at sea.
              </p>
              <p>
                A replacement container was inspected and accepted. The report recorded
                the rejection, the reason, the replacement and the final seal number, with photos of
                each step.
              </p>
            </div>
          </article>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold mb-3">Want to see what a report looks like?</h2>
            <p className="text-slate-600 mb-5">
              We do not publish full client reports. A redacted sample — structure, defect
              classification, photo pages — is available on request, matched to your product category.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/sample-report" className="rounded-full bg-primary-600 px-6 py-3 font-bold text-white text-center hover:bg-primary-700">
                See a sample report
              </a>
              <a href="/services" className="rounded-full border border-slate-300 px-6 py-3 font-bold text-center hover:bg-white">
                See inspection services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
