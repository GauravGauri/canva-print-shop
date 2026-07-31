import React from 'react';

const AdminLayout = ({ children, activeTab, setActiveTab, onSave }) => {
  const tabs = ['Products', 'Dimensions', 'Templates', 'Pricing', 'Export Rules'];

  return (
    <div className="flex flex-col min-h-screen bg-primary-gray font-sans">
      <div className="bg-primary-dark text-white px-8 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h4 className="text-primary-blue text-xs font-bold tracking-widest uppercase">Admin Backend Preview</h4>
          <h2 className="text-3xl font-bold tracking-tight">Manage product dimensions & templates</h2>
          <p className="text-slate-400 text-sm leading-relaxed">This is where your team controls print product sizes, bleed, DPI, media, pricing, proofing rules and design templates.</p>
        </div>
        <button className="bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-colors flex-shrink-0" onClick={onSave}>Save Changes</button>
      </div>

      <div className="bg-white border-b border-border-gray px-8 pt-4 flex gap-8 overflow-x-auto">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-primary-blue text-primary-dark' : 'border-transparent text-text-light hover:text-primary-dark'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
