import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as fabric from 'fabric';
import './Editor.css';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorRightPanel from '../components/editor/EditorRightPanel';
import TopNavbar from '../components/editor/TopNavbar';

const Editor = () => {
  const { productId } = useParams();
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState('Shapes');
  
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

  return (
    <div className="editor-wrapper">
      <TopNavbar />
      
      <div className="editor-main-layout">
        <EditorSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        
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
