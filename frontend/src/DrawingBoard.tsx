import React, { useState } from 'react';
import { Layout, Typography, Space } from 'antd';
import { Canvas } from './components/Canvas';
import { BrushSelector } from './components/BrushSelector';
import { ColorPicker } from './components/ColorPicker';
import { ExportControls } from './components/ExportControls';
import { BrushSettings, ExportFormat } from './types';
import { downloadDataUrl, generateFilename } from './utils/export';
import 'antd/dist/reset.css';
import './App.new.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function DrawingBoard() {
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    type: 'pencil',
    size: 5,
    color: '#000000',
    opacity: 1
  });

  const handleExport = (dataUrl: string, format: ExportFormat) => {
    const filename = generateFilename(format);
    downloadDataUrl(dataUrl, filename);
  };

  const triggerCanvasExport = (format: ExportFormat) => {
    const event = new CustomEvent('export-canvas', { detail: { format } });
    window.dispatchEvent(event);
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Drawing Board
        </Title>
      </Header>
      <Layout>
        <Sider width={300} className="app-sider">
          <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
            <BrushSelector
              brushSettings={brushSettings}
              onBrushChange={setBrushSettings}
            />
            <ColorPicker
              color={brushSettings.color}
              onColorChange={(color) => setBrushSettings({ ...brushSettings, color })}
            />
            <ExportControls onExport={triggerCanvasExport} />
          </Space>
        </Sider>
        <Content className="app-content">
          <Canvas
            brushSettings={brushSettings}
            onExport={handleExport}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DrawingBoard;