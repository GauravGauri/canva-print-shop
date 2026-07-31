import React from 'react';

const ProductListSidebar = ({ products, activeProductId, setActiveProductId }) => {
  return (
    <div className="product-sidebar">
      <h3>Product List</h3>
      <div className="product-list">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`product-item ${activeProductId === product.id ? 'active' : ''}`}
            onClick={() => setActiveProductId(product.id)}
          >
            <div className="product-item-header">
              <h4>{product.name}</h4>
              <span className="status-badge live">Live</span>
            </div>
            <p>{product.sizeDesc}</p>
            <p className="product-meta">{product.metaDesc}</p>
          </div>
        ))}
      </div>
      <button className="add-product-btn">+ Add New Product</button>
    </div>
  );
};

export default ProductListSidebar;
