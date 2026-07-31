import React, { useState, useEffect } from 'react';
import { Trash2, Crop, AlignLeft, AlignCenter, AlignRight, Bold, Italic as ItalicIcon, Underline } from 'lucide-react';

const PropertiesBar = ({ activeObject, fabricCanvas, onCrop }) => {
  const [props, setProps] = useState({
    fill: '#000000', stroke: '#000000', strokeWidth: 0, rx: 0, ry: 0,
    fontFamily: 'Inter', fontSize: 24, fontWeight: 'normal', fontStyle: 'normal',
    underline: false, textAlign: 'left', charSpacing: 0, lineHeight: 1.16, shadow: false, opacity: 1
  });

  useEffect(() => {
    if (activeObject) {
      setProps({
        fill: activeObject.fill || '#000000',
        stroke: activeObject.stroke || '#000000',
        strokeWidth: activeObject.strokeWidth || 0,
        rx: activeObject.rx || 0,
        ry: activeObject.ry || 0,
        fontFamily: activeObject.fontFamily || 'Inter',
        fontSize: activeObject.fontSize || 24,
        fontWeight: activeObject.fontWeight || 'normal',
        fontStyle: activeObject.fontStyle || 'normal',
        underline: !!activeObject.underline,
        textAlign: activeObject.textAlign || 'left',
        charSpacing: activeObject.charSpacing || 0,
        lineHeight: activeObject.lineHeight || 1.16,
        shadow: !!activeObject.shadow,
        opacity: activeObject.opacity ?? 1
      });
    }
  }, [activeObject]);

  const updateProperty = (key, value) => {
    if (!activeObject || !fabricCanvas) return;
    
    if (key === 'shadow') {
      if (value) {
        activeObject.set('shadow', new fabric.Shadow({ color: 'rgba(0,0,0,0.3)', blur: 10, offsetX: 5, offsetY: 5 }));
      } else {
        activeObject.set('shadow', null);
      }
    } else if (key === 'rx') {
      activeObject.set('rx', value);
      activeObject.set('ry', value); // keep circular radius
    } else {
      activeObject.set(key, value);
    }
    
    setProps(prev => ({ ...prev, [key]: value }));
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
      <div className="h-14 bg-white border-b border-border-gray flex items-center px-6 text-sm text-text-light italic shadow-sm z-10 w-full">
        Select an element to view properties
      </div>
    );
  }

  const isText = activeObject.type === 'text' || activeObject.type === 'i-text' || activeObject.type === 'textbox';
  const isShape = activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle' || activeObject.type === 'path' || activeObject.type === 'polygon';
  const isImage = activeObject.type === 'image';

  return (
    <div className="h-14 bg-white border-b border-border-gray flex items-center px-4 justify-between shadow-sm z-10 w-full overflow-x-auto">
      <div className="flex items-center gap-4 flex-nowrap whitespace-nowrap">
        
        {/* Opacity */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-light uppercase">Opacity</span>
          <input type="range" min="0" max="1" step="0.1" value={props.opacity} onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))} className="w-16" />
        </div>
        <div className="w-px h-6 bg-border-gray"></div>

        {/* Text and Shape shared: Fill Color */}
        {(isText || isShape) && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-light uppercase">Fill</span>
            <input type="color" value={props.fill} onChange={(e) => updateProperty('fill', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0" />
          </div>
        )}

        {/* Text Properties */}
        {isText && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <select value={props.fontFamily} onChange={(e) => updateProperty('fontFamily', e.target.value)} className="bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm">
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Playfair Display">Playfair</option>
            </select>
            
            <input type="number" value={props.fontSize} onChange={(e) => updateProperty('fontSize', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm" />
            
            <div className="flex bg-primary-gray border border-border-gray rounded">
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.fontWeight === 'bold' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontWeight', props.fontWeight === 'bold' ? 'normal' : 'bold')}><Bold size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.fontStyle === 'italic' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontStyle', props.fontStyle === 'italic' ? 'normal' : 'italic')}><ItalicIcon size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.underline ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('underline', !props.underline)}><Underline size={16} /></button>
            </div>

            <div className="flex bg-primary-gray border border-border-gray rounded">
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'left' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'left')}><AlignLeft size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'center' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'center')}><AlignCenter size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'right' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'right')}><AlignRight size={16} /></button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase">Spacing</span>
              <input type="number" value={props.charSpacing} onChange={(e) => updateProperty('charSpacing', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-1 py-1 text-sm" title="Letter Spacing" />
              <input type="number" step="0.1" value={props.lineHeight} onChange={(e) => updateProperty('lineHeight', parseFloat(e.target.value))} className="w-12 bg-primary-gray border border-border-gray rounded px-1 py-1 text-sm" title="Line Height" />
            </div>
            
            <label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
              <input type="checkbox" checked={props.shadow} onChange={(e) => updateProperty('shadow', e.target.checked)} className="rounded text-primary-blue" />
              Shadow
            </label>
          </>
        )}

        {/* Shape Properties */}
        {isShape && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase">Stroke</span>
              <input type="color" value={props.stroke} onChange={(e) => updateProperty('stroke', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0" />
              <input type="number" value={props.strokeWidth} onChange={(e) => updateProperty('strokeWidth', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm" title="Stroke Width" />
            </div>
            {activeObject.type === 'rect' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-light uppercase">Radius</span>
                <input type="number" value={props.rx} onChange={(e) => updateProperty('rx', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm" />
              </div>
            )}
          </>
        )}

        {/* Image Specific Properties */}
        {isImage && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase">Brightness</span>
              <input type="range" min="-1" max="1" step="0.1" defaultValue="0" onChange={(e) => {
                if (!activeObject || activeObject.type !== 'image') return;
                activeObject.filters[0] = new fabric.Image.filters.Brightness({ brightness: parseFloat(e.target.value) });
                activeObject.applyFilters();
                fabricCanvas.renderAll();
              }} className="w-16" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase">Contrast</span>
              <input type="range" min="-1" max="1" step="0.1" defaultValue="0" onChange={(e) => {
                if (!activeObject || activeObject.type !== 'image') return;
                activeObject.filters[1] = new fabric.Image.filters.Contrast({ contrast: parseFloat(e.target.value) });
                activeObject.applyFilters();
                fabricCanvas.renderAll();
              }} className="w-16" />
            </div>
            <button className="flex items-center gap-1.5 bg-primary-gray hover:bg-slate-200 border border-border-gray px-3 py-1.5 rounded text-sm font-medium transition-colors" onClick={onCrop}>
              <Crop size={16} /> Crop
            </button>
          </>
        )}
      </div>
      
      <div className="flex items-center pl-2">
        <button className="flex items-center gap-1.5 text-text-light hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50" onClick={handleDelete}>
          <Trash2 size={16} /> <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PropertiesBar;
