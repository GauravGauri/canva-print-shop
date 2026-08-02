import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorRightPanel from '../components/editor/EditorRightPanel';
import TopNavbar from '../components/editor/TopNavbar';
import { AppContext } from '../context/AppContext';
import { Check, ZoomIn, ZoomOut, Maximize, Undo2, Redo2 } from 'lucide-react';

const Editor = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState('Shapes');
  const [canvasObjects, setCanvasObjects] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  const [cropState, setCropState] = useState(null);
  const { setDesignData } = useContext(AppContext);
  const [zoomRatio, setZoomRatio] = useState(1);
  
  // History State
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isHistoryUpdate = useRef(false);
  
  // Clipboard State
  const clipboardRef = useRef(null);

  const updateObjects = (canvas) => {
    if (canvas) {
      setCanvasObjects([...canvas.getObjects()]);
      setActiveObject(canvas.getActiveObject());
    }
  };

  const saveHistory = useCallback((canvas) => {
    if (isHistoryUpdate.current || !canvas) return;
    const json = canvas.toJSON();
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.stringify(json));
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [historyIndex]);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true
      });

      const rect = new fabric.Rect({
        left: 200, top: 200, fill: '#fcd34d', width: 200, height: 150, rx: 10, ry: 10
      });
      const text = new fabric.IText('Cafe Hero', {
        left: 220, top: 250, fontSize: 24, fontFamily: 'Inter', fill: '#1e293b'
      });

      initCanvas.add(rect, text);
      
      const handleModify = () => {
        updateObjects(initCanvas);
        saveHistory(initCanvas);
      };

      initCanvas.on('object:added', handleModify);
      initCanvas.on('object:removed', handleModify);
      initCanvas.on('object:modified', handleModify);
      initCanvas.on('selection:created', () => setActiveObject(initCanvas.getActiveObject()));
      initCanvas.on('selection:updated', () => setActiveObject(initCanvas.getActiveObject()));
      initCanvas.on('selection:cleared', () => setActiveObject(null));

      // Zoom & Pan Logic
      initCanvas.on('mouse:wheel', function(opt) {
        let delta = opt.e.deltaY;
        let zoom = initCanvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.1) zoom = 0.1;
        initCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        setZoomRatio(zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      initCanvas.on('mouse:down', function(opt) {
        let evt = opt.e;
        if (evt.altKey === true || evt.button === 1) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });

      initCanvas.on('mouse:move', function(opt) {
        if (this.isDragging) {
          let e = opt.e;
          let vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });

      initCanvas.on('mouse:up', function(opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });

      initCanvas.renderAll();
      setFabricCanvas(initCanvas);
      updateObjects(initCanvas);
      
      // Initial History state
      isHistoryUpdate.current = true;
      const initialJson = JSON.stringify(initCanvas.toJSON());
      setHistory([initialJson]);
      setHistoryIndex(0);
      setTimeout(() => { isHistoryUpdate.current = false; }, 100);
    }
    
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, [canvasRef, fabricCanvas, saveHistory]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fabricCanvas) return;
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;

      const active = fabricCanvas.getActiveObject();

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (active && !active.isEditing) {
          e.preventDefault();
          const activeObjects = fabricCanvas.getActiveObjects();
          if (activeObjects.length) {
            fabricCanvas.discardActiveObject();
            activeObjects.forEach(obj => fabricCanvas.remove(obj));
          }
        }
      }
      
      // Copy (Ctrl+C)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (active && !active.isEditing) {
          e.preventDefault();
          active.clone().then(cloned => {
            clipboardRef.current = cloned;
          });
        }
      }

      // Paste (Ctrl+V)
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        if (clipboardRef.current && !active?.isEditing) {
          e.preventDefault();
          clipboardRef.current.clone().then(clonedObj => {
            fabricCanvas.discardActiveObject();
            clonedObj.set({
              left: clonedObj.left + 10,
              top: clonedObj.top + 10,
              evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
              clonedObj.canvas = fabricCanvas;
              clonedObj.forEachObject(obj => {
                fabricCanvas.add(obj);
              });
              clonedObj.setCoords();
            } else {
              fabricCanvas.add(clonedObj);
            }
            clipboardRef.current.top += 10;
            clipboardRef.current.left += 10;
            fabricCanvas.setActiveObject(clonedObj);
            fabricCanvas.requestRenderAll();
          });
        }
      }

      // Duplicate (Ctrl+D)
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        if (active && !active.isEditing) {
          e.preventDefault();
          active.clone().then(cloned => {
            fabricCanvas.discardActiveObject();
            cloned.set({ left: cloned.left + 10, top: cloned.top + 10 });
            if (cloned.type === 'activeSelection') {
              cloned.canvas = fabricCanvas;
              cloned.forEachObject(obj => fabricCanvas.add(obj));
              cloned.setCoords();
            } else {
              fabricCanvas.add(cloned);
            }
            fabricCanvas.setActiveObject(cloned);
            fabricCanvas.requestRenderAll();
          });
        }
      }

      // Select All (Ctrl+A)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        if (!active?.isEditing) {
          e.preventDefault();
          fabricCanvas.discardActiveObject();
          const sel = new fabric.ActiveSelection(fabricCanvas.getObjects(), { canvas: fabricCanvas });
          fabricCanvas.setActiveObject(sel);
          fabricCanvas.requestRenderAll();
        }
      }

      // Undo (Ctrl+Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        if (!active?.isEditing) {
          e.preventDefault();
          handleUndo();
        }
      }

      // Redo (Ctrl+Shift+Z or Ctrl+Y)
      if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) || ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        if (!active?.isEditing) {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleUndo = () => {
    if (historyIndex > 0 && fabricCanvas) {
      isHistoryUpdate.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      fabricCanvas.loadFromJSON(history[newIndex]).then(() => {
        fabricCanvas.renderAll();
        updateObjects(fabricCanvas);
        setTimeout(() => { isHistoryUpdate.current = false; }, 100);
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && fabricCanvas) {
      isHistoryUpdate.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      fabricCanvas.loadFromJSON(history[newIndex]).then(() => {
        fabricCanvas.renderAll();
        updateObjects(fabricCanvas);
        setTimeout(() => { isHistoryUpdate.current = false; }, 100);
      });
    }
  };

  const zoomTo = (level) => {
    if (!fabricCanvas) return;
    fabricCanvas.setZoom(level);
    setZoomRatio(level);
  };

  const fitToScreen = () => {
    if (!fabricCanvas || !wrapperRef.current) return;
    const padding = 40;
    const wrapperW = wrapperRef.current.clientWidth;
    const wrapperH = wrapperRef.current.clientHeight;
    
    const scaleX = (wrapperW - padding) / 800; // 800 is canvas base width
    const scaleY = (wrapperH - padding) / 600; // 600 is canvas base height
    const scale = Math.min(scaleX, scaleY);
    
    fabricCanvas.setZoom(scale);
    setZoomRatio(scale);
    
    const vpt = fabricCanvas.viewportTransform;
    vpt[4] = (wrapperW - 800 * scale) / 2;
    vpt[5] = (wrapperH - 600 * scale) / 2;
    fabricCanvas.requestRenderAll();
  };

  const handleToolAction = (toolId) => {
    if (!fabricCanvas) return;
    
    // Canvas is hardcoded to 800x600, so center is 400x300
    const cx = 400;
    const cy = 300;
    
    if (toolId === 'heading') {
      const text = new fabric.Textbox('Add a heading', { left: cx, top: cy, originX: 'center', originY: 'center', fontSize: 48, fontFamily: 'Inter', fontWeight: 'bold', fill: '#1e293b', width: 400, textAlign: 'center' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'subheading') {
      const text = new fabric.Textbox('Add a subheading', { left: cx, top: cy, originX: 'center', originY: 'center', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', fill: '#334155', width: 300, textAlign: 'center' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'body') {
      const text = new fabric.Textbox('Add a little bit of body text', { left: cx, top: cy, originX: 'center', originY: 'center', fontSize: 16, fontFamily: 'Inter', fill: '#475569', width: 250, textAlign: 'center' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'rect') {
      const rect = new fabric.Rect({ left: cx, top: cy, originX: 'center', originY: 'center', fill: '#3b82f6', width: 100, height: 100 });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (toolId === 'circle') {
      const circle = new fabric.Circle({ left: cx, top: cy, originX: 'center', originY: 'center', fill: '#ef4444', radius: 50 });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (toolId === 'triangle') {
      const tri = new fabric.Triangle({ left: cx, top: cy, originX: 'center', originY: 'center', fill: '#10b981', width: 100, height: 100 });
      fabricCanvas.add(tri);
      fabricCanvas.setActiveObject(tri);
    } else if (toolId === 'line') {
      const line = new fabric.Line([-50, 0, 50, 0], { left: cx, top: cy, originX: 'center', originY: 'center', stroke: '#000000', strokeWidth: 4 });
      fabricCanvas.add(line);
      fabricCanvas.setActiveObject(line);
    } else if (toolId === 'arrow') {
      const arrowPath = 'M 0 10 L 50 10 L 50 0 L 70 15 L 50 30 L 50 20 L 0 20 z';
      const arrow = new fabric.Path(arrowPath, { left: cx, top: cy, originX: 'center', originY: 'center', fill: '#8b5cf6' });
      fabricCanvas.add(arrow);
      fabricCanvas.setActiveObject(arrow);
    } else if (toolId === 'polygon') {
      const hexPoints = [{x: 50, y: 0}, {x: 100, y: 25}, {x: 100, y: 75}, {x: 50, y: 100}, {x: 0, y: 75}, {x: 0, y: 25}];
      const hex = new fabric.Polygon(hexPoints, { left: cx, top: cy, originX: 'center', originY: 'center', fill: '#f59e0b' });
      fabricCanvas.add(hex);
      fabricCanvas.setActiveObject(hex);
    } else if (toolId === 'star') {
      const starPoints = [{x: 50, y: 0}, {x: 61, y: 35}, {x: 98, y: 35}, {x: 68, y: 57}, {x: 79, y: 91}, {x: 50, y: 70}, {x: 21, y: 91}, {x: 32, y: 57}, {x: 2, y: 35}, {x: 39, y: 35}];
      const star = new fabric.Polygon(starPoints, { left: cx, top: cy, originX: 'center', originY: 'center', fill: '#fbbf24' });
      fabricCanvas.add(star);
      fabricCanvas.setActiveObject(star);
    } else if (toolId === 'template_sale') {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#fca5a5';
      const text = new fabric.Textbox('SUMMER SALE', { left: cx, top: cy - 50, originX: 'center', originY: 'center', fontSize: 64, fontFamily: 'Montserrat', fontWeight: 'bold', fill: '#ffffff', textAlign: 'center' });
      const sub = new fabric.Textbox('Up to 50% Off', { left: cx, top: cy + 30, originX: 'center', originY: 'center', fontSize: 32, fontFamily: 'Open Sans', fill: '#ffffff', textAlign: 'center' });
      fabricCanvas.add(text, sub);
    } else if (toolId === 'template_ig') {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#fcd34d';
      const text = new fabric.Textbox('New Post', { left: cx, top: cy, originX: 'center', originY: 'center', fontSize: 72, fontFamily: 'Playfair Display', fontWeight: 'bold', fill: '#1e293b', textAlign: 'center' });
      fabricCanvas.add(text);
    } else if (toolId === 'template_quote') {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#93c5fd';
      const quote = new fabric.Textbox('"The best time to plant a tree was 20 years ago. The second best time is now."', { left: cx, top: cy, originX: 'center', originY: 'center', fontSize: 36, fontFamily: 'Lora', fontStyle: 'italic', fill: '#1e3a8a', width: 600, textAlign: 'center' });
      fabricCanvas.add(quote);
    }
    
    fabricCanvas.renderAll();
    fabricCanvas.fire('object:added');
  };

  const handleImageUpload = (dataUrl) => {
    if (!fabricCanvas) return;
    fabric.Image.fromURL(dataUrl).then((img) => {
      img.set({ left: 100, top: 100 });
      img.scaleToWidth(200);
      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      fabricCanvas.renderAll();
    }).catch(err => console.error("Error loading image", err));
  };

  const startCrop = () => {
    if (!fabricCanvas || !activeObject || activeObject.type !== 'image') return;
    
    const cropBox = new fabric.Rect({
      left: activeObject.left,
      top: activeObject.top,
      width: activeObject.getScaledWidth(),
      height: activeObject.getScaledHeight(),
      fill: 'rgba(0,0,0,0.3)',
      borderColor: 'red',
      cornerColor: 'red',
      transparentCorners: false,
      hasRotatingPoint: false
    });
    
    fabricCanvas.add(cropBox);
    fabricCanvas.setActiveObject(cropBox);
    fabricCanvas.renderAll();
    
    setCropState({ image: activeObject, cropBox });
  };

  const applyCrop = () => {
    if (!fabricCanvas || !cropState) return;
    const { image, cropBox } = cropState;
    
    const scaleX = image.scaleX || 1;
    const scaleY = image.scaleY || 1;
    
    const leftOffset = (cropBox.left - image.left) / scaleX;
    const topOffset = (cropBox.top - image.top) / scaleY;
    
    const cropWidth = (cropBox.getScaledWidth() / scaleX);
    const cropHeight = (cropBox.getScaledHeight() / scaleY);

    image.set({
      cropX: (image.cropX || 0) + leftOffset,
      cropY: (image.cropY || 0) + topOffset,
      width: cropWidth,
      height: cropHeight,
      left: cropBox.left,
      top: cropBox.top
    });
    
    fabricCanvas.remove(cropBox);
    fabricCanvas.setActiveObject(image);
    fabricCanvas.renderAll();
    setCropState(null);
  };

  const cancelCrop = () => {
    if (!fabricCanvas || !cropState) return;
    fabricCanvas.remove(cropState.cropBox);
    fabricCanvas.setActiveObject(cropState.image);
    fabricCanvas.renderAll();
    setCropState(null);
  };

  const handleSave = async () => {
    if (!fabricCanvas) return;
    try {
      const json = fabricCanvas.toJSON();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/templates/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productId, designData: json })
      });
      if (response.ok) {
        alert('Design saved successfully!');
      } else {
        alert('Failed to save design.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving design.');
    }
  };

  const handleOrder = () => {
    if (!fabricCanvas) return;
    const previewImage = fabricCanvas.toDataURL({ format: 'png', quality: 0.8 });
    setDesignData({
      productId,
      preview: previewImage,
      json: fabricCanvas.toJSON()
    });
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-primary-gray font-sans">
      <TopNavbar onSave={handleSave} onOrder={handleOrder} />
      
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        <EditorSidebar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          onToolAction={handleToolAction} 
          onImageUpload={handleImageUpload} 
        />
        
        <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-100 border-x border-border-gray">
          
          {/* Properties Bar Overlay */}
          {cropState && (
            <div className="h-14 bg-white border-b border-border-gray flex items-center px-4 justify-between shadow-sm z-10 gap-4 flex-shrink-0">
               <div className="flex items-center gap-2 text-sm font-bold text-red-500">
                 Crop Mode Active
               </div>
               <div className="flex items-center gap-2">
                 <button className="text-text-light hover:text-text-main px-4 py-1.5 rounded text-sm font-medium transition-colors" onClick={cancelCrop}>Cancel</button>
                 <button className="bg-primary-blue hover:bg-primary-blue-hover text-white flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-bold transition-colors" onClick={applyCrop}>
                   <Check size={16} /> Apply Crop
                 </button>
               </div>
            </div>
          )}
          {/* Floating Undo/Redo Controls */}
          <div className="absolute top-6 left-6 z-10 flex items-center bg-white rounded-lg shadow-lg border border-border-gray overflow-hidden">
             <button className="p-2 hover:bg-primary-gray text-text-main transition-colors border-r border-border-gray disabled:opacity-30 disabled:hover:bg-transparent" onClick={handleUndo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
               <Undo2 size={16} />
             </button>
             <button className="p-2 hover:bg-primary-gray text-text-main transition-colors disabled:opacity-30 disabled:hover:bg-transparent" onClick={handleRedo} disabled={historyIndex >= history.length - 1} title="Redo (Ctrl+Shift+Z)">
               <Redo2 size={16} />
             </button>
          </div>

          {/* Floating Zoom Controls */}
          <div className="absolute bottom-6 right-6 z-10 flex items-center bg-white rounded-lg shadow-lg border border-border-gray overflow-hidden">
            <button className="p-2 hover:bg-primary-gray text-text-main transition-colors border-r border-border-gray" onClick={() => zoomTo(Math.max(0.1, zoomRatio - 0.1))} title="Zoom Out">
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-bold w-12 text-center text-primary-dark">{(zoomRatio * 100).toFixed(0)}%</span>
            <button className="p-2 hover:bg-primary-gray text-text-main transition-colors border-l border-border-gray" onClick={() => zoomTo(Math.min(5, zoomRatio + 0.1))} title="Zoom In">
              <ZoomIn size={16} />
            </button>
            <button className="p-2 hover:bg-primary-gray text-text-main transition-colors border-l border-border-gray bg-slate-50" onClick={fitToScreen} title="Fit to Screen">
              <Maximize size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden relative p-8 z-0" ref={wrapperRef}>
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
                <span className="text-slate-300 font-bold text-4xl opacity-20 rotate-[-15deg]">WORKSPACE</span>
             </div>
             {/* The canvas container is absolutely positioned to allow panning */}
             <div className="w-full h-full relative">
               <div className="absolute shadow-2xl border border-border-gray bg-white rounded-sm" style={{ transformOrigin: 'top left' }}>
                 <canvas ref={canvasRef} id="fabric-canvas" className="rounded-sm" />
               </div>
             </div>
          </div>
        </div>
        
        <EditorRightPanel 
          fabricCanvas={fabricCanvas} 
          canvasObjects={canvasObjects} 
          setCanvasObjects={setCanvasObjects} 
          onCrop={startCrop}
        />
      </div>
    </div>
  );
};

export default Editor;
