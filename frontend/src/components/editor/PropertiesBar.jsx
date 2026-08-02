import React, { useState, useEffect } from 'react';
import { Trash2, Crop, AlignLeft, AlignCenter, AlignRight, Bold, Italic as ItalicIcon, Underline, Strikethrough, Type as TypeIcon } from 'lucide-react';
import * as fabric from 'fabric';

const fontsList = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 
  'Source Sans 3', 'Raleway', 'PT Sans', 'Merriweather', 'Nunito', 
  'Playfair Display', 'Lora', 'Rubik', 'Work Sans', 'Fira Sans', 
  'Quicksand', 'Barlow', 'Inconsolata', 'Dancing Script', 'Pacifico'
];

const PropertiesBar = ({ activeObject, fabricCanvas, onCrop }) => {
  const [props, setProps] = useState({
    fill: '#000000', stroke: '#000000', strokeWidth: 0, rx: 0, ry: 0,
    fontFamily: 'Inter', fontSize: 24, fontWeight: 'normal', fontStyle: 'normal',
    underline: false, linethrough: false, overline: false, textBackgroundColor: '',
    textAlign: 'left', charSpacing: 0, lineHeight: 1.16, opacity: 1,
    shadowEnabled: false, shadowColor: 'rgba(0,0,0,0.3)', shadowBlur: 10, shadowOffsetX: 5, shadowOffsetY: 5,
    brightness: 0, contrast: 0, saturation: 0, blur: 0, grayscale: false, invert: false, sepia: false
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
        linethrough: !!activeObject.linethrough,
        overline: !!activeObject.overline,
        textBackgroundColor: activeObject.textBackgroundColor || '',
        textAlign: activeObject.textAlign || 'left',
        charSpacing: activeObject.charSpacing || 0,
        lineHeight: activeObject.lineHeight || 1.16,
        opacity: activeObject.opacity ?? 1,
        shadowEnabled: !!activeObject.shadow,
        shadowColor: activeObject.shadow ? activeObject.shadow.color : 'rgba(0,0,0,0.3)',
        shadowBlur: activeObject.shadow ? activeObject.shadow.blur : 10,
        shadowOffsetX: activeObject.shadow ? activeObject.shadow.offsetX : 5,
        shadowOffsetY: activeObject.shadow ? activeObject.shadow.offsetY : 5,
        brightness: activeObject.filters && activeObject.filters[0] ? activeObject.filters[0].brightness : 0,
        contrast: activeObject.filters && activeObject.filters[1] ? activeObject.filters[1].contrast : 0,
        saturation: activeObject.filters && activeObject.filters[2] ? activeObject.filters[2].saturation : 0,
        blur: activeObject.filters && activeObject.filters[3] ? activeObject.filters[3].blur : 0,
        grayscale: activeObject.filters && !!activeObject.filters[4],
        invert: activeObject.filters && !!activeObject.filters[5],
        sepia: activeObject.filters && !!activeObject.filters[6]
      });
    }
  }, [activeObject]);

  const updateProperty = (key, value) => {
    if (!activeObject || !fabricCanvas) return;
    
    if (key.startsWith('shadow')) {
      const shadowProps = { ...props, [key]: value };
      if (shadowProps.shadowEnabled) {
        activeObject.set('shadow', new fabric.Shadow({
          color: shadowProps.shadowColor,
          blur: shadowProps.shadowBlur,
          offsetX: shadowProps.shadowOffsetX,
          offsetY: shadowProps.shadowOffsetY
        }));
      } else {
        activeObject.set('shadow', null);
      }
    } else if (key === 'rx') {
      activeObject.set('rx', value);
      activeObject.set('ry', value); 
    } else {
      activeObject.set(key, value);
    }
    
    setProps(prev => ({ ...prev, [key]: value }));
    fabricCanvas.renderAll();
    fabricCanvas.fire('object:modified', { target: activeObject });
  };

  const updateFilter = (index, filterClass, options, key, value) => {
    if (!activeObject || activeObject.type !== 'image') return;
    
    if (filterClass) {
      activeObject.filters[index] = new filterClass(options);
    } else {
      activeObject.filters[index] = null;
    }
    
    activeObject.applyFilters();
    fabricCanvas.renderAll();
    setProps(prev => ({ ...prev, [key]: value }));
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
            <select value={props.fontFamily} onChange={(e) => updateProperty('fontFamily', e.target.value)} className="bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm w-32">
              {fontsList.map(font => <option key={font} value={font} style={{fontFamily: font}}>{font}</option>)}
            </select>
            
            <input type="number" value={props.fontSize} onChange={(e) => updateProperty('fontSize', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm" title="Font Size" />
            
            <div className="flex bg-primary-gray border border-border-gray rounded">
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.fontWeight === 'bold' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontWeight', props.fontWeight === 'bold' ? 'normal' : 'bold')} title="Bold"><Bold size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.fontStyle === 'italic' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontStyle', props.fontStyle === 'italic' ? 'normal' : 'italic')} title="Italic"><ItalicIcon size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.underline ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('underline', !props.underline)} title="Underline"><Underline size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.linethrough ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('linethrough', !props.linethrough)} title="Strikethrough"><Strikethrough size={16} /></button>
            </div>

            <div className="flex bg-primary-gray border border-border-gray rounded">
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'left' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'left')}><AlignLeft size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'center' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'center')}><AlignCenter size={16} /></button>
              <button className={`p-1.5 hover:bg-slate-200 transition-colors ${props.textAlign === 'right' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'right')}><AlignRight size={16} /></button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-light uppercase" title="Letter & Line Spacing">Spc</span>
              <input type="number" value={props.charSpacing} onChange={(e) => updateProperty('charSpacing', parseInt(e.target.value, 10))} className="w-12 bg-primary-gray border border-border-gray rounded px-1 py-1 text-sm" title="Letter Spacing" />
              <input type="number" step="0.1" value={props.lineHeight} onChange={(e) => updateProperty('lineHeight', parseFloat(e.target.value))} className="w-12 bg-primary-gray border border-border-gray rounded px-1 py-1 text-sm" title="Line Height" />
            </div>

            <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-text-light uppercase">BG</span>
               <input type="color" value={props.textBackgroundColor || '#ffffff'} onChange={(e) => updateProperty('textBackgroundColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0" title="Text Background Color" />
            </div>
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

        {/* Universal Shadow */}
        <div className="w-px h-6 bg-border-gray"></div>
        <div className="flex items-center gap-2 relative group">
          <label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={props.shadowEnabled} onChange={(e) => updateProperty('shadowEnabled', e.target.checked)} className="rounded text-primary-blue" />
            Shadow
          </label>
          {props.shadowEnabled && (
            <div className="hidden group-hover:flex absolute top-full left-0 mt-2 bg-white border border-border-gray p-2 shadow-lg rounded z-50 flex-col gap-2 w-48">
              <div className="flex justify-between items-center text-xs">
                Color: <input type="color" value={props.shadowColor} onChange={(e) => updateProperty('shadowColor', e.target.value)} className="w-5 h-5 p-0" />
              </div>
              <div className="flex justify-between items-center text-xs">
                Blur: <input type="range" min="0" max="50" value={props.shadowBlur} onChange={(e) => updateProperty('shadowBlur', parseInt(e.target.value))} className="w-24" />
              </div>
              <div className="flex justify-between items-center text-xs">
                OffX: <input type="range" min="-50" max="50" value={props.shadowOffsetX} onChange={(e) => updateProperty('shadowOffsetX', parseInt(e.target.value))} className="w-24" />
              </div>
              <div className="flex justify-between items-center text-xs">
                OffY: <input type="range" min="-50" max="50" value={props.shadowOffsetY} onChange={(e) => updateProperty('shadowOffsetY', parseInt(e.target.value))} className="w-24" />
              </div>
            </div>
          )}
        </div>

        {/* Image Specific Properties */}
        {isImage && (
          <>
            <div className="w-px h-6 bg-border-gray"></div>
            <div className="flex items-center gap-3">
               {/* Filters Dropdown */}
               <div className="relative group">
                 <button className="text-sm font-medium hover:bg-slate-100 px-2 py-1 rounded">Filters</button>
                 <div className="hidden group-hover:flex absolute top-full left-0 mt-2 bg-white border border-border-gray p-3 shadow-xl rounded z-50 flex-col gap-3 w-56">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-light uppercase">Brightness</span>
                      <input type="range" min="-1" max="1" step="0.1" value={props.brightness} onChange={(e) => updateFilter(0, fabric.Image.filters.Brightness, { brightness: parseFloat(e.target.value) }, 'brightness', parseFloat(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-light uppercase">Contrast</span>
                      <input type="range" min="-1" max="1" step="0.1" value={props.contrast} onChange={(e) => updateFilter(1, fabric.Image.filters.Contrast, { contrast: parseFloat(e.target.value) }, 'contrast', parseFloat(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-light uppercase">Saturation</span>
                      <input type="range" min="-1" max="1" step="0.1" value={props.saturation} onChange={(e) => updateFilter(2, fabric.Image.filters.Saturation, { saturation: parseFloat(e.target.value) }, 'saturation', parseFloat(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-light uppercase">Blur</span>
                      <input type="range" min="0" max="1" step="0.05" value={props.blur} onChange={(e) => updateFilter(3, fabric.Image.filters.Blur, { blur: parseFloat(e.target.value) }, 'blur', parseFloat(e.target.value))} />
                    </div>
                    <hr/>
                    <div className="flex items-center justify-between">
                       <label className="text-xs font-medium cursor-pointer"><input type="checkbox" checked={props.grayscale} onChange={(e) => updateFilter(4, e.target.checked ? fabric.Image.filters.Grayscale : null, {}, 'grayscale', e.target.checked)} className="mr-2" />Grayscale</label>
                       <label className="text-xs font-medium cursor-pointer"><input type="checkbox" checked={props.invert} onChange={(e) => updateFilter(5, e.target.checked ? fabric.Image.filters.Invert : null, {}, 'invert', e.target.checked)} className="mr-2" />Invert</label>
                       <label className="text-xs font-medium cursor-pointer"><input type="checkbox" checked={props.sepia} onChange={(e) => updateFilter(6, e.target.checked ? fabric.Image.filters.Sepia : null, {}, 'sepia', e.target.checked)} className="mr-2" />Sepia</label>
                    </div>
                 </div>
               </div>
            </div>
            
            <button className="flex items-center gap-1.5 bg-primary-gray hover:bg-slate-200 border border-border-gray px-3 py-1.5 rounded text-sm font-medium transition-colors" onClick={onCrop}>
              <Crop size={16} /> Crop
            </button>
          </>
        )}
      </div>
      
      <div className="flex items-center pl-2 ml-auto">
        <button className="flex items-center gap-1.5 text-text-light hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50" onClick={handleDelete}>
          <Trash2 size={16} /> <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PropertiesBar;
