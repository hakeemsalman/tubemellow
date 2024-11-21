import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/manrope/latin-400.css"; // Defaults to weight 400

createRoot(document.getElementById('root')).render(
    <App />,
)
