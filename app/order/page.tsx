import { Suspense } from 'react'
import OrderForm from './OrderForm'

export default function OrderPage() {
  return (
    <Suspense fallback={<OrderPageLoading />}>
      <OrderForm />
    </Suspense>
  )
}

function OrderPageLoading() {
  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter">Book Your Inspection</h1>
        <div className="bg-white p-10 rounded-3xl shadow-2xl animate-pulse">
          <div className="space-y-8">
            <div className="h-10 bg-slate-200 rounded-2xl"></div>
            <div className="h-10 bg-slate-200 rounded-2xl"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-10 bg-slate-200 rounded-2xl"></div>
              <div className="h-10 bg-slate-200 rounded-2xl"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-2xl"></div>
            <div className="h-24 bg-slate-200 rounded-2xl"></div>
            <div className="h-16 bg-slate-300 rounded-2xl mt-12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
