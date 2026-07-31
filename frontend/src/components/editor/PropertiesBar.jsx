import React, { useState, useEffect } from 'react';
import { Type, Square, Image as ImageIcon, Trash2, Crop } from 'lucide-react';

const PropertiesBar = ({ activeObject, fabricCanvas, onCrop }) => {
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [hasShadow, setHasShadow] = useState(false);
  const [fontFamily, setFontFamily] = useState('Inter');

  useEffect(() => {
    if (activeObject) {
      if (activeObject.type === 'text' || activeObject.type === 'i-text') {
        setColor(activeObject.fill || '#000000');
        setFontSize(activeObject.fontSize || 24);
        setFontFamily(activeObject.fontFamily || 'Inter');
        setHasShadow(!!activeObject.shadow);
      } else if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle' || activeObject.type === 'path') {
        setColor(activeObject.fill || '#000000');
      }
    }
  }, [activeObject]);

  const updateProperty = (key, value) => {
    if (!activeObject || !fabricCanvas) return;
    
    if (key === 'shadow') {
      if (value) {
        activeObject.set('shadow', new fabric.Shadow({
          color: 'rgba(0,0,0,0.3)',
          blur: 10,
          offsetX: 5,
          offsetY: 5
        }));
      } else {
        activeObject.set('shadow', null);
      }
      setHasShadow(value);
    } else {
      activeObject.set(key, value);
      if (key === 'fill') setColor(value);
      if (key === 'fontSize') setFontSize(value);
      if (key === 'fontFamily') setFontFamily(value);
    }
    
    fabricCanvas.renderAll();
    fabricCanvas.fire('object:modified', { target: activeObject });
  };

  const handleDelete = () => {
    if (activeObject && fabricCanvas) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();
    }
  };

  if (!activeObject) {
    return (
      <div className="h-14 bg-white border-b border-border-gray flex items-center px-6 text-sm text-text-light italic shadow-sm z-10">
        Select an element to view properties
      </div>
    );
  }

  const isText = activeObject.type === 'text' || activeObject.type === 'i-text';
  const isShape = activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle' || activeObject.type === 'path';
  const isImage = activeObject.type === 'image';

  return (
    <div className="h-14 bg-white border-b border-border-gray flex items-center px-4 justify-between shadow-sm z-10 gap-4 overflow-x-auto">
      <div className="flex items-center gap-6">
        
        {/* Color Picker for Text and Shapes */}
        {(isText || isShape) && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-light uppercase tracking-wider">Color</span>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => updateProperty('fill', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>
        )}

        {/* Text Specific Properties */}
        {isText && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase tracking-wider">Font</span>
              <select 
                value={fontFamily} 
                onChange={(e) => updateProperty('fontFamily', e.target.value)}
                className="bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm focus:outline-none"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase tracking-wider">Size</span>
              <input 
                type="number" 
                value={fontSize} 
                onChange={(e) => updateProperty('fontSize', parseInt(e.target.value, 10))}
                className="w-16 bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
                <input 
                  type="checkbox" 
                  checked={hasShadow} 
                  onChange={(e) => updateProperty('shadow', e.target.checked)}
                  className="rounded text-primary-blue focus:ring-primary-blue cursor-pointer"
                />
                Shadow
              </label>
            </div>
          </>
        )}

        {/* Image Specific Properties */}
        {isImage && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <button 
              className="flex items-center gap-1.5 bg-primary-gray hover:bg-slate-200 border border-border-gray px-3 py-1.5 rounded text-sm font-medium transition-colors"
              onClick={onCrop}
            >
              <Crop size={16} /> Crop Image
            </button>
          </>
        )}
        
      </div>
      
      <div className="flex items-center">
        <button 
          className="flex items-center gap-1.5 text-text-light hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
          onClick={handleDelete}
        >
          <Trash2 size={16} /> <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PropertiesBar;
