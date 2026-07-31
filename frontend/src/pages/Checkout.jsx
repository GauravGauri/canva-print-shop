import React from 'react';
import './Checkout.css';
import TopNavbar from '../components/editor/TopNavbar'; // Reusing for consistency, or standard nav

const Checkout = () => {
  return (
    <div className="page-wrapper bg-gray">
      <TopNavbar />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <span className="subtitle">CHECKOUT PREVIEW</span>
          <h2>Simple checkout page</h2>
          <p>A clean front-end checkout layout where customers confirm artwork, choose delivery, add details and pay.</p>
        </div>

        <div className="checkout-grid">
          <div className="checkout-forms">
            {/* Customer Details */}
            <div className="checkout-card">
              <h3>1. Customer Details</h3>
              <div className="form-row">
                <input type="text" placeholder="👤 Gurpreet Kaur" className="input-field" />
                <input type="text" placeholder="📞 0424 530 751" className="input-field" />
              </div>
              <div className="form-row">
                <input type="email" placeholder="✉️ customer@email.com" className="input-field full-width" />
              </div>
            </div>

            {/* Delivery Option */}
            <div className="checkout-card">
              <h3>2. Delivery Option</h3>
              <div className="form-row">
                <div className="radio-card active">
                  <input type="radio" checked readOnly />
                  <div>
                    <strong>Pickup</strong>
                    <p>Collect from Erry Imprints.</p>
                  </div>
                </div>
                <div className="radio-card">
                  <input type="radio" readOnly />
                  <div>
                    <strong>Delivery</strong>
                    <p>Ship Australia-wide.</p>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <input type="text" placeholder="📍 Adelaide SA 5000" className="input-field full-width" />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-card">
              <h3>3. Payment</h3>
              <div className="form-row">
                 <div className="radio-card active small">
                    <input type="radio" checked readOnly /> <span>Card</span>
                 </div>
                 <div className="radio-card small">
                    <input type="radio" readOnly /> <span>PayPal</span>
                 </div>
                 <div className="radio-card small">
                    <input type="radio" readOnly /> <span>Bank Transfer</span>
                 </div>
              </div>
              <div className="form-row">
                <input type="text" placeholder="Card number" className="input-field" />
                <input type="text" placeholder="Name on card" className="input-field" />
              </div>
              <div className="form-row">
                <input type="text" placeholder="MM / YY" className="input-field" />
                <input type="text" placeholder="CVC" className="input-field" />
              </div>
            </div>
          </div>

          <div className="checkout-summary-column">
             <div className="checkout-summary-card">
               <h3>Order Summary</h3>
               
               <div className="summary-product">
                 <span className="product-type">PRINT PRODUCT</span>
                 <h4>Pull-Up Banner</h4>
                 <p>850 x 2000mm • 510gsm</p>
               </div>
               
               <div className="summary-lines">
                 <div className="summary-line">
                   <span>Banner print</span>
                   <strong>$169.99</strong>
                 </div>
                 <div className="summary-line">
                   <span>Pickup</span>
                   <strong>$0.00</strong>
                 </div>
                 <div className="summary-line">
                   <span>GST</span>
                   <strong>$17.00</strong>
                 </div>
               </div>
               
               <div className="summary-total">
                 <span>Total</span>
                 <h2>$186.99</h2>
               </div>
               
               <div className="approval-checkbox">
                 <input type="checkbox" defaultChecked />
                 <label>I approve my artwork for printing.</label>
               </div>
               
               <button className="place-order-btn">🔒 Place Order</button>
               <p className="secure-text">Secure checkout • Order tracking after payment</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
