import React from 'react';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const tabs = ['Products', 'Dimensions', 'Templates', 'Pricing', 'Export Rules'];

  return (
    <div className="admin-container">
      <div className="admin-header-card">
        <div className="admin-header-content">
          <h4>Admin Backend Preview</h4>
          <h2>Manage product dimensions & templates</h2>
          <p>This is where your team controls print product sizes, bleed, DPI, media, pricing, proofing rules and design templates.</p>
        </div>
        <button className="save-btn">Save Changes</button>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
