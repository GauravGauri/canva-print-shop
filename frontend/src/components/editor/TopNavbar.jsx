import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, Share2, ShoppingCart, User } from 'lucide-react';

const TopNavbar = ({ onSave, onOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="editor-top-nav">
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
         <div className="logo-icon small"></div>
         <div>
            <h4>Erry Imprints Studio</h4>
            <span>Advanced Online Design Editor</span>
         </div>
      </div>
      
      <ul className="editor-nav-links">
        <li className={location.pathname.includes('/editor') ? 'active' : ''} style={{ cursor: 'pointer' }} onClick={() => navigate('/editor/1')}>Editor</li>
        <li style={{ cursor: 'pointer' }}>Library</li>
        <li style={{ cursor: 'pointer' }}>Features</li>
        <li className={isActive('/proofing')} style={{ cursor: 'pointer' }} onClick={() => navigate('/proofing')}>Proofing</li>
        <li className={isActive('/tracking')} style={{ cursor: 'pointer' }} onClick={() => navigate('/tracking')}>Workflow</li>
      </ul>
      
      <div className="nav-actions">
        <button className="btn-text" onClick={onSave || (() => alert('Save Design logic happens in Editor'))}><Save size={16} /> Save</button>
        <button className="btn-text"><Share2 size={16} /> Share</button>
        <button className="btn-dark" onClick={onOrder || (() => navigate('/checkout'))}><ShoppingCart size={16} /> Order Print</button>
        <div className="divider"></div>
        <button className="btn-outline-small" onClick={() => navigate('/admin')}><User size={14}/> Admin / My Designs</button>
        <button className="btn-dark-small" onClick={() => navigate('/editor/1')}>Try Editor</button>
      </div>
    </nav>
  );
};

export default TopNavbar;
