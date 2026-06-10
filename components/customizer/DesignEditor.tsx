"use client";
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useTranslations } from 'next-intl';
import { 
  Type, 
  Square, 
  Circle, 
  Image as ImageIcon, 
  Trash2, 
  Save, 
  Undo, 
  Redo, 
  ShoppingCart,
  ZoomIn,
  ZoomOut,
  Maximize
} from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/cart';

export default function DesignEditor({ params }: { params: { locale: string, templateId?: string } }) {
  const t = useTranslations('Common');
  const { addItem } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    fabricCanvas.current = canvas;

    canvas.on('selection:created', (e) => setSelectedObject(e.selected?.[0] || null));
    canvas.on('selection:updated', (e) => setSelectedObject(e.selected?.[0] || null));
    canvas.on('selection:cleared', () => setSelectedObject(null));

    return () => {
      canvas.dispose();
    };
  }, []);

  const addText = () => {
    const text = new fabric.IText('Type here...', {
      left: 100,
      top: 100,
      fontFamily: 'Inter',
      fontSize: 24,
      fill: '#0F172A',
    });
    fabricCanvas.current?.add(text);
    fabricCanvas.current?.setActiveObject(text);
  };

  const addRect = () => {
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      fill: '#2563EB',
      width: 100,
      height: 100,
      rx: 8,
      ry: 8,
    });
    fabricCanvas.current?.add(rect);
    fabricCanvas.current?.setActiveObject(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      fill: '#D4A853',
      radius: 50,
    });
    fabricCanvas.current?.add(circle);
    fabricCanvas.current?.setActiveObject(circle);
  };

  const deleteSelected = () => {
    const activeObjects = fabricCanvas.current?.getActiveObjects();
    if (activeObjects) {
      fabricCanvas.current?.remove(...activeObjects);
      fabricCanvas.current?.discardActiveObject();
      setSelectedObject(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result;
      fabric.Image.fromURL(data as string, (img) => {
        img.scaleToWidth(200);
        fabricCanvas.current?.add(img);
        fabricCanvas.current?.centerObject(img);
        fabricCanvas.current?.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    const designData = fabricCanvas.current?.toJSON();
    
    // Create a cart item based on the design
    const cartItem = {
      id: `custom-${Date.now()}`,
      productId: params.templateId || 'custom-design',
      name: params.templateId ? `Customized ${params.templateId}` : 'Custom Design',
      price: 499, // Default base price
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586075014628-7f1ebd7d2726?q=80&w=200&h=200&fit=crop',
      designData: designData,
      specs: {
        width: 800,
        height: 600,
      }
    };

    addItem(cartItem);
    alert('Design added to cart!');
  };

  const saveDesign = () => {
    const json = fabricCanvas.current?.toJSON();
    console.log('Saving design JSON:', json);
    alert('Design saved as JSON (check console)');
  };

  return (
    <div className="h-screen w-full flex bg-slate-100 overflow-hidden">
      <aside className="w-20 bg-navy text-white flex flex-col items-center py-6 gap-6 z-20 shadow-2xl">
        <div className="p-3 bg-brandBlue rounded-2xl mb-4">
          <span className="font-bold text-xl">PO</span>
        </div>
        
        <ToolButton icon={<Type />} onClick={addText} tooltip="Add Text" />
        <ToolButton icon={<Square />} onClick={addRect} tooltip="Add Rectangle" />
        <ToolButton icon={<Circle />} onClick={addCircle} tooltip="Add Circle" />
        <label className="p-3 hover:bg-white/10 rounded-2xl cursor-pointer transition-colors group relative">
          <ImageIcon className="w-6 h-6" />
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-navy text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Upload Image
          </span>
        </label>
        
        <div className="mt-auto flex flex-col gap-4">
          <ToolButton icon={<Undo />} onClick={() => {}} tooltip="Undo" />
          <ToolButton icon={<Redo />} onClick={() => {}} tooltip="Redo" />
          <ToolButton icon={<Trash2 />} onClick={deleteSelected} tooltip="Delete" color="text-error" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative">
        <header className="h-16 bg-white border-b border-navy/5 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => { setZoom(z => Math.max(0.1, z - 0.1)); fabricCanvas.current?.setZoom(Math.max(0.1, zoom - 0.1)); }}
                className="p-1.5 hover:bg-white rounded-md transition-colors"
              >
                <ZoomOut className="w-4 h-4 text-navy" />
              </button>
              <span className="px-3 text-xs font-bold text-navy">{Math.round(zoom * 100)}%</span>
              <button 
                onClick={() => { setZoom(z => Math.min(3, z + 0.1)); fabricCanvas.current?.setZoom(Math.min(3, zoom + 0.1)); }}
                className="p-1.5 hover:bg-white rounded-md transition-colors"
              >
                <ZoomIn className="w-4 h-4 text-navy" />
              </button>
            </div>
            <button 
              onClick={() => { fabricCanvas.current?.setZoom(1); setZoom(1); }}
              className="text-xs font-bold text-slate hover:text-navy transition-colors"
            >
              Reset Zoom
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={saveDesign}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-navy hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-2 bg-brandBlue text-white rounded-xl font-bold text-sm hover:bg-brandBlue-light transition-all shadow-lg shadow-brandBlue/20"
            >
              <ShoppingCart className="w-4 h-4" /> {t('add_to_cart')}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-12 flex justify-center items-start bg-slate-200">
          <div className="relative shadow-2xl bg-white">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

      <aside className="w-72 bg-white border-l border-navy/5 p-6 z-20 flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-2">
          <Maximize className="w-5 h-5 text-brandBlue" />
          <h3 className="font-heading font-bold text-navy">Properties</h3>
        </div>

        {selectedObject ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate uppercase tracking-wider">Fill Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={selectedObject.fill as string}
                  onChange={(e) => {
                    selectedObject.set('fill', e.target.value);
                    fabricCanvas.current?.renderAll();
                  }}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none"
                />
                <span className="text-sm font-mono text-slate">{selectedObject.fill as string}</span>
              </div>
            </div>

            {selectedObject.type === 'i-text' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate uppercase tracking-wider">Typography</label>
                <select 
                  className="w-full p-2 rounded-lg bg-offWhite border border-navy/10 text-sm outline-none"
                  onChange={(e) => {
                    (selectedObject as any).set('fontFamily', e.target.value);
                    fabricCanvas.current?.renderAll();
                  }}
                >
                  <option value="Inter">Inter</option>
                  <option value="Satoshi">Satoshi</option>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate">Font Size</span>
                  <input 
                    type="number" 
                    value={(selectedObject as any).fontSize as number}
                    onChange={(e) => {
                      (selectedObject as any).set('fontSize', parseInt(e.target.value));
                      fabricCanvas.current?.renderAll();
                    }}
                    className="w-20 p-1 text-right bg-offWhite border border-navy/10 rounded text-sm"
                  />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-navy/5">
              <label className="block text-xs font-bold text-slate uppercase tracking-wider mb-4">Opacity</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={selectedObject.opacity}
                onChange={(e) => {
                  selectedObject.set('opacity', parseFloat(e.target.value));
                  fabricCanvas.current?.renderAll();
                }}
                className="w-full accent-brandBlue"
                />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Maximize className="w-6 h-6 text-slate" />
            </div>
            <p className="text-sm text-slate font-medium">Select an object <br/> to edit properties</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function ToolButton({ icon, onClick, tooltip, color = "text-white" }: { icon: React.ReactNode, onClick: () => void, tooltip: string, color?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 hover:bg-white/10 rounded-2xl transition-colors relative group ${color}`}
    >
      {icon}
      <span className="absolute left-full ml-2 px-2 py-1 bg-navy text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        {tooltip}
      </span>
    </button>
  );
}
