import React from 'react';
import { MousePointer2, Type, Image as ImageIcon, Shapes, QrCode, Crop, Wand2, Grid } from 'lucide-react';

const tools = [
  { id: 'Select', icon: MousePointer2, label: 'Select' },
  { id: 'Text', icon: Type, label: 'Text' },
  { id: 'Image', icon: ImageIcon, label: 'Image' },
  { id: 'Shapes', icon: Shapes, label: 'Shapes' },
  { id: 'QR', icon: QrCode, label: 'QR' },
  { id: 'Crop', icon: Crop, label: 'Crop' },
  { id: 'AI Magic', icon: Wand2, label: 'AI Magic' },
  { id: 'Grid', icon: Grid, label: 'Grid' },
];

const EditorSidebar = ({ activeTool, setActiveTool, onToolAction }) => {
  return (
    <div className="editor-sidebar-container">
      {/* Icon Toolbar */}
      <div className="icon-toolbar">
        {tools.map((tool) => (
          <button 
            key={tool.id} 
            className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTool(tool.id);
              if (onToolAction) onToolAction(tool.id);
            }}
          >
            <tool.icon size={20} strokeWidth={1.5} />
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tool Panel (e.g. Shapes/Images library) */}
      <div className="tool-panel">
        <div className="tool-panel-header">
          <span className="active-tool-badge">Active Tool: {activeTool}</span>
        </div>
        
        <div className="search-bar-small">
          <input type="text" placeholder="🔍 Search HD assets..." />
        </div>
        
        <div className="library-tabs">
          <button className="active">Images</button>
          <button>Backgrounds</button>
          <button>Elements</button>
          <button>Templates</button>
        </div>
        
        <div className="asset-library-info">
          <h5>HD ASSET LIBRARY</h5>
          <p>Click any asset to apply its colour/style into the editable design.</p>
        </div>
        
        <div className="asset-grid">
          <div className="asset-item" style={{backgroundColor: '#fca5a5'}}>
            <div className="asset-label">Cafe Hero</div>
          </div>
          <div className="asset-item" style={{backgroundColor: '#86efac'}}>
            <div className="asset-label">Fresh Food</div>
          </div>
          <div className="asset-item" style={{backgroundColor: '#fcd34d'}}></div>
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
