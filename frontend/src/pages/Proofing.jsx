import React from 'react';
import './Checkout.css'; // Reusing styles
import TopNavbar from '../components/editor/TopNavbar';
import { FileUp, CheckCircle } from 'lucide-react';

const Proofing = () => {
  return (
    <div className="page-wrapper bg-dark">
      <TopNavbar />
      
      <div className="proofing-container">
        <div className="proofing-grid">
          
          <div className="proofing-info">
             <span className="subtitle-blue">SMART ARTWORK UPLOAD</span>
             <h1>Upload files and catch print issues before ordering.</h1>
             <p>The customer uploads PDF, PNG, JPG, AI, EPS, or SVG files. The system checks artwork and gives clear fixes before payment, reducing manual messages and delays.</p>
             
             <div className="checks-grid">
               <div className="check-badge success"><CheckCircle size={16} /> Bleed & trim marks</div>
               <div className="check-badge warning"><CheckCircle size={16} /> CMYK/RGB warning</div>
               <div className="check-badge success"><CheckCircle size={16} /> Low-resolution images</div>
               <div className="check-badge error"><CheckCircle size={16} /> Font outline check</div>
               <div className="check-badge success"><CheckCircle size={16} /> Wrong product size</div>
               <div className="check-badge success"><CheckCircle size={16} /> Safe-zone warning</div>
             </div>
          </div>
          
          <div className="proofing-upload-panel">
            <div className="upload-dropzone">
              <FileUp size={40} className="upload-icon" />
              <h3>Drop your artwork here</h3>
              <p>PDF preferred • 5mm bleed • CMYK • 300dpi+</p>
              <button className="upload-btn">Upload Artwork</button>
            </div>
            
            <div className="proof-report">
               <div className="report-header">
                 <h4>Proof Report</h4>
                 <span className="status-passed">4 Passed</span>
               </div>
               <ul className="report-list">
                 <li>📄 Product size matches</li>
                 <li>📄 Bleed detected</li>
                 <li>📄 Images above 300dpi</li>
                 <li>📄 Ready for customer approval</li>
               </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Proofing;
