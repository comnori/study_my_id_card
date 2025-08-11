# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Format code with Prettier
npm run format

# Preview production build
npm run preview
```

## Architecture Overview

This is a React study project built with Vite, demonstrating a company information management system. The application uses a clean component structure with routing and data filtering capabilities.

### Core Technologies
- **React 19** with functional components and hooks
- **Vite** as build tool with HMR support
- **React Router DOM** for client-side routing with basename `/study_my_id_card` for GitHub Pages
- **Ant Design** for UI components (Layout, Menu, Form, Table, etc.)
- **Prettier** and **ESLint** for code quality

### Application Structure
- **Main App** (`src/App.jsx`): Uses Ant Design Layout with Header navigation, Content area for routes, and Footer
- **Routing**: Three main pages - Home (`/`), About (`/about`), and Work (`/work`)
- **Work Page** (`src/pages/Work.jsx`): Implements search and results pattern with company data filtering
- **Components**: 
  - `WorkSearch`: Form component for filtering company data
  - `WorkResult`: Table component displaying filtered results
- **Data**: Mock company data in `src/pages/data/workData.json` with 100 sample records

### Key Patterns
- State management using React hooks (useState)
- Parent-child component communication via props and callbacks
- Data filtering using array methods with multiple criteria
- Form handling with Ant Design Form components
- Responsive grid layout using Ant Design Row/Col

### GitHub Pages Configuration
- `vite.config.js` sets `base: '/study_my_id_card/'`
- `main.jsx` uses `BrowserRouter` with `basename="/study_my_id_card"`
- This ensures proper routing when deployed to GitHub Pages

### Data Structure
Company records contain: `key`, `companyName`, `businessNumber`, `managerName`, `status` (Active/Inactive)