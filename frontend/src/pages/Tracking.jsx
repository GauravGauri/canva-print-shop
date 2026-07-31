import React, { useState } from 'react';
import './Checkout.css';
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
    <div className="page-wrapper bg-gray">
      <TopNavbar />
      
      <div className="tracking-container">
        
        <div className="tracking-hero">
          <div className="tracking-text">
            <span className="subtitle">CUSTOMER ENGAGEMENT</span>
            <h1>Live order tracking with OTP verification.</h1>
            <p>Customers enter their order number, verify using OTP, then see exactly where the job is held — artwork, proofing, printing department, finishing, pickup, or delivery.</p>
            <div className="tracking-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <input 
                type="text" 
                placeholder="Enter Order ID" 
                className="input-field" 
                style={{ width: '250px' }}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button className="btn-dark-large" onClick={handleTrack} disabled={loading}>
                {loading ? 'Searching...' : 'Track Order'}
              </button>
            </div>
          </div>
          
          <div className="tracking-timeline-card">
            <div className="timeline-header">
               <h4>Order {order ? `#${order._id.substring(order._id.length - 6)}` : '#23948'}</h4>
               <span className="status-badge live">{order ? order.status : 'In Printing'}</span>
            </div>
            
            <div className="timeline-steps">
               <div className="timeline-step completed">
                  <div className="step-icon"><FileText size={16} /></div>
                  <div className="step-content">
                    <h5>Order Received</h5>
                    <p>Status update available in customer portal.</p>
                  </div>
               </div>
               <div className="timeline-step completed">
                  <div className="step-icon"><Image size={16} /></div>
                  <div className="step-content">
                    <h5>Artwork Check</h5>
                    <p>Status update available in customer portal.</p>
                  </div>
               </div>
               <div className="timeline-step active">
                  <div className="step-icon"><Printer size={16} /></div>
                  <div className="step-content">
                    <h5>Printing Department</h5>
                    <p>Your order is currently with the printing department.</p>
                  </div>
               </div>
               <div className="timeline-step pending">
                  <div className="step-icon"><Scissors size={16} /></div>
                  <div className="step-content">
                    <h5>Finishing</h5>
                    <p>Status update available in customer portal.</p>
                  </div>
               </div>
               <div className="timeline-step pending">
                  <div className="step-icon"><Truck size={16} /></div>
                  <div className="step-content">
                    <h5>Ready / Dispatched</h5>
                    <p>Status update available in customer portal.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        <div className="tracking-banner">
          <div className="banner-content">
            <span className="banner-tag">⭐ Built for Erry Imprints</span>
            <h2>Launch a powerful online print store.</h2>
            <p>Add product calculators, template editing, AI content creation, file proofing, customer accounts, online payments, pickup/delivery, and automated order tracking.</p>
          </div>
          <div className="banner-actions">
            <button className="btn-white">Get Quote</button>
            <button className="btn-outline-white">📥 Download Price Guide</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Tracking;
