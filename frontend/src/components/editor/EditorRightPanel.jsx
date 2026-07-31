import React, { useState, useEffect } from 'react';
import { Type, Square, Image as ImageIcon, Eye, EyeOff, Lock, Unlock, Copy, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableLayerItem = ({ id, obj, isSelected, onSelect, onDelete, onToggleVisibility, onToggleLock, onDuplicate, onMoveUp, onMoveDown }) => {
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

const EditorRightPanel = ({ fabricCanvas, canvasObjects, setCanvasObjects }) => {
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
      
      // Sync to Fabric
      fabricCanvas._objects = [...newArray];
      fabricCanvas.requestRenderAll();
      setCanvasObjects(newArray);
      fabricCanvas.fire('object:modified');
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
          <label className="text-xs font-bold text-text-light uppercase tracking-wider mt-2">Background Image</label>
          <input type="file" accept="image/*" className="text-sm" onChange={async (e) => {
            const file = e.target.files[0];
            if (file && fabricCanvas) {
              const formData = new FormData();
              formData.append('image', file);
              const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
              const response = await fetch(`${apiUrl}/api/upload`, { method: 'POST', body: formData });
              const data = await response.json();
              if (data.url) {
                import('fabric').then(fabric => {
                  fabric.Image.fromURL(data.url).then((img) => {
                    const scale = Math.max(800 / img.width, 600 / img.height);
                    img.set({ scaleX: scale, scaleY: scale, originX: 'center', originY: 'center', left: 400, top: 300 });
                    fabricCanvas.backgroundImage = img;
                    fabricCanvas.requestRenderAll();
                    fabricCanvas.fire('object:modified');
                  });
                });
              }
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

        <div className="h-px w-full bg-border-gray"></div>

        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-light uppercase tracking-wider">Layers</label>
          </div>
          
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
            {canvasObjects && canvasObjects.length === 0 && (
              <span className="text-sm text-slate-400 italic">No layers yet</span>
            )}
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={canvasObjects} strategy={verticalListSortingStrategy}>
                {/* Render in reverse so top layers visually appear at the top of the list */}
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
    </div>
  );
};

export default EditorRightPanel;
