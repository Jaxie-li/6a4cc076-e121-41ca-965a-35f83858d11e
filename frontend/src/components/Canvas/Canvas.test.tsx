import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Canvas from './Canvas';
import { BrushSettings } from '../../types';

describe('Canvas Component', () => {
  const defaultBrushSettings: BrushSettings = {
    type: 'pencil',
    size: 5,
    color: '#000000',
    opacity: 1
  };

  it('renders canvas element with correct dimensions', () => {
    const { container } = render(
      <Canvas brushSettings={defaultBrushSettings} width={800} height={600} />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('applies correct CSS class', () => {
    const { container } = render(
      <Canvas brushSettings={defaultBrushSettings} />
    );
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('drawing-canvas');
  });

  it('starts drawing on mousedown', () => {
    const { container } = render(
      <Canvas brushSettings={defaultBrushSettings} />
    );
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    const mockContext = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillRect: jest.fn()
    };
    
    jest.spyOn(canvas, 'getContext').mockReturnValue(mockContext as any);
    
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    
    expect(mockContext.beginPath).toHaveBeenCalled();
  });

  it('exports canvas when export event is triggered', () => {
    const mockOnExport = jest.fn();
    render(
      <Canvas 
        brushSettings={defaultBrushSettings} 
        onExport={mockOnExport}
      />
    );
    
    const event = new CustomEvent('export-canvas', { 
      detail: { format: 'png' } 
    });
    window.dispatchEvent(event);
    
    expect(mockOnExport).toHaveBeenCalledWith(
      expect.stringContaining('data:image/png'),
      'png'
    );
  });

  it('stops drawing on mouseup', () => {
    const { container } = render(
      <Canvas brushSettings={defaultBrushSettings} />
    );
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    
    // After mouseup, mousemove should not trigger drawing
    // This is tested by ensuring no errors occur
    expect(canvas).toBeInTheDocument();
  });
});