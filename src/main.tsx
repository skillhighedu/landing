import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import './styles/fonts.css';
import { SmoothScrollProvider } from './layouts/SmoothScrollProvider.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </StrictMode>
)

