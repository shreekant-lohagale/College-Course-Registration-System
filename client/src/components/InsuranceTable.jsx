import React, { useState } from 'react';
import { Shield, Plus, Trash2, HeartPulse, User, MapPin, DollarSign, Activity, AlertCircle } from 'lucide-react';
import axios from 'axios';

const InsuranceTable = ({ records, onRecordAdded, onRecordDeleted, token }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [formData, setFormData] = useState({
    age: '', sex: 'male', bmi: '', children: '0', smoker: 'no', region: 'southeast', charges: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post('http://localhost:5000/api/insurance', formData, {
         headers: { Authorization: `Bearer ${token}` }
       });
       onRecordAdded(res.data);
       setIsAdding(false);
       setFormData({ age: '', sex: 'male', bmi: '', children: '0', smoker: 'no', region: 'southeast', charges: '' });
    } catch (err) {
       alert('Failed to add insurance record');
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
       const res = await axios.get('http://localhost:5000/api/insurance/analyze', {
         headers: { Authorization: `Bearer ${token}` }
       });
       if (res.data.success) {
         setAnalysisResult(res.data.data);
       }
    } catch (err) {
       alert('Failed to run ML model analysis. Make sure Python is installed with required libraries.');
    } finally {
       setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ... header ... */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Insurance Portfolio</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Medical Cost Analysis System</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {isAdding ? 'Close Form' : <><Plus className="h-4 w-4" /> New Record</>}
        </button>
      </div>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className="glass-card p-8 rounded-[3rem] border-indigo-500/50 bg-indigo-600/5 animate-in zoom-in duration-500">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                   <Activity className="h-5 w-5 text-indigo-400" />
                   <h4 className="text-xl font-black text-white uppercase tracking-tighter">Analysis Results</h4>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                   "{analysisResult.conclusion}"
                </p>
             </div>
             
             <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 text-center">Linear Reg (R2)</span>
                   <p className="text-2xl font-black text-blue-500 text-center">{analysisResult.linear_regression.r2}</p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 text-center">Random Forest (R2)</span>
                   <p className="text-2xl font-black text-emerald-500 text-center">{analysisResult.random_forest.r2}</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {isAdding && (
        /* ... form content ... */
        <div className="glass-card p-8 rounded-[2.5rem] border-blue-500/30 animate-in zoom-in duration-300">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Age</label>
               <input type="number" required placeholder="25" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Sex</label>
               <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.sex} onChange={e => setFormData({...formData, sex: e.target.value})}>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">BMI</label>
               <input type="number" step="0.1" required placeholder="24.5" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.bmi} onChange={e => setFormData({...formData, bmi: e.target.value})} />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Smoker</label>
               <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.smoker} onChange={e => setFormData({...formData, smoker: e.target.value})}>
                 <option value="no">No</option>
                 <option value="yes">Yes</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Region</label>
               <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}>
                 <option value="southeast">Southeast</option>
                 <option value="southwest">Southwest</option>
                 <option value="northeast">Northeast</option>
                 <option value="northwest">Northwest</option>
               </select>
             </div>
             <div className="space-y-2 md:col-span-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Charges (Actual Cost)</label>
               <input type="number" required placeholder="12800" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none" value={formData.charges} onChange={e => setFormData({...formData, charges: e.target.value})} />
             </div>
             <div className="flex items-end">
               <button type="submit" className="w-full py-3 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-400 transition-colors">Save Record</button>
             </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center glass-card rounded-[3rem] border-dashed border-slate-800">
            <HeartPulse className="h-12 w-12 text-slate-800 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No insurance data found</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record._id} className="glass-card p-6 rounded-[2rem] hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">
                 <Shield className="h-20 w-20" />
              </div>

              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800">
                    <User className="h-3 w-3 text-blue-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">{record.sex}, {record.age}y</span>
                 </div>
                 <button 
                  onClick={() => onRecordDeleted(record._id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all active:scale-90"
                 >
                    <Trash2 className="h-4 w-4" />
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">BMI Index</span>
                    <div className="flex items-center gap-2">
                       <Activity className="h-4 w-4 text-emerald-500" />
                       <span className="text-lg font-black text-white">{record.bmi}</span>
                    </div>
                 </div>
                 <div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Smoker Status</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${record.smoker === 'yes' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'} uppercase`}>
                       {record.smoker === 'yes' ? 'Smoker' : 'Non-Smoker'}
                    </span>
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
                 <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{record.region}</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                       {record.charges.toLocaleString()}
                    </span>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-8 glass-card rounded-[2.5rem] bg-indigo-600/5 border-indigo-500/20 flex flex-col md:flex-row items-center gap-8">
         <div className="h-16 w-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-600/20 shrink-0">
            <Activity className="h-8 w-8 text-white" />
         </div>
         <div>
            <h4 className="text-xl font-black text-white mb-1">Predictive Analysis</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
               The current medical cost model uses Linear Regression to predict charges based on user demographics. This integration allows for real-time risk assessment and insurance premium calculation.
            </p>
         </div>
         <button 
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="md:ml-auto px-8 py-4 bg-white text-indigo-950 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
         >
            {isAnalyzing ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : 'Run ML Model →'}
         </button>
      </div>
    </div>
  );
};

import { Loader2 } from 'lucide-react';

export default InsuranceTable;
