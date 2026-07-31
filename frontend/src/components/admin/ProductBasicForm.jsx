import React from 'react';
import { Save } from 'lucide-react';

const ProductBasicForm = ({ product, onChange }) => {
  if (!product) return <div className="bg-white rounded-xl shadow-sm border border-border-gray p-8 text-center text-text-light">Select a product to view details.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border-gray p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border-gray pb-4">
         <h3 className="font-bold text-lg text-primary-dark">Product Details</h3>
         <span className="bg-slate-100 text-text-light px-3 py-1 rounded text-xs font-bold font-mono">ID: {product._id || product.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Product Name</label>
          <input 
            type="text" 
            className="px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium text-text-main"
            value={product.name} 
            onChange={e => onChange({ ...product, name: e.target.value })} 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Category</label>
          <select 
            className="px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium text-text-main"
            value={product.category}
            onChange={e => onChange({ ...product, category: e.target.value })}
          >
            <option value="Stationery">Stationery</option>
            <option value="Signage">Signage</option>
            <option value="Packaging">Packaging</option>
            <option value="Apparel">Apparel</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Description</label>
          <textarea 
            className="px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm text-text-main min-h-[100px]"
            value={product.description || ''}
            onChange={e => onChange({ ...product, description: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Base Price ($)</label>
          <input 
            type="number" 
            className="px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium text-text-main"
            value={product.basePrice} 
            onChange={e => onChange({ ...product, basePrice: parseFloat(e.target.value) })} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBasicForm;
