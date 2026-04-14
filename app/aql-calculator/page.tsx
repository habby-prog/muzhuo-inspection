'use client'

import { useState, useEffect } from 'react'
import { Info } from 'lucide-react'

// --- AQL Data ---
const LOT_SIZE_TABLE = [
  [8, 'A', 'A', 'B', 'A', 'A', 'A', 'A'],
  [15, 'A', 'B', 'C', 'A', 'A', 'A', 'A'],
  [25, 'B', 'C', 'D', 'A', 'A', 'B', 'B'],
  [50, 'C', 'D', 'E', 'A', 'B', 'C', 'C'],
  [90, 'D', 'E', 'F', 'B', 'B', 'C', 'D'],
  [150, 'D', 'F', 'G', 'B', 'C', 'C', 'D'],
  [280, 'E', 'G', 'H', 'B', 'C', 'D', 'E'],
  [500, 'F', 'H', 'J', 'C', 'C', 'E', 'F'],
  [1200, 'G', 'J', 'K', 'C', 'D', 'E', 'F'],
  [3200, 'H', 'K', 'L', 'C', 'D', 'F', 'G'],
  [10000, 'J', 'L', 'M', 'C', 'D', 'F', 'G'],
  [35000, 'K', 'M', 'N', 'C', 'D', 'F', 'H'],
  [150000, 'L', 'N', 'P', 'D', 'E', 'G', 'J'],
  [500000, 'M', 'P', 'Q', 'D', 'E', 'H', 'K'],
  [999999999, 'N', 'Q', 'R', 'D', 'E', 'H', 'K'] 
];

