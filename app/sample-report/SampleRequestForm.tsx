'use client'
import { useState } from 'react'

const CATEGORIES = [
  ['textiles', 'Textiles & apparel'],
  ['electronics', 'Electronics & electrical'],
  ['industrial', 'Industrial / machinery'],
  ['factory', 'Factory assessment'],
  ['hardline', 'Hardline / consumer goods'],
  ['ceramic', 'Ceramic & kitchenware'],
  ['loading', 'Container loading supervision'],
]

export default function SampleRequestForm() {
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('textiles')
  const [country, setCountry] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, category, country, note }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus('sent')
    } catch (err: any) {
      setStatus('error')
      setError(err.message || 'Request failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
        <h3 className="text-xl font-bold text-green-800 mb-2">Request received</h3>
        <p className="text-green-700">
          We will send the matching sample report to {email}, normally within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-slate-50 p-8 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Work email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Product category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-primary-500 focus:outline-none"
          >
            {CATEGORIES.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Destination country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Mexico"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">What are you buying? (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Product, order volume, what you want to check"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:outline-none"
        />
      </div>
      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-primary-600 px-8 py-3 font-bold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Email me the sample'}
      </button>
      <p className="text-xs text-slate-500">
        One email, with the report attached. No newsletter, no sales sequence.
      </p>
    </form>
  )
}
