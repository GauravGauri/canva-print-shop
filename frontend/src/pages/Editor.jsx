import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorRightPanel from '../components/editor/EditorRightPanel';
import TopNavbar from '../components/editor/TopNavbar';
import { AppContext } from '../context/AppContext';

const Editor = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState('Shapes');
  const [canvasObjects, setCanvasObjects] = useState([]);
  const { setDesignData } = useContext(AppContext);
  
  const updateObjects = (canvas) => {
    if (canvas) {
      setCanvasObjects([...canvas.getObjects()]);
    }
  };

  useEffect(() => {
    // Initialize Fabric.js Canvas
    if (canvasRef.current && !fabricCanvas) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#ffffff'
      });

      // Add dummy elements
      const rect = new fabric.Rect({
        left: 100, top: 100, fill: '#fcd34d', width: 200, height: 150, rx: 10, ry: 10
      });
      const text = new fabric.Text('Cafe Hero', {
        left: 120, top: 150, fontSize: 24, fontFamily: 'Inter', fill: '#1e293b'
      });

      initCanvas.add(rect, text);
      
      // Setup event listeners for layers panel sync
      initCanvas.on('object:added', () => updateObjects(initCanvas));
      initCanvas.on('object:removed', () => updateObjects(initCanvas));
      initCanvas.on('object:modified', () => updateObjects(initCanvas));

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
    
    if (toolId === 'Text') {
      const text = new fabric.IText('Double Click to Edit', {
        left: 150, top: 150, fontSize: 32, fontFamily: 'Inter', fill: '#1e293b'
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      fabricCanvas.renderAll();
    } else if (toolId === 'Shapes') {
      const rect = new fabric.Rect({
        left: 150, top: 150, fill: '#3b82f6', width: 150, height: 150, rx: 10, ry: 10
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
      fabricCanvas.renderAll();
    }
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
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-between w-full max-w-2xl bg-white rounded-lg shadow px-4 py-2 border border-border-gray">
            <div className="flex items-center gap-3">
              <select defaultValue="Business Cards" className="bg-primary-gray border border-border-gray rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary-blue">
                <option value="Business Cards">Business Cards</option>
                <option value="Pull-Up Banner">Pull-Up Banner</option>
              </select>
              <span className="text-xs text-text-light font-medium">90 x 55mm</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <button className="text-text-light hover:text-primary-dark transition-colors">-</button>
              <span>72%</span>
              <button className="text-text-light hover:text-primary-dark transition-colors">+</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-slate-100 flex items-center justify-center p-8">
             <div className="relative shadow-xl border border-border-gray bg-white rounded-sm">
               <canvas ref={canvasRef} id="fabric-canvas" className="rounded-sm" />
               <div className="absolute inset-0 pointer-events-none border border-red-400/50 border-dashed m-4" title="Bleed Margin"></div>
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
