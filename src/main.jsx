import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import { StoreContextProvider } from './store/store.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
    <StoreContextProvider>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreContextProvider>
)
