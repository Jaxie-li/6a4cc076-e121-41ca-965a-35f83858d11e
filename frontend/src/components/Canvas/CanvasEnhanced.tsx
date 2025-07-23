import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Point, BrushSettings } from '../../types';
import './Canvas.css';

interface CanvasProps {
  brushSettings: BrushSettings;
  width?: number;
  height?: number;
  onExport?: (dataUrl: string, format: 'png' | 'jpeg') => void;
}

const CanvasEnhanced: React.FC<CanvasProps> = ({ 
  brushSettings, 
  width = 800, 
  height = 600,
  onExport 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const drawLine = (from: Point, to: Point, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = brushSettings.color;
    ctx.lineWidth = brushSettings.size;
    ctx.globalAlpha = brushSettings.opacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const drawBrush = (point: Point, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, brushSettings.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushSettings.color;
    ctx.globalAlpha = brushSettings.opacity;
    ctx.fill();
  };

  const drawSpray = (point: Point, ctx: CanvasRenderingContext2D) => {
    const density = 20;
    for (let i = 0; i < density; i++) {
      const offsetX = (Math.random() - 0.5) * brushSettings.size;
      const offsetY = (Math.random() - 0.5) * brushSettings.size;
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      
      if (distance <= brushSettings.size / 2) {
        ctx.beginPath();
        ctx.arc(
          point.x + offsetX,
          point.y + offsetY,
          1,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = brushSettings.color;
        ctx.globalAlpha = brushSettings.opacity * (1 - distance / (brushSettings.size / 2));
        ctx.fill();
      }
    }
  };

  const draw = useCallback((currentPoint: Point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    switch (brushSettings.type) {
      case 'pencil':
        if (lastPoint) {
          drawLine(lastPoint, currentPoint, ctx);
        }
        break;
      case 'brush':
        drawBrush(currentPoint, ctx);
        if (lastPoint) {
          const distance = Math.sqrt(
            Math.pow(currentPoint.x - lastPoint.x, 2) +
            Math.pow(currentPoint.y - lastPoint.y, 2)
          );
          const steps = Math.ceil(distance / (brushSettings.size / 4));
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            const interpolatedPoint = {
              x: lastPoint.x + (currentPoint.x - lastPoint.x) * t,
              y: lastPoint.y + (currentPoint.y - lastPoint.y) * t
            };
            drawBrush(interpolatedPoint, ctx);
          }
        }
        break;
      case 'spray':
        drawSpray(currentPoint, ctx);
        break;
    }
    
    setLastPoint(currentPoint);
  }, [brushSettings, lastPoint]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getPoint(e);
    setIsDrawing(true);
    setLastPoint(point);
    draw(point);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getPoint(e);
    draw(point);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling
    const point = getPoint(e);
    setIsDrawing(true);
    setLastPoint(point);
    draw(point);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling
    if (!isDrawing) return;
    const point = getPoint(e);
    draw(point);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
    setLastPoint(null);
  };

  const exportCanvas = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas || !onExport) return;

    const dataUrl = canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : 1);
    onExport(dataUrl, format);
  };

  useEffect(() => {
    const handleExportEvent = (e: CustomEvent) => {
      exportCanvas(e.detail.format);
    };

    window.addEventListener('export-canvas' as any, handleExportEvent);
    return () => {
      window.removeEventListener('export-canvas' as any, handleExportEvent);
    };
  }, [onExport]);

  return (
    <canvas
      ref={canvasRef}
      className="drawing-canvas"
      style={{ touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default CanvasEnhanced;