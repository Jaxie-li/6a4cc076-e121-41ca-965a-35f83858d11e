export interface Point {
  x: number;
  y: number;
}

export type BrushType = 'pencil' | 'brush' | 'spray';

export interface BrushSettings {
  type: BrushType;
  size: number;
  color: string;
  opacity: number;
}

export interface DrawingContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isDrawing: boolean;
  lastPoint: Point | null;
}

export type ExportFormat = 'png' | 'jpeg';