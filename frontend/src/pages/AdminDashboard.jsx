import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import ProductListSidebar from '../components/admin/ProductListSidebar';
import ProductBasicForm from '../components/admin/ProductBasicForm';
import TopNavbar from '../components/editor/TopNavbar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Products');
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) setActiveProduct(data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!activeProduct || !activeProduct._id) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/products/${activeProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeProduct)
      });
      if (response.ok) {
        alert('Product changes saved successfully!');
      } else {
        alert('Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving changes.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onSave={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductListSidebar 
              products={products} 
              activeProduct={activeProduct} 
              setActiveProduct={setActiveProduct} 
            />
          </div>
          <div className="lg:col-span-3">
            {activeTab === 'Products' && <ProductBasicForm product={activeProduct} onChange={setActiveProduct} />}
            {activeTab !== 'Products' && (
              <div className="bg-white rounded-xl shadow-sm border border-border-gray p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[400px]">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl text-slate-400 border-4 border-white shadow-sm mb-2">🚧</div>
                <h3 className="text-xl font-bold text-primary-dark">Under Construction</h3>
                <p className="text-text-light max-w-sm">The {activeTab} panel is still being built. Stay tuned for future updates.</p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
