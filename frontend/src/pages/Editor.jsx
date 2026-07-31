import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';
import './Editor.css';
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
  const { setDesignData } = useContext(AppContext);
  
  useEffect(() => {
    // Initialize Fabric.js Canvas
    if (canvasRef.current && !fabricCanvas) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#ffffff'
      });

      // Add a dummy shape for demonstration
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#fcd34d',
        width: 200,
        height: 150,
        rx: 10,
        ry: 10
      });
      
      const text = new fabric.Text('Cafe Hero', {
        left: 120,
        top: 150,
        fontSize: 24,
        fontFamily: 'Inter',
        fill: '#1e293b'
      });

      initCanvas.add(rect, text);
      initCanvas.renderAll();
      
      setFabricCanvas(initCanvas);
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
      const text = new fabric.Text('Double Click to Edit', {
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
    <div className="editor-wrapper">
      <TopNavbar onSave={handleSave} onOrder={handleOrder} />
      
      <div className="editor-main-layout">
        <EditorSidebar activeTool={activeTool} setActiveTool={setActiveTool} onToolAction={handleToolAction} />
        
        <div className="editor-workspace">
          <div className="workspace-header">
            <div className="product-selector">
              <select defaultValue="Business Cards">
                <option value="Business Cards">Business Cards</option>
                <option value="Pull-Up Banner">Pull-Up Banner</option>
              </select>
              <span className="size-label">90 x 55mm</span>
            </div>
            <div className="zoom-controls">
              <button>-</button>
              <span>72%</span>
              <button>+</button>
            </div>
          </div>
          
          <div className="canvas-container-outer">
             <canvas ref={canvasRef} id="fabric-canvas" />
             <div className="bleed-guides"></div>
          </div>
        </div>
        
        <EditorRightPanel />
      </div>
    </div>
  );
};

export default Editor;
