import React from 'react';
import { Link } from 'react-router-dom';
import { Save, Share2, ShoppingCart, User } from 'lucide-react';

const TopNavbar = () => {
  return (
    <nav className="editor-top-nav">
      <div className="nav-brand">
         <div className="logo-icon small"></div>
         <div>
            <h4>Erry Imprints Studio</h4>
            <span>Advanced Online Design Editor</span>
         </div>
      </div>
      
      <ul className="editor-nav-links">
        <li className="active">Editor</li>
        <li>Library</li>
        <li>Features</li>
        <li>Proofing</li>
        <li>Workflow</li>
      </ul>
      
      <div className="nav-actions">
        <button className="btn-text"><Save size={16} /> Save</button>
        <button className="btn-text"><Share2 size={16} /> Share</button>
        <button className="btn-dark"><ShoppingCart size={16} /> Order Print</button>
        <div className="divider"></div>
        <button className="btn-outline-small"><User size={14}/> My Designs</button>
        <button className="btn-dark-small">Try Editor</button>
      </div>
    </nav>
  );
};

export default TopNavbar;
