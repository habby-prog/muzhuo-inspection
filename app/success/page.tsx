import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
          <h1 className="text-4xl font-black mb-6 uppercase tracking-tighter">Order Confirmed!</h1>
          <p className="text-xl text-slate-500 mb-12">Thank you for choosing Muzhuo Inspection. We have received your order and payment. Our team will contact you within 24 hours to confirm the final details.</p>
          <div className="space-y-6">
            <a href="/" className="block w-full bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-full hover:bg-slate-800 transition-all">Return to Home</a>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">A confirmation email has been sent to you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
