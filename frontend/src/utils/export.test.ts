import { downloadDataUrl, generateFilename } from './export';

describe('Export Utilities', () => {
  describe('downloadDataUrl', () => {
    it('creates and clicks a download link', () => {
      const mockClick = jest.fn();
      const mockAppendChild = jest.spyOn(document.body, 'appendChild');
      const mockRemoveChild = jest.spyOn(document.body, 'removeChild');
      
      const mockLink = {
        href: '',
        download: '',
        click: mockClick
      };
      
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      
      downloadDataUrl('data:image/png;base64,test', 'test.png');
      
      expect(mockLink.href).toBe('data:image/png;base64,test');
      expect(mockLink.download).toBe('test.png');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalled();
    });
  });

  describe('generateFilename', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-15T10:30:45.123Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('generates filename with png format', () => {
      const filename = generateFilename('png');
      expect(filename).toBe('drawing-2024-01-15T10-30-45-123Z.png');
    });

    it('generates filename with jpeg format', () => {
      const filename = generateFilename('jpeg');
      expect(filename).toBe('drawing-2024-01-15T10-30-45-123Z.jpeg');
    });

    it('includes timestamp in filename', () => {
      const filename1 = generateFilename('png');
      
      jest.setSystemTime(new Date('2024-01-15T10:30:46.123Z'));
      const filename2 = generateFilename('png');
      
      expect(filename1).not.toBe(filename2);
    });
  });
});