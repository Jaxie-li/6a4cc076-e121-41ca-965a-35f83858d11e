# How to Use Drawing Board

To use the Drawing Board component in your React app, replace the contents of App.tsx with:

```tsx
import React from 'react';
import DrawingBoard from './DrawingBoard';

function App() {
  return <DrawingBoard />;
}

export default App;
```

Or you can directly import and use the DrawingBoard component in your index.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import DrawingBoard from './DrawingBoard';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DrawingBoard />
  </React.StrictMode>
);
```