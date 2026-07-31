import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorRightPanel from '../components/editor/EditorRightPanel';
import TopNavbar from '../components/editor/TopNavbar';
import PropertiesBar from '../components/editor/PropertiesBar';
import { AppContext } from '../context/AppContext';
import { Check } from 'lucide-react';

const Editor = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState('Shapes');
  const [canvasObjects, setCanvasObjects] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  const [cropState, setCropState] = useState(null);
  const { setDesignData } = useContext(AppContext);
  
  const updateObjects = (canvas) => {
    if (canvas) {
      setCanvasObjects([...canvas.getObjects()]);
      setActiveObject(canvas.getActiveObject());
    }
  };

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#ffffff'
      });

      const rect = new fabric.Rect({
        left: 100, top: 100, fill: '#fcd34d', width: 200, height: 150, rx: 10, ry: 10
      });
      const text = new fabric.IText('Cafe Hero', {
        left: 120, top: 150, fontSize: 24, fontFamily: 'Inter', fill: '#1e293b'
      });

      initCanvas.add(rect, text);
      
      initCanvas.on('object:added', () => updateObjects(initCanvas));
      initCanvas.on('object:removed', () => updateObjects(initCanvas));
      initCanvas.on('object:modified', () => updateObjects(initCanvas));
      initCanvas.on('selection:created', () => setActiveObject(initCanvas.getActiveObject()));
      initCanvas.on('selection:updated', () => setActiveObject(initCanvas.getActiveObject()));
      initCanvas.on('selection:cleared', () => setActiveObject(null));

      initCanvas.renderAll();
      setFabricCanvas(initCanvas);
      updateObjects(initCanvas);
    }
    
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, [canvasRef, fabricCanvas]);

  const handleToolAction = (toolId) => {
    if (!fabricCanvas) return;
    
    const center = fabricCanvas.getCenter();
    
    if (toolId === 'heading') {
      const text = new fabric.IText('Add a heading', { left: center.left - 100, top: center.top, fontSize: 48, fontFamily: 'Inter', fontWeight: 'bold', fill: '#1e293b' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'subheading') {
      const text = new fabric.IText('Add a subheading', { left: center.left - 100, top: center.top, fontSize: 24, fontFamily: 'Inter', fontWeight: '600', fill: '#334155' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'body') {
      const text = new fabric.IText('Add a little bit of body text', { left: center.left - 100, top: center.top, fontSize: 16, fontFamily: 'Inter', fill: '#475569' });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === 'rect') {
      const rect = new fabric.Rect({ left: center.left - 50, top: center.top - 50, fill: '#3b82f6', width: 100, height: 100 });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (toolId === 'circle') {
      const circle = new fabric.Circle({ left: center.left - 50, top: center.top - 50, fill: '#ef4444', radius: 50 });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (toolId === 'triangle') {
      const tri = new fabric.Triangle({ left: center.left - 50, top: center.top - 50, fill: '#10b981', width: 100, height: 100 });
      fabricCanvas.add(tri);
      fabricCanvas.setActiveObject(tri);
    } else if (toolId === 'line') {
      const line = new fabric.Line([center.left - 50, center.top, center.left + 50, center.top], { stroke: '#000000', strokeWidth: 4 });
      fabricCanvas.add(line);
      fabricCanvas.setActiveObject(line);
    }
    
    fabricCanvas.renderAll();
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
    
    // Calculate crop box relative to image (simplified logic)
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
        
        <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-100">
          
          {/* Properties Bar Overlay */}
          {cropState ? (
            <div className="h-14 bg-white border-b border-border-gray flex items-center px-4 justify-between shadow-sm z-10 gap-4">
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
          ) : (
            <PropertiesBar 
              activeObject={activeObject} 
              fabricCanvas={fabricCanvas} 
              onCrop={startCrop} 
            />
          )}

          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-0 flex items-center justify-between w-full max-w-2xl bg-white/80 backdrop-blur rounded-full shadow-sm px-4 py-2 border border-border-gray">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary-dark">Workspace</span>
              <span className="text-xs text-text-light font-medium bg-primary-gray px-2 py-1 rounded">600 x 400px</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <button className="text-text-light hover:text-primary-dark transition-colors">-</button>
              <span>100%</span>
              <button className="text-text-light hover:text-primary-dark transition-colors">+</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto flex items-center justify-center p-8 z-0">
             <div className="relative shadow-xl border border-border-gray bg-white rounded-sm mt-8">
               <canvas ref={canvasRef} id="fabric-canvas" className="rounded-sm" />
             </div>
          </div>
        </div>
        
        <EditorRightPanel 
          fabricCanvas={fabricCanvas} 
          canvasObjects={canvasObjects} 
          setCanvasObjects={setCanvasObjects} 
        />
      </div>
    </div>
  );
};

export default Editor;
