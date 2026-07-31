import React from 'react';

const EditorRightPanel = () => {
  return (
    <div className="w-72 bg-white border-l border-border-gray h-full shadow-sm flex flex-col z-10 flex-shrink-0">
      <div className="px-5 py-4 border-b border-border-gray flex items-center justify-between">
        <h3 className="font-semibold text-primary-dark">Page Settings</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Background Color</label>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-border-gray bg-white hover:shadow-md transition-shadow focus:ring-2 ring-primary-blue ring-offset-2"></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-black hover:shadow-md transition-shadow"></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-red-500 hover:shadow-md transition-shadow"></button>
            <button className="w-8 h-8 rounded-full border border-border-gray bg-blue-500 hover:shadow-md transition-shadow"></button>
            <button className="w-8 h-8 rounded-full border border-border-gray border-dashed flex items-center justify-center text-text-light hover:text-primary-dark transition-colors">+</button>
          </div>
        </div>

        <div className="h-px w-full bg-border-gray"></div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-light uppercase tracking-wider">Layers</label>
            <span className="text-xs text-primary-blue font-medium cursor-pointer">Group</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2 rounded hover:bg-primary-gray border border-transparent hover:border-border-gray cursor-pointer transition-colors active">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-500 text-xs">A</div>
              <span className="text-sm font-medium text-text-main flex-1">Heading Text</span>
              <button className="text-text-light hover:text-red-500">✕</button>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded hover:bg-primary-gray border border-transparent hover:border-border-gray cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-500 text-xs">■</div>
              <span className="text-sm font-medium text-text-main flex-1">Yellow Shape</span>
              <button className="text-text-light hover:text-red-500">✕</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorRightPanel;
