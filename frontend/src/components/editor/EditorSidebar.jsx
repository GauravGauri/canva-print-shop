import React, { useRef } from 'react';
import { MousePointer2, Type, Square, Image, FolderOpen, Grid, Upload } from 'lucide-react';

const tools = [
  { id: 'Select', icon: MousePointer2, label: 'Select' },
  { id: 'Text', icon: Type, label: 'Text' },
  { id: 'Shapes', icon: Square, label: 'Shapes' },
  { id: 'Photos', icon: Image, label: 'Photos' },
  { id: 'Uploads', icon: Upload, label: 'Uploads' },
  { id: 'Projects', icon: FolderOpen, label: 'Projects' },
  { id: 'Grid', icon: Grid, label: 'Grid' },
];

const EditorSidebar = ({ activeTool, setActiveTool, onToolAction, onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleToolClick = (toolId) => {
    setActiveTool(toolId);
    if (toolId === 'Photos' || toolId === 'Uploads') {
      if (fileInputRef.current) fileInputRef.current.click();
    } else {
      if (onToolAction) onToolAction(toolId);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageUpload) {
      const reader = new FileReader();
      reader.onload = (f) => {
        onImageUpload(f.target.result);
      };
      reader.readAsDataURL(file);
    }
    // reset input
    e.target.value = null;
  };

  return (
    <div className="w-18 bg-primary-dark h-full flex flex-col items-center py-4 border-r border-slate-800 shadow-md z-10 flex-shrink-0">
      <input 
        type="file" 
        accept="image/png, image/jpeg, image/svg+xml" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      
      <div className="flex flex-col gap-2 w-full">
        {tools.map((tool) => (
          <button 
            key={tool.id} 
            className={`w-full flex flex-col items-center justify-center gap-1.5 py-3 transition-colors ${activeTool === tool.id ? 'text-primary-blue bg-slate-800/50 relative' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
            onClick={() => handleToolClick(tool.id)}
          >
            {activeTool === tool.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-blue rounded-r-full"></div>
            )}
            <tool.icon size={20} strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-wide">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorSidebar;
