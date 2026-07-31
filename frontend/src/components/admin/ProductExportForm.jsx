import React from 'react';
import { DownloadCloud, CheckCircle } from 'lucide-react';

const ProductExportForm = () => {
  return (
    <div className="admin-form-panel">
      <h3>Download & Production Export Rules</h3>
      
      <div className="export-grid">
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>Print PDF</h4>
          </div>
          <p>CMYK, 300dpi, bleed, crop marks</p>
        </div>
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>PNG</h4>
          </div>
          <p>Transparent or white background</p>
        </div>
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>JPEG</h4>
          </div>
          <p>Customer proof preview</p>
        </div>
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>SVG</h4>
          </div>
          <p>Vector elements and shapes</p>
        </div>
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>Editable JSON</h4>
          </div>
          <p>Design data for re-editing</p>
        </div>
        <div className="export-card">
          <div className="export-header">
            <DownloadCloud size={18} />
            <h4>ZIP Package</h4>
          </div>
          <p>PDF + assets + fonts + report</p>
        </div>
      </div>

      <div className="info-alert success">
        <p><strong>Admin download package:</strong> production PDF, editable JSON, customer proof, original uploads, fonts/assets list and proof-check report.</p>
      </div>
    </div>
  );
};

export default ProductExportForm;
