import React, { useState, useEffect } from 'react';
import { Type, Square, Image as ImageIcon, Eye, EyeOff, Lock, Unlock, Copy, Trash2, ArrowUp, ArrowDown, GripVertical, ChevronDown, ChevronUp, AlignLeft, AlignCenter, AlignRight, Bold, Italic as ItalicIcon, Underline, Strikethrough, Crop } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as fabric from 'fabric';

const fontsList = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 
  'Source Sans 3', 'Raleway', 'PT Sans', 'Merriweather', 'Nunito', 
  'Playfair Display', 'Lora', 'Rubik', 'Work Sans', 'Fira Sans', 
  'Quicksand', 'Barlow', 'Inconsolata', 'Dancing Script', 'Pacifico'
];

const SortableLayerItem = ({ id, obj, isSelected, onSelect, onDelete, onToggleVisibility, onToggleLock }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isText = obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox';
  const isImage = obj.type === 'image';
  
  const getIcon = () => {
    if (isText) return <span className="font-serif font-bold text-blue-500">T</span>;
    if (isImage) return <ImageIcon size={14} className="text-green-500" />;
    return <Square size={14} className="text-yellow-500" />;
  };

  const getLabel = () => {
    if (obj.name) return obj.name;
    if (isText) return obj.text.substring(0, 15) + (obj.text.length > 15 ? '...' : '');
    if (isImage) return 'Image';
    return obj.type.charAt(0).toUpperCase() + obj.type.slice(1);
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      onClick={() => onSelect(obj)}
      className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:border-border-gray hover:bg-slate-50'}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-slate-300 hover:text-slate-500">
        <GripVertical size={16} />
      </div>
      
      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isText ? 'bg-blue-100' : isImage ? 'bg-green-100' : 'bg-yellow-100'}`}>
        {getIcon()}
      </div>
      
      <span className={`text-xs font-medium flex-1 truncate ${!obj.visible && 'opacity-40 line-through'}`}>
        {getLabel()}
      </span>
      
      <div className="flex items-center opacity-0 hover:opacity-100 transition-opacity gap-1" style={{ opacity: isSelected ? 1 : undefined }}>
        <button className="text-slate-400 hover:text-slate-700 p-1" onClick={(e) => { e.stopPropagation(); onToggleLock(obj); }} title={obj.selectable === false ? "Unlock" : "Lock"}>
          {obj.selectable === false ? <Lock size={12} /> : <Unlock size={12} />}
        </button>
        <button className="text-slate-400 hover:text-slate-700 p-1" onClick={(e) => { e.stopPropagation(); onToggleVisibility(obj); }} title={obj.visible ? "Hide" : "Show"}>
          {obj.visible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
        <button className="text-slate-400 hover:text-red-500 p-1" onClick={(e) => { e.stopPropagation(); onDelete(obj); }} title="Delete">
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

const SectionAccordion = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border-gray py-3">
      <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-xs font-bold text-text-light uppercase tracking-wider">{title}</span>
        {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </div>
      {isOpen && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
};

const ActiveObjectProperties = ({ activeObject, fabricCanvas, onCrop }) => {
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

  const isText = activeObject.type === 'text' || activeObject.type === 'i-text' || activeObject.type === 'textbox';
  const isShape = activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle' || activeObject.type === 'path' || activeObject.type === 'polygon';
  const isImage = activeObject.type === 'image';

  return (
    <div className="flex flex-col">
      {/* Appearance */}
      <SectionAccordion title="Appearance" defaultOpen={true}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span>Opacity</span>
            <span className="text-slate-400 text-xs">{Math.round(props.opacity * 100)}%</span>
          </div>
          <input type="range" min="0" max="1" step="0.05" value={props.opacity} onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))} className="w-full accent-blue-500" />
        </div>
        
        {(isText || isShape) && (
          <div className="flex justify-between items-center text-sm">
            <span>Fill Color</span>
            <input type="color" value={props.fill} onChange={(e) => updateProperty('fill', e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border-gray p-0" />
          </div>
        )}
      </SectionAccordion>

      {/* Typography */}
      {isText && (
        <SectionAccordion title="Typography" defaultOpen={true}>
          <div className="flex flex-col gap-3">
            <select value={props.fontFamily} onChange={(e) => updateProperty('fontFamily', e.target.value)} className="w-full bg-slate-50 border border-border-gray rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
              {fontsList.map(font => <option key={font} value={font} style={{fontFamily: font}}>{font}</option>)}
            </select>
            
            <div className="flex gap-2 items-center">
              <input type="number" value={props.fontSize} onChange={(e) => updateProperty('fontSize', parseInt(e.target.value, 10))} className="w-16 bg-slate-50 border border-border-gray rounded px-2 py-1 text-sm text-center" />
              <div className="flex bg-slate-50 border border-border-gray rounded overflow-hidden flex-1 justify-center">
                <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.fontWeight === 'bold' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontWeight', props.fontWeight === 'bold' ? 'normal' : 'bold')}><Bold size={16} /></button>
                <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.fontStyle === 'italic' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('fontStyle', props.fontStyle === 'italic' ? 'normal' : 'italic')}><ItalicIcon size={16} /></button>
                <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.underline ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('underline', !props.underline)}><Underline size={16} /></button>
                <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.linethrough ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('linethrough', !props.linethrough)}><Strikethrough size={16} /></button>
              </div>
            </div>

            <div className="flex bg-slate-50 border border-border-gray rounded overflow-hidden">
              <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.textAlign === 'left' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'left')}><AlignLeft size={16} /></button>
              <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.textAlign === 'center' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'center')}><AlignCenter size={16} /></button>
              <button className={`flex-1 p-1.5 hover:bg-slate-200 flex justify-center transition-colors ${props.textAlign === 'right' ? 'bg-slate-300' : ''}`} onClick={() => updateProperty('textAlign', 'right')}><AlignRight size={16} /></button>
            </div>

            <div className="flex justify-between items-center text-sm gap-2">
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-slate-500 mb-1">Letter Spacing</span>
                <input type="number" value={props.charSpacing} onChange={(e) => updateProperty('charSpacing', parseInt(e.target.value, 10))} className="w-full bg-slate-50 border border-border-gray rounded px-2 py-1 text-sm text-center" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-slate-500 mb-1">Line Height</span>
                <input type="number" step="0.1" value={props.lineHeight} onChange={(e) => updateProperty('lineHeight', parseFloat(e.target.value))} className="w-full bg-slate-50 border border-border-gray rounded px-2 py-1 text-sm text-center" />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
               <span>Background Color</span>
               <input type="color" value={props.textBackgroundColor || '#ffffff'} onChange={(e) => updateProperty('textBackgroundColor', e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border-gray p-0" />
            </div>
          </div>
        </SectionAccordion>
      )}

      {/* Shape properties */}
      {isShape && (
        <SectionAccordion title="Border & Corners" defaultOpen={true}>
          <div className="flex justify-between items-center text-sm">
            <span>Stroke Color</span>
            <input type="color" value={props.stroke} onChange={(e) => updateProperty('stroke', e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border-gray p-0" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Stroke Width</span>
            <input type="number" value={props.strokeWidth} onChange={(e) => updateProperty('strokeWidth', parseInt(e.target.value, 10))} className="w-16 bg-slate-50 border border-border-gray rounded px-2 py-1 text-sm text-center" />
          </div>
          {activeObject.type === 'rect' && (
            <div className="flex justify-between items-center text-sm mt-2">
              <span>Corner Radius</span>
              <input type="number" value={props.rx} onChange={(e) => updateProperty('rx', parseInt(e.target.value, 10))} className="w-16 bg-slate-50 border border-border-gray rounded px-2 py-1 text-sm text-center" />
            </div>
          )}
        </SectionAccordion>
      )}

      {/* Shadow */}
      <SectionAccordion title="Shadow" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium mb-3">
          <input type="checkbox" checked={props.shadowEnabled} onChange={(e) => updateProperty('shadowEnabled', e.target.checked)} className="rounded text-blue-500 w-4 h-4" />
          Enable Shadow
        </label>
        {props.shadowEnabled && (
          <div className="flex flex-col gap-3 pl-6 border-l-2 border-blue-100">
            <div className="flex justify-between items-center text-sm">
              <span>Color</span>
              <input type="color" value={props.shadowColor} onChange={(e) => updateProperty('shadowColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border border-border-gray p-0" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Blur</span><span className="text-slate-400">{props.shadowBlur}</span></div>
              <input type="range" min="0" max="50" value={props.shadowBlur} onChange={(e) => updateProperty('shadowBlur', parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Offset X</span><span className="text-slate-400">{props.shadowOffsetX}</span></div>
              <input type="range" min="-50" max="50" value={props.shadowOffsetX} onChange={(e) => updateProperty('shadowOffsetX', parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Offset Y</span><span className="text-slate-400">{props.shadowOffsetY}</span></div>
              <input type="range" min="-50" max="50" value={props.shadowOffsetY} onChange={(e) => updateProperty('shadowOffsetY', parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>
        )}
      </SectionAccordion>

      {/* Image Filters */}
      {isImage && (
        <SectionAccordion title="Image Filters" defaultOpen={false}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Brightness</span><span className="text-slate-400">{props.brightness.toFixed(1)}</span></div>
              <input type="range" min="-1" max="1" step="0.1" value={props.brightness} onChange={(e) => updateFilter(0, fabric.Image.filters.Brightness, { brightness: parseFloat(e.target.value) }, 'brightness', parseFloat(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Contrast</span><span className="text-slate-400">{props.contrast.toFixed(1)}</span></div>
              <input type="range" min="-1" max="1" step="0.1" value={props.contrast} onChange={(e) => updateFilter(1, fabric.Image.filters.Contrast, { contrast: parseFloat(e.target.value) }, 'contrast', parseFloat(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Saturation</span><span className="text-slate-400">{props.saturation.toFixed(1)}</span></div>
              <input type="range" min="-1" max="1" step="0.1" value={props.saturation} onChange={(e) => updateFilter(2, fabric.Image.filters.Saturation, { saturation: parseFloat(e.target.value) }, 'saturation', parseFloat(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs"><span>Blur</span><span className="text-slate-400">{props.blur.toFixed(2)}</span></div>
              <input type="range" min="0" max="1" step="0.05" value={props.blur} onChange={(e) => updateFilter(3, fabric.Image.filters.Blur, { blur: parseFloat(e.target.value) }, 'blur', parseFloat(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
               <label className="text-xs font-medium cursor-pointer flex items-center gap-1 bg-slate-50 border border-border-gray px-2 py-1 rounded"><input type="checkbox" checked={props.grayscale} onChange={(e) => updateFilter(4, e.target.checked ? fabric.Image.filters.Grayscale : null, {}, 'grayscale', e.target.checked)} className="rounded text-blue-500" />Grayscale</label>
               <label className="text-xs font-medium cursor-pointer flex items-center gap-1 bg-slate-50 border border-border-gray px-2 py-1 rounded"><input type="checkbox" checked={props.invert} onChange={(e) => updateFilter(5, e.target.checked ? fabric.Image.filters.Invert : null, {}, 'invert', e.target.checked)} className="rounded text-blue-500" />Invert</label>
               <label className="text-xs font-medium cursor-pointer flex items-center gap-1 bg-slate-50 border border-border-gray px-2 py-1 rounded"><input type="checkbox" checked={props.sepia} onChange={(e) => updateFilter(6, e.target.checked ? fabric.Image.filters.Sepia : null, {}, 'sepia', e.target.checked)} className="rounded text-blue-500" />Sepia</label>
            </div>
            
            <button className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 mt-2 px-3 py-2 rounded text-sm font-medium transition-colors w-full" onClick={() => onCrop && onCrop()}>
              <Crop size={16} /> Crop Image
            </button>
          </div>
        </SectionAccordion>
      )}
    </div>
  );
};

const EditorRightPanel = ({ fabricCanvas, canvasObjects, setCanvasObjects, onCrop }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [activeObj, setActiveObj] = useState(null);

  useEffect(() => {
    if (!fabricCanvas) return;
    const updateActive = () => setActiveObj(fabricCanvas.getActiveObject());
    fabricCanvas.on('selection:created', updateActive);
    fabricCanvas.on('selection:updated', updateActive);
    fabricCanvas.on('selection:cleared', updateActive);
    return () => {
      fabricCanvas.off('selection:created', updateActive);
      fabricCanvas.off('selection:updated', updateActive);
      fabricCanvas.off('selection:cleared', updateActive);
    }
  }, [fabricCanvas]);

  const handleChangeBackground = (color) => {
    if (fabricCanvas) {
      fabricCanvas.backgroundColor = color;
      fabricCanvas.requestRenderAll();
      fabricCanvas.fire('object:modified');
    }
  };

  const handleSelectLayer = (obj) => {
    if (fabricCanvas) {
      fabricCanvas.setActiveObject(obj);
      fabricCanvas.requestRenderAll();
    }
  };

  const handleDeleteLayer = (obj) => {
    if (fabricCanvas) {
      fabricCanvas.remove(obj);
      fabricCanvas.discardActiveObject();
      fabricCanvas.requestRenderAll();
    }
  };

  const handleToggleVisibility = (obj) => {
    if (fabricCanvas) {
      obj.set('visible', !obj.visible);
      fabricCanvas.discardActiveObject();
      fabricCanvas.requestRenderAll();
      setCanvasObjects([...fabricCanvas.getObjects()]);
    }
  };

  const handleToggleLock = (obj) => {
    if (fabricCanvas) {
      const isLocked = obj.selectable === false;
      obj.set({
        selectable: isLocked,
        evented: isLocked,
        hasControls: isLocked,
        hasBorders: isLocked,
      });
      fabricCanvas.discardActiveObject();
      fabricCanvas.requestRenderAll();
      setCanvasObjects([...fabricCanvas.getObjects()]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!fabricCanvas || !over) return;

    if (active.id !== over.id) {
      const oldIndex = canvasObjects.findIndex(obj => obj === active.id);
      const newIndex = canvasObjects.findIndex(obj => obj === over.id);
      
      const newArray = arrayMove(canvasObjects, oldIndex, newIndex);
      
      fabricCanvas._objects = [...newArray];
      fabricCanvas.requestRenderAll();
      setCanvasObjects(newArray);
      fabricCanvas.fire('object:modified');
    }
  };

  return (
    <div className="w-80 bg-white border-l border-border-gray h-full shadow-sm flex flex-col z-10 flex-shrink-0">
      
      {/* Properties Section */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col">
        {activeObj ? (
          <div className="flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-primary-dark">Object Properties</h3>
             </div>
             <ActiveObjectProperties activeObject={activeObj} fabricCanvas={fabricCanvas} onCrop={onCrop} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-primary-dark">Page Properties</h3>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-text-light uppercase tracking-wider">Background Color</label>
              <div className="flex gap-2 flex-wrap">
                <button className="w-8 h-8 rounded-full border border-border-gray bg-white hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#ffffff')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-slate-100 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#f8fafc')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-slate-900 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#0f172a')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-red-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#ef4444')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-blue-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#3b82f6')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-yellow-400 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#facc15')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-green-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#22c55e')}></button>
                <button className="w-8 h-8 rounded-full border border-border-gray bg-purple-500 hover:shadow-md transition-shadow" onClick={() => handleChangeBackground('#a855f7')}></button>
              </div>
              <label className="text-xs font-bold text-text-light uppercase tracking-wider mt-4">Background Image</label>
              <input type="file" accept="image/*" className="text-sm" onChange={async (e) => {
                const file = e.target.files[0];
                if (file && fabricCanvas) {
                  const objectUrl = URL.createObjectURL(file);
                  import('fabric').then(fabric => {
                    fabric.Image.fromURL(objectUrl).then((img) => {
                      const scale = Math.max(800 / img.width, 600 / img.height);
                      img.set({ scaleX: scale, scaleY: scale, originX: 'center', originY: 'center', left: 400, top: 300 });
                      fabricCanvas.backgroundImage = img;
                      fabricCanvas.requestRenderAll();
                      fabricCanvas.fire('object:modified');
                    });
                  });
                }
              }} />
              <button className="text-xs text-red-500 text-left mt-1 hover:underline" onClick={() => {
                if (fabricCanvas) {
                  fabricCanvas.backgroundImage = null;
                  fabricCanvas.requestRenderAll();
                  fabricCanvas.fire('object:modified');
                }
              }}>Remove Background Image</button>
            </div>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-border-gray"></div>

      {/* Layers Section */}
      <div className="flex flex-col gap-3 h-1/3 min-h-[200px] p-5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-text-light uppercase tracking-wider">Layers</label>
        </div>
        
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
          {canvasObjects && canvasObjects.length === 0 && (
            <span className="text-sm text-slate-400 italic">No layers yet</span>
          )}
          
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={canvasObjects} strategy={verticalListSortingStrategy}>
              {canvasObjects && [...canvasObjects].reverse().map((obj) => (
                <SortableLayerItem
                  key={obj}
                  id={obj}
                  obj={obj}
                  isSelected={activeObj === obj}
                  onSelect={handleSelectLayer}
                  onDelete={handleDeleteLayer}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleLock={handleToggleLock}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

    </div>
  );
};

export default EditorRightPanel;
