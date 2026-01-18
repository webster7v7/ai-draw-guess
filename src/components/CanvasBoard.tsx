'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Trash2, Brush, Eraser, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CanvasBoardProps {
  onExport: (base64: string) => void;
  className?: string;
}

const COLORS = ['#000000', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];
const BRUSH_SIZES = [2, 4, 8, 12, 16, 20];

export default function CanvasBoard({ onExport, className }: CanvasBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(4);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setCtx(context);
        // Save initial blank state
        setHistory([context.getImageData(0, 0, canvas.width, canvas.height)]);
        onExport(canvas.toDataURL('image/png'));
      }
    }
  }, []);

  // Update context properties
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      ctx.lineWidth = brushSize;
    }
  }, [ctx, color, brushSize, tool]);

  const saveState = useCallback(() => {
    if (ctx && canvasRef.current) {
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        setHistory(prev => {
            const newHistory = [...prev, imageData];
            // Limit history to last 20 steps to save memory
            if (newHistory.length > 20) {
                return newHistory.slice(newHistory.length - 20);
            }
            return newHistory;
        });
        onExport(canvasRef.current.toDataURL('image/png'));
    }
  }, [ctx, onExport]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
        setIsDrawing(false);
        if (ctx) ctx.beginPath();
        saveState();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;

    let clientX, clientY;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    if ('touches' in e) {
        const touch = e.touches[0];
        clientX = (touch.clientX - rect.left) * scaleX;
        clientY = (touch.clientY - rect.top) * scaleY;
    } else {
        clientX = ((e as React.MouseEvent).clientX - rect.left) * scaleX;
        clientY = ((e as React.MouseEvent).clientY - rect.top) * scaleY;
    }

    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
  };

  const undo = () => {
    if (history.length > 1 && ctx && canvasRef.current) {
        const newHistory = [...history];
        newHistory.pop(); // Remove current state
        const previousState = newHistory[newHistory.length - 1];
        ctx.putImageData(previousState, 0, 0);
        setHistory(newHistory);
        onExport(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    if (confirm('Are you sure you want to clear your drawing?')) {
        if (ctx && canvasRef.current) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          saveState();
        }
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4 w-full max-w-md mx-auto", className)}>
      <div className="relative group rounded-xl overflow-hidden shadow-2xl ring-4 ring-gray-100 bg-white touch-none">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={cn(
            "bg-white w-full h-auto max-w-[400px] block touch-none select-none",
            tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'
          )}
          style={{ touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />
      </div>

      <div className="flex flex-col gap-3 w-full p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50">
        {/* Top Controls: Tools & Actions */}
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg">
                <button
                    onClick={() => setTool('brush')}
                    className={cn(
                        "p-2 rounded-md transition-all",
                        tool === 'brush' ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"
                    )}
                    title="Brush"
                >
                    <Brush size={20} />
                </button>
                <button
                    onClick={() => setTool('eraser')}
                    className={cn(
                        "p-2 rounded-md transition-all",
                        tool === 'eraser' ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"
                    )}
                    title="Eraser"
                >
                    <Eraser size={20} />
                </button>
            </div>

            <div className="flex items-center gap-2">
                 <button
                    onClick={undo}
                    disabled={history.length <= 1}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
                    title="Undo"
                >
                    <Undo2 size={20} />
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} />
                    <span>Clear</span>
                </button>
            </div>
        </div>

        {/* Brush Sizes */}
        <div className="flex items-center justify-between gap-2 py-2 border-t border-gray-100">
             <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Size</span>
             <div className="flex items-center gap-1">
                 {BRUSH_SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => setBrushSize(size)}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                            brushSize === size ? "bg-gray-100 ring-2 ring-indigo-500 ring-offset-1" : "hover:bg-gray-50"
                        )}
                    >
                        <div 
                            className="bg-gray-800 rounded-full transition-all"
                            style={{ width: size / 2 + 2, height: size / 2 + 2 }}
                        />
                    </button>
                 ))}
             </div>
        </div>

        {/* Colors (Only show if brush is selected) */}
        <div className={cn(
            "flex flex-wrap justify-center gap-2 pt-2 border-t border-gray-100 transition-all duration-300 overflow-hidden",
            tool === 'eraser' ? "opacity-30 pointer-events-none grayscale" : "opacity-100"
        )}>
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool('brush'); }}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500",
                color === c && tool === 'brush' ? "border-gray-900 scale-110 shadow-sm" : "border-gray-100"
              )}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