const AQL_PLAN_TABLE: Record<string, [number, Record<string, [number, number]>]> = {
  'A': [2, {'0.0': [0, 1], '0.65': [0, 1], '1.0': [0, 1], '1.5': [0, 1], '2.5': [0, 1], '4.0': [0, 1], '6.5': [0, 1] }],
  'B': [3, {'0.0': [0, 1], '0.65': [0, 1], '1.0': [0, 1], '1.5': [0, 1], '2.5': [0, 1], '4.0': [0, 1], '6.5': [1, 2] }],
  'C': [5, {'0.0': [0, 1], '0.65': [0, 1], '1.0': [0, 1], '1.5': [0, 1], '2.5': [1, 2], '4.0': [1, 2], '6.5': [2, 3] }],
  'D': [8, {'0.0': [0, 1], '0.40': [0, 1], '0.65': [0, 1], '1.0': [1, 2], '1.5': [1, 2], '2.5': [2, 3], '4.0': [3, 4], '6.5': [5, 6] }],
  'E': [13, {'0.0': [0, 1], '0.40': [0, 1], '0.65': [1, 2], '1.0': [1, 2], '1.5': [2, 3], '2.5': [3, 4], '4.0': [5, 6], '6.5': [7, 8] }],
  'F': [20, {'0.0': [0, 1], '0.40': [1, 2], '0.65': [1, 2], '1.0': [2, 3], '1.5': [3, 4], '2.5': [5, 6], '4.0': [7, 8], '6.5': [10, 11] }],
  'G': [32, {'0.0': [0, 1], '0.40': [1, 2], '0.65': [2, 3], '1.0': [3, 4], '1.5': [5, 6], '2.5': [7, 8], '4.0': [10, 11], '6.5': [14, 15] }],
  'H': [50, {'0.0': [0, 1], '0.40': [2, 3], '0.65': [3, 4], '1.0': [5, 6], '1.5': [7, 8], '2.5': [10, 11], '4.0': [14, 15], '6.5': [21, 22] }],
  'J': [80, {'0.0': [1, 2], '0.15': [0, 1], '0.25': [0, 1], '0.40': [3, 4], '0.65': [5, 6], '1.0': [7, 8], '1.5': [10, 11], '2.5': [14, 15], '4.0': [21, 22], '6.5': [21, 22] }],
  'K': [125, {'0.0': [1, 2], '0.15': [1, 2], '0.25': [1, 2], '0.40': [5, 6], '0.65': [7, 8], '1.0': [10, 11], '1.5': [14, 15], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'L': [200, {'0.0': [2, 3], '0.10': [0, 1], '0.15': [1, 2], '0.25': [2, 3], '0.40': [7, 8], '0.65': [10, 11], '1.0': [14, 15], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'M': [315, {'0.0': [3, 4], '0.10': [1, 2], '0.15': [2, 3], '0.25': [3, 4], '0.40': [10, 11], '0.65': [14, 15], '1.0': [21, 22], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'N': [500, {'0.0': [5, 6], '0.10': [2, 3], '0.15': [3, 4], '0.25': [5, 6], '0.40': [14, 15], '0.65': [21, 22], '1.0': [21, 22], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'P': [800, {'0.0': [7, 8], '0.10': [3, 4], '0.15': [5, 6], '0.25': [7, 8], '0.40': [21, 22], '0.65': [21, 22], '1.0': [21, 22], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'Q': [1250, {'0.0': [10, 11], '0.10': [5, 6], '0.15': [7, 8], '0.25': [10, 11], '0.40': [21, 22], '0.65': [21, 22], '1.0': [21, 22], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }],
  'R': [2000, {'0.0': [14, 15], '0.10': [7, 8], '0.15': [10, 11], '0.25': [14, 15], '0.40': [21, 22], '0.65': [21, 22], '1.0': [21, 22], '1.5': [21, 22], '2.5': [21, 22], '4.0': [21, 22], '6.5': [21, 22] }]
};

export default function AQLCalculator() {
  const [lotSize, setLotSize] = useState(50000)
  const [level, setLevel] = useState('II')
  const [aqlCritical, setAqlCritical] = useState('0.0')
  const [aqlMajor, setAqlMajor] = useState('2.5')
  const [aqlMinor, setAqlMinor] = useState('4.0')
  const [results, setResults] = useState<any>({})
  const [combinedPlan, setCombinedPlan] = useState<any>({})
  const [styles, setStyles] = useState([
    { id: 1, name: 'Style A', qty: 0, samples: 0, share: 0 },
    { id: 2, name: 'Style B', qty: 0, samples: 0, share: 0 },
    { id: 3, name: 'Style C', qty: 0, samples: 0, share: 0 },
  ])
  const [totalSampleForStyles, setTotalSampleForStyles] = useState(0)

  useEffect(() => {
    calculate()
  }, [lotSize, level, aqlCritical, aqlMajor, aqlMinor])

  useEffect(() => {
    if (results.critical && results.major && results.minor) {
      calculateCombinedPlan()
    }
  }, [results])

  useEffect(() => {
    if (combinedPlan.sample) {
      setTotalSampleForStyles(combinedPlan.sample)
    }
  }, [combinedPlan.sample])

  const styleQtys = JSON.stringify(styles.map(s => s.qty));
  useEffect(() => {
    const totalQty = styles.reduce((sum, s) => sum + (s.qty || 0), 0);
    if (totalQty <= 0 || totalSampleForStyles <= 0) {
      if (styles.some(s => s.samples !== 0)) {
        setStyles(prevStyles => prevStyles.map(s => ({ ...s, samples: 0, share: 0 })));
      }
      return;
    }

    let tempStyles = styles.map(s => {
      const exact = (s.qty / totalQty) * totalSampleForStyles;
      return { ...s, _exact: exact, samples: Math.floor(exact) };
    });

    let remainder = totalSampleForStyles - tempStyles.reduce((sum, s) => sum + s.samples, 0);
    const sortedByRemainder = [...tempStyles].sort((a, b) => (b._exact - b.samples) - (a._exact - a.samples));

    for (let i = 0; i < remainder; i++) {
      sortedByRemainder[i % sortedByRemainder.length].samples++;
    }

    const calculatedSamplesMap = new Map(sortedByRemainder.map(s => [s.id, s.samples]));
    
    const newStyles = styles.map(s => ({
      ...s,
      samples: calculatedSamplesMap.get(s.id) || 0,
      share: totalQty > 0 ? (s.qty / totalQty) * 100 : 0,
    }));
    
    setStyles(prevStyles => {
        const prev = JSON.stringify(prevStyles.map(s => ({samples: s.samples, share: s.share})));
        const next = JSON.stringify(newStyles.map(s => ({samples: s.samples, share: s.share})));
        if (prev === next) {
            return prevStyles;
        }
        return newStyles;
    });
  }, [styleQtys, totalSampleForStyles]);

  const calculate = () => {
    if (lotSize < 2) {
      setResults({})
      setCombinedPlan({})
      return
    }

    const levelMap: Record<string, number> = { 'I': 1, 'II': 2, 'III': 3, 'S1': 4, 'S2': 5, 'S3': 6, 'S4': 7 }
    const levelIndex = levelMap[level]
    let code = ''
    for (const row of LOT_SIZE_TABLE) {
      if (lotSize <= (row[0] as number)) {
        code = row[levelIndex] as string
        break
      }
    }

    setResults({
      critical: getPlan(code, aqlCritical, true),
      major: getPlan(code, aqlMajor),
      minor: getPlan(code, aqlMinor),
    })
  }

  const getPlan = (typeCode: string, aqlVal: string, isCritical: boolean = false) => {
    if (!typeCode) return { sample: 'N/A', accept: 'N/A', reject: 'N/A', code: '' }
    const plan = AQL_PLAN_TABLE[typeCode]
    if (!plan) return { sample: 'N/A', accept: 'N/A', reject: 'N/A', code: typeCode }
    const [sample, aqls] = plan

    if (isCritical && aqlVal === '0.0') {
      return { sample, accept: 0, reject: 1, code: typeCode }
    }
    
    const availableAqls = Object.keys(aqls).map(parseFloat);
    const targetAql = parseFloat(aqlVal);
    const closestAql = availableAqls.reduce((prev, curr) => 
      Math.abs(curr - targetAql) < Math.abs(prev - targetAql) ? curr : prev
    );

    const data = aqls[closestAql.toFixed(1)] || aqls[closestAql.toFixed(2)] || [0, 0]
    return { sample, accept: data[0], reject: data[1], code: typeCode }
  }

  const calculateCombinedPlan = () => {
    const { critical, major, minor } = results;
    if (!critical?.sample || !major?.sample || !minor?.sample) return;

    const samples = [critical.sample, major.sample, minor.sample].filter(s => typeof s === 'number');
    if (samples.length === 0) return;

    const maxSample = Math.max(...samples);

    let combinedCode = '';
    for (const [code, plan] of Object.entries(AQL_PLAN_TABLE)) {
      if (plan[0] === maxSample) {
        combinedCode = code;
        break;
      }
    }
    if (!combinedCode) {
        const sortedCodes = Object.entries(AQL_PLAN_TABLE).sort((a,b) => a[1][0] - b[1][0]);
        for (const [code, plan] of sortedCodes) {
            if (plan[0] >= maxSample) {
                combinedCode = code;
                break;
            }
        }
    }
    
    const criticalResult = getPlan(combinedCode, aqlCritical, true);
    const majorResult = getPlan(combinedCode, aqlMajor);
    const minorResult = getPlan(combinedCode, aqlMinor);

    const ratio = lotSize > 0 ? ((maxSample / lotSize) * 100) : 0;

    setCombinedPlan({
      sample: maxSample,
      code: combinedCode,
      ratio: ratio.toFixed(2),
      critical: { ...criticalResult, aql: aqlCritical },
      major: { ...majorResult, aql: aqlMajor },
      minor: { ...minorResult, aql: aqlMinor },
    })
  }



  const addStyleRow = () => {
    const newId = styles.length > 0 ? Math.max(...styles.map(s => s.id)) + 1 : 1;
    const newName = String.fromCharCode(65 + (newId - 1) % 26);
    setStyles([...styles, { id: newId, name: `Style ${newName}`, qty: 0, samples: 0, share: 0 }])
  }

  const removeStyleRow = (id: number) => {
    setStyles(styles.filter(s => s.id !== id));
  }

  const updateStyle = (id: number, field: string, value: string | number) => {
    setStyles(styles.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  const totalStyleQty = styles.reduce((sum, s) => sum + s.qty, 0);
  const totalStyleSamples = styles.reduce((sum, s) => sum + s.samples, 0);


  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">AQL Sampling Calculator</h1>
          <p className="text-xl text-slate-500">Based on ISO 2859-1 (ANSI/ASQC Z1.4) standards.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest mb-3">Lot Size (Quantity)</label>
              <input 
                type="number" 
                value={lotSize} 
                onChange={(e) => setLotSize(parseInt(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-xl font-bold focus:border-primary-500 focus:ring-0 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase tracking-widest mb-3">Inspection Level</label>
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-xl font-bold focus:border-primary-500 focus:ring-0 transition-all"
              >
                <option value="I">Level I (Reduced)</option>
                <option value="II">Level II (Normal)</option>
                <option value="III">Level III (Tightened)</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DefectCard 
              type="Critical" 
              color="bg-red-600"
              aql={aqlCritical}
              setAql={setAqlCritical}
              options={['0.0', '0.065', '0.10', '0.15', '0.25', '0.40']}
              data={results.critical}
            />
            <DefectCard 
              type="Major" 
              color="bg-orange-500"
              aql={aqlMajor}
              setAql={setAqlMajor}
              options={['1.0', '1.5', '2.5', '4.0']}
              data={results.major}
            />
            <DefectCard 
              type="Minor" 
              color="bg-yellow-500"
              aql={aqlMinor}
              setAql={setAqlMinor}
              options={['2.5', '4.0', '6.5', '10.0']}
              data={results.minor}
            />
          </div>

          <div className="mt-12 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-800">AQL (Acceptable Quality Limit) is the worst quality level that is still considered acceptable. If the number of defects found is higher than the Re (Reject) value, the shipment should be rejected.</p>
          </div>

          {combinedPlan.sample && (
            <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-primary-500">
              <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase text-center">Combined Sampling Plan</h2>
              <p className="text-center text-slate-500 mb-8">One sample inspected for all defect types simultaneously.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="text-sm uppercase font-bold text-slate-500">Combined Sample Size</div>
                  <div className="text-4xl font-black text-primary-500">{combinedPlan.sample}</div>
                  <div className="text-sm text-slate-400">units</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="text-sm uppercase font-bold text-slate-500">Code Letter</div>
                  <div className="text-4xl font-black text-slate-800">{combinedPlan.code}</div>
                  <div className="text-sm text-slate-400">Sample Code</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="text-sm uppercase font-bold text-slate-500">Sampling Ratio</div>
                  <div className="text-4xl font-black text-slate-800">{combinedPlan.ratio}%</div>
                  <div className="text-sm text-slate-400">of lot size</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-4 text-sm font-black uppercase tracking-widest">Defect Type</th>
                      <th className="p-4 text-sm font-black uppercase tracking-widest">AQL</th>
                      <th className="p-4 text-sm font-black uppercase tracking-widest text-center">Accept (Ac)</th>
                      <th className="p-4 text-sm font-black uppercase tracking-widest text-center">Reject (Re)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CombinedResultRow type="Critical" color="red" data={combinedPlan.critical} />
                    <CombinedResultRow type="Major" color="orange" data={combinedPlan.major} />
                    <CombinedResultRow type="Minor" color="yellow" data={combinedPlan.minor} />
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg flex items-start gap-4">
                <Info className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-amber-800"><strong>How to use:</strong> Draw <strong>{combinedPlan.sample} units</strong> from the lot and record defects by type. Each type is judged against its own accept number. If <em>any</em> type reaches its reject number (Re), the entire lot should be rejected.</p>
             </div>
            </div>
          )}



        </div>

        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase">Style Proportional Distribution</h2>
              <p className="text-slate-500">Split a fixed sample size proportionally across multiple styles.</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-black uppercase tracking-widest">Total Sample Size</label>
              <input 
                type="number"
                value={totalSampleForStyles}
                onChange={(e) => setTotalSampleForStyles(parseInt(e.target.value) || 0)}
                className="w-32 bg-slate-50 border-2 border-slate-100 p-2 rounded-xl text-lg font-bold focus:border-primary-500 focus:ring-0 transition-all text-center"
              />
              <button 
                onClick={() => setTotalSampleForStyles(combinedPlan.sample || 0)}
                title="Sync from Combined Sampling Plan above"
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
              </button>
            </div>
          </div>
          
          <table className="w-full text-left border-collapse mb-4">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-3 text-sm font-black uppercase tracking-widest">Style</th>
                <th className="p-3 text-sm font-black uppercase tracking-widest">Quantity</th>
                <th className="p-3 text-sm font-black uppercase tracking-widest text-center">Samples</th>
                <th className="p-3 text-sm font-black uppercase tracking-widest text-center">Share</th>
                <th className="p-3 text-sm font-black uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {styles.map(style => (
                <tr key={style.id} className="border-b border-slate-100">
                  <td>
                    <input 
                      type="text" 
                      value={style.name} 
                      onChange={e => updateStyle(style.id, 'name', e.target.value)}
                      className="w-full p-2 bg-transparent rounded-lg focus:bg-slate-100"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={style.qty || ''} 
                      onChange={e => updateStyle(style.id, 'qty', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full p-2 bg-transparent rounded-lg focus:bg-slate-100 text-right"
                    />
                  </td>
                  <td className="text-center font-bold text-primary-500 text-lg">{style.samples}</td>
                  <td className="text-center text-slate-500">{style.share ? style.share.toFixed(1) + '%' : '—'}</td>
                  <td className="text-right">
                    <button onClick={() => removeStyleRow(style.id)} className="text-slate-400 hover:text-red-500 p-2">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addStyleRow} className="w-full p-3 border-2 border-dashed border-slate-200 hover:border-primary-500 hover:text-primary-500 rounded-xl transition-all font-semibold text-slate-500">
            + Add Style
          </button>

          {totalStyleQty > 0 && totalSampleForStyles > 0 && combinedPlan.critical && (
            <div className="mt-8 border-t-2 border-slate-100 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
                 <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="text-sm uppercase font-bold text-slate-500">Total Quantity</div>
                    <div className="text-4xl font-black text-slate-800">{totalStyleQty}</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="text-sm uppercase font-bold text-slate-500">Total Samples</div>
                    <div className="text-4xl font-black text-slate-800">{totalStyleSamples}</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="text-sm uppercase font-bold text-slate-500">Overall Ratio</div>
                    <div className="text-4xl font-black text-slate-800">
                      {((totalStyleSamples / totalStyleQty) * 100).toFixed(2)}%
                    </div>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-red-600 text-white text-center">
                    <div className="text-sm opacity-80">Critical AQL {aqlCritical}</div>
                    <div className="text-5xl font-black">{combinedPlan.critical.accept}</div>
                    <div className="font-bold">Accept (Ac)</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-orange-500 text-white text-center">
                    <div className="text-sm opacity-80">Major AQL {aqlMajor}</div>
                    <div className="text-5xl font-black">{combinedPlan.major.accept}</div>
                    <div className="font-bold">Accept (Ac)</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-yellow-500 text-white text-center">
                    <div className="text-sm opacity-80">Minor AQL {aqlMinor}</div>
                    <div className="text-5xl font-black">{combinedPlan.minor.accept}</div>
                    <div className="font-bold">Accept (Ac)</div>
                  </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

function CombinedResultRow({ type, color, data }: any) {
  if (!data) return null;
  const badgeColors: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800',
    Major: 'bg-orange-100 text-orange-800',
    Minor: 'bg-yellow-100 text-yellow-800',
  }
  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
      <td className="p-4 font-bold">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColors[type]}`}>
          {type}
        </span>
      </td>
      <td className="p-4 tabular-nums font-semibold text-slate-700">{data.aql}</td>
      <td className="p-4 text-center tabular-nums font-bold text-green-600 text-lg">{data.accept}</td>
      <td className="p-4 text-center tabular-nums font-bold text-red-600 text-lg">{data.reject}</td>
    </tr>
  )
}

function DefectCard({ type, color, aql, setAql, options, data }: any) {
  return (
    <div className={`${color} p-8 rounded-3xl text-white shadow-xl`}>
      <h3 className="text-2xl font-black uppercase mb-6 text-center tracking-tighter">{type}</h3>
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase opacity-80 mb-2 text-center">Set AQL</label>
        <select 
          value={aql} 
          onChange={(e) => setAql(e.target.value)}
          className="w-full bg-white/20 border border-white/30 p-2 rounded-xl text-lg font-bold outline-none"
        >
          {options.map((o: string) => <option key={o} value={o} className="text-black">{o}</option>)}
        </select>
      </div>
      <div className="space-y-4 font-bold border-t border-white/20 pt-6">
        <div className="flex justify-between">
          <span className="opacity-80">Letter:</span>
          <span>{data?.code}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Sample:</span>
          <span>{data?.sample} units</span>
        </div>
        <div className="flex justify-between p-2 bg-white/10 rounded-lg">
          <span className="opacity-80">Accept (Ac):</span>
          <span>{data?.accept}</span>
        </div>
        <div className="flex justify-between p-2 bg-black/10 rounded-lg">
          <span className="opacity-80">Reject (Re):</span>
          <span>{data?.reject}</span>
        </div>
      </div>
    </div>
  )
}
