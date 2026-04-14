'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function AdminGenerateCodePage() {
  const [amount, setAmount] = useState<number | string>('')
  const [isPercentage, setIsPercentage] = useState(false)
  const [validityDays, setValidityDays] = useState<number | string>(30)
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)

  const generateRandomPrefix = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `MZ${result}`
  }

  const handleGenerate = () => {
    const prefix = generateRandomPrefix();
    const value = `${amount}${isPercentage ? 'P' : ''}`;
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(validityDays));
    const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0');
    const day = expiryDate.getDate().toString().padStart(2, '0');
    const dateStr = `${month}${day}`;

    const code = `${prefix}${value}_${dateStr}`;
    setGeneratedCode(code);
    setCopied(false);
  }

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="container mx-auto max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-lg p-10 space-y-8">
          <h1 className="text-center text-3xl font-black text-slate-800 tracking-tight">Code Generator</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Amount / Percentage</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
                placeholder="e.g., 50 or 10"
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox"
                id="isPercentage"
                checked={isPercentage}
                onChange={(e) => setIsPercentage(e.target.checked)}
                className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
              />
              <label htmlFor="isPercentage" className="ml-3 block text-sm font-bold text-slate-600">Is Percentage (%)</label>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Validity (in days)</label>
              <input 
                type="number"
                value={validityDays}
                onChange={(e) => setValidityDays(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-lg font-bold focus:border-primary-500 focus:ring-0 transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            className="w-full bg-primary-600 text-white font-bold py-4 rounded-lg hover:bg-primary-700 transition-all shadow-md"
          >
            Generate Code
          </button>

          {generatedCode && (
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-fade-in">
              <p className="text-sm text-slate-500 font-bold mb-2">Generated Code:</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-mono font-bold text-slate-800 break-all">{generatedCode}</p>
                <button onClick={handleCopy} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-500" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
