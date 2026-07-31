import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, Share2, ShoppingCart, User } from 'lucide-react';

const TopNavbar = ({ onSave, onOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-primary-blue font-semibold' : 'text-text-main hover:text-primary-blue transition-colors';

  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-white border-b border-border-gray sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
         <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary-blue to-purple-500 shadow-inner flex items-center justify-center text-white font-bold text-sm">E</div>
         <div className="hidden sm:flex flex-col">
            <h4 className="font-bold text-sm leading-tight text-primary-dark tracking-tight">Erry Imprints Studio</h4>
            <span className="text-[10px] text-primary-blue uppercase tracking-widest font-bold">Powered by Gaurav</span>
         </div>
      </div>
      
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        <li className={`cursor-pointer ${location.pathname.includes('/editor') ? 'text-primary-blue font-semibold' : 'text-text-main hover:text-primary-blue transition-colors'}`} onClick={() => navigate('/editor/1')}>Editor</li>
        <li className="cursor-pointer text-text-main hover:text-primary-blue transition-colors">Library</li>
        <li className="cursor-pointer text-text-main hover:text-primary-blue transition-colors">Features</li>
        <li className={`cursor-pointer ${isActive('/proofing')}`} onClick={() => navigate('/proofing')}>Proofing</li>
        <li className={`cursor-pointer ${isActive('/tracking')}`} onClick={() => navigate('/tracking')}>Workflow</li>
      </ul>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-primary-blue transition-colors" onClick={onSave || (() => alert('Save Design logic happens in Editor'))}>
          <Save size={16} /> Save
        </button>
        <button className="flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-primary-blue transition-colors">
          <Share2 size={16} /> Share
        </button>
        
        <button className="flex items-center gap-2 bg-primary-dark hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2" onClick={onOrder || (() => navigate('/checkout'))}>
          <ShoppingCart size={16} /> Order Print
        </button>
        
        <div className="w-px h-6 bg-border-gray mx-1 hidden sm:block"></div>
        
        <button className="hidden sm:flex items-center gap-2 bg-white hover:bg-gray-50 border border-border-gray text-primary-dark px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" onClick={() => navigate('/admin')}>
          <User size={14}/> Admin / My Designs
        </button>
        
        <button className="hidden sm:block bg-primary-dark hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" onClick={() => navigate('/editor/1')}>
          Try Editor
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
