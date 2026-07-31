import React from 'react';
import { Package, Search, Plus } from 'lucide-react';

const ProductListSidebar = ({ products, activeProduct, setActiveProduct }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border-gray overflow-hidden flex flex-col h-[calc(100vh-16rem)] min-h-[500px]">
      <div className="p-4 border-b border-border-gray bg-primary-gray flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-primary-dark text-sm uppercase tracking-wider">Print Products</h3>
          <button className="text-primary-blue hover:text-primary-dark transition-colors"><Plus size={18} /></button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {products.map(p => (
          <div 
            key={p.id || p._id} 
            className={`flex items-center gap-3 p-4 border-b border-border-gray cursor-pointer transition-colors ${activeProduct && (activeProduct.id === p.id || activeProduct._id === p._id) ? 'bg-blue-50 border-l-4 border-l-primary-blue' : 'hover:bg-primary-gray border-l-4 border-l-transparent'}`}
            onClick={() => setActiveProduct(p)}
          >
            <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${(activeProduct && (activeProduct.id === p.id || activeProduct._id === p._id)) ? 'bg-primary-blue text-white' : 'bg-slate-100 text-text-light'}`}>
              <Package size={18} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-sm text-primary-dark truncate">{p.name}</span>
              <span className="text-xs text-text-light">{p.category || 'Standard'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSidebar;
