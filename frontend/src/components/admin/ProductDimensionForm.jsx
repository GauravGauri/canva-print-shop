import React from 'react';

const ProductDimensionForm = ({ product, handleChange }) => {
  if (!product) return <div>Select a product to edit</div>;

  const dims = product.dimensions || {};

  const handleDimChange = (e) => {
    // In a real app, you'd pass a specific handler to update nested state
    handleChange({
      target: {
        name: 'dimensions',
        value: { ...dims, [e.target.name]: e.target.value }
      }
    });
  };

  return (
    <div className="admin-form-panel">
      <h3>Dimensions, Bleed & Print Rules</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>WIDTH</label>
          <input type="number" name="width" value={dims.width || ''} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>HEIGHT</label>
          <input type="number" name="height" value={dims.height || ''} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>UNIT</label>
          <input type="text" name="unit" value={dims.unit || 'mm'} onChange={handleDimChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>BLEED</label>
          <input type="text" name="bleed" value={dims.bleed || '5mm'} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>SAFE MARGIN</label>
          <input type="text" name="safeMargin" value={dims.safeMargin || '8mm'} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>MINIMUM DPI</label>
          <input type="text" name="minimumDpi" value={dims.minimumDpi || '300dpi'} onChange={handleDimChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>COLOUR MODE</label>
          <input type="text" name="colourMode" value={dims.colourMode || 'CMYK'} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>ACCEPTED FILES</label>
          <input type="text" name="acceptedFiles" value={dims.acceptedFiles || 'PDF, AI, EPS, SVG, PNG, JPG'} onChange={handleDimChange} />
        </div>
        <div className="form-group">
          <label>EXPORT STANDARD</label>
          <input type="text" name="exportStandard" value={dims.exportStandard || 'PDF/X-4'} onChange={handleDimChange} />
        </div>
      </div>
      
      <div className="info-alert">
        <p><strong>Backend rule:</strong> If uploaded artwork does not match these dimensions, the proof checker blocks checkout or asks customer approval.</p>
      </div>
    </div>
  );
};

export default ProductDimensionForm;
