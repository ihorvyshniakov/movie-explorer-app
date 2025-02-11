import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router'

import App from './App.jsx'
import { StoreContextProvider } from './context/StoreContext.jsx'
import ThemeForApp from './ThemeForApp.jsx'

createRoot(document.getElementById('root')).render(
    <StoreContextProvider>
        <CssBaseline />
        <BrowserRouter>
            <ThemeForApp>
                <App />
            </ThemeForApp>
        </BrowserRouter>
    </StoreContextProvider>
)
