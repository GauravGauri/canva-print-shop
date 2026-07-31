import React, { useRef } from 'react';
import { MousePointer2, Type, Square, Image, FolderOpen, Grid, Upload, Circle, Triangle, Minus } from 'lucide-react';

const tools = [
  { id: 'Select', icon: MousePointer2, label: 'Select' },
  { id: 'Text', icon: Type, label: 'Text' },
  { id: 'Shapes', icon: Square, label: 'Elements' },
  { id: 'Photos', icon: Image, label: 'Uploads' },
  { id: 'Projects', icon: FolderOpen, label: 'Projects' },
];

const EditorSidebar = ({ activeTool, setActiveTool, onToolAction, onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleToolClick = (toolId) => {
    setActiveTool(toolId);
    if (toolId === 'Photos' || toolId === 'Uploads') {
      if (fileInputRef.current) fileInputRef.current.click();
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
    e.target.value = null;
  };

  return (
    <div className="flex h-full z-10 flex-shrink-0 shadow-lg">
      <input 
        type="file" 
        accept="image/png, image/jpeg, image/svg+xml" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      
      {/* Primary Rail */}
      <div className="w-18 bg-primary-dark h-full flex flex-col items-center py-4 border-r border-slate-800">
        <div className="flex flex-col gap-2 w-full">
          {tools.map((tool) => (
            <button 
              key={tool.id} 
              className={`w-full flex flex-col items-center justify-center gap-1.5 py-3 transition-colors ${activeTool === tool.id ? 'text-white bg-slate-800 relative' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
              onClick={() => handleToolClick(tool.id)}
            >
              <tool.icon size={22} strokeWidth={1.5} />
              <span className="text-[10px] font-medium tracking-wide">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Secondary Panel */}
      <div className={`bg-white h-full border-r border-border-gray transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${activeTool === 'Select' || activeTool === 'Projects' ? 'w-0 border-r-0' : 'w-72'}`}>
        
        {/* Shapes Panel */}
        {activeTool === 'Shapes' && (
          <div className="flex flex-col h-full">
             <div className="p-5 border-b border-border-gray">
               <h3 className="font-bold text-lg text-primary-dark">Shapes & Lines</h3>
             </div>
             <div className="p-5 grid grid-cols-3 gap-4 overflow-y-auto">
                <button className="aspect-square border border-border-gray rounded-lg hover:shadow-md transition-shadow flex items-center justify-center text-slate-700 bg-slate-50" onClick={() => onToolAction('rect')}>
                  <Square size={32} strokeWidth={1.5} />
                </button>
                <button className="aspect-square border border-border-gray rounded-lg hover:shadow-md transition-shadow flex items-center justify-center text-slate-700 bg-slate-50" onClick={() => onToolAction('circle')}>
                  <Circle size={32} strokeWidth={1.5} />
                </button>
                <button className="aspect-square border border-border-gray rounded-lg hover:shadow-md transition-shadow flex items-center justify-center text-slate-700 bg-slate-50" onClick={() => onToolAction('triangle')}>
                  <Triangle size={32} strokeWidth={1.5} />
                </button>
                <button className="aspect-square border border-border-gray rounded-lg hover:shadow-md transition-shadow flex items-center justify-center text-slate-700 bg-slate-50" onClick={() => onToolAction('line')}>
                  <Minus size={32} strokeWidth={1.5} />
                </button>
             </div>
          </div>
        )}
        
        {/* Text Panel */}
        {activeTool === 'Text' && (
          <div className="flex flex-col h-full">
             <div className="p-5 border-b border-border-gray">
               <h3 className="font-bold text-lg text-primary-dark">Text</h3>
             </div>
             <div className="p-5 flex flex-col gap-3 overflow-y-auto">
                <button className="w-full text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-lg p-4 transition-colors" onClick={() => onToolAction('heading')}>
                  <span className="block text-2xl font-bold font-sans">Add a heading</span>
                </button>
                <button className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg p-3 transition-colors" onClick={() => onToolAction('subheading')}>
                  <span className="block text-lg font-semibold font-sans">Add a subheading</span>
                </button>
                <button className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg p-2 transition-colors" onClick={() => onToolAction('body')}>
                  <span className="block text-sm font-normal font-sans">Add a little bit of body text</span>
                </button>
             </div>
          </div>
        )}

        {/* Uploads Panel */}
        {activeTool === 'Photos' && (
          <div className="flex flex-col h-full">
             <div className="p-5 border-b border-border-gray">
               <h3 className="font-bold text-lg text-primary-dark">Uploads</h3>
             </div>
             <div className="p-5 flex flex-col gap-4 overflow-y-auto items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Upload size={32} />
                </div>
                <h4 className="font-semibold text-text-main">Upload your images</h4>
                <p className="text-sm text-text-light mb-4">Click the button below to browse local files.</p>
                <button className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white py-2.5 rounded-lg font-bold transition-colors shadow-sm" onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}>
                  Upload files
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EditorSidebar;
