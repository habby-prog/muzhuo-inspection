import type { Metadata } from 'next'
import { pageMetadata } from '../lib/meta'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = pageMetadata(
  '/container-loading-supervision',
  'China Container Loading Supervision: Scope, Process and Report',
  'Container loading supervision in China: quantity and carton checks, container condition, loading sequence, securing and seal, photographed and reported within 24 hours of loading.',
)

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is container loading supervision?',
    a: 'Container loading supervision is an on-site check performed while your goods are being loaded. The supervisor verifies that the correct products and quantities go into the container, that the container itself is fit to carry them, that the load is distributed and secured so it survives the voyage, and that the container is sealed with a recorded seal number. The deliverable is a report with dated photos of every step, issued before the vessel sails.',
  },
  {
    q: 'How is it different from a pre-shipment inspection?',
    a: 'A pre-shipment inspection judges product quality against an AQL sampling plan. Loading supervision judges the physical shipment: whether the inspected goods are the ones actually loaded, whether anything was substituted or short-packed in the meantime, whether the container is sound, and whether the cargo is secured. The two are complementary, and the gap between them — the days after inspection and before loading — is exactly where substitution happens.',
  },
  {
    q: 'How long does a loading supervision take?',
    a: 'A 20ft container is normally two to three hours and a 40ft or 40HQ three to five hours, measured from the supervisor arriving at the loading bay to the doors being closed and sealed. Heavy or awkward cargo — steel coil, machinery, oversized furniture — takes longer because securing is slower and is checked piece by piece. The booking slot is built around the factory loading window, not the other way round.',
  },
  {
    q: 'What does the report contain?',
    a: 'Container number and seal number, with photos of both; container condition before loading, including the CSC plate, floor, walls, roof and door seals; carton and pallet counts against the packing list; photos of shipping marks and the loading sequence; the securing method used — dunnage, straps, airbags, bracing — photographed in place; the closed and sealed container; and any exception noted on site, with the factory representative named. Reports are issued within 24 hours of loading.',
  },
  {
    q: 'Can you supervise loading at a forwarder warehouse instead of the factory?',
    a: 'Yes. Loading frequently happens at a consolidation warehouse rather than at the factory, especially for multi-supplier shipments. The same checks apply; the difference is that the identity check matters more, because goods from several factories are handled in the same space and mixed cartons are common. Tell us at booking where the container will be stuffed so the supervisor is sent to the right site.',
  },
  {
    q: 'What happens if the container is unfit or the quantity is short?',
    a: 'The supervisor stops and documents it before loading starts. A container with a damaged roof, a wet floor or a failing door seal is rejected on the spot and the forwarder is asked for a replacement; a quantity or model mismatch is photographed against the packing list and reported to you the same day, while the goods are still on the floor and can still be corrected. Once the doors are sealed, both problems become claims instead of fixes.',
  },
]

