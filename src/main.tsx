
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create the root outside of any component to avoid context issues
createRoot(document.getElementById("root")!).render(<App />);
