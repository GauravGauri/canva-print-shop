import React from 'react';

const ProductTemplatesForm = ({ product }) => {
  return (
    <div className="admin-form-panel">
      <h3>Template Manager</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>ASSIGN TEMPLATE TO</label>
          <input type="text" value={product?.name || ''} disabled />
        </div>
        <div className="form-group">
          <label>TEMPLATE SIZE</label>
          <input type="text" value={product?.dimensions ? `${product.dimensions.width} x ${product.dimensions.height}mm` : ''} disabled />
        </div>
        <div className="form-group">
          <label>LOCK GUIDES</label>
          <input type="text" value="Bleed + Safe Zone" disabled />
        </div>
      </div>

      <table className="templates-table">
        <thead>
          <tr>
            <th>Template</th>
            <th>Product</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cafe Pull-Up Banner</td>
            <td>Pull-Up Banner</td>
            <td>850 x 2000mm</td>
            <td className="status-active">Active</td>
          </tr>
          <tr>
            <td>Premium Business Card</td>
            <td>Business Card</td>
            <td>90 x 55mm</td>
            <td className="status-active">Active</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button className="secondary-btn">Upload New Template</button>
        <button className="primary-btn">CREATE NEW TEMPLATE</button>
      </div>
    </div>
  );
};

export default ProductTemplatesForm;
