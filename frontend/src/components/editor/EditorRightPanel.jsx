import React from 'react';

const EditorRightPanel = ({ fabricCanvas, canvasObjects, setCanvasObjects }) => {
  const handleChangeBackground = (color) => {
    if (fabricCanvas) {
      fabricCanvas.backgroundColor = color;
      fabricCanvas.renderAll();
    }
  };

  const handleSelectLayer = (obj) => {
    if (fabricCanvas) {
      fabricCanvas.setActiveObject(obj);
      fabricCanvas.renderAll();
    }
  };

  const handleDeleteLayer = (obj, e) => {
    e.stopPropagation();
    if (fabricCanvas) {
      fabricCanvas.remove(obj);
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();
      // the canvas event listener in Editor.jsx will update canvasObjects state
    }
  };

  return (
    <div className="w-72 bg-white border-l border-border-gray h-full shadow-sm flex flex-col z-10 flex-shrink-0">
      <div className="px-5 py-4 border-b border-border-gray flex items-center justify-between">
        <h3 className="font-semibold text-primary-dark">Page Settings</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Background Color</label>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-border-gray bg-white hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#ffffff')}></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-black hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#000000')}></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-red-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#ef4444')}></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-blue-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#3b82f6')}></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-yellow-400 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#facc15')}></button>
          </div>
        </div>

        <div className="h-px w-full bg-border-gray"></div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-light uppercase tracking-wider">Layers</label>
            <span className="text-xs text-primary-blue font-medium cursor-pointer hover:underline" onClick={() => {
              if (fabricCanvas) {
                const active = fabricCanvas.getActiveObject();
                if (active && active.type === 'activeSelection') {
                  active.toGroup();
                  fabricCanvas.requestRenderAll();
                }
              }
            }}>Group</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {canvasObjects && canvasObjects.length === 0 && (
              <span className="text-sm text-slate-400 italic">No layers yet</span>
            )}
            
            {canvasObjects && [...canvasObjects].reverse().map((obj, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-2 rounded hover:bg-primary-gray border border-transparent hover:border-border-gray cursor-pointer transition-colors"
                onClick={() => handleSelectLayer(obj)}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                  obj.type === 'text' || obj.type === 'i-text' ? 'bg-blue-100 text-blue-500' : 
                  obj.type === 'rect' ? 'bg-yellow-100 text-yellow-500' : 
                  obj.type === 'image' ? 'bg-green-100 text-green-500' : 
                  'bg-slate-100 text-slate-500'
                }`}>
                  {obj.type === 'text' || obj.type === 'i-text' ? 'T' : 
                   obj.type === 'rect' ? '■' : 
                   obj.type === 'image' ? 'Img' : '*'}
                </div>
                <span className="text-sm font-medium text-text-main flex-1 truncate">
                  {obj.type === 'text' || obj.type === 'i-text' ? obj.text : 
                   obj.type === 'rect' ? 'Rectangle' : 
                   obj.type === 'image' ? 'Image' : 'Group'}
                </span>
                <button className="text-text-light hover:text-red-500 px-1" onClick={(e) => handleDeleteLayer(obj, e)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorRightPanel;
