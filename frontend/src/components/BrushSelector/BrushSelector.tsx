import React from 'react';
import { Radio, Slider, Space } from 'antd';
import { BrushType, BrushSettings } from '../../types';
import './BrushSelector.css';

interface BrushSelectorProps {
  brushSettings: BrushSettings;
  onBrushChange: (settings: BrushSettings) => void;
}

const BrushSelector: React.FC<BrushSelectorProps> = ({ brushSettings, onBrushChange }) => {
  const handleTypeChange = (type: BrushType) => {
    onBrushChange({ ...brushSettings, type });
  };

  const handleSizeChange = (size: number) => {
    onBrushChange({ ...brushSettings, size });
  };

  const handleOpacityChange = (opacity: number) => {
    onBrushChange({ ...brushSettings, opacity });
  };

  return (
    <div className="brush-selector">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Brush Type</h4>
          <Radio.Group
            value={brushSettings.type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <Radio.Button value="pencil">Pencil</Radio.Button>
            <Radio.Button value="brush">Brush</Radio.Button>
            <Radio.Button value="spray">Spray</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <h4>Brush Size: {brushSettings.size}px</h4>
          <Slider
            min={1}
            max={50}
            value={brushSettings.size}
            onChange={handleSizeChange}
          />
        </div>

        <div>
          <h4>Opacity: {Math.round(brushSettings.opacity * 100)}%</h4>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={brushSettings.opacity}
            onChange={handleOpacityChange}
          />
        </div>
      </Space>
    </div>
  );
};

export default BrushSelector;