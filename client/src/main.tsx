import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './blog-styles.css'
import './projects-styles.css'
import './admin-styles.css'
import './featured-projects.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
