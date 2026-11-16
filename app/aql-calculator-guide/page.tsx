import type { Metadata } from 'next'
import { pageMetadata } from '../lib/meta'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = pageMetadata(
  '/aql-calculator-guide',
  'AQL Sampling Guide: ANSI/ASQ Z1.4 and ISO 2859-1 Explained',
  'How AQL sampling works in practice: ANSI/ASQ Z1.4 vs ISO 2859-1, inspection levels, lot size to sample size, single and double sampling, switching rules, and why AQL is not a defect-rate ceiling.',
)

const SAMPLE_BY_CODE: [string, number][] = [
  ['A', 2],
  ['B', 3],
  ['C', 5],
  ['D', 8],
  ['E', 13],
  ['F', 20],
  ['G', 32],
  ['H', 50],
  ['J', 80],
  ['K', 125],
  ['L', 200],
  ['M', 315],
  ['N', 500],
  ['P', 800],
  ['Q', 1250],
  ['R', 2000],
]

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Is AQL the maximum defect rate allowed in a shipment?',
    a: 'No. AQL is the quality level that a sampling plan is designed to accept most of the time, not a defect-rate ceiling. A lot produced exactly at the AQL still has roughly a 5% chance of being rejected, and a lot with a defect rate several times higher than the AQL can still pass a single inspection. AQL describes the risk balance of the plan; it does not certify the defect rate of the goods.',
  },
  {
    q: 'Are ANSI/ASQ Z1.4 and ISO 2859-1 the same standard?',
    a: 'They are the same sampling system under two labels. Both descend from MIL-STD-105 and share the AQL series, the three general inspection levels, the four special levels, the code letters A to R and the switching rules. For the AQL values in everyday use, the single-sampling normal-inspection acceptance numbers are the same. The documents differ in structure and wording, and ISO 2859 adds companion parts such as limiting quality tables, so a report should always state which edition it follows.',
  },
  {
    q: 'Which inspection level should I use for a pre-shipment inspection?',
    a: 'General Inspection Level II is the default in almost all consumer-goods inspections and is what most buyers and factories expect. Use Level I when the lot is homogeneous, the defect history is clean and cost matters more than discrimination. Use Level III when the product is safety-related, the supplier is new, or a previous lot was rejected. The S levels exist for destructive or very expensive tests, where a small sample is the only practical option.',
  },
  {
    q: 'What is the difference between Ac and Re?',
    a: 'Ac is the acceptance number: the maximum number of defective units allowed in the sample for the lot to pass. Re is the rejection number: the number of defectives at which the lot fails. In single sampling Re is normally Ac plus one, so there is no ambiguous outcome. Each defect class has its own Ac and Re, and the lot fails if any class reaches its Re.',
  },
  {
    q: 'Does an AQL of 2.5 mean 2.5% of the shipment may be defective?',
    a: 'Not directly. 2.5 is an index that points to a column in the sampling tables; the acceptance number comes from the row for your sample size, and as a share of the sample it is usually well above 2.5%. Read Ac and Re from the plan for your lot size and inspection level, and never convert the AQL index into a defect percentage in a purchase order or a claim.',
  },
  {
    q: 'What happens when a lot fails the inspection?',
    a: 'A failed lot is not automatically scrapped. The usual path is 100% sorting by the factory, removal or rework of the defective units, and a re-inspection of the corrected lot, normally under tightened inspection. The important point is that sampling never repairs a lot: it only tells you whether the lot as presented is acceptable. Sorting is a separate operation with its own cost and its own verification.',
  },
]

