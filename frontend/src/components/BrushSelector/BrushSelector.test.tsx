import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BrushSelector from './BrushSelector';
import { BrushSettings } from '../../types';

describe('BrushSelector Component', () => {
  const defaultBrushSettings: BrushSettings = {
    type: 'pencil',
    size: 5,
    color: '#000000',
    opacity: 1
  };

  const mockOnBrushChange = jest.fn();

  beforeEach(() => {
    mockOnBrushChange.mockClear();
  });

  it('renders all brush type options', () => {
    const { getByText } = render(
      <BrushSelector 
        brushSettings={defaultBrushSettings} 
        onBrushChange={mockOnBrushChange}
      />
    );
    
    expect(getByText('Pencil')).toBeInTheDocument();
    expect(getByText('Brush')).toBeInTheDocument();
    expect(getByText('Spray')).toBeInTheDocument();
  });

  it('changes brush type when option is selected', () => {
    const { getByText } = render(
      <BrushSelector 
        brushSettings={defaultBrushSettings} 
        onBrushChange={mockOnBrushChange}
      />
    );
    
    fireEvent.click(getByText('Brush'));
    
    expect(mockOnBrushChange).toHaveBeenCalledWith({
      ...defaultBrushSettings,
      type: 'brush'
    });
  });

  it('displays current brush size', () => {
    const { getByText } = render(
      <BrushSelector 
        brushSettings={{ ...defaultBrushSettings, size: 10 }} 
        onBrushChange={mockOnBrushChange}
      />
    );
    
    expect(getByText('Brush Size: 10px')).toBeInTheDocument();
  });

  it('displays current opacity percentage', () => {
    const { getByText } = render(
      <BrushSelector 
        brushSettings={{ ...defaultBrushSettings, opacity: 0.5 }} 
        onBrushChange={mockOnBrushChange}
      />
    );
    
    expect(getByText('Opacity: 50%')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    const { container } = render(
      <BrushSelector 
        brushSettings={defaultBrushSettings} 
        onBrushChange={mockOnBrushChange}
      />
    );
    
    const brushSelector = container.querySelector('.brush-selector');
    expect(brushSelector).toBeInTheDocument();
  });
});