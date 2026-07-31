import React from 'react';
import TopNavbar from '../components/editor/TopNavbar';
import { FileUp, CheckCircle } from 'lucide-react';

const Proofing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-dark font-sans text-white">
      <TopNavbar />
      
      <div className="flex-1 flex flex-col items-center py-16 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-6">
             <span className="text-primary-blue text-xs font-bold tracking-widest uppercase">SMART ARTWORK UPLOAD</span>
             <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">Upload files and catch print issues before ordering.</h1>
             <p className="text-slate-300 text-lg leading-relaxed">The customer uploads PDF, PNG, JPG, AI, EPS, or SVG files. The system checks artwork and gives clear fixes before payment, reducing manual messages and delays.</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-emerald-500/30 text-emerald-400 text-sm font-medium"><CheckCircle size={16} /> Bleed & trim marks</div>
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-amber-500/30 text-amber-400 text-sm font-medium"><CheckCircle size={16} /> CMYK/RGB warning</div>
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-emerald-500/30 text-emerald-400 text-sm font-medium"><CheckCircle size={16} /> Low-resolution images</div>
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-rose-500/30 text-rose-400 text-sm font-medium"><CheckCircle size={16} /> Font outline check</div>
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-emerald-500/30 text-emerald-400 text-sm font-medium"><CheckCircle size={16} /> Wrong product size</div>
               <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-emerald-500/30 text-emerald-400 text-sm font-medium"><CheckCircle size={16} /> Safe-zone warning</div>
             </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:bg-slate-800 transition-colors cursor-pointer group">
              <FileUp size={48} className="text-primary-blue mb-4 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Drop your artwork here</h3>
              <p className="text-slate-400 text-sm mb-6">PDF preferred • 5mm bleed • CMYK • 300dpi+</p>
              <button className="bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-2.5 rounded-full font-medium transition-colors">Upload Artwork</button>
            </div>
            
            <div className="bg-white text-primary-dark rounded-xl p-6 shadow-lg">
               <div className="flex items-center justify-between border-b border-border-gray pb-4 mb-4">
                 <h4 className="font-bold text-lg">Proof Report</h4>
                 <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">4 Passed</span>
               </div>
               <ul className="flex flex-col gap-3 text-sm font-medium text-text-main">
                 <li className="flex items-center gap-2">📄 Product size matches</li>
                 <li className="flex items-center gap-2">📄 Bleed detected</li>
                 <li className="flex items-center gap-2">📄 Images above 300dpi</li>
                 <li className="flex items-center gap-2">📄 Ready for customer approval</li>
               </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Proofing;
