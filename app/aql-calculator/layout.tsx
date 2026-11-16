import type { Metadata } from 'next'
import { pageMetadata } from '../lib/meta'

export const metadata: Metadata = pageMetadata(
  '/aql-calculator',
  'AQL Calculator - Free AQL Sampling Table | Muzhuo Inspection',
  'Free AQL calculator for quality inspections: enter lot size and AQL level to get sample size, acceptance and rejection numbers (ISO 2859-1).',
)

export default function AqlCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
