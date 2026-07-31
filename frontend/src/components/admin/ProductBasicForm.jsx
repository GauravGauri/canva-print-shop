import React from 'react';

const ProductBasicForm = ({ product, handleChange }) => {
  if (!product) return <div>Select a product to edit</div>;

  return (
    <div className="admin-form-panel">
      <h3>Product Setup</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>PRODUCT NAME</label>
          <input 
            type="text" 
            name="name" 
            value={product.name || ''} 
            onChange={handleChange}
            placeholder="e.g. Pull-Up Banner" 
          />
        </div>
        <div className="form-group">
          <label>PRODUCT SLUG</label>
          <input 
            type="text" 
            name="slug" 
            value={product.slug || ''} 
            onChange={handleChange}
            placeholder="e.g. pull-up-banner" 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>CATEGORY</label>
          <input 
            type="text" 
            name="category" 
            value={product.category || ''} 
            onChange={handleChange}
            placeholder="e.g. Wide Format / Print Products" 
          />
        </div>
        <div className="form-group">
          <label>STATUS</label>
          <select name="status" value={product.status || 'Active'} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>CUSTOMER DESCRIPTION</label>
        <textarea 
          name="description" 
          value={product.description || ''} 
          onChange={handleChange}
          placeholder="Premium print product with online design, upload, proofing and checkout."
          rows="4"
        />
      </div>
    </div>
  );
};

export default ProductBasicForm;
