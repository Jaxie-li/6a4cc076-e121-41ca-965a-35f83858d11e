# Drawing Board Application

A web-based drawing board application built with React, TypeScript, and Ant Design. The application allows users to create digital drawings with various brush types, colors, and export options.

## Features

- **Multiple Brush Types**: Pencil, Brush, and Spray tools
- **Color Selection**: HEX color input and preset color palette
- **Adjustable Settings**: Brush size and opacity controls
- **Export Options**: Save drawings as PNG or JPEG
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Support**: Optimized for touch screens and tablets

## Project Structure

```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Canvas/     # Drawing canvas component
│   │   │   ├── BrushSelector/  # Brush type and settings
│   │   │   ├── ColorPicker/    # Color selection component
│   │   │   └── ExportControls/ # Export functionality
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── DrawingBoard.tsx    # Main application component
│   └── package.json
│
└── backend/                # Express backend server
    ├── src/
    │   ├── routes/         # API routes
    │   ├── controllers/    # Business logic
    │   ├── models/         # Data models
    │   ├── middleware/     # Express middleware
    │   └── utils/          # Utility functions
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd drawing-board
```

2. Install frontend dependencies:
```bash
cd frontend
yarn install
```

3. Install backend dependencies:
```bash
cd ../backend
yarn install
```

### Running the Application

#### Frontend Development Server

```bash
cd frontend
yarn start
```

The application will be available at `http://localhost:3000`

#### Backend Server

```bash
cd backend
yarn dev
```

The API server will run on `http://localhost:5000`

### Building for Production

#### Frontend Build

```bash
cd frontend
yarn build
```

The build artifacts will be stored in the `frontend/build` directory.

#### Backend Build

```bash
cd backend
yarn build
```

The compiled JavaScript will be in the `backend/dist` directory.

## Usage

1. **Select a Brush Type**: Choose between Pencil, Brush, or Spray tools
2. **Adjust Brush Settings**: Use sliders to change brush size and opacity
3. **Choose a Color**: Select from preset colors or enter a custom HEX color
4. **Draw**: Click and drag (or touch and drag on mobile) to draw
5. **Export**: Save your drawing as PNG or JPEG

## Testing

Run tests for both frontend and backend:

```bash
# Frontend tests
cd frontend
yarn test

# Backend tests
cd backend
yarn test
```

## Technology Stack

- **Frontend**: React, TypeScript, Ant Design
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Jest, React Testing Library, Supertest
- **Build Tools**: Create React App, TypeScript Compiler

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.