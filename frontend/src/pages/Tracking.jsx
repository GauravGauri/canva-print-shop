import React, { useState } from 'react';
import TopNavbar from '../components/editor/TopNavbar';
import { FileText, Image, Printer, Scissors, Truck } from 'lucide-react';

const Tracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId) return alert('Enter an Order ID');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        alert('Order not found');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-gray font-sans">
      <TopNavbar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-border-gray py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-6">
              <span className="text-primary-blue text-xs font-bold tracking-widest uppercase">CUSTOMER ENGAGEMENT</span>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary-dark leading-tight">Live order tracking with OTP verification.</h1>
              <p className="text-text-light text-lg leading-relaxed">Customers enter their order number, verify using OTP, then see exactly where the job is held — artwork, proofing, printing department, finishing, pickup, or delivery.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
                <input 
                  type="text" 
                  placeholder="Enter Order ID" 
                  className="w-full sm:w-64 px-4 py-3 rounded-lg border border-border-gray focus:outline-none focus:ring-2 focus:ring-primary-blue shadow-sm bg-primary-gray text-text-main"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <button 
                  className="w-full sm:w-auto bg-primary-dark hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70" 
                  onClick={handleTrack} 
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Track Order'}
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-border-gray overflow-hidden">
              <div className="bg-primary-gray px-6 py-5 border-b border-border-gray flex items-center justify-between">
                 <h4 className="font-bold text-primary-dark">Order {order ? `#${order._id.substring(order._id.length - 6)}` : '#23948'}</h4>
                 <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">{order ? order.status : 'In Printing'}</span>
              </div>
              
              <div className="p-6 flex flex-col gap-6 relative">
                 <div className="absolute left-9 top-8 bottom-12 w-0.5 bg-border-gray z-0"></div>
                 
                 {[
                   { icon: FileText, title: 'Order Received', status: 'completed' },
                   { icon: Image, title: 'Artwork Check', status: 'completed' },
                   { icon: Printer, title: 'Printing Department', status: 'active' },
                   { icon: Scissors, title: 'Finishing', status: 'pending' },
                   { icon: Truck, title: 'Ready / Dispatched', status: 'pending' }
                 ].map((step, i) => (
                   <div key={i} className="flex gap-4 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                        step.status === 'active' ? 'bg-primary-blue text-white ring-4 ring-blue-100' : 
                        'bg-white border-2 border-border-gray text-border-gray'
                      }`}>
                        <step.icon size={12} strokeWidth={step.status === 'pending' ? 3 : 2} />
                      </div>
                      <div className="flex flex-col">
                        <h5 className={`text-sm font-bold ${step.status === 'pending' ? 'text-text-light' : 'text-primary-dark'}`}>{step.title}</h5>
                        <p className="text-xs text-text-light mt-1">Status update available in customer portal.</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-blue py-16 px-6 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">⭐ Built for Erry Imprints</span>
            <h2 className="text-3xl font-bold tracking-tight">Launch a powerful online print store.</h2>
            <p className="text-blue-100 text-lg leading-relaxed">Add product calculators, template editing, AI content creation, file proofing, customer accounts, online payments, pickup/delivery, and automated order tracking.</p>
            <div className="flex gap-4 mt-2">
              <button className="bg-white text-primary-blue hover:bg-gray-50 px-8 py-3 rounded-full font-medium transition-colors shadow-sm">Get Quote</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Tracking;