export default function ContainerLoadingSupervision() {
  const pageUrl = `${SITE_URL}/container-loading-supervision`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Container Loading Supervision',
    name: 'China Container Loading Supervision',
    description:
      'On-site supervision of container loading in China: quantity and carton verification, container condition, loading sequence, securing and seal, with a photo report within 24 hours.',
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
      { '@type': 'ListItem', position: 3, name: 'Container Loading Supervision', item: pageUrl },
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
              <li className="text-slate-300">Container Loading Supervision</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            China Container Loading Supervision
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            The container is the last place where a cheap mistake becomes an expensive one. We stand at
            the loading bay, verify what goes in, check the box it goes into, watch how it is secured,
            and photograph the seal before the doors close.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="/order?service=cls" className="rounded-full bg-primary-600 px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-primary-700 transition-colors text-center">
              Book Loading Supervision
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
              Container loading supervision — CLS, sometimes called loading inspection or stuffing
              supervision — is the check that closes the gap between &quot;the goods passed inspection&quot;
              and &quot;the goods are on the water&quot;. In that gap, cartons are moved, pallets are
              re-stacked, leftovers are topped up, and a container chosen in a hurry turns out to have a
              wet floor. None of it shows up in a quality report written three days earlier.
            </p>

            <h2 className="text-2xl font-bold pt-4">What we check on site</h2>

            <h3 className="text-xl font-bold pt-2">1. Quantity, models and shipping marks</h3>
            <p>
              Every carton that goes in is counted against the packing list, and the shipping marks are
              checked against the ones on the documents. Where a shipment mixes models or sizes, the
              mix is verified carton by carton, because a pallet that is right on total quantity can
              still be wrong on the split. Short loads and substitutions are the two failures that cost
              the most to fix after the vessel sails.
            </p>

            <h3 className="text-xl font-bold pt-2">2. Carton and packaging condition</h3>
            <p>
              Cartons are checked for crushing, water damage, re-taping and torn corners as they are
              handled. Anything already damaged before loading is photographed and set aside rather
              than buried at the back of the container, where it cannot be inspected on arrival and
              cannot be claimed either.
            </p>

            <h3 className="text-xl font-bold pt-2">3. Container condition</h3>
            <p>
              Before the first carton goes in: the CSC plate and container number, the floor for
              moisture and protruding nails, the walls and roof for holes and repairs, the door seals
              and locking bars, and the interior for odour, residue or infestation from the previous
              cargo. A light test inside the closed container shows roof and wall perforations that are
              invisible in daylight. A container that fails is rejected before loading, not after.
            </p>

            <h3 className="text-xl font-bold pt-2">4. Loading sequence and weight distribution</h3>
            <p>
              Heavy cargo low and spread over the floor beams, weight kept off the door end, and the
              load built so that it cannot shift forward under braking or sideways in a roll. The
              sequence matters for the consignee as well: goods for the last drop should be loaded
              first. We check the plan against the way the container is actually being filled, because
              the two diverge quickly once a forklift is involved.
            </p>

            <h3 className="text-xl font-bold pt-2">5. Securing, dunnage and moisture control</h3>
            <p>
              Straps, airbags, timber bracing, corner protectors and void fill are checked in place and
              photographed. For cargo that is sensitive to condensation — machinery, steel, furniture,
              electronics — desiccant quantity and placement are recorded, and container liner or
              VCI film is verified where specified. &quot;It looked tight&quot; is not a securing method;
              the report shows what was used and where.
            </p>

            <h3 className="text-xl font-bold pt-2">6. Seal, photos and handover</h3>
            <p>
              The seal number and container number are photographed together, the doors are closed in
              front of the supervisor, and the sealed container is photographed from both ends. The
              seal number goes into the report and onto the documents, so that any discrepancy at
              destination can be traced to a specific moment rather than argued about.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-10">How the job runs</h2>
          <ol className="space-y-8">
            {[
              {
                t: 'Booking with the loading window',
                d: 'You send the packing list, the supplier contact and the planned loading date. We confirm the slot with the factory and the forwarder, so the supervisor is on site before the container arrives rather than after loading has started.',
              },
              {
                t: 'Document pre-check',
                d: 'Packing list, shipping marks, container and seal expectations are checked against each other before the visit. Discrepancies that can be fixed by email are fixed before anyone travels.',
              },
              {
                t: 'On-site supervision',
                d: 'Container inspection first, then loading from start to seal. The supervisor stays for the whole operation; a five-minute visit at the end photographs the result, not the process.',
              },
              {
                t: 'Same-day alert, 24-hour report',
                d: 'Anything that needs a decision — a rejected container, a short count, damaged cartons — is reported the same day by message and photo. The full report follows within 24 hours of loading.',
              },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white font-black flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold mb-1">{s.t}</h3>
                  <p className="text-slate-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6">What you receive</h2>
          <ul className="space-y-3 text-slate-700">
            {[
              'Container number and seal number, photographed together at closing',
              'Container condition record before loading, including CSC plate and floor',
              'Carton, pallet and model counts against the packing list',
              'Photo sequence of the loading itself, in order, with time stamps',
              'Securing and dunnage documented in place',
              'Exceptions listed with the person on site who was told, and what was agreed',
              'Report in PDF within 24 hours of loading',
            ].map((d) => (
              <li key={d} className="flex gap-3">
                <span className="text-primary-600 font-black">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/blog/como-verificar-bobinas-acero-antes-cargar" className="block rounded-2xl border border-slate-200 p-6 hover:border-primary-300 transition-colors">
              <span className="block font-bold mb-1">Steel coil loading checklist (ES)</span>
              <span className="text-sm text-slate-500">Coil condition, dunnage and lashing before the doors close.</span>
            </a>
            <a href="/blog/steel-coil-container-loading-supervision-guide" className="block rounded-2xl border border-slate-200 p-6 hover:border-primary-300 transition-colors">
              <span className="block font-bold mb-1">Steel coil container loading guide (EN)</span>
              <span className="text-sm text-slate-500">Load plans, weight limits and securing for coil cargo.</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-10">Frequently asked questions</h2>
          <div className="space-y-7">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-bold mb-2">{f.q}</h3>
                <p className="text-slate-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-slate-700">
          <h2 className="text-2xl font-bold mb-4">Related services and reading</h2>
          <ul className="space-y-2">
            <li>
              <a href="/services/cls" className="text-primary-600 underline">Container loading supervision (service page and price)</a>{' '}
              — the standard package and how to book it.
            </li>
            <li>
              <a href="/services/psi" className="text-primary-600 underline">Pre-shipment inspection</a>{' '}
              — the AQL-based quality check that should happen before loading.
            </li>
            <li>
              <a href="/aql-calculator-guide" className="text-primary-600 underline">AQL sampling guide</a>{' '}
              — how sample sizes and accept numbers are set, and where AQL is misread.
            </li>
            <li>
              <a href="/blog/argentina-import-regulations-2026-quality-control" className="text-primary-600 underline">Argentina import regulations 2026</a>{' '}
              — the compliance side, for Argentine buyers.
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-slate-900 text-white rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black mb-4">Ready to book a loading supervisor?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Send the packing list and the loading date. We confirm the slot with the factory and send
              a supervisor to the right address — factory or forwarder warehouse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/order?service=cls" className="rounded-full bg-primary-600 px-8 py-3 font-bold hover:bg-primary-700 transition-colors">
                Book Loading Supervision
              </a>
              <a href="/contact" className="rounded-full border border-white/40 px-8 py-3 font-bold hover:bg-white/10 transition-colors">
                Ask About Your Cargo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
