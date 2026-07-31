import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/editor/TopNavbar';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { designData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-primary-gray font-sans">
      <TopNavbar />
      
      <div className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 border-b border-border-gray pb-6">
            <span className="text-primary-blue text-xs font-bold tracking-widest uppercase">CHECKOUT PREVIEW</span>
            <h2 className="text-3xl font-bold text-primary-dark">Simple checkout page</h2>
            <p className="text-text-light text-lg">A clean front-end checkout layout where customers confirm artwork, choose delivery, add details and pay.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Customer Details */}
              <div className="bg-white rounded-xl shadow-sm border border-border-gray p-8 flex flex-col gap-6">
                <h3 className="font-bold text-primary-dark text-lg border-b border-border-gray pb-3">1. Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="👤 Gurpreet Kaur" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                  <input type="text" placeholder="📞 0424 530 751" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                </div>
                <div>
                  <input type="email" placeholder="✉️ customer@email.com" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                </div>
              </div>

              {/* Delivery Option */}
              <div className="bg-white rounded-xl shadow-sm border border-border-gray p-8 flex flex-col gap-6">
                <h3 className="font-bold text-primary-dark text-lg border-b border-border-gray pb-3">2. Delivery Option</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-primary-blue bg-blue-50/50 rounded-lg p-4 flex gap-3 items-start cursor-pointer">
                    <input type="radio" checked readOnly className="mt-1 w-4 h-4 text-primary-blue" />
                    <div className="flex flex-col">
                      <strong className="text-primary-dark font-semibold">Pickup</strong>
                      <p className="text-sm text-text-light mt-1">Collect from Erry Imprints.</p>
                    </div>
                  </div>
                  <div className="border border-border-gray hover:border-slate-400 rounded-lg p-4 flex gap-3 items-start cursor-pointer transition-colors">
                    <input type="radio" readOnly className="mt-1 w-4 h-4" />
                    <div className="flex flex-col">
                      <strong className="text-primary-dark font-semibold">Delivery</strong>
                      <p className="text-sm text-text-light mt-1">Ship Australia-wide.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <input type="text" placeholder="📍 Adelaide SA 5000" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl shadow-sm border border-border-gray p-8 flex flex-col gap-6">
                <h3 className="font-bold text-primary-dark text-lg border-b border-border-gray pb-3">3. Payment</h3>
                <div className="grid grid-cols-3 gap-4">
                   <div className="border-2 border-primary-blue bg-blue-50/50 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer font-medium text-primary-dark text-sm">
                      <input type="radio" checked readOnly className="w-3.5 h-3.5 text-primary-blue" /> <span>Card</span>
                   </div>
                   <div className="border border-border-gray hover:border-slate-400 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer font-medium text-text-main text-sm transition-colors">
                      <input type="radio" readOnly className="w-3.5 h-3.5" /> <span>PayPal</span>
                   </div>
                   <div className="border border-border-gray hover:border-slate-400 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer font-medium text-text-main text-sm transition-colors">
                      <input type="radio" readOnly className="w-3.5 h-3.5" /> <span>Transfer</span>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Card number" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                  <input type="text" placeholder="Name on card" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                  <input type="text" placeholder="CVC" className="px-4 py-3 bg-primary-gray border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-text-main w-full" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
               <div className="bg-primary-dark text-white rounded-xl shadow-xl p-8 flex flex-col sticky top-24">
                 <h3 className="font-bold text-xl mb-6">Order Summary</h3>
                 
                 <div className="flex flex-col gap-2 border-b border-slate-700 pb-6 mb-6">
                   <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest">PRINT PRODUCT</span>
                   <h4 className="font-bold text-lg">Pull-Up Banner</h4>
                   <p className="text-sm text-slate-400">850 x 2000mm • 510gsm</p>
                 </div>
                 
                 <div className="flex flex-col gap-4 text-sm font-medium border-b border-slate-700 pb-6 mb-6">
                   <div className="flex justify-between text-slate-300">
                     <span>Banner print</span>
                     <strong className="text-white">$169.99</strong>
                   </div>
                   <div className="flex justify-between text-slate-300">
                     <span>Pickup</span>
                     <strong className="text-white">$0.00</strong>
                   </div>
                   <div className="flex justify-between text-slate-300">
                     <span>GST</span>
                     <strong className="text-white">$17.00</strong>
                   </div>
                 </div>
                 
                 <div className="flex justify-between items-end mb-8">
                   <span className="text-slate-300 font-medium text-sm">Total</span>
                   <h2 className="text-3xl font-bold text-white leading-none">$186.99</h2>
                 </div>
                 
                 <div className="flex gap-3 items-start mb-6">
                   <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-primary-blue cursor-pointer" />
                   <label className="text-sm text-slate-300 cursor-pointer">I approve my artwork for printing.</label>
                 </div>
                 
                 <button className="bg-primary-blue hover:bg-primary-blue-hover text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mb-4" onClick={async () => {
                   setLoading(true);
                   try {
                     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                     const response = await fetch(`${apiUrl}/api/orders`, {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({
                         product: designData?.productId || 'fallback-product-id',
                         customerDetails: { name: 'Gurpreet Kaur', email: 'customer@email.com' },
                         status: 'Received',
                         totalAmount: 186.99
                       })
                     });
                     if (response.ok) {
                       navigate('/tracking');
                     } else {
                       alert('Failed to place order.');
                     }
                   } catch (err) {
                     console.error(err);
                     alert('Error placing order.');
                   } finally {
                     setLoading(false);
                   }
                 }} disabled={loading}>
                   {loading ? 'Processing...' : '🔒 Place Order'}
                 </button>
                 <p className="text-xs text-center text-slate-400 font-medium">Secure checkout • Order tracking after payment</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
