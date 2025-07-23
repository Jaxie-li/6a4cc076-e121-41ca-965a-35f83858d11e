# Drawing Board Setup Guide

## Quick Start

### 1. Update Backend package.json

Add the scripts section to `backend/package.json`:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    // ... existing dependencies
  },
  "devDependencies": {
    // ... existing devDependencies
  }
}
```

### 2. Update Frontend App.tsx

Replace the contents of `frontend/src/App.tsx` with:

```tsx
import React from 'react';
import DrawingBoard from './DrawingBoard';

function App() {
  return <DrawingBoard />;
}

export default App;
```

### 3. Run the Application

#### Start Backend Server:
```bash
cd backend
yarn dev
```

#### Start Frontend Development Server:
```bash
cd frontend
yarn start
```

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## Testing

### Run Frontend Tests:
```bash
cd frontend
yarn test
```

### Run Backend Tests:
```bash
cd backend
yarn test
```

## Building for Production

### Build Frontend:
```bash
cd frontend
yarn build
```

### Build Backend:
```bash
cd backend
yarn build
```

## Linting and Type Checking

### Frontend:
```bash
cd frontend
yarn lint  # If available in your create-react-app setup
```

### Backend:
```bash
cd backend
yarn lint
yarn typecheck
```

## Features

- **Drawing Tools**: Pencil, Brush, and Spray
- **Color Selection**: HEX input and color palette
- **Adjustable Settings**: Brush size and opacity
- **Export Options**: PNG and JPEG formats
- **Mobile Support**: Touch-enabled drawing
- **Responsive Design**: Works on all screen sizes

## Troubleshooting

1. **Port already in use**: Change the port in `.env` file or kill the process using the port
2. **Dependencies not found**: Run `yarn install` in both frontend and backend directories
3. **TypeScript errors**: Run `yarn typecheck` to see detailed type errors
4. **Canvas not showing**: Make sure to update App.tsx to use DrawingBoard component

## Project Structure

- `/frontend` - React application with drawing board UI
- `/backend` - Express server (ready for future features like saving drawings)
- All drawing logic is in the Canvas component
- Mobile optimization with touch events and responsive CSS