export default function AqlCalculatorGuide() {
  const pageUrl = `${SITE_URL}/aql-calculator-guide`
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
      { '@type': 'ListItem', position: 2, name: 'AQL Calculator', item: `${SITE_URL}/aql-calculator` },
      { '@type': 'ListItem', position: 3, name: 'AQL Sampling Guide', item: pageUrl },
    ],
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <nav className="flex mb-8 text-sm text-slate-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/aql-calculator" className="hover:text-primary-600">AQL Calculator</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-slate-500">AQL Sampling Guide</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
          AQL Sampling Guide: ANSI/ASQ Z1.4 and ISO 2859-1 Explained
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          AQL sampling decides how many units an inspector pulls from a lot, and how many defects are
          allowed before the lot is rejected. This guide explains how the tables behind the{' '}
          <a href="/aql-calculator" className="text-primary-600 underline">AQL calculator</a> are built:
          what the two standards share, how inspection levels change the sample, why single and double
          sampling give different numbers, and where the common readings of AQL go wrong.
        </p>

        <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl mb-12">
          <p className="font-bold mb-2">Need the numbers for a specific lot?</p>
          <p className="text-slate-700 mb-4">
            The calculator returns the code letter, sample size and accept/reject numbers for your lot
            size, inspection level and AQL values, using the same tables described here.
          </p>
          <a
            href="/aql-calculator"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
          >
            Open the AQL Calculator →
          </a>
        </div>

        <div className="prose max-w-none text-slate-700 space-y-6">
          <h2 className="text-2xl font-bold pt-4">What AQL actually means</h2>
          <p>
            ISO 2859-1 defines the acceptance quality limit as the quality level that is the worst
            tolerable process average when a continuing series of lots is submitted for acceptance
            sampling. In plain terms: it is the defect level at which the plan is designed to accept
            the great majority of lots, not the level at which the goods become unacceptable.
          </p>
          <p>
            Every sampling plan carries two risks. The producer risk is the chance that a lot at the
            AQL is rejected anyway, and it sits at roughly 5% for the plans in normal use. The consumer
            risk is the chance that a genuinely bad lot is accepted; that is what the limiting quality
            tables in ISO 2859-2 describe, usually at a 10% acceptance probability. AQL fixes the first
            risk. It does not fix the second, which is why the same AQL can pass a mediocre lot and
            reject a good one.
          </p>

          <h2 className="text-2xl font-bold pt-4">ANSI/ASQ Z1.4 and ISO 2859-1: one system, two labels</h2>
          <p>
            Both standards grew out of MIL-STD-105, the US military sampling standard used from the
            1950s. ANSI/ASQ Z1.4 is its American descendant; ISO 2859-1 is the international
            equivalent. They share the parts that matter on the factory floor:
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li>The AQL series, from 0.010 through 1000 defects per hundred units.</li>
            <li>Three general inspection levels (I, II, III) and four special levels (S-1 to S-4).</li>
            <li>Sample size code letters A to R.</li>
            <li>Single, double and multiple sampling plans, with their accept and reject numbers.</li>
            <li>Normal, tightened and reduced inspection, with rules for switching between them.</li>
          </ul>
          <p>
            The acceptance numbers for single sampling under normal inspection are the same for the
            AQL values used in ordinary consumer-goods work. The documents differ in clause structure,
            in some definitions, and in the companion standards: ISO 2859 has separate parts for
            limiting quality, skip-lot sampling and isolated lots, which Z1.4 does not cover in the
            same way. A competent inspection report states the standard and edition it applied, because
            a buyer quoting Z1.4 and a factory quoting ISO 2859-1 can otherwise argue about a table
            that is, in practice, the same table.
          </p>

          <h2 className="text-2xl font-bold pt-4">The four inputs that decide the plan</h2>
          <h3 className="text-xl font-bold">1. Lot size</h3>
          <p>
            The lot is the quantity offered for one acceptance decision, not the total on the purchase
            order. Five thousand units produced in two separate runs, packed and presented separately,
            are two lots. Lot size maps to a code letter through the first table in the standard, and
            the code letter fixes the sample size.
          </p>
          <h3 className="text-xl font-bold">2. Inspection level</h3>
          <p>
            Level II is the default and applies to the large majority of inspections. Level I moves
            the lot one code letter down, which gives a smaller sample, and is used where
            discrimination matters less. Level III moves it one letter up, which gives a larger
            sample, and is used for high-risk or safety-related products. The special levels S-1 to
            S-4 give small samples for destructive or costly tests. Changing the level changes the
            code letter, and therefore the sample size and the accept number, even when lot size and
            AQL stay the same.
          </p>
          <h3 className="text-xl font-bold">3. AQL values, one per defect class</h3>
          <p>
            Critical, major and minor defects are judged separately, each with its own AQL. Typical
            industry practice is a critical AQL at zero acceptance, major at 2.5 and minor at 4.0, but
            the correct values come from the buyer&apos;s specification and the product risk, not from a
            default. When the classes are combined into one sample, the largest of the three sample
            sizes is used so that every class keeps its own plan.
          </p>
          <h3 className="text-xl font-bold">4. Sampling plan type</h3>
          <p>
            Single, double and multiple plans differ in how many units are inspected before a decision
            is reached. They do not change the quality level being protected; they change the cost and
            the stopping point.
          </p>

          <h2 className="text-2xl font-bold pt-4">Sample size by code letter</h2>
          <p>
            Once the lot size and inspection level give you a code letter, the sample size follows:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 font-black uppercase tracking-wider">Code letter</th>
                  <th className="p-3 font-black uppercase tracking-wider text-center">Sample size</th>
                  <th className="p-3 font-black uppercase tracking-wider">Code letter</th>
                  <th className="p-3 font-black uppercase tracking-wider text-center">Sample size</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-3 font-bold">{SAMPLE_BY_CODE[i][0]}</td>
                    <td className="p-3 text-center tabular-nums">{SAMPLE_BY_CODE[i][1]}</td>
                    <td className="p-3 font-bold">{SAMPLE_BY_CODE[i + 8][0]}</td>
                    <td className="p-3 text-center tabular-nums">{SAMPLE_BY_CODE[i + 8][1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The accept number is then read from the plan for that code letter and AQL. Two lots with
            the same AQL but different code letters can therefore have very different acceptance
            numbers, which is why quoting an AQL without a sample size says almost nothing.
          </p>

          <h2 className="text-2xl font-bold pt-4">Single versus double sampling</h2>
          <p>
            A single sampling plan inspects one sample and decides. A double sampling plan inspects a
            first, smaller sample and either accepts, rejects, or takes a second sample before deciding.
            In the standard tables, the sample size for the code letter applies to each of the two
            samples, so a double plan can inspect up to twice as many units as the single plan, and it
            carries two pairs of accept and reject numbers.
          </p>
          <p>
            Double sampling usually reduces the average number of units inspected when quality is
            clearly good or clearly bad, because the decision is often reached on the first sample. It
            costs more administration: two decision points, two sets of records, and a report that has
            to show which sample each defect came from. For most consumer-goods inspections the single
            plan is easier to audit and easier to explain to a factory, which is why it remains the
            default choice.
          </p>

          <h2 className="text-2xl font-bold pt-4">Reading Ac and Re</h2>
          <p>
            Ac is the maximum number of defectives that still allows acceptance. Re is the number at
            which the lot fails. In single sampling Re equals Ac plus one, so the outcome is never
            ambiguous. In double sampling there are two thresholds: defects at or below Ac1 accept on
            the first sample, defects at or above Re1 reject immediately, and anything between sends
            the inspector to the second sample.
          </p>
          <p>
            Judgment is per defect class. A lot with zero critical defects, three major defects against
            an Ac of 5, and a minor count at its Re still fails, because one class reached its
            rejection number. Reports that only quote a total defect count hide exactly this case.
          </p>

          <h2 className="text-2xl font-bold pt-4">Switching rules: normal, tightened, reduced</h2>
          <p>
            The standards are not a single table but a system with memory. Normal inspection applies
            until the history justifies a change.
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li>
              <strong>Normal to tightened:</strong> two out of five consecutive lots rejected on
              original inspection.
            </li>
            <li>
              <strong>Tightened to normal:</strong> five consecutive lots accepted on original
              inspection.
            </li>
            <li>
              <strong>Normal to reduced:</strong> ten consecutive lots accepted on original inspection,
              total defectives at or below the limit numbers, production steady and no backlog of
              rejected lots.
            </li>
            <li>
              <strong>Reduced to normal:</strong> any rejection, or any sign that production has become
              irregular.
            </li>
            <li>
              <strong>Discontinuation:</strong> if five lots remain on tightened inspection, supply
              should stop until the supplier has corrected the process.
            </li>
          </ul>
          <p>
            These rules are the reason a supplier with a rejection history gets a larger sample and a
            stricter plan on the next order. An inspector who always applies normal inspection is
            applying the standard only halfway.
          </p>

          <h2 className="text-2xl font-bold pt-4">Six common misreadings of AQL</h2>
          <div className="space-y-5">
            <div>
              <p className="font-bold mb-1">AQL is not a defect-rate ceiling</p>
              <p>
                A lot running at three times the AQL can still pass a normal single plan. The standard
                controls the risk of accepting bad lots at a chosen level; it never guarantees that the
                shipment contains no more than the AQL percentage.
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">AQL is not a target</p>
              <p>
                Suppliers sometimes treat the AQL number as the defect rate they are allowed to
                produce. It is the level at which the buyer accepts a defined risk, not a production
                allowance. A process average sitting at the AQL means half the lots are near rejection.
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">AQL 0 does not exist as a table column</p>
              <p>
                There is no AQL of zero in the plans. Zero acceptance is expressed as a critical defect
                class with Ac 0 and Re 1, which is a different construction from an AQL row and is
                normally written into the specification separately.
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">One AQL per class, not one per shipment</p>
              <p>
                Critical, major and minor are judged independently. Averaging them, or reporting a
                single combined defect rate, loses the information the plan was built to produce.
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Sampling is not sorting</p>
              <p>
                A passed lot can still contain defective units. Sampling estimates; sorting removes.
                When the cost of a single failure is high, the answer is a tighter plan plus sorting,
                not a smaller AQL read as a promise.
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">The sample must be random across the lot</p>
              <p>
                A sample drawn from the first three cartons on the pallet is not a sample of the lot.
                The standard assumes units are selected without regard to their position, which in
                practice means pulling cartons from different pallets, layers and production batches.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold pt-4">From table to factory floor</h2>
          <p>
            In a real pre-shipment inspection the plan is fixed before the inspector arrives: lot size
            from the packing list, inspection level from the buyer&apos;s specification, AQL values per
            defect class. The inspector then draws the sample at random, records defects against the
            agreed definitions, and compares the counts with Ac and Re. The report has to show the lot
            size, the code letter, the sample size and the accept and reject numbers, otherwise the
            buyer cannot tell whether the result means anything.
          </p>
          <p>
            If you want the numbers for a specific shipment, use the{' '}
            <a href="/aql-calculator" className="text-primary-600 underline">AQL calculator</a>. If you
            want the sampling done, and the defects judged against written definitions, see our{' '}
            <a href="/services/psi" className="text-primary-600 underline">pre-shipment inspection service</a>{' '}
            or{' '}
            <a href="/contact" className="text-primary-600 underline">send us the product details</a>{' '}
            for a quote.
          </p>

          <h2 className="text-2xl font-bold pt-4">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-bold mb-2">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-black mb-4">Need an inspection that uses these numbers correctly?</h2>
          <p className="text-slate-300 mb-8">
            We apply ANSI/ASQ Z1.4 and ISO 2859-1 plans on site, record every defect against written
            definitions, and deliver the report within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/order" className="rounded-full bg-primary-600 px-8 py-3 font-bold hover:bg-primary-700 transition-colors">
              Book an Inspection
            </a>
            <a href="/contact" className="rounded-full border border-white/40 px-8 py-3 font-bold hover:bg-white/10 transition-colors">
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
