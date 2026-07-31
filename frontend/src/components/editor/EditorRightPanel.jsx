import React from 'react';
import { Lock, Eye } from 'lucide-react';

const EditorRightPanel = () => {
  return (
    <div className="editor-right-panel">
      <div className="price-panel">
        <span className="price-label">LIVE PRINT PRICE</span>
        <div className="price-value">
          <h2>$109.99</h2>
          <span>+ GST</span>
        </div>
        <p className="price-desc">Selected layer: Background Shape</p>
      </div>
      
      <div className="settings-panel">
        <h4>⚙️ Tool Settings</h4>
        <div className="shape-toggles">
          <button className="active">Round</button>
          <button>Circle</button>
          <button>Wave</button>
        </div>
      </div>
      
      <div className="layers-panel">
        <h4>📚 Layer Controls</h4>
        <div className="layer-item">
          <span>Headline Text</span>
          <Lock size={14} className="icon-muted" />
        </div>
        <div className="layer-item">
          <span>Subline Text</span>
          <Eye size={14} className="icon-muted" />
        </div>
        <div className="layer-item">
          <span>HD Image Frame</span>
          <Eye size={14} className="icon-muted" />
        </div>
        <div className="layer-item">
          <span>QR Code</span>
          <Eye size={14} className="icon-muted" />
        </div>
        <div className="layer-item active">
          <span>Background Shape</span>
          <Eye size={14} color="white" />
        </div>
        <div className="layer-item">
          <span>Footer Bar</span>
          <div className="layer-actions">
            <button className="layer-btn">🔗</button>
            <button className="layer-btn">🔗</button>
          </div>
        </div>
      </div>
      
      <button className="download-btn">📥 Backend Downloads</button>
    </div>
  );
};

export default EditorRightPanel;
