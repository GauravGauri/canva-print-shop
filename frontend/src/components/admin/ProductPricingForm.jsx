import React from 'react';

const ProductPricingForm = () => {
  return (
    <div className="admin-form-panel">
      <h3>Pricing & Options</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>BASE PRICE</label>
          <input type="text" defaultValue="$169.99" />
        </div>
        <div className="form-group">
          <label>GST</label>
          <input type="text" defaultValue="10%" />
        </div>
        <div className="form-group">
          <label>MINIMUM QUANTITY</label>
          <input type="number" defaultValue="1" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>MEDIA OPTION 1</label>
          <input type="text" defaultValue="Standard" />
        </div>
        <div className="form-group">
          <label>MEDIA OPTION 2</label>
          <input type="text" defaultValue="Premium / Heavy Duty" />
        </div>
        <div className="form-group">
          <label>FINISHING</label>
          <input type="text" defaultValue="Matte, Gloss, Eyelets, Lamination" />
        </div>
      </div>

      <div className="pricing-toggles">
        <div className="toggle-card">
          <div className="toggle-header">
            <span className="toggle-icon on"></span>
            <h4>Quantity discount</h4>
          </div>
          <p>Enabled in checkout.</p>
        </div>
        <div className="toggle-card">
          <div className="toggle-header">
            <span className="toggle-icon on"></span>
            <h4>Express production</h4>
          </div>
          <p>Enabled in checkout.</p>
        </div>
        <div className="toggle-card">
          <div className="toggle-header">
            <span className="toggle-icon on"></span>
            <h4>Pickup / delivery price</h4>
          </div>
          <p>Enabled in checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPricingForm;
