import React from 'react';
import './Checkout.css';
import TopNavbar from '../components/editor/TopNavbar';
import { FileText, Image, Printer, Scissors, Truck } from 'lucide-react';

const Tracking = () => {
  return (
    <div className="page-wrapper bg-gray">
      <TopNavbar />
      
      <div className="tracking-container">
        
        <div className="tracking-hero">
          <div className="tracking-text">
            <span className="subtitle">CUSTOMER ENGAGEMENT</span>
            <h1>Live order tracking with OTP verification.</h1>
            <p>Customers enter their order number, verify using OTP, then see exactly where the job is held — artwork, proofing, printing department, finishing, pickup, or delivery.</p>
            <div className="tracking-actions">
              <button className="btn-dark-large">Track Order</button>
              <button className="btn-text-large">View Proof</button>
            </div>
          </div>
          
          <div className="tracking-timeline-card">
            <div className="timeline-header">
               <h4>Order #23948</h4>
               <span className="status-badge live">In Printing</span>
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
