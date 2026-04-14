'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Upload, X, FileText, CheckCircle } from 'lucide-react'

const services = [
  { id: 'factory-audit', name: 'Factory Audit', price: 299 },
  { id: 'psi', name: 'Pre-shipment Inspection', price: 199 },
  { id: 'cls', name: 'Container Loading Supervision', price: 149 },
]

export default function OrderForm() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get('service')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    serviceId: initialService || 'psi',
    email: '',
    inspectionDate: '',
    factoryName: '',
    factoryAddress: '',
    productDescription: '',
  })
  
  const [files, setFiles] = useState<{name: string, size: string}[]>([]);
  const [isReadyForPayment, setIsReadyForPayment] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [usedDiscountCodes, setUsedDiscountCodes] = useState<string[]>([]);useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }))
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const selectedService = services.find(s => s.id === formData.serviceId)
  const finalPrice = selectedService ? Math.max(0, selectedService.price - discountAmount) : 0;

  const handleApplyCode = () => {
    const code = discountCode.trim().toUpperCase();

    if (usedDiscountCodes.includes(code)) {
      setDiscountMessage('This discount code has already been used.');
      return;
    }

    const staticPrefix = 'RUMUQOI';
    const dynamicPrefixStarter = 'MZ';

    const parts = code.split('_');
    if (parts.length !== 2) {
      setDiscountAmount(0);
      setDiscountMessage('Invalid code format');
      return;
    }

    const prefixAndValue = parts[0];
    const dateStr = parts[1];

    let valueStr = '';
    if (prefixAndValue.startsWith(staticPrefix)) {
      valueStr = prefixAndValue.substring(staticPrefix.length);
    } else if (prefixAndValue.startsWith(dynamicPrefixStarter) && prefixAndValue.length > 8) {
      // Assuming MZ + 6 random letters = 8 chars
      valueStr = prefixAndValue.substring(8);
    } else {
      setDiscountAmount(0);
      setDiscountMessage('Invalid code');
      return;
    }
    
    // Date validation
    const today = new Date();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = today.getDate().toString().padStart(2, '0');
    const currentDateStr = `${currentMonth}${currentDay}`;
    
    const codeMonth = parseInt(dateStr.substring(0, 2), 10);
    const codeDay = parseInt(dateStr.substring(2, 4), 10);

    if (isNaN(codeMonth) || isNaN(codeDay) || dateStr.length !== 4) {
        setDiscountAmount(0);
        setDiscountMessage('Invalid code format');
        return;
    }
    
    if (parseInt(currentDateStr, 10) > parseInt(dateStr, 10)) {
        setDiscountAmount(0);
        setDiscountMessage('Code expired');
        return;
    }

    let newDiscount = 0;
    let message = '';

    if (valueStr.endsWith('P')) {
      const percentage = parseFloat(valueStr.slice(0, -1));
      if (!isNaN(percentage) && selectedService) {
        newDiscount = (selectedService.price * percentage) / 100;
        message = `Discount Applied: ${percentage}% (-$${newDiscount.toFixed(2)})`;
      }
    } else {
      const amount = parseFloat(valueStr);
      if (!isNaN(amount)) {
        newDiscount = amount;
        message = `Discount Applied: -$${newDiscount.toFixed(2)}`;
      }
    }

    if (newDiscount > 0) {
      setDiscountAmount(newDiscount);
      setDiscountMessage(message);
      setUsedDiscountCodes(prev => [...prev, code]);
    } else {
      setDiscountAmount(0);
      setDiscountMessage('Invalid code value');
    }
  };

  const validateForm = () => {
    return (
      formData.email && 
      formData.inspectionDate && 
      formData.factoryName && 
      formData.factoryAddress && 
      formData.productDescription
    )
  }

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter">Book Your Inspection</h1>
        
        <div className="bg-white p-10 rounded-3xl shadow-2xl">
          {!isReadyForPayment ? (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-3">Select Service</label>
                <select 
                  name="serviceId" 
                  value={formData.serviceId} 
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                  required
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (${s.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-3">Your Email (For Report)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest mb-3">Inspection Date</label>
                  <input 
                    type="date" 
                    name="inspectionDate"
                    value={formData.inspectionDate}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest mb-3">Factory Name</label>
                  <input 
                    type="text" 
                    name="factoryName"
                    value={formData.factoryName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                    placeholder="e.g. ABC Manufacturing"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-3">Factory Address</label>
                <input 
                  type="text" 
                  name="factoryAddress"
                  value={formData.factoryAddress}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                  placeholder="City, Province, China"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-3">Product Description</label>
                <textarea 
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                  placeholder="What items are we checking?"
                  required
                ></textarea>
              </div>

              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-3">Attachments (Optional)</label>
                <p className="text-xs text-slate-500 mb-4 font-bold uppercase tracking-tight">Upload order lists, product photos, or specific inspection requirements.</p>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 bg-slate-50 p-8 rounded-2xl text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    multiple 
                  />
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-4 group-hover:text-primary-600 group-hover:scale-110 transition-all" />
                  <p className="font-black text-slate-600 uppercase tracking-widest text-sm">Click or Drag files to upload</p>
                  <p className="text-xs text-slate-400 mt-2">Support PDF, DOCX, JPG, PNG (Max 10MB per file)</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-xl shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{file.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{file.size}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsReadyForPayment(true)}
                disabled={!validateForm()}
                className="w-full bg-primary-600 text-white font-black uppercase tracking-widest py-6 rounded-2xl hover:bg-primary-700 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment (${finalPrice.toFixed(2)})
              </button>
            </div>
          ) : (
            <div className="space-y-10 text-center">
              <div>
                <h3 className="text-2xl font-black uppercase mb-4">Review Your Order</h3>
                <div className="space-y-2 text-slate-600 font-bold">
                  <div className="flex justify-between">
                    <span>{selectedService?.name}</span>
                    <span>${selectedService?.price.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 animate-fade-in">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-900 text-2xl font-black border-t border-slate-200 pt-3 mt-3">
                    <span>Total</span>
                    <span>${finalPrice.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Discount Code Section */}
              <div className="w-full max-w-sm mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Enter Discount Code"
                    className="flex-grow bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                  />
                  <button 
                    onClick={handleApplyCode}
                    className="bg-slate-800 text-white font-black uppercase tracking-widest px-6 rounded-2xl hover:bg-slate-900 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {discountMessage && (
                  <p className={`mt-3 text-sm font-bold ${discountAmount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {discountMessage}
                  </p>
                )}
              </div>

              <div className="border-t border-b border-slate-100 py-6 space-y-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="font-bold opacity-60">Inspection Date:</span>
                  <span className="font-bold">{formData.inspectionDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold opacity-60">Factory:</span>
                  <span className="font-bold">{formData.factoryName}</span>
                </div>
                {files.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="font-bold opacity-60">Attachments:</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {files.length} Files Uploaded
                    </span>
                  </div>
                )}
              </div>

              <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
                <PayPalButtons 
                  style={{ layout: "vertical", shape: "pill", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: finalPrice.toFixed(2),
                            currency_code: "USD"
                          },
                          description: `Muzhuo Inspection - ${selectedService?.name} for ${formData.factoryName}. Includes ${files.length} attachments.`,
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return (actions.order as any).capture().then((details: any) => {
                      alert("Transaction completed by " + details.payer.name.given_name);
                      window.location.href = "/success";
                    });
                  }}
                />
              </PayPalScriptProvider>

              <button 
                onClick={() => setIsReadyForPayment(false)}
                className="text-sm font-bold text-slate-400 hover:text-primary-600 underline"
              >
                ← Back to Edit Details
              </button>
            </div>
          )}
        </div>
        <p className="mt-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Secure Checkout via PayPal. Apple Pay & Credit Cards Supported.</p>
      </div>
    </div>
  )
}
