import React, { useState } from 'react';
import { Input, Space, Button } from 'antd';
import './ColorPicker.css';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#008000', '#000080'
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
  const [hexInput, setHexInput] = useState(color);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);
    
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onColorChange(value);
    }
  };

  const handleColorSelect = (selectedColor: string) => {
    setHexInput(selectedColor);
    onColorChange(selectedColor);
  };

  return (
    <div className="color-picker">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Color</h4>
          <Space>
            <div 
              className="color-preview" 
              style={{ backgroundColor: color }}
            />
            <Input
              value={hexInput}
              onChange={handleHexChange}
              placeholder="#000000"
              style={{ width: 120 }}
            />
          </Space>
        </div>

        <div>
          <h4>Preset Colors</h4>
          <div className="preset-colors">
            {presetColors.map((presetColor) => (
              <Button
                key={presetColor}
                className="color-button"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorSelect(presetColor)}
              />
            ))}
          </div>
        </div>
      </Space>
    </div>
  );
};

export default ColorPicker;