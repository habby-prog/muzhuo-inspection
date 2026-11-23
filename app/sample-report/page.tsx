import type { Metadata } from 'next'
import { pageMetadata } from '../lib/meta'
import { SITE_URL } from '../lib/site'
import SampleRequestForm from './SampleRequestForm'

export const metadata: Metadata = pageMetadata(
  '/sample-report',
  'Sample Pre-Shipment Inspection Report | Muzhuo Inspection',
  'A sample pre-shipment inspection report: report structure, AQL sampling plan, defect classification, findings and photo pages. Fictitious product, client details removed.',
)

const rows = [
  ['Report No.', 'MZ-SAMPLE-2026-01'],
  ['Inspection type', 'Pre-shipment inspection (PSI)'],
  ['Product', '18/8 stainless steel insulated bottle, 500 ml'],
  ['Order quantity', '3,000 pcs / 250 cartons'],
  ['Sampling standard', 'ISO 2859-1 / ANSI/ASQ Z1.4, General Inspection Level II'],
  ['Sample size', '125 pcs (lot size 1,201–3,200)'],
  ['AQL', 'Critical 0 / Major 2.5 / Minor 4.0'],
  ['Inspection date', 'Sample — 2026'],
  ['Result', 'PASS — no critical or major defects'],
]

const defects = [
  ['Critical', '0', '0', '0', 'Accept'],
  ['Major', '2.5', '7', '0', 'Accept'],
  ['Minor', '4.0', '10', '2', 'Accept'],
]

export default function SampleReport() {
  const pageUrl = SITE_URL + '/sample-report'
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sample Report', item: pageUrl },
    ],
  }

  const sampleDoc = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: 'Sample pre-shipment inspection report',
    description:
      'Sample pre-shipment inspection report: report structure, AQL sampling plan, defect classification, findings and photo pages. Fictitious product, client details removed.',
    url: pageUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    about: 'Pre-shipment inspection report structure and AQL defect classification',
    author: { '@type': 'Organization', name: 'Muzhuo Inspection', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Muzhuo Inspection', url: SITE_URL },
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleDoc) }} />

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex mb-8 text-sm text-slate-400" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-slate-300">Sample Report</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            Sample Inspection Report
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            What you receive after an inspection: the report structure, the sampling plan, the defect
            classification and the evidence pages. The product and parties below are fictitious; client
            details are removed from every sample we share.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Download a real, anonymised sample</h2>
          <p className="text-slate-600 mb-8">
            Two actual reports with client and supplier details removed. Every page carries a SAMPLE
            mark; prices, order numbers and factory identifiers have been replaced.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 mb-14">
            <a href="/samples/MUZHUO-Sample-Clothing-Inspection.pdf" className="block rounded-2xl border border-slate-200 overflow-hidden hover:border-primary-500 transition-colors">
              <img
                src="/samples/MUZHUO-Sample-Clothing-Inspection-p1-765.webp"
                srcSet="/samples/MUZHUO-Sample-Clothing-Inspection-p1-400.webp 400w, /samples/MUZHUO-Sample-Clothing-Inspection-p1-765.webp 765w"
                sizes="(min-width: 640px) 380px, 90vw"
                width={765}
                height={990}
                loading="lazy"
                decoding="async"
                alt="Clothing inspection sample report cover"
                className="w-full h-auto"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-primary-600 mb-1">Textiles</p>
                <h3 className="font-bold text-lg">Clothing inspection report</h3>
                <p className="text-sm text-slate-500 mt-1">8 pages · PDF · 3 MB</p>
              </div>
            </a>
            <a href="/samples/MUZHUO-Sample-Loading-Supervision.pdf" className="block rounded-2xl border border-slate-200 overflow-hidden hover:border-primary-500 transition-colors">
              <img
                src="/samples/MUZHUO-Sample-Loading-Supervision-p1-765.webp"
                srcSet="/samples/MUZHUO-Sample-Loading-Supervision-p1-400.webp 400w, /samples/MUZHUO-Sample-Loading-Supervision-p1-765.webp 765w"
                sizes="(min-width: 640px) 380px, 90vw"
                width={765}
                height={990}
                loading="lazy"
                decoding="async"
                alt="Container loading supervision sample report cover"
                className="w-full h-auto"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-primary-600 mb-1">Loading supervision</p>
                <h3 className="font-bold text-lg">Container loading supervision report</h3>
                <p className="text-sm text-slate-500 mt-1">8 pages · PDF · 8 MB</p>
              </div>
            </a>
          </div>

          <h2 className="text-2xl font-bold mb-4">Report structure, page by page</h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-12">
            <div className="bg-slate-900 text-white px-6 py-5">
              <p className="text-xs uppercase tracking-widest text-slate-400">Muzhuo Inspection</p>
              <h2 className="text-2xl font-bold">Inspection Report — Sample</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                    <th className="text-left font-semibold px-5 py-3 w-2/5 text-slate-600">{k}</th>
                    <td className="px-5 py-3 text-slate-800">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose max-w-none text-slate-700 space-y-6">
            <h2 className="text-2xl font-bold">1. Scope of inspection</h2>
            <p>
              The inspection covered finished goods after production was completed and before loading.
              Quantity and packing were verified against the purchase order and packing list. A random
              sample was drawn from the finished lot and checked for workmanship, function, dimensions,
              labelling and packing. Photographs were taken on site and are appended to the full report.
            </p>

            <h2 className="text-2xl font-bold">2. Sampling plan</h2>
            <p>
              Sampling followed ISO 2859-1 / ANSI/ASQ Z1.4 at General Inspection Level II. For a lot of
              3,000 pieces the sample size is 125 pieces. Defects were classified before the inspection;
              the accept and reject numbers below apply to each class separately.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left px-4 py-3">Defect class</th>
                    <th className="text-left px-4 py-3">AQL</th>
                    <th className="text-left px-4 py-3">Accept</th>
                    <th className="text-left px-4 py-3">Found</th>
                    <th className="text-left px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {defects.map((r) => (
                    <tr key={r[0]} className="border-t border-slate-200">
                      {r.map((c, i) => (
                        <td key={i} className="px-4 py-3">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold">3. Findings</h2>
            <p>
              Two minor defects were recorded. Three bottles showed a logo print offset of about 0.5 mm
              against the approved sample, visible only on close inspection. Two cartons had a print
              smudge on the outer face, with no effect on the contents. No critical or major defect was
              found, and the lot was accepted against the agreed plan.
            </p>
            <p>
              Each finding in the full report is recorded with the carton or piece number, a photograph,
              and the classification it was judged against. Observations are written as facts, not
              adjectives, so the buyer and the factory can discuss the same evidence.
            </p>

            <h2 className="text-2xl font-bold">4. Photo evidence</h2>
            <p>
              The full report contains dated photographs of the lot, the packing, the labels, the
              shipping marks and each recorded defect. Photo pages are omitted from this public excerpt
              to protect client and factory information; the complete sample, with photo pages, is
              available on request.
            </p>

            <h2 className="text-2xl font-bold">5. Conclusion</h2>
            <p>
              The lot meets the agreed inspection criteria. The result is based on the sample inspected
              on the date stated and does not certify the product or replace laboratory testing.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-3">Other categories: sample by email</h2>
            <p className="text-slate-600 mb-6">
              Electronics, factory assessment, industrial goods and ceramic reports are not published
              here. Tell us the category and we will email the matching sample with its photo pages. One sample per company — pick the closest category.
            </p>
            <SampleRequestForm />
          </div>
        </div>
      </section>
    </div>
  )
}
