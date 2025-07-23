/**
 * Downloads a data URL as a file
 * @param {string} dataUrl - The data URL to download
 * @param {string} filename - The filename for the download
 */
export const downloadDataUrl = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generates a timestamp-based filename
 * @param {string} format - The file format (png or jpeg)
 * @returns {string} The generated filename
 */
export const generateFilename = (format: string): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `drawing-${timestamp}.${format}`;
};