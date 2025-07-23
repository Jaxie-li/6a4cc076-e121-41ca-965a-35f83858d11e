import React from 'react';
import { Button, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ExportFormat } from '../../types';
import './ExportControls.css';

interface ExportControlsProps {
  onExport: (format: ExportFormat) => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({ onExport }) => {
  const handleExport = (format: ExportFormat) => {
    onExport(format);
    message.success(`Canvas exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="export-controls">
      <h4>Export</h4>
      <Space>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => handleExport('png')}
        >
          Export as PNG
        </Button>
        <Button
          icon={<DownloadOutlined />}
          onClick={() => handleExport('jpeg')}
        >
          Export as JPEG
        </Button>
      </Space>
    </div>
  );
};

export default ExportControls;