import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorPicker from './ColorPicker';

describe('ColorPicker Component', () => {
  const mockOnColorChange = jest.fn();

  beforeEach(() => {
    mockOnColorChange.mockClear();
  });

  it('renders color preview with correct color', () => {
    const { container } = render(
      <ColorPicker 
        color="#FF0000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    const colorPreview = container.querySelector('.color-preview');
    expect(colorPreview).toHaveStyle('background-color: #FF0000');
  });

  it('displays hex input with current color', () => {
    const { getByDisplayValue } = render(
      <ColorPicker 
        color="#FF0000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    expect(getByDisplayValue('#FF0000')).toBeInTheDocument();
  });

  it('updates color when valid hex is entered', () => {
    const { getByDisplayValue } = render(
      <ColorPicker 
        color="#000000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    const input = getByDisplayValue('#000000');
    fireEvent.change(input, { target: { value: '#FF00FF' } });
    
    expect(mockOnColorChange).toHaveBeenCalledWith('#FF00FF');
  });

  it('does not update color for invalid hex', () => {
    const { getByDisplayValue } = render(
      <ColorPicker 
        color="#000000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    const input = getByDisplayValue('#000000');
    fireEvent.change(input, { target: { value: '#GGGGGG' } });
    
    expect(mockOnColorChange).not.toHaveBeenCalled();
  });

  it('renders all preset colors', () => {
    const { container } = render(
      <ColorPicker 
        color="#000000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    const colorButtons = container.querySelectorAll('.color-button');
    expect(colorButtons).toHaveLength(15);
  });

  it('updates color when preset color is clicked', () => {
    const { container } = render(
      <ColorPicker 
        color="#000000" 
        onColorChange={mockOnColorChange}
      />
    );
    
    const colorButtons = container.querySelectorAll('.color-button');
    fireEvent.click(colorButtons[2]); // Click red color
    
    expect(mockOnColorChange).toHaveBeenCalledWith('#FF0000');
  });
});