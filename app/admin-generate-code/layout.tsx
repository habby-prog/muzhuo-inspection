import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Muzhuo Inspection',
  robots: { index: false, follow: false },
}

export default function AdminGenerateCodeLayout({ children }: { children: React.ReactNode }) {
  return children
}
