import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import ProductListSidebar from '../components/admin/ProductListSidebar';
import ProductBasicForm from '../components/admin/ProductBasicForm';
import ProductDimensionForm from '../components/admin/ProductDimensionForm';

import ProductTemplatesForm from '../components/admin/ProductTemplatesForm';
import ProductPricingForm from '../components/admin/ProductPricingForm';
import ProductExportForm from '../components/admin/ProductExportForm';

// Dummy data based on mockups
const dummyProducts = [
  { id: 1, name: 'Business Card', slug: 'business-card', category: 'Print Products', status: 'Active', sizeDesc: '90 x 55mm', metaDesc: '5mm bleed • 300dpi • CMYK', dimensions: { width: 90, height: 55, unit: 'mm', bleed: '5mm', safeMargin: '8mm', minimumDpi: '300dpi', colourMode: 'CMYK', acceptedFiles: 'PDF, AI, EPS, SVG, PNG, JPG', exportStandard: 'PDF/X-4' } },
  { id: 2, name: 'Pull-Up Banner', slug: 'pull-up-banner', category: 'Wide Format', status: 'Active', sizeDesc: '850 x 2000mm', metaDesc: '5mm bleed • 510gsm scrimless', dimensions: { width: 850, height: 2000, unit: 'mm', bleed: '5mm', safeMargin: '8mm', minimumDpi: '300dpi', colourMode: 'CMYK', acceptedFiles: 'PDF, AI, EPS, SVG, PNG, JPG', exportStandard: 'PDF/X-4' } },
  { id: 3, name: 'A3 Poster', slug: 'a3-poster', category: 'Print Products', status: 'Active', sizeDesc: '297 x 420mm', metaDesc: '5mm bleed • synthetic/paper' },
  { id: 4, name: 'Sticker Label', slug: 'sticker-label', category: 'Labels', status: 'Active', sizeDesc: 'Custom Die Cut', metaDesc: '1200dpi • kiss cut • roll/sheet' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Products');
  const [activeProductId, setActiveProductId] = useState(2);
  const [products, setProducts] = useState(dummyProducts);

  const activeProduct = products.find(p => p.id === activeProductId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts(products.map(p => {
      if (p.id === activeProductId) {
        if (name === 'dimensions') {
          return { ...p, dimensions: value };
        }
        return { ...p, [name]: value };
      }
      return p;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Products':
        return <ProductBasicForm product={activeProduct} handleChange={handleChange} />;
      case 'Dimensions':
        return <ProductDimensionForm product={activeProduct} handleChange={handleChange} />;
      case 'Templates':
        return <ProductTemplatesForm product={activeProduct} />;
      case 'Pricing':
        return <ProductPricingForm product={activeProduct} />;
      case 'Export Rules':
        return <ProductExportForm product={activeProduct} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-page-wrapper">
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="admin-content-grid">
          <ProductListSidebar 
            products={products} 
            activeProductId={activeProductId} 
            setActiveProductId={setActiveProductId} 
          />
          <div className="admin-form-area">
            {renderContent()}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
