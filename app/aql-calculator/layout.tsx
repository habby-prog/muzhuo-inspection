import type { Metadata } from 'next'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL + '/aql-calculator' },
  title: 'AQL Calculator - Free AQL Sampling Table | Muzhuo Inspection',
  description:
    'Free AQL calculator for quality inspections: enter lot size and AQL level to get sample size, acceptance and rejection numbers (ISO 2859-1).',
}

export default function AqlCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
