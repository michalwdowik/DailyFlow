import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './styles/blobs.css'
import './styles/keyframes.css'

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
